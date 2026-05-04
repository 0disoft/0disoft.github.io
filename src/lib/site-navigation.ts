import { siteProfile } from "$lib/site-profile";

type SiteProfile = typeof siteProfile;

export type SiteNavigationItem = SiteProfile["navigation"][number];
export type SiteSectionPath = SiteNavigationItem["href"];
export type SiteSectionSlug = SiteSectionPath extends `/${infer Slug}` ? Slug : never;

type SectionEntry = {
	section: SiteSectionSlug;
};

export const siteNavigation = siteProfile.navigation satisfies readonly SiteNavigationItem[];

const siteSectionPaths = new Set<string>(siteNavigation.map((item) => item.href));

export function hrefToSectionSlug(href: SiteSectionPath): SiteSectionSlug {
	return href.slice(1) as SiteSectionSlug;
}

export function isSiteSectionPath(path: string): path is SiteSectionPath {
	return siteSectionPaths.has(path);
}

export function sectionSlugToPath(section: string): SiteSectionPath | null {
	const path = `/${section}`;

	return isSiteSectionPath(path) ? path : null;
}

export function findNavigationItemByPath(path: string): SiteNavigationItem | undefined {
	return siteNavigation.find((item) => item.href === path);
}

export function getSectionEntries(): SectionEntry[] {
	return siteNavigation.map((item) => ({
		section: hrefToSectionSlug(item.href),
	}));
}
