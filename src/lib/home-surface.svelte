<script lang="ts">
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import { page } from "$app/state";
	import { toDisplayLocale } from "$lib/site-labels";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";
	import { siteProfile } from "$lib/site-profile";
	import { getWorkStatusLabel } from "$lib/work-labels";
	import { getPrimaryWorkHref, getWorksForLocale, workItems } from "$lib/works";

	const locale = $derived(getLocale());
	const displayLocale = $derived(toDisplayLocale(locale));
	const siteLocale = $derived(isSiteLocale(locale) ? locale : "en");
	const latestPost = $derived(page.data.blogPosts[0]);
	const latestPostPath = $derived(
		latestPost ? localizeSitePathname(`/blog/${latestPost.slug}`, siteLocale) : "/",
	);
	const featuredWorks = $derived(getWorksForLocale(workItems, locale).slice(0, 3));
</script>

<section class="home-section" aria-labelledby="home-title">
	<header class="home-intro">
		<p class="home-eyebrow">{siteProfile.name}</p>
		<h1 id="home-title">{siteProfile.description}</h1>
	</header>

	{#if latestPost}
		<section class="home-block" aria-labelledby="home-latest-title">
			<div class="home-block-heading">
				<h2 id="home-latest-title">{m.home_latest_post_label({}, { locale: displayLocale })}</h2>
				<a href={localizeSitePathname("/blog", siteLocale)}>
					{m.home_all_posts_label({}, { locale: displayLocale })}
				</a>
			</div>
			<a class="home-post" href={latestPostPath}>
				<time datetime={latestPost.publishedAt}>{latestPost.publishedAt}</time>
				<h3>{latestPost.title}</h3>
			</a>
		</section>
	{/if}

	{#if featuredWorks.length > 0}
		<section class="home-block" aria-labelledby="home-works-title">
			<div class="home-block-heading">
				<h2 id="home-works-title">{m.home_selected_projects_label({}, { locale: displayLocale })}</h2>
				<a href={localizeSitePathname("/projects", siteLocale)}>
					{m.home_all_projects_label({}, { locale: displayLocale })}
				</a>
			</div>
			<ol class="home-works" role="list">
				{#each featuredWorks as work (work.slug)}
					{@const primaryHref = getPrimaryWorkHref(work.links)}
					<li>
						{#if primaryHref}
							<a
								class="home-work-card"
								href={primaryHref}
								target={primaryHref.startsWith("http") ? "_blank" : undefined}
								rel={primaryHref.startsWith("http") ? "noopener noreferrer" : undefined}
							>
								<div class="home-work-heading">
									<h3>{work.title}</h3>
									<span class="home-work-status" data-status={work.status}>
										{getWorkStatusLabel(work.status, displayLocale)}
									</span>
								</div>
								{#if work.summary}
									<p>{work.summary}</p>
								{/if}
							</a>
						{:else}
							<article class="home-work-card">
								<div class="home-work-heading">
									<h3>{work.title}</h3>
									<span class="home-work-status" data-status={work.status}>
										{getWorkStatusLabel(work.status, displayLocale)}
									</span>
								</div>
								{#if work.summary}
									<p>{work.summary}</p>
								{/if}
							</article>
						{/if}
					</li>
				{/each}
			</ol>
		</section>
	{/if}

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


	.home-block {
		display: grid;
		gap: 0.4rem;
	}

	.home-block-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: 0.35rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 78%, transparent);
	}

	.home-block-heading h2 {
		margin: 0;
	}

	.home-block-heading h2 {
		font-size: 0.95rem;
		font-weight: 780;
		letter-spacing: 0;
	}

	.home-block-heading a {
		color: var(--muted-foreground);
		font-size: 0.88rem;
		font-weight: 700;
		text-decoration: none;
	}

	.home-block-heading a:hover {
		color: var(--foreground);
		text-decoration: underline;
		text-underline-offset: 0.18em;
	}

	.home-post {
		display: grid;
		gap: 0.45rem;
		padding: 1rem 0;
		color: inherit;
		text-decoration: none;
	}

	.home-post time {
		color: var(--muted-foreground);
		font-size: 0.85rem;
		font-weight: 680;
	}

	.home-post h3 {
		margin: 0;
	}

	.home-post h3 {
		font-size: 1.2rem;
		font-weight: 780;
		letter-spacing: 0;
	}

	.home-post:hover h3 {
		text-decoration: underline;
		text-decoration-thickness: 0.08em;
		text-underline-offset: 0.18em;
	}

	.home-works {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 15.5rem), 1fr));
		gap: 0.85rem;
		padding: 0;
		margin: 0.6rem 0 0;
		list-style: none;
	}

	.home-works > li {
		display: flex;
	}

	.home-work-card {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 0.6rem;
		padding: 1rem;
		border: 1px solid color-mix(in oklch, var(--border) 78%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 72%, transparent);
		color: inherit;
		text-decoration: none;
	}

	a.home-work-card:hover {
		border-color: color-mix(in oklch, var(--foreground) 28%, var(--border));
	}

	:global(.dark) .home-work-card {
		background: color-mix(in oklch, var(--card) 78%, transparent);
	}

	.home-work-heading {
		display: flex;
		gap: 0.7rem;
		align-items: start;
		justify-content: space-between;
		min-width: 0;
	}

	.home-work-heading h3,
	.home-work-card p {
		margin: 0;
	}

	.home-work-heading h3 {
		min-width: 0;
		font-size: 1.05rem;
		font-weight: 780;
		letter-spacing: 0;
		overflow-wrap: anywhere;
	}

	.home-work-card p {
		color: var(--muted-foreground);
		line-height: 1.5;
	}

	.home-work-status {
		flex: 0 0 auto;
		padding: 0.18rem 0.48rem;
		border: 1px solid color-mix(in oklch, var(--border) 82%, transparent);
		border-radius: var(--radius-sm);
		background: color-mix(in oklch, var(--mode-control-background) 88%, transparent);
		color: var(--mode-control-foreground);
		font-size: 0.78rem;
		font-weight: 760;
		user-select: none;
	}

	.home-work-status[data-status="live"] {
		border-color: color-mix(in oklch, var(--moss) 48%, var(--border));
	}

	.home-work-status[data-status="building"] {
		border-color: color-mix(in oklch, var(--water-deep) 52%, var(--border));
	}

	.home-work-status[data-status="experimental"] {
		border-color: color-mix(in oklch, var(--wildflower) 48%, var(--border));
	}

	.home-block-heading a:focus-visible,
	.home-post:focus-visible,
	a.home-work-card:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 3px;
	}

	@media (max-width: 36rem) {
		.home-works {
			grid-template-columns: 1fr;
		}

		.home-work-heading {
			display: grid;
		}

		.home-work-status {
			justify-self: start;
		}
	}
</style>
