import { createHighlighter } from "shiki";
import type { BlogPostBodyBlock } from "$lib/blog-post-core";

const supportedBlogCodeLanguages = {
	go: "go",
	rs: "rust",
	rust: "rust",
	ts: "typescript",
	typescript: "typescript",
} as const;

const highlighterPromise = createHighlighter({
	themes: ["github-light", "github-dark"],
	langs: ["go", "rust", "typescript"],
});

const highlightedCodeCache = new Map<string, Promise<string>>();

export async function highlightBlogPostCode(
	source: string,
	language: string | undefined,
): Promise<string | undefined> {
	const normalizedLanguage = normalizeBlogCodeLanguage(language);

	if (!normalizedLanguage) {
		return undefined;
	}

	const cacheKey = `${normalizedLanguage}\u0000${source}`;
	let highlightedCode = highlightedCodeCache.get(cacheKey);

	if (!highlightedCode) {
		highlightedCode = highlighterPromise.then((highlighter) =>
			highlighter.codeToHtml(source, {
				lang: normalizedLanguage,
				themes: {
					light: "github-light",
					dark: "github-dark",
				},
				defaultColor: false,
			}),
		);
		highlightedCodeCache.set(cacheKey, highlightedCode);
	}

	return highlightedCode;
}

export async function highlightBlogPostCodeBlocks(
	blocks: readonly BlogPostBodyBlock[],
): Promise<Record<number, string>> {
	const entries = await Promise.all(
		blocks.flatMap((block, blockIndex) =>
			block.kind === "code"
				? [
						highlightBlogPostCode(block.source, block.language).then((html) =>
							html ? ([blockIndex, html] as const) : undefined,
						),
					]
				: [],
		),
	);

	return Object.fromEntries(entries.filter((entry) => entry !== undefined));
}

function normalizeBlogCodeLanguage(
	language: string | undefined,
): (typeof supportedBlogCodeLanguages)[keyof typeof supportedBlogCodeLanguages] | undefined {
	if (!language) {
		return undefined;
	}

	const normalizedLanguage = language.toLowerCase() as keyof typeof supportedBlogCodeLanguages;
	return supportedBlogCodeLanguages[normalizedLanguage];
}
