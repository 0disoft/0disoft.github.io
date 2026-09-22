import type { LayoutServerLoad } from "./$types";
import { getLocale } from "$lib/paraglide/runtime";
import { getIndiehackersCopy } from "$lib/server/indiehackers";
import { getIndiehackersPostsForLocale, indiehackersPosts } from "$lib/server/indiehackers-posts";
import { getPathLocale } from "$lib/site-locales";

export const load = (({ url }) => {
	const locale = getPathLocale(url.pathname) ?? getLocale();
	return {
		indiehackers: getIndiehackersCopy(locale),
		indiehackersPosts: getIndiehackersPostsForLocale(indiehackersPosts, locale),
	};
}) satisfies LayoutServerLoad;
