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
	sampleWatercolorKoreanMarkdown,
	sampleWatercolorMetadata,
	sampleWatercolorPath,
	sampleZeroLicenseKoreanMarkdown,
	sampleZeroLicenseMarkdown,
	sampleZeroLicenseMetadata,
	sampleZeroLicensePath,
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
		expect(blogPostsSource).not.toContain('title: "Zero License notes"');
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
			title: "La IA no va a eliminar las empresas. Las hará más pequeñas y rápidas",
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
			title:
				"L'IA ne va pas supprimer les entreprises. Elle les rendra plus petites et plus rapides",
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
			title: "AI कंपनियों को खत्म नहीं करेगा। यह उन्हें छोटा और तेज बनाएगा",
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
			title: "AI 不会消灭公司。它会让公司变得更小、更快",
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
				slug: "zero-license-notes",
				locale: "en",
				title: "Zero License notes",
				summary: "Permissive license notes",
				publishedAt: "2026-05-03",
				tags: ["open-source", "product"],
				searchTags: ["0BSD", "MIT-0"],
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
				slug: "rust-license",
				locale: "en",
				title: "Rust license note",
				summary: "Permissive license notes",
				publishedAt: "2026-02-02",
				tags: ["engineering", "automation"],
				searchTags: ["Rust"],
			},
			{
				slug: "website-log",
				locale: "en",
				title: "Website log",
				summary: "Design notes",
				publishedAt: "2025-11-03",
				tags: ["design"],
			},
		] satisfies readonly BlogPost[];
		const markdownPost = createBlogPostFromContent(
			sampleZeroLicensePath,
			sampleZeroLicenseMetadata,
			"en",
			sampleZeroLicenseMarkdown,
		);

		expect(posts).toHaveLength(4);
		expect(markdownPost.slug).toBe("zero-license-notes");
		expect(markdownPost.locale).toBe("en");
		expect(markdownPost.tags).toEqual(["open-source", "product"]);
		expect(markdownPost.searchTags).toContain("MIT-0");
		expect(
			createBlogPostFromContent(
				sampleWatercolorPath,
				sampleWatercolorMetadata,
				"ko",
				sampleWatercolorKoreanMarkdown,
			).heroImage,
		).toEqual({
			src: "/images/0disoft-bird.svg",
			alt: "0disoft 새 그림",
		});
		expect(
			createBlogPostFromContent(
				sampleZeroLicensePath,
				sampleZeroLicenseMetadata,
				"ko",
				sampleZeroLicenseKoreanMarkdown,
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
		expect(getBlogPostSearchValues(posts[0])).toContain("0BSD");
		expect(
			filterBlogPosts(posts, { query: "", tag: "open-source", year: "" }).map((post) => post.slug),
		).toEqual(["zero-license-notes", "open-source-index-sketch"]);
		expect(
			filterBlogPosts(posts, { query: "MIT-0", tag: "", year: "" }).map((post) => post.slug),
		).toEqual(["zero-license-notes"]);
		expect(getBlogFilterOptions(posts).tags).toHaveLength(15);
		expect(getBlogFilterOptions(posts).years).toEqual(["2026", "2025"]);
		expect(
			filterBlogPosts(posts, { query: "rust", tag: "", year: "" }).map((post) => post.slug),
		).toEqual(["rust-license"]);
		expect(
			filterBlogPosts(posts, { query: "", tag: "design", year: "2025" }).map((post) => post.slug),
		).toEqual(["website-log"]);
		expect(
			getBlogPostsForLocale(
				[
					...posts,
					createBlogPostFromContent(
						sampleZeroLicensePath,
						sampleZeroLicenseMetadata,
						"ko",
						sampleZeroLicenseKoreanMarkdown,
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
