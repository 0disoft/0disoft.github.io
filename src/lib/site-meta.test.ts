import { describe, expect, it } from "vitest";
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

describe("site meta files", () => {
	it("builds crawler discovery files from the site profile", () => {
		const robotsText = buildRobotsText(origin);
		const sitemapXml = buildSitemapXml(origin, []);
		const sitemapUrls = extractSitemapUrls(sitemapXml);

		expect(indexedSiteLocales).toEqual(supportedSiteLocales);
		expect(robotsText).toContain("User-agent: *");
		expect(robotsText).toContain(`Sitemap: ${origin}/sitemap.xml`);
		expect(sitemapXml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
		expect(sitemapXml).toContain(`<loc>${origin}/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/indiehackers/</loc>`);
		for (const locale of supportedSiteLocales.filter((locale) => locale !== "en")) {
			expect(sitemapXml).toContain(`<loc>${origin}/${locale}/indiehackers/</loc>`);
		}
		expect(new Set(sitemapUrls).size).toBe(sitemapUrls.length);
	});

	it("builds assistant-readable indexes from the current site profile", () => {
		const aiText = buildAiText(origin);
		const llmsText = buildLlmsText(origin, []);
		const llmsFullText = buildLlmsFullText(origin, []);

		expect(aiText).toContain("## identity\n\n- name: 0disoft");
		expect(aiText).toContain("- url: https://0disoft.github.io");
		expect(aiText).toContain("- indexed_locales: en, zh, es, fr, hi, ko");
		expect(aiText).toContain(
			"## contact\n\n- github: https://github.com/0disoft/0disoft.github.io",
		);
		expect(llmsText).toContain("# 0disoft");
		expect(llmsText).toContain(`- [Indiehackers](${origin}/indiehackers/):`);
		expect(llmsText).toContain(`- [rss.xml](${origin}/rss.xml):`);
		expect(llmsText).toContain(`- [ai.txt](${origin}/ai.txt):`);
		expect(llmsFullText).toContain("## Core Navigation");
		expect(llmsFullText).toContain("- Indexed locales: en, zh, es, fr, hi, ko");
		expect(llmsFullText.length).toBeLessThanOrEqual(60_000);
	});

	it("builds empty RSS feeds that point at the indiehackers section", () => {
		for (const locale of supportedSiteLocales) {
			const rssXml = buildRssXml(origin, [], locale);

			expect(rssXml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
			expect(rssXml).toContain('<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">');
			expect(rssXml).toContain(`<title>${siteProfile.name}</title>`);
			expect(rssXml).toContain(
				`<link>${origin}${locale === "en" ? "" : `/${locale}`}/indiehackers/</link>`,
			);
			expect(rssXml).toContain(`<language>${locale}</language>`);
			expect(rssXml).toContain(
				`<atom:link href="${origin}${getRssFeedPath(locale)}" rel="self" type="application/rss+xml" />`,
			);
			expect(extractRssItemUrls(rssXml)).toEqual([]);
		}
	});

	it("exposes safe global head metadata without a misleading page canonical", () => {
		expect(siteProfile.description).toContain("indie hackers");
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
