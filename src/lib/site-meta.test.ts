import { describe, expect, it } from "vitest";
import type { BlogPost } from "./blog-post-core";
import { blogPosts } from "./blog-posts";
import {
	buildAiText,
	buildLlmsFullText,
	buildLlmsText,
	buildRobotsText,
	buildRssXml,
	buildSitemapXml,
	getSitePlainTextAlternateLinks,
	getSiteRssAlternateLinks,
	getRssFeedPath,
	indexedSiteLocales,
	siteThemeColorMeta,
} from "./site-meta";
import { siteProfile } from "./site-profile";

const origin = siteProfile.origin;
const supportedSiteLocales = ["en", "zh", "es", "fr", "hi", "ko"] as const;
const currentPostSlug = "things-on-my-desk";

describe("site meta files", () => {
	it("builds crawler discovery files from the site profile", () => {
		const robotsText = buildRobotsText(origin);
		const sitemapXml = buildSitemapXml(origin, blogPosts);
		const sitemapUrls = extractSitemapUrls(sitemapXml);

		expect(blogPosts.length).toBeGreaterThan(0);
		expect(indexedSiteLocales).toEqual(supportedSiteLocales);
		expect(robotsText).toContain("User-agent: *");
		expect(robotsText).toContain(`Sitemap: ${origin}/sitemap.xml`);
		expect(sitemapXml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
		expect(sitemapXml).toContain(`<loc>${origin}/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/blog/</loc>`);
		for (const locale of supportedSiteLocales.filter((locale) => locale !== "en")) {
			expect(sitemapXml).toContain(`<loc>${origin}/${locale}/blog/</loc>`);
		}
		for (const post of blogPosts) {
			expect(sitemapXml).toContain(`<loc>${toAbsoluteLocalizedPostUrl(post)}</loc>`);
		}
		expect(new Set(sitemapUrls).size).toBe(sitemapUrls.length);
	});

	it("builds assistant-readable indexes from the current site profile and posts", () => {
		const aiText = buildAiText(origin);
		const llmsText = buildLlmsText(origin, blogPosts);
		const llmsFullText = buildLlmsFullText(origin, blogPosts);
		const englishPost = getCurrentPost("en");

		expect(aiText).toContain("## identity\n\n- name: 0disoft");
		expect(aiText).toContain("- url: https://0disoft.github.io");
		expect(aiText).toContain("- indexed_locales: en, zh, es, fr, hi, ko");
		expect(aiText).toContain(
			"## contact\n\n- github: https://github.com/0disoft/0disoft.github.io",
		);
		expect(llmsText).toContain("# 0disoft");
		expect(llmsText).toContain(`- [Blog](${origin}/blog/):`);
		expect(llmsText).toContain(`- [Chinese blog](${origin}/zh/blog/):`);
		expect(llmsText).toContain(`- [Spanish blog](${origin}/es/blog/):`);
		expect(llmsText).toContain(`- [French blog](${origin}/fr/blog/):`);
		expect(llmsText).toContain(`- [Hindi blog](${origin}/hi/blog/):`);
		expect(llmsText).toContain(`- [Korean blog](${origin}/ko/blog/):`);
		expect(llmsText).toContain(
			`- [${englishPost.title}](${toAbsoluteLocalizedPostUrl(englishPost)}):`,
		);
		expect(llmsText).toContain(`- [rss.xml](${origin}/rss.xml):`);
		expect(llmsText).toContain(`- [ai.txt](${origin}/ai.txt):`);
		expect(llmsFullText).toContain("## Blog Posts");
		expect(llmsFullText).toContain("- Indexed locales: en, zh, es, fr, hi, ko");
		for (const post of blogPosts) {
			expect(llmsFullText).toContain(`- Locale: ${post.locale}`);
			expect(llmsFullText).toContain(`- [${post.title}](${toAbsoluteLocalizedPostUrl(post)})`);
			expect(llmsFullText).toContain(`  - Published: ${post.publishedAt}`);
		}
		expect(llmsFullText.length).toBeLessThanOrEqual(60_000);
	});

	it("builds RSS feeds from matching-locale blog posts", () => {
		const currentLocalizedPosts = supportedSiteLocales.map((locale) => getCurrentPost(locale));

		expect(currentLocalizedPosts.map((post) => post.locale)).toEqual(supportedSiteLocales);

		for (const locale of supportedSiteLocales) {
			const rssXml = buildRssXml(origin, blogPosts, locale);
			const localePost = getCurrentPost(locale);
			const latestLocalePost = blogPosts
				.filter((post) => post.locale === locale)
				.toSorted((left, right) =>
					(right.updatedAt ?? right.publishedAt).localeCompare(left.updatedAt ?? left.publishedAt),
				)[0];
			const otherLocalePosts = currentLocalizedPosts.filter((post) => post.locale !== locale);
			const itemUrls = extractRssItemUrls(rssXml);

			expect(rssXml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
			expect(rssXml).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
			expect(rssXml).toContain(`<title>${siteProfile.name}</title>`);
			expect(rssXml).toContain(`<link>${toAbsoluteLocalizedBlogUrl(locale)}</link>`);
			expect(rssXml).toContain(`<language>${locale}</language>`);
			expect(rssXml).toContain(
				`<atom:link href="${origin}${getRssFeedPath(locale)}" rel="self" type="application/rss+xml" />`,
			);
			expect(rssXml).toContain(
				`<lastBuildDate>${formatRssDate(latestLocalePost.updatedAt ?? latestLocalePost.publishedAt)}</lastBuildDate>`,
			);
			expect(rssXml).toContain(`<title>${escapeXmlText(localePost.title)}</title>`);
			expect(rssXml).toContain(`<description>${escapeXmlText(localePost.summary)}</description>`);
			expect(rssXml).toContain(
				`<guid isPermaLink="true">${toAbsoluteLocalizedPostUrl(localePost)}</guid>`,
			);
			expect(rssXml).toContain(`<pubDate>${formatRssDate(localePost.publishedAt)}</pubDate>`);
			expect(itemUrls).toEqual(
				blogPosts
					.filter((post) => post.locale === locale)
					.toSorted(
						(left, right) =>
							right.publishedAt.localeCompare(left.publishedAt) ||
							left.title.localeCompare(right.title),
					)
					.map(toAbsoluteLocalizedPostUrl),
			);
			for (const otherLocalePost of otherLocalePosts) {
				expect(rssXml).not.toContain(`<title>${escapeXmlText(otherLocalePost.title)}</title>`);
				expect(itemUrls).not.toContain(toAbsoluteLocalizedPostUrl(otherLocalePost));
			}
		}
	});

	it("exposes safe global head metadata without a misleading page canonical", () => {
		expect(siteProfile.description).toContain("open source");
		expect(siteProfile.sourceRepository).toBe("https://github.com/0disoft/0disoft.github.io");
		expect(siteProfile.author).toEqual({
			name: "0disoft",
			url: "https://github.com/0disoft",
			sameAs: ["https://github.com/0disoft"],
		});
		expect(siteProfile.publisher).toEqual({
			name: "0disoft",
			url: "https://0disoft.github.io",
		});
		expect(supportedSiteLocales.map(getRssFeedPath)).toEqual([
			"/rss.xml",
			"/zh/rss.xml",
			"/es/rss.xml",
			"/fr/rss.xml",
			"/hi/rss.xml",
			"/ko/rss.xml",
		]);
		expect(getSiteRssAlternateLinks()).toEqual([
			{
				rel: "alternate",
				type: "application/rss+xml",
				href: "/rss.xml",
				title: "0disoft English RSS",
			},
			{
				rel: "alternate",
				type: "application/rss+xml",
				href: "/zh/rss.xml",
				title: "0disoft Chinese RSS",
			},
			{
				rel: "alternate",
				type: "application/rss+xml",
				href: "/es/rss.xml",
				title: "0disoft Spanish RSS",
			},
			{
				rel: "alternate",
				type: "application/rss+xml",
				href: "/fr/rss.xml",
				title: "0disoft French RSS",
			},
			{
				rel: "alternate",
				type: "application/rss+xml",
				href: "/hi/rss.xml",
				title: "0disoft Hindi RSS",
			},
			{
				rel: "alternate",
				type: "application/rss+xml",
				href: "/ko/rss.xml",
				title: "0disoft Korean RSS",
			},
		]);
		for (const locale of supportedSiteLocales) {
			expect(getRssFeedPath(locale)).toMatch(/^(?:\/[a-z]{2})?\/rss\.xml$/);
		}
		expect(getSitePlainTextAlternateLinks()).toEqual([
			{ rel: "alternate", type: "text/plain", href: "/llms.txt", title: "llms.txt" },
		]);
		expect(siteThemeColorMeta).toEqual([
			{ content: "#fbf7e8", media: "(prefers-color-scheme: light)" },
			{ content: "#152814", media: "(prefers-color-scheme: dark)" },
		]);
	});
});

function extractSitemapUrls(sitemapXml: string): string[] {
	return Array.from(sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g), ([, url]) => url);
}

function extractRssItemUrls(rssXml: string): string[] {
	return Array.from(rssXml.matchAll(/<guid isPermaLink="true">(.*?)<\/guid>/g), ([, url]) => url);
}

function getCurrentPost(locale: BlogPost["locale"]): BlogPost {
	const post = blogPosts.find(
		(candidate) => candidate.slug === currentPostSlug && candidate.locale === locale,
	);

	if (!post) {
		throw new Error(`Missing ${locale} post fixture for ${currentPostSlug}`);
	}

	return post;
}

function toAbsoluteLocalizedPostUrl(post: BlogPost): string {
	const localePrefix = post.locale === "en" ? "" : `/${post.locale}`;

	return `${origin}${localePrefix}/blog/${post.slug}/`;
}

function toAbsoluteLocalizedBlogUrl(locale: BlogPost["locale"]): string {
	return `${origin}${locale === "en" ? "" : `/${locale}`}/blog/`;
}

function formatRssDate(date: string): string {
	return new Date(`${date}T00:00:00.000Z`).toUTCString();
}

function escapeXmlText(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&apos;");
}
