import { browser } from "$app/environment";

export type GoogleAdUnitConfig = {
	provider: "google";
	clientId: string;
	slot: string;
};

const googleAdSystemDomain = "google.com";
const googleSellerRelationship = "DIRECT";
const googleCertificationAuthorityId = "f08c47fec0942fa0";

declare global {
	interface Window {
		adsbygoogle?: unknown[];
	}
}

const googleAdScriptId = "0disoft-google-ad-provider";

let scriptLoadPromise: Promise<boolean> | null = null;

export function isGoogleAdClientIdConfigured(clientId: string | undefined): boolean {
	return /^ca-pub-\d{16}$/.test(clientId?.trim() ?? "");
}

export function isGoogleAdSlotConfigured(slot: string | undefined): boolean {
	return /^\d+$/.test(slot?.trim() ?? "");
}

export function createGoogleAdScriptSrc(clientId: string): string {
	const url = new URL("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
	url.searchParams.set("client", clientId.trim());

	return url.toString();
}

export function getGooglePublisherId(clientId: string | undefined): string | null {
	const normalizedClientId = clientId?.trim() ?? "";

	return isGoogleAdClientIdConfigured(normalizedClientId)
		? normalizedClientId.replace(/^ca-/, "")
		: null;
}

export function createGoogleAuthorizedSellerRecord(clientId: string | undefined): string | null {
	const publisherId = getGooglePublisherId(clientId);

	return publisherId
		? [
				googleAdSystemDomain,
				publisherId,
				googleSellerRelationship,
				googleCertificationAuthorityId,
			].join(", ")
		: null;
}

export function loadGoogleAdScript(clientId: string): Promise<boolean> {
	if (!browser || !isGoogleAdClientIdConfigured(clientId)) {
		return Promise.resolve(false);
	}

	if (scriptLoadPromise) {
		return scriptLoadPromise;
	}

	const attempt = new Promise<boolean>((resolve) => {
		const existing = document.getElementById(googleAdScriptId) as HTMLScriptElement | null;
		if (existing?.dataset.loaded === "true") {
			resolve(true);
			return;
		}
		const script = existing ?? document.createElement("script");
		let settled = false;
		const timer = setTimeout(() => finish(false), 10_000);
		function finish(loaded: boolean) {
			if (settled) return;
			settled = true;
			clearTimeout(timer);
			script.onload = null;
			script.onerror = null;
			if (loaded) script.dataset.loaded = "true";
			else script.remove();
			resolve(loaded);
		}
		script.onload = () => finish(true);
		script.onerror = () => finish(false);
		if (!existing) {
			script.id = googleAdScriptId;
			script.async = true;
			script.crossOrigin = "anonymous";
			script.src = createGoogleAdScriptSrc(clientId);
			document.head.append(script);
		}
	});
	scriptLoadPromise = attempt;
	void attempt.then((loaded) => {
		if (!loaded && scriptLoadPromise === attempt) scriptLoadPromise = null;
	});
	return attempt;
}

export function requestGoogleAdRender(): boolean {
	if (!browser) {
		return false;
	}

	window.adsbygoogle = window.adsbygoogle ?? [];
	window.adsbygoogle.push({});

	return true;
}
