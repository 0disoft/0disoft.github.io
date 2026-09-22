import {
	createIndiehackersPostDetailFromContent,
	createIndiehackersPostFromContent,
	indiehackersPostLocales,
	type IndiehackersPost,
	type IndiehackersPostDetail,
} from "$lib/indiehackers-posts";
import { assertCompleteIndiehackersTranslations } from "./indiehackers-content-validation";

export {
	INDIEHACKERS_FILTER_QUERY_KEYS,
	createEmptyIndiehackersFilters,
	filterIndiehackersPosts,
	getAdjacentIndiehackersPosts,
	getIndiehackersFilterOptions,
	getIndiehackersPostEntries,
	getIndiehackersPostForLocale,
	getIndiehackersPostSearchValues,
	getIndiehackersPostTagLabels,
	getIndiehackersPostsForLocale,
	indiehackersPostLocales,
	indiehackersTagOptions,
	parseIndiehackersFilters,
	type IndiehackersFilters,
	type IndiehackersPost,
	type IndiehackersPostDetail,
	type IndiehackersPostLocale,
	type IndiehackersTagId,
} from "$lib/indiehackers-posts";

const indiehackersPostMetaModules = import.meta.glob("../../content/indiehackers/posts/*/meta.json", {
	eager: true,
	import: "default",
});

const indiehackersPostMarkdownModules = import.meta.glob<string>(
	"../../content/indiehackers/posts/*/*.md",
	{
		eager: true,
		import: "default",
		query: "?raw",
	},
);

assertCompleteIndiehackersTranslations(
	Object.keys(indiehackersPostMetaModules),
	indiehackersPostMarkdownModules,
);

export const indiehackersPosts: readonly IndiehackersPost[] = Object.entries(
	indiehackersPostMetaModules,
)
	.flatMap(([path, metadata]) =>
		indiehackersPostLocales.map((locale) => {
			const markdown =
				indiehackersPostMarkdownModules[`${path.replace(/\/meta\.json$/, "")}/${locale}.md`];

			if (typeof markdown !== "string") {
				throw new Error(`Missing indiehackers post translation: ${path.replace(/\/meta\.json$/, "")}/${locale}.md`);
			}

			return createIndiehackersPostFromContent(path, metadata, locale, markdown);
		}),
	)
	.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

export const indiehackersPostDetails: readonly IndiehackersPostDetail[] = Object.entries(
	indiehackersPostMetaModules,
)
	.flatMap(([path, metadata]) =>
		indiehackersPostLocales.map((locale) => {
			const markdown =
				indiehackersPostMarkdownModules[`${path.replace(/\/meta\.json$/, "")}/${locale}.md`];

			if (typeof markdown !== "string") {
				throw new Error(`Missing indiehackers post translation: ${path.replace(/\/meta\.json$/, "")}/${locale}.md`);
			}

			return createIndiehackersPostDetailFromContent(path, metadata, locale, markdown);
		}),
	)
	.sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
