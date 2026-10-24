import type { SiteTranslate } from "$lib/i18n";
import { getLocalizedNavigationLabel, type DisplayLocale } from "$lib/site-labels";
import type { SiteSectionPath } from "$lib/site-navigation";
import { findNavigationItemByPath } from "$lib/site-navigation";
import { siteProfile } from "$lib/site-profile";

export type SiteSurfacePath = SiteSectionPath | "/";
export type SiteSurfaceSectionKind = "home" | "indiehackers" | "investors" | "creators";

export function getSiteSurfaceSectionKind(activePath: SiteSurfacePath): SiteSurfaceSectionKind {
	return activePath === "/" ? "home" : (activePath.slice(1) as SiteSurfaceSectionKind);
}

export function getSiteSurfaceSectionLabel(
	activePath: SiteSurfacePath,
	displayLocale: DisplayLocale,
	t?: SiteTranslate,
): string {
	const activeSection = findNavigationItemByPath(activePath);

	return activeSection
		? getLocalizedNavigationLabel(activeSection.href, displayLocale, t)
		: siteProfile.name;
}

export function getSiteSurfacePageTitle(
	activePath: SiteSurfacePath,
	displayLocale: DisplayLocale,
	t?: SiteTranslate,
): string {
	const activeSection = findNavigationItemByPath(activePath);
	const sectionLabel = getSiteSurfaceSectionLabel(activePath, displayLocale, t);

	return activeSection ? `${sectionLabel} · ${siteProfile.name}` : siteProfile.name;
}
