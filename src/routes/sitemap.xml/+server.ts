import type { RequestHandler } from "./$types";
import { buildSitemapXml, createXmlResponse } from "$lib/site-meta";
import { siteProfile } from "$lib/site-profile";
import { indiehackersPosts } from "$lib/server/indiehackers-posts";

export const prerender = true;

export const GET: RequestHandler = () =>
	createXmlResponse(buildSitemapXml(siteProfile.origin, indiehackersPosts));
