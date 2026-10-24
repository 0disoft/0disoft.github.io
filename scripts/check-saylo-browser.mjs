import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { openBuiltSite, repositoryRoot } from "./browser-test-site.mjs";

const site = await openBuiltSite();
const { browser, context, page, origin, errors } = site;
page.setDefaultTimeout(15000);
const warnings = [];
page.on("console", (message) => {
	if (message.type() === "warning") warnings.push(message.text());
});
const locales = ["en", "zh", "es", "fr", "hi", "ko"];
try {
	for (const locale of locales) {
		const messages = JSON.parse(
			await readFile(resolve(repositoryRoot, `locales/${locale}/site.json`), "utf8"),
		);
		const prefix = locale === "en" ? "" : `/${locale}`;
		for (const path of [
			"/",
			"/indiehackers/",
			"/indiehackers/carrd/",
			"/privacy/",
			"/investors/",
			"/creators/",
		]) {
			const html = await readFile(
				resolve(repositoryRoot, `build${prefix}${path}index.html`),
				"utf8",
			);
			assert.ok(html.includes(`lang="${locale}"`), `SSR language: ${prefix}${path}`);
			assert.ok(html.includes(messages.skip_to_content_label), `SSR copy: ${prefix}${path}`);
			await page.goto(origin + prefix + path);
			// A working event handler proves hydration, rather than only inspecting SSR HTML.
			await page.locator('button.sidebar-action[aria-keyshortcuts="S"]').click();
			await page.locator(".settings-dialog[open]").waitFor();
			assert.equal(
				await page.locator("#settings-dialog-title").innerText(),
				messages.settings_dialog_title,
			);
			assert.equal(await page.locator("html").getAttribute("lang"), locale);
			await page.keyboard.press("Escape");
		}
		console.log(
			`PASS ${locale}: SSR, hydration, home, listing, article, privacy, investors, creators`,
		);
	}

	await page.goto(origin + "/ko/indiehackers/?recent=0#main-content");
	await page.locator('button.sidebar-action[aria-keyshortcuts="S"]').click();
	await page.locator("#settings-language-tab").click();
	await page.locator('[data-settings-control="language-fr"]').click();
	await page.waitForURL(
		(url) =>
			url.pathname.replace(/\/$/, "") === "/fr/indiehackers" &&
			url.search === "?recent=0" &&
			url.hash === "#main-content",
	);
	await page.locator('button.sidebar-action[aria-keyshortcuts="S"]').click();
	assert.equal(await page.evaluate(() => localStorage.getItem("0disoft:locale")), "fr");
	assert.ok(
		(await context.cookies()).some(
			(cookie) => cookie.name === "ODISOFT_LOCALE" && cookie.value === "fr",
		),
	);
	await page.goto(origin + "/indiehackers/?recent=0");
	await page.waitForURL(
		(url) => url.pathname.replace(/\/$/, "") === "/fr/indiehackers" && url.search === "?recent=0",
	);
	await page.goto(origin + "/ko/privacy/");
	assert.equal(await page.locator("html").getAttribute("lang"), "ko");
	// URL selection wins over saved preferences. Client navigation must update the provider.
	await page.locator('a[href="/ko/indiehackers"]').first().click();
	await page.waitForURL((url) => url.pathname.replace(/\/$/, "") === "/ko/indiehackers");
	await page.locator("#indiehackers-search").waitFor();

	await page.evaluate(() => {
		window.__sayloDocument = document;
		document.querySelector('a[href="/fr/indiehackers"]').click();
	});
	await page.waitForURL((url) => url.pathname.replace(/\/$/, "") === "/fr/indiehackers");
	await page.waitForFunction(() => document.documentElement.lang === "fr");
	assert.equal(await page.evaluate(() => window.__sayloDocument === document), true);
	assert.ok(
		(await page.locator('a[href="/fr/investors"]').filter({ hasText: "Investisseurs" }).count()) >
			0,
	);

	for (const locale of locales) {
		const prefix = locale === "en" ? "" : `/${locale}`;
		const missing = `${origin}${prefix}/missing-saylo-page/`;
		await page.route(missing, async (route) =>
			route.fulfill({
				status: 404,
				contentType: "text/html",
				body: await readFile(resolve(repositoryRoot, "build/404.html")),
			}),
		);
		// Clear saved preferences before checking an unprefixed English error URL.
		if (locale === "en") await context.clearCookies();
		if (locale === "en") await page.evaluate(() => localStorage.removeItem("0disoft:locale"));
		await page.goto(missing);
		await page.locator(".error-panel").waitFor();
		assert.equal(await page.locator(".error-panel a").getAttribute("href"), prefix + "/");
		assert.equal(await page.locator("html").getAttribute("lang"), locale);
	}
	assert.deepEqual(errors, []);
	assert.deepEqual(warnings, []);
	console.log(
		"PASS language switch, query/hash, localStorage/cookie, preference redirect, explicit URL, cross-locale SPA navigation, six static 404 locales; no runtime errors or warnings",
	);
} finally {
	await browser.close();
}
