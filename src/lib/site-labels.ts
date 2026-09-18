import * as m from "$lib/paraglide/messages";
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

export function getLocalizedNavigationLabel(href: SiteSectionPath, locale: DisplayLocale): string {
	switch (href) {
		case "/blog":
			return m.nav_blog({}, { locale });
		case "/projects":
			return m.nav_projects({}, { locale });
		case "/about":
			return m.nav_about({}, { locale });
		case "/uses":
			return m.nav_uses({}, { locale });
	}
}

export function getLocalizedLanguageLabel(
	locale: SiteLocale,
	_displayLocale: DisplayLocale,
): string {
	return languageDisplayNameByLocale[locale];
}
