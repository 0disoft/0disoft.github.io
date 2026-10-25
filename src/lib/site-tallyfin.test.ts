import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
	env: {
		PUBLIC_TALLYFIN_ENDPOINT: "https://tallyfin.example.invalid/v1/projects/zerodi-site/batches",
	},
	consent: false,
	track: vi.fn(() => true),
	destroy: vi.fn(),
	create: vi.fn(),
}));
vi.mock("$app/environment", () => ({ browser: true }));
vi.mock("$env/dynamic/public", () => ({ env: state.env }));
vi.mock("$lib/site-analytics", () => ({ readStoredAnalyticsConsent: () => state.consent }));
vi.mock("@tallyfin/browser", () => ({ createTallyfin: state.create }));

describe("consented Tallyfin page views", () => {
	beforeEach(() => {
		vi.resetModules();
		state.consent = false;
		state.env.PUBLIC_TALLYFIN_ENDPOINT =
			"https://tallyfin.example.invalid/v1/projects/zerodi-site/batches";
		state.track.mockReset().mockReturnValue(true);
		state.destroy.mockReset();
		state.create.mockReset().mockReturnValue({ track: state.track, destroy: state.destroy });
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
