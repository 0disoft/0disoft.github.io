import type { EntryGenerator, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type { BlogPostCodeHighlights } from "$lib/blog-code-highlighting";
import {
	blogPostDetails,
	blogPosts,
	getAdjacentBlogPosts,
	getBlogPostForLocale,
	getBlogPostBodyBlocks,
	getBlogPostEntries,
} from "$lib/server/blog-posts";
import { getLocale } from "$lib/paraglide/runtime";
import { getPathLocale } from "$lib/site-locales";
import { highlightBlogPostCodeBlocks } from "$lib/server/blog-code-highlighting";

export const prerender = "auto";

export const entries: EntryGenerator = () => getBlogPostEntries(blogPostDetails);

export const load = (async ({ params, url }) => {
	const locale = getPathLocale(url.pathname) ?? getLocale();
	const post = getBlogPostForLocale(blogPostDetails, params.slug, locale);

	if (!post) {
		error(404, "Not Found");
	}

	const highlightedCodeByLocale = {
		[post.locale]: await highlightBlogPostCodeBlocks(getBlogPostBodyBlocks(post)),
	} satisfies BlogPostCodeHighlights;

	return {
		slug: params.slug,
		post,
		adjacentPosts: getAdjacentBlogPosts(blogPosts, params.slug, locale),
		highlightedCodeByLocale,
	};
}) satisfies PageServerLoad;
