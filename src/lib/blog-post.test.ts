import { describe, expect, it } from "vitest";
import {
	createBlogPostDetailFromContent,
	getAdjacentBlogPosts,
	getBlogPostBodyBlocks,
	getBlogPostBodyParagraphs,
	getBlogPostEntries,
	getBlogPostForLocale,
	getBlogPostTocShortcut,
	getBlogPostTocShortcutIndex,
	type BlogPostDetail,
} from "./blog-post-core";
import {
	blogPostRouteComponentSource,
	blogPostRouteSource,
	sampleOpenSourceNoteKoreanMarkdown,
	sampleOpenSourceNoteMarkdown,
	sampleOpenSourceNoteMetadata,
	sampleOpenSourceNotePath,
	sampleRichPostKoreanMarkdown,
	sampleRichPostMarkdown,
	sampleRichPostMetadata,
	sampleRichPostPath,
} from "./test-support/site-test-sources";

describe("blog post", () => {
	it("creates localized post details from shared metadata and localized markdown", () => {
		const englishPost = createBlogPostDetailFromContent(
			sampleRichPostPath,
			sampleRichPostMetadata,
			"en",
			sampleRichPostMarkdown,
		);
		const koreanPost = createBlogPostDetailFromContent(
			sampleRichPostPath,
			sampleRichPostMetadata,
			"ko",
			sampleRichPostKoreanMarkdown,
		);

		expect(englishPost).toMatchObject({
			slug: "sample-rich-post",
			locale: "en",
			title: "Sample rich post",
			summary: "A short note with headings and media.",
			publishedAt: "2026-04-17",
			tags: ["building-rules", "compliance-cost"],
			heroImage: {
				src: "/images/0disoft-bird.svg",
				alt: "0disoft bird mark",
			},
		});
		expect(koreanPost).toMatchObject({
			slug: "sample-rich-post",
			locale: "ko",
			title: "샘플 상세 글",
			summary: "제목과 이미지가 있는 짧은 테스트 글.",
			heroImage: {
				src: "/images/0disoft-bird.svg",
				alt: "0disoft 새 그림",
			},
		});
	});

	it("returns exact locale posts before falling back to English", () => {
		const englishPost = createSampleOpenSourcePost("en");
		const koreanPost = createSampleOpenSourcePost("ko");

		expect(getBlogPostEntries([englishPost, koreanPost])).toEqual([
			{ slug: "sample-open-source-note" },
		]);
		expect(
			getBlogPostForLocale([englishPost, koreanPost], "sample-open-source-note", "ko")?.title,
		).toBe("샘플 오픈소스 메모");
		expect(getBlogPostForLocale([englishPost], "sample-open-source-note", "ko")?.locale).toBe("en");
		expect(getBlogPostForLocale([englishPost, koreanPost], "missing", "ko")).toBeNull();
	});

	it("orders adjacent posts by date within the selected locale", () => {
		const currentPost = createSampleOpenSourcePost("en");
		const newerPost = {
			...currentPost,
			slug: "newer-post",
			title: "Newer post",
			publishedAt: "2026-06-01",
		} satisfies BlogPostDetail;
		const olderPost = {
			...currentPost,
			slug: "older-post",
			title: "Older post",
			publishedAt: "2026-01-01",
		} satisfies BlogPostDetail;

		expect(
			getAdjacentBlogPosts([newerPost, currentPost, olderPost], currentPost.slug, "en"),
		).toEqual({
			previous: expect.objectContaining({ slug: "older-post" }),
			next: expect.objectContaining({ slug: "newer-post" }),
		});
		expect(getAdjacentBlogPosts([currentPost], currentPost.slug, "en")).toEqual({
			previous: null,
			next: null,
		});
	});

	it("maps table-of-contents shortcut sequences to bounded heading indexes", () => {
		expect(getBlogPostTocShortcut(0)).toBe("T1");
		expect(getBlogPostTocShortcut(8)).toBe("T9");
		expect(getBlogPostTocShortcut(9)).toBeUndefined();
		expect(getBlogPostTocShortcut(-1)).toBeUndefined();
		expect(getBlogPostTocShortcutIndex("1", "Digit1")).toBe(0);
		expect(getBlogPostTocShortcutIndex("Unidentified", "Digit1")).toBe(0);
		expect(getBlogPostTocShortcutIndex("2", "Numpad2")).toBe(1);
		expect(getBlogPostTocShortcutIndex("0", "Digit0")).toBeUndefined();
	});

	it("parses the supported blog body block contract", () => {
		const englishPost = createBlogPostDetailFromContent(
			sampleRichPostPath,
			sampleRichPostMetadata,
			"en",
			sampleRichPostMarkdown,
		);
		const koreanPost = createBlogPostDetailFromContent(
			sampleRichPostPath,
			sampleRichPostMetadata,
			"ko",
			sampleRichPostKoreanMarkdown,
		);

		expect(getBlogPostBodyBlocks(englishPost).slice(0, 5)).toEqual([
			{
				kind: "paragraph",
				text: "The article body should support text, headings, and media without relying on current production posts.",
			},
			{
				kind: "heading",
				level: 2,
				text: "Start with the mark",
			},
			{
				kind: "image",
				alt: "0disoft bird mark",
				src: "/images/0disoft-bird.svg",
			},
			{
				kind: "paragraph",
				text: "This fixture keeps body parsing behavior visible without naming a deleted article.",
			},
			{
				kind: "table",
				headers: ["Team size", "Approval time"],
				rows: [
					["Small", "2 days"],
					["Large", "9 days"],
				],
			},
		]);
		expect(getBlogPostBodyBlocks(koreanPost).slice(0, 5)).toEqual([
			{
				kind: "paragraph",
				text: "본문 파서는 현재 운영 중인 글 이름에 기대지 않고 문단, 제목, 이미지를 처리해야 합니다.",
			},
			{
				kind: "heading",
				level: 2,
				text: "표식에서 출발하기",
			},
			{
				kind: "image",
				alt: "0disoft 새 그림",
				src: "/images/0disoft-bird.svg",
			},
			{
				kind: "paragraph",
				text: "이 fixture는 삭제된 글 이름 없이 본문 파싱 동작을 드러냅니다.",
			},
			{
				kind: "table",
				headers: ["팀 규모", "승인 시간"],
				rows: [
					["소규모", "2일"],
					["대규모", "9일"],
				],
			},
		]);
	});

	it("treats unsupported markdown syntax as paragraph text instead of full markdown", () => {
		const post = createBlogPostDetailFromContent(
			"../content/blog/2026/05/unsupported-markdown/meta.json",
			{
				id: "unsupported-markdown",
				publishedAt: "2026-05-03",
				tags: ["market-entry"],
			},
			"en",
			`---
{"title":"Unsupported markdown fixture","summary":"A parser contract fixture."}
---
### Level-three heading

- first item
- second item

Paragraph with **strong text** left intact.`,
		);

		expect(getBlogPostBodyBlocks(post)).toEqual([
			{
				kind: "paragraph",
				text: "### Level-three heading",
			},
			{
				kind: "paragraph",
				text: "- first item - second item",
			},
			{
				kind: "paragraph",
				text: "Paragraph with **strong text** left intact.",
			},
		]);
	});

	it("keeps paragraph extraction focused on paragraph blocks", () => {
		expect(getBlogPostBodyParagraphs(createSampleOpenSourcePost("en"))).toEqual([
			"Open collaboration starts from a simple question: what should be easy for the next person to reuse?",
			"This note is a parser fixture for reusable work and the amount of friction it leaves behind.",
		]);
	});

	it("fails loudly for malformed shared metadata and frontmatter", () => {
		expect(() =>
			createBlogPostDetailFromContent(
				"../content/blog/2026/05/wrong-directory/meta.json",
				{
					id: "different-slug",
					publishedAt: "2026-05-03",
					tags: ["market-entry"],
				},
				"en",
				sampleOpenSourceNoteMarkdown,
			),
		).toThrow("Blog post id must match its content directory");
		expect(() =>
			createBlogPostDetailFromContent(
				sampleOpenSourceNotePath,
				{
					...sampleOpenSourceNoteMetadata,
					updatedAt: "2026-05-02",
				},
				"en",
				sampleOpenSourceNoteMarkdown,
			),
		).toThrow("Blog post updatedAt must not be earlier than publishedAt");
		expect(() =>
			createBlogPostDetailFromContent(
				sampleOpenSourceNotePath,
				sampleOpenSourceNoteMetadata,
				"en",
				"Body without frontmatter",
			),
		).toThrow("Blog post must start with JSON frontmatter");
	});

	it("keeps the route surface tied to slug entries and the blog shell", () => {
		expect(blogPostRouteSource).toContain("getBlogPostEntries(blogPostDetails)");
		expect(blogPostRouteSource).toContain('export const prerender = "auto"');
		expect(blogPostRouteSource).toContain("error(404");
		expect(blogPostRouteComponentSource).toContain('activePath="/blog"');
		expect(blogPostRouteComponentSource).toContain("<BlogPostSurface");
	});
});

function createSampleOpenSourcePost(locale: "en" | "ko"): BlogPostDetail {
	return createBlogPostDetailFromContent(
		sampleOpenSourceNotePath,
		sampleOpenSourceNoteMetadata,
		locale,
		locale === "en" ? sampleOpenSourceNoteMarkdown : sampleOpenSourceNoteKoreanMarkdown,
	);
}
