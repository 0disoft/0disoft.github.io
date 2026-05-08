import { env as publicEnv } from "$env/dynamic/public";
import type { BlogPostAdSlotKey } from "$lib/blog-post-ads";
import {
	isGoogleAdClientIdConfigured,
	isGoogleAdSlotConfigured,
	loadGoogleAdScript,
	createGoogleAuthorizedSellerRecord,
	requestGoogleAdRender,
	type GoogleAdUnitConfig,
} from "$lib/site-ad-provider-google";
import { readStoredAdvertisingConsent } from "$lib/site-advertising-consent";

type SiteAdProvider = GoogleAdUnitConfig["provider"];
type SiteAdUnitConfig = GoogleAdUnitConfig;

const siteAdProvider = getConfiguredAdProvider(publicEnv.PUBLIC_AD_PROVIDER);
const adClientId = publicEnv.PUBLIC_AD_CLIENT_ID?.trim() ?? "";
const blogPostAdSlot = publicEnv.PUBLIC_BLOG_POST_AD_SLOT?.trim() ?? "";

export function isSiteAdvertisingConfigured(): boolean {
	return (
		siteAdProvider === "google" &&
		isGoogleAdClientIdConfigured(adClientId) &&
		isGoogleAdSlotConfigured(blogPostAdSlot)
	);
}

export function buildAdsTxt(provider: string | undefined, clientId: string | undefined): string {
	const configuredProvider = getConfiguredAdProvider(provider);
	const record =
		configuredProvider === "google" ? createGoogleAuthorizedSellerRecord(clientId) : null;

	return record ? `${record}\n` : "";
}

export function getBlogPostAdUnitConfig(slotKey: BlogPostAdSlotKey): SiteAdUnitConfig | null {
	if (slotKey !== "blog-inline" || !isSiteAdvertisingConfigured()) {
		return null;
	}

	return {
		provider: "google",
		clientId: adClientId,
		slot: blogPostAdSlot,
	};
}

export function loadSiteAdProviderScript(config: SiteAdUnitConfig): Promise<boolean> {
	if (!readStoredAdvertisingConsent()) {
		return Promise.resolve(false);
	}

	switch (config.provider) {
		case "google":
			return loadGoogleAdScript(config.clientId);
	}
}

export function requestSiteAdRender(config: SiteAdUnitConfig): boolean {
	if (!readStoredAdvertisingConsent()) {
		return false;
	}

	switch (config.provider) {
		case "google":
			return requestGoogleAdRender();
	}
}

function getConfiguredAdProvider(value: string | undefined): SiteAdProvider | null {
	const provider = value?.trim().toLowerCase();

	if (!provider || provider === "google") {
		return "google";
	}

	return null;
}
