import { json, error } from "@sveltejs/kit";
import type { RequestHandler, EntryGenerator } from "./$types";
import { isSiteLocale, siteLocales } from "$lib/site-locales";
import { indiehackersPosts, getIndiehackersPostsForLocale } from "$lib/server/indiehackers-posts";

export const prerender = true;
export const trailingSlash = "never";
export const entries: EntryGenerator = () => siteLocales.map((locale) => ({ locale }));

export const GET: RequestHandler = ({ params }) => {
	if (!isSiteLocale(params.locale)) error(404, "Unknown locale");
	return json(getIndiehackersPostsForLocale(indiehackersPosts, params.locale));
};
