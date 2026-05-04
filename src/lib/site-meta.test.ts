import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import type { BlogPost } from "./blog-post-core";
import {
	buildAiText,
	buildLlmsFullText,
	buildLlmsText,
	buildRobotsText,
	buildSitemapXml,
	indexedSiteLocales,
} from "./site-meta";
import { siteProfile } from "./site-profile";

const origin = siteProfile.origin;
const supportedSiteLocales = ["en", "zh", "es", "fr", "hi", "ko"] as const;
const layoutSource = readFileSync(new URL("../routes/+layout.svelte", import.meta.url), "utf8");
const posts = [
	{
		slug: "watercolor-interface",
		locale: "en",
		title: "Watercolor interface",
		summary:
			"Keeping the hand-drawn mood while trimming the page down to controls that are actually used.",
		publishedAt: "2026-04-17",
		tags: ["design", "product"],
	},
	{
		slug: "watercolor-interface",
		locale: "ko",
		title: "수채화 인터페이스",
		summary: "손으로 그린 듯한 분위기는 살리되, 실제로 쓰는 조작 요소만 남기는 과정에 대한 메모.",
		publishedAt: "2026-04-17",
		tags: ["design", "product"],
	},
	{
		slug: "zero-license-notes",
		locale: "ko",
		title: "제로 라이선스 메모",
		summary: "허용적인 라이선스와 출처 표시에 대한 짧은 초안.",
		publishedAt: "2026-05-03",
		tags: ["open-source", "product"],
	},
] satisfies readonly BlogPost[];

describe("site meta files", () => {
	it("builds crawler discovery files from the site profile", () => {
		const robotsText = buildRobotsText(origin);
		const sitemapXml = buildSitemapXml(origin, posts);

		expect(indexedSiteLocales).toEqual(supportedSiteLocales);
		expect(robotsText).toContain("User-agent: *");
		expect(robotsText).toContain(`Sitemap: ${origin}/sitemap.xml`);
		expect(sitemapXml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
		expect(sitemapXml).toContain(`<loc>${origin}/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/ko/blog/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/zh/blog/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/es/blog/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/fr/blog/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/hi/blog/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/blog/watercolor-interface/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/ko/blog/watercolor-interface/</loc>`);
		expect(sitemapXml).toContain(`<loc>${origin}/ko/blog/zero-license-notes/</loc>`);
		expect(sitemapXml).not.toContain(`<loc>${origin}/blog/zero-license-notes/</loc>`);
		expect(sitemapXml).not.toContain(`<loc>${origin}/zh/blog/watercolor-interface/</loc>`);
	});

	it("builds assistant-readable indexes without inventing policy pages", () => {
		const aiText = buildAiText(origin);
		const llmsText = buildLlmsText(origin, posts);
		const llmsFullText = buildLlmsFullText(origin, posts);

		expect(aiText).toContain("## identity\n\n- name: 0disoft");
		expect(aiText).toContain("- url: https://0disoft.github.io");
		expect(aiText).toContain("- indexed_locales: en, zh, es, fr, hi, ko");
		expect(aiText).toContain(
			"## contact\n\n- github: https://github.com/0disoft/0disoft.github.io",
		);
		expect(aiText).not.toContain("[identity]\nname:");
		expect(llmsText).toContain("# 0disoft");
		expect(llmsText).toContain(`- [Blog](${origin}/blog/):`);
		expect(llmsText).toContain(`- [Chinese blog](${origin}/zh/blog/):`);
		expect(llmsText).toContain(`- [Spanish blog](${origin}/es/blog/):`);
		expect(llmsText).toContain(`- [French blog](${origin}/fr/blog/):`);
		expect(llmsText).toContain(`- [Hindi blog](${origin}/hi/blog/):`);
		expect(llmsText).toContain(`- [Korean blog](${origin}/ko/blog/):`);
		expect(llmsText).toContain(`- [Watercolor interface](${origin}/blog/watercolor-interface/):`);
		expect(llmsText).toContain(`- [ai.txt](${origin}/ai.txt):`);
		expect(llmsText).not.toContain("Security.txt");
		expect(llmsText).not.toContain("ads.txt");
		expect(llmsFullText).toContain("## Blog Posts");
		expect(llmsFullText).toContain("- Indexed locales: en, zh, es, fr, hi, ko");
		expect(llmsFullText).toContain("- Locale: ko");
		expect(llmsFullText).not.toContain("- Locale: zh");
		expect(llmsFullText).toContain("제로 라이선스 메모");
		expect(llmsFullText).not.toContain("Only English and Korean");
		expect(llmsFullText.length).toBeLessThanOrEqual(60_000);
	});

	it("exposes safe global head metadata without a misleading page canonical", () => {
		expect(siteProfile.description).toContain("open source");
		expect(siteProfile.sourceRepository).toBe("https://github.com/0disoft/0disoft.github.io");
		expect(layoutSource).toContain('meta name="description"');
		expect(layoutSource).toContain('property="og:site_name"');
		expect(layoutSource).toContain('name="twitter:card"');
		expect(layoutSource).toContain('rel="alternate" type="text/plain" href="/llms.txt"');
		expect(layoutSource).not.toContain('rel="canonical"');
	});
});
