import { createWorkFromContent, sortWorks, workLocales, type WorkEntry } from "$lib/work-core";

export {
	WORK_FILTER_QUERY_KEYS,
	createEmptyWorkFilters,
	createWorkFromContent,
	filterWorks,
	getWorkFilterOptions,
	getWorksForLocale,
	parseWorkFilters,
	sortWorks,
	workKindOptions,
	workLinkKeys,
	workLocales,
	workStatusOptions,
	type WorkEntry,
	type WorkFilters,
	type WorkKind,
	type WorkLinkKey,
	type WorkLinks,
	type WorkLocale,
	type WorkStatus,
} from "$lib/work-core";

const workMetaModules = import.meta.glob("../content/works/**/meta.json", {
	eager: true,
	import: "default",
});

const workCopyModules = import.meta.glob("../content/works/**/*.json", {
	eager: true,
	import: "default",
});

export const workItems: readonly WorkEntry[] = sortWorks(
	Object.entries(workMetaModules).flatMap(([path, metadata]) =>
		workLocales.map((locale) => {
			const copyPath = `${path.replace(/\/meta\.json$/, "")}/${locale}.json`;
			const copy = workCopyModules[copyPath];

			if (!copy) {
				throw new Error(`Missing ${locale} work copy: ${copyPath}`);
			}

			return createWorkFromContent(path, metadata, locale, copy);
		}),
	),
);
