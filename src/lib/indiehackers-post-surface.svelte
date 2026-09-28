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
				{#if paragraph.trim().startsWith("## ")}
					<h2>{paragraph.replace(/\n/g, " ").trim().slice(3).trim()}</h2>
				{:else}
					<p>{paragraph.replace(/\n/g, " ").trim()}</p>
				{/if}
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
		<nav
			class="indiehackers-adjacent"
			aria-label={m.indiehackers_more_posts({}, { locale: displayLocale })}
		>
			{#if adjacentPosts.previous}
				<a class="adjacent-card" href={getPostHref(adjacentPosts.previous.slug)}>
					<span class="adjacent-card-copy">
						<span class="adjacent-card-direction">
							<span class="adjacent-card-arrow" aria-hidden="true">←</span>
							{m.indiehackers_previous_post({}, { locale: displayLocale })}
						</span>
						<span class="adjacent-card-title">{adjacentPosts.previous.title}</span>
						<span class="adjacent-card-meta">
							{#if adjacentPosts.previous.productName}
								<span>{adjacentPosts.previous.productName}</span>
								<span aria-hidden="true">·</span>
							{/if}
							<time datetime={adjacentPosts.previous.publishedAt}>{adjacentPosts.previous.publishedAt}</time>
						</span>
					</span>
					<span class="adjacent-card-cover" aria-hidden="true">
						{#if adjacentPosts.previous.coverImage}
							<img src={adjacentPosts.previous.coverImage} alt="" width="1440" height="810" loading="lazy" decoding="async" />
						{:else}
							<span>←</span>
						{/if}
					</span>
				</a>
			{/if}
			{#if adjacentPosts.next}
				<a class="adjacent-card adjacent-card-next" href={getPostHref(adjacentPosts.next.slug)}>
					<span class="adjacent-card-copy">
						<span class="adjacent-card-direction">
							{m.indiehackers_next_post({}, { locale: displayLocale })}
							<span class="adjacent-card-arrow" aria-hidden="true">→</span>
						</span>
						<span class="adjacent-card-title">{adjacentPosts.next.title}</span>
						<span class="adjacent-card-meta">
							{#if adjacentPosts.next.productName}
								<span>{adjacentPosts.next.productName}</span>
								<span aria-hidden="true">·</span>
							{/if}
							<time datetime={adjacentPosts.next.publishedAt}>{adjacentPosts.next.publishedAt}</time>
						</span>
					</span>
					<span class="adjacent-card-cover" aria-hidden="true">
						{#if adjacentPosts.next.coverImage}
							<img src={adjacentPosts.next.coverImage} alt="" width="1440" height="810" loading="lazy" decoding="async" />
						{:else}
							<span>→</span>
						{/if}
					</span>
				</a>
			{/if}
		</nav>
	{/if}
</article>

<style>
	.indiehackers {
		--indiehackers-body-width: 56rem;
		--indiehackers-sidecar-min-width: 9.5rem;
		--indiehackers-sidecar-max-width: 11rem;

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

	.indiehackers-body h2 {
		margin: 0.75rem 0 0;
		font-size: 1.32rem;
		font-weight: 720;
		letter-spacing: 0;
		line-height: 1.35;
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
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.85rem;
		padding-top: 1.5rem;
		border-top: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.adjacent-card {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 7.5rem;
		align-items: stretch;
		min-width: 0;
		min-height: 9rem;
		gap: 1rem;
		padding: 0.85rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-xl);
		background: color-mix(in oklch, var(--muted) 45%, var(--card));
		color: var(--foreground);
		text-decoration: none;
		transition: border-color 180ms ease, background-color 180ms ease, transform 180ms ease;
	}

	.adjacent-card:only-child {
		grid-column: 1 / -1;
		width: min(100%, 34rem);
	}

	.adjacent-card-next:only-child {
		justify-self: end;
	}

	.adjacent-card:hover {
		transform: translateY(-0.15rem);
		border-color: var(--accent);
		background: color-mix(in oklch, var(--accent) 9%, var(--card));
	}

	.adjacent-card:hover .adjacent-card-title {
		text-decoration: underline;
		text-underline-offset: 0.18em;
	}

	.adjacent-card:focus-visible {
		outline: 2px solid var(--focus-ring);
		outline-offset: 3px;
	}

	.adjacent-card-copy {
		display: flex;
		flex-direction: column;
		min-width: 0;
		gap: 0.45rem;
		padding: 0.2rem 0.15rem;
	}

	.adjacent-card-direction {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		color: var(--accent);
		font-size: 0.8rem;
		font-weight: 720;
	}

	.adjacent-card-arrow {
		display: grid;
		place-items: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: color-mix(in oklch, var(--accent) 14%, var(--card));
		font-size: 1rem;
		line-height: 1;
	}

	.adjacent-card-title {
		font-size: 1.02rem;
		font-weight: 700;
		line-height: 1.4;
		overflow-wrap: anywhere;
	}

	.adjacent-card-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 0.4rem;
		margin-top: auto;
		color: var(--muted-foreground);
		font-size: 0.78rem;
		line-height: 1.35;
	}

	.adjacent-card-cover {
		display: grid;
		place-items: center;
		align-self: center;
		overflow: hidden;
		width: 100%;
		aspect-ratio: 1;
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--accent) 18%, var(--muted));
		color: var(--accent);
		font-size: 2rem;
	}

	.adjacent-card-cover img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 48rem) {
		.indiehackers-adjacent {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 28rem) {
		.adjacent-card {
			grid-template-columns: minmax(0, 1fr);
			min-height: 0;
		}

		.adjacent-card-cover {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.adjacent-card {
			transition: none;
		}

		.adjacent-card:hover {
			transform: none;
		}
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
