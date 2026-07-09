import { describe, expect, it } from "vitest";
import { DEFAULT_BLOG_SHARE_PLATFORMS, buildBlogShareLinks } from "./blog-share";

describe("blog share", () => {
	it("builds blog post share links from one typed source", () => {
		const links = buildBlogShareLinks({
			title: "AI is making companies smaller and faster",
			text: "A short note about AI-era operating models.",
			url: "https://0disoft.github.io/blog/ai-smaller-faster-companies",
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
					encodeURIComponent("https://0disoft.github.io/blog/ai-smaller-faster-companies"),
				),
			),
		).toBe(true);
	});
});
