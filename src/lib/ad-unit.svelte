<script lang="ts">
	import { onMount, tick } from "svelte";
	import type { BlogPostAdSlotKey } from "$lib/blog-post-ads";
	import {
		getBlogPostAdUnitConfig,
		loadSiteAdProviderScript,
		requestSiteAdRender,
	} from "$lib/site-advertising";
	import {
		AD_RENDER_RESULT_TIMEOUT_MS,
		getAdUnitAriaHidden,
		getAdUnitDisplayStateFromProviderStatus,
		getConsentedAdUnitConfig,
		type AdUnitDisplayState,
	} from "$lib/ad-unit-core";
	import {
		readStoredAdvertisingConsent,
		siteAdvertisingConsentChangeEvent,
	} from "$lib/site-advertising-consent";

	let { slotKey }: { slotKey: BlogPostAdSlotKey } = $props();

	let adElement = $state<HTMLElement | undefined>();
	let advertisingConsent = $state(false);
	let displayState = $state<AdUnitDisplayState>("pending");

	const rawConfig = $derived(getBlogPostAdUnitConfig(slotKey));
	const config = $derived(getConsentedAdUnitConfig(rawConfig, advertisingConsent));

	onMount(() => {
		let renderTimeout: number | undefined;
		let observer: MutationObserver | undefined;
		let renderRequested = false;
		let disposed = false;

		function syncDisplayState() {
			const syncedDisplayState = getAdUnitDisplayStateFromProviderStatus(
				adElement?.dataset.adStatus,
			);

			if (syncedDisplayState) {
				displayState = syncedDisplayState;
			}
		}

		async function loadAdUnit() {
			if (!rawConfig || !advertisingConsent || disposed) {
				displayState = "empty";
				return;
			}

			displayState = "pending";
			await tick();

			if (!adElement || disposed) {
				displayState = "empty";
				return;
			}

			observer?.disconnect();
			observer = new MutationObserver(syncDisplayState);
			observer.observe(adElement, {
				attributes: true,
				attributeFilter: ["data-ad-status"],
			});

			if (renderTimeout !== undefined) {
				window.clearTimeout(renderTimeout);
			}

			renderTimeout = window.setTimeout(() => {
				syncDisplayState();

				if (displayState === "pending") {
					displayState = "empty";
				}
			}, AD_RENDER_RESULT_TIMEOUT_MS);

			const loaded = await loadSiteAdProviderScript(rawConfig);

			if (!loaded || disposed || !readStoredAdvertisingConsent()) {
				displayState = "empty";
				return;
			}

			if (!renderRequested) {
				renderRequested = requestSiteAdRender(rawConfig);
			}

			syncDisplayState();
		}

		function syncConsent() {
			advertisingConsent = readStoredAdvertisingConsent();

			if (advertisingConsent) {
				void loadAdUnit();
			} else {
				displayState = "empty";
			}
		}

		window.addEventListener(siteAdvertisingConsentChangeEvent, syncConsent);
		syncConsent();

		return () => {
			disposed = true;
			window.removeEventListener(siteAdvertisingConsentChangeEvent, syncConsent);
			observer?.disconnect();

			if (renderTimeout !== undefined) {
				window.clearTimeout(renderTimeout);
			}
		};
	});
</script>

{#if config}
	<aside
		class="blog-ad-unit"
		aria-label="Advertisements"
		aria-hidden={getAdUnitAriaHidden(displayState)}
		data-display-state={displayState}
	>
		<span>Advertisements</span>
		{#if config.provider === "google"}
			<ins
				bind:this={adElement}
				class="adsbygoogle"
				style="display:block"
				data-ad-client={config.clientId}
				data-ad-slot={config.slot}
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		{/if}
	</aside>
{/if}

<style>
	.blog-ad-unit {
		display: grid;
		min-height: 6rem;
		gap: 0.45rem;
		padding: 0.9rem 0;
		border-block: 1px solid color-mix(in oklch, var(--border) 58%, transparent);
		color: var(--muted-foreground);
		font-size: 0.76rem;
		font-weight: 680;
		line-height: 1.2;
		text-align: center;
		transition: opacity 160ms ease;
		user-select: none;
	}

	.blog-ad-unit[data-display-state="pending"] {
		opacity: 0;
		pointer-events: none;
	}

	.blog-ad-unit[data-display-state="empty"] {
		display: none;
	}

	.blog-ad-unit span {
		justify-self: center;
	}

	.blog-ad-unit ins {
		display: block;
		width: 100%;
		min-height: 4.5rem;
	}
</style>
