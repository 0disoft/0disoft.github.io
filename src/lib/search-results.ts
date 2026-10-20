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

type SearchResultLoadingOptions = {
	isCurrent?: () => boolean;
	onResults?: (results: SearchResultItem[]) => void;
};

const MAX_CONCURRENT_DETAIL_LOADS = 6;

export async function loadSearchResults(
	response: PagefindSearchResponse,
	{ isCurrent = () => true, onResults }: SearchResultLoadingOptions = {},
): Promise<SearchResultItem[]> {
	const source = response.results ?? [];
	const loaded: Array<SearchResultItem | undefined> = [];
	let nextIndex = 0;
	let failures = 0;
	const available = () =>
		loaded.filter((result): result is SearchResultItem => result !== undefined);

	async function worker() {
		while (isCurrent()) {
			const index = nextIndex++;
			if (index >= source.length) return;
			let data: Awaited<ReturnType<(typeof source)[number]["data"]>>;
			try {
				data = await source[index].data();
			} catch {
				failures += 1;
				continue;
			}
			if (!isCurrent()) return;
			if (data.url) {
				loaded[index] = {
					id: source[index].id,
					url: data.url,
					title: data.meta?.title ?? "",
					excerpt: data.excerpt ?? "",
				};
				onResults?.(available());
			}
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(MAX_CONCURRENT_DETAIL_LOADS, source.length) }, worker),
	);
	if (!isCurrent()) return [];
	if (source.length > 0 && failures === source.length) {
		throw new Error("All search result details failed to load");
	}
	return available();
}
