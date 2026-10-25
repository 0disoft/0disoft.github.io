import assert from "node:assert/strict";

export const tallyfinPilotEndpoint =
	"https://tallyfin-admin.rodisoft1.workers.dev/v1/projects/zerodi-site/batches";
export async function until(check, timeout = 20000) {
	const deadline = Date.now() + timeout;
	while (!check()) {
		assert.ok(Date.now() < deadline, "Timed out waiting for Tallyfin milestone");
		await new Promise((resolve) => setTimeout(resolve, 100));
	}
}
export function assertPilotPayloads(batches) {
	const names = new Set([
		"page_view",
		"story_opened",
		"share_copy_started",
		"share_link_copied",
		"search_started",
		"search_result_clicked",
		"search_destination_opened",
	]);
	for (const batch of batches) {
		assert.equal(batch.schemaVersion, 2);
		for (const event of batch.events) {
			assert.ok(names.has(event.name));
			assert.deepEqual(Object.keys(event.properties).sort(), ["locale", "section"]);
			assert.ok(["en", "ko", "zh", "es", "fr", "hi"].includes(event.properties.locale));
			assert.ok(
				["home", "indiehackers", "story", "investors", "creators", "privacy", "other"].includes(
					event.properties.section,
				),
			);
			if (event.name !== "page_view")
				assert.deepEqual(Object.keys(event.funnel).sort(), ["funnelId", "runId", "startedAt"]);
		}
	}
}
/** Real UI actions, shared by isolated and deployed-site verification. */
export async function exerciseTallyfinActions({ page, context, origin, batches }) {
	const events = () => batches.flatMap((batch) => batch.events);
	const named = (name) => events().filter((event) => event.name === name);
	await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin });
	await page.goto(origin + "/", { waitUntil: "networkidle" });
	assert.equal(batches.length, 0);
	await page.getByRole("button", { name: "Allow", exact: true }).click();
	await until(() => named("page_view").length === 1);
	await page.keyboard.press("/");
	const input = page.locator(".search-dialog input");
	await input.fill("Mailoji");
	const result = page.locator("a[data-search-result]").first();
	await result.waitFor();
	const href = await result.getAttribute("href");
	assert.ok(new URL(href, origin).pathname.includes("/indiehackers/"));
	await result.click();
	await page.locator("#post-title").waitFor();
	const copy = page
		.locator(".share-toolbar")
		.first()
		.getByRole("button", { name: "Copy link", exact: true });
	await copy.click();
	await page
		.locator(".share-toolbar")
		.first()
		.getByRole("button", { name: "Copied", exact: true })
		.waitFor();
	assert.ok(
		(await page.evaluate(() => navigator.clipboard.readText())).startsWith(
			origin + "/indiehackers/",
		),
	);
	await until(
		() =>
			named("share_link_copied").length === 1 && named("search_destination_opened").length === 1,
	);
	const completed = {
		story: named("story_opened")[0].funnel.runId,
		search: named("search_started")[0].funnel.runId,
	};
	for (const [runId, steps] of [
		[completed.story, ["story_opened", "share_copy_started", "share_link_copied"]],
		[completed.search, ["search_started", "search_result_clicked", "search_destination_opened"]],
	]) {
		assert.deepEqual(
			events()
				.filter((event) => event.funnel?.runId === runId)
				.map((event) => event.name),
			steps,
		);
	}
	// A second, fresh story run reaches attempt but fails both clipboard paths.
	await page.locator(".adjacent-card").first().click();
	await page.waitForURL((url) => url.pathname !== new URL(href, origin).pathname);
	await page.evaluate(() => {
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: {
				writeText: async () => {
					throw new DOMException("Denied", "NotAllowedError");
				},
			},
		});
		document.execCommand = () => false;
	});
	await page
		.locator(".share-toolbar")
		.first()
		.getByRole("button", { name: "Copy link", exact: true })
		.click();
	await page.locator(".manual-copy input").waitFor();
	await until(() => named("share_copy_started").length === 2);
	const failedRun = named("share_copy_started")[1].funnel.runId;
	assert.notEqual(failedRun, completed.story);
	assert.deepEqual(
		events()
			.filter((event) => event.funnel?.runId === failedRun)
			.map((event) => event.name),
		["story_opened", "share_copy_started"],
	);
	// Withdrawal clears contexts; neither searches nor failed copy retries can emit.
	await page.locator(".manual-copy input").blur();
	await page.keyboard.press("s");
	await page.locator('[data-settings-control="privacy-tab"]').click();
	await page.locator('[data-settings-control="privacy-analytics"]').click();
	await page.getByRole("button", { name: "Close", exact: true }).click();
	const beforeWithdrawal = batches.length;
	await page.keyboard.press("/");
	await input.fill("Mailoji");
	await result.waitFor();
	await result.click();
	await page
		.locator(".share-toolbar")
		.first()
		.getByRole("button", { name: "Copy link", exact: true })
		.click();
	await page.waitForTimeout(5500);
	assert.equal(batches.length, beforeWithdrawal);
	assertPilotPayloads(batches);
	return {
		completed,
		failedRun,
		beforeConsentRequests: 0,
		afterWithdrawalRequests: 0,
		eventCount: events().length,
	};
}
