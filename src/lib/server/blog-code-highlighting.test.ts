import { describe, expect, it } from "vitest";
import { highlightBlogPostCode, highlightBlogPostCodeBlocks } from "./blog-code-highlighting";

describe("blog code highlighting", () => {
	it.each([
		["rust", "fn main() {}"],
		["rs", "fn main() {}"],
		["typescript", "const amount: number = 1;"],
		["ts", "const amount: number = 1;"],
		["go", "func main() {}"],
	])("highlights supported %s code with dual themes", async (language, source) => {
		const html = await highlightBlogPostCode(source, language);

		expect(html).toContain('class="shiki shiki-themes github-light github-dark"');
		expect(html).toContain("--shiki-dark");
	});

	it("escapes source code before returning trusted highlighted markup", async () => {
		const html = await highlightBlogPostCode('<script>alert("nope")</script>', "typescript");

		expect(html).toContain("&#x3C;");
		expect(html).not.toContain("<script>");
	});

	it("leaves unsupported and unlabelled blocks on the plain-code fallback", async () => {
		expect(await highlightBlogPostCode("SELECT 1", "sql")).toBeUndefined();
		expect(await highlightBlogPostCode("plain text", undefined)).toBeUndefined();
		expect(
			await highlightBlogPostCodeBlocks([
				{ kind: "paragraph", text: "Before" },
				{ kind: "code", language: "sql", source: "SELECT 1" },
			]),
		).toEqual({});
	});
});
