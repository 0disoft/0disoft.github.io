export const indiehackersTagGroups = [
	{ id: "product", label: "Product" },
	{ id: "platform", label: "Platform" },
	{ id: "audience", label: "Audience" },
	{ id: "revenue", label: "Revenue" },
	{ id: "operation", label: "Operation" },
	{ id: "topic", label: "Topic" },
] as const;

export type IndiehackersTagGroupId = (typeof indiehackersTagGroups)[number]["id"];

export const indiehackersTagOptions = [
	{ id: "saas", label: "SaaS", group: "product" },
	{ id: "developer-tools", label: "Developer Tools", group: "product" },
	{ id: "productivity", label: "Productivity", group: "product" },
	{ id: "design-tools", label: "Design Tools", group: "product" },
	{ id: "content-service", label: "Content Service", group: "product" },
	{ id: "ecommerce", label: "E-commerce", group: "product" },
	{ id: "marketplace", label: "Marketplace", group: "product" },
	{ id: "community", label: "Community", group: "product" },
	{ id: "game", label: "Game", group: "product" },
	{ id: "web", label: "Web", group: "platform" },
	{ id: "mobile-app", label: "Mobile App", group: "platform" },
	{ id: "desktop-app", label: "Desktop App", group: "platform" },
	{ id: "browser-extension", label: "Browser Extension", group: "platform" },
	{ id: "api", label: "API", group: "platform" },
	{ id: "cli", label: "CLI", group: "platform" },
	{ id: "b2b", label: "B2B", group: "audience" },
	{ id: "b2c", label: "B2C", group: "audience" },
	{ id: "developers", label: "Developers", group: "audience" },
	{ id: "subscription", label: "Subscription", group: "revenue" },
	{ id: "one-time-purchase", label: "One-time Purchase", group: "revenue" },
	{ id: "usage-based", label: "Usage-based", group: "revenue" },
	{ id: "advertising", label: "Advertising", group: "revenue" },
	{ id: "commission", label: "Commission", group: "revenue" },
	{ id: "donations", label: "Donations", group: "revenue" },
	{ id: "licensing", label: "Licensing", group: "revenue" },
	{ id: "solo-building", label: "Solo Building", group: "operation" },
	{ id: "small-team", label: "Small Team", group: "operation" },
	{ id: "bootstrapping", label: "Bootstrapping", group: "operation" },
	{ id: "funded", label: "Funded", group: "operation" },
	{ id: "open-source", label: "Open Source", group: "operation" },
	{ id: "validation", label: "Idea Validation", group: "topic" },
	{ id: "mvp", label: "MVP", group: "topic" },
	{ id: "launch", label: "Launch", group: "topic" },
	{ id: "pricing", label: "Pricing", group: "topic" },
	{ id: "acquisition", label: "Customer Acquisition", group: "topic" },
	{ id: "growth", label: "Growth", group: "topic" },
	{ id: "retention", label: "Retention", group: "topic" },
	{ id: "infrastructure", label: "Infrastructure", group: "topic" },
	{ id: "exit", label: "Exit", group: "topic" },
] as const satisfies readonly { id: string; label: string; group: IndiehackersTagGroupId }[];

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
	productName?: string;
	coverImage?: string;
};

export type IndiehackersPostDetail = IndiehackersPost & {
	body: string;
};

export type IndiehackersFilters = {
	query: string;
	tags: readonly IndiehackersTagId[];
	recentOnly: boolean;
};

type IndiehackersSharedMetadata = {
	id: string;
	productName?: string;
	coverImage?: string;
	publishedAt: string;
	updatedAt?: string;
	tags: IndiehackersTagId[];
};

export const INDIEHACKERS_FILTER_QUERY_KEYS = {
	query: "q",
	tag: "tag",
	recent: "recent",
} as const;

export function createIndiehackersPostFromContent(
	path: string,
	metadata: unknown,
	locale: IndiehackersPostLocale,
	markdown: string,
): IndiehackersPost {
	const sharedMetadata = readSharedMetadata(path, metadata);
	const localizedContent = parseMarkdownFile(`${getContentDirectory(path)}/${locale}.md`, markdown);
	const localizedMetadata = toRecord(localizedContent.frontmatter, path);

	return {
		slug: sharedMetadata.id,
		...(sharedMetadata.productName ? { productName: sharedMetadata.productName } : {}),
		...(sharedMetadata.coverImage ? { coverImage: sharedMetadata.coverImage } : {}),
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
	const localizedContent = parseMarkdownFile(`${getContentDirectory(path)}/${locale}.md`, markdown);

	return {
		...createIndiehackersPostFromContent(path, metadata, locale, markdown),
		body: localizedContent.body,
	};
}

export function readSharedMetadata(path: string, metadata: unknown): IndiehackersSharedMetadata {
	const metadataRecord = toRecord(metadata, path);

	return {
		id: readIndiehackersPostId(metadataRecord, path),
		...readPresentationMetadata(metadataRecord, path),
		publishedAt: readPublishedAt(metadataRecord, path),
		...readOptionalUpdatedAt(metadataRecord, path),
		tags: readIndiehackersTags(metadataRecord, path),
	};
}

function readPresentationMetadata(
	metadata: Record<string, unknown>,
	path: string,
): { productName?: string; coverImage?: string } {
	const result: { productName?: string; coverImage?: string } = {};
	if (metadata.productName !== undefined) {
		if (typeof metadata.productName !== "string" || !metadata.productName.trim()) {
			throw new Error(`Indiehackers post productName must be a non-empty string: ${path}`);
		}
		result.productName = metadata.productName.trim();
	}
	if (metadata.coverImage !== undefined) {
		if (
			typeof metadata.coverImage !== "string" ||
			!/^\/images\/indiehackers\/[a-z0-9-]+\.(?:webp|png|jpg)$/.test(metadata.coverImage)
		) {
			throw new Error(`Indiehackers post coverImage must be a local editorial image: ${path}`);
		}
		result.coverImage = metadata.coverImage;
	}
	return result;
}

export function createEmptyIndiehackersFilters(): IndiehackersFilters {
	return {
		query: "",
		tags: [],
		recentOnly: true,
	};
}

export function parseIndiehackersFilters(searchParams: URLSearchParams): IndiehackersFilters {
	return {
		query: searchParams.get(INDIEHACKERS_FILTER_QUERY_KEYS.query)?.trim() ?? "",
		tags: normalizeTags(searchParams.getAll(INDIEHACKERS_FILTER_QUERY_KEYS.tag)),
		recentOnly: parseRecentOnly(searchParams.get(INDIEHACKERS_FILTER_QUERY_KEYS.recent)),
	};
}

export function getIndiehackersFilterOptions(posts: readonly IndiehackersPost[]) {
	const tags = indiehackersTagOptions.flatMap((tag) => {
		const count = new Set(
			posts.filter((post) => post.tags.includes(tag.id)).map((post) => post.slug),
		).size;
		return count > 0 ? [{ ...tag, count }] : [];
	});
	return {
		tags,
		groups: indiehackersTagGroups.flatMap((group) => {
			const groupTags = tags.filter((tag) => tag.group === group.id);
			return groupTags.length > 0 ? [{ ...group, tags: groupTags }] : [];
		}),
	};
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
	return [
		post.title,
		post.summary,
		...getIndiehackersPostTagLabels(post),
		...(post.searchTags ?? []),
	];
}

export function filterIndiehackersPosts(
	posts: readonly IndiehackersPost[],
	{ query, tags, recentOnly }: IndiehackersFilters,
	now: Date = new Date(),
): IndiehackersPost[] {
	const normalizedQuery = normalizeSearchText(query);
	const selectedGroups = indiehackersTagGroups
		.map((group) =>
			indiehackersTagOptions.filter((tag) => tag.group === group.id && tags.includes(tag.id)),
		)
		.filter((group) => group.length > 0);

	return posts.filter((post) => {
		const matchesQuery =
			normalizedQuery.length === 0 ||
			getIndiehackersPostSearchValues(post).some((value) =>
				normalizeSearchText(value).includes(normalizedQuery),
			);
		const matchesTags = selectedGroups.every((group) =>
			group.some((tag) => post.tags.includes(tag.id)),
		);
		const matchesRecent = !recentOnly || isRecentIndiehackersPost(post.publishedAt, now);

		return matchesQuery && matchesTags && matchesRecent;
	});
}

export function isRecentIndiehackersPost(publishedAt: string, now: Date = new Date()): boolean {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedAt) || Number.isNaN(now.getTime())) {
		return false;
	}
	const [year, month, day] = publishedAt.split("-").map(Number);
	const published = new Date(year, month - 1, day);
	if (
		published.getFullYear() !== year ||
		published.getMonth() !== month - 1 ||
		published.getDate() !== day
	) {
		return false;
	}
	// Publication metadata is a calendar date, not a UTC midnight timestamp.
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const cutoff = new Date(today);
	cutoff.setFullYear(today.getFullYear() - 1);
	if (cutoff.getMonth() !== today.getMonth()) {
		cutoff.setDate(0);
	}
	return published >= cutoff && published <= today;
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

function compareIndiehackersPosts(left: IndiehackersPost, right: IndiehackersPost): number {
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
	return typeof value === "string" && indiehackersTagOptions.some((option) => option.id === value);
}

function toIndiehackersPostLocale(locale: string): IndiehackersPostLocale {
	return indiehackersPostLocales.find((postLocale) => postLocale === locale) ?? "en";
}

function normalizeTags(values: readonly string[]): IndiehackersTagId[] {
	const tags = values.map((value) => value.trim()).filter(isIndiehackersTagId);

	return Array.from(new Set(tags));
}

function parseRecentOnly(value: string | null): boolean {
	if (value === null) {
		return true;
	}

	const normalized = value.trim().toLocaleLowerCase();

	return (
		normalized !== "0" && normalized !== "false" && normalized !== "off" && normalized !== "no"
	);
}
