import type { Handle } from "@sveltejs/kit";
import { baseLocale, getPathLocale } from "$lib/site-locales";

export const handle: Handle = ({ event, resolve }) => {
	const locale = getPathLocale(event.url.pathname) ?? baseLocale;
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			html.replace("%saylo.lang%", locale).replace("%saylo.dir%", "ltr"),
	});
};
