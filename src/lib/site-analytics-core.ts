export const siteAnalyticsConsentStorageKey = "0disoft:analytics-consent";
export const siteAnalyticsConsentChangeEvent = "0disoft:analytics-consent-change";

export type AnalyticsConsentValue = "granted" | "denied";

export type Ga4PageViewPayload = {
	page_location: string;
	page_path: string;
	page_title: string;
};

export function isAnalyticsConsentValue(value: unknown): value is AnalyticsConsentValue {
	return value === "granted" || value === "denied";
}

export function isAnalyticsMeasurementIdConfigured(measurementId: string | undefined): boolean {
	return /^G-[A-Z0-9]+$/i.test(measurementId?.trim() ?? "");
}

export function createGa4ScriptSrc(measurementId: string): string {
	const url = new URL("https://www.googletagmanager.com/gtag/js");
	url.searchParams.set("id", measurementId.trim());

	return url.toString();
}

export function createGa4PageViewPayload(url: URL, title: string): Ga4PageViewPayload {
	return {
		page_location: url.href,
		page_path: `${url.pathname}${url.search}`,
		page_title: title,
	};
}
