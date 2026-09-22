import type { EntryGenerator, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getLocale } from "$lib/paraglide/runtime";
import {
	getAdjacentIndiehackersPosts,
	getIndiehackersPostEntries,
	getIndiehackersPostForLocale,
	indiehackersPostDetails,
	indiehackersPosts,
} from "$lib/server/indiehackers-posts";
import { getPathLocale } from "$lib/site-locales";

export const prerender = true;

export const entries: EntryGenerator = () => getIndiehackersPostEntries(indiehackersPostDetails);

export const load = (({ params, url }) => {
	const locale = getPathLocale(url.pathname) ?? getLocale();
	const post = getIndiehackersPostForLocale(indiehackersPostDetails, params.slug, locale);

	if (!post) {
		error(404, "Not Found");
	}

	return {
		post,
		adjacentPosts: getAdjacentIndiehackersPosts(indiehackersPosts, params.slug, locale),
	};
}) satisfies PageServerLoad;
