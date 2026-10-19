import * as m from "$lib/paraglide/messages";
import { isRecentIndiehackersPost, type IndiehackersPost } from "$lib/indiehackers-posts";
import type { SiteLocale } from "$lib/site-locales";
import collectionEntries from "../content/collections/entries.json";

export type StoryCollection = "investors" | "creators";
const entries: Record<StoryCollection, readonly { slug: string; tags: readonly string[] }[]> =
	collectionEntries;
export type StoryPost = Omit<IndiehackersPost, "tags"> & {
	tags: readonly string[];
	href: string;
};
export type StoryFilters = { query: string; tags: readonly string[]; recentOnly: boolean };

// Each case belongs to one section, according to the business covered by the article.
const collectionBySlug = new Map<string, StoryCollection>();
for (const collection of ["investors", "creators"] as const) {
	for (const entry of entries[collection]) {
		if (collectionBySlug.has(entry.slug)) throw new Error(`Duplicate story section: ${entry.slug}`);
		collectionBySlug.set(entry.slug, collection);
	}
}

export function getStoryCollectionForSlug(slug: string): StoryCollection | null {
	return collectionBySlug.get(slug) ?? null;
}

export function getStoryCollectionPosts<Post extends IndiehackersPost>(
	posts: readonly Post[],
	collection: StoryCollection | null,
): Post[] {
	return posts.filter((post) => getStoryCollectionForSlug(post.slug) === collection);
}

export const storyCatalogs: Record<StoryCollection, Record<string, readonly string[]>> = {
	investors: {
		asset: [
			"stocks",
			"funds",
			"bonds",
			"real-estate",
			"private-businesses",
			"startups",
			"digital-assets",
		],
		strategy: [
			"value-investing",
			"growth-investing",
			"income-investing",
			"index-investing",
			"quantitative-investing",
			"turnaround-investing",
		],
		horizon: ["short-term", "long-term"],
		role: ["individual-investor", "fund-manager", "angel-investor", "venture-investor"],
		topic: ["starting-capital", "research", "risk-management", "drawdowns", "compounding", "exits"],
	},
	creators: {
		format: ["video", "short-video", "live-stream", "photography", "podcast", "music"],
		channel: [
			"youtube",
			"linkedin",
			"instagram",
			"tiktok",
			"x",
			"twitch",
			"facebook",
			"blog",
			"podcast-platforms",
		],
		revenue: [
			"advertising",
			"sponsorship",
			"membership",
			"affiliate",
			"digital-products",
			"licensing",
			"merchandise",
		],
		operation: ["solo", "small-team", "studio"],
		topic: [
			"content-production",
			"audience-growth",
			"distribution",
			"monetization",
			"brand-partnerships",
			"delegation",
			"burnout",
		],
	},
} as const;

export function getStoryLabel(id: string, locale: SiteLocale): string {
	const key = `stories_${id.replaceAll("-", "_")}`;
	const message = (
		m as unknown as Record<string, (params: object, options: { locale: SiteLocale }) => string>
	)[key];
	if (!message) throw new Error(`Missing story filter label: ${key}`);
	return message({}, { locale });
}

export function getStoryTags(collection: StoryCollection): string[] {
	return Object.values(storyCatalogs[collection]).flatMap((tags) => [...tags]);
}

export function getStoryPosts(
	collection: StoryCollection,
	posts: readonly IndiehackersPost[],
): StoryPost[] {
	const catalog = new Set(getStoryTags(collection));
	const selections = new Map<string, readonly string[]>();
	for (const entry of entries[collection]) {
		if (selections.has(entry.slug)) throw new Error(`Duplicate ${collection} entry: ${entry.slug}`);
		if (entry.tags.length === 0 || entry.tags.some((tag) => !catalog.has(tag))) {
			throw new Error(`Invalid ${collection} tags: ${entry.slug}`);
		}
		selections.set(entry.slug, entry.tags);
	}
	return posts.flatMap((post) => {
		const tags = selections.get(post.slug);
		return tags ? [{ ...post, tags, href: `/indiehackers/${post.slug}` }] : [];
	});
}

export function parseStoryFilters(
	collection: StoryCollection,
	params: URLSearchParams,
): StoryFilters {
	const tags = new Set(getStoryTags(collection));
	return {
		query: params.get("q")?.trim() ?? "",
		tags: [...new Set(params.getAll("tag").filter((tag) => tags.has(tag)))],
		recentOnly: params.get("recent") !== "0",
	};
}

export function getStoryFilterOptions(
	collection: StoryCollection,
	posts: readonly StoryPost[],
	locale: SiteLocale,
) {
	return {
		groups: Object.entries(storyCatalogs[collection]).map(([id, tags]) => ({
			id,
			label: getStoryLabel(id, locale),
			// Show the complete catalog so an empty collection still explains its scope.
			tags: tags.map((tag) => ({
				id: tag,
				label: getStoryLabel(tag, locale),
				count: new Set(posts.filter((post) => post.tags.includes(tag)).map((post) => post.slug))
					.size,
			})),
		})),
	};
}

export function getStoryPostTagLabels(post: StoryPost, locale: SiteLocale): string[] {
	return post.tags.map((tag) => getStoryLabel(tag, locale));
}

export function getStoryPostSearchValues(post: StoryPost, locale: SiteLocale): string[] {
	return [
		post.title,
		post.summary,
		...post.tags,
		...getStoryPostTagLabels(post, locale),
		...(post.searchTags ?? []),
	];
}

export function filterStoryPosts(
	collection: StoryCollection,
	posts: readonly StoryPost[],
	filters: StoryFilters,
	locale: SiteLocale,
	now = new Date(),
): StoryPost[] {
	const query = filters.query.trim().toLocaleLowerCase();
	const selected = Object.values(storyCatalogs[collection])
		.map((tags) => tags.filter((tag) => filters.tags.includes(tag)))
		.filter((tags) => tags.length > 0);
	return posts.filter(
		(post) =>
			(!query ||
				getStoryPostSearchValues(post, locale).some((value) =>
					value.toLocaleLowerCase().includes(query),
				)) &&
			selected.every((tags) => tags.some((tag) => post.tags.includes(tag))) &&
			(!filters.recentOnly || isRecentIndiehackersPost(post.publishedAt, now)),
	);
}
