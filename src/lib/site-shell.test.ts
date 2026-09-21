import { describe, expect, it } from "vitest";
import { getIndiehackersCopy } from "./server/indiehackers";
import {
	getKeyboardFocusIntent,
	isModifiedKeyEvent,
	resolveAdjacentFocusIndex,
	resolveBoundaryFocusIndex,
} from "./site-keyboard";
import {
	defaultSettingsTab,
	languageShortcutByLocale,
	navigationShortcutByHref,
	settingsTabs,
	themeChoices,
} from "./site-settings-model";
import {
	getSiteSurfacePageTitle,
	getSiteSurfaceSectionKind,
	getSiteSurfaceSectionLabel,
} from "./site-surface-model";
import { siteProfile } from "./site-profile";
import {
	appHtmlSource,
	errorSource,
	hooksSource,
	iconButtonSource,
	indiehackersSurfaceSource,
	layoutCss,
	localeFontsSource,
	layoutSource,
	navigationModuleExists,
	navigationSource,
	sectionRouteSource,
	sidebarActionSource,
	sidebarSource,
	siteSurfaceSource,
	surfaceSource,
} from "./test-support/site-test-sources";

describe("site shell", () => {
	it("keeps public profile facts in one source", () => {
		expect(siteProfile.name).toBe("0disoft");
		expect(siteProfile.origin).toBe("https://0disoft.github.io");
		expect(siteProfile.navigation).toEqual([{ label: "Indiehackers", href: "/indiehackers" }]);
		expect(siteProfile.navigation.map((item) => item.label)).not.toContain("홈");
		expect(siteProfile.navigation.every((item) => !item.href.startsWith("#"))).toBe(true);
		expect(siteProfile.links).toEqual([
			{
				label: "Sponsor",
				href: "https://github.com/sponsors/0disoft",
			},
		]);
	});

	it("gives the projects shortcut to navigation, not the sponsor link", () => {
		expect(sidebarSource).toContain("navigationPathByShortcut[key]");
		expect(sidebarSource).not.toContain("openSponsorLink");
		expect(sidebarSource).not.toContain('shortcut="P"');
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

		expect(getSectionEntries()).toEqual([{ section: "indiehackers" }]);
		expect(sectionSlugToPath("indiehackers")).toBe("/indiehackers");
		expect(sectionSlugToPath("blog")).toBeNull();
		expect(sectionSlugToPath("projects")).toBeNull();
		expect(sectionSlugToPath("about")).toBeNull();
		expect(sectionSlugToPath("uses")).toBeNull();
		expect(sectionSlugToPath("roadmap")).toBeNull();
		expect(sectionSlugToPath("contact")).toBeNull();
		expect(sectionSlugToPath("missing-section")).toBeNull();
		expect(sectionSlugToPath("missing")).toBeNull();
		expect(findNavigationItemByPath("/missing-section")).toBeUndefined();
		expect(findNavigationItemByPath("/roadmap")).toBeUndefined();
		expect(findNavigationItemByPath("/contact")).toBeUndefined();
	});

	it("keeps landmarks and grouped controls semantic", () => {
		expect(siteSurfaceSource).toContain('<div class="site-frame site-backdrop">');
		expect(siteSurfaceSource).toContain('id="main-content"');
		expect(siteSurfaceSource).toContain('class="content-shell"');
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
		expect(settingsTabs).toEqual(["theme", "language", "privacy"]);
		expect(defaultSettingsTab).toBe("theme");
		expect(themeChoices).toEqual(["light", "dark", "system"]);
		expect(navigationShortcutByHref).toEqual({ "/indiehackers": "I" });
		expect(languageShortcutByLocale.ko).toBe("K");
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

	it("keeps keyboard focus movement in reusable UI helpers", () => {
		expect(getKeyboardFocusIntent("ArrowRight")).toEqual({ kind: "adjacent", direction: 1 });
		expect(getKeyboardFocusIntent("ArrowDown")).toEqual({ kind: "adjacent", direction: 1 });
		expect(getKeyboardFocusIntent("ArrowLeft")).toEqual({ kind: "adjacent", direction: -1 });
		expect(getKeyboardFocusIntent("ArrowUp")).toEqual({ kind: "adjacent", direction: -1 });
		expect(getKeyboardFocusIntent("Home")).toEqual({ kind: "boundary", boundary: "first" });
		expect(getKeyboardFocusIntent("End")).toEqual({ kind: "boundary", boundary: "last" });
		expect(getKeyboardFocusIntent("B")).toBeNull();
		expect(resolveAdjacentFocusIndex(4, 1, 1)).toBe(2);
		expect(resolveAdjacentFocusIndex(4, 0, -1)).toBe(3);
		expect(resolveAdjacentFocusIndex(4, -1, 1, { missing: "by-direction" })).toBe(0);
		expect(resolveAdjacentFocusIndex(4, -1, -1, { missing: "by-direction" })).toBe(3);
		expect(resolveAdjacentFocusIndex(4, -1, -1, { missing: "first" })).toBe(0);
		expect(resolveAdjacentFocusIndex(0, -1, 1)).toBeNull();
		expect(resolveBoundaryFocusIndex(4, "first")).toBe(0);
		expect(resolveBoundaryFocusIndex(4, "last")).toBe(3);
		expect(resolveBoundaryFocusIndex(0, "first")).toBeNull();
		expect(
			isModifiedKeyEvent({
				altKey: false,
				ctrlKey: false,
				metaKey: false,
				shiftKey: true,
			}),
		).toBe(false);
		expect(
			isModifiedKeyEvent(
				{ altKey: false, ctrlKey: false, metaKey: false, shiftKey: true },
				{ shiftKey: true },
			),
		).toBe(true);
	});

	it("keeps the desktop sidebar stable while mobile navigation stays compact", () => {
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
		expect(sidebarSource).toContain("grid-template-columns: minmax(0, 1fr) auto");
		expect(sidebarSource).toContain("overflow-x: auto");
		expect(sidebarSource).toContain("min-width: max-content");
		expect(sidebarSource).toContain("width: min(9rem, 42vw)");
		expect(sidebarSource).toContain(".settings-panel :global(.sidebar-action)");
		expect(sidebarSource).toContain("clip-path: inset(50%)");
	});

	it("uses routed navigation without a duplicate home body", () => {
		expect(siteSurfaceSource).toContain('href={localizeSitePathname("/", selectedLocale)}');
		expect(siteSurfaceSource).not.toContain('href="#');
		expect(getSiteSurfaceSectionKind("/")).toBe("home");
		expect(getSiteSurfacePageTitle("/", "en")).toBe(siteProfile.name);
	});

	it("renders indiehackers as a short reading page", () => {
		expect(surfaceSource).toContain('import IndiehackersSurface from "$lib/indiehackers-surface.svelte"');
		expect(getSiteSurfaceSectionKind("/indiehackers")).toBe("indiehackers");
		expect(getSiteSurfaceSectionLabel("/indiehackers", "ko")).toBe("인디해커들");
		expect(surfaceSource).toContain("<IndiehackersSurface");
		expect(getIndiehackersCopy("en").title).toBe("Indiehackers");
		expect(getIndiehackersCopy("ko").title).toBe("인디해커들");
		expect(getIndiehackersCopy("ko").paragraphs[0]).toContain("인디해커");
	});

	it("does not expose retired roadmap or contact sections", async () => {
		const { getSectionEntries, sectionSlugToPath } = await import("./site-navigation");

		expect(getSectionEntries().map((entry) => entry.section)).not.toContain("roadmap");
		expect(getSectionEntries().map((entry) => entry.section)).not.toContain("contact");
		expect(sectionSlugToPath("roadmap")).toBeNull();
		expect(sectionSlugToPath("contact")).toBeNull();
		expect(siteSurfaceSource).not.toContain("placeholder-section");
		expect(siteSurfaceSource).not.toContain("section_placeholder_status");
		expect(siteSurfaceSource).not.toContain("roadmap_placeholder_body");
		expect(siteSurfaceSource).not.toContain("contact_placeholder_body");
	});

	it("does not expose retired blog, projects, about, or uses sections", async () => {
		const { getSectionEntries, sectionSlugToPath } = await import("./site-navigation");

		expect(getSectionEntries().map((entry) => entry.section)).not.toContain("blog");
		expect(getSectionEntries().map((entry) => entry.section)).not.toContain("projects");
		expect(getSectionEntries().map((entry) => entry.section)).not.toContain("about");
		expect(getSectionEntries().map((entry) => entry.section)).not.toContain("uses");
		expect(sectionSlugToPath("blog")).toBeNull();
		expect(sectionSlugToPath("projects")).toBeNull();
		expect(sectionSlugToPath("about")).toBeNull();
		expect(sectionSlugToPath("uses")).toBeNull();
		expect(surfaceSource).not.toContain("BlogSurface");
		expect(surfaceSource).not.toContain("WorksSurface");
		expect(surfaceSource).not.toContain("AboutSurface");
		expect(surfaceSource).not.toContain("UsesSurface");
	});

	it("uses Tailwind v4 utilities for shared styling primitives", () => {
		expect(layoutCss).toContain("@utility site-backdrop");
		expect(siteSurfaceSource).toContain("site-backdrop");
		expect(errorSource).toContain("site-backdrop");
		expect(siteSurfaceSource).toContain('class="sr-only"');
		expect(siteSurfaceSource).not.toContain("visually-hidden");
	});

	it("loads Noto stylesheets only for matching CJK and Devanagari locales", () => {
		expect(layoutCss).not.toContain("@fontsource-variable/noto-sans-kr");
		expect(layoutCss).not.toContain("@fontsource-variable/noto-sans-sc");
		expect(layoutCss).not.toContain("@fontsource-variable/noto-sans-devanagari");
		expect(layoutSource).toContain("localeFontStylesheets");
		expect(layoutSource).toContain('rel="stylesheet"');
		expect(localeFontsSource).toContain("@fontsource-variable/noto-sans-kr/index.css?url");
		expect(localeFontsSource).toContain("@fontsource-variable/noto-sans-sc/index.css?url");
		expect(localeFontsSource).toContain(
			"@fontsource-variable/noto-sans-devanagari/index.css?url",
		);
		expect(localeFontsSource).not.toContain("en:");
		expect(localeFontsSource).not.toContain("es:");
		expect(localeFontsSource).not.toContain("fr:");

		const koreanRule = layoutCss.slice(
			layoutCss.indexOf("html:lang(ko)"),
			layoutCss.indexOf("html:lang(zh)"),
		);
		const chineseRule = layoutCss.slice(
			layoutCss.indexOf("html:lang(zh)"),
			layoutCss.indexOf("html:lang(hi)"),
		);
		const hindiRule = layoutCss.slice(layoutCss.indexOf("html:lang(hi)"));

		expect(koreanRule).toContain("Noto Sans KR Variable");
		expect(koreanRule).not.toContain("Inter Variable");
		expect(chineseRule).toContain("Noto Sans SC Variable");
		expect(chineseRule).not.toContain("Inter Variable");
		expect(hindiRule).toContain("Noto Sans Devanagari Variable");
		expect(hindiRule).not.toContain("Inter Variable");
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
		expect(layoutCss).toContain("--focus-ring:");
		expect(siteSurfaceSource).toContain("var(--mode-control-background)");
		expect(siteSurfaceSource).toContain("var(--mode-control-foreground)");
		expect(siteSurfaceSource).toContain("var(--focus-ring)");
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
		expect(indiehackersSurfaceSource).toContain("var(--display-heading-shadow)");
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
