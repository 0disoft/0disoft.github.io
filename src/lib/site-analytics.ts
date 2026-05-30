import { browser } from "$app/environment";
import { env as publicEnv } from "$env/dynamic/public";
import {
	createGa4PageViewPayload,
	createGa4ScriptSrc,
	isAnalyticsConsentValue,
	isAnalyticsMeasurementIdConfigured,
	siteAnalyticsConsentChangeEvent,
	siteAnalyticsConsentStorageKey,
	type AnalyticsConsentValue,
} from "$lib/site-analytics-core";

type GtagCommand =
	| [command: "js", date: Date]
	| [command: "config", targetId: string, config?: object]
	| [command: "event", eventName: string, params?: object]
	| [command: "consent", consentCommand: "default" | "update", params: object];

declare global {
	interface Window {
		dataLayer?: GtagCommand[];
		gtag?: (...command: GtagCommand) => void;
	}
}

const ga4ScriptId = "0disoft-ga4";
const trackedPageKeys = new Set<string>();
const measurementId = publicEnv.PUBLIC_GA4_MEASUREMENT_ID?.trim() ?? "";

let initializedMeasurementId: string | null = null;
let scriptLoadPromise: Promise<boolean> | null = null;

export function isSiteAnalyticsConfigured(): boolean {
	return isAnalyticsMeasurementIdConfigured(measurementId);
}

export function readStoredAnalyticsConsentValue(): AnalyticsConsentValue | null {
	if (!browser) {
		return null;
	}

	try {
		const value = window.localStorage.getItem(siteAnalyticsConsentStorageKey);

		return isAnalyticsConsentValue(value) ? value : null;
	} catch {
		return null;
	}
}

export function readStoredAnalyticsConsent(): boolean {
	return readStoredAnalyticsConsentValue() === "granted";
}

export function writeStoredAnalyticsConsent(enabled: boolean) {
	if (!browser) {
		return;
	}

	const value = enabled ? "granted" : "denied";

	try {
		window.localStorage.setItem(siteAnalyticsConsentStorageKey, value);
	} catch {
		// Private browsing modes can block storage; the current tab still receives the event below.
	}

	window.dispatchEvent(
		new CustomEvent(siteAnalyticsConsentChangeEvent, {
			detail: { enabled, value },
		}),
	);
}

export async function initSiteAnalytics(): Promise<boolean> {
	if (!browser || !isSiteAnalyticsConfigured() || !readStoredAnalyticsConsent()) {
		return false;
	}

	ensureGtagCommand();
	window.gtag?.("consent", "default", { analytics_storage: "granted" });

	const loaded = await loadGa4Script();

	if (!loaded) {
		return false;
	}

	if (initializedMeasurementId !== measurementId) {
		window.gtag?.("js", new Date());
		window.gtag?.("config", measurementId, { send_page_view: false });
		initializedMeasurementId = measurementId;
	}

	return true;
}

export function setGa4AnalyticsConsent(enabled: boolean) {
	if (!browser) {
		return;
	}

	ensureGtagCommand();
	window.gtag?.("consent", "update", {
		analytics_storage: enabled ? "granted" : "denied",
	});
}

export function trackGa4PageView(url: URL, title: string): boolean {
	if (
		!browser ||
		!initializedMeasurementId ||
		!readStoredAnalyticsConsent() ||
		typeof window.gtag !== "function"
	) {
		return false;
	}

	const payload = createGa4PageViewPayload(url, title);
	const pageKey = `${initializedMeasurementId}:${payload.page_location}`;

	if (trackedPageKeys.has(pageKey)) {
		return false;
	}

	trackedPageKeys.add(pageKey);
	window.gtag("event", "page_view", payload);

	return true;
}

function ensureGtagCommand() {
	window.dataLayer = window.dataLayer ?? [];
	window.gtag =
		window.gtag ??
		function gtag(...command: GtagCommand) {
			window.dataLayer?.push(command);
		};
}

function loadGa4Script(): Promise<boolean> {
	if (scriptLoadPromise) {
		return scriptLoadPromise;
	}

	const existingScript = document.getElementById(ga4ScriptId);

	if (existingScript) {
		scriptLoadPromise = Promise.resolve(true);
		return scriptLoadPromise;
	}

	scriptLoadPromise = new Promise((resolve) => {
		const script = document.createElement("script");
		script.id = ga4ScriptId;
		script.async = true;
		script.src = createGa4ScriptSrc(measurementId);
		script.onload = () => resolve(true);
		script.onerror = () => resolve(false);
		document.head.append(script);
	});

	return scriptLoadPromise;
}
