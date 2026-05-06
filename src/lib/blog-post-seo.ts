import type { BlogPostDetail } from "$lib/blog-post-core";
import type { siteProfile } from "$lib/site-profile";

type SiteProfile = typeof siteProfile;

type BlogPostingStructuredDataInput = {
	post: BlogPostDetail;
	canonicalUrl: string;
	siteProfile: SiteProfile;
};

export function buildBlogPostingStructuredData({
	post,
	canonicalUrl,
	siteProfile,
}: BlogPostingStructuredDataInput) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.summary,
		...(post.heroImage
			? { image: [new URL(post.heroImage.src, siteProfile.origin).toString()] }
			: {}),
		datePublished: post.publishedAt,
		dateModified: post.updatedAt ?? post.publishedAt,
		author: {
			"@type": "Person",
			name: siteProfile.author.name,
			url: siteProfile.author.url,
			sameAs: siteProfile.author.sameAs,
		},
		publisher: {
			"@type": "Organization",
			name: siteProfile.publisher.name,
			url: siteProfile.publisher.url,
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": canonicalUrl,
		},
	};
}

export function serializeStructuredData(value: unknown): string {
	return JSON.stringify(value).replaceAll("<", "\\u003c");
}

export function createStructuredDataScriptMarkup(value: unknown): string {
	return `<script type="application/ld+json">${serializeStructuredData(value)}</script>`;
}
