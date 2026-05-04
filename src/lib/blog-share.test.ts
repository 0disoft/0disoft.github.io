import { describe, expect, it } from "vitest";
import { blogShareSource } from "./test-support/site-test-sources";

describe("blog share", () => {
	it("builds blog post share links from one typed source", async () => {
		expect(blogShareSource).toContain("DEFAULT_BLOG_SHARE_PLATFORMS");
		expect(blogShareSource).toContain("export function buildBlogShareLinks");

		const { DEFAULT_BLOG_SHARE_PLATFORMS, buildBlogShareLinks } = await import("./blog-share");
		const links = buildBlogShareLinks({
			title: "Watercolor interface",
			text: "A short note about the site surface.",
			url: "https://0disoft.github.io/blog/watercolor-interface",
		});

		expect(DEFAULT_BLOG_SHARE_PLATFORMS).toEqual(["telegram", "line", "whatsapp", "x", "reddit"]);
		expect(links.map((link) => link.platform)).toEqual(DEFAULT_BLOG_SHARE_PLATFORMS);
		expect(links.find((link) => link.platform === "telegram")?.href).toContain("t.me/share/url");
		expect(links.find((link) => link.platform === "line")?.href).toContain(
			"social-plugins.line.me/lineit/share",
		);
		expect(links.find((link) => link.platform === "whatsapp")?.href).toContain("wa.me/?text=");
		expect(links.find((link) => link.platform === "x")?.href).toContain("x.com/intent/tweet");
		expect(links.find((link) => link.platform === "reddit")?.href).toContain("reddit.com/submit");
		expect(
			links.every((link) =>
				link.href.includes(
					encodeURIComponent("https://0disoft.github.io/blog/watercolor-interface"),
				),
			),
		).toBe(true);
	});
});
