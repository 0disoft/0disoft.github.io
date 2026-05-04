import type { RequestHandler } from "./$types";
import { buildAiText, createPlainTextResponse } from "$lib/site-meta";
import { siteProfile } from "$lib/site-profile";

export const prerender = true;

export const GET: RequestHandler = () => createPlainTextResponse(buildAiText(siteProfile.origin));
