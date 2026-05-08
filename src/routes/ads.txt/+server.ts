import { env as publicEnv } from "$env/dynamic/public";
import type { RequestHandler } from "./$types";
import { buildAdsTxt } from "$lib/site-advertising";
import { createPlainTextResponse } from "$lib/site-meta";

export const prerender = true;

export const GET: RequestHandler = () =>
	createPlainTextResponse(buildAdsTxt(publicEnv.PUBLIC_AD_PROVIDER, publicEnv.PUBLIC_AD_CLIENT_ID));
