import type { IndiehackersPost } from "$lib/indiehackers-posts";
import type { SiteLocale } from "$lib/site-locales";
import { withSearchTimeout } from "$lib/search-results";

export function createSearchIndexLoader() {
	const indexes = new Map<SiteLocale, Promise<IndiehackersPost[]>>();
	return (locale: SiteLocale): Promise<IndiehackersPost[]> => {
		const cached = indexes.get(locale);
		if (cached) return cached;
		const controller = new AbortController();
		const request = withSearchTimeout(
			fetch(`/search-index/${locale}.json`, { signal: controller.signal }).then((response) => {
				if (!response.ok) throw new Error("Search index unavailable");
				return response.json() as Promise<IndiehackersPost[]>;
			}),
		);
		// Share pending downloads as well as successful results across query changes.
		indexes.set(locale, request);
		void request.catch(() => {
			controller.abort();
			if (indexes.get(locale) === request) indexes.delete(locale);
		});
		return request;
	};
}
