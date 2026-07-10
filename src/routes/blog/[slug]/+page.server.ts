import type { EntryGenerator, PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import type { BlogPostCodeHighlights } from "$lib/blog-code-highlighting";
import { blogPostDetails, getBlogPostBodyBlocks, getBlogPostEntries } from "$lib/blog-posts";
import { highlightBlogPostCodeBlocks } from "$lib/server/blog-code-highlighting";

export const prerender = "auto";

export const entries: EntryGenerator = () => getBlogPostEntries(blogPostDetails);

export const load: PageServerLoad = async ({ params }) => {
	const localizedPosts = blogPostDetails.filter((post) => post.slug === params.slug);

	if (localizedPosts.length === 0) {
		error(404, "Not Found");
	}

	const highlightedCodeByLocale = Object.fromEntries(
		await Promise.all(
			localizedPosts.map(async (post) => [
				post.locale,
				await highlightBlogPostCodeBlocks(getBlogPostBodyBlocks(post)),
			]),
		),
	) satisfies BlogPostCodeHighlights;

	return {
		slug: params.slug,
		highlightedCodeByLocale,
	};
};
