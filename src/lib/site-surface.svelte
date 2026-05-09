<script lang="ts">
	import type { Snippet } from "svelte";
	import BlogSurface from "$lib/blog-surface.svelte";
	import ManifestoSurface from "$lib/manifesto-surface.svelte";
	import SiteSidebar from "$lib/site-sidebar.svelte";
	import WorksSurface from "$lib/works-surface.svelte";
	import { getLocale } from "$lib/paraglide/runtime";
	import { getLocalizedNavigationLabel, toDisplayLocale } from "$lib/site-labels";
	import type { SiteSectionPath } from "$lib/site-navigation";
	import { findNavigationItemByPath } from "$lib/site-navigation";
	import { siteProfile } from "$lib/site-profile";

	let {
		activePath = "/",
		children,
	}: { activePath?: SiteSectionPath | "/"; children?: Snippet } = $props();

	const displayLocale = $derived(toDisplayLocale(getLocale()));
	const activeSection = $derived(findNavigationItemByPath(activePath));
	const isManifestoSection = $derived(activePath === "/manifesto");
	const isBlogSection = $derived(activePath === "/blog");
	const isWorksSection = $derived(activePath === "/works");
	const activeSectionLabel = $derived(
		activeSection ? getLocalizedNavigationLabel(activeSection.href, displayLocale) : siteProfile.name,
	);
</script>

<svelte:head>
	<title>{activeSection ? `${activeSectionLabel} · ${siteProfile.name}` : siteProfile.name}</title>
</svelte:head>

<div class="site-frame site-backdrop">
	<SiteSidebar {activePath} />

	<main class="content-shell" class:empty-home={!activeSection && !children}>
		{#if children}
			{@render children()}
		{:else if isManifestoSection}
			<ManifestoSurface />
		{:else if isBlogSection}
			<BlogSurface />
		{:else if isWorksSection}
			<WorksSurface />
		{:else if activeSection}
			<section class="content-section" aria-labelledby="section-title">
				<h1 id="section-title" class="sr-only">{activeSectionLabel}</h1>
			</section>
		{:else}
			<h1 class="sr-only">{siteProfile.name}</h1>
		{/if}
	</main>
</div>

<style>
	.site-frame {
		--site-sidebar-width: clamp(14.5rem, 23vw, 17.5rem);

		display: grid;
		height: 100svh;
		min-height: 100svh;
		grid-template-columns: var(--site-sidebar-width) minmax(0, 1fr);
		overflow: hidden;
	}

	.content-shell {
		position: relative;
		z-index: 1;
		display: grid;
		align-content: start;
		height: 100svh;
		min-height: 0;
		padding: clamp(1.25rem, 5vw, 5rem);
		overflow: auto;
		overscroll-behavior: contain;
	}

	.content-shell.empty-home {
		align-content: stretch;
	}

	.content-section {
		min-height: 45svh;
	}

	@media (max-width: 48rem) {
		.site-frame {
			height: auto;
			min-height: 100svh;
			grid-template-columns: 1fr;
			overflow: visible;
		}

		.content-shell {
			height: auto;
			min-height: 100svh;
			overflow: visible;
		}
	}
</style>
