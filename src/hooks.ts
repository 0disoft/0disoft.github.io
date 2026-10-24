import type { Reroute, Transport } from "@sveltejs/kit";
import { stripLocalePrefix } from "$lib/site-locales";

export const reroute: Reroute = ({ url }) => stripLocalePrefix(url.pathname);
export const transport: Transport = {};
