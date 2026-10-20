// Run against a local dev server: node scripts/check-share-browser.mjs [driver-path] [origin]
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const driver = process.argv[2] ? pathToFileURL(resolve(process.argv[2])).href : "playwright-core";
const { chromium } = await import(driver);
const origin = process.argv[3] ?? "http://127.0.0.1:5180";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
	const context = await browser.newContext({ locale: "en-US" });
	await context.route("**/*", (route) =>
		new URL(route.request().url()).origin === new URL(origin).origin
			? route.continue()
			: route.abort(),
	);
	await context.addInitScript(() => {
		window.copyMode = "fail";
		window.shareMode = "fail";
		window.copyCalls = 0;
		window.pendingCopies = [];
		window.pendingShares = [];
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: {
				writeText: async () => {
					window.copyCalls++;
					if (window.copyMode === "defer") {
						return new Promise((resolve, reject) => window.pendingCopies.push({ resolve, reject }));
					}
					if (window.copyMode !== "success") throw new Error("Clipboard blocked");
				},
			},
		});
		document.execCommand = () => false;
		Object.defineProperty(navigator, "share", {
			configurable: true,
			value: async () => {
				if (window.shareMode === "defer") {
					return new Promise((resolve, reject) => window.pendingShares.push({ resolve, reject }));
				}
				throw new DOMException(
					"Share failed",
					window.shareMode === "abort" ? "AbortError" : "NotAllowedError",
				);
			},
		});
	});
	const page = await context.newPage();
	page.setDefaultTimeout(60_000);
	const errors = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.goto(`${origin}/indiehackers`, { waitUntil: "domcontentloaded", timeout: 60_000 });
	await page.locator('a[href^="/indiehackers/"]').first().click();
	await page.waitForLoadState("networkidle");
	const toolbar = page.locator(".share-toolbar").first();
	const copy = toolbar.getByRole("button", { name: "Copy link", exact: true });
	await copy.click();
	const manual = toolbar.getByRole("textbox", { name: "Copy link", exact: true });
	await manual.waitFor();
	assert.match(await toolbar.getByRole("status").innerText(), /couldn't copy/);
	assert.equal(await manual.getAttribute("readonly"), "");
	const url = await manual.inputValue();
	assert.equal(
		url,
		page.url().replace(new URL(origin).origin, "https://0disoft.github.io").replace(/\/$/, ""),
	);
	assert.equal(
		await manual.evaluate(
			(input) =>
				document.activeElement === input &&
				input.selectionStart === 0 &&
				input.selectionEnd === input.value.length,
		),
		true,
	);
	await page.evaluate(() => {
		window.copyMode = "success";
	});
	await copy.click();
	await toolbar.getByRole("button", { name: "Copied", exact: true }).waitFor();
	assert.equal(await manual.count(), 0);
	await toolbar.getByRole("button", { name: "Copy link", exact: true }).waitFor();
	await page.evaluate(() => {
		window.shareMode = "abort";
		window.copyMode = "fail";
	});
	await toolbar.getByRole("button", { name: "Share with device", exact: true }).click();
	assert.equal(await manual.count(), 0);
	await page.evaluate(() => {
		window.shareMode = "fail";
	});
	await toolbar.getByRole("button", { name: "Share with device", exact: true }).click();
	await manual.waitFor();
	assert.equal(await manual.inputValue(), url);
	const share = toolbar.getByRole("button", { name: "Share with device", exact: true });
	await page.evaluate(() => {
		window.copyMode = "defer";
	});
	const previousCalls = await page.evaluate(() => window.copyCalls);
	await copy.click();
	assert.equal(
		await copy.isDisabled(),
		true,
		"copy must stay disabled while clipboard work is pending",
	);
	assert.equal(await share.isDisabled(), true, "share must not overlap pending copy work");
	await copy.evaluate((button) => button.click());
	assert.equal(await page.evaluate(() => window.copyCalls), previousCalls + 1);
	await page.evaluate(() => window.pendingCopies.shift().resolve());
	await toolbar.getByRole("button", { name: "Copied", exact: true }).waitFor();
	assert.equal(await share.isEnabled(), true);
	await page.evaluate(() => {
		window.shareMode = "defer";
		window.copyMode = "fail";
	});
	await share.click();
	assert.equal(await share.isDisabled(), true);
	assert.equal(await copy.isDisabled(), true);
	await page.evaluate(() => window.pendingShares.shift().reject(new Error("Denied")));
	await manual.waitFor();
	assert.equal(await copy.isEnabled(), true, "a failed share and copy must unlock retries");
	await share.click();
	const callsBeforeNavigation = await page.evaluate(() => window.copyCalls);
	await page.locator(".adjacent-card").first().click();
	await page.waitForLoadState("networkidle");
	await page.evaluate(() => window.pendingShares.shift().reject(new Error("Old share failed")));
	await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 100)));
	assert.equal(
		await page.evaluate(() => window.copyCalls),
		callsBeforeNavigation,
		"an obsolete share must not copy the next article",
	);
	assert.equal(await manual.count(), 0);
	assert.equal(await copy.isEnabled(), true);
	assert.deepEqual(errors, []);
	console.log(
		"Share recovery passed: failure recovery, retry, cancellation, serialized copy/share, and navigation during pending share; no page errors.",
	);
} finally {
	await browser.close();
}
