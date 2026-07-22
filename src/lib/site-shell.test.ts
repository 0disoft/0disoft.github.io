import { describe, expect, it } from "vitest";
import { getManifestoCopy } from "./manifesto";
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
import { WORK_FILTER_QUERY_KEYS, workItems, workLocales } from "./works";
import {
	appHtmlSource,
	errorSource,
	hooksSource,
	iconButtonSource,
	layoutCss,
	layoutSource,
	manifestoSource,
	manifestoKoreanMarkdown,
	manifestoMarkdownFilePaths,
	manifestoSurfaceSource,
	navigationModuleExists,
	navigationSource,
	sectionRouteSource,
	sidebarActionSource,
	sidebarSource,
	siteSurfaceSource,
	surfaceSource,
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
			{ label: "Works", href: "/works" },
			{ label: "Blog", href: "/blog" },
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
			{ section: "works" },
			{ section: "blog" },
		]);
		expect(sectionSlugToPath("blog")).toBe("/blog");
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
		expect(settingsTabs).toEqual(["theme", "language", "privacy"]);
		expect(defaultSettingsTab).toBe("theme");
		expect(themeChoices).toEqual(["light", "dark", "system"]);
		expect(navigationShortcutByHref).toEqual({
			"/manifesto": "M",
			"/blog": "B",
			"/works": "W",
		});
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

	it("renders the manifesto with localized copy slots and a right-side share panel", () => {
		expect(surfaceSource).toContain('import ManifestoSurface from "$lib/manifesto-surface.svelte"');
		expect(getSiteSurfaceSectionKind("/manifesto")).toBe("manifesto");
		expect(getSiteSurfaceSectionLabel("/manifesto", "ko")).toBe("매니페스토");
		expect(surfaceSource).toContain("<ManifestoSurface");
		expect(manifestoKoreanMarkdown).toContain("AI와 지역 숙의로 만드는 더 나은 규칙");
		expect(manifestoSource).toContain('import.meta.glob<string>("../content/manifesto/*.md"');
		expect(manifestoSource).toContain('const fallbackManifestoLocale = "ko"');
		expect(manifestoSource).toContain("manifestoCopyByLocale[locale] ?? fallbackCopy");
		expect(manifestoMarkdownFilePaths).toEqual([
			"en.md",
			"es.md",
			"fr.md",
			"hi.md",
			"ko.md",
			"zh.md",
		]);
		expect(getManifestoCopy("en").title).toBe("AI and Local Deliberation for Better Rules");
		expect(getManifestoCopy("es").title).toBe("IA y deliberación local para mejores reglas");
		expect(getManifestoCopy("fr").title).toBe(
			"L'IA et la délibération locale pour de meilleures règles",
		);
		expect(getManifestoCopy("hi").title).toBe("AI और स्थानीय विचार-विमर्श से बेहतर नियम");
		expect(getManifestoCopy("zh").title).toBe("AI与地方协商共创更好规则");
		expect(getManifestoCopy("ko").paragraphs).toContain(
			"중앙이 모든 삶을 재단하려는 방식은 이미 한계를 드러내고 있다. AI가 할 수 있는 일은 그 한계를 보완하는 것이지, 그 한계를 대신하는 것이 아니다. AI는 지역 실험이 더 안전하고, 더 정보에 기반한 방식으로 이루어질 수 있도록 돕는 도구일 뿐이다. 결국 어떤 사회를 만들어갈 것인지는, 여전히 우리 인간이 선택해야 할 문제다.",
		);
		expect(manifestoMarkdownFilePaths).toHaveLength(6);
		expect(manifestoSurfaceSource).toContain("getManifestoCopy(selectedLocale)");
		expect(manifestoSurfaceSource).toContain('localizeSitePathname("/manifesto", selectedLocale)');
		expect(manifestoSurfaceSource).toContain("copyShareUrl");
		expect(manifestoSurfaceSource).toContain("shareWithDevice");
		expect(manifestoSurfaceSource).toContain("copyTextToClipboard");
		expect(manifestoSurfaceSource).toContain("buildBlogShareLinks");
		expect(manifestoSurfaceSource).toContain("m.blog_post_copy_link");
		expect(manifestoSurfaceSource).toContain("m.blog_post_share_device");
		expect(manifestoSurfaceSource).toContain("getSharePlatformLabel");
		expect(manifestoSurfaceSource).toContain("getSharePlatformIcon");
		expect(manifestoSurfaceSource).toContain("<Share2");
		expect(manifestoSurfaceSource).toContain("<Send");
		expect(manifestoSurfaceSource).toContain("<MessageCircle");
		expect(manifestoSurfaceSource).toContain("<BrandIcon");
		expect(manifestoSurfaceSource).toContain('class="manifesto-reading-layout"');
		expect(manifestoSurfaceSource).toContain('class="manifesto-sidecar"');
		expect(manifestoSurfaceSource).toContain('class="manifesto-share"');
		expect(manifestoSurfaceSource).toContain('class="manifesto-share-grid"');
		expect(manifestoSurfaceSource).toContain('class="manifesto-share-icon-button"');
		expect(manifestoSurfaceSource).toContain('grid-template-areas: "body sidecar"');
		expect(manifestoSurfaceSource).toContain("position: sticky");
		expect(manifestoSurfaceSource).toContain(
			"grid-template-columns: repeat(4, var(--manifesto-share-icon-size))",
		);
		expect(manifestoSurfaceSource).toContain('aria-live="polite"');
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

	it("renders works as a filterable public card list", () => {
		expect(worksModuleExists).toBe(true);
		expect(surfaceSource).toContain('import WorksSurface from "$lib/works-surface.svelte"');
		expect(getSiteSurfaceSectionKind("/works")).toBe("works");
		expect(surfaceSource).toContain("<WorksSurface");
		expect(worksSource).toContain('import.meta.glob("../content/works/**/meta.json"');
		expect(WORK_FILTER_QUERY_KEYS).toEqual({
			query: "q",
			tag: "tag",
			language: "language",
		});
		expect(workLocales).toEqual(["en", "zh", "es", "fr", "hi", "ko"]);
		expect(workItems.map((work) => work.slug)).toContain("buildmarks");
		expect(workItems.map((work) => work.slug)).toContain("clarissimi");
		expect(workItems.map((work) => work.slug)).toContain("dc-code-paste");
		expect(workItems.map((work) => work.slug)).toContain("fairyc");
		expect(workItems.map((work) => work.slug)).toContain("krasis");
		expect(workItems.map((work) => work.slug)).toContain("laqu");
		expect(workItems.map((work) => work.slug)).toContain("mensor");
		expect(workItems.map((work) => work.slug)).toContain("mustflow");
		expect(workItems.map((work) => work.slug)).toContain("ohrisk");
		expect(workItems.map((work) => work.slug)).toContain("ssealed");
		expect(workItems.map((work) => work.slug)).toContain("velox");
		expect(workMetaFilePaths).toEqual([
			"buildmarks/meta.json",
			"clarissimi/meta.json",
			"dc-code-paste/meta.json",
			"fairyc/meta.json",
			"krasis/meta.json",
			"laqu/meta.json",
			"mensor/meta.json",
			"mustflow/meta.json",
			"ohrisk/meta.json",
			"ssealed/meta.json",
			"velox/meta.json",
		]);
		expect(workJsonFilePaths).toEqual([
			"buildmarks/en.json",
			"buildmarks/es.json",
			"buildmarks/fr.json",
			"buildmarks/hi.json",
			"buildmarks/ko.json",
			"buildmarks/meta.json",
			"buildmarks/zh.json",
			"clarissimi/en.json",
			"clarissimi/es.json",
			"clarissimi/fr.json",
			"clarissimi/hi.json",
			"clarissimi/ko.json",
			"clarissimi/meta.json",
			"clarissimi/zh.json",
			"dc-code-paste/en.json",
			"dc-code-paste/es.json",
			"dc-code-paste/fr.json",
			"dc-code-paste/hi.json",
			"dc-code-paste/ko.json",
			"dc-code-paste/meta.json",
			"dc-code-paste/zh.json",
			"fairyc/en.json",
			"fairyc/es.json",
			"fairyc/fr.json",
			"fairyc/hi.json",
			"fairyc/ko.json",
			"fairyc/meta.json",
			"fairyc/zh.json",
			"krasis/en.json",
			"krasis/es.json",
			"krasis/fr.json",
			"krasis/hi.json",
			"krasis/ko.json",
			"krasis/meta.json",
			"krasis/zh.json",
			"laqu/en.json",
			"laqu/es.json",
			"laqu/fr.json",
			"laqu/hi.json",
			"laqu/ko.json",
			"laqu/meta.json",
			"laqu/zh.json",
			"mensor/en.json",
			"mensor/es.json",
			"mensor/fr.json",
			"mensor/hi.json",
			"mensor/ko.json",
			"mensor/meta.json",
			"mensor/zh.json",
			"mustflow/en.json",
			"mustflow/es.json",
			"mustflow/fr.json",
			"mustflow/hi.json",
			"mustflow/ko.json",
			"mustflow/meta.json",
			"mustflow/zh.json",
			"ohrisk/en.json",
			"ohrisk/es.json",
			"ohrisk/fr.json",
			"ohrisk/hi.json",
			"ohrisk/ko.json",
			"ohrisk/meta.json",
			"ohrisk/zh.json",
			"ssealed/en.json",
			"ssealed/es.json",
			"ssealed/fr.json",
			"ssealed/hi.json",
			"ssealed/ko.json",
			"ssealed/meta.json",
			"ssealed/zh.json",
			"velox/en.json",
			"velox/es.json",
			"velox/fr.json",
			"velox/hi.json",
			"velox/ko.json",
			"velox/meta.json",
			"velox/zh.json",
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
