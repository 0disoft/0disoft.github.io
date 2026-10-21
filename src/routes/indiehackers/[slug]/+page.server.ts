import type { EntryGenerator, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { renderArticleMarkdown } from "$lib/server/markdown";
import { getLocale } from "$lib/paraglide/runtime";
import {
	getAdjacentIndiehackersPosts,
	getIndiehackersPostEntries,
	getIndiehackersPostForLocale,
	getIndiehackersPostTagLabels,
	indiehackersPostDetails,
	indiehackersPosts,
} from "$lib/server/indiehackers-posts";
import { getPathLocale } from "$lib/site-locales";
import {
	getStoryCollectionForSlug,
	getStoryCollectionPosts,
	getStoryPosts,
	getStoryPostTagLabels,
} from "$lib/story-collections";

export const prerender = true;

export const entries: EntryGenerator = () => getIndiehackersPostEntries(indiehackersPostDetails);

export const load = (({ params, url }) => {
	const locale = getPathLocale(url.pathname) ?? getLocale();
	const post = getIndiehackersPostForLocale(indiehackersPostDetails, params.slug, locale);

	if (!post) {
		error(404, "Not Found");
	}

	const collection = getStoryCollectionForSlug(params.slug);
	const story = collection ? getStoryPosts(collection, [post])[0] : null;
	return {
		post,
		tagLabels: story
			? getStoryPostTagLabels(story, post.locale)
			: getIndiehackersPostTagLabels(post),
		bodyHtml: renderArticleMarkdown(post.body),
		collection,
		adjacentPosts: getAdjacentIndiehackersPosts(
			getStoryCollectionPosts(indiehackersPosts, collection),
			params.slug,
			locale,
		),
	};
}) satisfies PageServerLoad;
