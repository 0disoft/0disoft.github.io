import { browser } from "$app/environment";
import { createTallyfin, type BrowserClient } from "@tallyfin/browser";
import { readStoredAnalyticsConsent } from "$lib/site-analytics";
import {
	tallyfinEndpoint,
	tallyfinPageProperties,
	tallyfinSchema,
	tallyfinSiteOrigin,
} from "$lib/site-tallyfin-config";

let client: BrowserClient | null = null;
let lastNavigation: object | null = null;

export function setTallyfinConsent(enabled: boolean) {
	if (!enabled) {
		client?.destroy();
		client = null;
		return;
	}
	const endpoint = tallyfinEndpoint();
	if (
		browser &&
		!client &&
		endpoint &&
		window.location.origin === tallyfinSiteOrigin &&
		readStoredAnalyticsConsent()
	) {
		client = createTallyfin({ endpoint, schema: tallyfinSchema });
	}
}

export function trackTallyfinPageView(url: URL, navigation: object): boolean {
	if (
		!browser ||
		!client ||
		!readStoredAnalyticsConsent() ||
		url.origin !== tallyfinSiteOrigin ||
		lastNavigation === navigation
	)
		return false;
	const accepted = client.track("page_view", tallyfinPageProperties(url));
	if (accepted) lastNavigation = navigation;
	return accepted;
}
