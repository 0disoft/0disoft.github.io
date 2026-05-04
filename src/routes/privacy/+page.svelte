<script lang="ts">
	import SiteSurface from "$lib/site-surface.svelte";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import { toDisplayLocale } from "$lib/site-labels";
	import { siteProfile } from "$lib/site-profile";

	const displayLocale = $derived(toDisplayLocale(getLocale()));
</script>

<svelte:head>
	<title>{m.privacy_page_title({}, { locale: displayLocale })} · {siteProfile.name}</title>
</svelte:head>

<SiteSurface>
	<article class="privacy-document" aria-labelledby="privacy-title">
		<header>
			<h1 id="privacy-title">{m.privacy_page_title({}, { locale: displayLocale })}</h1>
			<p>{m.privacy_page_intro({}, { locale: displayLocale })}</p>
		</header>

		<section aria-labelledby="privacy-analytics-title">
			<h2 id="privacy-analytics-title">
				{m.privacy_analytics_title({}, { locale: displayLocale })}
			</h2>
			<p>{m.privacy_analytics_body({}, { locale: displayLocale })}</p>
		</section>

		<section aria-labelledby="privacy-cookies-title">
			<h2 id="privacy-cookies-title">
				{m.privacy_cookies_title({}, { locale: displayLocale })}
			</h2>
			<p>{m.privacy_cookies_body({}, { locale: displayLocale })}</p>
		</section>

		<section aria-labelledby="privacy-choices-title">
			<h2 id="privacy-choices-title">
				{m.privacy_choices_title({}, { locale: displayLocale })}
			</h2>
			<p>{m.privacy_choices_body({}, { locale: displayLocale })}</p>
		</section>
	</article>
</SiteSurface>

<style>
	.privacy-document {
		display: grid;
		max-width: min(100%, 48rem);
		gap: 1.45rem;
		color: var(--foreground);
	}

	.privacy-document header {
		display: grid;
		gap: 0.65rem;
		padding-bottom: 0.9rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 72%, transparent);
	}

	.privacy-document h1,
	.privacy-document h2,
	.privacy-document p {
		margin: 0;
	}

	.privacy-document h1 {
		font-size: clamp(2rem, 4vw, 3rem);
		font-weight: 720;
		letter-spacing: 0;
		line-height: 1.05;
	}

	.privacy-document h2 {
		font-size: 1.08rem;
		font-weight: 650;
		letter-spacing: 0;
	}

	.privacy-document p {
		max-width: 62ch;
		color: color-mix(in oklch, var(--foreground) 82%, transparent);
		font-size: 1.02rem;
		line-height: 1.75;
	}

	.privacy-document section {
		display: grid;
		gap: 0.45rem;
		padding-top: 0.9rem;
		border-top: 1px solid color-mix(in oklch, var(--border) 56%, transparent);
	}
</style>
