import type { RequestHandler } from "./$types";
import { blogPosts } from "$lib/blog-posts";
import { buildRssXml, createRssResponse, defaultRssFeedLocale } from "$lib/site-meta";
import { getPathLocale } from "$lib/site-locales";
import { siteProfile } from "$lib/site-profile";

export const prerender = true;

export const GET: RequestHandler = ({ url }) =>
	createRssResponse(
		buildRssXml(siteProfile.origin, blogPosts, getPathLocale(url.pathname) ?? defaultRssFeedLocale),
	);
