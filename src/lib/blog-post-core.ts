export const blogTagOptions = [
	{ id: "korea-regulation", label: "Korea Regulation" },
	{ id: "internet-control", label: "Internet Control" },
	{ id: "building-rules", label: "Building Rules" },
	{ id: "housing-policy", label: "Housing Policy" },
	{ id: "business-friction", label: "Business Friction" },
	{ id: "compliance-cost", label: "Compliance Cost" },
	{ id: "licensing", label: "Licensing" },
	{ id: "market-entry", label: "Market Entry" },
	{ id: "state-power", label: "State Power" },
	{ id: "professional-cartels", label: "Professional Cartels" },
	{ id: "mobility-regulation", label: "Mobility Regulation" },
	{ id: "finance-regulation", label: "Finance Regulation" },
	{ id: "healthcare-regulation", label: "Healthcare Regulation" },
	{ id: "education-regulation", label: "Education Regulation" },
	{ id: "data-ai-policy", label: "Data & AI Policy" },
] as const;

export const blogPostLocales = ["en", "es", "fr", "hi", "ko", "zh"] as const;
export const BLOG_POST_TOC_SHORTCUT_PREFIX = "T";
export const BLOG_POST_TOC_SHORTCUT_LIMIT = 9;

export type BlogTagId = (typeof blogTagOptions)[number]["id"];
export type BlogPostLocale = (typeof blogPostLocales)[number];

export type BlogPostHeroImage = {
	src: string;
	alt: string;
};

export type BlogPost = {
	slug: string;
	locale: BlogPostLocale;
	title: string;
	summary: string;
	publishedAt: string;
	updatedAt?: string;
	tags: readonly BlogTagId[];
	searchTags?: readonly string[];
	heroImage?: BlogPostHeroImage;
};

export type BlogPostDetail = BlogPost & {
	body: string;
};

export type BlogPostBodyBlock =
	| {
			kind: "paragraph";
			text: string;
	  }
	| {
			kind: "heading";
			level: 2;
			text: string;
	  }
	| {
			kind: "image";
			alt: string;
			src: string;
	  }
	| {
			kind: "table";
			headers: string[];
			rows: string[][];
	  };

export type BlogFilters = {
	query: string;
	tag: BlogTagId | "";
	year: string;
};

type BlogPostSharedMetadata = {
	id: string;
	publishedAt: string;
	updatedAt?: string;
	tags: BlogTagId[];
	heroImage?: BlogPostSharedHeroImage;
};

type BlogPostSharedHeroImage = {
	src: string;
	alt: Record<BlogPostLocale, string>;
};

export const BLOG_FILTER_QUERY_KEYS = {
	query: "q",
	tag: "tag",
	year: "year",
} as const;

export function createBlogPostFromContent(
	path: string,
	metadata: unknown,
	locale: BlogPostLocale,
	markdown: string,
): BlogPost {
	const sharedMetadata = readSharedMetadata(path, metadata);
	const localizedContent = parseMarkdownFile(`${getContentDirectory(path)}/${locale}.md`, markdown);
	const localizedMetadata = toRecord(localizedContent.frontmatter, path);
	const heroImage = localizeHeroImage(sharedMetadata.heroImage, locale);

	return {
		slug: sharedMetadata.id,
		locale,
		title: readRequiredString(localizedMetadata, "title", path),
		summary: readRequiredString(localizedMetadata, "summary", path),
		publishedAt: sharedMetadata.publishedAt,
		...(sharedMetadata.updatedAt ? { updatedAt: sharedMetadata.updatedAt } : {}),
		tags: sharedMetadata.tags,
		searchTags: readOptionalStringList(localizedMetadata, "searchTags", path),
		...(heroImage ? { heroImage } : {}),
	};
}

export function createBlogPostDetailFromContent(
	path: string,
	metadata: unknown,
	locale: BlogPostLocale,
	markdown: string,
): BlogPostDetail {
	const localizedContent = parseMarkdownFile(`${getContentDirectory(path)}/${locale}.md`, markdown);

	return {
		...createBlogPostFromContent(path, metadata, locale, markdown),
		body: localizedContent.body,
	};
}

export function readSharedMetadata(path: string, metadata: unknown): BlogPostSharedMetadata {
	const metadataRecord = toRecord(metadata, path);
	const heroImage = readOptionalHeroImage(metadataRecord, path);

	return {
		id: readBlogPostId(metadataRecord, path),
		publishedAt: readPublishedAt(metadataRecord, path),
		...readOptionalUpdatedAt(metadataRecord, path),
		tags: readBlogTags(metadataRecord, path),
		...(heroImage ? { heroImage } : {}),
	};
}

export function createEmptyBlogFilters(): BlogFilters {
	return {
		query: "",
		tag: "",
		year: "",
	};
}

export function parseBlogFilters(searchParams: URLSearchParams): BlogFilters {
	return {
		query: searchParams.get(BLOG_FILTER_QUERY_KEYS.query)?.trim() ?? "",
		tag: normalizeTag(searchParams.get(BLOG_FILTER_QUERY_KEYS.tag)),
		year: normalizeYear(searchParams.get(BLOG_FILTER_QUERY_KEYS.year)),
	};
}

export function getBlogFilterOptions(posts: readonly BlogPost[]): {
	tags: typeof blogTagOptions;
	years: string[];
} {
	const years = Array.from(new Set(posts.map((post) => post.publishedAt.slice(0, 4)))).sort(
		(left, right) => Number(right) - Number(left),
	);

	return { tags: blogTagOptions, years };
}

export function getBlogPostsForLocale(posts: readonly BlogPost[], locale: string): BlogPost[] {
	const blogLocale = toBlogPostLocale(locale);
	const localizedPosts = posts.filter((post) => post.locale === blogLocale);

	if (localizedPosts.length > 0) {
		return localizedPosts;
	}

	return posts.filter((post) => post.locale === "en");
}

export function getBlogPostForLocale<Post extends BlogPost>(
	posts: readonly Post[],
	slug: string,
	locale: string,
): Post | null {
	const blogLocale = toBlogPostLocale(locale);

	return (
		posts.find((post) => post.slug === slug && post.locale === blogLocale) ??
		posts.find((post) => post.slug === slug && post.locale === "en") ??
		null
	);
}

export function getAdjacentBlogPosts<Post extends BlogPost>(
	posts: readonly Post[],
	slug: string,
	locale: string,
): { previous: Post | null; next: Post | null } {
	const blogLocale = toBlogPostLocale(locale);
	const matchingLocalePosts = posts.filter((post) => post.locale === blogLocale);
	const localizedPosts = [
		...(matchingLocalePosts.length > 0
			? matchingLocalePosts
			: posts.filter((post) => post.locale === "en")),
	].sort(compareBlogPosts);
	const currentIndex = localizedPosts.findIndex((post) => post.slug === slug);

	if (currentIndex < 0) {
		return { previous: null, next: null };
	}

	return {
		previous: localizedPosts[currentIndex + 1] ?? null,
		next: localizedPosts[currentIndex - 1] ?? null,
	};
}

export function getBlogPostEntries(posts: readonly BlogPost[]): { slug: string }[] {
	return Array.from(new Set(posts.map((post) => post.slug)))
		.sort()
		.map((slug) => ({ slug }));
}

export function getBlogPostTocShortcut(index: number): string | undefined {
	if (!Number.isInteger(index) || index < 0 || index >= BLOG_POST_TOC_SHORTCUT_LIMIT) {
		return undefined;
	}

	return `${BLOG_POST_TOC_SHORTCUT_PREFIX}${index + 1}`;
}

export function getBlogPostTocShortcutIndex(
	key: string,
	code: string | undefined,
): number | undefined {
	const shortcutNumber = readTocShortcutNumber(key) ?? readTocShortcutCodeNumber(code);

	if (!shortcutNumber || shortcutNumber > BLOG_POST_TOC_SHORTCUT_LIMIT) {
		return undefined;
	}

	return shortcutNumber - 1;
}

export function getBlogPostTagLabels(post: BlogPost): string[] {
	return post.tags.map(getBlogTagLabel);
}

export function getBlogPostBodyBlocks(post: BlogPostDetail): BlogPostBodyBlock[] {
	return post.body
		.replace(/\r\n/g, "\n")
		.split(/\n{2,}/)
		.map(parseBlogPostBodyBlock)
		.filter((block) => block.kind === "image" || block.kind === "table" || block.text.length > 0);
}

export function getBlogPostBodyParagraphs(post: BlogPostDetail): string[] {
	return getBlogPostBodyBlocks(post).flatMap((block) =>
		block.kind === "paragraph" ? [block.text] : [],
	);
}

export function getBlogPostSearchValues(post: BlogPost): string[] {
	return [post.title, post.summary, ...getBlogPostTagLabels(post), ...(post.searchTags ?? [])];
}

export function filterBlogPosts(
	posts: readonly BlogPost[],
	{ query, tag, year }: BlogFilters,
): BlogPost[] {
	const normalizedQuery = normalizeSearchText(query);

	return posts.filter((post) => {
		const postYear = post.publishedAt.slice(0, 4);
		const matchesQuery =
			normalizedQuery.length === 0 ||
			getBlogPostSearchValues(post).some((value) =>
				normalizeSearchText(value).includes(normalizedQuery),
			);
		const matchesTag = tag === "" || post.tags.includes(tag);
		const matchesYear = year.length === 0 || postYear === year;

		return matchesQuery && matchesTag && matchesYear;
	});
}

function parseMarkdownFile(path: string, markdown: string): { frontmatter: unknown; body: string } {
	const match = /^---\s*\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/.exec(markdown);

	if (!match) {
		throw new Error(`Blog post must start with JSON frontmatter: ${path}`);
	}

	try {
		return {
			frontmatter: JSON.parse(match[1]),
			body: match[2].trim(),
		};
	} catch (error) {
		throw new Error(`Blog post frontmatter must be valid JSON: ${path}`, { cause: error });
	}
}

function parseBlogPostBodyBlock(rawBlock: string): BlogPostBodyBlock {
	const normalizedBlock = rawBlock.trim();
	const table = parseBlogPostTableBlock(normalizedBlock);
	const block = normalizedBlock.replace(/\n/g, " ").trim();
	const imageMatch = /^!\[([^\]\n]*)\]\(([^()\s]+)\)$/.exec(block);
	const headingMatch = /^##\s+(.+)$/.exec(block);

	if (table) {
		return table;
	}

	if (imageMatch) {
		return {
			kind: "image",
			alt: imageMatch[1].trim(),
			src: imageMatch[2].trim(),
		};
	}

	if (headingMatch) {
		return {
			kind: "heading",
			level: 2,
			text: headingMatch[1].trim(),
		};
	}

	return {
		kind: "paragraph",
		text: block,
	};
}

function parseBlogPostTableBlock(block: string): BlogPostBodyBlock | undefined {
	const lines = block
		.split("\n")
		.map((line) => line.trim())
		.filter(Boolean);

	if (lines.length < 3 || !lines.every((line) => line.startsWith("|") && line.endsWith("|"))) {
		return undefined;
	}

	const headers = parseBlogPostTableRow(lines[0]);
	const separator = parseBlogPostTableRow(lines[1]);

	if (
		headers.length === 0 ||
		separator.length !== headers.length ||
		!separator.every((cell) => /^:?-{3,}:?$/.test(cell))
	) {
		return undefined;
	}

	const rows = lines.slice(2).map(parseBlogPostTableRow);

	if (!rows.every((row) => row.length === headers.length)) {
		return undefined;
	}

	return {
		kind: "table",
		headers,
		rows,
	};
}

function parseBlogPostTableRow(line: string): string[] {
	return line
		.slice(1, -1)
		.split("|")
		.map((cell) => cell.trim());
}

function toRecord(value: unknown, path: string): Record<string, unknown> {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}

	throw new Error(`Blog post metadata must be an object: ${path}`);
}

function getContentDirectory(path: string): string {
	return path.replace(/\/meta\.json$/, "");
}

function readBlogPostId(metadata: Record<string, unknown>, path: string): string {
	const id = readRequiredString(metadata, "id", path);
	const directoryId = getContentDirectory(path).split("/").at(-1);

	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
		throw new Error(`Blog post id must be a kebab-case slug: ${path}`);
	}

	if (directoryId && directoryId !== id) {
		throw new Error(`Blog post id must match its content directory: ${path}`);
	}

	return id;
}

function readRequiredString(
	metadata: Record<string, unknown>,
	key: "id" | "title" | "summary",
	path: string,
): string {
	const value = metadata[key];

	if (typeof value === "string" && value.trim().length > 0) {
		return value.trim();
	}

	throw new Error(`Blog post ${key} must be a non-empty string: ${path}`);
}

function readPublishedAt(metadata: Record<string, unknown>, path: string): string {
	const value = metadata.publishedAt;

	if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return value;
	}

	throw new Error(`Blog post publishedAt must use YYYY-MM-DD: ${path}`);
}

function readOptionalUpdatedAt(
	metadata: Record<string, unknown>,
	path: string,
): { updatedAt?: string } {
	const value = metadata.updatedAt;

	if (typeof value === "undefined") {
		return {};
	}

	if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
		throw new Error(`Blog post updatedAt must use YYYY-MM-DD: ${path}`);
	}

	const updatedAt = value.trim();
	const publishedAt = readPublishedAt(metadata, path);

	if (updatedAt < publishedAt) {
		throw new Error(`Blog post updatedAt must not be earlier than publishedAt: ${path}`);
	}

	return { updatedAt };
}

function readBlogTags(metadata: Record<string, unknown>, path: string): BlogTagId[] {
	const tags = metadata.tags;

	if (!Array.isArray(tags) || tags.length === 0) {
		throw new Error(`Blog post tags must include at least one fixed tag: ${path}`);
	}

	return tags.map((tag) => {
		if (isBlogTagId(tag)) {
			return tag;
		}

		throw new Error(`Unknown blog tag "${String(tag)}" in ${path}`);
	});
}

function readOptionalHeroImage(
	metadata: Record<string, unknown>,
	path: string,
): BlogPostSharedHeroImage | undefined {
	const value = metadata.heroImage;

	if (typeof value === "undefined") {
		return undefined;
	}

	const heroImage = toRecord(value, `${path}:heroImage`);
	const alt = toRecord(heroImage.alt, `${path}:heroImage.alt`);

	return {
		src: readRequiredHeroImageString(heroImage, "src", path),
		alt: Object.fromEntries(
			blogPostLocales.map((locale) => [locale, readRequiredHeroImageString(alt, locale, path)]),
		) as Record<BlogPostLocale, string>,
	};
}

function localizeHeroImage(
	heroImage: BlogPostSharedHeroImage | undefined,
	locale: BlogPostLocale,
): BlogPostHeroImage | undefined {
	if (!heroImage) {
		return undefined;
	}

	return {
		src: heroImage.src,
		alt: heroImage.alt[locale],
	};
}

function readRequiredHeroImageString(
	metadata: Record<string, unknown>,
	key: "src" | BlogPostLocale,
	path: string,
): string {
	const value = metadata[key];

	if (typeof value === "string" && value.trim().length > 0) {
		return value.trim();
	}

	throw new Error(`Blog post heroImage.${key} must be a non-empty string: ${path}`);
}

function readOptionalStringList(
	metadata: Record<string, unknown>,
	key: "searchTags",
	path: string,
): string[] | undefined {
	const values = metadata[key];

	if (typeof values === "undefined") {
		return undefined;
	}

	if (Array.isArray(values) && values.every((value) => typeof value === "string")) {
		return values.map((value) => value.trim()).filter(Boolean);
	}

	throw new Error(`Blog post ${key} must be a string list: ${path}`);
}

function normalizeSearchText(value: string): string {
	return value.trim().toLocaleLowerCase();
}

function compareBlogPosts(left: BlogPost, right: BlogPost): number {
	const publishedOrder = right.publishedAt.localeCompare(left.publishedAt);

	if (publishedOrder !== 0) {
		return publishedOrder;
	}

	return left.slug.localeCompare(right.slug);
}

function readTocShortcutNumber(value: string): number | undefined {
	return /^[1-9]$/.test(value) ? Number(value) : undefined;
}

function readTocShortcutCodeNumber(value: string | undefined): number | undefined {
	const match = /^(?:Digit|Numpad)([1-9])$/.exec(value ?? "");

	return match ? Number(match[1]) : undefined;
}

function getBlogTagLabel(tagId: BlogTagId): string {
	return blogTagOptions.find((tag) => tag.id === tagId)?.label ?? tagId;
}

function isBlogTagId(value: unknown): value is BlogTagId {
	return typeof value === "string" && blogTagOptions.some((option) => option.id === value);
}

function toBlogPostLocale(locale: string): BlogPostLocale {
	return blogPostLocales.find((blogLocale) => blogLocale === locale) ?? "en";
}

function normalizeTag(value: string | null): BlogTagId | "" {
	const tag = value?.trim() ?? "";

	if (isBlogTagId(tag)) {
		return tag;
	}

	return "";
}

function normalizeYear(value: string | null): string {
	if (!value) {
		return "";
	}

	const year = value.trim();

	return /^\d{4}$/.test(year) ? year : "";
}
