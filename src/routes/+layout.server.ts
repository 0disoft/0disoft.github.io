import type { LayoutServerLoad } from "./$types";
import { getLocale } from "$lib/paraglide/runtime";
import { getIndiehackersCopy } from "$lib/server/indiehackers";
import { getIndiehackersPostsForLocale, indiehackersPosts } from "$lib/server/indiehackers-posts";
import { getPathLocale, stripLocalePrefix } from "$lib/site-locales";

export const load = (({ url }) => {
	const locale = getPathLocale(url.pathname) ?? getLocale();
	const path = stripLocalePrefix(url.pathname).replace(/\/$/, "");
	const needsCatalog = ["/indiehackers", "/investors", "/creators"].includes(path);
	return {
		indiehackers: getIndiehackersCopy(locale),
		indiehackersPosts: needsCatalog ? getIndiehackersPostsForLocale(indiehackersPosts, locale) : [],
	};
}) satisfies LayoutServerLoad;
