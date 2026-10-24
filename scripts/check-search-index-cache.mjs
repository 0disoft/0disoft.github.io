import assert from "node:assert/strict";
import { openBuiltSite } from "./browser-test-site.mjs";

const site = await openBuiltSite({
	pagefindModule: `window.searchTerms = [];
		export async function search(term) {
			window.searchTerms.push(term);
			throw new Error("Pagefind unavailable");
		}`,
});
let release;
const gate = new Promise((resolve) => {
	release = resolve;
});
try {
	let requests = 0;
	await site.context.route("**/search-index/en.json", async (route) => {
		requests++;
		await gate;
		await route.fulfill({ contentType: "application/json", body: "[]" });
	});
	await site.page.goto(site.origin + "/");
	await site.page.getByRole("button", { name: /^Search/ }).click();
	const input = site.page.locator("#search-dialog-input");
	for (const term of ["one", "two", "three", "four"]) {
		await input.fill(term);
		await site.page.waitForFunction((term) => window.searchTerms?.includes(term), term);
	}
	release();
	await site.page.locator(".search-note").waitFor();
	console.log(`Overlapping queries: ${requests} index requests`);
	assert.equal(requests, 1, "Queries must share the pending locale index download");
	await input.fill("cached");
	await site.page.waitForFunction(() => window.searchTerms.includes("cached"));
	await site.page.locator(".search-note").waitFor();
	assert.equal(requests, 1, "A completed index must remain cached");
	assert.deepEqual(site.errors, []);
	console.log("PASS pending download shared across four queries and reused after completion");
} finally {
	release();
	await site.browser.close();
}
