import { isSiteLocale, type SiteLocale } from "$lib/site-locales";

export type AboutCopy = {
	title: string;
	paragraphs: string[];
};

const fallbackAboutLocale = "ko" satisfies SiteLocale;

const aboutMarkdownModules = import.meta.glob<string>("../../content/about/*.md", {
	eager: true,
	import: "default",
	query: "?raw",
});

export const aboutCopyByLocale = Object.fromEntries(
	Object.entries(aboutMarkdownModules).flatMap(([path, markdown]) => {
		const locale = readAboutLocale(path);

		return locale ? [[locale, parseAboutMarkdown(path, markdown)]] : [];
	}),
) as Partial<Record<SiteLocale, AboutCopy>>;

export function getAboutCopy(locale: SiteLocale): AboutCopy {
	const fallbackCopy = aboutCopyByLocale[fallbackAboutLocale];

	if (!fallbackCopy) {
		throw new Error(`Missing ${fallbackAboutLocale} about copy`);
	}

	return aboutCopyByLocale[locale] ?? fallbackCopy;
}

function readAboutLocale(path: string): SiteLocale | null {
	const locale = path.match(/\/([a-z]{2})\.md$/)?.[1];

	return locale && isSiteLocale(locale) ? locale : null;
}

function parseAboutMarkdown(path: string, markdown: string): AboutCopy {
	const match = /^---\s*\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/.exec(markdown);

	if (!match) {
		throw new Error(`About copy must start with JSON frontmatter: ${path}`);
	}

	const metadata = readAboutMetadata(path, match[1]);
	const paragraphs = match[2]
		.trim()
		.replace(/\r\n/g, "\n")
		.split(/\n{2,}/)
		.map((paragraph) => paragraph.replace(/\n/g, " ").trim())
		.filter(Boolean);

	if (paragraphs.length === 0) {
		throw new Error(`About copy must include at least one paragraph: ${path}`);
	}

	return {
		title: metadata.title,
		paragraphs,
	};
}

function readAboutMetadata(path: string, rawMetadata: string): { title: string } {
	let metadata: unknown;

	try {
		metadata = JSON.parse(rawMetadata);
	} catch (error) {
		throw new Error(`About frontmatter must be valid JSON: ${path}`, { cause: error });
	}

	if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
		throw new Error(`About frontmatter must be an object: ${path}`);
	}

	const title = (metadata as Record<string, unknown>).title;

	if (typeof title !== "string" || title.trim().length === 0) {
		throw new Error(`About title must be a non-empty string: ${path}`);
	}

	return { title: title.trim() };
}
