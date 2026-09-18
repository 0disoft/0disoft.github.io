import { redirect } from "@sveltejs/kit";
import { getLocale } from "$lib/paraglide/runtime";
import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";

export const prerender = true;

export function load() {
	const locale = getLocale();

	redirect(308, localizeSitePathname("/projects", isSiteLocale(locale) ? locale : "en"));
}
