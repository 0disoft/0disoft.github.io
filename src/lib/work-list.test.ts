import { describe, expect, it } from "vitest";
import {
	createEmptyWorkFilters,
	createWorkFromContent,
	filterWorks,
	getWorkFilterOptions,
	getWorksForLocale,
	parseWorkFilters,
	sortWorks,
	workLocales,
	type WorkEntry,
} from "./work-core";
import { workItems } from "./works";

const sampleMeta = {
	slug: "sample-work",
	status: "building",
	kind: "app",
	license: "MIT-0",
	updatedAt: "2026-05-08",
	languages: ["TypeScript", "JavaScript"],
	tags: ["developer-tools", "automation"],
	links: {
		source: "https://github.com/0disoft/sample-work",
	},
	featured: true,
};

const sampleCopy = {
	title: "샘플 작업",
	summary: "작업 카드 모델을 검증하기 위한 공개 샘플입니다.",
};

describe("work list content", () => {
	it("creates a localized work card from shared metadata and locale copy", () => {
		const work = createWorkFromContent(
			"../content/works/sample-work/meta.json",
			sampleMeta,
			"ko",
			sampleCopy,
		);

		expect(work).toEqual({
			slug: "sample-work",
			locale: "ko",
			status: "building",
			kind: "app",
			license: "MIT-0",
			title: "샘플 작업",
			summary: "작업 카드 모델을 검증하기 위한 공개 샘플입니다.",
			updatedAt: "2026-05-08",
			languages: ["TypeScript", "JavaScript"],
			tags: ["developer-tools", "automation"],
			links: {
				source: "https://github.com/0disoft/sample-work",
			},
			featured: true,
		});
	});

	it("rejects private flags and low-signal cards at the content boundary", () => {
		expect(() =>
			createWorkFromContent(
				"../content/works/private-work/meta.json",
				{
					...sampleMeta,
					slug: "private-work",
					visibility: "private",
				},
				"ko",
				sampleCopy,
			),
		).toThrow("Work metadata must not include visibility");

		expect(() =>
			createWorkFromContent(
				"../content/works/no-link/meta.json",
				{
					...sampleMeta,
					slug: "no-link",
					links: {},
				},
				"ko",
				sampleCopy,
			),
		).toThrow("Work links must include at least one evidence link");

		expect(() =>
			createWorkFromContent(
				"../content/works/too-many-tags/meta.json",
				{
					...sampleMeta,
					slug: "too-many-tags",
					tags: ["a", "b", "c", "d", "e"],
				},
				"ko",
				sampleCopy,
			),
		).toThrow("Work tags must include zero to four tags");
	});

	it("supports intentionally blank planned cards with disabled evidence links", () => {
		const work = createWorkFromContent(
			"../content/works/planned-work/meta.json",
			{
				...sampleMeta,
				slug: "planned-work",
				license: "",
				updatedAt: "",
				languages: [],
				tags: [],
				links: {
					source: null,
					docs: null,
				},
				featured: false,
			},
			"ko",
			{
				title: "planned work",
				summary: "",
			},
		);

		expect(work).toMatchObject({
			slug: "planned-work",
			license: "",
			updatedAt: "",
			languages: [],
			summary: "",
			tags: [],
			links: {
				source: null,
				docs: null,
			},
		});
	});

	it("filters one curated list by query, tag, and repository language", () => {
		const works: WorkEntry[] = [
			createWorkFixture("mustflow", "building", "2026-05-08", true, "mustflow", {
				languages: ["TypeScript", "JavaScript"],
				tags: ["agent-workflow", "developer-tools"],
			}),
			createWorkFixture("quickquack", "building", "", false, "quickquack", {
				languages: [],
				tags: [],
			}),
			createWorkFixture("worker-kit", "live", "2026-01-01", false, "worker kit", {
				languages: ["Go", "TypeScript"],
				tags: ["developer-tools"],
			}),
		];

		expect(createEmptyWorkFilters()).toEqual({ query: "", tag: "", language: "" });
		expect(
			parseWorkFilters(
				new URLSearchParams([
					["q", " agent "],
					["tag", "developer-tools"],
					["language", " TypeScript "],
				]),
			),
		).toEqual({ query: "agent", tag: "developer-tools", language: "TypeScript" });
		expect(getWorkFilterOptions(works)).toEqual({
			tags: ["agent-workflow", "developer-tools"],
			languages: ["Go", "JavaScript", "TypeScript"],
		});
		expect(
			filterWorks(works, {
				query: "agent",
				tag: "developer-tools",
				language: "TypeScript",
			}).map((work) => work.slug),
		).toEqual(["mustflow"]);
	});

	it("sorts one list by featured, status, update date, then title", () => {
		const works: WorkEntry[] = [
			createWorkFixture("old-live", "live", "2026-01-01", false, "Old live"),
			createWorkFixture("new-building", "building", "2026-05-01", false, "New building"),
			createWorkFixture("featured-building", "building", "2026-02-01", true, "Featured"),
			createWorkFixture("new-live", "live", "2026-04-01", false, "New live"),
			createWorkFixture("archived", "archived", "2026-06-01", false, "Archived"),
		];

		expect(sortWorks(works).map((work) => work.slug)).toEqual([
			"featured-building",
			"new-live",
			"old-live",
			"new-building",
			"archived",
		]);
	});

	it("loads only curated work cards from authored work content", () => {
		const workSlugs = Array.from(new Set(workItems.map((work) => work.slug))).sort();
		const koreanWorks = getWorksForLocale(workItems, "ko");
		const koreanMustflow = koreanWorks.find((work) => work.slug === "mustflow");
		const koreanQuickquack = koreanWorks.find((work) => work.slug === "quickquack");
		const koreanTessera = koreanWorks.find((work) => work.slug === "tessera");
		const koreanWorkduck = koreanWorks.find((work) => work.slug === "workduck");

		expect(workLocales).toEqual(["en", "zh", "es", "fr", "hi", "ko"]);
		expect(workItems).toHaveLength(workLocales.length * 4);
		expect(workSlugs).toEqual(["mustflow", "quickquack", "tessera", "workduck"]);
		expect(koreanMustflow).toMatchObject({
			slug: "mustflow",
			locale: "ko",
			status: "building",
			kind: "automation",
			license: "MIT-0",
			languages: ["TypeScript", "JavaScript"],
			title: "mustflow",
			summary:
				"LLM 코딩 에이전트가 저장소에 정의된 작업 규칙, 명령 규약, 검증 절차를 미리 파악하고 지키도록 유도하는 워크플로우 CLI 도구입니다.",
			tags: ["agent-workflow", "developer-tools"],
			links: {
				source: "https://github.com/0disoft/mustflow",
				docs: "https://mustflow.github.io",
			},
			featured: true,
		});
		expect(koreanQuickquack).toMatchObject({
			slug: "quickquack",
			locale: "ko",
			status: "building",
			license: "",
			languages: [],
			title: "quickquack",
			summary: "",
			updatedAt: "",
			tags: [],
			links: {
				source: null,
				docs: null,
			},
		});
		expect(koreanTessera).toMatchObject({
			slug: "tessera",
			locale: "ko",
			status: "building",
			license: "",
			languages: [],
			title: "tessera",
			summary: "",
			updatedAt: "",
			tags: [],
			links: {
				source: null,
				docs: null,
			},
		});
		expect(koreanWorkduck).toMatchObject({
			slug: "workduck",
			locale: "ko",
			status: "building",
			license: "",
			languages: [],
			title: "workduck",
			summary: "",
			updatedAt: "",
			tags: [],
			links: {
				source: null,
				docs: null,
			},
		});
		expect(workSlugs).not.toContain("0disoft-github-io");
		expect(workSlugs).not.toContain("oklch-shade");
		expect(workSlugs).not.toContain("markdown-bold-lint");
		expect(workSlugs).not.toContain("ai-tags");
		expect(workSlugs).not.toContain("typelock-timer");
		expect(workSlugs).not.toContain("split-or-die");
		expect(workSlugs).not.toContain("test");
		expect(workSlugs).not.toContain(".github");
		expect(workSlugs).not.toContain("0disoft");
		expect(workSlugs).not.toContain("opencode");
	});

	it("returns one localized list and falls back to English for unsupported locale values", () => {
		const koreanWorks = getWorksForLocale(workItems, "ko");
		const fallbackWorks = getWorksForLocale(workItems, "missing");

		expect(koreanWorks.map((work) => work.locale)).toEqual(["ko", "ko", "ko", "ko"]);
		expect(fallbackWorks.map((work) => work.locale)).toEqual(["en", "en", "en", "en"]);
		expect(koreanWorks.map((work) => work.slug)).toEqual([
			"mustflow",
			"quickquack",
			"tessera",
			"workduck",
		]);
		expect(fallbackWorks.map((work) => work.slug)).toEqual([
			"mustflow",
			"quickquack",
			"tessera",
			"workduck",
		]);
	});
});

function createWorkFixture(
	slug: string,
	status: WorkEntry["status"],
	updatedAt: string,
	featured: boolean,
	title: string,
	options: {
		languages?: string[];
		tags?: string[];
	} = {},
): WorkEntry {
	return {
		slug,
		locale: "en",
		status,
		kind: "app",
		license: "MIT-0",
		languages: options.languages ?? ["TypeScript", "JavaScript"],
		title,
		summary: `${title} summary`,
		updatedAt,
		tags: options.tags ?? ["developer-tools", "automation"],
		links: {
			source: `https://github.com/0disoft/${slug}`,
		},
		featured,
	};
}
