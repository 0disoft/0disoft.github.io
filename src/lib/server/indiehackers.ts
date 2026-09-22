import { isSiteLocale, type SiteLocale } from "$lib/site-locales";

export type IndiehackersCopy = {
	title: string;
	paragraphs: string[];
};

const fallbackIndiehackersLocale = "ko" satisfies SiteLocale;

const indiehackersMarkdownModules = import.meta.glob<string>("../../content/indiehackers/*.md", {
	eager: true,
	import: "default",
	query: "?raw",
});

export const indiehackersCopyByLocale = Object.fromEntries(
	Object.entries(indiehackersMarkdownModules).flatMap(([path, markdown]) => {
		const locale = readIndiehackersLocale(path);

		return locale ? [[locale, parseIndiehackersMarkdown(path, markdown)]] : [];
	}),
) as Partial<Record<SiteLocale, IndiehackersCopy>>;

export function getIndiehackersCopy(locale: SiteLocale): IndiehackersCopy {
	const fallbackCopy = indiehackersCopyByLocale[fallbackIndiehackersLocale];

	if (!fallbackCopy) {
		throw new Error(`Missing ${fallbackIndiehackersLocale} indiehackers copy`);
	}

	return indiehackersCopyByLocale[locale] ?? fallbackCopy;
}

function readIndiehackersLocale(path: string): SiteLocale | null {
	const locale = path.match(/\/([a-z]{2})\.md$/)?.[1];

	return locale && isSiteLocale(locale) ? locale : null;
}

function parseIndiehackersMarkdown(path: string, markdown: string): IndiehackersCopy {
	const match = /^---\s*\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/.exec(markdown);

	if (!match) {
		throw new Error(`Indiehackers copy must start with JSON frontmatter: ${path}`);
	}

	const metadata = readIndiehackersMetadata(path, match[1]);
	const paragraphs = match[2]
		.trim()
		.replace(/\r\n/g, "\n")
		.split(/\n{2,}/)
		.map((paragraph) => paragraph.replace(/\n/g, " ").trim())
		.filter(Boolean);

	if (paragraphs.length === 0) {
		throw new Error(`Indiehackers copy must include at least one paragraph: ${path}`);
	}

	return {
		title: metadata.title,
		paragraphs,
	};
}

function readIndiehackersMetadata(path: string, rawMetadata: string): { title: string } {
	let metadata: unknown;

	try {
		metadata = JSON.parse(rawMetadata);
	} catch (error) {
		throw new Error(`Indiehackers frontmatter must be valid JSON: ${path}`, { cause: error });
	}

	if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
		throw new Error(`Indiehackers frontmatter must be an object: ${path}`);
	}

	const title = (metadata as Record<string, unknown>).title;

	if (typeof title !== "string" || title.trim().length === 0) {
		throw new Error(`Indiehackers title must be a non-empty string: ${path}`);
	}

	return { title: title.trim() };
}
