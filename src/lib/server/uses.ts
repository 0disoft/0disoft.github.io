import { isSiteLocale, type SiteLocale } from "$lib/site-locales";

export type UsesCopy = {
	title: string;
	paragraphs: string[];
};

const fallbackUsesLocale = "ko" satisfies SiteLocale;

const usesMarkdownModules = import.meta.glob<string>("../../content/uses/*.md", {
	eager: true,
	import: "default",
	query: "?raw",
});

export const usesCopyByLocale = Object.fromEntries(
	Object.entries(usesMarkdownModules).flatMap(([path, markdown]) => {
		const locale = readUsesLocale(path);

		return locale ? [[locale, parseUsesMarkdown(path, markdown)]] : [];
	}),
) as Partial<Record<SiteLocale, UsesCopy>>;

export function getUsesCopy(locale: SiteLocale): UsesCopy {
	const fallbackCopy = usesCopyByLocale[fallbackUsesLocale];

	if (!fallbackCopy) {
		throw new Error(`Missing ${fallbackUsesLocale} uses copy`);
	}

	return usesCopyByLocale[locale] ?? fallbackCopy;
}

function readUsesLocale(path: string): SiteLocale | null {
	const locale = path.match(/\/([a-z]{2})\.md$/)?.[1];

	return locale && isSiteLocale(locale) ? locale : null;
}

function parseUsesMarkdown(path: string, markdown: string): UsesCopy {
	const match = /^---\s*\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/.exec(markdown);

	if (!match) {
		throw new Error(`Uses copy must start with JSON frontmatter: ${path}`);
	}

	const metadata = readUsesMetadata(path, match[1]);
	const paragraphs = match[2]
		.trim()
		.replace(/\r\n/g, "\n")
		.split(/\n{2,}/)
		.map((paragraph) => paragraph.replace(/\n/g, " ").trim())
		.filter(Boolean);

	if (paragraphs.length === 0) {
		throw new Error(`Uses copy must include at least one paragraph: ${path}`);
	}

	return {
		title: metadata.title,
		paragraphs,
	};
}

function readUsesMetadata(path: string, rawMetadata: string): { title: string } {
	let metadata: unknown;

	try {
		metadata = JSON.parse(rawMetadata);
	} catch (error) {
		throw new Error(`Uses frontmatter must be valid JSON: ${path}`, { cause: error });
	}

	if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
		throw new Error(`Uses frontmatter must be an object: ${path}`);
	}

	const title = (metadata as Record<string, unknown>).title;

	if (typeof title !== "string" || title.trim().length === 0) {
		throw new Error(`Uses title must be a non-empty string: ${path}`);
	}

	return { title: title.trim() };
}
