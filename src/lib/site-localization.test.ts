import { describe, expect, it } from "vitest";
import {
	getLocalizedLanguageLabel,
	languageDisplayNameByLocale,
	toDisplayLocale,
} from "./site-labels";
import {
	getBrowserSiteLocale,
	getPathLocale,
	localizeSitePathname,
	languageOptions,
	siteLocaleCookieName,
	siteLocaleStorageKey,
	siteLocales,
	stripLocalePrefix,
	toSiteLocale,
} from "./site-locales";
import {
	additionalLocaleMessageSources,
	appHtmlSource,
	enMessagesSource,
	inlangSettingsSource,
	koMessagesSource,
	layoutSource,
	packageSource,
	viteConfigSource,
} from "./test-support/site-test-sources";

describe("site localization", () => {
	it("offers the requested settings languages", () => {
		const inlangSettings = JSON.parse(inlangSettingsSource) as {
			baseLocale: string;
			locales: string[];
			modules: string[];
		};
		const packageJson = JSON.parse(packageSource) as {
			devDependencies: Record<string, string>;
		};

		expect(inlangSettings.baseLocale).toBe("en");
		expect(inlangSettings.locales).toEqual(["en", "ko", "zh", "es", "fr", "hi"]);
		expect(inlangSettings.modules).toEqual([
			"./node_modules/@inlang/plugin-message-format/dist/index.js",
			"./node_modules/@inlang/plugin-m-function-matcher/dist/index.js",
		]);
		expect(inlangSettings.modules.every((module) => !module.startsWith("http"))).toBe(true);
		expect(packageJson.devDependencies["@inlang/plugin-message-format"]).toBe("4.4.0");
		expect(packageJson.devDependencies["@inlang/plugin-m-function-matcher"]).toBe("2.2.6");
		expect(packageSource).toContain("--strategy url cookie globalVariable baseLocale");
		expect(viteConfigSource).toContain(
			'strategy: ["url", "cookie", "globalVariable", "baseLocale"]',
		);
		expect(siteLocales).toEqual(["en", "zh", "es", "fr", "hi", "ko"]);
		expect(languageOptions).toEqual([
			{ locale: "en", label: "English" },
			{ locale: "zh", label: "Chinese" },
			{ locale: "es", label: "Spanish" },
			{ locale: "fr", label: "French" },
			{ locale: "hi", label: "Hindi" },
			{ locale: "ko", label: "Korean" },
		]);
		expect(languageDisplayNameByLocale).toEqual({
			en: "English",
			zh: "中文",
			es: "Español",
			fr: "Français",
			hi: "हिन्दी",
			ko: "한국어",
		});
		expect(getLocalizedLanguageLabel("ko", "en")).toBe("한국어");
	});

	it("switches language paths without keeping stale locale prefixes", () => {
		expect(toSiteLocale("ko-KR")).toBe("ko");
		expect(toSiteLocale("ZH-hans")).toBe("zh");
		expect(getPathLocale("/ko/blog")).toBe("ko");
		expect(getPathLocale("/blog")).toBeNull();
		expect(getBrowserSiteLocale(["de-DE", "ko-KR"])).toBe("ko");
		expect(getBrowserSiteLocale(["de-DE"])).toBe("en");
		expect(toDisplayLocale("zh")).toBe("zh");
		expect(toDisplayLocale("es")).toBe("es");
		expect(toDisplayLocale("fr")).toBe("fr");
		expect(toDisplayLocale("hi")).toBe("hi");
		expect(stripLocalePrefix("/en/blog")).toBe("/blog");
		expect(stripLocalePrefix("/zh/contact/")).toBe("/contact");
		expect(stripLocalePrefix("//attacker.example/login")).toBe("/attacker.example/login");
		expect(stripLocalePrefix("/fr//attacker.example/login")).toBe("/attacker.example/login");
		expect(localizeSitePathname("/blog", "en")).toBe("/blog");
		expect(localizeSitePathname("/en/blog", "zh")).toBe("/zh/blog");
		expect(localizeSitePathname("/en/blog", "ko")).toBe("/ko/blog");
		expect(localizeSitePathname("/ko/blog", "ko")).toBe("/ko/blog");
		expect(localizeSitePathname("/fr//attacker.example/login", "en")).toBe(
			"/attacker.example/login",
		);
		expect(localizeSitePathname("/fr//attacker.example/login", "ko")).toBe(
			"/ko/attacker.example/login",
		);
	});

	it("chooses the first client locale from url, saved preference, browser language, then English", () => {
		expect(layoutSource).toContain("getPathLocale(window.location.pathname)");
		expect(layoutSource).toContain("getPreferredClientLocale()");
		expect(layoutSource).toContain("window.location.replace");
		expect(appHtmlSource).toContain('const storageKey = "0disoft:locale"');
		expect(appHtmlSource).toContain('const cookieName = "ODISOFT_LOCALE"');
		expect(appHtmlSource).toContain("navigator.languages");
		expect(appHtmlSource).toContain("window.location.replace");
		expect(siteLocaleStorageKey).toBe("0disoft:locale");
		expect(siteLocaleCookieName).toBe("ODISOFT_LOCALE");
		expect(getBrowserSiteLocale(["de-DE", "fr-FR", "ko-KR"])).toBe("fr");
	});

	it("keeps all locale message files structurally complete", () => {
		const koMessages = JSON.parse(koMessagesSource) as Record<string, string>;
		const enMessages = JSON.parse(enMessagesSource) as Record<string, string>;
		const additionalLocaleMessages = Object.fromEntries(
			Object.entries(additionalLocaleMessageSources).map(([locale, source]) => [
				locale,
				JSON.parse(source) as Record<string, string>,
			]),
		) as Record<keyof typeof additionalLocaleMessageSources, Record<string, string>>;
		const englishKeys = Object.keys(enMessages).sort();

		expect(koMessages.error_home).toBe("홈으로");
		expect(koMessages.error_back).toBe("뒤로");
		expect(enMessages.error_home).toBe("Home");
		expect(enMessages.error_back).toBe("Back");
		expect(Object.keys(koMessages).sort()).toEqual(englishKeys);
		expect(Object.keys(additionalLocaleMessages.zh).sort()).toEqual(englishKeys);
		expect(Object.keys(additionalLocaleMessages.es).sort()).toEqual(englishKeys);
		expect(Object.keys(additionalLocaleMessages.fr).sort()).toEqual(englishKeys);
		expect(Object.keys(additionalLocaleMessages.hi).sort()).toEqual(englishKeys);
		expect(additionalLocaleMessages.zh.error_home).toBe("首页");
		expect(additionalLocaleMessages.es.error_home).toBe("Inicio");
		expect(additionalLocaleMessages.fr.error_home).toBe("Accueil");
		expect(additionalLocaleMessages.hi.error_home).toBe("होम");
	});

	it("keeps visible UI labels localized for every supported language", () => {
		const koMessages = JSON.parse(koMessagesSource) as Record<string, string>;
		const enMessages = JSON.parse(enMessagesSource) as Record<string, string>;
		const zhMessages = JSON.parse(additionalLocaleMessageSources.zh) as Record<string, string>;
		const esMessages = JSON.parse(additionalLocaleMessageSources.es) as Record<string, string>;
		const frMessages = JSON.parse(additionalLocaleMessageSources.fr) as Record<string, string>;
		const hiMessages = JSON.parse(additionalLocaleMessageSources.hi) as Record<string, string>;

		expect(enMessages.nav_manifesto).toBe("Manifesto");
		expect(enMessages.settings_trigger_label).toBe("Settings");
		expect(enMessages.sponsor_label).toBe("Sponsor");
		expect(enMessages.blog_search_label).toBe("Search");
		expect(enMessages.blog_empty_title).toBe("No posts yet.");
		expect(enMessages.blog_back_to_list).toBe("Back to blog");
		expect(enMessages.blog_post_toc_label).toBe("Contents");
		expect(enMessages.blog_post_share_label).toBe("Share");
		expect(enMessages.blog_post_copy_link).toBe("Copy link");
		expect(enMessages.blog_post_copied_link).toBe("Copied");
		expect(enMessages.blog_post_share_device).toBe("Share with device");
		expect(enMessages.blog_post_share_x).toBe("X");
		expect(enMessages.blog_post_adjacent_label).toBe("More posts");
		expect(enMessages.blog_post_previous_label).toBe("Previous post");
		expect(enMessages.blog_post_next_label).toBe("Next post");
		expect(enMessages.settings_privacy_tab).toBe("Privacy");
		expect(enMessages.settings_analytics_label).toBe("Analytics");
		expect(enMessages.settings_advertising_label).toBe("Ads");
		expect(enMessages.settings_privacy_policy_link).toBe("Privacy");
		expect(enMessages.privacy_page_title).toBe("Privacy");
		expect(enMessages.analytics_consent_accept).toBe("Allow");
		expect(koMessages.nav_manifesto).toBe("매니페스토");
		expect(koMessages.settings_trigger_label).toBe("설정");
		expect(koMessages.sponsor_label).toBe("후원하기");
		expect(koMessages.blog_clear_filters).toBe("초기화");
		expect(koMessages.blog_search_label).toBe("검색");
		expect(koMessages.blog_empty_title).toBe("아직 글이 없습니다.");
		expect(koMessages.blog_back_to_list).toBe("블로그로");
		expect(koMessages.blog_post_toc_label).toBe("목차");
		expect(koMessages.blog_post_share_label).toBe("공유하기");
		expect(koMessages.blog_post_copy_link).toBe("링크 복사");
		expect(koMessages.blog_post_copied_link).toBe("복사됨");
		expect(koMessages.blog_post_share_device).toBe("기기에서 공유");
		expect(koMessages.blog_post_share_x).toBe("X");
		expect(koMessages.blog_post_adjacent_label).toBe("다른 글");
		expect(koMessages.blog_post_previous_label).toBe("이전 글");
		expect(koMessages.blog_post_next_label).toBe("다음 글");
		expect(koMessages.settings_privacy_tab).toBe("개인정보");
		expect(koMessages.settings_analytics_label).toBe("분석");
		expect(koMessages.settings_advertising_label).toBe("광고");
		expect(koMessages.settings_privacy_policy_link).toBe("개인정보 안내");
		expect(koMessages.privacy_page_title).toBe("개인정보 안내");
		expect(koMessages.analytics_consent_accept).toBe("허용");
		expect(zhMessages.nav_blog).toBe("博客");
		expect(zhMessages.settings_trigger_label).toBe("设置");
		expect(zhMessages.blog_clear_filters).toBe("重置");
		expect(zhMessages.settings_advertising_label).toBe("广告");
		expect(zhMessages.analytics_consent_accept).toBe("允许");
		expect(zhMessages.privacy_page_title).toBe("隐私");
		expect(esMessages.nav_blog).toBe("Blog");
		expect(esMessages.settings_trigger_label).toBe("Configuración");
		expect(esMessages.blog_clear_filters).toBe("Restablecer");
		expect(esMessages.settings_advertising_label).toBe("Anuncios");
		expect(esMessages.analytics_consent_accept).toBe("Permitir");
		expect(esMessages.privacy_page_title).toBe("Privacidad");
		expect(frMessages.nav_blog).toBe("Blog");
		expect(frMessages.settings_trigger_label).toBe("Paramètres");
		expect(frMessages.blog_clear_filters).toBe("Réinitialiser");
		expect(frMessages.settings_advertising_label).toBe("Annonces");
		expect(frMessages.analytics_consent_accept).toBe("Autoriser");
		expect(frMessages.privacy_page_title).toBe("Confidentialité");
		expect(hiMessages.nav_blog).toBe("ब्लॉग");
		expect(hiMessages.settings_trigger_label).toBe("सेटिंग्स");
		expect(hiMessages.blog_clear_filters).toBe("रीसेट");
		expect(hiMessages.settings_advertising_label).toBe("विज्ञापन");
		expect(hiMessages.analytics_consent_accept).toBe("अनुमति दें");
		expect(hiMessages.privacy_page_title).toBe("गोपनीयता");
	});
});
