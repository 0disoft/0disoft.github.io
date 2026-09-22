<script lang="ts">
	import { browser } from "$app/environment";
	import { pushState } from "$app/navigation";
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import {
		INDIEHACKERS_FILTER_QUERY_KEYS,
		createEmptyIndiehackersFilters,
		filterIndiehackersPosts,
		getIndiehackersFilterOptions,
		getIndiehackersPostSearchValues,
		getIndiehackersPostTagLabels,
		parseIndiehackersFilters,
		type IndiehackersFilters,
		type IndiehackersTagId,
	} from "$lib/indiehackers-posts";
	import { toDisplayLocale } from "$lib/site-labels";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";

	let filters = $state<IndiehackersFilters>(createEmptyIndiehackersFilters());
	const displayLocale = $derived(toDisplayLocale(getLocale()));
	const currentLocale = $derived(getLocale());
	const indiehackersAction = $derived(
		localizeSitePathname("/indiehackers", isSiteLocale(currentLocale) ? currentLocale : "en"),
	);
	const localizedPosts = $derived(page.data.indiehackersPosts);
	const localizedFilterOptions = $derived(getIndiehackersFilterOptions());
	const filteredPosts = $derived(filterIndiehackersPosts(localizedPosts, filters));
	const hasActiveFilters = $derived(
		filters.query.length > 0 || filters.tags.length > 0,
	);

	onMount(() => {
		syncFiltersFromUrl();

		window.addEventListener("popstate", syncFiltersFromUrl);

		return () => {
			window.removeEventListener("popstate", syncFiltersFromUrl);
		};
	});

	function syncFiltersFromUrl() {
		if (!browser) {
			return;
		}

		filters = parseIndiehackersFilters(new URLSearchParams(window.location.search));
	}

	function handleSearchInput(event: Event) {
		if (!browser || !(event.currentTarget instanceof HTMLInputElement)) {
			return;
		}

		const nextFilters: IndiehackersFilters = {
			...filters,
			query: event.currentTarget.value,
		};

		filters = nextFilters;
		pushState(createIndiehackersFilterHref(nextFilters), page.state);
	}

	function handleTagChange(event: Event) {
		if (!browser || !(event.currentTarget instanceof HTMLInputElement)) {
			return;
		}

		const tag = event.currentTarget.value as IndiehackersTagId;
		const checked = event.currentTarget.checked;
		const nextTags = checked
			? Array.from(new Set([...filters.tags, tag]))
			: filters.tags.filter((selected) => selected !== tag);
		const nextFilters: IndiehackersFilters = { ...filters, tags: nextTags };

		filters = nextFilters;
		pushState(createIndiehackersFilterHref(nextFilters), page.state);
	}

	function clearFilters(event: MouseEvent) {
		if (!browser) {
			return;
		}

		event.preventDefault();
		filters = createEmptyIndiehackersFilters();
		pushState(indiehackersAction, page.state);
	}

	function createIndiehackersFilterHref(nextFilters: IndiehackersFilters): string {
		const searchParams = new URLSearchParams();

		if (nextFilters.query.trim()) {
			searchParams.set(INDIEHACKERS_FILTER_QUERY_KEYS.query, nextFilters.query.trim());
		}

		for (const tag of nextFilters.tags) {
			searchParams.append(INDIEHACKERS_FILTER_QUERY_KEYS.tag, tag);
		}

		const queryString = searchParams.toString();

		return queryString ? `${indiehackersAction}?${queryString}` : indiehackersAction;
	}

	function getIndiehackersPostHref(slug: string): string {
		return localizeSitePathname(
			`/indiehackers/${slug}`,
			isSiteLocale(currentLocale) ? currentLocale : "en",
		);
	}
</script>

<section class="indiehackers-list" aria-labelledby="section-title">
	<header class="indiehackers-header">
		<h1 id="section-title">{m.nav_indiehackers({}, { locale: displayLocale })}</h1>
	</header>

	<form
		class="indiehackers-filters"
		method="GET"
		action={indiehackersAction}
		aria-labelledby="indiehackers-filter-title"
	>
		<h2 id="indiehackers-filter-title" class="sr-only">
			{m.indiehackers_filter_title({}, { locale: displayLocale })}
		</h2>

		<label class="filter-field search-field" for="indiehackers-search">
			<span>{m.indiehackers_search_label({}, { locale: displayLocale })}</span>
			<input
				id="indiehackers-search"
				name={INDIEHACKERS_FILTER_QUERY_KEYS.query}
				type="search"
				autocomplete="off"
				placeholder={m.indiehackers_search_placeholder({}, { locale: displayLocale })}
				value={filters.query}
				oninput={handleSearchInput}
			/>
		</label>

		<fieldset class="filter-field tag-field">
			<legend>{m.indiehackers_tag_label({}, { locale: displayLocale })}</legend>
			<ul class="tag-checkboxes" role="list">
				{#each localizedFilterOptions.tags as tag (tag.id)}
					<li>
						<label class="tag-checkbox">
							<input
								type="checkbox"
								name={INDIEHACKERS_FILTER_QUERY_KEYS.tag}
								value={tag.id}
								checked={filters.tags.includes(tag.id)}
								onchange={handleTagChange}
							/>
							<span>{tag.label}</span>
						</label>
					</li>
				{/each}
			</ul>
		</fieldset>

		<div class="filter-actions">
			{#if hasActiveFilters}
				<button type="button" class="filter-clear" onclick={clearFilters}>
					{m.indiehackers_clear_filters({}, { locale: displayLocale })}
				</button>
			{/if}
		</div>
	</form>

	<p class="result-status" aria-live="polite">
		{m.indiehackers_results_label({}, { locale: displayLocale })}: {filteredPosts.length}
	</p>

	{#if filteredPosts.length === 0}
		<div class="indiehackers-empty">
			<p>
				{hasActiveFilters
					? m.indiehackers_empty_filtered({}, { locale: displayLocale })
					: m.indiehackers_empty_title({}, { locale: displayLocale })}
			</p>
		</div>
	{:else}
		<ul class="indiehackers-cards" role="list">
			{#each filteredPosts as post (post.slug)}
				{@const tagLabels = getIndiehackersPostTagLabels(post)}
				<li
					class="indiehackers-card"
					data-indiehackers-post
					data-indiehackers-title={post.title}
					data-indiehackers-summary={post.summary}
					data-indiehackers-tags={tagLabels.join(" ")}
					data-indiehackers-tag-ids={post.tags.join(" ")}
					data-indiehackers-year={post.publishedAt.slice(0, 4)}
				>
					<a class="indiehackers-card-link" href={getIndiehackersPostHref(post.slug)}>
						<h2>{post.title}</h2>
						<p class="indiehackers-card-summary">{post.summary}</p>
						<p class="indiehackers-card-meta">
							<time datetime={post.publishedAt}>{post.publishedAt}</time>
							<span aria-hidden="true"> · </span>
							<span>{tagLabels.join(", ")}</span>
						</p>
						<span class="sr-only">{getIndiehackersPostSearchValues(post).join(" ")}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>

<style>
	.indiehackers-list {
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

	.indiehackers-header h1 {
		margin: 0;
		color: var(--foreground);
		font-size: clamp(1.55rem, 3.85vw, 2.9rem);
		font-weight: 740;
		letter-spacing: 0;
		line-height: 1;
		text-shadow: 0 0.07em 0 var(--display-heading-shadow);
	}

	.indiehackers-filters {
		display: grid;
		gap: 0.85rem;
	}

	.filter-field {
		display: grid;
		gap: 0.35rem;
		font-size: 0.9rem;
	}

	.filter-field input[type="search"] {
		max-width: 28rem;
		padding: 0.5rem 0.7rem;
		border: 1px solid var(--input);
		border-radius: var(--radius-sm);
		background: var(--background);
		color: var(--foreground);
		font: inherit;
	}

	.tag-field {
		margin: 0;
		padding: 0;
		border: 0;
	}

	.tag-field legend {
		padding: 0;
		font-size: 0.9rem;
	}

	.tag-checkboxes {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tag-checkbox {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.45rem 0.75rem;
		border: 1px solid var(--input);
		border-radius: 999px;
		background: var(--background);
		color: var(--foreground);
		cursor: pointer;
		user-select: none;
	}

	.tag-checkbox:has(input:checked) {
		border-color: color-mix(in oklch, var(--foreground) 28%, var(--border));
		background: color-mix(in oklch, var(--muted) 55%, transparent);
	}

	.tag-checkbox:has(input:focus-visible) {
		outline: 3px solid var(--focus-ring);
		outline-offset: 3px;
	}

	.tag-checkbox input {
		margin: 0;
		accent-color: var(--accent);
	}

	.filter-actions {
		display: flex;
		gap: 0.5rem;
	}

	.filter-clear {
		padding: 0.5rem 0.9rem;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: var(--background);
		color: var(--foreground);
		font: inherit;
		cursor: pointer;
	}

	.result-status {
		margin: 0;
		color: var(--muted-foreground);
	}

	.indiehackers-cards {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (max-width: 56rem) {
		.indiehackers-cards {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.indiehackers-card {
		border: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--background) 96%, transparent);
	}

	.indiehackers-card-link {
		display: grid;
		height: 100%;
		align-content: start;
		gap: 0.5rem;
		padding: 1rem 1.15rem;
		color: inherit;
		text-decoration: none;
	}

	.indiehackers-card-link h2 {
		margin: 0;
		font-size: 1.25rem;
		line-height: 1.3;
	}

	.indiehackers-card-summary {
		margin: 0;
		color: var(--muted-foreground);
		line-height: 1.6;
	}

	.indiehackers-card-meta {
		margin: 0;
		color: var(--muted-foreground);
		font-size: 0.85rem;
	}

	.indiehackers-empty {
		display: grid;
		gap: 0.5rem;
		padding: 2rem 1rem;
		border: 1px dashed color-mix(in oklch, var(--border) 62%, transparent);
		border-radius: var(--radius-md);
		text-align: center;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
