import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { createSiteI18n, getSiteTranslator } from "./index";
import { siteLocales } from "$lib/site-locales";
import type { AppSchema } from "./generated";
import type { TypedCall } from "@0disoft/saylo-core";

describe("published Saylo integration", () => {
	it("formats every existing message exactly in all six locales", () => {
		for (const locale of siteLocales) {
			const source = JSON.parse(
				readFileSync(new URL(`../../../locales/${locale}/site.json`, import.meta.url), "utf8"),
			);
			const translator = getSiteTranslator(locale);
			for (const [key, value] of Object.entries(source)) {
				expect(translator.t(...([`site:${key}`] as TypedCall<AppSchema>))).toBe(value);
			}
		}
	});
	it("isolates concurrent renders and their disposal", () => {
		const english = createSiteI18n("en");
		const korean = createSiteI18n("ko");
		try {
			english.setLocale("fr");
			expect(english.getSnapshot().locale).toBe("fr");
			expect(korean.getSnapshot().locale).toBe("ko");
			english.dispose();
			expect(korean.t("site:settings_trigger_label")).toBe("설정");
		} finally {
			english.dispose();
			korean.dispose();
		}
	});
});
