<script lang="ts">
	import type { Pathname } from '$app/types';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import {
		getPathLocale,
		getPreferredClientLocale,
		languageOptions,
		localizeSitePathname,
	} from '$lib/site-locales';
	import SiteAnalytics from "$lib/site-analytics.svelte";
	import SiteAnalyticsConsent from "$lib/site-analytics-consent.svelte";
	import { birdMarkPath } from '$lib/site-assets';
	import { getRssFeedPath } from '$lib/site-meta';
	import { siteProfile } from '$lib/site-profile';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';

	let { children } = $props();
	const shareImageUrl = `${siteProfile.origin}${birdMarkPath}`;

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
</script>

<svelte:head>
	<title>{siteProfile.name}</title>
	<meta name="description" content={siteProfile.description} />
	<link rel="icon" href={birdMarkPath} />
	{#each languageOptions as language (language.locale)}
		<link
			rel="alternate"
			type="application/rss+xml"
			href={getRssFeedPath(language.locale)}
			title={`${siteProfile.name} ${language.label} RSS`}
		/>
	{/each}
	<link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
	<meta name="theme-color" content="#fbf7e8" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#152814" media="(prefers-color-scheme: dark)" />
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
{@render children()}

<div style="display:none">
	{#each languageOptions as language (language.locale)}
		<a
			href={resolve(localizeSitePathname(page.url.pathname, language.locale) as Pathname)}
		>{language.locale}</a>
	{/each}
</div>
