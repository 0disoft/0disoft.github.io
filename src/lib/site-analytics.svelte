<script lang="ts">
	import { browser } from "$app/environment";
	import { afterNavigate } from "$app/navigation";
	import {
		initSiteAnalytics,
		isSiteAnalyticsConfigured,
		readStoredAnalyticsConsent,
		setGa4AnalyticsConsent,
		trackGa4PageView,
	} from "$lib/site-analytics";
	import { siteAnalyticsConsentChangeEvent } from "$lib/site-analytics-core";

	let analyticsConsent = $state(false);
	let analyticsReady = $state(false);

	$effect(() => {
		if (!browser) {
			return;
		}

		function handleConsentChange() {
			analyticsConsent = readStoredAnalyticsConsent();
		}

		analyticsConsent = readStoredAnalyticsConsent();
		window.addEventListener(siteAnalyticsConsentChangeEvent, handleConsentChange);

		return () => window.removeEventListener(siteAnalyticsConsentChangeEvent, handleConsentChange);
	});

	$effect(() => {
		if (!browser || !isSiteAnalyticsConfigured()) {
			return;
		}

		let canceled = false;
		setGa4AnalyticsConsent(analyticsConsent);

		if (!analyticsConsent) {
			analyticsReady = false;
			return;
		}

		void initSiteAnalytics().then((ready) => {
			if (canceled) {
				return;
			}

			analyticsReady = ready;

			if (ready) {
				trackGa4PageView(new URL(window.location.href), document.title);
			}
		});

		return () => {
			canceled = true;
		};
	});

	afterNavigate(({ to }) => {
		if (!browser || !analyticsReady || !analyticsConsent || !to?.url) {
			return;
		}

		trackGa4PageView(to.url, document.title);
	});
</script>
