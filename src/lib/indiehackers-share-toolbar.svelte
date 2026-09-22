<script lang="ts">
	import { Copy, MessageCircle, Send, Share2 } from "@lucide/svelte";
	import { onMount } from "svelte";
	import {
		siBluesky,
		siFacebook,
		siReddit,
		siSinaweibo,
		siThreads,
		siWhatsapp,
		siX,
		type SimpleIcon,
	} from "simple-icons";
	import { linkedInIcon } from "$lib/ui/share-brand-icons";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import {
		buildIndiehackersShareLinks,
		type IndiehackersSharePlatform,
	} from "$lib/indiehackers-share";
	import { copyTextToClipboard } from "$lib/site-clipboard";
	import { toDisplayLocale } from "$lib/site-labels";
	import BrandIcon from "$lib/ui/brand-icon.svelte";

	type SharePlatformIcon =
		| { kind: "lucide"; name: "send" | "message-circle" }
		| { kind: "brand"; icon: SimpleIcon };

	let {
		title,
		url,
		headingId,
	}: {
		title: string;
		url: string;
		headingId: string;
	} = $props();

	let canUseDeviceShare = $state(false);
	let copyState = $state<"idle" | "copied">("idle");
	let copyFeedbackTimer: number | undefined;

	const displayLocale = $derived(toDisplayLocale(getLocale()));
	const shareLinks = $derived(buildIndiehackersShareLinks({ title, url }));
	const copyLabel = $derived(
		copyState === "copied"
			? m.indiehackers_copied_link({}, { locale: displayLocale })
			: m.indiehackers_copy_link({}, { locale: displayLocale }),
	);
	const deviceShareLabel = $derived(
		m.indiehackers_share_device({}, { locale: displayLocale }),
	);

	onMount(() => {
		canUseDeviceShare =
			typeof navigator !== "undefined" && typeof navigator.share === "function";

		return () => {
			if (copyFeedbackTimer !== undefined) {
				window.clearTimeout(copyFeedbackTimer);
			}
		};
	});

	async function copyShareUrl() {
		if (!url) {
			return;
		}

		await copyTextToClipboard(url);
		copyState = "copied";

		if (copyFeedbackTimer !== undefined) {
			window.clearTimeout(copyFeedbackTimer);
		}

		copyFeedbackTimer = window.setTimeout(() => {
			copyState = "idle";
			copyFeedbackTimer = undefined;
		}, 1500);
	}

	async function shareWithDevice() {
		if (
			canUseDeviceShare &&
			typeof navigator !== "undefined" &&
			typeof navigator.share === "function"
		) {
			try {
				await navigator.share({ title, url });
				return;
			} catch (error) {
				if (isShareAbortError(error)) {
					return;
				}
			}
		}

		await copyShareUrl();
	}

	function getSharePlatformLabel(platform: IndiehackersSharePlatform): string {
		switch (platform) {
			case "telegram":
				return m.indiehackers_share_telegram({}, { locale: displayLocale });
			case "line":
				return m.indiehackers_share_line({}, { locale: displayLocale });
			case "whatsapp":
				return m.indiehackers_share_whatsapp({}, { locale: displayLocale });
			case "x":
				return m.indiehackers_share_x({}, { locale: displayLocale });
			case "reddit":
				return m.indiehackers_share_reddit({}, { locale: displayLocale });
			case "facebook":
				return m.indiehackers_share_facebook({}, { locale: displayLocale });
			case "threads":
				return m.indiehackers_share_threads({}, { locale: displayLocale });
			case "bluesky":
				return m.indiehackers_share_bluesky({}, { locale: displayLocale });
			case "linkedin":
				return m.indiehackers_share_linkedin({}, { locale: displayLocale });
			case "weibo":
				return m.indiehackers_share_weibo({}, { locale: displayLocale });
		}
	}

	function getSharePlatformIcon(platform: IndiehackersSharePlatform): SharePlatformIcon {
		switch (platform) {
			case "telegram":
				return { kind: "lucide", name: "send" };
			case "line":
				return { kind: "lucide", name: "message-circle" };
			case "whatsapp":
				return { kind: "brand", icon: siWhatsapp };
			case "x":
				return { kind: "brand", icon: siX };
			case "reddit":
				return { kind: "brand", icon: siReddit };
			case "facebook":
				return { kind: "brand", icon: siFacebook };
			case "threads":
				return { kind: "brand", icon: siThreads };
			case "bluesky":
				return { kind: "brand", icon: siBluesky };
			case "linkedin":
				return { kind: "brand", icon: linkedInIcon };
			case "weibo":
				return { kind: "brand", icon: siSinaweibo };
		}
	}

	function isShareAbortError(error: unknown): boolean {
		return Boolean(
			error && typeof error === "object" && "name" in error && error.name === "AbortError",
		);
	}
</script>

<section class="share-toolbar" aria-labelledby={headingId}>
	<p id={headingId}>{m.indiehackers_share_label({}, { locale: displayLocale })}</p>
	<div class="share-toolbar-grid">
		<button
			class="share-icon-button"
			type="button"
			aria-label={copyLabel}
			data-tooltip={copyLabel}
			onclick={copyShareUrl}
		>
			<Copy aria-hidden="true" size={18} strokeWidth={2.2} />
		</button>
		<button
			class="share-icon-button"
			type="button"
			aria-label={deviceShareLabel}
			data-tooltip={deviceShareLabel}
			onclick={shareWithDevice}
		>
			<Share2 aria-hidden="true" size={18} strokeWidth={2.2} />
		</button>
		{#each shareLinks as shareLink (shareLink.platform)}
			{@const platformLabel = getSharePlatformLabel(shareLink.platform)}
			{@const platformIcon = getSharePlatformIcon(shareLink.platform)}
			<a
				class="share-icon-button"
				href={shareLink.href}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={platformLabel}
				data-tooltip={platformLabel}
			>
				{#if platformIcon.kind === "lucide"}
					{#if platformIcon.name === "send"}
						<Send aria-hidden="true" size={18} strokeWidth={2.2} />
					{:else}
						<MessageCircle aria-hidden="true" size={18} strokeWidth={2.2} />
					{/if}
				{:else}
					<BrandIcon icon={platformIcon.icon} size={18} />
				{/if}
			</a>
		{/each}
	</div>
	<span class="sr-only" aria-live="polite">{copyState === "copied" ? copyLabel : ""}</span>
</section>

<style>
	.share-toolbar {
		--share-icon-size: 2.35rem;
		--share-tooltip-background: oklch(0.16 0.02 85);
		--share-tooltip-border: oklch(0.98 0.026 92 / 46%);
		--share-tooltip-foreground: oklch(0.98 0.026 92);

		display: grid;
		gap: 0.55rem;
	}

	.share-toolbar p {
		margin: 0;
		font-weight: 760;
	}

	.share-toolbar-grid {
		display: grid;
		grid-template-columns: repeat(4, var(--share-icon-size));
		gap: 0.42rem;
	}

	.share-icon-button {
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		width: var(--share-icon-size);
		height: var(--share-icon-size);
		padding: 0;
		border: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 42%, transparent);
		color: var(--foreground);
		cursor: pointer;
		text-decoration: none;
		user-select: none;
	}

	.share-icon-button:hover {
		border-color: color-mix(in oklch, var(--foreground) 28%, var(--border));
	}

	.share-icon-button:hover,
	.share-icon-button:focus-visible {
		color: var(--foreground);
	}

	.share-icon-button:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 3px;
	}

	.share-icon-button::after {
		position: absolute;
		bottom: calc(100% + 0.48rem);
		left: 50%;
		z-index: 3;
		max-width: min(13rem, 70vw);
		padding: 0.34rem 0.56rem;
		border: 1px solid var(--share-tooltip-border);
		border-radius: var(--radius-sm);
		background: var(--share-tooltip-background);
		box-shadow: 0 0.55rem 1.4rem color-mix(in oklch, black 32%, transparent);
		color: var(--share-tooltip-foreground);
		content: attr(data-tooltip);
		font-size: 0.82rem;
		font-weight: 520;
		line-height: 1.2;
		opacity: 0;
		pointer-events: none;
		text-align: center;
		transform: translate(-50%, 0.18rem);
		transition:
			opacity 120ms ease,
			transform 120ms ease;
		white-space: nowrap;
	}

	.share-icon-button:hover::after,
	.share-icon-button:focus-visible::after {
		opacity: 1;
		transform: translate(-50%, 0);
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
