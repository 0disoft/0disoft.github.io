import { describe, expect, it, vi } from "vitest";

vi.mock("$lib/paraglide/runtime", () => ({ getLocale: () => "en" }));

import { load } from "../../routes/indiehackers/[slug]/+page.server";

describe("article page data", () => {
	it.each(["en", "ko", "hi"])("returns HTML without raw Markdown in %s", async (locale) => {
		const data = await load({
			params: { slug: "carrd" },
			url: new URL(`https://example.test/${locale}/indiehackers/carrd/`),
		} as Parameters<typeof load>[0]);

		expect(data.post).not.toHaveProperty("body");
		expect(data.post.locale).toBe(locale);
		expect(data.bodyHtml).toContain("<p>");
		expect(data.tagLabels.length).toBeGreaterThan(0);
	});
});
