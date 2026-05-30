import { describe, expect, it } from "vitest";
import {
	analyticsBootstrapSource,
	analyticsConsentSource,
	analyticsCoreSource,
	analyticsRuntimeSource,
	advertisingConsentSource,
	deployWorkflowSource,
	layoutSource,
	sidebarSource,
	siteSurfaceSource,
} from "./test-support/site-test-sources";

describe("site settings", () => {
	it("opens settings on the theme tab before language choices", () => {
		expect(siteSurfaceSource).toContain('let activeSettingsTab = $state<SettingsTab>("theme")');
		expect(siteSurfaceSource).toContain("function selectSettingsTab(tab: SettingsTab)");
		expect(siteSurfaceSource).toContain('onclick={() => selectSettingsTab("theme")}');
		expect(siteSurfaceSource).toContain('onclick={() => selectSettingsTab("language")}');
		expect(siteSurfaceSource.indexOf('id="settings-theme-panel"')).toBeLessThan(
			siteSurfaceSource.indexOf('id="settings-language-panel"'),
		);
	});

	it("exposes settings keyboard shortcuts and focus movement", () => {
		expect(siteSurfaceSource).toContain('title={withShortcut(settingsLabel, "S")}');
		expect(siteSurfaceSource).toContain("m.settings_trigger_label");
		expect(siteSurfaceSource).toContain("m.sponsor_label");
		expect(siteSurfaceSource).toContain("m.nav_manifesto");
		expect(siteSurfaceSource).toContain("const navigationShortcutByHref");
		expect(siteSurfaceSource).toContain('"/manifesto": "M"');
		expect(siteSurfaceSource).toContain('"/blog": "B"');
		expect(siteSurfaceSource).toContain('"/works": "W"');
		expect(siteSurfaceSource).toContain('"/roadmap": "R"');
		expect(siteSurfaceSource).toContain('"/contact": "C"');
		expect(siteSurfaceSource).toContain("const navigationPathByShortcut");
		expect(siteSurfaceSource).toContain('if (key === "p")');
		expect(siteSurfaceSource).toContain('shortcut="P"');
		expect(siteSurfaceSource).toContain('shortcut="S"');
		expect(siteSurfaceSource).toContain('if (key === "s")');
		expect(siteSurfaceSource).toContain("m.settings_theme_tab");
		expect(siteSurfaceSource).toContain("m.settings_language_tab");
		expect(siteSurfaceSource).toContain("m.theme_light");
		expect(siteSurfaceSource).toContain('class:active={selectedTheme === "light"}');
		expect(siteSurfaceSource).toContain('aria-pressed={selectedTheme === "light"}');
		expect(siteSurfaceSource).not.toContain('title="Light (L)"');
		expect(siteSurfaceSource).toContain("m.theme_dark");
		expect(siteSurfaceSource).toContain('class:active={selectedTheme === "dark"}');
		expect(siteSurfaceSource).toContain('aria-pressed={selectedTheme === "dark"}');
		expect(siteSurfaceSource).toContain("m.theme_system");
		expect(siteSurfaceSource).toContain('class:active={selectedTheme === "system"}');
		expect(siteSurfaceSource).toContain('aria-pressed={selectedTheme === "system"}');
		expect(siteSurfaceSource).toContain("const themeShortcutByKey");
		expect(siteSurfaceSource).toContain('i: "light"');
		expect(siteSurfaceSource).toContain("const languageShortcutByKey");
		expect(siteSurfaceSource).toContain('c: "zh"');
		expect(siteSurfaceSource).toContain("focusAdjacentSettingsControl(1)");
		expect(siteSurfaceSource).toContain("focusAdjacentSettingsControl(-1)");
		expect(siteSurfaceSource).toContain('key === "arrowright" || key === "arrowdown"');
		expect(siteSurfaceSource).toContain('key === "arrowleft" || key === "arrowup"');
	});

	it("loads GA4 only after explicit analytics consent", () => {
		expect(analyticsCoreSource).toContain("siteAnalyticsConsentStorageKey");
		expect(analyticsRuntimeSource).toContain(
			'import { env as publicEnv } from "$env/dynamic/public"',
		);
		expect(analyticsRuntimeSource).toContain("publicEnv.PUBLIC_GA4_MEASUREMENT_ID?.trim() ??");
		expect(deployWorkflowSource).toContain(
			"PUBLIC_GA4_MEASUREMENT_ID: ${{ vars.PUBLIC_GA4_MEASUREMENT_ID }}",
		);
		expect(analyticsRuntimeSource).toContain("readStoredAnalyticsConsent");
		expect(analyticsRuntimeSource).toContain("writeStoredAnalyticsConsent");
		expect(analyticsRuntimeSource).toContain("send_page_view: false");
		expect(analyticsRuntimeSource).toContain("trackGa4PageView");
		expect(analyticsBootstrapSource).toContain("afterNavigate");
		expect(analyticsBootstrapSource).toContain("readStoredAnalyticsConsent()");
		expect(analyticsBootstrapSource).toContain("siteAnalyticsConsentChangeEvent");
		expect(analyticsConsentSource).toContain("readStoredAnalyticsConsentValue");
		expect(analyticsConsentSource).toContain("readStoredAdvertisingConsentValue");
		expect(analyticsConsentSource).toContain("writeConfiguredServiceConsent(true)");
		expect(analyticsConsentSource).toContain("writeConfiguredServiceConsent(false)");
		expect(analyticsConsentSource).toContain("writeStoredAnalyticsConsent(enabled)");
		expect(analyticsConsentSource).toContain("writeStoredAdvertisingConsent(enabled)");
		expect(analyticsConsentSource).toContain("isSiteAdvertisingConfigured");
		expect(layoutSource).toContain('import SiteAnalytics from "$lib/site-analytics.svelte"');
		expect(layoutSource).toContain(
			'import SiteAnalyticsConsent from "$lib/site-analytics-consent.svelte"',
		);
		expect(layoutSource).toContain("<SiteAnalytics />");
		expect(layoutSource).toContain("<SiteAnalyticsConsent />");
		expect(sidebarSource).toContain('type SettingsTab = "theme" | "language" | "privacy"');
		expect(sidebarSource).toContain("m.settings_privacy_tab");
		expect(sidebarSource).toContain("m.settings_analytics_label");
		expect(sidebarSource).toContain("m.settings_privacy_policy_link");
		expect(sidebarSource).toContain('href={localizeSitePathname("/privacy", selectedLocale)}');
		expect(sidebarSource).toContain('class="privacy-policy-link"');
		expect(sidebarSource).toContain('target="_blank"');
		expect(sidebarSource).toContain('rel="noopener noreferrer"');
		expect(sidebarSource).toContain('role="switch"');
		expect(sidebarSource).toContain("readStoredAnalyticsConsent");
		expect(sidebarSource).toContain("writeStoredAnalyticsConsent");
	});

	it("loads ad providers only after explicit advertising consent", () => {
		expect(advertisingConsentSource).toContain("siteAdvertisingConsentStorageKey");
		expect(advertisingConsentSource).toContain("0disoft:advertising-consent");
		expect(advertisingConsentSource).toContain("siteAdvertisingConsentChangeEvent");
		expect(advertisingConsentSource).toContain("readStoredAdvertisingConsent");
		expect(advertisingConsentSource).toContain("writeStoredAdvertisingConsent");
		expect(sidebarSource).toContain("isSiteAdvertisingConfigured");
		expect(sidebarSource).toContain("readStoredAdvertisingConsent");
		expect(sidebarSource).toContain("writeStoredAdvertisingConsent");
		expect(sidebarSource).toContain("m.settings_advertising_label");
		expect(sidebarSource).toContain("m.settings_advertising_description");
	});
});
