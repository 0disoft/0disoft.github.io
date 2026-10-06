import { describe, expect, it } from "vitest";
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
	it("keeps product and service founders in indiehackers rather than classifying them as social creators", () => {
		const posts = [
			{ ...base, tags: [], slug: "carrd" },
			{ ...base, tags: [], slug: "andrew-kamphey-better-sheets" },
			{ ...base, tags: [], slug: "harry-dry-marketing-examples" },
			{ ...base, tags: [], slug: "simon-hoiberg-feedhive" },
		];
		const creators = getStoryCollectionPosts(posts, "creators");
		const indiehackers = getStoryCollectionPosts(posts, null);
		expect(creators).toHaveLength(0);
		expect(indiehackers).toEqual(posts);
		expect(getStoryCollectionForSlug("harry-dry-marketing-examples")).toBeNull();
		expect(getStoryCollectionForSlug("carrd")).toBeNull();
		expect(new Set([...creators, ...indiehackers].map((post) => post.slug)).size).toBe(
			posts.length,
		);
	});
	it("combines alternatives within a facet and requires all selected facets", () => {
		const posts = [
			{ ...base, slug: "a", tags: ["short-video", "membership"] },
			{ ...base, slug: "b", tags: ["video", "advertising"] },
			{ ...base, slug: "c", tags: ["video", "membership"] },
		];
		expect(
			filterStoryPosts(
				"creators",
				posts,
				{ query: "", tags: ["short-video", "video", "membership"], recentOnly: true },
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
	it("offers social creator channels and rejects software or newsletter business tags", () => {
		expect(getStoryTags("creators")).toEqual(
			expect.arrayContaining(["youtube", "instagram", "tiktok", "short-video", "live-stream"]),
		);
		expect(
			parseStoryFilters(
				"creators",
				new URLSearchParams("tag=short-video&tag=instagram&tag=saas&tag=newsletter&tag=courses"),
			).tags,
		).toEqual(["short-video", "instagram"]);
	});
});
