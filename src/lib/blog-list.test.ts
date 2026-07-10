import { describe, expect, it } from "vitest";
import type { BlogPost } from "./blog-post-core";
import {
	blogTagOptions,
	createBlogPostFromContent,
	filterBlogPosts,
	getBlogFilterOptions,
	getBlogPostSearchValues,
	getBlogPostTagLabels,
	getBlogPostsForLocale,
	parseBlogFilters,
} from "./blog-post-core";
import { getSiteSurfaceSectionKind } from "./site-surface-model";
import {
	aiSmallerFasterChineseMarkdown,
	aiSmallerFasterFrenchMarkdown,
	aiSmallerFasterHindiMarkdown,
	aiSmallerFasterKoreanMarkdown,
	aiSmallerFasterMetadata,
	aiSmallerFasterPath,
	aiSmallerFasterSpanishMarkdown,
	blogMarkdownFilePaths,
	blogMetaFilePaths,
	sampleOpenSourceNoteKoreanMarkdown,
	sampleOpenSourceNoteMarkdown,
	sampleOpenSourceNoteMetadata,
	sampleOpenSourceNotePath,
	sampleRichPostKoreanMarkdown,
	sampleRichPostMetadata,
	sampleRichPostPath,
	sectionRouteSource,
	surfaceSource,
} from "./test-support/site-test-sources";

describe("blog list", () => {
	it("discovers the current localized blog content files", () => {
		expect(blogMetaFilePaths).toEqual([
			"2026/05/ai-smaller-faster-companies/meta.json",
			"2026/07/credit-lot-spend-expiry-design/meta.json",
		]);
		expect(blogMarkdownFilePaths).toEqual([
			"2026/05/ai-smaller-faster-companies/en.md",
			"2026/05/ai-smaller-faster-companies/es.md",
			"2026/05/ai-smaller-faster-companies/fr.md",
			"2026/05/ai-smaller-faster-companies/hi.md",
			"2026/05/ai-smaller-faster-companies/ko.md",
			"2026/05/ai-smaller-faster-companies/zh.md",
			"2026/07/credit-lot-spend-expiry-design/en.md",
			"2026/07/credit-lot-spend-expiry-design/ko.md",
		]);
	});

	it("creates localized blog cards from shared metadata and translated markdown", () => {
		expect(
			createBlogPostFromContent(
				aiSmallerFasterPath,
				aiSmallerFasterMetadata,
				"ko",
				aiSmallerFasterKoreanMarkdown,
			),
		).toMatchObject({
			locale: "ko",
			title: "AI 시대의 승부는 실행 속도가 아니라 결정 속도다",
			heroImage: {
				src: "/images/blog/2026/05/ai-smaller-faster-companies/thumbnail.webp",
				alt: "사무실에서 여러 작업 화면을 보며 일하는 사람",
			},
		});
		expect(
			createBlogPostFromContent(
				aiSmallerFasterPath,
				aiSmallerFasterMetadata,
				"es",
				aiSmallerFasterSpanishMarkdown,
			),
		).toMatchObject({
			locale: "es",
			title:
				"En la era de la IA, la velocidad de decisión importa más que la velocidad de ejecución",
			heroImage: {
				src: "/images/blog/2026/05/ai-smaller-faster-companies/thumbnail.webp",
				alt: "Persona trabajando frente a varias pantallas de software en una oficina",
			},
		});
		expect(
			createBlogPostFromContent(
				aiSmallerFasterPath,
				aiSmallerFasterMetadata,
				"fr",
				aiSmallerFasterFrenchMarkdown,
			),
		).toMatchObject({
			locale: "fr",
			title: "À l'ère de l'IA, la vitesse de décision compte plus que la vitesse d'exécution",
			heroImage: {
				src: "/images/blog/2026/05/ai-smaller-faster-companies/thumbnail.webp",
				alt: "Personne travaillant devant plusieurs écrans de logiciel dans un bureau",
			},
		});
		expect(
			createBlogPostFromContent(
				aiSmallerFasterPath,
				aiSmallerFasterMetadata,
				"hi",
				aiSmallerFasterHindiMarkdown,
			),
		).toMatchObject({
			locale: "hi",
			title: "AI युग में असली मुकाबला एक्ज़ीक्यूशन स्पीड का नहीं, निर्णय लेने की गति का है",
			heroImage: {
				src: "/images/blog/2026/05/ai-smaller-faster-companies/thumbnail.webp",
				alt: "कार्यालय में कई सॉफ्टवेयर स्क्रीन पर काम करता व्यक्ति",
			},
		});
		expect(
			createBlogPostFromContent(
				aiSmallerFasterPath,
				aiSmallerFasterMetadata,
				"zh",
				aiSmallerFasterChineseMarkdown,
			),
		).toMatchObject({
			locale: "zh",
			title: "AI 时代的关键不是执行速度，而是决策速度",
			heroImage: {
				src: "/images/blog/2026/05/ai-smaller-faster-companies/thumbnail.webp",
				alt: "办公室里的人正在多个软件屏幕前工作",
			},
		});
	});

	it("validates markdown metadata and localized hero image copy", () => {
		const markdownPost = createBlogPostFromContent(
			sampleOpenSourceNotePath,
			sampleOpenSourceNoteMetadata,
			"en",
			sampleOpenSourceNoteMarkdown,
		);

		expect(markdownPost).toMatchObject({
			slug: "sample-open-source-note",
			locale: "en",
			updatedAt: "2026-05-04",
			tags: ["market-entry", "licensing"],
		});
		expect(markdownPost.searchTags).toContain("attribution");
		expect(
			createBlogPostFromContent(
				sampleRichPostPath,
				sampleRichPostMetadata,
				"ko",
				sampleRichPostKoreanMarkdown,
			).heroImage,
		).toEqual({
			src: "/images/0disoft-bird.svg",
			alt: "0disoft 새 그림",
		});
		expect(() =>
			createBlogPostFromContent(
				sampleOpenSourceNotePath,
				{ ...sampleOpenSourceNoteMetadata, updatedAt: "2026-05-02" },
				"en",
				sampleOpenSourceNoteMarkdown,
			),
		).toThrow("Blog post updatedAt must not be earlier than publishedAt");
	});

	it("filters posts by query, tag, year, and searchable aliases", () => {
		const posts = createFilterFixturePosts();

		expect(getBlogFilterOptions(posts).tags.map((tag) => tag.id)).toEqual(
			blogTagOptions.map((tag) => tag.id),
		);
		expect(getBlogFilterOptions(posts).years).toEqual(["2026", "2025"]);
		expect(getBlogPostTagLabels(posts[0])).toEqual(["Market Entry", "Licensing"]);
		expect(getBlogPostSearchValues(posts[0])).toContain("reuse");
		expect(
			filterBlogPosts(posts, { query: "", tag: "market-entry", year: "" }).map((post) => post.slug),
		).toEqual(["sample-open-source-note", "open-source-index-sketch"]);
		expect(
			filterBlogPosts(posts, { query: "attribution", tag: "", year: "" }).map((post) => post.slug),
		).toEqual(["sample-open-source-note"]);
		expect(
			filterBlogPosts(posts, { query: "workflow", tag: "", year: "" }).map((post) => post.slug),
		).toEqual(["automation-runbook"]);
		expect(
			filterBlogPosts(posts, { query: "", tag: "building-rules", year: "2025" }).map(
				(post) => post.slug,
			),
		).toEqual(["design-log"]);
	});

	it("normalizes filter query parameters before applying them", () => {
		expect(
			parseBlogFilters(new URLSearchParams("q= attribution &tag=market-entry&year=2026")),
		).toEqual({
			query: "attribution",
			tag: "market-entry",
			year: "2026",
		});
		expect(parseBlogFilters(new URLSearchParams("tag=unknown&year=20x6"))).toEqual({
			query: "",
			tag: "",
			year: "",
		});
	});

	it("returns localized posts or English fallback posts", () => {
		const posts = createFilterFixturePosts();
		const koreanPost = createBlogPostFromContent(
			sampleOpenSourceNotePath,
			sampleOpenSourceNoteMetadata,
			"ko",
			sampleOpenSourceNoteKoreanMarkdown,
		);

		expect(getBlogPostsForLocale([...posts, koreanPost], "ko").map((post) => post.locale)).toEqual([
			"ko",
		]);
		expect(getBlogPostsForLocale(posts, "zh").map((post) => post.locale)).toEqual([
			"en",
			"en",
			"en",
			"en",
		]);
	});

	it("keeps the blog section routed as a section surface without load-time query parsing", () => {
		expect(surfaceSource).toContain('import BlogSurface from "$lib/blog-surface.svelte"');
		expect(getSiteSurfaceSectionKind("/blog")).toBe("blog");
		expect(sectionRouteSource).not.toContain("url.searchParams");
	});
});

function createFilterFixturePosts(): readonly BlogPost[] {
	return [
		{
			slug: "sample-open-source-note",
			locale: "en",
			title: "Sample open source note",
			summary: "Neutral collaboration notes",
			publishedAt: "2026-05-03",
			tags: ["market-entry", "licensing"],
			searchTags: ["reuse", "attribution"],
		},
		{
			slug: "open-source-index-sketch",
			locale: "en",
			title: "Open source index sketch",
			summary: "Repository search notes",
			publishedAt: "2025-12-12",
			tags: ["market-entry", "licensing"],
		},
		{
			slug: "automation-runbook",
			locale: "en",
			title: "Automation runbook",
			summary: "Automation notes",
			publishedAt: "2026-02-02",
			tags: ["business-friction", "compliance-cost"],
			searchTags: ["workflow"],
		},
		{
			slug: "design-log",
			locale: "en",
			title: "Design log",
			summary: "Design notes",
			publishedAt: "2025-11-03",
			tags: ["building-rules"],
		},
	];
}
