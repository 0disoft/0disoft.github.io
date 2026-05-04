import {
	blogPostLocales,
	createBlogPostDetailFromContent,
	createBlogPostFromContent,
	type BlogPostDetail,
	type BlogPost,
} from "$lib/blog-post-core";

export {
	BLOG_FILTER_QUERY_KEYS,
	BLOG_POST_TOC_SHORTCUT_PREFIX,
	BLOG_POST_TOC_SHORTCUT_LIMIT,
	blogPostLocales,
	blogTagOptions,
	createBlogPostDetailFromContent,
	createBlogPostFromContent,
	createEmptyBlogFilters,
	filterBlogPosts,
	getAdjacentBlogPosts,
	getBlogPostBodyParagraphs,
	getBlogPostBodyBlocks,
	getBlogPostEntries,
	getBlogFilterOptions,
	getBlogPostForLocale,
	getBlogPostsForLocale,
	getBlogPostSearchValues,
	getBlogPostTagLabels,
	getBlogPostTocShortcut,
	getBlogPostTocShortcutIndex,
	parseBlogFilters,
	type BlogFilters,
	type BlogPostDetail,
	type BlogPost,
	type BlogTagId,
} from "$lib/blog-post-core";

const blogPostMetaModules = import.meta.glob("../content/blog/**/meta.json", {
	eager: true,
	import: "default",
});

const blogPostMarkdownModules = import.meta.glob<string>("../content/blog/**/*.md", {
	eager: true,
	import: "default",
	query: "?raw",
});

export const blogPosts: readonly BlogPost[] = Object.entries(blogPostMetaModules)
	.flatMap(([path, metadata]) =>
		blogPostLocales.flatMap((locale) => {
			const markdown = blogPostMarkdownModules[`${path.replace(/\/meta\.json$/, "")}/${locale}.md`];

			if (!markdown) {
				return [];
			}

			return [createBlogPostFromContent(path, metadata, locale, markdown)];
		}),
	)
	.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

export const blogPostDetails: readonly BlogPostDetail[] = Object.entries(blogPostMetaModules)
	.flatMap(([path, metadata]) =>
		blogPostLocales.flatMap((locale) => {
			const markdown = blogPostMarkdownModules[`${path.replace(/\/meta\.json$/, "")}/${locale}.md`];

			if (!markdown) {
				return [];
			}

			return [createBlogPostDetailFromContent(path, metadata, locale, markdown)];
		}),
	)
	.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
