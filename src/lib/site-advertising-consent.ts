import { browser } from "$app/environment";

export const siteAdvertisingConsentStorageKey = "0disoft:advertising-consent";
export const siteAdvertisingConsentChangeEvent = "0disoft:advertising-consent-change";

export type AdvertisingConsentValue = "granted" | "denied";

export function isAdvertisingConsentValue(value: unknown): value is AdvertisingConsentValue {
	return value === "granted" || value === "denied";
}

export function readStoredAdvertisingConsentValue(): AdvertisingConsentValue | null {
	if (!browser) {
		return null;
	}

	try {
		const value = window.localStorage.getItem(siteAdvertisingConsentStorageKey);

		return isAdvertisingConsentValue(value) ? value : null;
	} catch {
		return null;
	}
}

export function readStoredAdvertisingConsent(): boolean {
	return readStoredAdvertisingConsentValue() === "granted";
}

export function writeStoredAdvertisingConsent(enabled: boolean) {
	if (!browser) {
		return;
	}

	const value = enabled ? "granted" : "denied";

	try {
		window.localStorage.setItem(siteAdvertisingConsentStorageKey, value);
	} catch {
		// Private browsing modes can block storage; the current tab still receives the event below.
	}

	window.dispatchEvent(
		new CustomEvent(siteAdvertisingConsentChangeEvent, {
			detail: { enabled, value },
		}),
	);
}
