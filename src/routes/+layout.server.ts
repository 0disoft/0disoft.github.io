import type { LayoutServerLoad } from "./$types";
import { getLocale } from "$lib/paraglide/runtime";
import { getAboutCopy } from "$lib/server/about";
import { blogPosts, getBlogPostsForLocale } from "$lib/server/blog-posts";
import { getUsesCopy } from "$lib/server/uses";
import { getPathLocale } from "$lib/site-locales";

export const load = (({ url }) => {
	const locale = getPathLocale(url.pathname) ?? getLocale();
	return {
		blogPosts: getBlogPostsForLocale(blogPosts, locale),
		about: getAboutCopy(locale),
		uses: getUsesCopy(locale),
	};
}) satisfies LayoutServerLoad;
