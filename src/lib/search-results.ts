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
	onIncomplete?: () => void;
};

const MAX_CONCURRENT_DETAIL_LOADS = 6;

export async function withSearchTimeout<T>(
	operation: Promise<T>,
	milliseconds = 8_000,
): Promise<T> {
	let timer: ReturnType<typeof setTimeout> | undefined;
	try {
		return await Promise.race([
			operation,
			new Promise<never>((_, reject) => {
				timer = setTimeout(() => reject(new Error("Search timed out")), milliseconds);
			}),
		]);
	} finally {
		clearTimeout(timer);
	}
}

export async function loadSearchResults(
	response: PagefindSearchResponse,
	{ isCurrent = () => true, onResults, onIncomplete }: SearchResultLoadingOptions = {},
): Promise<SearchResultItem[]> {
	const source = response.results ?? [];
	const loaded: Array<SearchResultItem | undefined> = [];
	let nextIndex = 0;
	let failures = 0;
	let stopped = false;
	const available = () =>
		loaded.filter((result): result is SearchResultItem => result !== undefined);

	async function worker() {
		while (!stopped && isCurrent()) {
			const index = nextIndex++;
			if (index >= source.length) return;
			let data: Awaited<ReturnType<(typeof source)[number]["data"]>>;
			try {
				// A timeout cannot cancel data(): retain the slot until its I/O settles.
				// The shared batch deadline below bounds how long the caller waits.
				data = await source[index].data();
			} catch {
				failures += 1;
				continue;
			}
			if (stopped || !isCurrent()) return;
			if (data.url) {
				loaded[index] = {
					id: source[index].id,
					url: data.url,
					title: data.meta?.title ?? "",
					excerpt: data.excerpt ?? "",
				};
				onResults?.(available());
			} else {
				failures += 1;
			}
		}
	}

	try {
		await withSearchTimeout(
			Promise.all(
				Array.from({ length: Math.min(MAX_CONCURRENT_DETAIL_LOADS, source.length) }, worker),
			),
		);
	} catch {
		failures += 1;
	} finally {
		stopped = true;
	}
	if (!isCurrent()) return [];
	if (source.length > 0 && available().length === 0) {
		throw new Error("All search result details failed to load");
	}
	if (failures > 0) onIncomplete?.();
	return available();
}
