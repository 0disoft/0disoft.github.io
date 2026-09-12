import { blogPostLocales } from "$lib/blog-post-core";

export function assertCompleteBlogTranslations(
	metadataPaths: readonly string[],
	markdownModules: Readonly<Record<string, string>>,
) {
	const missing = metadataPaths.flatMap((path) =>
		blogPostLocales
			.map((locale) => `${path.replace(/\/meta\.json$/, "")}/${locale}.md`)
			.filter((translation) => !markdownModules[translation]?.trim()),
	);
	if (missing.length > 0) {
		throw new Error(`Missing or empty blog translations: ${missing.sort().join(", ")}`);
	}
}
