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
				new URL("https://0disoft.github.io/ko/blog/ai-smaller-faster-companies/?tag=strategy"),
				"AI가 회사를 더 작고 빠르게 바꾸고 있다",
			),
		).toEqual({
			page_location: "https://0disoft.github.io/ko/blog/ai-smaller-faster-companies/?tag=strategy",
			page_path: "/ko/blog/ai-smaller-faster-companies/?tag=strategy",
			page_title: "AI가 회사를 더 작고 빠르게 바꾸고 있다",
		});
	});
});
