import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
	env: {
		PUBLIC_TALLYFIN_ENDPOINT: "https://tallyfin.example.invalid/v1/projects/zerodi-site/batches",
	},
	consent: false,
	track: vi.fn(() => true),
	destroy: vi.fn(),
	create: vi.fn(),
	run: vi.fn(),
	funnel: vi.fn(
		(_name: string, _properties: Record<string, string>, _link: { runId: string }) => true,
	),
}));
vi.mock("$app/environment", () => ({ browser: true }));
vi.mock("$env/dynamic/public", () => ({ env: state.env }));
vi.mock("$lib/site-analytics", () => ({ readStoredAnalyticsConsent: () => state.consent }));
vi.mock("@tallyfin/browser/funnels", () => ({ createTallyfinFunnels: state.create }));

describe("consented Tallyfin page views", () => {
	beforeEach(() => {
		vi.resetModules();
		state.consent = false;
		state.env.PUBLIC_TALLYFIN_ENDPOINT =
			"https://tallyfin.example.invalid/v1/projects/zerodi-site/batches";
		state.track.mockReset().mockReturnValue(true);
		state.destroy.mockReset();
		state.funnel.mockReset().mockReturnValue(true);
		state.run.mockReset().mockImplementation((funnelId) => ({
			funnelId,
			runId: crypto.randomUUID(),
			startedAt: new Date().toISOString(),
		}));
		state.create.mockReset().mockReturnValue({
			track: state.track,
			destroy: state.destroy,
			createFunnelRun: state.run,
			trackFunnel: state.funnel,
		});
		vi.stubGlobal("window", { location: new URL("https://0disoft.github.io/") });
	});
	afterEach(() => vi.unstubAllGlobals());

	it("sends only bounded categories and languages, excluding private URL components", async () => {
		const { tallyfinPageProperties } = await import("./site-tallyfin-config");
		for (const locale of ["en", "ko", "zh", "es", "fr", "hi"]) {
			expect(
				tallyfinPageProperties(
					new URL(`https://0disoft.github.io/${locale}/indiehackers/private-slug/?q=secret#name`),
				),
			).toEqual({ section: "story", locale });
		}
		expect(tallyfinPageProperties(new URL("https://0disoft.github.io/unknown/private"))).toEqual({
			section: "other",
			locale: "en",
		});
		expect(tallyfinPageProperties(new URL("https://0disoft.github.io/"))).toEqual({
			section: "home",
			locale: "en",
		});
	});

	it("requires consent and the production site, without creating clients on previews", async () => {
		const analytics = await import("./site-tallyfin");
		analytics.setTallyfinConsent(true);
		expect(state.create).not.toHaveBeenCalled();
		state.consent = true;
		vi.stubGlobal("window", { location: new URL("https://preview.example.invalid/") });
		analytics.setTallyfinConsent(true);
		expect(state.create).not.toHaveBeenCalled();
	});

	it("deduplicates initialization per navigation, counts revisits and destroys pending work on withdrawal", async () => {
		state.consent = true;
		const analytics = await import("./site-tallyfin");
		const url = new URL("https://0disoft.github.io/"),
			navigation = {};
		analytics.setTallyfinConsent(true);
		expect(analytics.trackTallyfinPageView(url, navigation)).toBe(true);
		expect(analytics.trackTallyfinPageView(url, navigation)).toBe(false);
		expect(analytics.trackTallyfinPageView(url, {})).toBe(true);
		expect(state.track).toHaveBeenCalledTimes(2);
		state.consent = false;
		analytics.setTallyfinConsent(false);
		expect(state.destroy).toHaveBeenCalledOnce();
		expect(analytics.trackTallyfinPageView(url, {})).toBe(false);
	});

	it("does not mark rejected events delivered or accept a foreign page origin", async () => {
		state.consent = true;
		const analytics = await import("./site-tallyfin");
		analytics.setTallyfinConsent(true);
		const url = new URL("https://0disoft.github.io/"),
			navigation = {};
		state.track.mockReturnValueOnce(false);
		expect(analytics.trackTallyfinPageView(url, navigation)).toBe(false);
		expect(analytics.trackTallyfinPageView(url, navigation)).toBe(true);
		expect(analytics.trackTallyfinPageView(new URL("https://other.example.invalid/"), {})).toBe(
			false,
		);
	});

	it("fails closed for absent, insecure, credential-bearing and malformed collector endpoints", async () => {
		const { tallyfinEndpoint } = await import("./site-tallyfin-config");
		for (const endpoint of [
			"",
			"http://localhost/v1/projects/site/batches",
			"https://user:secret@collector.example.invalid/v1/projects/site/batches",
			"https://collector.example.invalid/v1/projects/site/batches?token=x",
			"https://collector.example.invalid/admin",
			"not a URL",
		]) {
			state.env.PUBLIC_TALLYFIN_ENDPOINT = endpoint;
			expect(tallyfinEndpoint()).toBeNull();
		}
	});
});

describe("bounded task funnels", () => {
	beforeEach(() => {
		vi.resetModules();
		state.consent = true;
		state.env.PUBLIC_TALLYFIN_ENDPOINT =
			"https://tallyfin.example.invalid/v1/projects/zerodi-site/batches";
		state.track.mockReset().mockReturnValue(true);
		state.funnel.mockReset().mockReturnValue(true);
		state.run.mockReset().mockImplementation((funnelId) => ({
			funnelId,
			runId: crypto.randomUUID(),
			startedAt: new Date().toISOString(),
		}));
		state.create.mockReset().mockReturnValue({
			track: state.track,
			destroy: state.destroy,
			createFunnelRun: state.run,
			trackFunnel: state.funnel,
		});
		vi.stubGlobal("window", {
			location: new URL("https://0disoft.github.io/indiehackers/example"),
		});
	});
	afterEach(() => vi.unstubAllGlobals());
	const names = () => state.funnel.mock.calls.map((call) => call[0]);
	async function story() {
		const analytics = await import("./site-tallyfin");
		analytics.setTallyfinConsent(true);
		analytics.trackTallyfinPageView(new URL(window.location.href), {});
		return analytics;
	}
	it("counts a successful copy once, preserving the same run and bounded properties", async () => {
		const a = await story(),
			done = a.beginTallyfinShareCopy()!;
		expect(names()).toEqual(["story_opened", "share_copy_started"]);
		expect(done()).toBe(true);
		expect(done()).toBe(false);
		expect(a.beginTallyfinShareCopy()).toBeNull();
		expect(names()).toEqual(["story_opened", "share_copy_started", "share_link_copied"]);
		for (const call of state.funnel.mock.calls) {
			expect(call[1]).toEqual({ section: "story", locale: "en" });
			expect(call[2]).toEqual(state.funnel.mock.calls[0][2]);
		}
	});
	it("does not count failed copies as completed and permits retry without repeating a step", async () => {
		const a = await story();
		a.beginTallyfinShareCopy();
		expect(names()).not.toContain("share_link_copied");
		expect(a.beginTallyfinShareCopy()!()).toBe(true);
		expect(names()).toEqual(["story_opened", "share_copy_started", "share_link_copied"]);
	});
	it("rejects late completion after navigation, withdrawal and reconsent", async () => {
		const a = await story(),
			done = a.beginTallyfinShareCopy()!;
		a.setTallyfinConsent(false);
		a.setTallyfinConsent(true);
		a.trackTallyfinPageView(new URL(window.location.href), {});
		expect(done()).toBe(false);
		const next = a.beginTallyfinShareCopy()!;
		a.trackTallyfinPageView(new URL("https://0disoft.github.io/"), {});
		expect(next()).toBe(false);
	});
	it("does not create contexts without consent or for rejected first steps", async () => {
		const a = await import("./site-tallyfin");
		state.consent = false;
		a.setTallyfinConsent(true);
		a.startTallyfinSearch();
		expect(state.run).not.toHaveBeenCalled();
		expect(a.beginTallyfinShareCopy()).toBeNull();
		state.consent = true;
		state.funnel.mockReturnValue(false);
		a.setTallyfinConsent(true);
		a.trackTallyfinPageView(new URL(window.location.href), {});
		expect(a.beginTallyfinShareCopy()).toBeNull();
	});
	it("finishes search only after the expected destination navigation, even when the dialog closes", async () => {
		const a = await story(),
			url = new URL("https://0disoft.github.io/investors/?private=query");
		state.funnel.mockClear();
		a.startTallyfinSearch();
		expect(a.trackTallyfinSearchResult(new URL("https://foreign.invalid/"))).toBe(false);
		expect(a.trackTallyfinSearchResult(url)).toBe(true);
		a.cancelTallyfinSearch();
		expect(names()).toEqual(["search_started", "search_result_clicked"]);
		a.trackTallyfinPageView(url, {});
		expect(names()).toEqual([
			"search_started",
			"search_result_clicked",
			"search_destination_opened",
		]);
		for (const call of state.funnel.mock.calls)
			expect(call[1]).toEqual({ section: "story", locale: "en" });
	});
	it("clears stale search results, rejects mismatched destinations and rotates runs per search", async () => {
		const a = await story();
		state.funnel.mockClear();
		a.startTallyfinSearch();
		a.cancelTallyfinSearch();
		expect(a.trackTallyfinSearchResult(new URL("https://0disoft.github.io/creators/"))).toBe(false);
		a.startTallyfinSearch();
		expect(state.funnel.mock.calls[0][2].runId).not.toBe(state.funnel.mock.calls[1][2].runId);
		a.trackTallyfinSearchResult(new URL("https://0disoft.github.io/creators/"));
		a.trackTallyfinPageView(new URL("https://0disoft.github.io/privacy/"), {});
		a.trackTallyfinPageView(new URL("https://0disoft.github.io/creators/"), {});
		expect(names()).not.toContain("search_destination_opened");
	});
});
