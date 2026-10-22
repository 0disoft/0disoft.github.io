import assert from "node:assert/strict";
import { openBuiltSite, readCatalog } from "./browser-test-site.mjs";

const real = await openBuiltSite();
try {
	await real.page.goto(real.origin + "/indiehackers/carrd/");
	const body = await real.page.locator("main#main-content[data-pagefind-body]").count();
	assert.equal(body, 1);
	await real.page.getByRole("button", { name: /^Search/ }).click();
	await real.page.locator("#search-dialog-input").fill("Carrd");
	const result = real.page.locator('a[data-search-result][href*="/indiehackers/carrd"]');
	await result.first().waitFor();
	await result.first().click();
	assert.equal(await real.page.locator(".search-dialog[open]").count(), 0);
	for (const locale of ["en", "es", "fr", "hi", "ko", "zh"]) {
		const post = (await readCatalog(locale)).find((post) => post.id === "carrd");
		const prefix = locale === "en" ? "" : "/" + locale;
		await real.page.goto(real.origin + prefix + "/indiehackers/carrd/");
		await real.page.getByRole("heading", { level: 1, name: post.title, exact: true }).waitFor();
	}
	assert.deepEqual(real.errors, []);
	console.log(
		"PASS real Pagefind result navigation and current article hydration in all six locales",
	);
} finally {
	await real.browser.close();
}

const mock = await openBuiltSite({
	pagefindModule:
		'export async function search(term){return {results:Array.from({length:45},(_,i)=>({id:term+"-"+i,data:async()=>{await new Promise(r=>setTimeout(r,term==="old"?300:0));return {url:"/indiehackers/"+term+"-"+i,meta:{title:term+" "+i},excerpt:"<mark>"+term+"</mark>"}}}))}}',
});
try {
	await mock.page.goto(mock.origin + "/");
	await mock.page.getByRole("button", { name: /^Search/ }).click();
	const input = mock.page.locator("#search-dialog-input");
	await input.fill("batch");
	const count = (n) =>
		mock.page.waitForFunction(
			(n) => document.querySelectorAll("a[data-search-result]").length === n,
			n,
		);
	await count(20);
	await mock.page.locator(".search-more").click();
	await count(40);
	await mock.page.locator(".search-more").click();
	await count(45);
	await mock.page.waitForFunction(() => !document.querySelector(".search-more"));
	await input.fill("old");
	await mock.page.waitForTimeout(180);
	await input.fill("latest");
	await count(20);
	await mock.page.waitForTimeout(350);
	assert.equal(await mock.page.locator(".search-result-title").first().innerText(), "latest 0");
	await mock.page.getByRole("button", { name: "Close", exact: true }).click();
	await mock.page.getByRole("button", { name: /^Search/ }).click();
	assert.equal(await input.inputValue(), "");
	assert.equal(await mock.page.locator("a[data-search-result]").count(), 0);
	assert.deepEqual(mock.errors, []);
	console.log("PASS batches 20/40/45, stale completion and close/reopen reset");
} finally {
	await mock.browser.close();
}
