import { describe, expect, it, vi } from "vitest";
import { getAboutCopy } from "./about";
import { blogPostLocales, blogPosts } from "./blog-posts";
import { getUsesCopy } from "./uses";
import { assertCompleteBlogTranslations } from "./blog-content-validation";
import { load } from "../../routes/blog/[slug]/+page.server";
import { load as loadLayout } from "../../routes/+layout.server";

vi.mock("$lib/paraglide/runtime", () => ({ getLocale: () => "en" }));

describe("localized blog delivery", () => {
	it("requires every supported translation and reports missing/empty file paths", () => {
		const directory = "../../content/blog/sample";
		const translations = Object.fromEntries(
			blogPostLocales.map((locale) => [`${directory}/${locale}.md`, "Translated content"]),
		);
		expect(() =>
			assertCompleteBlogTranslations([`${directory}/meta.json`], translations),
		).not.toThrow();
		delete translations[`${directory}/ko.md`];
		translations[`${directory}/fr.md`] = " \n ";
		expect(() => assertCompleteBlogTranslations([`${directory}/meta.json`], translations)).toThrow(
			`${directory}/fr.md, ${directory}/ko.md`,
		);
	});
	it.each(blogPostLocales)("returns only %s layout copy and metadata-only lists", async (locale) => {
		const event = { params: { slug: "missing" }, url: new URL(`https://example.test/${locale}/blog`) };
		const layout = await loadLayout(event as Parameters<typeof loadLayout>[0]);
		expect(layout.about).toEqual(getAboutCopy(locale));
		expect(layout.uses).toEqual(getUsesCopy(locale));
		expect(layout.blogPosts.every((post) => post.locale === locale && !("body" in post))).toBe(true);

		if (blogPosts.length === 0) {
			return;
		}

		const slug = blogPosts[0].slug;
		const result = await load({
			params: { slug },
			url: new URL(`https://example.test/${locale}/blog/${slug}`),
		} as Parameters<typeof load>[0]);
		expect(result?.post.locale).toBe(locale);
		expect(Object.keys(result?.highlightedCodeByLocale ?? {})).toEqual([locale]);
		for (const post of Object.values(result?.adjacentPosts ?? {})) {
			if (post) expect("body" in post).toBe(false);
		}
	});

	it("returns 404 for unknown posts", async () => {
		await expect(
			load({
				params: { slug: "missing" },
				url: new URL("https://example.test/blog/missing"),
			} as Parameters<typeof load>[0]),
		).rejects.toMatchObject({ status: 404 });
	});
});
