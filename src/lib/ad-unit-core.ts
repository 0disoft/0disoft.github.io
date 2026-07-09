export type AdUnitDisplayState = "pending" | "filled" | "empty";

export const AD_RENDER_RESULT_TIMEOUT_MS = 6000;

export function getAdUnitDisplayStateFromProviderStatus(
	providerStatus: string | undefined,
): AdUnitDisplayState | null {
	if (providerStatus === "filled") {
		return "filled";
	}

	if (providerStatus === "unfilled") {
		return "empty";
	}

	return null;
}

export function getAdUnitAriaHidden(displayState: AdUnitDisplayState): "true" | undefined {
	return displayState === "filled" ? undefined : "true";
}

export function getConsentedAdUnitConfig<Config>(
	config: Config | null,
	advertisingConsent: boolean,
): Config | null {
	return advertisingConsent ? config : null;
}
