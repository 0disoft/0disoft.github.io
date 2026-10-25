import { env } from "$env/dynamic/public";
import type { BrowserSchema } from "@tallyfin/browser";

export const tallyfinSiteOrigin = "https://0disoft.github.io";
export const tallyfinSchema = {
	version: 1,
	events: {
		page_view: {
			section: [
				"enum",
				true,
				["home", "indiehackers", "story", "investors", "creators", "privacy", "other"],
			],
			locale: ["enum", true, ["en", "zh", "es", "fr", "hi", "ko"]],
		},
	},
	workflows: {},
} as const satisfies BrowserSchema;

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
