<script lang="ts">
	import { page } from "$app/state";
	import { siteProfile } from "$lib/site-profile";

	const uses = $derived(page.data.uses);
</script>

<svelte:head>
	<title>{uses.title} · {siteProfile.name}</title>
</svelte:head>

<article class="uses" aria-labelledby="section-title">
	<header class="uses-header">
		<h1 id="section-title">{uses.title}</h1>
	</header>

	<div class="uses-body">
		{#each uses.paragraphs as paragraph}
			<p>{paragraph}</p>
		{/each}
	</div>
</article>

<style>
	.uses {
		display: grid;
		width: min(100%, 48rem);
		gap: 1.3rem;
		color: var(--foreground);
	}

	.uses-header {
		display: grid;
		gap: 0.9rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.uses-header h1 {
		margin: 0;
		color: var(--foreground);
		font-size: clamp(1.55rem, 3.85vw, 2.9rem);
		font-weight: 740;
		letter-spacing: 0;
		line-height: 1;
		text-shadow: 0 0.07em 0 var(--display-heading-shadow);
	}

	.uses-body {
		display: grid;
		gap: 1rem;
		font-size: calc(1.02rem + 2pt);
		line-height: 1.75;
	}

	.uses-body p {
		margin: 0;
	}
</style>
