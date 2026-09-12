import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const driver = process.argv[2] ? pathToFileURL(resolve(process.argv[2])).href : "playwright-core";
const { chromium } = await import(driver);
const build = resolve("build");
const origin = "https://search.test";
const mime = {
	".html": "text/html",
	".js": "application/javascript",
	".css": "text/css",
	".json": "application/json",
	".wasm": "application/wasm",
	".svg": "image/svg+xml",
};
const mockModule = `
window.searchTest = { searches: {}, details: {}, calls: [] };
export function search(term) {
  window.searchTest.calls.push(term);
  return new Promise((resolve, reject) => {
    window.searchTest.searches[term] = { resolve, reject };
  });
}`;
const browser = await chromium.launch({ channel: "chrome", headless: true });

async function openPage(mock = false) {
	const context = await browser.newContext({ serviceWorkers: "block", locale: "en-US" });
	await context.route("**/*", async (route) => {
		const url = new URL(route.request().url());
		if (url.origin !== origin) return route.abort();
		if (mock && url.pathname === "/pagefind/pagefind.js") {
			return route.fulfill({ contentType: mime[".js"], body: mockModule });
		}
		const file = resolve(build, `.${decodeURIComponent(url.pathname)}`);
		if (file !== build && !file.startsWith(build + sep)) return route.abort();
		for (const candidate of [file, `${file}.html`, resolve(file, "index.html")]) {
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
	const response = await page.goto(`${origin}/`);
	assert.equal(response.status(), 200);
	await page.getByRole("button", { name: /^Search/ }).click();
	await page.locator(".search-dialog[open]").waitFor();
	return { context, page, input: page.locator("#search-dialog-input") };
}

async function resolveSearch(page, term) {
	await page.evaluate((term) => {
		window.searchTest.searches[term].resolve({
			results: [
				{
					id: term,
					data: () =>
						new Promise((resolve, reject) => {
							window.searchTest.details[term] = { resolve, reject };
						}),
				},
			],
		});
	}, term);
}

async function resolveDetails(page, term) {
	await page.evaluate((term) => {
		window.searchTest.details[term].resolve({
			url: "/blog/",
			meta: { title: `${term} title` },
			excerpt: `<mark>${term}</mark> excerpt`,
		});
	}, term);
}

try {
	const real = await openPage();
	const htmlFiles = (await readdir(build, { recursive: true })).filter(
		(file) =>
			file.endsWith(".html") &&
			!file.endsWith("404.html") &&
			!file.startsWith("googled410e8c95b586079"),
	);
	assert.ok(htmlFiles.length > 0);
	for (const file of htmlFiles) {
		const boundary = await real.page.evaluate(
			(html) => {
				const doc = new DOMParser().parseFromString(html, "text/html");
				const roots = doc.querySelectorAll("[data-pagefind-body]");
				return (
					roots.length === 1 &&
					roots[0].matches("main#main-content") &&
					roots[0].querySelector(".settings-dialog, .search-dialog") === null
				);
			},
			await readFile(resolve(build, file), "utf8"),
		);
		assert.equal(
			boundary,
			true,
			`${file} must keep its main content searchable without settings chrome.`,
		);
	}
	console.log(`PASS main-content boundaries for ${htmlFiles.length} built locale pages`);
	const lightResults = await real.page.evaluate(async () => {
		const pagefind = await import("/pagefind/pagefind.js");
		const response = await pagefind.search("light");
		return Promise.all(
			response.results.map(async (result) => {
				const data = await result.data();
				return { url: data.url, content: data.content };
			}),
		);
	});
	assert.ok(lightResults.length > 0, "Article text about a desk lamp must remain searchable.");
	assert.ok(
		lightResults.every((result) => result.url.includes("/blog/things-on-my-desk")),
		"The Light theme control must not make unrelated pages match a content search.",
	);
	assert.ok(lightResults.every((result) => !result.content.includes("Light Dark System")));
	console.log("PASS index boundary: theme controls excluded, article body retained");
	await real.input.fill("software");
	const realResult = real.page.locator("a[data-search-result]").first();
	await realResult.waitFor();
	assert.ok((await realResult.locator(".search-result-title").innerText()).trim());
	const target = new URL(await realResult.getAttribute("href"), origin).href;
	await realResult.click();
	await real.page.waitForURL(target);
	assert.equal(await real.page.locator(".search-dialog[open]").count(), 0);
	await real.page.goto(`${origin}/blog/things-on-my-desk`);
	await real.page.getByRole("button", { name: /^Search/ }).click();
	await real.page.keyboard.press("Escape");
	await real.page
		.locator(".content-shell")
		.evaluate((element) => element.scrollTo({ top: 400, behavior: "instant" }));
	const savedScroll = await real.page
		.locator(".content-shell")
		.evaluate((element) => element.scrollTop);
	assert.ok(savedScroll > 0, "Article must scroll within the desktop content pane");
	await real.page.locator('a[href="/blog"]').first().click();
	await real.page.waitForURL((url) => url.pathname.replace(/\/$/, "") === "/blog");
	await real.page.waitForFunction(() => document.querySelector(".content-shell")?.scrollTop === 0);
	await real.page.goBack();
	await real.page.waitForURL((url) => url.pathname.replace(/\/$/, "") === "/blog/things-on-my-desk");
	await real.page.waitForFunction(
		(top) => Math.abs(document.querySelector(".content-shell").scrollTop - top) < 2,
		savedScroll,
	);
	await real.page.goForward();
	await real.page.waitForURL((url) => url.pathname.replace(/\/$/, "") === "/blog");
	await real.page.waitForFunction(() => document.querySelector(".content-shell")?.scrollTop === 0);
	console.log("PASS desktop content scroll reset and history restoration");
	await real.context.close();
	console.log("PASS actual Pagefind index: query, title, result navigation");

	const { context, page, input } = await openPage(true);
	await page.clock.install();
	await page.clock.pauseAt(new Date());
	const start = async (term) => {
		await input.fill(term);
		await page.clock.runFor(170);
		await page.waitForFunction((term) => window.searchTest?.searches[term], term);
	};
	const resultCount = () => page.locator("a[data-search-result]").count();

	await start("old-search");
	await input.fill("new-search");
	await resolveSearch(page, "old-search");
	assert.equal(await resultCount(), 0);
	assert.equal(await page.evaluate(() => Boolean(window.searchTest.details["old-search"])), false);
	await page.clock.runFor(170);
	await page.waitForFunction(() => window.searchTest.searches["new-search"]);
	await resolveSearch(page, "new-search");
	await page.waitForFunction(() => window.searchTest.details["new-search"]);
	await resolveDetails(page, "new-search");
	await page.getByText("new-search title", { exact: true }).waitFor();
	assert.equal(await page.locator(".search-result-excerpt mark").innerText(), "new-search");
	console.log("PASS async result data, meta.title, excerpt, input-time invalidation");

	await start("old-detail");
	await resolveSearch(page, "old-detail");
	await page.waitForFunction(() => window.searchTest.details["old-detail"]);
	await start("latest");
	await resolveSearch(page, "latest");
	await page.waitForFunction(() => window.searchTest.details.latest);
	await resolveDetails(page, "latest");
	await page.getByText("latest title", { exact: true }).waitFor();
	await resolveDetails(page, "old-detail");
	assert.equal(await page.locator(".search-result-title").innerText(), "latest title");
	console.log("PASS stale detail completion cannot replace latest results");

	await start("cleared");
	await resolveSearch(page, "cleared");
	await page.waitForFunction(() => window.searchTest.details.cleared);
	await input.fill("");
	await resolveDetails(page, "cleared");
	assert.equal(await resultCount(), 0);
	assert.equal(await page.locator(".search-skeleton").count(), 0);

	await input.fill("cancelled-timer");
	// Escape in a nonempty search input may clear it before cancelling its dialog.
	await page.getByRole("button", { name: "Close", exact: true }).focus();
	await page.keyboard.press("Escape");
	await page.clock.runFor(200);
	assert.equal(await page.locator(".search-dialog[open]").count(), 0);
	assert.equal(
		await page.evaluate(() => window.searchTest.calls.includes("cancelled-timer")),
		false,
	);
	await page.getByRole("button", { name: /^Search/ }).click();
	await start("closed-detail");
	await resolveSearch(page, "closed-detail");
	await page.waitForFunction(() => window.searchTest.details["closed-detail"]);
	await page.getByRole("button", { name: "Close", exact: true }).press("Enter");
	await page.clock.runFor(1);
	await page.getByRole("button", { name: /^Search/ }).click();
	await resolveDetails(page, "closed-detail");
	assert.equal(await input.inputValue(), "");
	assert.equal(await resultCount(), 0);
	console.log("PASS clear, Escape timer cancellation, close/reopen stale completion");

	await start("failed");
	await page.evaluate(() => window.searchTest.searches.failed.reject(new Error("offline")));
	await page.getByText("Search is not available on this page.", { exact: true }).waitFor();
	await start("recovered");
	await resolveSearch(page, "recovered");
	await page.waitForFunction(() => window.searchTest.details.recovered);
	await resolveDetails(page, "recovered");
	await page.getByText("recovered title", { exact: true }).waitFor();
	console.log("PASS failure and subsequent retry recovery");
	await context.close();
} finally {
	await browser.close();
}
