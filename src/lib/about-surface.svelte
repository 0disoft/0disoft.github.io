<script lang="ts">
	import { page } from "$app/state";
	import { siteProfile } from "$lib/site-profile";

	const about = $derived(page.data.about);
</script>

<svelte:head>
	<title>{about.title} · {siteProfile.name}</title>
</svelte:head>

<article class="about" aria-labelledby="section-title">
	<header class="about-header">
		<h1 id="section-title">{about.title}</h1>
	</header>

	<div class="about-body">
		{#each about.paragraphs as paragraph}
			<p>{paragraph}</p>
		{/each}
	</div>
</article>

<style>
	.about {
		display: grid;
		width: min(100%, 48rem);
		gap: 1.3rem;
		color: var(--foreground);
	}

	.about-header {
		display: grid;
		gap: 0.9rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.about-header h1 {
		margin: 0;
		color: var(--foreground);
		font-size: clamp(1.55rem, 3.85vw, 2.9rem);
		font-weight: 740;
		letter-spacing: 0;
		line-height: 1;
		text-shadow: 0 0.07em 0 var(--display-heading-shadow);
	}

	.about-body {
		display: grid;
		gap: 1rem;
		font-size: calc(1.02rem + 2pt);
		line-height: 1.75;
	}

	.about-body p {
		margin: 0;
	}
</style>
