import { browser } from "$app/environment";
import {
	createTallyfinFunnels,
	type FunnelClient,
	type FunnelLink,
} from "@tallyfin/browser/funnels";
import { readStoredAnalyticsConsent } from "$lib/site-analytics";
import {
	tallyfinEndpoint,
	tallyfinPageProperties,
	tallyfinSchema,
	tallyfinSiteOrigin,
} from "$lib/site-tallyfin-config";

type Run = { link: FunnelLink; properties: ReturnType<typeof tallyfinPageProperties> };
type StoryRun = Run & { path: string; copyStarted: boolean; copied: boolean };
let client: FunnelClient | null = null;
let lastNavigation: object | null = null;
let story: StoryRun | null = null;
let search: Run | null = null;
let destination: (Run & { path: string }) | null = null;

function active() {
	return (
		browser &&
		client !== null &&
		readStoredAnalyticsConsent() &&
		window.location.origin === tallyfinSiteOrigin
	);
}
function start(id: "story_sharing" | "search_discovery", url: URL): Run | null {
	if (!active() || url.origin !== tallyfinSiteOrigin) return null;
	const link = client!.createFunnelRun(id);
	if (!link) return null;
	const run = { link, properties: tallyfinPageProperties(url) };
	return client!.trackFunnel(tallyfinSchema.funnels[id].steps[0], run.properties, link)
		? run
		: null;
}
export function setTallyfinConsent(enabled: boolean) {
	if (!enabled) {
		client?.destroy();
		client = null;
		story = search = destination = null;
		lastNavigation = null;
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
		client = createTallyfinFunnels({ endpoint, schema: tallyfinSchema });
	}
}
export function trackTallyfinPageView(url: URL, navigation: object): boolean {
	if (!active() || url.origin !== tallyfinSiteOrigin || lastNavigation === navigation) return false;
	const accepted = client!.track("page_view", tallyfinPageProperties(url));
	if (!accepted) return false;
	lastNavigation = navigation;
	if (destination) {
		if (destination.path === url.pathname)
			client!.trackFunnel("search_destination_opened", destination.properties, destination.link);
		destination = null;
	}
	story = null;
	if (tallyfinPageProperties(url).section === "story") {
		const run = start("story_sharing", url);
		if (run) story = { ...run, path: url.pathname, copyStarted: false, copied: false };
	}
	return true;
}
/** Capture the current run before the async copy. Failure never calls completion. */
export function beginTallyfinShareCopy(): (() => boolean) | null {
	const run = story,
		owner = client;
	if (!active() || !run || run.copied || run.path !== window.location.pathname) return null;
	if (!run.copyStarted && !owner!.trackFunnel("share_copy_started", run.properties, run.link))
		return null;
	run.copyStarted = true;
	return () => {
		if (
			!active() ||
			client !== owner ||
			story !== run ||
			run.copied ||
			run.path !== window.location.pathname
		)
			return false;
		const accepted = owner!.trackFunnel("share_link_copied", run.properties, run.link);
		if (accepted) run.copied = true;
		return accepted;
	};
}
export function startTallyfinSearch() {
	destination = null;
	search = active() ? start("search_discovery", new URL(window.location.href)) : null;
}
export function cancelTallyfinSearch() {
	search = null;
}
/** A result click is distinct from a successfully completed navigation. */
export function trackTallyfinSearchResult(url: URL) {
	if (!active() || !search || url.origin !== tallyfinSiteOrigin) return false;
	if (!client!.trackFunnel("search_result_clicked", search.properties, search.link)) return false;
	destination = { ...search, path: url.pathname };
	search = null;
	return true;
}
