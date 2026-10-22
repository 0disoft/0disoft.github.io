import { createConsentStorage } from "$lib/site-consent-storage";

export const siteAdvertisingConsentStorageKey = "0disoft:advertising-consent";
export const siteAdvertisingConsentChangeEvent = "0disoft:advertising-consent-change";

export type AdvertisingConsentValue = "granted" | "denied";

export function isAdvertisingConsentValue(value: unknown): value is AdvertisingConsentValue {
	return value === "granted" || value === "denied";
}

const consentStorage = createConsentStorage({
	storageKey: siteAdvertisingConsentStorageKey,
	changeEvent: siteAdvertisingConsentChangeEvent,
	isValue: isAdvertisingConsentValue,
});

export const readStoredAdvertisingConsentValue = consentStorage.read;
export const writeStoredAdvertisingConsent = consentStorage.write;
export const subscribeAdvertisingConsent = consentStorage.subscribe;

export function readStoredAdvertisingConsent(): boolean {
	return readStoredAdvertisingConsentValue() === "granted";
}
