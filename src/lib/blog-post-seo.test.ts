import { describe, expect, it } from "vitest";
import type { BlogPostDetail } from "./blog-post-core";
import { buildBlogPostingStructuredData, createStructuredDataScriptMarkup } from "./blog-post-seo";
import { siteProfile } from "./site-profile";

describe("blog post SEO metadata", () => {
	it("builds BlogPosting JSON-LD from post, author, and canonical URL", () => {
		const post = {
			slug: "sample-seo-note",
			locale: "en",
			title: "Sample SEO note",
			summary: "Structured metadata fixture",
			publishedAt: "2026-05-03",
			updatedAt: "2026-05-04",
			tags: ["business-friction", "market-entry"],
			heroImage: {
				src: "/images/0disoft-bird.svg",
				alt: "0disoft bird mark",
			},
			body: "Body",
		} satisfies BlogPostDetail;
		const canonicalUrl = "https://0disoft.github.io/blog/sample-seo-note/";

		expect(buildBlogPostingStructuredData({ post, canonicalUrl, siteProfile })).toEqual({
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: "Sample SEO note",
			description: "Structured metadata fixture",
			image: ["https://0disoft.github.io/images/0disoft-bird.svg"],
			datePublished: "2026-05-03",
			dateModified: "2026-05-04",
			author: {
				"@type": "Person",
				name: "0disoft",
				url: "https://github.com/0disoft",
				sameAs: ["https://github.com/0disoft"],
			},
			publisher: {
				"@type": "Organization",
				name: "0disoft",
				url: "https://0disoft.github.io",
			},
			mainEntityOfPage: {
				"@type": "WebPage",
				"@id": canonicalUrl,
			},
		});
		expect(
			createStructuredDataScriptMarkup(
				buildBlogPostingStructuredData({ post, canonicalUrl, siteProfile }),
			),
		).toContain('<script type="application/ld+json">{"@context":"https://schema.org"');
	});
});
