import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("$app/environment", () => ({ browser: true }));
vi.mock("$env/dynamic/public", () => ({
	env: { PUBLIC_GA4_MEASUREMENT_ID: "G-ABC123DEF4" },
}));

describe("site analytics page-view delivery", () => {
	const gtag = vi.fn();
	const getItem = vi.fn();
	const setItem = vi.fn();
	const pageA = new URL("https://0disoft.github.io/");
	const pageB = new URL("https://0disoft.github.io/blog/");

	beforeEach(() => {
		vi.resetModules();
		gtag.mockReset();
		getItem.mockReset().mockReturnValue("granted");
		setItem.mockReset().mockImplementation((_key, value) => getItem.mockReturnValue(value));
		vi.stubGlobal(
			"window",
			Object.assign(new EventTarget(), { gtag, localStorage: { getItem, setItem } }),
		);
		// An already-loaded script keeps these delivery tests entirely offline.
		vi.stubGlobal("document", {
			getElementById: () => ({ id: "0disoft-ga4", dataset: { ga4Loaded: "true" } }),
		});
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllGlobals();
	});

	async function readyAnalytics() {
		const analytics = await import("./site-analytics");
		expect(await analytics.initSiteAnalytics()).toBe(true);
		gtag.mockClear();
		return analytics;
	}

	it("retains both consent choices in this tab when persistence fails", async () => {
		const analytics = await import("./site-analytics");
		const listener = vi.fn();
		const unsubscribe = analytics.subscribeAnalyticsConsent(listener);
		setItem.mockImplementation(() => {
			throw new Error("Storage blocked");
		});
		analytics.writeStoredAnalyticsConsent(false);
		expect(analytics.readStoredAnalyticsConsentValue()).toBe("denied");
		expect(listener).toHaveBeenLastCalledWith("denied");
		analytics.writeStoredAnalyticsConsent(true);
		expect(analytics.readStoredAnalyticsConsentValue()).toBe("granted");
		expect(listener).toHaveBeenLastCalledWith("granted");
		unsubscribe();
		listener.mockClear();
		analytics.writeStoredAnalyticsConsent(false);
		expect(listener).not.toHaveBeenCalled();
	});

	it("follows current local storage across tabs and ignores unrelated storage events", async () => {
		const analytics = await readyAnalytics();
		const { siteAnalyticsConsentStorageKey: key } = await import("./site-analytics-core");
		const listener = vi.fn();
		const unsubscribe = analytics.subscribeAnalyticsConsent(listener);
		const emit = (eventKey: string | null, storageArea: object) => {
			window.dispatchEvent(
				Object.assign(new Event("storage"), { key: eventKey, storageArea, newValue: "granted" }),
			);
		};
		getItem.mockReturnValue("denied");
		emit("unrelated", window.localStorage);
		emit(key, {});
		expect(listener).toHaveBeenCalledTimes(1);
		emit(key, window.localStorage);
		expect(listener).toHaveBeenLastCalledWith("denied");
		expect(analytics.trackGa4PageView(pageA, "Home", {})).toBe(false);
		getItem.mockReturnValue(null);
		emit(null, window.localStorage);
		expect(listener).toHaveBeenLastCalledWith(null);
		unsubscribe();
		listener.mockClear();
		emit(key, window.localStorage);
		expect(listener).not.toHaveBeenCalled();
	});

	it("does not configure GA when consent is revoked during script loading", async () => {
		const script: { onload?: () => void; dataset: Record<string, string> } = { dataset: {} };
		vi.stubGlobal("document", {
			getElementById: () => null,
			createElement: () => script,
			head: { append: vi.fn() },
		});
		const analytics = await import("./site-analytics");
		const pending = analytics.initSiteAnalytics();
		analytics.writeStoredAnalyticsConsent(false);
		script.onload?.();
		expect(await pending).toBe(false);
		expect(gtag.mock.calls.some((call) => call[0] === "config")).toBe(false);
	});

	it.each(["error", "timeout"])(
		"retries after %s and shares concurrent loading",
		async (failure) => {
			vi.useFakeTimers();
			const scripts: Array<{
				onload?: (() => void) | null;
				onerror?: (() => void) | null;
				dataset: Record<string, string>;
				remove: ReturnType<typeof vi.fn>;
			}> = [];
			vi.stubGlobal("document", {
				getElementById: () => null,
				createElement: () => {
					const script = { dataset: {}, remove: vi.fn() };
					scripts.push(script);
					return script;
				},
				head: { append: vi.fn() },
			});
			const analytics = await import("./site-analytics");
			const first = analytics.initSiteAnalytics();
			const concurrent = analytics.initSiteAnalytics();
			expect(scripts).toHaveLength(1);
			const staleLoad = scripts[0].onload;
			if (failure === "error") scripts[0].onerror?.();
			else await vi.advanceTimersByTimeAsync(10_000);
			expect(await first).toBe(false);
			expect(await concurrent).toBe(false);
			expect(scripts[0].remove).toHaveBeenCalledOnce();
			const retry = analytics.initSiteAnalytics();
			expect(scripts).toHaveLength(2);
			staleLoad?.();
			expect(scripts[0].dataset.ga4Loaded).toBeUndefined();
			scripts[1].onload?.();
			expect(await retry).toBe(true);
			expect(vi.getTimerCount()).toBe(0);
		},
	);

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
