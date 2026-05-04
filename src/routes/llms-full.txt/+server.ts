import type { RequestHandler } from "./$types";
import { blogPosts } from "$lib/blog-posts";
import { buildLlmsFullText, createPlainTextResponse } from "$lib/site-meta";
import { siteProfile } from "$lib/site-profile";

export const prerender = true;

export const GET: RequestHandler = () =>
	createPlainTextResponse(buildLlmsFullText(siteProfile.origin, blogPosts));
