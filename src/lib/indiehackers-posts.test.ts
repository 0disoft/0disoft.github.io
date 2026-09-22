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

	it("filters posts by query tag and year from URL search params", () => {
		const posts = [
			createIndiehackersPostFromContent(carrdPath, carrdMetadata, "ko", carrdKoreanMarkdown),
			createIndiehackersPostFromContent(carrdPath, carrdMetadata, "en", carrdEnglishMarkdown),
		];

		expect(getIndiehackersFilterOptions(posts).years).toEqual(["2026"]);
		expect(getIndiehackersFilterOptions(posts).tags).toEqual(indiehackersTagOptions);
		expect(
			filterIndiehackersPosts(posts, { query: "carrd", tag: "", year: "" }),
		).toHaveLength(2);
		expect(
			filterIndiehackersPosts(posts, { query: "", tag: "pricing", year: "" }),
		).toHaveLength(2);
		expect(
			filterIndiehackersPosts(posts, { query: "", tag: "infrastructure", year: "" }),
		).toHaveLength(0);
		expect(filterIndiehackersPosts(posts, { query: "", tag: "", year: "2026" })).toHaveLength(2);
		expect(filterIndiehackersPosts(posts, { query: "", tag: "", year: "2025" })).toHaveLength(0);
		expect(
			filterIndiehackersPosts(
				posts,
				parseIndiehackersFilters(new URLSearchParams("q=carrd&tag=pricing&year=2026")),
			),
		).toHaveLength(2);
		expect(
			filterIndiehackersPosts(posts, {
				...createEmptyIndiehackersFilters(),
				query: "missing",
			}),
		).toHaveLength(0);
	});
});
