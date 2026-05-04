import type { EntryGenerator, PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { blogPostDetails, getBlogPostEntries } from "$lib/blog-posts";

export const prerender = "auto";

export const entries: EntryGenerator = () => getBlogPostEntries(blogPostDetails);

export const load: PageLoad = ({ params }) => {
	const postExists = blogPostDetails.some((post) => post.slug === params.slug);

	if (!postExists) {
		error(404, "Not Found");
	}

	return {
		slug: params.slug,
	};
};
