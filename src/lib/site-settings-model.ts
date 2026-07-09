import type { SiteLocale } from "$lib/site-locales";
import type { SiteSectionPath } from "$lib/site-navigation";
import { siteProfile } from "$lib/site-profile";

export const settingsTabs = ["theme", "language", "privacy"] as const;
export const themeChoices = ["light", "dark", "system"] as const;

export type SettingsTab = (typeof settingsTabs)[number];
export type ThemeChoice = (typeof themeChoices)[number];

export const defaultSettingsTab: SettingsTab = "theme";

export const navigationShortcutByHref = {
	"/manifesto": "M",
	"/blog": "B",
	"/works": "W",
} as const satisfies Record<SiteSectionPath, string>;

export const navigationPathByShortcut = Object.fromEntries(
	siteProfile.navigation.map((item) => [
		navigationShortcutByHref[item.href].toLowerCase(),
		item.href,
	]),
) as Record<string, SiteSectionPath>;

export const languageShortcutByLocale = {
	en: "E",
	zh: "C",
	es: "S",
	fr: "F",
	hi: "H",
	ko: "K",
} as const satisfies Record<SiteLocale, string>;

export const languageShortcutByKey = Object.fromEntries(
	Object.entries(languageShortcutByLocale).map(([locale, shortcut]) => [
		shortcut.toLowerCase(),
		locale,
	]),
) as Record<string, SiteLocale>;

export const themeShortcutByKey = {
	i: "light",
	d: "dark",
	s: "system",
} as const satisfies Record<string, ThemeChoice>;
