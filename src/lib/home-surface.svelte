<script lang="ts">
	import { page } from "$app/state";
	import { siteProfile } from "$lib/site-profile";

	const indiehackers = $derived(page.data.indiehackers);
</script>

<section class="home-section" aria-labelledby="home-title">
	<header class="home-intro">
		<p class="home-eyebrow">{siteProfile.name}</p>
		<h1 id="home-title">{siteProfile.description}</h1>
		<p class="home-lede">{indiehackers.paragraphs[0]}</p>
	</header>
</section>

<style>
	.home-section {
		display: grid;
		width: min(100%, 54rem);
		gap: 2rem;
	}

	.home-intro {
		display: grid;
		gap: 0.7rem;
		padding-block: clamp(1.25rem, 5vh, 3.5rem) 0.5rem;
	}

	.home-eyebrow {
		margin: 0;
		color: var(--moss);
		font-size: 0.85rem;
		font-weight: 780;
		letter-spacing: 0;
		text-transform: uppercase;
	}

	.home-intro h1 {
		margin: 0;
		font-size: clamp(1.75rem, 3.5vw, 2.5rem);
		font-weight: 820;
		letter-spacing: 0;
		line-height: 1.16;
		text-wrap: balance;
	}

	.home-lede {
		margin: 0;
		color: var(--muted-foreground);
		line-height: 1.65;
	}
</style>
