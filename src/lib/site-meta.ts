import { siteNavigation } from "$lib/site-navigation";
import {
	indexedSiteLocales,
	languageOptions,
	localizeSitePathname,
	type SiteLocale,
} from "$lib/site-locales";
import { siteProfile } from "$lib/site-profile";

export { indexedSiteLocales };

const TEXT_PLAIN_CONTENT_TYPE = "text/plain; charset=utf-8";
const XML_CONTENT_TYPE = "application/xml; charset=utf-8";
const RSS_CONTENT_TYPE = "application/rss+xml; charset=utf-8";
const DEFAULT_CACHE_CONTROL = "public, max-age=3600";
const LLMS_FULL_MAX_CHARACTERS = 60_000;
export const defaultRssFeedLocale = "en";

export const siteTextAlternateLinks = [{ href: "/llms.txt", title: "llms.txt" }] as const;

export const siteThemeColorMeta = [
	{ content: "#fbf7e8", media: "(prefers-color-scheme: light)" },
	{ content: "#152814", media: "(prefers-color-scheme: dark)" },
] as const;

type LinkEntry = {
	label: string;
	path: string;
	note: string;
};

export type SiteAlternateLink = {
	rel: "alternate";
	type: "application/rss+xml" | "text/plain";
	href: string;
	title: string;
};

export function getSiteRssAlternateLinks(): SiteAlternateLink[] {
	return languageOptions.map((language) => ({
		rel: "alternate",
		type: "application/rss+xml",
		href: getRssFeedPath(language.locale),
		title: `${siteProfile.name} ${language.label} RSS`,
	}));
}

export function getSitePlainTextAlternateLinks(): SiteAlternateLink[] {
	return siteTextAlternateLinks.map((link) => ({
		rel: "alternate",
		type: "text/plain",
		href: link.href,
		title: link.title,
	}));
}

export function createPlainTextResponse(content: string): Response {
	return new Response(content, {
		headers: {
			"content-type": TEXT_PLAIN_CONTENT_TYPE,
			"cache-control": DEFAULT_CACHE_CONTROL,
		},
	});
}

export function createXmlResponse(content: string): Response {
	return new Response(content, {
		headers: {
			"content-type": XML_CONTENT_TYPE,
			"cache-control": DEFAULT_CACHE_CONTROL,
		},
	});
}

export function createRssResponse(content: string): Response {
	return new Response(content, {
		headers: {
			"content-type": RSS_CONTENT_TYPE,
			"cache-control": DEFAULT_CACHE_CONTROL,
		},
	});
}

export function buildRobotsText(origin: string): string {
	return [
		"# robots.txt",
		`# Canonical origin: ${normalizeOrigin(origin)}`,
		"User-agent: *",
		"Allow: /",
		"",
		`Sitemap: ${toAbsoluteUrl(origin, "/sitemap.xml")}`,
		"",
	].join("\n");
}

export function buildSitemapXml(origin: string, _posts: readonly unknown[] = []): string {
	const urls = getIndexedSitePaths(_posts)
		.map((path) => toAbsoluteUrl(origin, path))
		.toSorted((left, right) => left.localeCompare(right))
		.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
		.join("\n");

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		urls,
		"</urlset>",
		"",
	].join("\n");
}

export function buildRssXml(
	origin: string,
	_posts: readonly unknown[] = [],
	locale: SiteLocale = defaultRssFeedLocale,
): string {
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
		"  <channel>",
		`    <title>${escapeXml(siteProfile.name)}</title>`,
		`    <link>${escapeXml(toAbsoluteUrl(origin, withTrailingSlash(localizeSitePathname("/indiehackers", locale))))}</link>`,
		`    <description>${escapeXml(siteProfile.description)}</description>`,
		`    <language>${locale}</language>`,
		`    <atom:link href="${escapeXml(toAbsoluteUrl(origin, getRssFeedPath(locale)))}" rel="self" type="application/rss+xml" />`,
		"  </channel>",
		"</rss>",
		"",
	].join("\n");
}

export function getRssFeedPath(locale: SiteLocale): string {
	return localizeSitePathname("/rss.xml", locale);
}

export function buildAiText(origin: string): string {
	const canonicalOrigin = normalizeOrigin(origin);

	return [
		"# ai.txt",
		"",
		`<${toAbsoluteUrl(canonicalOrigin, "/ai.txt")}>`,
		"",
		"## identity",
		"",
		`- name: ${siteProfile.name}`,
		`- url: ${canonicalOrigin}`,
		`- description: ${siteProfile.description}`,
		`- indexed_locales: ${indexedSiteLocales.join(", ")}`,
		"",
		"## permissions",
		"",
		"- Summarize public pages and public blog posts.",
		"- Quote short excerpts with source attribution.",
		"- Use llms.txt and sitemap.xml as preferred discovery indexes.",
		"",
		"## restrictions",
		"",
		"- Do not imply endorsement, partnership, or official approval.",
		"- Do not present generated summaries as the author's original wording.",
		"- Do not access non-public or authenticated areas.",
		"",
		"## contact",
		"",
		`- github: ${siteProfile.sourceRepository}`,
		"",
	].join("\n");
}

export function buildLlmsText(origin: string, _posts: readonly unknown[] = []): string {
	const coreLinks = getCoreLinks();
	const machineLinks = getMachineReadableLinks();

	return [
		`# ${siteProfile.name}`,
		"",
		`> ${siteProfile.description}`,
		"",
		"## Core",
		...coreLinks.map((link) => formatLlmsLink(origin, link)),
		"",
		"## Machine-readable",
		...machineLinks.map((link) => formatLlmsLink(origin, link)),
		"",
	].join("\n");
}

export function buildLlmsFullText(origin: string, _posts: readonly unknown[] = []): string {
	const lines = [
		`# ${siteProfile.name} (llms-full)`,
		"",
		`> ${siteProfile.description}`,
		"",
		"## Site Profile",
		`- Name: ${siteProfile.name}`,
		`- Origin: ${normalizeOrigin(origin)}`,
		`- Indexed locales: ${indexedSiteLocales.join(", ")}`,
		`- Source: ${siteProfile.sourceRepository}`,
		"",
		"## Core Navigation",
		...getCoreLinks().map((link) => formatLlmsLink(origin, link)),
		"",
		"## Machine-readable",
		...getMachineReadableLinks().map((link) => formatLlmsLink(origin, link)),
		"",
		"## Notes",
		"- Generated from site profile and navigation.",
		"- Localized public pages are listed for every supported interface language.",
		"",
	].join("\n");

	return clampText(lines, LLMS_FULL_MAX_CHARACTERS);
}

export function getIndexedSitePaths(_posts: readonly unknown[] = []): string[] {
	const canonicalSitePaths = ["/", ...siteNavigation.map((item) => item.href)];
	const localizedSitePaths = canonicalSitePaths.flatMap((path) =>
		indexedSiteLocales.map((locale) => withTrailingSlash(localizeSitePathname(path, locale))),
	);

	return Array.from(new Set(localizedSitePaths));
}


function getCoreLinks(): LinkEntry[] {
	return [
		{ label: "Home", path: "/", note: "Primary index" },
		...siteNavigation.map((item) => ({
			label: item.label,
			path: item.href,
			note: `${item.label} section`,
		})),
	];
}

function getMachineReadableLinks(): LinkEntry[] {
	return [
		{ label: "rss.xml", path: "/rss.xml", note: "Default site feed" },
		{ label: "ai.txt", path: "/ai.txt", note: "AI usage and attribution guidance" },
		{ label: "llms.txt", path: "/llms.txt", note: "Compact assistant index" },
		{ label: "llms-full.txt", path: "/llms-full.txt", note: "Expanded assistant index" },
	];
}

function formatLlmsLink(origin: string, link: LinkEntry): string {
	return `- [${link.label}](${toAbsoluteUrl(origin, withTrailingSlashForPage(link.path))}): ${link.note}`;
}

function withTrailingSlashForPage(path: string): string {
	return /\.[a-z0-9]+$/i.test(path) ? path : withTrailingSlash(path);
}

function withTrailingSlash(path: string): string {
	if (path === "/" || path.endsWith("/")) {
		return path;
	}

	return `${path}/`;
}

function normalizeOrigin(origin: string): string {
	return origin.replace(/\/+$/, "");
}

function toAbsoluteUrl(origin: string, path: string): string {
	return `${normalizeOrigin(origin)}${path.startsWith("/") ? path : `/${path}`}`;
}

function escapeXml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}

function clampText(content: string, maxCharacters: number): string {
	if (content.length <= maxCharacters) {
		return content;
	}

	return `${content.slice(0, maxCharacters - 80).trimEnd()}\n\n...[truncated]\n`;
}
