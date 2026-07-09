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
		case "/manifesto":
			return m.nav_manifesto({}, { locale });
		case "/blog":
			return m.nav_blog({}, { locale });
		case "/works":
			return m.nav_works({}, { locale });
		case "/roadmap":
			return m.nav_roadmap({}, { locale });
		case "/contact":
			return m.nav_contact({}, { locale });
	}
}

export function getLocalizedLanguageLabel(
	locale: SiteLocale,
	_displayLocale: DisplayLocale,
): string {
	return languageDisplayNameByLocale[locale];
}
