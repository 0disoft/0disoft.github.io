import { describe, expect, it } from "vitest";
import { existsSync, readdirSync } from "node:fs";
import {
	filterStoryPosts,
	getStoryFilterOptions,
	getStoryLabel,
	getStoryTags,
	getStoryCollectionForSlug,
	getStoryCollectionPosts,
	parseStoryFilters,
	type StoryPost,
} from "./story-collections";
import entries from "../content/collections/entries.json";

const base: StoryPost = {
	slug: "sample",
	href: "/indiehackers/sample",
	title: "Writer",
	summary: "Education business",
	locale: "ko",
	publishedAt: "2026-10-06",
	tags: [],
};
const now = new Date("2026-10-06T03:00:00Z");

describe("story collections", () => {
	it("assigns creator cases to one section and keeps them out of indiehacker lists", () => {
		const posts = [
			{ ...base, tags: [], slug: "carrd" },
			...entries.creators.map((entry) => ({ ...base, tags: [], slug: entry.slug })),
		];
		const creators = getStoryCollectionPosts(posts, "creators");
		const indiehackers = getStoryCollectionPosts(posts, null);
		expect(creators).toHaveLength(entries.creators.length);
		expect(indiehackers.map((post) => post.slug)).toEqual(["carrd"]);
		expect(getStoryCollectionForSlug("harry-dry-marketing-examples")).toBe("creators");
		expect(getStoryCollectionForSlug("carrd")).toBeNull();
		expect(new Set([...creators, ...indiehackers].map((post) => post.slug)).size).toBe(
			posts.length,
		);
	});
	it("combines alternatives within a facet and requires all selected facets", () => {
		const posts = [
			{ ...base, slug: "a", tags: ["newsletter", "membership"] },
			{ ...base, slug: "b", tags: ["video", "advertising"] },
			{ ...base, slug: "c", tags: ["video", "membership"] },
		];
		expect(
			filterStoryPosts(
				"creators",
				posts,
				{ query: "", tags: ["newsletter", "video", "membership"], recentOnly: true },
				"ko",
				now,
			).map((p) => p.slug),
		).toEqual(["a", "c"]);
		expect(
			filterStoryPosts(
				"creators",
				posts,
				{ query: "없는 검색어", tags: [], recentOnly: false },
				"ko",
				now,
			),
		).toEqual([]);
	});
	it("restores only tags belonging to the chosen collection and filters localized labels", () => {
		expect(
			parseStoryFilters(
				"investors",
				new URLSearchParams("tag=stocks&tag=stocks&tag=video&recent=0"),
			),
		).toEqual({ query: "", tags: ["stocks"], recentOnly: false });
		const posts = [
			{ ...base, tags: ["stocks", "long-term"] },
			{ ...base, slug: "old", publishedAt: "2020-01-01", tags: ["stocks"] },
		];
		expect(
			filterStoryPosts(
				"investors",
				posts,
				{ query: "주식", tags: [], recentOnly: true },
				"ko",
				now,
			).map((p) => p.slug),
		).toEqual(["sample"]);
	});
	it("keeps empty collection facets available and supplies every label in six languages", () => {
		for (const locale of ["en", "es", "fr", "hi", "ko", "zh"] as const) {
			for (const collection of ["investors", "creators"] as const) {
				const options = getStoryFilterOptions(collection, [], locale);
				expect(options.groups.length).toBe(5);
				expect(options.groups.flatMap((g) => g.tags).every((t) => t.count === 0)).toBe(true);
				for (const tag of getStoryTags(collection))
					expect(getStoryLabel(tag, locale).length).toBeGreaterThan(0);
			}
		}
	});
	it("links curated cases to existing complete articles", () => {
		const root = new URL("../content/indiehackers/posts/", import.meta.url);
		const slugs = new Set(readdirSync(root));
		for (const entry of entries.creators) {
			expect(slugs.has(entry.slug)).toBe(true);
			for (const locale of ["en", "es", "fr", "hi", "ko", "zh"])
				expect(existsSync(new URL(`${entry.slug}/${locale}.md`, root))).toBe(true);
			expect(entry.tags.every((tag) => getStoryTags("creators").includes(tag))).toBe(true);
		}
	});
});
