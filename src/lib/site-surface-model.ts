import { getLocalizedNavigationLabel, type DisplayLocale } from "$lib/site-labels";
import type { SiteSectionPath } from "$lib/site-navigation";
import { findNavigationItemByPath } from "$lib/site-navigation";
import { siteProfile } from "$lib/site-profile";

export type SiteSurfacePath = SiteSectionPath | "/";
export type SiteSurfaceSectionKind = "home" | "manifesto" | "blog" | "works";

export function getSiteSurfaceSectionKind(activePath: SiteSurfacePath): SiteSurfaceSectionKind {
	if (activePath === "/manifesto" || activePath === "/blog" || activePath === "/works") {
		return activePath.slice(1) as SiteSurfaceSectionKind;
	}

	return "home";
}

export function getSiteSurfaceSectionLabel(
	activePath: SiteSurfacePath,
	displayLocale: DisplayLocale,
): string {
	const activeSection = findNavigationItemByPath(activePath);

	return activeSection
		? getLocalizedNavigationLabel(activeSection.href, displayLocale)
		: siteProfile.name;
}

export function getSiteSurfacePageTitle(
	activePath: SiteSurfacePath,
	displayLocale: DisplayLocale,
): string {
	const activeSection = findNavigationItemByPath(activePath);
	const sectionLabel = getSiteSurfaceSectionLabel(activePath, displayLocale);

	return activeSection ? `${sectionLabel} · ${siteProfile.name}` : siteProfile.name;
}
