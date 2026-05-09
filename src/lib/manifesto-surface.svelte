<script lang="ts">
	import { Copy, MessageCircle, Send, Share2 } from "@lucide/svelte";
	import { onMount } from "svelte";
	import { siReddit, siWhatsapp, siX, type SimpleIcon } from "simple-icons";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import { buildBlogShareLinks, type BlogSharePlatform } from "$lib/blog-share";
	import { getManifestoCopy } from "$lib/manifesto";
	import { copyTextToClipboard } from "$lib/site-clipboard";
	import { toDisplayLocale } from "$lib/site-labels";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";
	import { siteProfile } from "$lib/site-profile";
	import BrandIcon from "$lib/ui/brand-icon.svelte";

	type SharePlatformIcon =
		| { kind: "lucide"; name: "send" | "message-circle" }
		| { kind: "brand"; icon: SimpleIcon };

	let canUseDeviceShare = $state(false);
	let copyState = $state<"idle" | "copied">("idle");
	let copyFeedbackTimer: number | undefined;

	const currentLocale = $derived(getLocale());
	const selectedLocale = $derived(isSiteLocale(currentLocale) ? currentLocale : "en");
	const displayLocale = $derived(toDisplayLocale(currentLocale));
	const manifesto = $derived(getManifestoCopy(selectedLocale));
	const shareUrl = $derived(
		new URL(localizeSitePathname("/manifesto", selectedLocale), siteProfile.origin).toString(),
	);
	const sharePayload = $derived({
		title: manifesto.title,
		url: shareUrl,
	});
	const shareLinks = $derived(buildBlogShareLinks(sharePayload));

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
		await copyTextToClipboard(shareUrl);
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
				await navigator.share(sharePayload);
				return;
			} catch (error) {
				if (isShareAbortError(error)) {
					return;
				}
			}
		}

		await copyShareUrl();
	}

	function getSharePlatformLabel(platform: BlogSharePlatform): string {
		switch (platform) {
			case "telegram":
				return m.blog_post_share_telegram({}, { locale: displayLocale });
			case "line":
				return m.blog_post_share_line({}, { locale: displayLocale });
			case "whatsapp":
				return m.blog_post_share_whatsapp({}, { locale: displayLocale });
			case "x":
				return m.blog_post_share_x({}, { locale: displayLocale });
			case "reddit":
				return m.blog_post_share_reddit({}, { locale: displayLocale });
		}
	}

	function getSharePlatformIcon(platform: BlogSharePlatform): SharePlatformIcon {
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
		}
	}

	function isShareAbortError(error: unknown): boolean {
		return Boolean(
			error &&
				typeof error === "object" &&
				"name" in error &&
				error.name === "AbortError",
		);
	}
</script>

<svelte:head>
	<title>{manifesto.title} · {siteProfile.name}</title>
</svelte:head>

<article class="manifesto" aria-labelledby="section-title">
	<header class="manifesto-header">
		<h1 id="section-title">{manifesto.title}</h1>
	</header>

	<div class="manifesto-reading-layout">
		<div class="manifesto-body">
			{#each manifesto.paragraphs as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>

		<aside class="manifesto-sidecar">
			<section class="manifesto-share" aria-labelledby="manifesto-share-title">
				<p id="manifesto-share-title">
					{m.blog_post_share_label({}, { locale: displayLocale })}
				</p>
				<div class="manifesto-share-grid">
					<button
						type="button"
						class="manifesto-share-icon-button"
						aria-label={copyState === "copied"
							? m.blog_post_copied_link({}, { locale: displayLocale })
							: m.blog_post_copy_link({}, { locale: displayLocale })}
						data-tooltip={copyState === "copied"
							? m.blog_post_copied_link({}, { locale: displayLocale })
							: m.blog_post_copy_link({}, { locale: displayLocale })}
						onclick={copyShareUrl}
					>
						<Copy aria-hidden="true" size={18} strokeWidth={2.2} />
					</button>
					<button
						type="button"
						class="manifesto-share-icon-button"
						aria-label={m.blog_post_share_device({}, { locale: displayLocale })}
						data-tooltip={m.blog_post_share_device({}, { locale: displayLocale })}
						onclick={shareWithDevice}
					>
						<Share2 aria-hidden="true" size={18} strokeWidth={2.2} />
					</button>
					{#each shareLinks as shareLink (shareLink.platform)}
						{@const platformLabel = getSharePlatformLabel(shareLink.platform)}
						{@const platformIcon = getSharePlatformIcon(shareLink.platform)}
						<a
							class="manifesto-share-icon-button"
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
				<span class="sr-only" aria-live="polite">
					{copyState === "copied"
						? m.blog_post_copied_link({}, { locale: displayLocale })
						: ""}
				</span>
			</section>
		</aside>
	</div>
</article>

<style>
	.manifesto {
		--manifesto-body-width: 48rem;
		--manifesto-sidecar-min-width: 12rem;
		--manifesto-sidecar-max-width: 16rem;

		display: grid;
		width: min(100%, 70rem);
		gap: 1.3rem;
		color: var(--foreground);
	}

	.manifesto-header {
		display: grid;
		gap: 0.9rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.manifesto-header h1 {
		margin: 0;
		color: var(--foreground);
		font-size: clamp(1.55rem, 3.85vw, 2.9rem);
		font-weight: 740;
		letter-spacing: 0;
		line-height: 1;
		text-shadow: 0 0.07em 0 var(--display-heading-shadow);
	}

	.manifesto-reading-layout {
		display: grid;
		grid-template-areas: "body sidecar";
		grid-template-columns: minmax(0, var(--manifesto-body-width)) minmax(
				var(--manifesto-sidecar-min-width),
				var(--manifesto-sidecar-max-width)
			);
		gap: clamp(1.25rem, 4vw, 2.5rem);
		align-items: start;
	}

	.manifesto-body {
		display: grid;
		grid-area: body;
		min-width: 0;
		gap: 1rem;
		font-size: calc(1.02rem + 2pt);
		line-height: 1.75;
	}

	.manifesto-body p {
		margin: 0;
	}

	.manifesto-sidecar {
		display: grid;
		position: sticky;
		top: 1.25rem;
		grid-area: sidecar;
		gap: 0.9rem;
		padding-left: 0.85rem;
		border-left: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		color: var(--foreground);
		font-size: calc(0.86rem + 1pt);
		line-height: 1.35;
		user-select: none;
	}

	.manifesto-share {
		--manifesto-share-icon-size: 2.35rem;
		--manifesto-tooltip-background: oklch(0.16 0.04 132);
		--manifesto-tooltip-border: oklch(0.98 0.026 92 / 46%);
		--manifesto-tooltip-foreground: oklch(0.98 0.026 92);

		display: grid;
		gap: 0.55rem;
	}

	.manifesto-share p {
		margin: 0;
		font-weight: 760;
	}

	.manifesto-share-grid {
		display: grid;
		grid-template-columns: repeat(4, var(--manifesto-share-icon-size));
		gap: 0.42rem;
	}

	.manifesto-share-icon-button {
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		width: var(--manifesto-share-icon-size);
		height: var(--manifesto-share-icon-size);
		padding: 0;
		border: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 42%, transparent);
		color: var(--foreground);
		cursor: pointer;
		text-decoration: none;
		user-select: none;
	}

	.manifesto-share-icon-button:hover {
		border-color: color-mix(in oklch, var(--sidebar-ring) 62%, var(--border));
		background: color-mix(in oklch, var(--paper-soft) 58%, transparent);
	}

	.manifesto-share-icon-button:hover,
	.manifesto-share-icon-button:focus-visible {
		color: var(--foreground);
	}

	.manifesto-share-icon-button::after {
		position: absolute;
		bottom: calc(100% + 0.48rem);
		left: 50%;
		z-index: 3;
		max-width: min(13rem, 70vw);
		padding: 0.34rem 0.56rem;
		border: 1px solid var(--manifesto-tooltip-border);
		border-radius: var(--radius-sm);
		background: var(--manifesto-tooltip-background);
		box-shadow: 0 0.55rem 1.4rem color-mix(in oklch, black 32%, transparent);
		color: var(--manifesto-tooltip-foreground);
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

	.manifesto-share-icon-button:hover::after,
	.manifesto-share-icon-button:focus-visible::after {
		opacity: 1;
		transform: translate(-50%, 0);
	}

	.manifesto :is(a, button):focus-visible {
		outline: 3px solid color-mix(in oklch, var(--sidebar-ring) 70%, white);
		outline-offset: 3px;
	}

	@media (max-width: 72rem) {
		.manifesto-reading-layout {
			grid-template-areas:
				"sidecar"
				"body";
			grid-template-columns: minmax(0, var(--manifesto-body-width));
		}

		.manifesto-sidecar {
			position: static;
			padding: 0 0 0.8rem;
			border-left: 0;
			border-bottom: 1px solid
				color-mix(in oklch, var(--border) 76%, transparent);
		}
	}
</style>
