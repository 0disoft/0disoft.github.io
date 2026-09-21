import type { LayoutServerLoad } from "./$types";
import { getLocale } from "$lib/paraglide/runtime";
import { getIndiehackersCopy } from "$lib/server/indiehackers";
import { getPathLocale } from "$lib/site-locales";

export const load = (({ url }) => {
	const locale = getPathLocale(url.pathname) ?? getLocale();
	return {
		indiehackers: getIndiehackersCopy(locale),
	};
}) satisfies LayoutServerLoad;
