import type { RequestHandler } from "./$types";
import { blogPosts } from "$lib/blog-posts";
import { buildSitemapXml, createXmlResponse } from "$lib/site-meta";
import { siteProfile } from "$lib/site-profile";

export const prerender = true;

export const GET: RequestHandler = () =>
	createXmlResponse(buildSitemapXml(siteProfile.origin, blogPosts));
