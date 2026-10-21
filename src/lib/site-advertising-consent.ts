import { browser } from "$app/environment";

export const siteAdvertisingConsentStorageKey = "0disoft:advertising-consent";
export const siteAdvertisingConsentChangeEvent = "0disoft:advertising-consent-change";

export type AdvertisingConsentValue = "granted" | "denied";
let consentOverride: AdvertisingConsentValue | undefined;

export function isAdvertisingConsentValue(value: unknown): value is AdvertisingConsentValue {
	return value === "granted" || value === "denied";
}

export function readStoredAdvertisingConsentValue(): AdvertisingConsentValue | null {
	if (!browser) {
		return null;
	}
	if (consentOverride !== undefined) return consentOverride;

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
		consentOverride = undefined;
	} catch {
		consentOverride = value;
	}

	window.dispatchEvent(
		new CustomEvent(siteAdvertisingConsentChangeEvent, {
			detail: { enabled, value },
		}),
	);
}

export function subscribeAdvertisingConsent(
	listener: (value: AdvertisingConsentValue | null) => void,
) {
	if (!browser) return () => {};
	const notify = () => listener(readStoredAdvertisingConsentValue());
	const onStorage = (event: StorageEvent) => {
		if (event.key !== null && event.key !== siteAdvertisingConsentStorageKey) return;
		try {
			if (event.storageArea !== window.localStorage) return;
		} catch {
			return;
		}
		consentOverride = undefined;
		notify();
	};
	window.addEventListener(siteAdvertisingConsentChangeEvent, notify);
	window.addEventListener("storage", onStorage);
	notify();
	return () => {
		window.removeEventListener(siteAdvertisingConsentChangeEvent, notify);
		window.removeEventListener("storage", onStorage);
	};
}
