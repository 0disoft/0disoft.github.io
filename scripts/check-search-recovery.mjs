import assert from "node:assert/strict";
import { openBuiltSite } from "./browser-test-site.mjs";

const site = await openBuiltSite({
	pagefindModule: `export async function search(term) {
		const broken = {id:"bad", data:async()=>{throw new Error("Missing fragment")}};
		const healthy = {id:"ok", data:async()=>({url:"/indiehackers/carrd/",meta:{title:"Healthy result"}})};
		return {results:term === "total" ? [broken] : [healthy,broken]};
	}`,
});
try {
	let requests = 0;
	await site.context.route("**/search-index/en.json", (route) => {
		requests++;
		return route.fulfill({ status: 503, body: "offline" });
	});
	await site.page.goto(site.origin + "/");
	await site.page.getByRole("button", { name: /^Search/ }).click();
	const input = site.page.locator("#search-dialog-input");
	await input.fill("partial");
	await site.page.getByText("Healthy result", { exact: true }).waitFor();
	await site.page.waitForTimeout(1_000);
	assert.equal(requests, 1, "Partial failure must not retry a failed recovery");
	assert.equal(await site.page.locator("a[data-search-result]").count(), 1);
	await input.fill("total");
	await site.page.getByText("Search is not available on this page.", { exact: true }).waitFor();
	await site.page.waitForTimeout(1_000);
	assert.equal(requests, 2, "A new query may attempt recovery exactly once");
	assert.equal(await site.page.locator("a[data-search-result]").count(), 0);
	assert.deepEqual(site.errors, []);
	console.log(
		"PASS single recovery request for partial and total failures, healthy results preserved",
	);
} finally {
	await site.browser.close();
}
