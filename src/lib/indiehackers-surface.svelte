<script lang="ts">
	import { getLocale } from "$lib/paraglide/runtime";
	import { page } from "$app/state";
	import IndiehackersShareToolbar from "$lib/indiehackers-share-toolbar.svelte";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";
	import { siteProfile } from "$lib/site-profile";

	const locale = $derived(getLocale());
	const selectedLocale = $derived(isSiteLocale(locale) ? locale : "en");
	const indiehackers = $derived(page.data.indiehackers);
	const shareUrl = $derived(
		new URL(localizeSitePathname("/indiehackers", selectedLocale), siteProfile.origin).toString(),
	);
</script>

<svelte:head>
	<title>{indiehackers.title} · {siteProfile.name}</title>
</svelte:head>

<article class="indiehackers" aria-labelledby="section-title">
	<header class="indiehackers-header">
		<h1 id="section-title">{indiehackers.title}</h1>
	</header>

	<div class="indiehackers-reading-layout">
		<div class="indiehackers-body">
			{#each indiehackers.paragraphs as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>

		<aside class="indiehackers-sidecar" data-pagefind-ignore="all">
			<IndiehackersShareToolbar
				title={indiehackers.title}
				url={shareUrl}
				headingId="indiehackers-share-title"
			/>
		</aside>
	</div>
</article>

<style>
	.indiehackers {
		--indiehackers-body-width: 56rem;
		--indiehackers-sidecar-min-width: 9.5rem;
		--indiehackers-sidecar-max-width: 11rem;

		display: grid;
		width: min(100%, 70rem);
		gap: 1.3rem;
		color: var(--foreground);
	}

	.indiehackers-header {
		display: grid;
		gap: 0.9rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.indiehackers-header h1 {
		margin: 0;
		color: var(--foreground);
		font-size: clamp(1.55rem, 3.85vw, 2.9rem);
		font-weight: 740;
		letter-spacing: 0;
		line-height: 1;
		text-shadow: 0 0.07em 0 var(--display-heading-shadow);
	}

	.indiehackers-reading-layout {
		display: grid;
		grid-template-areas: "body sidecar";
		grid-template-columns: minmax(0, var(--indiehackers-body-width)) minmax(
				var(--indiehackers-sidecar-min-width),
				var(--indiehackers-sidecar-max-width)
			);
		gap: clamp(1.25rem, 4vw, 2.5rem);
		align-items: start;
	}

	.indiehackers-body {
		display: grid;
		grid-area: body;
		min-width: 0;
		gap: 1rem;
		font-size: calc(1.02rem + 2pt);
		line-height: 1.75;
	}

	.indiehackers-body p {
		margin: 0;
	}

	.indiehackers-sidecar {
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
		.indiehackers-reading-layout {
			grid-template-areas:
				"sidecar"
				"body";
			grid-template-columns: minmax(0, var(--indiehackers-body-width));
		}

		.indiehackers-sidecar {
			position: static;
			padding: 0 0 0.8rem;
			border-left: 0;
			border-bottom: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		}
	}
</style>
