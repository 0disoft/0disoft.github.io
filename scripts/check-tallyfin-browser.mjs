import assert from "node:assert/strict";
import { openBuiltSite } from "./browser-test-site.mjs";

const endpoint = "https://tallyfin-admin.rodisoft1.workers.dev/v1/projects/zerodi-site/batches";
const site = await openBuiltSite({
	origin: "https://0disoft.github.io",
	env: { PUBLIC_TALLYFIN_ENDPOINT: endpoint },
});
const batches = [];
try {
	await site.context.route(endpoint, async (route) => {
		batches.push(JSON.parse(route.request().postData()));
		assert.equal(route.request().headers().authorization, undefined);
		assert.equal(route.request().headers().cookie, undefined);
		assert.equal(route.request().headers().referer, undefined);
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: "{}",
			headers: { "Access-Control-Allow-Origin": site.origin },
		});
	});
	await site.page.goto(site.origin + "/", { waitUntil: "networkidle" });
	assert.equal(batches.length, 0);
	await site.page.getByRole("button", { name: "Allow", exact: true }).click();
	await site.page.waitForFunction(
		() => localStorage.getItem("0disoft:analytics-consent") === "granted",
	);
	await site.page.waitForResponse(endpoint);
	const events = batches.flatMap((batch) => batch.events);
	assert.equal(events.length, 1);
	assert.deepEqual(events[0].properties, { section: "home", locale: "en" });
	await site.page.keyboard.press("s");
	await site.page.locator('[data-settings-control="privacy-tab"]').click();
	await site.page.locator('[data-settings-control="privacy-analytics"]').click();
	await site.page.getByRole("button", { name: "Close", exact: true }).click();
	await site.page.getByRole("link", { name: "Investors", exact: true }).first().click();
	await site.page.waitForTimeout(5500);
	assert.equal(batches.flatMap((batch) => batch.events).length, 1);
	assert.deepEqual(site.errors, []);
	console.log(
		"PASS Tallyfin-only consent, one initial page view, bounded payload, credential/referrer omission and withdrawal",
	);
} finally {
	await site.browser.close();
}
