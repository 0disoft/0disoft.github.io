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
			createWorkFixture("signal-card", "building", "2026-05-08", true, "signal card", {
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
		).toEqual(["signal-card"]);
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
		const koreanBuildmarks = koreanWorks.find((work) => work.slug === "buildmarks");
		const koreanClarissimi = koreanWorks.find((work) => work.slug === "clarissimi");
		const koreanDcCodePaste = koreanWorks.find((work) => work.slug === "dc-code-paste");
		const koreanLaqu = koreanWorks.find((work) => work.slug === "laqu");
		const koreanMustflow = koreanWorks.find((work) => work.slug === "mustflow");
		const koreanOhrisk = koreanWorks.find((work) => work.slug === "ohrisk");
		const koreanSsealed = koreanWorks.find((work) => work.slug === "ssealed");

		expect(workLocales).toEqual(["en", "zh", "es", "fr", "hi", "ko"]);
		expect(workItems).toHaveLength(workLocales.length * 7);
		expect(workSlugs).toEqual([
			"buildmarks",
			"clarissimi",
			"dc-code-paste",
			"laqu",
			"mustflow",
			"ohrisk",
			"ssealed",
		]);
		expect(koreanBuildmarks).toMatchObject({
			slug: "buildmarks",
			locale: "ko",
			status: "live",
			kind: "oss",
			license: "0BSD",
			languages: ["TypeScript"],
			title: "buildmarks",
			summary:
				"공개 GitHub 활동을 프로필 README용 엔지니어링 시그널 카드와 확인 가능한 리포트로 바꾸는 GitHub Action 및 TypeScript 코어.",
			updatedAt: "2026-07-07",
			tags: ["github", "profile-readme", "github-action", "developer-tools"],
			links: {
				source: "https://github.com/0disoft/buildmarks",
				docs: "https://github.com/0disoft/buildmarks#readme",
			},
			featured: false,
		});
		expect(koreanClarissimi).toMatchObject({
			slug: "clarissimi",
			locale: "ko",
			status: "experimental",
			kind: "oss",
			license: "Apache-2.0",
			languages: ["TypeScript"],
			title: "Clarissimi",
			summary:
				"의미 있는 오픈소스 merged PR을 maintainer가 승인한 프로젝트 히스토리로 남기도록 돕는 실험적 GitHub Action 및 TypeScript CLI.",
			updatedAt: "2026-07-09",
			tags: ["github-action", "recognition", "open-source", "automation"],
			links: {
				source: "https://github.com/0disoft/clarissimi",
				docs: "https://github.com/0disoft/clarissimi#readme",
			},
			featured: false,
		});
		expect(koreanDcCodePaste).toMatchObject({
			slug: "dc-code-paste",
			locale: "ko",
			status: "live",
			kind: "app",
			license: "",
			languages: ["TypeScript", "Svelte"],
			title: "dc-code-paste",
			summary:
				"Markdown, 코드블록, 콜아웃, AI 초안을 DCInside 글쓰기 화면에 붙여넣을 리치 텍스트 HTML로 바꾸는 정적 웹 편집기.",
			updatedAt: "2026-07-09",
			tags: ["dcinside", "editor", "markdown", "ai-writing"],
			links: {
				live: "https://0disoft.github.io/dc-code-paste/",
				source: "https://github.com/0disoft/dc-code-paste",
			},
			featured: false,
		});
		expect(koreanLaqu).toMatchObject({
			slug: "laqu",
			locale: "ko",
			status: "live",
			kind: "library",
			license: "MIT",
			languages: ["TypeScript"],
			title: "laqu",
			summary:
				"Node.js CLI에서 안정적인 터미널 진행률, 라이브 렌더링, 기계 판독 가능한 진행 이벤트를 다루는 엄격한 TypeScript 런타임.",
			updatedAt: "2026-07-09",
			tags: ["terminal", "progress-bar", "cli", "library"],
			links: {
				source: "https://github.com/0disoft/laqu",
				docs: "https://github.com/0disoft/laqu#readme",
			},
			featured: false,
		});
		expect(koreanMustflow).toMatchObject({
			slug: "mustflow",
			locale: "ko",
			status: "live",
			kind: "oss",
			license: "MIT-0",
			languages: ["TypeScript"],
			title: "mustflow",
			summary:
				"LLM 코딩 에이전트가 명시된 읽기, 명령, 검증 경계 안에서 작업하도록 묶어주는 저장소 로컬 작업 계약 및 검증 CLI.",
			updatedAt: "2026-07-09",
			tags: ["agent-workflow", "cli", "developer-tools", "automation"],
			links: {
				source: "https://github.com/0disoft/mustflow",
				docs: "https://0disoft.github.io/mustflow/",
			},
			featured: false,
		});
		expect(koreanOhrisk).toMatchObject({
			slug: "ohrisk",
			locale: "ko",
			status: "live",
			kind: "oss",
			license: "MIT",
			languages: ["TypeScript"],
			title: "Ohrisk",
			summary:
				"PR이나 릴리스 전에 의존성과 SBOM 입력을 스캔해 오픈소스 라이선스 리스크를 빠르게 드러내는 로컬 CLI.",
			updatedAt: "2026-07-09",
			tags: ["license", "compliance", "supply-chain", "cli"],
			links: {
				source: "https://github.com/0disoft/ohrisk",
				docs: "https://github.com/0disoft/ohrisk#readme",
			},
			featured: false,
		});
		expect(koreanSsealed).toMatchObject({
			slug: "ssealed",
			locale: "ko",
			status: "live",
			kind: "oss",
			license: "MIT",
			languages: ["TypeScript"],
			title: "ssealed",
			summary:
				"문서, 에이전트 지침, 계약, 검증, 저장소 위생 파일을 위한 LLM 친화적 저장소 scaffold를 만드는 TypeScript CLI.",
			updatedAt: "2026-07-09",
			tags: ["scaffold", "agent-workflow", "developer-tools", "cli"],
			links: {
				source: "https://github.com/0disoft/ssealed",
				docs: "https://github.com/0disoft/ssealed#readme",
			},
			featured: false,
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

		expect(koreanWorks.map((work) => work.locale)).toEqual([
			"ko",
			"ko",
			"ko",
			"ko",
			"ko",
			"ko",
			"ko",
		]);
		expect(fallbackWorks.map((work) => work.locale)).toEqual([
			"en",
			"en",
			"en",
			"en",
			"en",
			"en",
			"en",
		]);
		expect(koreanWorks.map((work) => work.slug)).toEqual([
			"dc-code-paste",
			"laqu",
			"mustflow",
			"ohrisk",
			"ssealed",
			"buildmarks",
			"clarissimi",
		]);
		expect(fallbackWorks.map((work) => work.slug)).toEqual([
			"dc-code-paste",
			"laqu",
			"mustflow",
			"ohrisk",
			"ssealed",
			"buildmarks",
			"clarissimi",
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
