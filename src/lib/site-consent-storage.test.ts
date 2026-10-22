import { afterEach, expect, it, vi } from "vitest";
import { createConsentStorage } from "./site-consent-storage";

vi.mock("$app/environment", () => ({ browser: true }));
afterEach(() => vi.unstubAllGlobals());

const createStore = (name: string) =>
	createConsentStorage({
		storageKey: name,
		changeEvent: `${name}:change`,
		isValue: (value): value is "granted" | "denied" => value === "granted" || value === "denied",
	});

it("keeps separate consent choices and notifications independent", () => {
	const values = new Map<string, string>();
	vi.stubGlobal(
		"window",
		Object.assign(new EventTarget(), {
			localStorage: {
				getItem: (key: string) => values.get(key) ?? null,
				setItem: (key: string, value: string) => values.set(key, value),
			},
		}),
	);
	const analytics = createStore("analytics");
	const advertising = createStore("advertising");
	const listener = vi.fn();
	const unsubscribe = advertising.subscribe(listener);
	analytics.write(true);
	expect(analytics.read()).toBe("granted");
	expect(advertising.read()).toBeNull();
	expect(listener).toHaveBeenCalledTimes(1);
	advertising.write(false);
	expect(listener).toHaveBeenLastCalledWith("denied");
	expect(analytics.read()).toBe("granted");
	unsubscribe();
});

it("retains an explicit choice when access to localStorage itself is blocked", () => {
	vi.stubGlobal(
		"window",
		Object.defineProperty(new EventTarget(), "localStorage", {
			get: () => {
				throw new Error("Access denied");
			},
		}),
	);
	const consent = createStore("blocked");
	expect(consent.read()).toBeNull();
	const listener = vi.fn();
	const unsubscribe = consent.subscribe(listener);
	consent.write(false);
	expect(consent.read()).toBe("denied");
	expect(listener).toHaveBeenLastCalledWith("denied");
	consent.write(true);
	expect(consent.read()).toBe("granted");
	unsubscribe();
});
