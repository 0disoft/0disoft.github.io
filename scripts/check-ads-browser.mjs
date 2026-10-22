import assert from "node:assert/strict";
import { openBuiltSite } from "./browser-test-site.mjs";

const site = await openBuiltSite({
	env: {
		PUBLIC_AD_PROVIDER: "google",
		PUBLIC_AD_CLIENT_ID: "ca-pub-1234567890123456",
		PUBLIC_BLOG_POST_AD_SLOT: "12345",
	},
});
let requests = 0;
try {
	await site.context.route("https://pagead2.googlesyndication.com/**", (route) => {
		requests++;
		return route.fulfill({
			contentType: "text/javascript",
			body: `window.adsbygoogle=[];window.adsbygoogle.push=function(){
				window.adRenders=(window.adRenders||0)+1;
				document.querySelectorAll("ins.adsbygoogle").forEach(e=>e.dataset.adStatus="filled");
			};`,
		});
	});
	await site.page.goto(site.origin + "/indiehackers/carrd/", { waitUntil: "networkidle" });
	assert.equal(requests, 0);
	assert.equal(await site.page.locator("ins.adsbygoogle").count(), 0);
	await site.page.getByRole("button", { name: "Allow", exact: true }).click();
	await site.page.waitForFunction(() => window.adRenders === 1);
	assert.equal(requests, 1);
	assert.equal(await site.page.locator('ins[data-ad-status="filled"]').count(), 1);
	await site.page.keyboard.press("s");
	await site.page.locator('[data-settings-control="privacy-tab"]').click();
	await site.page.locator('[data-settings-control="privacy-advertising"]').click();
	await site.page.waitForFunction(() => document.querySelectorAll("ins.adsbygoogle").length === 0);
	await site.page.locator('[data-settings-control="privacy-advertising"]').click();
	await site.page.waitForFunction(() => window.adRenders === 2);
	assert.equal(requests, 1);
	await site.page.getByRole("button", { name: "Close", exact: true }).click();
	await site.page.locator(".indiehackers-adjacent a").first().click();
	await site.page.waitForFunction(() => window.adRenders === 3);
	assert.deepEqual(site.errors, []);
	console.log("PASS offline ad consent, revocation, script reuse and article navigation");
} finally {
	await site.browser.close();
}
