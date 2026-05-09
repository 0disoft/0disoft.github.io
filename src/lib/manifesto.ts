import { isSiteLocale, type SiteLocale } from "$lib/site-locales";

type ManifestoCopy = {
	title: string;
	paragraphs: string[];
};

const fallbackManifestoLocale = "ko" satisfies SiteLocale;

const manifestoMarkdownModules = import.meta.glob<string>("../content/manifesto/*.md", {
	eager: true,
	import: "default",
	query: "?raw",
});

export const manifestoCopyByLocale = Object.fromEntries(
	Object.entries(manifestoMarkdownModules).flatMap(([path, markdown]) => {
		const locale = readManifestoLocale(path);

		return locale ? [[locale, parseManifestoMarkdown(path, markdown)]] : [];
	}),
) as Partial<Record<SiteLocale, ManifestoCopy>>;

export function getManifestoCopy(locale: SiteLocale): ManifestoCopy {
	const fallbackCopy = manifestoCopyByLocale[fallbackManifestoLocale];

	if (!fallbackCopy) {
		throw new Error(`Missing ${fallbackManifestoLocale} manifesto copy`);
	}

	return manifestoCopyByLocale[locale] ?? fallbackCopy;
}

function readManifestoLocale(path: string): SiteLocale | null {
	const locale = path.match(/\/([a-z]{2})\.md$/)?.[1];

	return locale && isSiteLocale(locale) ? locale : null;
}

function parseManifestoMarkdown(path: string, markdown: string): ManifestoCopy {
	const match = /^---\s*\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/.exec(markdown);

	if (!match) {
		throw new Error(`Manifesto copy must start with JSON frontmatter: ${path}`);
	}

	const metadata = readManifestoMetadata(path, match[1]);
	const paragraphs = match[2]
		.trim()
		.replace(/\r\n/g, "\n")
		.split(/\n{2,}/)
		.map((paragraph) => paragraph.replace(/\n/g, " ").trim())
		.filter(Boolean);

	if (paragraphs.length === 0) {
		throw new Error(`Manifesto copy must include at least one paragraph: ${path}`);
	}

	return {
		title: metadata.title,
		paragraphs,
	};
}

function readManifestoMetadata(path: string, rawMetadata: string): { title: string } {
	let metadata: unknown;

	try {
		metadata = JSON.parse(rawMetadata);
	} catch (error) {
		throw new Error(`Manifesto frontmatter must be valid JSON: ${path}`, { cause: error });
	}

	if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
		throw new Error(`Manifesto frontmatter must be an object: ${path}`);
	}

	const title = (metadata as Record<string, unknown>).title;

	if (typeof title !== "string" || title.trim().length === 0) {
		throw new Error(`Manifesto title must be a non-empty string: ${path}`);
	}

	return { title: title.trim() };
}
