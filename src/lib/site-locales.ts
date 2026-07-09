import { baseLocale } from "$lib/paraglide/runtime";

export const languageOptions = [
	{ locale: "en", label: "English" },
	{ locale: "zh", label: "Chinese" },
	{ locale: "es", label: "Spanish" },
	{ locale: "fr", label: "French" },
	{ locale: "hi", label: "Hindi" },
	{ locale: "ko", label: "Korean" },
] as const;

export type SiteLocale = (typeof languageOptions)[number]["locale"];

export const siteLocales = Object.freeze(
	languageOptions.map((item) => item.locale),
) satisfies readonly SiteLocale[];
export const indexedSiteLocales = siteLocales;

export const siteLocaleStorageKey = "0disoft:locale";

export const siteLocaleCookieName = "ODISOFT_LOCALE";
export const siteLocaleCookieMaxAge = 34_560_000;
const siteLocaleSet = new Set<string>(siteLocales);

export function isSiteLocale(locale: string): locale is SiteLocale {
	return siteLocaleSet.has(locale);
}

export function toSiteLocale(value: unknown): SiteLocale | null {
	if (typeof value !== "string") {
		return null;
	}

	const normalizedValue = value.toLowerCase();
	const [languageCode] = normalizedValue.split("-");

	for (const locale of languageOptions) {
		if (locale.locale === normalizedValue || locale.locale === languageCode) {
			return locale.locale;
		}
	}

	return null;
}

export function getPathLocale(pathname: string): SiteLocale | null {
	const [firstSegment] = pathname.replace(/^\/+/, "").split("/");

	return toSiteLocale(firstSegment);
}

export function readStoredSiteLocale(): SiteLocale | null {
	if (typeof window === "undefined") {
		return null;
	}

	try {
		const storedLocale = toSiteLocale(window.localStorage.getItem(siteLocaleStorageKey));

		if (storedLocale) {
			return storedLocale;
		}
	} catch {
		// Storage can be unavailable in privacy-restricted browser contexts.
	}

	return readCookieLocale();
}

export function writeStoredSiteLocale(locale: SiteLocale) {
	if (typeof window === "undefined") {
		return;
	}

	try {
		window.localStorage.setItem(siteLocaleStorageKey, locale);
	} catch {
		// Cookie persistence below still gives the user a durable preference path.
	}

	document.cookie = `${siteLocaleCookieName}=${locale}; path=/; max-age=${siteLocaleCookieMaxAge}; SameSite=Lax`;
}

export function getBrowserSiteLocale(languages: readonly string[]): SiteLocale {
	for (const language of languages) {
		const locale = toSiteLocale(language);

		if (locale) {
			return locale;
		}
	}

	return baseLocale;
}

export function getPreferredClientLocale(): SiteLocale {
	return readStoredSiteLocale() ?? getBrowserSiteLocale(navigator.languages);
}

function toInternalPathname(pathname: string): string {
	return `/${pathname.replace(/^\/+/, "")}`;
}

export function stripLocalePrefix(pathname: string): string {
	const normalizedPathname = toInternalPathname(pathname);
	const [firstSegment, ...restSegments] = normalizedPathname.slice(1).split("/");

	if (!firstSegment || !isSiteLocale(firstSegment)) {
		return normalizedPathname;
	}

	return toInternalPathname(restSegments.join("/")).replace(/\/$/, "") || "/";
}

export function localizeSitePathname(pathname: string, locale: SiteLocale): string {
	const canonicalPathname = stripLocalePrefix(pathname);

	if (locale === baseLocale) {
		return canonicalPathname;
	}

	return canonicalPathname === "/" ? `/${locale}/` : `/${locale}${canonicalPathname}`;
}

function readCookieLocale(): SiteLocale | null {
	const cookiePrefix = `${siteLocaleCookieName}=`;
	const localeCookie = document.cookie
		.split(";")
		.map((cookie) => cookie.trim())
		.find((cookie) => cookie.startsWith(cookiePrefix));

	if (!localeCookie) {
		return null;
	}

	return toSiteLocale(decodeURIComponent(localeCookie.slice(cookiePrefix.length)));
}
