import { env } from "$env/dynamic/public";
import { buildAdsTxt } from "$lib/site-advertising";

export const prerender = true;
export const trailingSlash = "never";

export function GET() {
	return new Response(buildAdsTxt(env.PUBLIC_AD_PROVIDER, env.PUBLIC_AD_CLIENT_ID), {
		headers: { "content-type": "text/plain; charset=utf-8" },
	});
}
