import assert from "node:assert/strict";
import { openBuiltSite } from "./browser-test-site.mjs";
import {
	tallyfinPilotEndpoint as endpoint,
	exerciseTallyfinActions,
} from "./tallyfin-action-journey.mjs";
const site = await openBuiltSite({
	origin: "https://0disoft.github.io",
	env: { PUBLIC_TALLYFIN_ENDPOINT: endpoint },
});
const timer = setTimeout(() => void site.browser.close(), 90000);
const batches = [];
try {
	await site.context.route(endpoint, async (route) => {
		const request = route.request();
		for (const header of ["authorization", "cookie", "referer"])
			assert.equal(request.headers()[header], undefined);
		batches.push(JSON.parse(request.postData()));
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: "{}",
			headers: { "Access-Control-Allow-Origin": site.origin },
		});
	});
	const report = await exerciseTallyfinActions({ ...site, batches });
	assert.deepEqual(site.errors, []);
	console.log(JSON.stringify({ verified: true, mode: "isolated", ...report }));
} finally {
	clearTimeout(timer);
	await site.browser.close();
}
