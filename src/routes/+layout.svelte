<script lang="ts">
import type { Pathname } from '$app/types';
import { onNavigate } from '$app/navigation';
import { resolve } from '$app/paths';
import { page } from '$app/state';
import { onMount } from 'svelte';
import * as m from '$lib/paraglide/messages';
import { getLocale } from '$lib/paraglide/runtime';
import { toDisplayLocale } from '$lib/site-labels';
	import {
		getPathLocale,
		getPreferredClientLocale,
		languageOptions,
		localizeSitePathname,
	} from '$lib/site-locales';
	import SiteAnalytics from "$lib/site-analytics.svelte";
	import SiteAnalyticsConsent from "$lib/site-analytics-consent.svelte";
	import { birdMarkPath } from '$lib/site-assets';
	import {
		getSitePlainTextAlternateLinks,
		getSiteRssAlternateLinks,
		siteThemeColorMeta,
	} from "$lib/site-meta";
	import { siteProfile } from '$lib/site-profile';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';

	let { children } = $props();
	const shareImageUrl = `${siteProfile.origin}${birdMarkPath}`;
	const rssAlternateLinks = getSiteRssAlternateLinks();
	const plainTextAlternateLinks = getSitePlainTextAlternateLinks();
	const displayLocale = $derived(toDisplayLocale(getLocale()));

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
		if (typeof document.startViewTransition !== "function") {
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
	<meta name="description" content={siteProfile.description} />
	<link rel="icon" href={birdMarkPath} />
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
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={siteProfile.name} />
	<meta property="og:title" content={siteProfile.name} />
	<meta property="og:description" content={siteProfile.description} />
	<meta property="og:image" content={shareImageUrl} />
	<meta property="og:image:alt" content="0disoft bird mark" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={siteProfile.name} />
	<meta name="twitter:description" content={siteProfile.description} />
	<meta name="twitter:image" content={shareImageUrl} />
</svelte:head>
<ModeWatcher />
<SiteAnalytics />
<SiteAnalyticsConsent />
<a class="skip-link" href="#main-content" onclick={handleSkipToContent}>
	{m.skip_to_content_label({}, { locale: displayLocale })}
</a>
{@render children()}

<div style="display:none">
	{#each languageOptions as language (language.locale)}
		<a
			href={resolve(localizeSitePathname(page.url.pathname, language.locale) as Pathname)}
		>{language.locale}</a>
	{/each}
</div>
