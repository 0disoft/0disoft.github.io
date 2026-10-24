import type { LayoutServerLoad } from "./$types";
import { baseLocale } from "$lib/site-locales";
import { getIndiehackersCopy } from "$lib/server/indiehackers";
import { getIndiehackersPostsForLocale, indiehackersPosts } from "$lib/server/indiehackers-posts";
import { getPathLocale, stripLocalePrefix } from "$lib/site-locales";

export const load = (({ url }) => {
	const locale = getPathLocale(url.pathname) ?? baseLocale;
	const path = stripLocalePrefix(url.pathname).replace(/\/$/, "");
	const needsCatalog = ["/indiehackers", "/investors", "/creators"].includes(path);
	return {
		locale,
		indiehackers: getIndiehackersCopy(locale),
		indiehackersPosts: needsCatalog ? getIndiehackersPostsForLocale(indiehackersPosts, locale) : [],
	};
}) satisfies LayoutServerLoad;
