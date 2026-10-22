import assert from "node:assert/strict";
import { openBuiltSite, readCatalog } from "./browser-test-site.mjs";

const posts = (await readCatalog("ko")).filter((post) => !post.collection);
for (const viewport of [
	{ width: 1440, height: 1000 },
	{ width: 390, height: 844 },
]) {
	const { browser, page, origin, errors } = await openBuiltSite({ viewport });
	try {
		const latest = posts
			.map((post) => post.publishedAt)
			.sort()
			.at(-1);
		await page.clock.install({ time: new Date(latest + "T03:00:00Z") });
		await page.goto(origin + "/ko/indiehackers/?recent=0");
		const cards = page.locator("[data-indiehackers-post]");
		await page.waitForFunction(
			(count) => document.querySelectorAll("[data-indiehackers-post]").length === count,
			posts.length,
		);
		await page.locator("#indiehackers-search").fill("zz-no-matching-story-zz");
		await page.locator(".indiehackers-empty").waitFor();
		assert.equal(await cards.count(), 0);
		await page.locator("#indiehackers-search").fill("");
		const tagId = "saas";
		const tag = page.locator('input[name="tag"][value="' + tagId + '"]');
		await tag.locator("xpath=ancestor::details/summary").click();
		await tag.check();
		const expected = posts.filter((post) => post.tags.includes(tagId)).length;
		await page.waitForFunction(
			(count) => document.querySelectorAll("[data-indiehackers-post]").length === count,
			expected,
		);
		await page.reload();
		await page.waitForFunction(
			() => document.querySelector('input[name="tag"][value="saas"]').checked,
		);
		assert.equal(await cards.count(), expected);
		// Create a separate history entry, then restore the selected facet.
		await page.locator("details[data-facet]").filter({ has: tag }).locator("summary").click();
		await tag.uncheck();
		await page.goBack();
		await page.waitForFunction(
			() => document.querySelector('input[name="tag"][value="saas"]').checked,
		);
		assert.equal(await cards.count(), expected);
		await page.locator(".chip-clear").click();
		assert.equal(await page.locator('input[name="tag"]:checked').count(), 0);
		assert.equal(await page.locator('input[name="recent"]').isChecked(), true);
		assert.equal(
			await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
			false,
		);
		const image = cards.locator("img").first();
		if (await image.count()) {
			await image.scrollIntoViewIfNeeded();
			await image.evaluate((img) => img.decode());
			assert.match(await image.getAttribute("src"), /\.webp$/);
		}
		assert.deepEqual(errors, []);
		console.log(
			"PASS " +
				viewport.width +
				"px: " +
				posts.length +
				" registered stories, search, facets, reload, history, reset and WebP",
		);
	} finally {
		await browser.close();
	}
}
