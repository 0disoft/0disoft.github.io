import { describe, expect, it } from "vitest";
import {
	AD_RENDER_RESULT_TIMEOUT_MS,
	getAdUnitAriaHidden,
	getAdUnitDisplayStateFromProviderStatus,
	getConsentedAdUnitConfig,
} from "./ad-unit-core";
import type { BlogPostBodyBlock } from "./blog-post-core";
import { blogPostAdPlacements, createBlogPostRenderItems } from "./blog-post-ads";
import {
	createGoogleAdScriptSrc,
	createGoogleAuthorizedSellerRecord,
	getGooglePublisherId,
	isGoogleAdClientIdConfigured,
	isGoogleAdSlotConfigured,
} from "./site-ad-provider-google";
import { buildAdsTxt } from "./site-advertising";
import {
	adsTxtRouteSource,
	blogPostSurfaceSource,
	deployWorkflowSource,
	googleAdProviderSource,
	layoutSource,
	privacyRouteSource,
	siteAdvertisingSource,
} from "./test-support/site-test-sources";

describe("blog post ads", () => {
	it("inserts manual ad units before the third and seventh blog headings", () => {
		const blocks: BlogPostBodyBlock[] = [
			createHeadingBlock("heading 1"),
			createHeadingBlock("heading 2"),
			createHeadingBlock("heading 3"),
			createHeadingBlock("heading 4"),
			createHeadingBlock("heading 5"),
			createHeadingBlock("heading 6"),
			createHeadingBlock("heading 7"),
		];

		const renderItems = createBlogPostRenderItems(blocks, blogPostAdPlacements);

		expect(
			renderItems.map((item) =>
				item.kind === "ad"
					? `ad-before-${item.placement.beforeHeadingIndex}`
					: item.block.kind === "heading"
						? item.block.text
						: item.block.kind,
			),
		).toEqual([
			"heading 1",
			"heading 2",
			"ad-before-3",
			"heading 3",
			"heading 4",
			"heading 5",
			"heading 6",
			"ad-before-7",
			"heading 7",
		]);
		expect(renderItems.filter((item) => item.kind === "ad")).toEqual([
			{
				kind: "ad",
				key: "blog-inline-before-heading-3",
				placement: {
					beforeHeadingIndex: 3,
					slotKey: "blog-inline",
				},
			},
			{
				kind: "ad",
				key: "blog-inline-before-heading-7",
				placement: {
					beforeHeadingIndex: 7,
					slotKey: "blog-inline",
				},
			},
		]);
	});

	it("keeps Google ad client and slot validation inside the provider adapter", () => {
		expect(isGoogleAdClientIdConfigured("ca-pub-1234567890123456")).toBe(true);
		expect(isGoogleAdClientIdConfigured("pub-1234567890123456")).toBe(false);
		expect(isGoogleAdClientIdConfigured("")).toBe(false);
		expect(isGoogleAdSlotConfigured("1234567890")).toBe(true);
		expect(isGoogleAdSlotConfigured("slot-name")).toBe(false);
		expect(createGoogleAdScriptSrc("ca-pub-1234567890123456")).toBe(
			"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456",
		);
		expect(getGooglePublisherId("ca-pub-1234567890123456")).toBe("pub-1234567890123456");
		expect(getGooglePublisherId("pub-1234567890123456")).toBeNull();
		expect(createGoogleAuthorizedSellerRecord("ca-pub-1234567890123456")).toBe(
			"google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0",
		);
		expect(buildAdsTxt("google", "ca-pub-1234567890123456")).toBe(
			"google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n",
		);
		expect(buildAdsTxt("ezoic", "ca-pub-1234567890123456")).toBe("");
		expect(buildAdsTxt("google", "")).toBe("");
	});

	it("wires manual ad units through provider-neutral surfaces", () => {
		expect(blogPostAdPlacements).toEqual([
			{ beforeHeadingIndex: 3, slotKey: "blog-inline" },
			{ beforeHeadingIndex: 7, slotKey: "blog-inline" },
		]);
		expect(blogPostSurfaceSource).toContain('import AdUnit from "$lib/ad-unit.svelte"');
		expect(blogPostSurfaceSource).toContain("createBlogPostRenderItems");
		expect(blogPostSurfaceSource).toContain('item.kind === "ad"');
		expect(blogPostSurfaceSource).toContain("<AdUnit");
		expect(siteAdvertisingSource).toContain(
			'import { env as publicEnv } from "$env/dynamic/public"',
		);
		expect(siteAdvertisingSource).toContain("publicEnv.PUBLIC_AD_PROVIDER");
		expect(siteAdvertisingSource).toContain("publicEnv.PUBLIC_AD_CLIENT_ID");
		expect(siteAdvertisingSource).toContain("publicEnv.PUBLIC_BLOG_POST_AD_SLOT");
		expect(siteAdvertisingSource).toContain("isSiteAdvertisingConfigured");
		expect(siteAdvertisingSource).toContain("readStoredAdvertisingConsent");
		expect(siteAdvertisingSource).toContain("loadSiteAdProviderScript");
		expect(siteAdvertisingSource).toContain("requestSiteAdRender");
		expect(siteAdvertisingSource).toContain("buildAdsTxt");
		expect(googleAdProviderSource).toContain("createGoogleAdScriptSrc");
		expect(googleAdProviderSource).toContain("createGoogleAuthorizedSellerRecord");
		expect(googleAdProviderSource).toContain("adsbygoogle");
		expect(AD_RENDER_RESULT_TIMEOUT_MS).toBe(6000);
		expect(getAdUnitDisplayStateFromProviderStatus("filled")).toBe("filled");
		expect(getAdUnitDisplayStateFromProviderStatus("unfilled")).toBe("empty");
		expect(getAdUnitDisplayStateFromProviderStatus("unknown")).toBeNull();
		expect(getAdUnitAriaHidden("filled")).toBeUndefined();
		expect(getAdUnitAriaHidden("pending")).toBe("true");
		expect(getAdUnitAriaHidden("empty")).toBe("true");
		expect(getConsentedAdUnitConfig({ provider: "google" }, true)).toEqual({ provider: "google" });
		expect(getConsentedAdUnitConfig({ provider: "google" }, false)).toBeNull();
		expect(deployWorkflowSource).toContain("PUBLIC_AD_PROVIDER: ${{ vars.PUBLIC_AD_PROVIDER }}");
		expect(deployWorkflowSource).toContain("PUBLIC_AD_CLIENT_ID: ${{ vars.PUBLIC_AD_CLIENT_ID }}");
		expect(deployWorkflowSource).toContain(
			"PUBLIC_BLOG_POST_AD_SLOT: ${{ vars.PUBLIC_BLOG_POST_AD_SLOT }}",
		);
		expect(adsTxtRouteSource).toContain("buildAdsTxt");
		expect(adsTxtRouteSource).toContain("publicEnv.PUBLIC_AD_PROVIDER");
		expect(adsTxtRouteSource).toContain("publicEnv.PUBLIC_AD_CLIENT_ID");
		const providerSpecificProductName = `${"ad"}${"sense"}`;

		expect(layoutSource).not.toContain("pagead2.googlesyndication.com");
		expect(siteAdvertisingSource.toLocaleLowerCase()).not.toContain(providerSpecificProductName);
		expect(blogPostSurfaceSource.toLocaleLowerCase()).not.toContain(providerSpecificProductName);
		expect(privacyRouteSource).toContain("m.privacy_ads_title");
		expect(privacyRouteSource).toContain("m.privacy_ads_body");
	});
});

function createHeadingBlock(text: string): BlogPostBodyBlock {
	return {
		kind: "heading",
		level: 2,
		text,
	};
}
