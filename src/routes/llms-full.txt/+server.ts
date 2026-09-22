import type { RequestHandler } from "./$types";
import { buildLlmsFullText, createPlainTextResponse } from "$lib/site-meta";
import { siteProfile } from "$lib/site-profile";

export const prerender = true;
export const trailingSlash = "never";

export const GET: RequestHandler = () =>
	createPlainTextResponse(buildLlmsFullText(siteProfile.origin));
