<script lang="ts">
	import { subscribeAdvertisingConsent } from "$lib/site-advertising-consent";
	import { getBlogPostAdUnitConfig, loadSiteAdProviderScript, requestSiteAdRender } from "$lib/site-advertising";
	import { AD_RENDER_RESULT_TIMEOUT_MS, getAdUnitDisplayStateFromProviderStatus, type AdUnitDisplayState } from "$lib/ad-unit-core";
	import { getI18n } from "$lib/i18n";
 const i18n = getI18n();

	const config = getBlogPostAdUnitConfig("blog-inline");
	let consent = $state(false);
	let element = $state<HTMLElement>();
	let displayState = $state<AdUnitDisplayState>("pending");
	$effect(() => subscribeAdvertisingConsent((value) => { consent = value === "granted"; }));
	$effect(() => {
		const target = element;
		if (!target || !config || !consent) return;
		displayState = "pending";
		let current = true;
		let timeout: ReturnType<typeof setTimeout> | undefined;
		const observer = new MutationObserver(() => {
			const state = getAdUnitDisplayStateFromProviderStatus(target.dataset.adStatus);
			if (state) { displayState = state; clearTimeout(timeout); }
		});
		observer.observe(target, { attributes: true, attributeFilter: ["data-ad-status"] });
		void loadSiteAdProviderScript(config).then((loaded) => {
			if (!current) return;
			if (!loaded || !requestSiteAdRender(config)) { displayState = "empty"; return; }
			timeout = setTimeout(() => {
				if (current) displayState = getAdUnitDisplayStateFromProviderStatus(target.dataset.adStatus) ?? "empty";
			}, AD_RENDER_RESULT_TIMEOUT_MS);
		}).catch(() => { if (current) displayState = "empty"; });
		return () => { current = false; clearTimeout(timeout); observer.disconnect(); };
	});
</script>

{#if config && consent}
	<aside class="article-ad" class:empty={displayState === "empty"} data-pagefind-ignore="all" aria-label={$i18n.t("site:settings_advertising_label")}>
		<ins bind:this={element} class="adsbygoogle" style="display: block" data-ad-client={config.clientId} data-ad-slot={config.slot} data-ad-format="auto" data-full-width-responsive="true"></ins>
	</aside>
{/if}

<style>
	.article-ad { width: 100%; min-height: 6rem; margin-block: 1.5rem; }
	.article-ad.empty { display: none; }
</style>
