import { getSiteTranslator, type SiteTranslate } from "$lib/i18n";
import { isSiteLocale, type SiteLocale } from "$lib/site-locales";
import type { SiteSectionPath } from "$lib/site-navigation";

export type DisplayLocale = SiteLocale;

export function toDisplayLocale(locale: SiteLocale | string): DisplayLocale {
	return isSiteLocale(locale) ? locale : "en";
}

export function withShortcut(label: string, shortcut: string): string {
	return `${label} (${shortcut})`;
}

export const languageDisplayNameByLocale = {
	en: "English",
	zh: "中文",
	es: "Español",
	fr: "Français",
	hi: "हिन्दी",
	ko: "한국어",
} as const satisfies Record<SiteLocale, string>;

export function getLocalizedNavigationLabel(
	href: SiteSectionPath,
	locale: DisplayLocale,
	t: SiteTranslate = getSiteTranslator(locale).t,
): string {
	switch (href) {
		case "/indiehackers":
			return t("site:nav_indiehackers");
		case "/investors":
			return t("site:nav_investors");
		case "/creators":
			return t("site:nav_creators");
	}
}

export function getLocalizedLanguageLabel(
	locale: SiteLocale,
	_displayLocale: DisplayLocale,
): string {
	return languageDisplayNameByLocale[locale];
}
