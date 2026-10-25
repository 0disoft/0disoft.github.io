import { env } from "$env/dynamic/public";
import type { FunnelSchema } from "@tallyfin/browser/funnels";

const pageProperties = {
	section: [
		"enum",
		true,
		["home", "indiehackers", "story", "investors", "creators", "privacy", "other"],
	],
	locale: ["enum", true, ["en", "zh", "es", "fr", "hi", "ko"]],
} as const;

export const tallyfinSiteOrigin = "https://0disoft.github.io";
export const tallyfinSchema = {
	version: 2,
	events: {
		page_view: pageProperties,
		story_opened: pageProperties,
		share_copy_started: pageProperties,
		share_link_copied: pageProperties,
		search_started: pageProperties,
		search_result_clicked: pageProperties,
		search_destination_opened: pageProperties,
	},
	funnels: {
		story_sharing: {
			steps: ["story_opened", "share_copy_started", "share_link_copied"],
			dimensions: ["locale"],
		},
		search_discovery: {
			steps: ["search_started", "search_result_clicked", "search_destination_opened"],
			dimensions: ["locale"],
		},
	},
} as const satisfies FunnelSchema;

export function tallyfinEndpoint(): string | null {
	const endpoint = env.PUBLIC_TALLYFIN_ENDPOINT;
	if (!endpoint) return null;
	try {
		const url = new URL(endpoint);
		if (
			url.protocol !== "https:" ||
			url.username ||
			url.password ||
			url.port ||
			url.search ||
			url.hash ||
			!/^\/v1\/projects\/[a-z0-9-]+\/batches$/.test(url.pathname)
		)
			return null;
		return url.href;
	} catch {
		return null;
	}
}

export function tallyfinPageProperties(url: URL) {
	const segments = url.pathname.split("/").filter(Boolean);
	const languages: readonly string[] = tallyfinSchema.events.page_view.locale[2];
	const locale = languages.includes(segments[0] ?? "") ? segments.shift()! : "en";
	const first = segments[0];
	const section = !first
		? "home"
		: first === "indiehackers"
			? segments.length > 1
				? "story"
				: "indiehackers"
			: ["investors", "creators", "privacy"].includes(first)
				? first
				: "other";
	return { section, locale };
}
