import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("$app/environment", () => ({ browser: true }));

describe("advertising consent", () => {
	const getItem = vi.fn();
	const setItem = vi.fn();
	beforeEach(() => {
		vi.resetModules();
		getItem.mockReset().mockReturnValue("granted");
		setItem.mockReset().mockImplementation(() => {
			throw new Error("Storage blocked");
		});
		vi.stubGlobal(
			"window",
			Object.assign(new EventTarget(), { localStorage: { getItem, setItem } }),
		);
	});
	afterEach(() => vi.unstubAllGlobals());

	it("honors revocation and permission in this tab when persistence fails", async () => {
		const consent = await import("./site-advertising-consent");
		const listener = vi.fn();
		const unsubscribe = consent.subscribeAdvertisingConsent(listener);
		consent.writeStoredAdvertisingConsent(false);
		expect(consent.readStoredAdvertisingConsent()).toBe(false);
		expect(listener).toHaveBeenLastCalledWith("denied");
		consent.writeStoredAdvertisingConsent(true);
		expect(consent.readStoredAdvertisingConsent()).toBe(true);
		unsubscribe();
		listener.mockClear();
		consent.writeStoredAdvertisingConsent(false);
		expect(listener).not.toHaveBeenCalled();
	});

	it("follows current storage across tabs and ignores other keys", async () => {
		const consent = await import("./site-advertising-consent");
		const listener = vi.fn();
		const unsubscribe = consent.subscribeAdvertisingConsent(listener);
		getItem.mockReturnValue("denied");
		const emit = (key: string | null) =>
			window.dispatchEvent(
				Object.assign(new Event("storage"), { key, storageArea: window.localStorage }),
			);
		emit("unrelated");
		expect(listener).toHaveBeenCalledTimes(1);
		emit(consent.siteAdvertisingConsentStorageKey);
		expect(listener).toHaveBeenLastCalledWith("denied");
		getItem.mockReturnValue(null);
		emit(null);
		expect(listener).toHaveBeenLastCalledWith(null);
		unsubscribe();
	});
});
