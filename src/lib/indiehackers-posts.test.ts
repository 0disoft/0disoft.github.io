import { describe, expect, it } from "vitest";
import {
	createEmptyIndiehackersFilters,
	createIndiehackersPostFromContent,
	filterIndiehackersPosts,
	getIndiehackersFilterOptions,
	getIndiehackersPostEntries,
	getIndiehackersPostForLocale,
	getIndiehackersPostsForLocale,
	indiehackersTagOptions,
	isRecentIndiehackersPost,
	parseIndiehackersFilters,
} from "./indiehackers-posts";

const carrdPath = "../content/indiehackers/posts/carrd/meta.json";
const carrdMetadata = {
	id: "carrd",
	publishedAt: "2026-09-22",
	tags: ["bootstrapping", "pricing", "growth"],
};
const carrdKoreanMarkdown = `---
{"title":"한 페이지 사이트로 연 100만 달러까지","summary":"Carrd가 한 페이지 사이트 하나로 연간 반복매출 100만 달러에 이른 과정을 따라간다."}
---
Carrd는 한 페이지 사이트 하나로 연간 반복매출 100만 달러에 이르렀다.`;
const carrdEnglishMarkdown = `---
{"title":"To $1M a year with one-page sites","summary":"How Carrd reached $1M in annual recurring revenue with a single one-page-site product."}
---
Carrd reached $1M in annual recurring revenue with a single one-page-site product.`;

describe("indiehackers posts", () => {
	it("creates localized post cards from shared metadata and translated markdown", () => {
		expect(
			createIndiehackersPostFromContent(carrdPath, carrdMetadata, "ko", carrdKoreanMarkdown),
		).toMatchObject({
			slug: "carrd",
			locale: "ko",
			title: "한 페이지 사이트로 연 100만 달러까지",
			tags: ["bootstrapping", "pricing", "growth"],
		});
		expect(
			createIndiehackersPostFromContent(carrdPath, carrdMetadata, "en", carrdEnglishMarkdown),
		).toMatchObject({
			slug: "carrd",
			locale: "en",
			title: "To $1M a year with one-page sites",
		});
	});

	it("falls back to English when a locale has no post", () => {
		const posts = [
			createIndiehackersPostFromContent(carrdPath, carrdMetadata, "en", carrdEnglishMarkdown),
		];

		expect(getIndiehackersPostsForLocale(posts, "ko")).toHaveLength(1);
		expect(getIndiehackersPostForLocale(posts, "carrd", "ko")?.locale).toBe("en");
		expect(getIndiehackersPostEntries(posts)).toEqual([{ slug: "carrd" }]);
	});

	it("filters posts by query and any checked tag from URL search params", () => {
		const posts = [
			createIndiehackersPostFromContent(carrdPath, carrdMetadata, "ko", carrdKoreanMarkdown),
			createIndiehackersPostFromContent(carrdPath, carrdMetadata, "en", carrdEnglishMarkdown),
		];

		expect(getIndiehackersFilterOptions().tags).toEqual(indiehackersTagOptions);
		expect(
			filterIndiehackersPosts(posts, { query: "carrd", tags: [], recentOnly: false }),
		).toHaveLength(2);
		expect(
			filterIndiehackersPosts(posts, { query: "", tags: ["pricing"], recentOnly: false }),
		).toHaveLength(2);
		expect(
			filterIndiehackersPosts(posts, {
				query: "",
				tags: ["pricing", "infrastructure"],
				recentOnly: false,
			}),
		).toHaveLength(2);
		expect(
			filterIndiehackersPosts(posts, { query: "", tags: ["infrastructure"], recentOnly: false }),
		).toHaveLength(0);
		expect(
			filterIndiehackersPosts(
				posts,
				parseIndiehackersFilters(new URLSearchParams("q=carrd&tag=pricing&tag=growth")),
			),
		).toHaveLength(2);
		expect(
			filterIndiehackersPosts(posts, {
				...createEmptyIndiehackersFilters(),
				query: "missing",
			}),
		).toHaveLength(0);
	});

	it("includes calendar boundaries throughout the day and excludes future or invalid dates", () => {
		for (const hour of [0, 12, 23]) {
			const now = new Date(2026, 8, 22, hour, 30);
			expect(isRecentIndiehackersPost("2026-09-22", now)).toBe(true);
			expect(isRecentIndiehackersPost("2025-09-22", now)).toBe(true);
			expect(isRecentIndiehackersPost("2025-09-21", now)).toBe(false);
			expect(isRecentIndiehackersPost("2026-09-23", now)).toBe(false);
			expect(isRecentIndiehackersPost("2026-02-30", now)).toBe(false);
		}
		expect(isRecentIndiehackersPost("2023-03-01", new Date(2024, 2, 1, 12))).toBe(true);
		expect(isRecentIndiehackersPost("2023-02-28", new Date(2024, 1, 29, 12))).toBe(true);
		expect(isRecentIndiehackersPost("2023-02-27", new Date(2024, 1, 29, 12))).toBe(false);
		expect(isRecentIndiehackersPost("2026-09-22", new Date(NaN))).toBe(false);
	});

	it("keeps recent posts from the last year by default", () => {
		const now = new Date("2026-09-22T00:00:00Z");

		expect(createEmptyIndiehackersFilters().recentOnly).toBe(true);
		expect(parseIndiehackersFilters(new URLSearchParams("")).recentOnly).toBe(true);
		expect(parseIndiehackersFilters(new URLSearchParams("recent=0")).recentOnly).toBe(false);
		expect(isRecentIndiehackersPost("2026-09-22", now)).toBe(true);
		expect(isRecentIndiehackersPost("2025-09-22", now)).toBe(true);
		expect(isRecentIndiehackersPost("2025-09-21", now)).toBe(false);
		expect(isRecentIndiehackersPost("not-a-date", now)).toBe(false);

		const posts = [
			createIndiehackersPostFromContent(carrdPath, carrdMetadata, "ko", carrdKoreanMarkdown),
			createIndiehackersPostFromContent(
				"../content/indiehackers/posts/old/meta.json",
				{ id: "old", publishedAt: "2020-01-01", tags: ["pricing"] },
				"ko",
				carrdKoreanMarkdown,
			),
		];

		expect(
			filterIndiehackersPosts(posts, { query: "", tags: [], recentOnly: true }, now),
		).toHaveLength(1);
		expect(
			filterIndiehackersPosts(posts, { query: "", tags: [], recentOnly: false }, now),
		).toHaveLength(2);
	});
});
