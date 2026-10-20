export type SearchResultItem = {
	id: string;
	url: string;
	title: string;
	excerpt: string;
	plainExcerpt?: boolean;
};

export type PagefindSearchResponse = {
	results?: Array<{
		id: string;
		data: () => Promise<{
			url?: string;
			meta?: { title?: string };
			excerpt?: string;
		}>;
	}>;
};

export async function loadSearchResults(
	response: PagefindSearchResponse,
): Promise<SearchResultItem[]> {
	const loaded = await Promise.allSettled(
		(response.results ?? []).map(async (result) => {
			const data = await result.data();
			return {
				id: result.id,
				url: data.url ?? "",
				title: data.meta?.title ?? "",
				excerpt: data.excerpt ?? "",
			};
		}),
	);
	if (loaded.length > 0 && loaded.every((result) => result.status === "rejected")) {
		throw new Error("All search result details failed to load");
	}
	return loaded.flatMap((result) =>
		result.status === "fulfilled" && result.value.url ? [result.value] : [],
	);
}
