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
} from "./blog-post-core";
import {
	blogPostCoreSource,
	blogPostRouteComponentSource,
	blogPostRouteSource,
	blogPostSurfaceSource,
	brandIconSource,
	packageSource,
	sampleWatercolorKoreanMarkdown,
	sampleWatercolorMarkdown,
	sampleWatercolorMetadata,
	sampleWatercolorPath,
	sampleZeroLicenseKoreanMarkdown,
	sampleZeroLicenseMarkdown,
	sampleZeroLicenseMetadata,
	sampleZeroLicensePath,
	surfaceSource,
} from "./test-support/site-test-sources";

describe("blog post", () => {
	it("renders blog posts as routed detail pages", () => {
		const englishPost = createBlogPostDetailFromContent(
			sampleZeroLicensePath,
			sampleZeroLicenseMetadata,
			"en",
			sampleZeroLicenseMarkdown,
		);
		const koreanPost = createBlogPostDetailFromContent(
			sampleZeroLicensePath,
			sampleZeroLicenseMetadata,
			"ko",
			sampleZeroLicenseKoreanMarkdown,
		);

		expect(blogPostRouteSource).toContain("blogPostDetails");
		expect(blogPostRouteSource).toContain("getBlogPostEntries");
		expect(blogPostRouteSource).toContain('export const prerender = "auto"');
		expect(blogPostRouteSource).toContain("error(404");
		expect(blogPostRouteComponentSource).toContain('activePath="/blog"');
		expect(blogPostRouteComponentSource).toContain("<BlogPostSurface");
		expect(blogPostSurfaceSource).toContain("getBlogPostForLocale");
		expect(blogPostSurfaceSource).toContain("getBlogPostBodyBlocks");
		expect(blogPostSurfaceSource).toContain("import { buildBlogShareLinks");
		expect(blogPostSurfaceSource).toContain("shareUrl");
		expect(blogPostSurfaceSource).toContain("m.blog_post_share_label");
		expect(blogPostSurfaceSource).toContain("copyShareUrl");
		expect(blogPostSurfaceSource).toContain("shareWithDevice");
		expect(blogPostSurfaceSource).toContain("copyTextToClipboard");
		expect(blogPostSurfaceSource).toContain("navigator.share");
		expect(blogPostSurfaceSource).toContain("navigator.clipboard.writeText");
		expect(blogPostSurfaceSource).toContain("m.blog_post_copy_link");
		expect(blogPostSurfaceSource).toContain("m.blog_post_share_device");
		expect(blogPostSurfaceSource).toContain('aria-live="polite"');
		expect(packageSource).toContain('"simple-icons"');
		expect(brandIconSource).toContain('import type { SimpleIcon } from "simple-icons"');
		expect(brandIconSource).toContain('viewBox="0 0 24 24"');
		expect(brandIconSource).toContain("d={icon.path}");
		expect(brandIconSource).toContain("fill: currentColor");
		expect(blogPostSurfaceSource).toContain('import BrandIcon from "$lib/ui/brand-icon.svelte"');
		expect(blogPostSurfaceSource).toContain('import { pushState } from "$app/navigation"');
		expect(blogPostSurfaceSource).toContain('import { page } from "$app/state"');
		expect(blogPostSurfaceSource).toContain("siReddit");
		expect(blogPostSurfaceSource).toContain("siWhatsapp");
		expect(blogPostSurfaceSource).toContain("siX");
		expect(blogPostSurfaceSource).toContain("getSharePlatformIcon");
		expect(blogPostSurfaceSource).toContain('class="post-share-grid"');
		expect(blogPostSurfaceSource).toContain('class="post-share-icon-button"');
		expect(blogPostSurfaceSource).toContain("--post-share-icon-size");
		expect(blogPostSurfaceSource).toContain(
			"grid-template-columns: repeat(4, var(--post-share-icon-size))",
		);
		expect(blogPostSurfaceSource).not.toContain(".post-share-grid {\n\t\tdisplay: flex");
		expect(blogPostSurfaceSource).toContain("data-tooltip=");
		expect(blogPostSurfaceSource).toContain("aria-label=");
		expect(blogPostSurfaceSource).not.toContain('title={copyState === "copied"');
		expect(blogPostSurfaceSource).not.toContain("title={m.blog_post_share_device");
		expect(blogPostSurfaceSource).not.toContain("title={platformLabel}");
		expect(blogPostSurfaceSource).toContain("--post-tooltip-background");
		expect(blogPostSurfaceSource).toContain("--post-tooltip-foreground");
		expect(blogPostSurfaceSource).toContain("--post-tooltip-background: oklch(0.16 0.04 132)");
		expect(blogPostSurfaceSource).toContain("--post-tooltip-foreground: oklch(0.98 0.026 92)");
		expect(blogPostSurfaceSource).not.toContain(
			"--post-tooltip-background: color-mix(in oklch, var(--foreground)",
		);
		expect(blogPostSurfaceSource).toContain("background: var(--post-tooltip-background)");
		expect(blogPostSurfaceSource).toContain("color: var(--post-tooltip-foreground)");
		expect(blogPostSurfaceSource).toContain("font-weight: 520");
		expect(blogPostSurfaceSource).not.toContain("font-weight: 800;\n\t\tline-height: 1.2");
		expect(blogPostSurfaceSource).toContain("<Copy");
		expect(blogPostSurfaceSource).toContain("<Share2");
		expect(blogPostSurfaceSource).toContain("<Send");
		expect(blogPostSurfaceSource).toContain("<MessageCircle");
		expect(blogPostSurfaceSource).toContain("<BrandIcon");
		expect(blogPostSurfaceSource).not.toContain("<Phone");
		expect(blogPostSurfaceSource).not.toContain("<MessageSquare");
		expect(blogPostSurfaceSource).not.toContain('class="post-share-x-mark"');
		expect(blogPostSurfaceSource).not.toContain("<AtSign");
		expect(blogPostSurfaceSource).not.toContain('"phone"');
		expect(blogPostSurfaceSource).not.toContain('"message-square"');
		expect(blogPostSurfaceSource).not.toContain('"x-mark"');
		expect(blogPostSurfaceSource).not.toContain('"at-sign"');
		expect(blogPostSurfaceSource).not.toContain('class="post-share-button"');
		expect(blogPostSurfaceSource).not.toContain('class="post-share-button-icon"');
		expect(blogPostSurfaceSource).toContain('class="post-share"');
		expect(blogPostSurfaceSource).toContain('target="_blank"');
		expect(blogPostSurfaceSource).toContain('rel="noopener noreferrer"');
		expect(blogPostSurfaceSource).not.toContain("getBlogPostBodyParagraphs");
		expect(blogPostSurfaceSource).toContain("blogPostDetails");
		expect(blogPostSurfaceSource).toContain("m.blog_back_to_list");
		expect(blogPostSurfaceSource).toContain("ArrowLeft");
		expect(blogPostSurfaceSource).toContain("<ArrowLeft");
		expect(blogPostSurfaceSource).toContain('class="back-link-label"');
		expect(blogPostSurfaceSource).toContain("display: inline-flex");
		expect(blogPostSurfaceSource).toContain("m.blog_post_toc_label");
		expect(blogPostSurfaceSource).toContain("BLOG_POST_TOC_SHORTCUT_PREFIX");
		expect(blogPostSurfaceSource).toContain("BLOG_POST_TOC_SHORTCUT_LIMIT");
		expect(blogPostSurfaceSource).toContain("getBlogPostTocShortcut");
		expect(blogPostSurfaceSource).toContain("withShortcut(heading.text, heading.shortcut)");
		expect(blogPostSurfaceSource).toContain("title={getPostHeadingTitle(heading)}");
		expect(blogPostSurfaceSource).toContain("data-shortcut-sequence={heading.shortcut}");
		expect(blogPostSurfaceSource).not.toContain("aria-keyshortcuts={heading.shortcut}");
		expect(blogPostSurfaceSource).not.toContain("Alt+1");
		expect(blogPostSurfaceSource).toContain("handleTocShortcut");
		expect(blogPostSurfaceSource).toContain(
			'window.addEventListener("keydown", handleTocShortcut)',
		);
		expect(blogPostSurfaceSource).toContain("tocShortcutPending");
		expect(blogPostSurfaceSource).toContain("startTocShortcutSequence");
		expect(blogPostSurfaceSource).toContain("clearTocShortcutSequence");
		expect(blogPostSurfaceSource).toContain(
			"event.key.toLocaleLowerCase() === BLOG_POST_TOC_SHORTCUT_PREFIX.toLocaleLowerCase()",
		);
		expect(blogPostSurfaceSource).toContain("getBlogPostTocShortcutIndex(event.key, event.code)");
		expect(blogPostSurfaceSource).not.toContain("/^[1-9]$/.test(event.key)");
		expect(blogPostSurfaceSource).not.toContain("/^[0-9]$/.test(event.key)");
		expect(blogPostSurfaceSource).toContain("target.focus({ preventScroll: true })");
		expect(blogPostSurfaceSource).toContain("pushState(nextUrl, page.state)");
		expect(blogPostSurfaceSource).not.toContain("window.history.pushState");
		expect(blogPostSurfaceSource).toContain("m.blog_post_adjacent_label");
		expect(blogPostSurfaceSource).toContain("m.blog_post_previous_label");
		expect(blogPostSurfaceSource).toContain("m.blog_post_next_label");
		expect(blogPostSurfaceSource).toContain(
			'withShortcut(m.blog_post_previous_label({}, { locale: displayLocale }), "Alt+P")',
		);
		expect(blogPostSurfaceSource).toContain(
			'withShortcut(m.blog_post_next_label({}, { locale: displayLocale }), "Alt+N")',
		);
		expect(blogPostSurfaceSource).toContain("handleAdjacentPostShortcut");
		expect(blogPostSurfaceSource).toContain(
			'window.addEventListener("keydown", handleAdjacentPostShortcut)',
		);
		expect(blogPostSurfaceSource).toContain("handleBlogPostControlKeydown");
		expect(blogPostSurfaceSource).toContain(
			'window.addEventListener("keydown", handleBlogPostControlKeydown)',
		);
		expect(blogPostSurfaceSource).toContain("getBlogPostFocusTargets");
		expect(blogPostSurfaceSource).toContain("focusAdjacentBlogPostControl(1");
		expect(blogPostSurfaceSource).toContain("focusAdjacentBlogPostControl(-1");
		expect(blogPostSurfaceSource).toContain("focusBoundaryBlogPostControl");
		expect(blogPostSurfaceSource).toContain("data-blog-post-keyboard-target");
		expect(blogPostSurfaceSource).toContain('key === "arrowright" || key === "arrowdown"');
		expect(blogPostSurfaceSource).toContain('key === "arrowleft" || key === "arrowup"');
		expect(blogPostSurfaceSource).toContain('key === "home"');
		expect(blogPostSurfaceSource).toContain('key === "end"');
		expect(blogPostSurfaceSource).toContain("event.key.toLocaleLowerCase()");
		expect(blogPostSurfaceSource).toContain('shortcutKey === "p"');
		expect(blogPostSurfaceSource).toContain('shortcutKey === "n"');
		expect(blogPostSurfaceSource).toContain("getAdjacentBlogPosts");
		expect(blogPostSurfaceSource).toContain("const adjacentPosts = $derived");
		expect(blogPostSurfaceSource).toContain('class="post-adjacent"');
		expect(blogPostSurfaceSource).toContain('class="post-adjacent-link previous"');
		expect(blogPostSurfaceSource).toContain('class="post-adjacent-link next"');
		expect(blogPostSurfaceSource).toContain("title={previousPostShortcutTitle}");
		expect(blogPostSurfaceSource).toContain("title={nextPostShortcutTitle}");
		expect(blogPostSurfaceSource).toContain('aria-keyshortcuts="Alt+P"');
		expect(blogPostSurfaceSource).toContain('aria-keyshortcuts="Alt+N"');
		expect(blogPostSurfaceSource).toContain("aria-label={m.blog_post_adjacent_label");
		expect(blogPostSurfaceSource).toContain("function getPostHeadingId");
		expect(blogPostSurfaceSource).toContain("const postHeadings = $derived");
		expect(blogPostSurfaceSource).toContain("id={getPostHeadingId(index)}");
		expect(blogPostSurfaceSource).toContain('<nav class="post-toc"');
		expect(blogPostSurfaceSource).toContain("href={`#${heading.id}`}");
		expect(blogPostSurfaceSource).toContain('class="post-reading-layout"');
		expect(blogPostSurfaceSource).toContain("--post-body-width: 48rem");
		expect(blogPostSurfaceSource).toContain("--post-toc-min-width: 12rem");
		expect(blogPostSurfaceSource).toContain("--post-toc-max-width: 16rem");
		expect(blogPostSurfaceSource).toContain("font-size: clamp(1.55rem, 3.85vw, 2.9rem)");
		expect(blogPostSurfaceSource).toContain("font-weight: 740");
		expect(blogPostSurfaceSource).not.toContain("font-size: clamp(2rem, 6vw, 4.6rem)");
		expect(blogPostSurfaceSource).toContain(
			"grid-template-columns: minmax(0, var(--post-body-width)) minmax(var(--post-toc-min-width), var(--post-toc-max-width));",
		);
		expect(blogPostSurfaceSource).toContain("position: sticky;");
		expect(blogPostSurfaceSource).toContain('block.kind === "image"');
		expect(blogPostSurfaceSource).toContain('block.kind === "heading"');
		expect(blogPostSurfaceSource).toContain('loading="lazy"');
		expect(blogPostSurfaceSource).toContain('decoding="async"');
		expect(blogPostSurfaceSource).toContain("font-size: calc(1.02rem + 2pt)");
		expect(blogPostSurfaceSource).toContain("font-size: calc(0.86rem + 1pt)");
		expect(blogPostSurfaceSource).toContain(".post-header ul li");
		expect(blogPostSurfaceSource).toContain("user-select: none");
		expect(blogPostSurfaceSource).not.toContain(".post-body {\n\t\tuser-select: none");
		expect(surfaceSource).toContain("children?: Snippet");
		expect(surfaceSource).toContain("{@render children()}");
		expect(blogPostCoreSource).toContain("export type BlogPostDetail");
		expect(blogPostCoreSource).toContain("export type BlogPostBodyBlock");
		expect(blogPostCoreSource).toContain("export function getBlogPostForLocale");
		expect(blogPostCoreSource).toContain("export function getBlogPostEntries");
		expect(blogPostCoreSource).toContain("export function getAdjacentBlogPosts");
		expect(blogPostCoreSource).toContain('export const BLOG_POST_TOC_SHORTCUT_PREFIX = "T"');
		expect(blogPostCoreSource).toContain("export const BLOG_POST_TOC_SHORTCUT_LIMIT = 9");
		expect(blogPostCoreSource).toContain("export function getBlogPostTocShortcut");
		expect(blogPostCoreSource).toContain("export function getBlogPostBodyBlocks");
		expect(blogPostCoreSource).toContain("export function getBlogPostBodyParagraphs");

		expect(getBlogPostEntries([englishPost, koreanPost])).toEqual([{ slug: "zero-license-notes" }]);
		expect(getBlogPostForLocale([englishPost, koreanPost], "zero-license-notes", "ko")?.title).toBe(
			"제로 라이선스 메모",
		);
		expect(getBlogPostForLocale([englishPost], "zero-license-notes", "ko")?.locale).toBe("en");
		expect(getBlogPostForLocale([englishPost, koreanPost], "missing", "ko")).toBeNull();
		expect(
			getAdjacentBlogPosts(
				[
					{
						...englishPost,
						slug: "newer-post",
						title: "Newer post",
						publishedAt: "2026-06-01",
					},
					englishPost,
					{
						...englishPost,
						slug: "older-post",
						title: "Older post",
						publishedAt: "2026-01-01",
					},
				],
				"zero-license-notes",
				"en",
			),
		).toEqual({
			previous: expect.objectContaining({ slug: "older-post" }),
			next: expect.objectContaining({ slug: "newer-post" }),
		});
		expect(getAdjacentBlogPosts([englishPost], "zero-license-notes", "en")).toEqual({
			previous: null,
			next: null,
		});
		expect(getBlogPostTocShortcut(0)).toBe("T1");
		expect(getBlogPostTocShortcut(8)).toBe("T9");
		expect(getBlogPostTocShortcut(9)).toBeUndefined();
		expect(getBlogPostTocShortcut(-1)).toBeUndefined();
		expect(getBlogPostTocShortcutIndex("1", "Digit1")).toBe(0);
		expect(getBlogPostTocShortcutIndex("Unidentified", "Digit1")).toBe(0);
		expect(getBlogPostTocShortcutIndex("2", "Digit2")).toBe(1);
		expect(getBlogPostTocShortcutIndex("2", "Numpad2")).toBe(1);
		expect(getBlogPostTocShortcutIndex("0", "Digit0")).toBeUndefined();
		expect(getBlogPostBodyParagraphs(englishPost)).toEqual([
			"Zero-license thinking starts from a simple question: what should be easy for the next person to reuse?",
			"This note is a placeholder for comparing permissive licenses and the amount of friction they leave behind.",
		]);

		const watercolorBlocks = getBlogPostBodyBlocks(
			createBlogPostDetailFromContent(
				sampleWatercolorPath,
				sampleWatercolorMetadata,
				"en",
				sampleWatercolorMarkdown,
			),
		);

		expect(watercolorBlocks.slice(0, 4)).toEqual([
			{
				kind: "paragraph",
				text: "The visual direction should feel hand-made without turning into decoration for its own sake.",
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
				text: "This note is a placeholder for palette, surface, and typography decisions.",
			},
		]);
		expect(
			watercolorBlocks.filter((block) => block.kind === "heading").length,
		).toBeGreaterThanOrEqual(4);
		expect(
			getBlogPostBodyBlocks(
				createBlogPostDetailFromContent(
					sampleWatercolorPath,
					sampleWatercolorMetadata,
					"ko",
					sampleWatercolorKoreanMarkdown,
				),
			).slice(0, 4),
		).toEqual([
			{
				kind: "paragraph",
				text: "시각 방향은 손맛을 품고 있어야 하지만, 장식만을 위한 장식으로 변하면 안 됩니다.",
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
				text: "이 글은 색상, 표면, 글자 체계에 대한 선택을 정리하기 위한 자리입니다.",
			},
		]);
	});
});
