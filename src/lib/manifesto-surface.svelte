<script lang="ts">
	import { getLocale } from "$lib/paraglide/runtime";
	import { page } from "$app/state";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";
	import { siteProfile } from "$lib/site-profile";
	import ShareToolbar from "$lib/share-toolbar.svelte";

	const currentLocale = $derived(getLocale());
	const selectedLocale = $derived(isSiteLocale(currentLocale) ? currentLocale : "en");
	const manifesto = $derived(page.data.manifesto);
	const shareUrl = $derived(
		new URL(localizeSitePathname("/manifesto", selectedLocale), siteProfile.origin).toString(),
	);
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

		<aside class="manifesto-sidecar" data-pagefind-ignore="all">
			<ShareToolbar title={manifesto.title} url={shareUrl} headingId="manifesto-share-title" />
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
			border-bottom: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		}
	}
</style>
