import { describe, expect, it, vi } from "vitest";
import { getIndiehackersCopy } from "./indiehackers";
import { load as loadLayout } from "../../routes/+layout.server";

vi.mock("$lib/paraglide/runtime", () => ({ getLocale: () => "en" }));

describe("localized indiehackers delivery", () => {
	it("returns localized indiehackers copy from the layout", async () => {
		for (const locale of ["en", "ko"] as const) {
			const layout = await loadLayout({
				url: new URL(`https://example.test/${locale}/indiehackers`),
			} as Parameters<typeof loadLayout>[0]);

			expect(layout.indiehackers).toEqual(getIndiehackersCopy(locale));
			expect(Object.keys(layout.indiehackers).sort()).toEqual(["paragraphs", "title"]);
		}
	});
});
