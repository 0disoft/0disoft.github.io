import { describe, expect, it, vi } from "vitest";
import { blogPostLocales, blogPosts } from "./blog-posts";
import { getManifestoCopy } from "./manifesto";
import { load } from "../../routes/blog/[slug]/+page.server";
import { load as loadLayout } from "../../routes/+layout.server";

vi.mock("$lib/paraglide/runtime", () => ({ getLocale: () => "en" }));

describe("localized blog delivery", () => {
	it.each(blogPostLocales)("returns only %s content and metadata-only lists", async (locale) => {
		const slug = blogPosts[0].slug;
		const event = { params: { slug }, url: new URL(`https://example.test/${locale}/blog/${slug}`) };
		const result = await load(event as Parameters<typeof load>[0]);
		expect(result?.post.locale).toBe(locale);
		expect(Object.keys(result?.highlightedCodeByLocale ?? {})).toEqual([locale]);
		const layout = await loadLayout(event as Parameters<typeof loadLayout>[0]);
		expect(layout.manifesto).toEqual(getManifestoCopy(locale));
		expect(Object.keys(layout.manifesto).sort()).toEqual(["paragraphs", "title"]);
		expect(layout?.blogPosts.length).toBeGreaterThan(0);
		expect(layout?.blogPosts.every((post) => post.locale === locale && !("body" in post))).toBe(
			true,
		);
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
