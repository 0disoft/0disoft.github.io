// Start bun run dev -- --host 127.0.0.1 --port 5184 --strictPort first.
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { repositoryRoot } from "./browser-test-site.mjs";

const driver = process.argv[2] ? pathToFileURL(resolve(process.argv[2])).href : "playwright-core";
const { chromium } = await import(driver);
const origin = process.argv[3] ?? "http://127.0.0.1:5184";
const catalog = resolve(repositoryRoot, "locales/en/site.json");
const original = await readFile(catalog, "utf8");
const messages = JSON.parse(original);
const browser = await chromium.launch({
	channel: process.env.BROWSER_CHANNEL || (process.platform === "win32" ? "msedge" : "chrome"),
	headless: true,
});
let dirty = false;
try {
	const context = await browser.newContext({ locale: "en-US" });
	await context.route("**/*", (route) =>
		new URL(route.request().url()).origin === new URL(origin).origin
			? route.continue()
			: route.abort(),
	);
	const page = await context.newPage();
	page.setDefaultTimeout(15000);
	page.setDefaultNavigationTimeout(60000);
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto(origin + "/investors/?recent=0");
	const input = page.locator("#indiehackers-search");
	await input.fill("saylo-state-proof");
	// Development modules may arrive after the prerendered form. Wait for its event handler.
	await page.waitForFunction((query) => {
		const input = document.querySelector("#indiehackers-search");
		if (!input) return false;
		input.value = query;
		input.dispatchEvent(new Event("input", { bubbles: true }));
		return new URL(location.href).searchParams.get("q") === query;
	}, "saylo-state-proof");
	await page.locator('button.sidebar-action[aria-keyshortcuts="S"]').click();
	await page.locator(".settings-dialog[open]").waitFor();
	await page.evaluate(() => {
		window.__sayloDocument = document;
	});
	let navigations = 0;
	page.on("framenavigated", (frame) => {
		if (frame === page.mainFrame()) navigations++;
	});
	const replacement = {
		...messages,
		settings_dialog_title: "Saylo live edit proof",
		nav_investors: "Saylo investors proof",
		stories_asset: "Saylo asset proof",
	};
	dirty = true;
	await writeFile(catalog, JSON.stringify(replacement, null, 2) + "\n");
	await page.waitForFunction(
		() => document.querySelector("#settings-dialog-title")?.textContent === "Saylo live edit proof",
	);
	await page
		.locator('.menu-list a[href="/investors"]')
		.filter({ hasText: "Saylo investors proof" })
		.waitFor();
	assert.ok(
		(await page.locator(".facet-summary").filter({ hasText: "Saylo asset proof" }).count()) > 0,
	);
	assert.equal(await input.inputValue(), "saylo-state-proof");
	assert.equal(await page.locator(".settings-dialog[open]").count(), 1);
	assert.equal(await page.evaluate(() => window.__sayloDocument === document), true);
	assert.equal(navigations, 0);
	// A broken edit keeps the last valid screen; fixing it resumes delivery.
	await writeFile(catalog, "{ invalid-json");
	await page.waitForTimeout(500);
	assert.equal(await page.locator("#settings-dialog-title").innerText(), "Saylo live edit proof");
	await writeFile(catalog, original);
	dirty = false;
	await page.waitForFunction(
		(title) => document.querySelector("#settings-dialog-title")?.textContent === title,
		messages.settings_dialog_title,
	);
	assert.equal(await input.inputValue(), "saylo-state-proof");
	assert.equal(await page.locator(".settings-dialog[open]").count(), 1);
	assert.equal(navigations, 0);
	assert.deepEqual(errors, []);
	console.log(
		"PASS Saylo live copy, navigation and facet labels; filter input and open dialog preserved; no reload; invalid-edit recovery; original catalog restored",
	);
} finally {
	try {
		if (dirty) await writeFile(catalog, original);
	} finally {
		await browser.close();
	}
}
