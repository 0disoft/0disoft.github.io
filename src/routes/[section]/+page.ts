import type { EntryGenerator, PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getSectionEntries, sectionSlugToPath } from "$lib/site-navigation";

export const prerender = true;

export const entries: EntryGenerator = () => getSectionEntries();

export const load: PageLoad = ({ params }) => {
	const activePath = sectionSlugToPath(params.section);

	if (!activePath) {
		error(404, "Not Found");
	}

	return {
		activePath,
	};
};
