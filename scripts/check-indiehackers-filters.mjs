import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(resolve(process.argv[2])).href);
const roots = [
	resolve(".svelte-kit/output/prerendered/pages"),
	resolve(".svelte-kit/output/prerendered/dependencies"),
	resolve(".svelte-kit/output/client"),
	resolve("static"),
];
const origin = "https://filters.test";
const output = resolve(".mustflow/state/taxonomy-screenshots");
const mime = {
	".html": "text/html",
	".js": "application/javascript",
	".css": "text/css",
	".json": "application/json",
	".svg": "image/svg+xml",
	".woff2": "font/woff2",
};
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
	await mkdir(output, { recursive: true });
	for (const viewport of [
		{ width: 1440, height: 1000 },
		{ width: 390, height: 844 },
	]) {
		const context = await browser.newContext({
			viewport,
			serviceWorkers: "block",
			locale: "ko-KR",
		});
		await context.route("**/*", async (route) => {
			const url = new URL(route.request().url());
			if (url.origin !== origin) return route.abort();
			// Keep optional public integrations disabled in this isolated UI smoke test.
			if (url.pathname === "/_app/env.js") {
				return route.fulfill({ contentType: "application/javascript", body: "export const env = {};" });
			}
			const candidates = roots.flatMap((root) => {
				const file = resolve(root, `.${decodeURIComponent(url.pathname)}`);
				return file === root || file.startsWith(root + sep)
					? [file, `${file}.html`, resolve(file, "index.html")]
					: [];
			});
			for (const candidate of candidates) {
				try {
					return await route.fulfill({
						body: await readFile(candidate),
						contentType: mime[extname(candidate)] ?? "application/octet-stream",
					});
				} catch (error) {
					if (!["ENOENT", "EISDIR", "ENOTDIR"].includes(error.code)) throw error;
				}
			}
			return route.fulfill({ status: 404, body: "Not found" });
		});
		const page = await context.newPage();
		const errors = [];
		page.on("pageerror", (error) => {
			errors.push(error.message);
			console.error(error.message);
		});
		await page.clock.install({ time: new Date("2026-09-22T03:00:00Z") });
		await page.goto(`${origin}/ko/indiehackers/?recent=0`);
		const cards = page.locator("[data-indiehackers-post]");
		const tag = (id) => page.locator(`input[name="tag"][value="${id}"]`);
		await page.waitForFunction(() => !document.querySelector('input[name="recent"]').checked);
		assert.equal(await cards.count(), 4);
		assert.equal(await tag("mobile-app").count(), 0);
		await tag("saas").check();
		assert.equal(await cards.count(), 2);
		await tag("design-tools").check();
		assert.equal(await cards.count(), 3);
		await tag("subscription").check();
		assert.equal(await cards.count(), 2);
		await tag("api").check();
		assert.equal(await cards.count(), 1);
		assert.ok((await cards.first().textContent()).includes("Buttondown"));
		await page.reload();
		await page.waitForFunction(
			() => document.querySelectorAll("[data-indiehackers-post]").length === 1,
		);
		assert.equal(await tag("api").isChecked(), true);
		await tag("api").uncheck();
		assert.equal(await cards.count(), 2);
		await page.goBack();
		await page.waitForFunction(() => document.querySelector('input[value="api"]').checked);
		assert.equal(await cards.count(), 1);
		await page.locator(".chip-clear").click();
		assert.equal(await cards.count(), 4);
		assert.equal(await page.locator('input[name="tag"]:checked').count(), 0);
		assert.equal(await page.locator('input[name="recent"]').isChecked(), true);
		await page.locator("#indiehackers-search").fill("nonexistent-product-query");
		assert.equal(await cards.count(), 0);
		assert.equal(await page.locator(".indiehackers-empty").count(), 1);
		await page.locator(".chip-clear").click();
		const layout = await page.evaluate(() => ({
			overflow: document.documentElement.scrollWidth > innerWidth,
			recentBorder: getComputedStyle(document.querySelector(".recent-chip")).borderStyle,
			tagBorder: getComputedStyle(document.querySelector(".tag-chips .chip")).borderStyle,
			clipped: [...document.querySelectorAll(".chip")].some(
				(chip) => chip.getBoundingClientRect().right > innerWidth,
			),
		}));
		assert.equal(layout.overflow, false);
		assert.equal(layout.clipped, false);
		assert.equal(layout.recentBorder, layout.tagBorder);
		await page.screenshot({
			path: resolve(output, `filters-${viewport.width}.png`),
			fullPage: true,
		});
		assert.deepEqual(errors, []);
		console.log(
			`PASS ${viewport.width}px: grouped filters, URL reload/back, reset, empty state, layout`,
		);
		await context.close();
	}
} finally {
	await browser.close();
}
