import { describe, expect, it } from "vitest";
import { renderArticleMarkdown } from "./markdown";

describe("article Markdown", () => {
	it("renders links, emphasis, headings and lists", () => {
		const html = renderArticleMarkdown(
			"## Heading\n\n**Important** [source](https://example.com)\n\n- Item",
		);
		expect(html).toContain('<a href="https://example.com">source</a>');
		expect(html).toContain("<strong>Important</strong>");
		expect(html).toContain("<h2>Heading</h2>");
		expect(html).toContain("<li>Item</li>");
	});

	it("escapes raw HTML and blocks executable link destinations", () => {
		const html = renderArticleMarkdown(
			"<script>alert(1)</script>\n\n[click](javascript:alert%281%29)",
		);
		expect(html).not.toContain("<script>");
		expect(html).not.toContain('href="javascript:');
	});
});
