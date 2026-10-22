import { browser } from "$app/environment";
import { env as publicEnv } from "$env/dynamic/public";
import { createConsentStorage } from "$lib/site-consent-storage";
import {
	createGa4PageViewPayload,
	createGa4ScriptSrc,
	isAnalyticsConsentValue,
	isAnalyticsMeasurementIdConfigured,
	siteAnalyticsConsentChangeEvent,
	siteAnalyticsConsentStorageKey,
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
let lastTrackedNavigation: object | null = null;
const measurementId = publicEnv.PUBLIC_GA4_MEASUREMENT_ID?.trim() ?? "";

let initializedMeasurementId: string | null = null;
let scriptLoadPromise: Promise<boolean> | null = null;
const consentStorage = createConsentStorage({
	storageKey: siteAnalyticsConsentStorageKey,
	changeEvent: siteAnalyticsConsentChangeEvent,
	isValue: isAnalyticsConsentValue,
	onChange: setGa4AnalyticsConsent,
});

export function isSiteAnalyticsConfigured(): boolean {
	return isAnalyticsMeasurementIdConfigured(measurementId);
}

export const readStoredAnalyticsConsentValue = consentStorage.read;
export const writeStoredAnalyticsConsent = consentStorage.write;
export const subscribeAnalyticsConsent = consentStorage.subscribe;

export function readStoredAnalyticsConsent(): boolean {
	return readStoredAnalyticsConsentValue() === "granted";
}

export async function initSiteAnalytics(): Promise<boolean> {
	if (!browser || !isSiteAnalyticsConfigured() || !readStoredAnalyticsConsent()) {
		return false;
	}

	ensureGtagCommand();
	window.gtag?.("consent", "default", { analytics_storage: "granted" });

	const loaded = await loadGa4Script();

	if (!loaded || !readStoredAnalyticsConsent()) {
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

export function trackGa4PageView(url: URL, title: string, navigation: object): boolean {
	if (
		!browser ||
		!initializedMeasurementId ||
		!readStoredAnalyticsConsent() ||
		typeof window.gtag !== "function"
	) {
		return false;
	}

	const payload = createGa4PageViewPayload(url, title);
	if (lastTrackedNavigation === navigation) {
		return false;
	}

	window.gtag("event", "page_view", payload);
	lastTrackedNavigation = navigation;

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

	const attempt = new Promise<boolean>((resolve) => {
		const existing = document.getElementById(ga4ScriptId) as HTMLScriptElement | null;
		if (existing?.dataset.ga4Loaded === "true") {
			resolve(true);
			return;
		}
		const script = existing ?? document.createElement("script");
		const timeout = setTimeout(() => finish(false), 10_000);
		let settled = false;
		function finish(loaded: boolean) {
			if (settled) return;
			settled = true;
			clearTimeout(timeout);
			script.onload = null;
			script.onerror = null;
			if (loaded) script.dataset.ga4Loaded = "true";
			else script.remove();
			resolve(loaded);
		}
		script.onload = () => finish(true);
		script.onerror = () => finish(false);
		if (!existing) {
			script.id = ga4ScriptId;
			script.async = true;
			script.src = createGa4ScriptSrc(measurementId);
			document.head.append(script);
		}
	});
	scriptLoadPromise = attempt;
	void attempt.then((loaded) => {
		if (!loaded && scriptLoadPromise === attempt) scriptLoadPromise = null;
	});
	return attempt;
}
