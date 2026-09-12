<script lang="ts">
	import { browser } from "$app/environment";
	import { afterNavigate } from "$app/navigation";
	import {
		initSiteAnalytics,
		isSiteAnalyticsConfigured,
		subscribeAnalyticsConsent,
		setGa4AnalyticsConsent,
		trackGa4PageView,
	} from "$lib/site-analytics";

	let analyticsConsent = $state(false);
	let analyticsReady = $state(false);
	let currentNavigation = {};

	$effect(() => {
		if (!browser) {
			return;
		}

		return subscribeAnalyticsConsent((value) => {
			analyticsConsent = value === "granted";
		});
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
				trackGa4PageView(new URL(window.location.href), document.title, currentNavigation);
			}
		});

		return () => {
			canceled = true;
		};
	});

	afterNavigate(({ to, type }) => {
		// Initial entry shares its identity with initialization; later visits never do.
		if (type !== "enter") currentNavigation = {};
		if (!browser || !analyticsReady || !analyticsConsent || !to?.url) {
			return;
		}

		trackGa4PageView(to.url, document.title, currentNavigation);
	});
</script>
