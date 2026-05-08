import { describe, expect, it } from "vitest";
import { siteProfile } from "./site-profile";
import {
	appHtmlSource,
	errorSource,
	hooksSource,
	iconButtonSource,
	layoutCss,
	layoutSource,
	navigationModuleExists,
	navigationSource,
	sectionRouteSource,
	sidebarActionSource,
	sidebarSource,
	siteSurfaceSource,
	surfaceSource,
	workCoreSource,
	workJsonFilePaths,
	workMetaFilePaths,
	worksModuleExists,
	worksSource,
	worksSurfaceSource,
} from "./test-support/site-test-sources";

describe("site shell", () => {
	it("keeps public profile facts in one source", () => {
		expect(siteProfile.name).toBe("0disoft");
		expect(siteProfile.origin).toBe("https://0disoft.github.io");
		expect(siteProfile.navigation).toEqual([
			{ label: "Manifesto", href: "/manifesto" },
			{ label: "Blog", href: "/blog" },
			{ label: "Works", href: "/works" },
			{ label: "Roadmap", href: "/roadmap" },
			{ label: "Contact", href: "/contact" },
		]);
		expect(siteProfile.navigation.map((item) => item.label)).not.toContain("홈");
		expect(siteProfile.navigation.every((item) => !item.href.startsWith("#"))).toBe(true);
		expect(siteProfile.links).toEqual([
			{
				label: "Sponsor",
				href: "https://github.com/sponsors/0disoft",
			},
		]);
	});

	it("exports an explicit empty transport hook for SvelteKit", () => {
		expect(hooksSource).toContain("Transport");
		expect(hooksSource).toContain("export const transport: Transport = {}");
	});

	it("replaces starter copy with the real profile surface", () => {
		expect(siteSurfaceSource).toContain("siteProfile");
		expect(siteSurfaceSource).toContain("site-sidebar");
		expect(siteSurfaceSource).toContain("settings-panel");
	});

	it("keeps Svelte component responsibilities split", () => {
		expect(surfaceSource).toContain('import SiteSidebar from "$lib/site-sidebar.svelte"');
		expect(surfaceSource).toContain("<SiteSidebar");
		expect(surfaceSource).not.toContain("setMode");
		expect(surfaceSource).not.toContain("navigationIcons");
		expect(sidebarSource).toContain('import IconButton from "$lib/ui/icon-button.svelte"');
		expect(sidebarSource).toContain('import SidebarAction from "$lib/ui/sidebar-action.svelte"');
		expect(sidebarSource).toContain("<SidebarAction");
		expect(sidebarSource).toContain("<IconButton");
		expect(sidebarSource).toContain("let { activePath");
		expect(sidebarSource).toContain("const navigationIconByHref");
		expect(sidebarSource).toContain("writeStoredSiteLocale");
		expect(sidebarSource).not.toContain("as item, index");
	});

	it("keeps repeated button accessibility in small UI components", () => {
		expect(sidebarActionSource).toContain("data-sidebar-keyboard-target");
		expect(sidebarActionSource).toContain("aria-keyshortcuts={shortcut}");
		expect(sidebarActionSource).toContain('aria-current={current ? "page" : undefined}');
		expect(sidebarActionSource).toContain("title={title ?? label}");
		expect(sidebarActionSource).toContain("user-select: none");
		expect(sidebarActionSource).toContain("font-weight: 560");
		expect(sidebarActionSource).not.toContain("font-weight: 680");
		expect(sidebarActionSource).toContain("<a");
		expect(sidebarActionSource).toContain("<button");
		expect(iconButtonSource).toContain("aria-label={label}");
		expect(iconButtonSource).toContain("title={title ?? label}");
		expect(iconButtonSource).toContain("data-settings-keyboard-target");
		expect(iconButtonSource).toContain("data-settings-control={controlId}");
		expect(iconButtonSource).toContain("user-select: none");
		expect(sidebarSource).not.toContain('class="menu-item"');
		expect(sidebarSource).not.toContain('class="settings-trigger"');
		expect(sidebarSource).not.toContain('class="external-link"');
		expect(sidebarSource).not.toContain('class="settings-close"');
	});

	it("keeps section route parsing behind typed navigation helpers", async () => {
		expect(navigationModuleExists).toBe(true);
		expect(navigationSource).toContain("SiteSectionPath");
		expect(navigationSource).toContain("SiteSectionSlug");
		expect(navigationSource).toContain("satisfies");
		expect(sectionRouteSource).toContain("getSectionEntries");
		expect(sectionRouteSource).toContain("sectionSlugToPath");

		const { findNavigationItemByPath, getSectionEntries, sectionSlugToPath } =
			await import("./site-navigation");

		expect(getSectionEntries()).toEqual([
			{ section: "manifesto" },
			{ section: "blog" },
			{ section: "works" },
			{ section: "roadmap" },
			{ section: "contact" },
		]);
		expect(sectionSlugToPath("blog")).toBe("/blog");
		expect(sectionSlugToPath("missing-section")).toBeNull();
		expect(sectionSlugToPath("missing")).toBeNull();
		expect(findNavigationItemByPath("/missing-section")).toBeUndefined();
	});

	it("keeps landmarks and grouped controls semantic", () => {
		expect(siteSurfaceSource).toContain('<div class="site-frame site-backdrop">');
		expect(siteSurfaceSource).toContain('<main class="content-shell"');
		expect(siteSurfaceSource).not.toContain('<main class="site-frame">');
		expect(siteSurfaceSource).toContain('<ul class="menu-list"');
		expect(siteSurfaceSource).toContain("<li>");
		expect(siteSurfaceSource).toContain('class="choice-grid theme-grid mode-controls"');
		expect(siteSurfaceSource).toContain("<dialog");
		expect(siteSurfaceSource).toContain("showModal");
		expect(siteSurfaceSource).toContain("<svelte:window onkeydown={handleGlobalKeydown} />");
		expect(siteSurfaceSource).toContain("function handleSettingsDialogKeydown");
		expect(siteSurfaceSource).toContain("data-settings-keyboard-target");
		expect(siteSurfaceSource).toContain("Settings");
		expect(siteSurfaceSource).toContain("userPrefersMode");
		expect(siteSurfaceSource).toContain("const selectedTheme = $derived(userPrefersMode.current)");
		expect(siteSurfaceSource).toContain("toDisplayLocale(getLocale())");
		expect(siteSurfaceSource).toContain("function getLocalizedNavigationLabel");
		expect(siteSurfaceSource).toContain('role="tablist"');
		expect(siteSurfaceSource).toContain('aria-selected={activeSettingsTab === "theme"}');
		expect(siteSurfaceSource).toContain('aria-selected={activeSettingsTab === "language"}');
		expect(siteSurfaceSource).toContain('role="tabpanel"');
		expect(siteSurfaceSource).toContain('{#if activeSettingsTab === "theme"}');
		expect(siteSurfaceSource).toContain("{:else}");
		expect(siteSurfaceSource).toContain("localizeSitePathname");
		expect(siteSurfaceSource).toContain("setLocale");
		expect(siteSurfaceSource).toContain("writeStoredSiteLocale(locale)");
		expect(siteSurfaceSource).toContain('rel="noopener noreferrer"');
	});

	it("supports arrow-key focus movement across sidebar controls", () => {
		expect(siteSurfaceSource).toContain("function handleSidebarKeydown");
		expect(siteSurfaceSource).toContain("data-sidebar-keyboard-target");
		expect(siteSurfaceSource).toContain("getSidebarFocusTargets");
		expect(siteSurfaceSource).toContain("focusAdjacentSidebarControl(1");
		expect(siteSurfaceSource).toContain("focusAdjacentSidebarControl(-1");
		expect(siteSurfaceSource).toContain("focusBoundarySidebarControl");
		expect(siteSurfaceSource).toContain("onkeydown={handleSidebarKeydown}");
		expect(siteSurfaceSource).toContain('key === "arrowright" || key === "arrowdown"');
		expect(siteSurfaceSource).toContain('key === "arrowleft" || key === "arrowup"');
		expect(siteSurfaceSource).toContain('key === "home"');
		expect(siteSurfaceSource).toContain('key === "end"');
	});

	it("keeps the desktop sidebar stable while page content scrolls", () => {
		expect(surfaceSource).toContain("--site-sidebar-width");
		expect(surfaceSource).toContain("height: 100svh");
		expect(surfaceSource).toContain(
			"grid-template-columns: var(--site-sidebar-width) minmax(0, 1fr)",
		);
		expect(surfaceSource).toContain("overflow: hidden");
		expect(surfaceSource).toContain("overflow: auto");
		expect(surfaceSource).toContain("overscroll-behavior: contain");
		expect(sidebarSource).toContain("grid-template-rows: auto minmax(0, 1fr) auto");
		expect(sidebarSource).toContain(".site-sidebar nav");
		expect(sidebarSource).toContain("--sidebar-focus-ring-space");
		expect(sidebarSource).toContain("margin-inline: calc(var(--sidebar-focus-ring-space) * -1)");
		expect(sidebarSource).toContain("margin-block: calc(var(--sidebar-focus-ring-space) * -1)");
		expect(sidebarSource).toContain("padding-inline: var(--sidebar-focus-ring-space)");
		expect(sidebarSource).toContain("padding-block: var(--sidebar-focus-ring-space)");
		expect(sidebarSource).toContain("overflow-x: hidden");
		expect(sidebarSource).toContain("overflow-y: auto");
		expect(sidebarSource).toContain("scrollbar-width: thin");
	});

	it("uses routed navigation without a duplicate home body", () => {
		expect(siteSurfaceSource).toContain('href={localizeSitePathname("/", selectedLocale)}');
		expect(siteSurfaceSource).not.toContain('href="#');
	});

	it("keeps placeholder section labels available to assistive tech only", () => {
		expect(surfaceSource).toContain(
			'<section class="content-section" aria-labelledby="section-title">',
		);
		expect(surfaceSource).toContain(
			'<h1 id="section-title" class="sr-only">{activeSectionLabel}</h1>',
		);
		expect(surfaceSource).not.toContain(".content-section h1");
	});

	it("renders works as a filterable public card list", () => {
		expect(worksModuleExists).toBe(true);
		expect(surfaceSource).toContain('import WorksSurface from "$lib/works-surface.svelte"');
		expect(surfaceSource).toContain('const isWorksSection = $derived(activePath === "/works")');
		expect(surfaceSource).toContain("<WorksSurface");
		expect(worksSource).toContain('import.meta.glob("../content/works/**/meta.json"');
		expect(worksSource).toContain("WORK_FILTER_QUERY_KEYS");
		expect(worksSource).toContain("filterWorks");
		expect(worksSource).toContain("getWorkFilterOptions");
		expect(worksSource).toContain("parseWorkFilters");
		expect(workCoreSource).toContain("workLocales = siteLocales");
		expect(workMetaFilePaths).toEqual([
			"mustflow/meta.json",
			"quickquack/meta.json",
			"tessera/meta.json",
			"workduck/meta.json",
		]);
		expect(workJsonFilePaths).toEqual([
			"mustflow/en.json",
			"mustflow/es.json",
			"mustflow/fr.json",
			"mustflow/hi.json",
			"mustflow/ko.json",
			"mustflow/meta.json",
			"mustflow/zh.json",
			"quickquack/en.json",
			"quickquack/es.json",
			"quickquack/fr.json",
			"quickquack/hi.json",
			"quickquack/ko.json",
			"quickquack/meta.json",
			"quickquack/zh.json",
			"tessera/en.json",
			"tessera/es.json",
			"tessera/fr.json",
			"tessera/hi.json",
			"tessera/ko.json",
			"tessera/meta.json",
			"tessera/zh.json",
			"workduck/en.json",
			"workduck/es.json",
			"workduck/fr.json",
			"workduck/hi.json",
			"workduck/ko.json",
			"workduck/meta.json",
			"workduck/zh.json",
		]);
		expect(worksSurfaceSource).toContain('class="works-filters"');
		expect(worksSurfaceSource).toContain('id="works-search"');
		expect(worksSurfaceSource).toContain('id="works-tag"');
		expect(worksSurfaceSource).toContain('id="works-language"');
		expect(worksSurfaceSource).toContain("filterWorks(localizedWorks, filters)");
		expect(worksSurfaceSource).toContain("getWorkFilterOptions(localizedWorks)");
		expect(worksSurfaceSource).toContain("parseWorkFilters");
		expect(worksSurfaceSource).toContain("works_clear_filters");
		expect(worksSurfaceSource).toContain("works_results_label");
		expect(worksSurfaceSource).toContain('class="works-list"');
		expect(worksSurfaceSource).toContain('class="work-card"');
		expect(worksSurfaceSource).toContain("repeat(auto-fill");
		expect(worksSurfaceSource).not.toContain("repeat(auto-fit");
		expect(worksSurfaceSource).toContain("grid-auto-rows: 1fr");
		expect(worksSurfaceSource).toContain("align-items: stretch");
		expect(worksSurfaceSource).toContain("min-height: 100%");
		expect(worksSurfaceSource).toContain("margin-top: auto");
		expect(worksSurfaceSource).toContain("getWorksForLocale(workItems, currentLocale)");
		expect(worksSurfaceSource).toContain("getWorkStatusLabel(work.status)");
		expect(worksSurfaceSource).toContain("works_license_label");
		expect(worksSurfaceSource).toContain("{#if work.license}");
		expect(worksSurfaceSource).toContain("works_languages_label");
		expect(worksSurfaceSource).toContain("work.languages");
		expect(worksSurfaceSource).not.toContain("works_updated_label");
		expect(worksSurfaceSource).not.toContain("work.updatedAt");
		expect(worksSurfaceSource).toContain("hasWorkDetails");
		expect(worksSurfaceSource).toContain("{#if work.summary}");
		expect(worksSurfaceSource).toContain("{#if work.tags.length > 0}");
		expect(worksSurfaceSource).toContain("getWorkTagLabel(tag)");
		expect(worksSurfaceSource).toContain("getWorkLinks(work.links)");
		expect(worksSurfaceSource).toContain('class="work-link-disabled"');
		expect(worksSurfaceSource).toContain("disabled");
		expect(worksSurfaceSource).toContain("noopener noreferrer");
		expect(worksSurfaceSource).not.toContain("work_tag_deploy_soon");
		expect(worksSurfaceSource).not.toContain("deploy-soon");
		expect(worksSurfaceSource).not.toContain("category");
	});

	it("uses Tailwind v4 utilities for shared styling primitives", () => {
		expect(layoutCss).toContain("@utility site-backdrop");
		expect(siteSurfaceSource).toContain("site-backdrop");
		expect(errorSource).toContain("site-backdrop");
		expect(siteSurfaceSource).toContain('class="sr-only"');
		expect(siteSurfaceSource).not.toContain("visually-hidden");
	});

	it("uses shared backdrop colors as UI tokens", () => {
		expect(layoutCss).toContain("--water: oklch(");
		expect(layoutCss).toContain("--moss: oklch(");
		expect(layoutCss).toContain("--bronze: oklch(");
		expect(layoutCss).toContain("--paper: oklch(");
		expect(layoutCss).toContain("--stone: oklch(");
		expect(layoutCss).toContain("--wildflower: oklch(");
		expect(layoutCss).toContain("--mode-control-background");
		expect(layoutCss).toContain("--mode-control-foreground");
		expect(siteSurfaceSource).toContain("var(--mode-control-background)");
		expect(siteSurfaceSource).toContain("var(--mode-control-foreground)");
		expect(siteSurfaceSource).toContain("border-bottom: 1px solid color-mix");
	});

	it("keeps light and dark theme surfaces in semantic tokens", () => {
		expect(appHtmlSource).toContain('<meta name="color-scheme" content="light dark" />');
		expect(layoutSource).toContain('name="theme-color"');
		expect(layoutCss).toContain("color-scheme: light");
		expect(layoutCss).toContain("color-scheme: dark");
		expect(layoutCss).toContain("--app-background");
		expect(layoutCss).toContain("--selection-background");
		expect(layoutCss).toContain("--selection-foreground");
		expect(layoutCss).toContain("::selection");
		expect(layoutCss).toContain("background: var(--selection-background)");
		expect(layoutCss).toContain("color: var(--selection-foreground)");
		expect(layoutCss).toContain("--backdrop-water");
		expect(layoutCss).toContain("--backdrop-grid");
		expect(layoutCss).toContain("--display-heading-shadow");
		expect(siteSurfaceSource).toContain("var(--display-heading-shadow)");
	});

	it("renders a readable custom error surface", () => {
		expect(errorSource).toContain("page.status");
		expect(errorSource).toContain("function handleBack");
		expect(errorSource).toContain("document.referrer");
		expect(errorSource).toContain('window.location.assign("/")');
		expect(errorSource).toContain("--error-secondary-foreground");
		expect(errorSource).toContain("type ErrorLocale");
		expect(errorSource).toContain("getLocale()");
		expect(errorSource).toContain('pathname === "/ko" || pathname.startsWith("/ko/")');
		expect(errorSource).toContain("m.error_home({}, { locale: errorLocale })");
		expect(errorSource).toContain("m.error_back({}, { locale: errorLocale })");
		expect(errorSource).toContain("error-shell");
		expect(errorSource).toContain("error-panel");
		expect(errorSource).not.toContain("홈으로");
		expect(errorSource).not.toContain(">뒤로<");
	});
});
