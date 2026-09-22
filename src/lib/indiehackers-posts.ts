export const indiehackersTagOptions = [
	{ id: "launch", label: "Launch" },
	{ id: "pricing", label: "Pricing" },
	{ id: "growth", label: "Growth" },
	{ id: "infrastructure", label: "Infrastructure" },
	{ id: "bootstrapping", label: "Bootstrapping" },
	{ id: "solo-building", label: "Solo Building" },
] as const;

export const indiehackersPostLocales = ["en", "es", "fr", "hi", "ko", "zh"] as const;

export type IndiehackersTagId = (typeof indiehackersTagOptions)[number]["id"];
export type IndiehackersPostLocale = (typeof indiehackersPostLocales)[number];

export type IndiehackersPost = {
	slug: string;
	locale: IndiehackersPostLocale;
	title: string;
	summary: string;
	publishedAt: string;
	updatedAt?: string;
	tags: readonly IndiehackersTagId[];
	searchTags?: readonly string[];
};

export type IndiehackersPostDetail = IndiehackersPost & {
	body: string;
};

export type IndiehackersFilters = {
	query: string;
	tag: IndiehackersTagId | "";
	year: string;
};

type IndiehackersSharedMetadata = {
	id: string;
	publishedAt: string;
	updatedAt?: string;
	tags: IndiehackersTagId[];
};

export const INDIEHACKERS_FILTER_QUERY_KEYS = {
	query: "q",
	tag: "tag",
	year: "year",
} as const;

export function createIndiehackersPostFromContent(
	path: string,
	metadata: unknown,
	locale: IndiehackersPostLocale,
	markdown: string,
): IndiehackersPost {
	const sharedMetadata = readSharedMetadata(path, metadata);
	const localizedContent = parseMarkdownFile(
		`${getContentDirectory(path)}/${locale}.md`,
		markdown,
	);
	const localizedMetadata = toRecord(localizedContent.frontmatter, path);

	return {
		slug: sharedMetadata.id,
		locale,
		title: readRequiredString(localizedMetadata, "title", path),
		summary: readRequiredString(localizedMetadata, "summary", path),
		publishedAt: sharedMetadata.publishedAt,
		...(sharedMetadata.updatedAt ? { updatedAt: sharedMetadata.updatedAt } : {}),
		tags: sharedMetadata.tags,
		searchTags: readOptionalStringList(localizedMetadata, "searchTags", path),
	};
}

export function createIndiehackersPostDetailFromContent(
	path: string,
	metadata: unknown,
	locale: IndiehackersPostLocale,
	markdown: string,
): IndiehackersPostDetail {
	const localizedContent = parseMarkdownFile(
		`${getContentDirectory(path)}/${locale}.md`,
		markdown,
	);

	return {
		...createIndiehackersPostFromContent(path, metadata, locale, markdown),
		body: localizedContent.body,
	};
}

export function readSharedMetadata(
	path: string,
	metadata: unknown,
): IndiehackersSharedMetadata {
	const metadataRecord = toRecord(metadata, path);

	return {
		id: readIndiehackersPostId(metadataRecord, path),
		publishedAt: readPublishedAt(metadataRecord, path),
		...readOptionalUpdatedAt(metadataRecord, path),
		tags: readIndiehackersTags(metadataRecord, path),
	};
}

export function createEmptyIndiehackersFilters(): IndiehackersFilters {
	return {
		query: "",
		tag: "",
		year: "",
	};
}

export function parseIndiehackersFilters(searchParams: URLSearchParams): IndiehackersFilters {
	return {
		query: searchParams.get(INDIEHACKERS_FILTER_QUERY_KEYS.query)?.trim() ?? "",
		tag: normalizeTag(searchParams.get(INDIEHACKERS_FILTER_QUERY_KEYS.tag)),
		year: normalizeYear(searchParams.get(INDIEHACKERS_FILTER_QUERY_KEYS.year)),
	};
}

export function getIndiehackersFilterOptions(posts: readonly IndiehackersPost[]): {
	tags: typeof indiehackersTagOptions;
	years: string[];
} {
	const years = Array.from(new Set(posts.map((post) => post.publishedAt.slice(0, 4)))).sort(
		(left, right) => Number(right) - Number(left),
	);

	return { tags: indiehackersTagOptions, years };
}

export function getIndiehackersPostsForLocale(
	posts: readonly IndiehackersPost[],
	locale: string,
): IndiehackersPost[] {
	const postLocale = toIndiehackersPostLocale(locale);
	const localizedPosts = posts.filter((post) => post.locale === postLocale);

	if (localizedPosts.length > 0) {
		return localizedPosts;
	}

	return posts.filter((post) => post.locale === "en");
}

export function getIndiehackersPostForLocale<Post extends IndiehackersPost>(
	posts: readonly Post[],
	slug: string,
	locale: string,
): Post | null {
	const postLocale = toIndiehackersPostLocale(locale);

	return (
		posts.find((post) => post.slug === slug && post.locale === postLocale) ??
		posts.find((post) => post.slug === slug && post.locale === "en") ??
		null
	);
}

export function getAdjacentIndiehackersPosts<Post extends IndiehackersPost>(
	posts: readonly Post[],
	slug: string,
	locale: string,
): { previous: Post | null; next: Post | null } {
	const postLocale = toIndiehackersPostLocale(locale);
	const matchingLocalePosts = posts.filter((post) => post.locale === postLocale);
	const localizedPosts = [
		...(matchingLocalePosts.length > 0
			? matchingLocalePosts
			: posts.filter((post) => post.locale === "en")),
	].sort(compareIndiehackersPosts);
	const currentIndex = localizedPosts.findIndex((post) => post.slug === slug);

	if (currentIndex < 0) {
		return { previous: null, next: null };
	}

	return {
		previous: localizedPosts[currentIndex + 1] ?? null,
		next: localizedPosts[currentIndex - 1] ?? null,
	};
}

export function getIndiehackersPostEntries(posts: readonly IndiehackersPost[]): {
	slug: string;
}[] {
	return Array.from(new Set(posts.map((post) => post.slug)))
		.sort()
		.map((slug) => ({ slug }));
}

export function getIndiehackersPostTagLabels(post: IndiehackersPost): string[] {
	return post.tags.map(getIndiehackersTagLabel);
}

export function getIndiehackersPostSearchValues(post: IndiehackersPost): string[] {
	return [post.title, post.summary, ...getIndiehackersPostTagLabels(post), ...(post.searchTags ?? [])];
}

export function filterIndiehackersPosts(
	posts: readonly IndiehackersPost[],
	{ query, tag, year }: IndiehackersFilters,
): IndiehackersPost[] {
	const normalizedQuery = normalizeSearchText(query);

	return posts.filter((post) => {
		const postYear = post.publishedAt.slice(0, 4);
		const matchesQuery =
			normalizedQuery.length === 0 ||
			getIndiehackersPostSearchValues(post).some((value) =>
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
		throw new Error(`Indiehackers post must start with JSON frontmatter: ${path}`);
	}

	try {
		return {
			frontmatter: JSON.parse(match[1]),
			body: match[2].trim(),
		};
	} catch (error) {
		throw new Error(`Indiehackers post frontmatter must be valid JSON: ${path}`, { cause: error });
	}
}

function toRecord(value: unknown, path: string): Record<string, unknown> {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}

	throw new Error(`Indiehackers post metadata must be an object: ${path}`);
}

function getContentDirectory(path: string): string {
	return path.replace(/\/meta\.json$/, "");
}

function readIndiehackersPostId(metadata: Record<string, unknown>, path: string): string {
	const id = readRequiredString(metadata, "id", path);
	const directoryId = getContentDirectory(path).split("/").at(-1);

	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
		throw new Error(`Indiehackers post id must be a kebab-case slug: ${path}`);
	}

	if (directoryId && directoryId !== id) {
		throw new Error(`Indiehackers post id must match its content directory: ${path}`);
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

	throw new Error(`Indiehackers post ${key} must be a non-empty string: ${path}`);
}

function readPublishedAt(metadata: Record<string, unknown>, path: string): string {
	const value = metadata.publishedAt;

	if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
		return value;
	}

	throw new Error(`Indiehackers post publishedAt must use YYYY-MM-DD: ${path}`);
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
		throw new Error(`Indiehackers post updatedAt must use YYYY-MM-DD: ${path}`);
	}

	const updatedAt = value.trim();
	const publishedAt = readPublishedAt(metadata, path);

	if (updatedAt < publishedAt) {
		throw new Error(`Indiehackers post updatedAt must not be earlier than publishedAt: ${path}`);
	}

	return { updatedAt };
}

function readIndiehackersTags(
	metadata: Record<string, unknown>,
	path: string,
): IndiehackersTagId[] {
	const tags = metadata.tags;

	if (!Array.isArray(tags) || tags.length === 0) {
		throw new Error(`Indiehackers post tags must include at least one fixed tag: ${path}`);
	}

	return tags.map((tag) => {
		if (isIndiehackersTagId(tag)) {
			return tag;
		}

		throw new Error(`Unknown indiehackers tag "${String(tag)}" in ${path}`);
	});
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

	throw new Error(`Indiehackers post ${key} must be a string list: ${path}`);
}

function normalizeSearchText(value: string): string {
	return value.trim().toLocaleLowerCase();
}

function compareIndiehackersPosts(
	left: IndiehackersPost,
	right: IndiehackersPost,
): number {
	const publishedOrder = right.publishedAt.localeCompare(left.publishedAt);

	if (publishedOrder !== 0) {
		return publishedOrder;
	}

	return left.slug.localeCompare(right.slug);
}

export function getIndiehackersTagLabel(tagId: IndiehackersTagId): string {
	return indiehackersTagOptions.find((tag) => tag.id === tagId)?.label ?? tagId;
}

function isIndiehackersTagId(value: unknown): value is IndiehackersTagId {
	return (
		typeof value === "string" && indiehackersTagOptions.some((option) => option.id === value)
	);
}

function toIndiehackersPostLocale(locale: string): IndiehackersPostLocale {
	return indiehackersPostLocales.find((postLocale) => postLocale === locale) ?? "en";
}

function normalizeTag(value: string | null): IndiehackersTagId | "" {
	const tag = value?.trim() ?? "";

	if (isIndiehackersTagId(tag)) {
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
