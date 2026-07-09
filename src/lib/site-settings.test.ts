import { describe, expect, it } from "vitest";
import {
	isAdvertisingConsentValue,
	siteAdvertisingConsentChangeEvent,
	siteAdvertisingConsentStorageKey,
} from "./site-advertising-consent";
import {
	isAnalyticsConsentValue,
	siteAnalyticsConsentChangeEvent,
	siteAnalyticsConsentStorageKey,
} from "./site-analytics-core";
import {
	defaultSettingsTab,
	languageShortcutByKey,
	languageShortcutByLocale,
	navigationPathByShortcut,
	navigationShortcutByHref,
	settingsTabs,
	themeChoices,
	themeShortcutByKey,
} from "./site-settings-model";
import {
	analyticsConsentSource,
	deployWorkflowSource,
	enMessagesSource,
	koMessagesSource,
	sidebarSource,
} from "./test-support/site-test-sources";

describe("site settings", () => {
	it("keeps analytics and advertising consent as explicit opt-in values", () => {
		expect(siteAnalyticsConsentStorageKey).toBe("0disoft:analytics-consent");
		expect(siteAnalyticsConsentChangeEvent).toBe("0disoft:analytics-consent-change");
		expect(isAnalyticsConsentValue("granted")).toBe(true);
		expect(isAnalyticsConsentValue("denied")).toBe(true);
		expect(isAnalyticsConsentValue("allowed")).toBe(false);

		expect(siteAdvertisingConsentStorageKey).toBe("0disoft:advertising-consent");
		expect(siteAdvertisingConsentChangeEvent).toBe("0disoft:advertising-consent-change");
		expect(isAdvertisingConsentValue("granted")).toBe(true);
		expect(isAdvertisingConsentValue("denied")).toBe(true);
		expect(isAdvertisingConsentValue("allowed")).toBe(false);
	});

	it("keeps privacy settings labels concise and localized", () => {
		const englishMessages = JSON.parse(enMessagesSource) as Record<string, string>;
		const koreanMessages = JSON.parse(koMessagesSource) as Record<string, string>;

		expect(englishMessages.settings_privacy_tab).toBe("Privacy");
		expect(englishMessages.settings_analytics_label).toBe("Analytics");
		expect(englishMessages.settings_advertising_label).toBe("Ads");
		expect(englishMessages.settings_privacy_policy_link).toBe("Privacy");
		expect(englishMessages.analytics_consent_accept).toBe("Allow");
		expect(koreanMessages.settings_privacy_tab).toBe("개인정보");
		expect(koreanMessages.settings_analytics_label).toBe("분석");
		expect(koreanMessages.settings_advertising_label).toBe("광고");
		expect(koreanMessages.settings_privacy_policy_link).toBe("개인정보 안내");
		expect(koreanMessages.analytics_consent_accept).toBe("허용");
	});

	it("routes settings privacy controls through the consent storage helpers", () => {
		expect(settingsTabs).toEqual(["theme", "language", "privacy"]);
		expect(defaultSettingsTab).toBe("theme");
		expect(themeChoices).toEqual(["light", "dark", "system"]);
		expect(navigationShortcutByHref).toEqual({
			"/manifesto": "M",
			"/blog": "B",
			"/works": "W",
		});
		expect(navigationPathByShortcut.b).toBe("/blog");
		expect(languageShortcutByLocale).toEqual({
			en: "E",
			zh: "C",
			es: "S",
			fr: "F",
			hi: "H",
			ko: "K",
		});
		expect(languageShortcutByKey.k).toBe("ko");
		expect(themeShortcutByKey).toEqual({ i: "light", d: "dark", s: "system" });
		expect(sidebarSource).toContain("readStoredAnalyticsConsent");
		expect(sidebarSource).toContain("writeStoredAnalyticsConsent");
		expect(sidebarSource).toContain("readStoredAdvertisingConsent");
		expect(sidebarSource).toContain("writeStoredAdvertisingConsent");
		expect(sidebarSource).toContain('href={localizeSitePathname("/privacy", selectedLocale)}');
		expect(analyticsConsentSource).toContain("writeConfiguredServiceConsent(true)");
		expect(analyticsConsentSource).toContain("writeConfiguredServiceConsent(false)");
	});

	it("passes runtime privacy service configuration into the Pages build", () => {
		expect(deployWorkflowSource).toContain(
			"PUBLIC_GA4_MEASUREMENT_ID: ${{ vars.PUBLIC_GA4_MEASUREMENT_ID }}",
		);
		expect(deployWorkflowSource).toContain("PUBLIC_AD_PROVIDER: ${{ vars.PUBLIC_AD_PROVIDER }}");
		expect(deployWorkflowSource).toContain("PUBLIC_AD_CLIENT_ID: ${{ vars.PUBLIC_AD_CLIENT_ID }}");
		expect(deployWorkflowSource).toContain(
			"PUBLIC_BLOG_POST_AD_SLOT: ${{ vars.PUBLIC_BLOG_POST_AD_SLOT }}",
		);
	});
});
