<script lang="ts">
	import { ArrowLeft, Home } from "@lucide/svelte";
	import { page } from "$app/state";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import { birdMarkPath } from "$lib/site-assets";
	import { siteProfile } from "$lib/site-profile";

	type ErrorLocale = "ko" | "en";

	const message = $derived(page.error?.message ?? "Not Found");
	const errorLocale = $derived(getErrorLocale(page.url.pathname));

	function getErrorLocale(pathname: string): ErrorLocale {
		const selectedLocale = getLocale();

		if (selectedLocale === "ko" || pathname === "/ko" || pathname.startsWith("/ko/")) {
			return "ko";
		}

		return "en";
	}

	function handleBack() {
		if (document.referrer) {
			window.history.back();
			return;
		}

		window.location.assign("/");
	}
</script>

<svelte:head>
	<title>{page.status} · {siteProfile.name}</title>
</svelte:head>

<main class="error-shell watercolor-backdrop">
	<section class="error-panel" aria-labelledby="error-title">
		<img src={birdMarkPath} alt="" />

		<div class="error-copy">
			<p>{page.status}</p>
			<h1 id="error-title">{message}</h1>

			<div class="actions">
				<a href="/">
					<Home size={18} strokeWidth={2.2} aria-hidden="true" />
					<span>{m.error_home({}, { locale: errorLocale })}</span>
				</a>
				<button type="button" onclick={handleBack}>
					<ArrowLeft size={18} strokeWidth={2.2} aria-hidden="true" />
					<span>{m.error_back({}, { locale: errorLocale })}</span>
				</button>
			</div>
		</div>
	</section>
</main>

<style>
	.error-shell {
		display: grid;
		min-height: 100svh;
		place-items: center;
		padding: clamp(1rem, 4vw, 4rem);
	}

	.error-panel {
		--error-secondary-background: color-mix(in oklch, var(--paper-soft) 76%, var(--stone));
		--error-secondary-border: color-mix(in oklch, var(--ink) 42%, var(--bronze));
		--error-secondary-foreground: color-mix(in oklch, var(--ink) 92%, black);

		position: relative;
		z-index: 1;
		display: grid;
		width: min(100%, 44rem);
		grid-template-columns: minmax(6rem, 11rem) minmax(0, 1fr);
		gap: clamp(1rem, 4vw, 2.5rem);
		align-items: center;
		padding: clamp(1rem, 4vw, 2.5rem);
		border: 1px solid color-mix(in oklch, var(--border) 82%, var(--bronze));
		border-radius: var(--radius-2xl);
		background:
			linear-gradient(135deg, color-mix(in oklch, var(--card) 96%, white) 0%, var(--card) 58%, color-mix(in oklch, var(--water) 14%, var(--card)) 100%);
		box-shadow:
			0 1.5rem 4rem color-mix(in oklch, var(--ink) 18%, transparent),
			inset 0 0 0 1px color-mix(in oklch, white 62%, transparent);
	}

	.error-panel img {
		width: min(100%, 11rem);
		aspect-ratio: 1;
		border: 1px solid color-mix(in oklch, var(--ink) 22%, var(--bronze));
		border-radius: var(--radius-xl);
		box-shadow: 0 1rem 2rem color-mix(in oklch, var(--moss) 20%, transparent);
		object-fit: cover;
		transform: rotate(-1.5deg);
	}

	.error-copy {
		display: grid;
		gap: 1rem;
		justify-items: start;
	}

	p {
		margin: 0;
		color: var(--accent);
		font-size: clamp(2.5rem, 8vw, 6rem);
		font-feature-settings: "zero" 1;
		font-variant-numeric: slashed-zero;
		font-weight: 820;
		letter-spacing: 0;
		line-height: 0.9;
		text-shadow: 0 0.06em 0 color-mix(in oklch, var(--ink) 15%, transparent);
	}

	h1 {
		margin: 0;
		color: var(--foreground);
		font-size: clamp(1.75rem, 5vw, 3.75rem);
		font-weight: 780;
		letter-spacing: 0;
		line-height: 1;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	a,
	button {
		display: inline-flex;
		min-height: 2.75rem;
		align-items: center;
		gap: 0.55rem;
		padding: 0 1rem;
		border: 1px solid color-mix(in oklch, var(--moss) 68%, var(--ink));
		border-radius: var(--radius-md);
		background: var(--primary);
		color: var(--primary-foreground);
		font: inherit;
		font-weight: 720;
		text-decoration: none;
		cursor: pointer;
		box-shadow: 0 0.55rem 1.2rem color-mix(in oklch, var(--moss) 20%, transparent);
	}

	button {
		border-color: var(--error-secondary-border);
		background: var(--error-secondary-background);
		color: var(--error-secondary-foreground);
	}

	a:hover,
	button:hover {
		transform: translateY(-1px);
	}

	button:hover {
		background: color-mix(in oklch, var(--paper-soft) 62%, var(--bronze));
	}

	a:focus-visible,
	button:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--ring) 72%, white);
		outline-offset: 3px;
	}

	@media (max-width: 40rem) {
		.error-panel {
			grid-template-columns: 1fr;
		}

		.error-panel img {
			width: min(100%, 9rem);
		}
	}
</style>
