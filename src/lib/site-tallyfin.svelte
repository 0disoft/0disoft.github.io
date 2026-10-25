<script lang="ts">
	import { afterNavigate } from "$app/navigation";
	import { onMount } from "svelte";
	import { subscribeAnalyticsConsent } from "$lib/site-analytics";
	import { setTallyfinConsent, trackTallyfinPageView } from "$lib/site-tallyfin";

	let navigation = {};
	onMount(() => {
		const unsubscribe = subscribeAnalyticsConsent((value) => {
			setTallyfinConsent(value === "granted");
			if (value === "granted") trackTallyfinPageView(new URL(window.location.href), navigation);
		});
		return () => { unsubscribe(); setTallyfinConsent(false); };
	});
	afterNavigate(({ to, type }) => {
		if (type !== "enter") navigation = {};
		if (to?.url) trackTallyfinPageView(to.url, navigation);
	});
</script>
