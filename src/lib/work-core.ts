import { isSiteLocale, siteLocales, type SiteLocale } from "$lib/site-locales";

export const workLocales = siteLocales;

export const workStatusOptions = ["live", "building", "experimental", "archived"] as const;
export const workKindOptions = ["app", "library", "automation", "oss", "research"] as const;
export const workLinkKeys = ["live", "source", "docs", "post"] as const;
export const WORK_FILTER_QUERY_KEYS = {
	query: "q",
	tag: "tag",
	language: "language",
} as const;

export type WorkLocale = SiteLocale;
export type WorkStatus = (typeof workStatusOptions)[number];
export type WorkKind = (typeof workKindOptions)[number];
export type WorkLinkKey = (typeof workLinkKeys)[number];
export type WorkLinks = Partial<Record<WorkLinkKey, string | null>>;
export type WorkFilters = {
	query: string;
	tag: string;
	language: string;
};

export type WorkEntryMeta = {
	slug: string;
	status: WorkStatus;
	kind: WorkKind;
	license: string;
	updatedAt: string;
	languages: readonly string[];
	tags: readonly string[];
	links: WorkLinks;
	featured: boolean;
};

export type WorkEntryCopy = {
	title: string;
	summary: string;
};

export type WorkEntry = WorkEntryMeta &
	WorkEntryCopy & {
		locale: WorkLocale;
	};

const statusSortOrder = {
	live: 0,
	building: 1,
	experimental: 2,
	archived: 3,
} satisfies Record<WorkStatus, number>;

export function createWorkFromContent(
	path: string,
	metadata: unknown,
	locale: WorkLocale,
	copy: unknown,
): WorkEntry {
	const meta = readWorkMetadata(path, metadata);
	const localizedCopy = readWorkCopy(`${getContentDirectory(path)}/${locale}.json`, copy);

	return {
		...meta,
		locale,
		...localizedCopy,
	};
}

export function sortWorks<Work extends WorkEntry>(works: readonly Work[]): Work[] {
	return [...works].sort(compareWorks);
}

export function getWorksForLocale<Work extends WorkEntry>(
	works: readonly Work[],
	locale: string,
): Work[] {
	const workLocale = isSiteLocale(locale) ? locale : "en";
	const localizedWorks = sortWorks(works.filter((work) => work.locale === workLocale));

	if (localizedWorks.length > 0) {
		return localizedWorks;
	}

	return sortWorks(works.filter((work) => work.locale === "en"));
}

export function createEmptyWorkFilters(): WorkFilters {
	return {
		query: "",
		tag: "",
		language: "",
	};
}

export function parseWorkFilters(searchParams: URLSearchParams): WorkFilters {
	return {
		query: searchParams.get(WORK_FILTER_QUERY_KEYS.query)?.trim() ?? "",
		tag: normalizeWorkTag(searchParams.get(WORK_FILTER_QUERY_KEYS.tag)),
		language: normalizeWorkLanguage(searchParams.get(WORK_FILTER_QUERY_KEYS.language)),
	};
}

export function getWorkFilterOptions(works: readonly WorkEntry[]): {
	tags: string[];
	languages: string[];
} {
	return {
		tags: Array.from(new Set(works.flatMap((work) => work.tags))).sort(),
		languages: Array.from(new Set(works.flatMap((work) => work.languages))).sort((left, right) =>
			left.localeCompare(right, "en"),
		),
	};
}

export function getWorkSearchValues(work: WorkEntry): string[] {
	return [
		work.title,
		work.summary,
		work.status,
		work.kind,
		work.license,
		...work.tags,
		...work.languages,
	].filter((value) => value.length > 0);
}

export function filterWorks<Work extends WorkEntry>(
	works: readonly Work[],
	{ query, tag, language }: WorkFilters,
): Work[] {
	const normalizedQuery = normalizeSearchText(query);

	return works.filter((work) => {
		const matchesQuery =
			normalizedQuery.length === 0 ||
			getWorkSearchValues(work).some((value) =>
				normalizeSearchText(value).includes(normalizedQuery),
			);
		const matchesTag = tag.length === 0 || work.tags.includes(tag);
		const matchesLanguage = language.length === 0 || work.languages.includes(language);

		return matchesQuery && matchesTag && matchesLanguage;
	});
}

function readWorkMetadata(path: string, metadata: unknown): WorkEntryMeta {
	const record = toRecord(metadata, path);

	if ("visibility" in record) {
		throw new Error(`Work metadata must not include visibility: ${path}`);
	}

	const slug = readSlug(record, path);

	return {
		slug,
		status: readEnum(record.status, workStatusOptions, "status", path),
		kind: readEnum(record.kind, workKindOptions, "kind", path),
		license: readLicense(record.license, path),
		updatedAt: readDate(record.updatedAt, "updatedAt", path),
		languages: readLanguages(record.languages, path),
		tags: readTags(record.tags, path),
		links: readLinks(record.links, path),
		featured: record.featured === true,
	};
}

function readWorkCopy(path: string, copy: unknown): WorkEntryCopy {
	const record = toRecord(copy, path);

	return {
		title: readRequiredString(record, "title", path),
		summary: readString(record.summary, "summary", path),
	};
}

function compareWorks(left: WorkEntry, right: WorkEntry): number {
	const featuredOrder = Number(right.featured) - Number(left.featured);

	if (featuredOrder !== 0) {
		return featuredOrder;
	}

	const statusOrder = statusSortOrder[left.status] - statusSortOrder[right.status];

	if (statusOrder !== 0) {
		return statusOrder;
	}

	const updatedOrder = right.updatedAt.localeCompare(left.updatedAt);

	if (updatedOrder !== 0) {
		return updatedOrder;
	}

	return left.title.localeCompare(right.title);
}

function readSlug(record: Record<string, unknown>, path: string): string {
	const slug = readRequiredString(record, "slug", path);
	const directorySlug = getContentDirectory(path).split("/").at(-1);

	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
		throw new Error(`Work slug must be a kebab-case slug: ${path}`);
	}

	if (directorySlug && directorySlug !== slug) {
		throw new Error(`Work slug must match its content directory: ${path}`);
	}

	return slug;
}

function readRequiredString(
	record: Record<string, unknown>,
	key: "slug" | "title",
	path: string,
): string {
	const value = record[key];

	if (typeof value === "string" && value.trim().length > 0) {
		return value.trim();
	}

	throw new Error(`Work ${key} must be a non-empty string: ${path}`);
}

function readString(value: unknown, key: string, path: string): string {
	if (typeof value === "string") {
		return value.trim();
	}

	throw new Error(`Work ${key} must be a string: ${path}`);
}

function readDate(value: unknown, key: string, path: string): string {
	if (typeof value !== "string") {
		throw new Error(`Work ${key} must use YYYY-MM-DD or be blank: ${path}`);
	}

	const normalizedValue = value.trim();

	if (normalizedValue === "" || /^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
		return normalizedValue;
	}

	throw new Error(`Work ${key} must use YYYY-MM-DD or be blank: ${path}`);
}

function readLanguages(value: unknown, path: string): string[] {
	if (!Array.isArray(value) || value.length > 2) {
		throw new Error(`Work languages must include zero to two language names: ${path}`);
	}

	const languages = value.map((language) => {
		if (typeof language !== "string") {
			throw new Error(`Work languages must include zero to two language names: ${path}`);
		}

		const normalizedValue = language.trim();

		if (isLanguageName(normalizedValue)) {
			return normalizedValue;
		}

		throw new Error(`Work languages must be readable language names: ${path}`);
	});

	if (new Set(languages).size !== languages.length) {
		throw new Error(`Work languages must not repeat names: ${path}`);
	}

	return languages;
}

function readTags(value: unknown, path: string): string[] {
	if (!Array.isArray(value) || value.length > 4) {
		throw new Error(`Work tags must include zero to four tags: ${path}`);
	}

	return value.map((tag) => {
		if (typeof tag === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag)) {
			return tag;
		}

		throw new Error(`Work tags must be kebab-case strings: ${path}`);
	});
}

function readLicense(value: unknown, path: string): string {
	if (typeof value !== "string") {
		throw new Error(`Work license must be an SPDX-style identifier or blank: ${path}`);
	}

	const normalizedValue = value.trim();

	if (normalizedValue === "" || /^[A-Za-z0-9][A-Za-z0-9.+-]*$/.test(normalizedValue)) {
		return normalizedValue;
	}

	throw new Error(`Work license must be an SPDX-style identifier or blank: ${path}`);
}

function readLinks(value: unknown, path: string): WorkLinks {
	const record = toRecord(value, `${path}:links`);
	const links: WorkLinks = {};

	for (const key of workLinkKeys) {
		const linkValue = record[key];

		if (typeof linkValue === "undefined") {
			continue;
		}

		if (linkValue === null) {
			links[key] = null;
			continue;
		}

		if (typeof linkValue === "string" && isEvidenceLink(linkValue.trim())) {
			links[key] = linkValue.trim();
			continue;
		}

		throw new Error(`Work links.${key} must be an absolute URL, site path, or null: ${path}`);
	}

	if (Object.keys(links).length === 0) {
		throw new Error(`Work links must include at least one evidence link: ${path}`);
	}

	return links;
}

function readEnum<const Values extends readonly string[]>(
	value: unknown,
	values: Values,
	key: string,
	path: string,
): Values[number] {
	if (typeof value === "string" && values.includes(value)) {
		return value;
	}

	throw new Error(`Work ${key} must be one of ${values.join(", ")}: ${path}`);
}

function toRecord(value: unknown, path: string): Record<string, unknown> {
	if (value && typeof value === "object" && !Array.isArray(value)) {
		return value as Record<string, unknown>;
	}

	throw new Error(`Work content must be an object: ${path}`);
}

function getContentDirectory(path: string): string {
	return path.replace(/\\/g, "/").replace(/\/meta\.json$/, "");
}

function normalizeSearchText(value: string): string {
	return value.trim().toLocaleLowerCase();
}

function normalizeWorkTag(value: string | null): string {
	if (typeof value !== "string") {
		return "";
	}

	const normalizedValue = value.trim();

	return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedValue) ? normalizedValue : "";
}

function normalizeWorkLanguage(value: string | null): string {
	if (typeof value !== "string") {
		return "";
	}

	const normalizedValue = value.trim();

	return isLanguageName(normalizedValue) ? normalizedValue : "";
}

function isLanguageName(value: string): boolean {
	return /^[A-Za-z0-9][A-Za-z0-9 #+./-]*$/.test(value);
}

function isEvidenceLink(value: string): boolean {
	return /^https?:\/\/\S+$/.test(value) || /^\/(?!\/)\S*$/.test(value);
}
