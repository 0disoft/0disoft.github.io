<script lang="ts">
	import { browser } from "$app/environment";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import {
		isSiteAnalyticsConfigured,
		readStoredAnalyticsConsentValue,
		writeStoredAnalyticsConsent,
	} from "$lib/site-analytics";
	import {
		readStoredAdvertisingConsentValue,
		writeStoredAdvertisingConsent,
	} from "$lib/site-advertising-consent";
	import { isSiteAdvertisingConfigured } from "$lib/site-advertising";
	import { toDisplayLocale } from "$lib/site-labels";

	let visible = $state(false);
	const displayLocale = $derived(toDisplayLocale(getLocale()));
	const analyticsConfigured = isSiteAnalyticsConfigured();
	const advertisingConfigured = isSiteAdvertisingConfigured();

	$effect(() => {
		if (!browser || (!analyticsConfigured && !advertisingConfigured)) {
			return;
		}

		visible =
			(analyticsConfigured && readStoredAnalyticsConsentValue() === null) ||
			(advertisingConfigured && readStoredAdvertisingConsentValue() === null);
	});

	function acceptConfiguredServices() {
		writeConfiguredServiceConsent(true);
		visible = false;
	}

	function declineConfiguredServices() {
		writeConfiguredServiceConsent(false);
		visible = false;
	}

	function writeConfiguredServiceConsent(enabled: boolean) {
		if (analyticsConfigured) {
			writeStoredAnalyticsConsent(enabled);
		}

		if (advertisingConfigured) {
			writeStoredAdvertisingConsent(enabled);
		}
	}
</script>

{#if visible}
	<section
		class="analytics-consent"
		aria-label={m.analytics_consent_title({}, { locale: displayLocale })}
	>
		<p>{m.analytics_consent_body({}, { locale: displayLocale })}</p>
		<div class="analytics-consent-actions">
			<button type="button" class="primary" onclick={acceptConfiguredServices}>
				{m.analytics_consent_accept({}, { locale: displayLocale })}
			</button>
			<button type="button" onclick={declineConfiguredServices}>
				{m.analytics_consent_decline({}, { locale: displayLocale })}
			</button>
		</div>
	</section>
{/if}

<style>
	.analytics-consent {
		position: fixed;
		right: clamp(1rem, 3vw, 1.5rem);
		bottom: clamp(1rem, 3vw, 1.5rem);
		z-index: 4;
		display: grid;
		width: min(24rem, calc(100vw - 2rem));
		gap: 0.8rem;
		padding: 0.9rem;
		border: 1px solid var(--mode-control-border);
		border-radius: var(--radius-lg);
		background: color-mix(in oklch, var(--popover) 94%, transparent);
		color: var(--popover-foreground);
		box-shadow: 0 1rem 3rem color-mix(in oklch, var(--ink) 24%, transparent);
		user-select: none;
	}

	.analytics-consent p {
		margin: 0;
		font-size: 0.92rem;
		line-height: 1.45;
	}

	.analytics-consent-actions {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.45rem;
	}

	.analytics-consent button {
		min-height: 2.45rem;
		border: 1px solid var(--mode-control-border);
		border-radius: var(--radius-md);
		background: var(--mode-control-background);
		color: var(--mode-control-foreground);
		cursor: pointer;
		font: inherit;
		font-weight: 560;
	}

	.analytics-consent button.primary,
	.analytics-consent button:hover {
		background: var(--mode-control-hover-background);
	}

	.analytics-consent button:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--sidebar-ring) 70%, white);
		outline-offset: 3px;
	}
</style>
