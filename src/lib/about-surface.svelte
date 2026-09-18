<script lang="ts">
	import { getLocale } from "$lib/paraglide/runtime";
	import { page } from "$app/state";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";
	import { siteProfile } from "$lib/site-profile";
	import ShareToolbar from "$lib/share-toolbar.svelte";

	const currentLocale = $derived(getLocale());
	const selectedLocale = $derived(isSiteLocale(currentLocale) ? currentLocale : "en");
	const about = $derived(page.data.about);
	const shareUrl = $derived(
		new URL(localizeSitePathname("/about", selectedLocale), siteProfile.origin).toString(),
	);
</script>

<svelte:head>
	<title>{about.title} · {siteProfile.name}</title>
</svelte:head>

<article class="about" aria-labelledby="section-title">
	<header class="about-header">
		<h1 id="section-title">{about.title}</h1>
	</header>

	<div class="about-reading-layout">
		<div class="about-body">
			{#each about.paragraphs as paragraph}
				<p>{paragraph}</p>
			{/each}
		</div>

		<aside class="about-sidecar" data-pagefind-ignore="all">
			<ShareToolbar title={about.title} url={shareUrl} headingId="about-share-title" />
		</aside>
	</div>
</article>

<style>
	.about {
		--about-body-width: 48rem;
		--about-sidecar-min-width: 12rem;
		--about-sidecar-max-width: 16rem;

		display: grid;
		width: min(100%, 70rem);
		gap: 1.3rem;
		color: var(--foreground);
	}

	.about-header {
		display: grid;
		gap: 0.9rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.about-header h1 {
		margin: 0;
		color: var(--foreground);
		font-size: clamp(1.55rem, 3.85vw, 2.9rem);
		font-weight: 740;
		letter-spacing: 0;
		line-height: 1;
		text-shadow: 0 0.07em 0 var(--display-heading-shadow);
	}

	.about-reading-layout {
		display: grid;
		grid-template-areas: "body sidecar";
		grid-template-columns: minmax(0, var(--about-body-width)) minmax(
				var(--about-sidecar-min-width),
				var(--about-sidecar-max-width)
			);
		gap: clamp(1.25rem, 4vw, 2.5rem);
		align-items: start;
	}

	.about-body {
		display: grid;
		grid-area: body;
		min-width: 0;
		gap: 1rem;
		font-size: calc(1.02rem + 2pt);
		line-height: 1.75;
	}

	.about-body p {
		margin: 0;
	}

	.about-sidecar {
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
		.about-reading-layout {
			grid-template-areas:
				"sidecar"
				"body";
			grid-template-columns: minmax(0, var(--about-body-width));
		}

		.about-sidecar {
			position: static;
			padding: 0 0 0.8rem;
			border-left: 0;
			border-bottom: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		}
	}
</style>
