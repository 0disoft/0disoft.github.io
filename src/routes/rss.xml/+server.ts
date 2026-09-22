import type { RequestHandler } from "./$types";
import { buildRssXml, createRssResponse, defaultRssFeedLocale } from "$lib/site-meta";
import { getPathLocale } from "$lib/site-locales";
import { siteProfile } from "$lib/site-profile";
import { indiehackersPosts } from "$lib/server/indiehackers-posts";

export const prerender = true;
export const trailingSlash = "never";

export const GET: RequestHandler = ({ url }) =>
	createRssResponse(
		buildRssXml(
			siteProfile.origin,
			indiehackersPosts,
			getPathLocale(url.pathname) ?? defaultRssFeedLocale,
		),
	);
