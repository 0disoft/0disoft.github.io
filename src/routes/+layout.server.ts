import type { LayoutServerLoad } from "./$types";
import { getLocale } from "$lib/paraglide/runtime";
import { getPathLocale } from "$lib/site-locales";
import { blogPosts, getBlogPostsForLocale } from "$lib/server/blog-posts";

export const load = (({ url }) => {
	const locale = getPathLocale(url.pathname) ?? getLocale();
	return { blogPosts: getBlogPostsForLocale(blogPosts, locale) };
}) satisfies LayoutServerLoad;
