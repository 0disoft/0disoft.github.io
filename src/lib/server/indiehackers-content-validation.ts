import { indiehackersPostLocales } from "$lib/indiehackers-posts";

export function assertCompleteIndiehackersTranslations(
	metadataPaths: readonly string[],
	markdownModules: Readonly<Record<string, string>>,
) {
	const missing = metadataPaths.flatMap((path) =>
		indiehackersPostLocales
			.map((locale) => `${path.replace(/\/meta\.json$/, "")}/${locale}.md`)
			.filter((translation) => !markdownModules[translation]?.trim()),
	);
	if (missing.length > 0) {
		throw new Error(`Missing or empty indiehackers translations: ${missing.sort().join(", ")}`);
	}
}
