import type { RequestHandler } from "./$types";
import { blogPosts } from "$lib/blog-posts";
import { buildLlmsText, createPlainTextResponse } from "$lib/site-meta";
import { siteProfile } from "$lib/site-profile";

export const prerender = true;

export const GET: RequestHandler = () =>
	createPlainTextResponse(buildLlmsText(siteProfile.origin, blogPosts));
