import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("$app/environment", () => ({ browser: true }));
vi.mock("$env/dynamic/public", () => ({
	env: { PUBLIC_GA4_MEASUREMENT_ID: "G-ABC123DEF4" },
}));

describe("site analytics page-view delivery", () => {
	const gtag = vi.fn();
	const getItem = vi.fn();
	const pageA = new URL("https://0disoft.github.io/");
	const pageB = new URL("https://0disoft.github.io/blog/");

	beforeEach(() => {
		vi.resetModules();
		gtag.mockReset();
		getItem.mockReset().mockReturnValue("granted");
		vi.stubGlobal("window", { gtag, localStorage: { getItem } });
		// An already-loaded script keeps these delivery tests entirely offline.
		vi.stubGlobal("document", { getElementById: () => ({ id: "0disoft-ga4" }) });
	});

	afterEach(() => vi.unstubAllGlobals());

	async function readyAnalytics() {
		const analytics = await import("./site-analytics");
		expect(await analytics.initSiteAnalytics()).toBe(true);
		gtag.mockClear();
		return analytics;
	}

	it("deduplicates initialization and navigation callbacks for the same visit", async () => {
		const { trackGa4PageView } = await readyAnalytics();
		const visit = {};
		expect(trackGa4PageView(pageA, "Home", visit)).toBe(true);
		expect(trackGa4PageView(new URL(pageA), "Home", visit)).toBe(false);
		expect(gtag).toHaveBeenCalledTimes(1);
		expect(gtag).toHaveBeenCalledWith("event", "page_view", {
			page_location: pageA.href,
			page_path: "/",
			page_title: "Home",
		});
	});

	it("counts all three visits in A to B to A navigation", async () => {
		const { trackGa4PageView } = await readyAnalytics();
		expect(trackGa4PageView(pageA, "Home", {})).toBe(true);
		expect(trackGa4PageView(pageB, "Blog", {})).toBe(true);
		expect(trackGa4PageView(pageA, "Home", {})).toBe(true);
		expect(gtag.mock.calls.map((call) => call[2].page_location)).toEqual([
			pageA.href,
			pageB.href,
			pageA.href,
		]);
	});

	it("counts a new navigation even when its URL is unchanged", async () => {
		const { trackGa4PageView } = await readyAnalytics();
		expect(trackGa4PageView(pageA, "Home", {})).toBe(true);
		expect(trackGa4PageView(pageA, "Home", {})).toBe(true);
		expect(gtag).toHaveBeenCalledTimes(2);
	});

	it("does not consume a visit before initialization or while consent is denied", async () => {
		const analytics = await import("./site-analytics");
		const visit = {};
		expect(analytics.trackGa4PageView(pageA, "Home", visit)).toBe(false);
		expect(await analytics.initSiteAnalytics()).toBe(true);
		gtag.mockClear();
		getItem.mockReturnValue("denied");
		expect(analytics.trackGa4PageView(pageA, "Home", visit)).toBe(false);
		expect(gtag).not.toHaveBeenCalled();
		getItem.mockReturnValue("granted");
		expect(analytics.trackGa4PageView(pageA, "Home", visit)).toBe(true);
		expect(gtag).toHaveBeenCalledTimes(1);
	});
});
