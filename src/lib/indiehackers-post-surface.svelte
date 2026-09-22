<script lang="ts">
	import IndiehackersShareToolbar from "$lib/indiehackers-share-toolbar.svelte";
	import {
		getIndiehackersPostTagLabels,
		type IndiehackersPost,
		type IndiehackersPostDetail,
	} from "$lib/indiehackers-posts";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";
	import { siteProfile } from "$lib/site-profile";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";

	let { data }: { data: { post: IndiehackersPostDetail; adjacentPosts: { previous: IndiehackersPost | null; next: IndiehackersPost | null } } } = $props();

const locale = $derived(getLocale());
const displayLocale = $derived(isSiteLocale(locale) ? locale : "en");
const selectedLocale = $derived(displayLocale);
const post = $derived(data.post);
const adjacentPosts = $derived(data.adjacentPosts);
const tagLabels = $derived(getIndiehackersPostTagLabels(post));
const shareUrl = $derived(
	new URL(
		localizeSitePathname(`/indiehackers/${post.slug}`, selectedLocale),
		siteProfile.origin,
	).toString(),
);
const backHref = $derived(localizeSitePathname("/indiehackers", selectedLocale));

function getPostHref(slug: string): string {
	return localizeSitePathname(`/indiehackers/${slug}`, selectedLocale);
}
</script>

<svelte:head>
	<title>{post.title} · {siteProfile.name}</title>
	<meta name="description" content={post.summary} />
	</svelte:head>

	<article class="indiehackers" aria-labelledby="post-title">
	<header class="indiehackers-header">
		<p class="indiehackers-back">
			<a href={backHref}>← {m.indiehackers_back_to_list({}, { locale: displayLocale })}</a>
		</p>
		<h1 id="post-title">{post.title}</h1>
		<p class="indiehackers-meta">
			<time datetime={post.publishedAt}>{post.publishedAt}</time>
			<span aria-hidden="true"> · </span>
			<span>{tagLabels.join(", ")}</span>
		</p>
		<p class="indiehackers-summary">{post.summary}</p>
	</header>

	<div class="indiehackers-reading-layout">
		<div class="indiehackers-body">
			{#each post.body.split(/\n{2,}/) as paragraph}
				<p>{paragraph.replace(/\n/g, " ").trim()}</p>
			{/each}
		</div>

		<aside class="indiehackers-sidecar" data-pagefind-ignore="all">
			<IndiehackersShareToolbar
				title={post.title}
				url={shareUrl}
				headingId="indiehackers-share-title"
			/>
		</aside>
	</div>

	{#if adjacentPosts.previous || adjacentPosts.next}
		<nav class="indiehackers-adjacent" aria-label="More posts">
			{#if adjacentPosts.previous}
				<a href={getPostHref(adjacentPosts.previous.slug)}>← {adjacentPosts.previous.title}</a>
			{/if}
			{#if adjacentPosts.next}
				<a href={getPostHref(adjacentPosts.next.slug)}>{adjacentPosts.next.title} →</a>
			{/if}
		</nav>
	{/if}
</article>

<style>
	.indiehackers {
		--indiehackers-body-width: 48rem;
		--indiehackers-sidecar-min-width: 12rem;
		--indiehackers-sidecar-max-width: 16rem;

		display: grid;
		width: min(100%, 70rem);
		gap: 1.3rem;
		color: var(--foreground);
	}

	.indiehackers-header {
		display: grid;
		gap: 0.9rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.indiehackers-back {
		margin: 0;
		font-size: 0.9rem;
	}

	.indiehackers-back a {
		color: var(--muted-foreground);
		text-decoration: none;
	}

	.indiehackers-header h1 {
		margin: 0;
		color: var(--foreground);
		font-size: clamp(1.55rem, 3.85vw, 2.9rem);
		font-weight: 740;
		letter-spacing: 0;
		line-height: 1;
		text-shadow: 0 0.07em 0 var(--display-heading-shadow);
	}

	.indiehackers-meta,
	.indiehackers-summary {
		margin: 0;
		color: var(--muted-foreground);
		line-height: 1.6;
	}

	.indiehackers-reading-layout {
		display: grid;
		grid-template-areas: "body sidecar";
		grid-template-columns: minmax(0, var(--indiehackers-body-width)) minmax(
				var(--indiehackers-sidecar-min-width),
				var(--indiehackers-sidecar-max-width)
			);
		gap: clamp(1.25rem, 4vw, 2.5rem);
		align-items: start;
	}

	.indiehackers-body {
		display: grid;
		grid-area: body;
		min-width: 0;
		gap: 1rem;
		font-size: calc(1.02rem + 2pt);
		line-height: 1.75;
	}

	.indiehackers-body p {
		margin: 0;
	}

	.indiehackers-sidecar {
		display: grid;
		position: sticky;
		top: 1.25rem;
		grid-area: sidecar;
		gap: 0.9rem;
		padding-left: 0.85rem;
		border-left: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		color: var(--foreground);
		font-size: calc(0.86rem + 1pt);
		line-height: 1.35;
		user-select: none;
	}

	.indiehackers-adjacent {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: space-between;
		padding-top: 1rem;
		border-top: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	@media (max-width: 72rem) {
		.indiehackers-reading-layout {
			grid-template-areas:
				"sidecar"
				"body";
			grid-template-columns: minmax(0, var(--indiehackers-body-width));
		}

		.indiehackers-sidecar {
			position: static;
			padding: 0 0 0.8rem;
			border-left: 0;
			border-bottom: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		}
	}
</style>
