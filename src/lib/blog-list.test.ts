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
} from "./blog-post-core";
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
	blogPostCoreSource,
	blogPostsModuleExists,
	blogPostsSource,
	blogSurfaceSource,
	privacyRouteSource,
	publicBirdImageSource,
	sampleOpenSourceNoteKoreanMarkdown,
	sampleOpenSourceNoteMarkdown,
	sampleOpenSourceNoteMetadata,
	sampleOpenSourceNotePath,
	sampleRichPostKoreanMarkdown,
	sampleRichPostMetadata,
	sampleRichPostPath,
	sectionRouteSource,
	surfaceSource,
	svelteConfigSource,
} from "./test-support/site-test-sources";

describe("blog list", () => {
	it("renders the blog section as a query-backed filtered list", () => {
		expect(blogPostsModuleExists).toBe(true);
		expect(surfaceSource).toContain('import BlogSurface from "$lib/blog-surface.svelte"');
		expect(surfaceSource).toContain('activePath === "/blog"');
		expect(sectionRouteSource).not.toContain("url.searchParams");
		expect(blogPostsSource).toContain("export const blogPosts");
		expect(blogPostsSource).toContain("export const blogPostDetails");
		expect(blogPostCoreSource).toContain("export const blogTagOptions");
		expect(blogPostCoreSource).toContain(
			'export const blogPostLocales = ["en", "es", "fr", "hi", "ko", "zh"]',
		);
		expect(blogPostsSource).toContain('import.meta.glob("../content/blog/**/meta.json"');
		expect(blogPostsSource).toContain('import.meta.glob<string>("../content/blog/**/*.md"');
		expect(blogPostsSource).toContain('query: "?raw"');
		expect(svelteConfigSource).toContain('mdsvex({ extensions: [".svx"] })');
		expect(svelteConfigSource).toContain('extensions: [".svelte", ".svx"]');
		expect(svelteConfigSource).not.toContain('extensions: [".svx", ".md"]');
		expect(svelteConfigSource).not.toContain('extensions: [".svelte", ".svx", ".md"]');
		expect(blogPostsSource).toContain("getBlogPostsForLocale");
		expect(blogMetaFilePaths).toEqual(["2026/05/ai-smaller-faster-companies/meta.json"]);
		expect(blogMarkdownFilePaths).toEqual([
			"2026/05/ai-smaller-faster-companies/en.md",
			"2026/05/ai-smaller-faster-companies/es.md",
			"2026/05/ai-smaller-faster-companies/fr.md",
			"2026/05/ai-smaller-faster-companies/hi.md",
			"2026/05/ai-smaller-faster-companies/ko.md",
			"2026/05/ai-smaller-faster-companies/zh.md",
		]);
		expect(
			createBlogPostFromContent(
				aiSmallerFasterPath,
				aiSmallerFasterMetadata,
				"ko",
				aiSmallerFasterKoreanMarkdown,
			).heroImage,
		).toEqual({
			src: "/images/blog/2026/05/ai-smaller-faster-companies/thumbnail.webp",
			alt: "사무실에서 여러 작업 화면을 보며 일하는 사람",
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
			title: "La IA vuelve a las empresas más pequeñas y rápidas",
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
			title: "L'IA rend les entreprises plus petites et plus rapides",
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
			title: "AI कंपनियों को छोटा और तेज बना रहा है",
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
			title: "AI 正在让公司变得更小、更快",
			heroImage: {
				src: "/images/blog/2026/05/ai-smaller-faster-companies/thumbnail.webp",
				alt: "办公室里的人正在多个软件屏幕前工作",
			},
		});
		expect(publicBirdImageSource).toContain("<svg");
		expect(blogPostCoreSource).toContain("export function filterBlogPosts");
		expect(blogPostCoreSource).toContain("export function createBlogPostFromContent");
		expect(blogPostCoreSource).toContain("export function getBlogPostsForLocale");
		expect(blogPostCoreSource).toContain("export function getBlogFilterOptions");
		expect(blogPostCoreSource).toContain("export function getBlogPostTagLabels");
		expect(blogPostCoreSource).toContain("export function getBlogPostSearchValues");
		expect(blogPostCoreSource).toContain("export type BlogPostHeroImage");
		expect(blogPostCoreSource).toContain("JSON.parse");
		expect(blogSurfaceSource).toContain("parseBlogFilters");
		expect(blogSurfaceSource).toContain("window.location.search");
		expect(blogSurfaceSource).toContain('import { pushState } from "$app/navigation"');
		expect(blogSurfaceSource).toContain('import { page } from "$app/state"');
		expect(blogSurfaceSource).toContain("pushState(createBlogFilterHref(nextFilters), page.state)");
		expect(blogSurfaceSource).toContain("pushState(blogAction, page.state)");
		expect(blogSurfaceSource).not.toContain("window.history.pushState");
		expect(blogSurfaceSource).toContain(
			'withShortcut(m.blog_search_label({}, { locale: displayLocale }), "Alt+S")',
		);
		expect(blogSurfaceSource).toContain("title={searchShortcutTitle}");
		expect(blogSurfaceSource).toContain('aria-keyshortcuts="Alt+S"');
		expect(blogSurfaceSource).toContain("handleSearchShortcut");
		expect(blogSurfaceSource).toContain("event.altKey");
		expect(blogSurfaceSource).toContain('event.key.toLocaleLowerCase() !== "s"');
		expect(blogSurfaceSource).toContain('document.querySelector<HTMLInputElement>("#blog-search")');
		expect(blogSurfaceSource).toContain("searchInput.focus()");
		expect(blogSurfaceSource).toContain('method="GET"');
		expect(blogSurfaceSource).toContain("onsubmit={handleFilterSubmit}");
		expect(blogSurfaceSource).toContain('<h1 id="section-title" class="sr-only">');
		expect(blogSurfaceSource).not.toContain('class="blog-header"');
		expect(blogSurfaceSource).toContain("ChevronDown");
		expect(blogSurfaceSource).toContain('class="select-shell"');
		expect(blogSurfaceSource).toContain("padding-inline-end: 2.4rem");
		expect(blogSurfaceSource).toContain("right: 0.85rem");
		expect(blogSurfaceSource).toContain("name={BLOG_FILTER_QUERY_KEYS.query}");
		expect(blogSurfaceSource).toContain("name={BLOG_FILTER_QUERY_KEYS.tag}");
		expect(blogSurfaceSource).toContain("name={BLOG_FILTER_QUERY_KEYS.year}");
		expect(blogSurfaceSource).toContain('aria-live="polite"');
		expect(blogSurfaceSource).toContain('role="list"');
		expect(blogSurfaceSource).toContain("function getBlogPostHref");
		expect(blogSurfaceSource).toContain("`/blog/${slug}`");
		expect(blogSurfaceSource).toContain('class="blog-list-link"');
		expect(blogSurfaceSource).toContain("class:with-media={Boolean(post.heroImage)}");
		expect(blogSurfaceSource).toContain('class="blog-list-media"');
		expect(blogSurfaceSource).toContain("post.heroImage.src");
		expect(blogSurfaceSource).toContain("post.heroImage.alt");
		expect(blogSurfaceSource).toContain('loading="lazy"');
		expect(blogSurfaceSource).toContain('decoding="async"');
		expect(blogSurfaceSource).toContain(".blog-list-link.with-media");
		expect(blogSurfaceSource).toContain("align-items: center");
		expect(blogSurfaceSource).not.toContain("align-items: start");
		expect(blogSurfaceSource).toContain(".blog-list-media img");
		expect(blogSurfaceSource).toContain(".filter-field > span");
		expect(blogSurfaceSource).toContain(".filter-field input::placeholder");
		expect(blogSurfaceSource).toContain(".filter-field select");
		expect(blogSurfaceSource).toContain(".result-status");
		expect(blogSurfaceSource).toContain(".blog-list-link");
		expect(blogSurfaceSource).toContain(".blog-list-item ul li");
		expect(blogSurfaceSource).toContain("user-select: none");
		expect(blogSurfaceSource).toContain("m.blog_search_label");
		expect(blogSurfaceSource).toContain("m.blog_empty_title");
		expect(privacyRouteSource).toContain('import SiteSurface from "$lib/site-surface.svelte"');
		expect(privacyRouteSource).toContain("m.privacy_page_title");
		expect(privacyRouteSource).toContain("m.privacy_analytics_title");
		expect(privacyRouteSource).toContain("m.privacy_cookies_title");

		const posts = [
			{
				slug: "sample-open-source-note",
				locale: "en",
				title: "Sample open source note",
				summary: "Neutral collaboration notes",
				publishedAt: "2026-05-03",
				tags: ["open-source", "product"],
				searchTags: ["reuse", "attribution"],
			},
			{
				slug: "open-source-index-sketch",
				locale: "en",
				title: "Open source index sketch",
				summary: "Repository search notes",
				publishedAt: "2025-12-12",
				tags: ["open-source", "product"],
			},
			{
				slug: "automation-runbook",
				locale: "en",
				title: "Automation runbook",
				summary: "Automation notes",
				publishedAt: "2026-02-02",
				tags: ["engineering", "automation"],
				searchTags: ["workflow"],
			},
			{
				slug: "design-log",
				locale: "en",
				title: "Design log",
				summary: "Design notes",
				publishedAt: "2025-11-03",
				tags: ["design"],
			},
		] satisfies readonly BlogPost[];
		const markdownPost = createBlogPostFromContent(
			sampleOpenSourceNotePath,
			sampleOpenSourceNoteMetadata,
			"en",
			sampleOpenSourceNoteMarkdown,
		);

		expect(posts).toHaveLength(4);
		expect(markdownPost.slug).toBe("sample-open-source-note");
		expect(markdownPost.locale).toBe("en");
		expect(markdownPost).toMatchObject({ updatedAt: "2026-05-04" });
		expect(markdownPost.tags).toEqual(["open-source", "product"]);
		expect(markdownPost.searchTags).toContain("attribution");
		expect(() =>
			createBlogPostFromContent(
				sampleOpenSourceNotePath,
				{ ...sampleOpenSourceNoteMetadata, updatedAt: "2026-05-02" },
				"en",
				sampleOpenSourceNoteMarkdown,
			),
		).toThrow("Blog post updatedAt must not be earlier than publishedAt");
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
		expect(
			createBlogPostFromContent(
				sampleOpenSourceNotePath,
				sampleOpenSourceNoteMetadata,
				"ko",
				sampleOpenSourceNoteKoreanMarkdown,
			).locale,
		).toBe("ko");
		expect(blogTagOptions).toHaveLength(15);
		expect(getBlogFilterOptions(posts).tags.map((tag) => tag.id)).toEqual([
			"build-log",
			"product",
			"strategy",
			"engineering",
			"design",
			"automation",
			"growth",
			"marketing",
			"sales",
			"pricing",
			"finance",
			"customers",
			"operations",
			"legal",
			"open-source",
		]);
		expect(getBlogFilterOptions(posts).years).toEqual(["2026", "2025"]);
		expect(getBlogPostTagLabels(posts[0])).toEqual(["Open Source", "Product"]);
		expect(getBlogPostSearchValues(posts[0])).toContain("reuse");
		expect(
			filterBlogPosts(posts, { query: "", tag: "open-source", year: "" }).map((post) => post.slug),
		).toEqual(["sample-open-source-note", "open-source-index-sketch"]);
		expect(
			filterBlogPosts(posts, { query: "attribution", tag: "", year: "" }).map((post) => post.slug),
		).toEqual(["sample-open-source-note"]);
		expect(getBlogFilterOptions(posts).tags).toHaveLength(15);
		expect(getBlogFilterOptions(posts).years).toEqual(["2026", "2025"]);
		expect(
			filterBlogPosts(posts, { query: "workflow", tag: "", year: "" }).map((post) => post.slug),
		).toEqual(["automation-runbook"]);
		expect(
			filterBlogPosts(posts, { query: "", tag: "design", year: "2025" }).map((post) => post.slug),
		).toEqual(["design-log"]);
		expect(
			getBlogPostsForLocale(
				[
					...posts,
					createBlogPostFromContent(
						sampleOpenSourceNotePath,
						sampleOpenSourceNoteMetadata,
						"ko",
						sampleOpenSourceNoteKoreanMarkdown,
					),
				],
				"ko",
			).map((post) => post.locale),
		).toEqual(["ko"]);
		expect(getBlogPostsForLocale(posts, "zh").map((post) => post.locale)).toEqual([
			"en",
			"en",
			"en",
			"en",
		]);
	});
});
