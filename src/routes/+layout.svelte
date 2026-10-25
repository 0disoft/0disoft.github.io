<script lang="ts">
import type { Pathname } from '$app/types';
import { afterNavigate, onNavigate } from '$app/navigation';
import type { Snapshot } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { page } from '$app/state';
import { onMount, onDestroy, untrack } from 'svelte';
import { prefersReducedMotion } from 'svelte/motion';
import { createSiteI18n, setSayloContext } from "$lib/i18n";
	import { connectDev } from "@0disoft/saylo-vite/client";

	import { localeFontStylesheets } from '$lib/locale-fonts';
	import {
		baseLocale,
		getPathLocale,
		getPreferredClientLocale,
		languageOptions,
		localizeSitePathname,
	} from '$lib/site-locales';
	import SiteAnalytics from "$lib/site-analytics.svelte";
	import SiteTallyfin from "$lib/site-tallyfin.svelte";
	import SiteAnalyticsConsent from "$lib/site-analytics-consent.svelte";
	import { birdMarkPath } from '$lib/site-assets';
	import {
		getSitePlainTextAlternateLinks,
		getSiteRssAlternateLinks,
		siteThemeColorMeta,
	} from "$lib/site-meta";
	import { siteProfile } from '$lib/site-profile';
	import { getSitePageMeta } from '$lib/site-page-meta';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';

	let { children, data } = $props();
	const currentSiteLocale = $derived(getPathLocale(page.url.pathname) ?? data.locale ?? baseLocale);
	const instance = createSiteI18n(untrack(() => currentSiteLocale));
	const i18n = setSayloContext(instance);
	onDestroy(() => instance.dispose());
	onMount(() => connectDev(instance, { hot: import.meta.hot }));
	$effect(() => {
		instance.setLocale(currentSiteLocale);
		document.documentElement.lang = currentSiteLocale;
	});
	const meta = $derived(getSitePageMeta(page.url.pathname, page.data.post));
	const rssAlternateLinks = getSiteRssAlternateLinks();
	const plainTextAlternateLinks = getSitePlainTextAlternateLinks();

	const currentLocale = $derived($i18n.locale);
	const localeFontStylesheet = $derived(
		currentLocale === "hi" || currentLocale === "ko" || currentLocale === "zh"
			? localeFontStylesheets[currentLocale]
			: undefined,
	);

	export const snapshot: Snapshot<{ top: number; left: number }> = {
		capture: () => {
			const content = document.querySelector<HTMLElement>(".content-shell");
			return { top: content?.scrollTop ?? 0, left: content?.scrollLeft ?? 0 };
		},
		restore: (position) => {
			document.querySelector<HTMLElement>(".content-shell")?.scrollTo({
				...position,
				behavior: "instant",
			});
		},
	};

	afterNavigate(({ type, to }) => {
		// SvelteKit restores history snapshots and handles fragment targets itself.
		if (type === "enter" || type === "popstate" || to?.url.hash) return;
		document.querySelector<HTMLElement>(".content-shell")?.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant",
		});
	});

	function handleSkipToContent(event: MouseEvent) {
		event.preventDefault();
		document.getElementById("main-content")?.focus();
		document.querySelector<HTMLElement>(".content-shell")?.scrollTo({ top: 0 });
	}

	onMount(() => {
		if (getPathLocale(window.location.pathname)) {
			return;
		}

		const preferredLocale = getPreferredClientLocale();
		const nextPathname = localizeSitePathname(window.location.pathname, preferredLocale);

		if (nextPathname !== window.location.pathname) {
			window.location.replace(`${nextPathname}${window.location.search}${window.location.hash}`);
		}
	});

	onNavigate((navigation) => {
		if (prefersReducedMotion.current || typeof document.startViewTransition !== "function") {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>{siteProfile.name}</title>
	<meta name="description" content={meta.description} />
	<link rel="canonical" href={meta.url} />
	<link rel="icon" href={birdMarkPath} />
	{#if localeFontStylesheet}
		<link rel="stylesheet" href={localeFontStylesheet} />
	{/if}
	{#each rssAlternateLinks as link (link.href)}
		<link
			rel={link.rel}
			type={link.type}
			href={link.href}
			title={link.title}
		/>
	{/each}
	{#each plainTextAlternateLinks as link (link.href)}
		<link rel={link.rel} type={link.type} href={link.href} title={link.title} />
	{/each}
	{#each siteThemeColorMeta as themeColor (themeColor.media)}
		<meta name="theme-color" content={themeColor.content} media={themeColor.media} />
	{/each}
	<meta property="og:type" content={meta.type} />
	<meta property="og:site_name" content={siteProfile.name} />
	<meta property="og:url" content={meta.url} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.image} />
	<meta property="og:image:alt" content={meta.imageAlt} />
	<meta name="twitter:card" content={meta.card} />
	<meta name="twitter:title" content={meta.title} />
	<meta name="twitter:description" content={meta.description} />
	<meta name="twitter:image" content={meta.image} />
</svelte:head>
<ModeWatcher />
<SiteAnalytics />
<SiteTallyfin />
<SiteAnalyticsConsent />
<a class="skip-link" href="#main-content" onclick={handleSkipToContent}>
	{$i18n.t("site:skip_to_content_label")}
</a>
{@render children()}

<div style="display:none">
	{#each languageOptions as language (language.locale)}
		<a
			href={resolve(localizeSitePathname(page.url.pathname, language.locale) as Pathname)}
		>{language.locale}</a>
	{/each}
</div>
