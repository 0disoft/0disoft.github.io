import { browser } from "$app/environment";

type ConsentValue = "granted" | "denied";

export function createConsentStorage({
	storageKey,
	changeEvent,
	isValue,
	onChange,
}: {
	storageKey: string;
	changeEvent: string;
	isValue: (value: unknown) => value is ConsentValue;
	onChange?: (enabled: boolean) => void;
}) {
	let override: ConsentValue | undefined;

	function read(): ConsentValue | null {
		if (!browser) return null;
		if (override !== undefined) return override;
		try {
			const value = window.localStorage.getItem(storageKey);
			return isValue(value) ? value : null;
		} catch {
			return null;
		}
	}

	function write(enabled: boolean) {
		if (!browser) return;
		const value = enabled ? "granted" : "denied";
		try {
			window.localStorage.setItem(storageKey, value);
			override = undefined;
		} catch {
			// A failed write must not restore an older persisted choice in this tab.
			override = value;
		}
		onChange?.(enabled);
		window.dispatchEvent(new CustomEvent(changeEvent, { detail: { enabled, value } }));
	}

	function subscribe(listener: (value: ConsentValue | null) => void) {
		if (!browser) return () => {};
		const notify = () => listener(read());
		const onStorage = (event: StorageEvent) => {
			if (event.key !== null && event.key !== storageKey) return;
			try {
				if (event.storageArea !== window.localStorage) return;
			} catch {
				return;
			}
			override = undefined;
			// Read current storage rather than a potentially stale queued event payload.
			notify();
		};
		window.addEventListener(changeEvent, notify);
		window.addEventListener("storage", onStorage);
		notify();
		return () => {
			window.removeEventListener(changeEvent, notify);
			window.removeEventListener("storage", onStorage);
		};
	}

	return { read, write, subscribe };
}
