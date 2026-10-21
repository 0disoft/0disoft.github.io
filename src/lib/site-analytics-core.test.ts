import { describe, expect, it } from "vitest";
import {
	createGa4PageViewPayload,
	createGa4ScriptSrc,
	isAnalyticsConsentValue,
	isAnalyticsMeasurementIdConfigured,
	siteAnalyticsConsentStorageKey,
} from "./site-analytics-core";

describe("site analytics core", () => {
	it("treats analytics as opt-in and only accepts explicit consent values", () => {
		expect(siteAnalyticsConsentStorageKey).toBe("0disoft:analytics-consent");
		expect(isAnalyticsConsentValue("granted")).toBe(true);
		expect(isAnalyticsConsentValue("denied")).toBe(true);
		expect(isAnalyticsConsentValue("")).toBe(false);
		expect(isAnalyticsConsentValue("yes")).toBe(false);
	});

	it("only enables GA4 when a measurement id is configured", () => {
		expect(isAnalyticsMeasurementIdConfigured("G-ABC123DEF4")).toBe(true);
		expect(isAnalyticsMeasurementIdConfigured(" g-abc123def4 ")).toBe(true);
		expect(isAnalyticsMeasurementIdConfigured("")).toBe(false);
		expect(isAnalyticsMeasurementIdConfigured("UA-123456-1")).toBe(false);
	});

	it("builds GA4 script and manual page-view payloads", () => {
		expect(createGa4ScriptSrc("G-ABC123DEF4")).toBe(
			"https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4",
		);

		expect(
			createGa4PageViewPayload(
				new URL("https://0disoft.github.io/ko/blog/credit-lot-spend-expiry-design/?tag=payments"),
				"크레딧 차감 순서를 설계하는 법",
			),
		).toEqual({
			page_location: "https://0disoft.github.io/ko/blog/credit-lot-spend-expiry-design/",
			page_path: "/ko/blog/credit-lot-spend-expiry-design/",
			page_title: "크레딧 차감 순서를 설계하는 법",
		});
	});

	it("excludes queries, fragments and credentials from page-view URLs", () => {
		const payload = createGa4PageViewPayload(
			new URL(
				"https://user:secret@0disoft.github.io/indiehackers/?q=private@example.test&token=secret#private-note",
			),
			"Stories",
		);
		expect(payload).toEqual({
			page_location: "https://0disoft.github.io/indiehackers/",
			page_path: "/indiehackers/",
			page_title: "Stories",
		});
	});
});
