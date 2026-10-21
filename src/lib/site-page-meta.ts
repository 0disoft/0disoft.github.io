import { siteProfile } from "$lib/site-profile";
import { birdMarkPath } from "$lib/site-assets";
import type { IndiehackersPost } from "$lib/indiehackers-posts";

export function getSitePageMeta(pathname: string, post?: IndiehackersPost) {
	return {
		title: post ? `${post.title} · ${siteProfile.name}` : siteProfile.name,
		description: post?.summary ?? siteProfile.description,
		type: post ? "article" : "website",
		url: new URL(pathname.endsWith("/") ? pathname : `${pathname}/`, siteProfile.origin).href,
		image: new URL(post?.coverImage ?? birdMarkPath, siteProfile.origin).href,
		imageAlt: post?.title ?? "0disoft bird mark",
		card: post?.coverImage ? "summary_large_image" : "summary",
	};
}
