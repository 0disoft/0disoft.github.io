<script lang="ts">
	import { onMount } from "svelte";
	import type { BlogPostAdSlotKey } from "$lib/blog-post-ads";
	import {
		getBlogPostAdUnitConfig,
		loadSiteAdProviderScript,
		requestSiteAdRender,
	} from "$lib/site-advertising";

	const AD_RENDER_RESULT_TIMEOUT_MS = 6000;

	let { slotKey }: { slotKey: BlogPostAdSlotKey } = $props();

	let adElement = $state<HTMLElement | undefined>();
	let displayState = $state<"pending" | "filled" | "empty">("pending");

	const config = $derived(getBlogPostAdUnitConfig(slotKey));

	onMount(() => {
		if (!config || !adElement) {
			return;
		}

		let renderTimeout: number | undefined;
		const observer = new MutationObserver(syncDisplayState);

		function syncDisplayState() {
			const providerStatus = adElement?.dataset.adStatus;

			if (providerStatus === "filled") {
				displayState = "filled";
				return;
			}

			if (providerStatus === "unfilled") {
				displayState = "empty";
			}
		}

		observer.observe(adElement, {
			attributes: true,
			attributeFilter: ["data-ad-status"],
		});

		renderTimeout = window.setTimeout(() => {
			syncDisplayState();

			if (displayState === "pending") {
				displayState = "empty";
			}
		}, AD_RENDER_RESULT_TIMEOUT_MS);

		void loadSiteAdProviderScript(config).then((loaded) => {
			if (!loaded) {
				displayState = "empty";
				return;
			}

			requestSiteAdRender(config);

			syncDisplayState();
		});

		return () => {
			observer.disconnect();

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
		aria-hidden={displayState === "filled" ? undefined : "true"}
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
