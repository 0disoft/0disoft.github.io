import type { SiteLocale } from "$lib/site-locales";
import notoSansDevanagariCss from "@fontsource-variable/noto-sans-devanagari/index.css?url";
import notoSansKrCss from "@fontsource-variable/noto-sans-kr/index.css?url";
import notoSansScCss from "@fontsource-variable/noto-sans-sc/index.css?url";

export const localeFontStylesheets = {
	hi: notoSansDevanagariCss,
	ko: notoSansKrCss,
	zh: notoSansScCss,
} as const satisfies Partial<Record<SiteLocale, string>>;
