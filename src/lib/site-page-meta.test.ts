import { describe, expect, it } from "vitest";
import { getSitePageMeta } from "./site-page-meta";

describe("page sharing metadata", () => {
	it("uses the localized article URL and article-specific preview", () => {
		const meta = getSitePageMeta("/ko/indiehackers/example", {
			slug: "example",
			locale: "ko",
			title: "글 제목",
			summary: "글 요약",
			publishedAt: "2026-10-01",
			tags: ["saas"],
			coverImage: "/images/indiehackers/example.webp",
		});
		expect(meta.title).toBe("글 제목 · 0disoft");
		expect(meta.description).toBe("글 요약");
		expect(meta.url).toBe("https://0disoft.github.io/ko/indiehackers/example/");
		expect(meta.type).toBe("article");
		expect(meta.image).toBe("https://0disoft.github.io/images/indiehackers/example.webp");
		expect(getSitePageMeta("/ko/").type).toBe("website");
	});
});
