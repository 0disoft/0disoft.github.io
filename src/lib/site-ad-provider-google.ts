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

	const existingScript = document.getElementById(googleAdScriptId);

	if (existingScript) {
		scriptLoadPromise = Promise.resolve(true);
		return scriptLoadPromise;
	}

	scriptLoadPromise = new Promise((resolve) => {
		const script = document.createElement("script");
		script.id = googleAdScriptId;
		script.async = true;
		script.crossOrigin = "anonymous";
		script.src = createGoogleAdScriptSrc(clientId);
		script.onload = () => resolve(true);
		script.onerror = () => resolve(false);
		document.head.append(script);
	});

	return scriptLoadPromise;
}

export function requestGoogleAdRender(): boolean {
	if (!browser) {
		return false;
	}

	window.adsbygoogle = window.adsbygoogle ?? [];
	window.adsbygoogle.push({});

	return true;
}
