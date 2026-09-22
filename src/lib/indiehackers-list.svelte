<script lang="ts">
	import { browser } from "$app/environment";
	import { pushState } from "$app/navigation";
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { ChevronDown, Search, SlidersHorizontal } from "@lucide/svelte";
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
	const localizedFilterOptions = $derived(getIndiehackersFilterOptions(localizedPosts));
	const filteredPosts = $derived(filterIndiehackersPosts(localizedPosts, filters));
	const hasActiveFilters = $derived(
		filters.query.length > 0 || filters.tags.length > 0 || !filters.recentOnly,
	);
	const leadPost = $derived(filteredPosts[0] ?? null);
	const sidePosts = $derived(filteredPosts.slice(1, 4));
	const restPosts = $derived(filteredPosts.slice(4));
	const activeTagCount = $derived(filters.tags.length);
	let facetsExpanded = $state(true);
	let filterFormElement = $state<HTMLElement | null>(null);
	const recentLabel = $derived(m.indiehackers_recent_label({}, { locale: displayLocale }));
	const recentTooltip = $derived(m.indiehackers_recent_tooltip({}, { locale: displayLocale }));
	const filterTitle = $derived(m.indiehackers_filter_title({}, { locale: displayLocale }));

	function getIndiehackersGroupLabel(groupId: string): string {
		switch (groupId) {
			case "product":
				return m.indiehackers_group_product({}, { locale: displayLocale });
			case "platform":
				return m.indiehackers_group_platform({}, { locale: displayLocale });
			case "audience":
				return m.indiehackers_group_audience({}, { locale: displayLocale });
			case "revenue":
				return m.indiehackers_group_revenue({}, { locale: displayLocale });
			case "operation":
				return m.indiehackers_group_operation({}, { locale: displayLocale });
			case "topic":
				return m.indiehackers_group_topic({}, { locale: displayLocale });
			default:
				return groupId;
		}
	}

	function getProductName(post: { productName?: string; slug: string }): string {
		return post.productName ?? post.slug;
	}

	function closeOpenFacets(focusSummary = true) {
		const root = filterFormElement;
		if (!root) return;
		const open = Array.from(root.querySelectorAll("details[data-facet][open]"));
		for (const el of open) {
			if (el instanceof HTMLElement) el.removeAttribute("open");
		}
		if (focusSummary && open[0] instanceof HTMLElement) {
			open[0].querySelector("summary")?.focus();
		}
	}

	function handleFilterBarKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			event.stopPropagation();
			closeOpenFacets(true);
		}
	}

	function handleSummaryKeydown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			const details = (event.currentTarget as HTMLElement).closest("details[data-facet]");
			if (details instanceof HTMLElement) {
				details.removeAttribute("open");
				(event.currentTarget as HTMLElement).focus();
			}
		}
	}

	onMount(() => {
		syncFiltersFromUrl();
		filterFormElement?.addEventListener("keydown", handleFilterBarKeydown);

		window.addEventListener("popstate", syncFiltersFromUrl);

		return () => {
			filterFormElement?.removeEventListener("keydown", handleFilterBarKeydown);
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

	function handleRecentChange(event: Event) {
		if (!browser || !(event.currentTarget instanceof HTMLInputElement)) {
			return;
		}

		const nextFilters: IndiehackersFilters = {
			...filters,
			recentOnly: event.currentTarget.checked,
		};

		filters = nextFilters;
		pushState(createIndiehackersFilterHref(nextFilters), page.state);
	}

	function clearFilters(event: MouseEvent) {
		if (!browser) {
			return;
		}

		event.preventDefault();
		closeOpenFacets(false);
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

		if (!nextFilters.recentOnly) {
			searchParams.set(INDIEHACKERS_FILTER_QUERY_KEYS.recent, "0");
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
		bind:this={filterFormElement}
	>
		<h2 id="indiehackers-filter-title" class="sr-only">
			{m.indiehackers_filter_title({}, { locale: displayLocale })}
		</h2>

		<div class="filter-bar">
			<label class="filter-search" for="indiehackers-search">
				<Search size={17} strokeWidth={2.2} aria-hidden="true" />
				<span class="sr-only">{m.indiehackers_search_label({}, { locale: displayLocale })}</span>
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

			<button
				type="button"
				class="filter-toggle"
				aria-expanded={facetsExpanded}
				aria-controls="indiehackers-facets"
				onclick={() => {
					facetsExpanded = !facetsExpanded;
					if (!facetsExpanded) closeOpenFacets(false);
				}}
			>
				<SlidersHorizontal size={15} strokeWidth={2.2} aria-hidden="true" />
				<span>{filterTitle}{activeTagCount > 0 ? " (" + activeTagCount + ")" : ""}</span>
			</button>
		</div>

			<div class="facet-bar" id="indiehackers-facets">
				{#if facetsExpanded}
				{#each localizedFilterOptions.groups as group (group.id)}
					{@const groupActive = group.tags.filter((tag) => filters.tags.includes(tag.id)).length}
					<details class="facet" data-facet name="indiehackers-facet">
						<summary class="facet-summary" onkeydown={handleSummaryKeydown}>
							<span>{getIndiehackersGroupLabel(group.id)}{groupActive > 0 ? " (" + groupActive + ")" : ""}</span>
							<ChevronDown size={14} strokeWidth={2.4} aria-hidden="true" />
						</summary>
						<div class="facet-panel">
							<ul class="tag-chips" role="list">
								{#each group.tags as tag (tag.id)}
									<li>
										<label class="chip">
											<input
												type="checkbox"
												name={INDIEHACKERS_FILTER_QUERY_KEYS.tag}
												value={tag.id}
												checked={filters.tags.includes(tag.id)}
												onchange={handleTagChange}
											/>
											<span>{tag.label} ({tag.count})</span>
										</label>
									</li>
								{/each}
							</ul>
						</div>
					</details>
				{/each}
				{/if}
				<div class="facet-row-end">
					<label
						class="chip recent-chip"
						title={recentTooltip}
						data-tooltip={recentTooltip}
					>
						<input
							type="checkbox"
							name={INDIEHACKERS_FILTER_QUERY_KEYS.recent}
							value="1"
							checked={filters.recentOnly}
							onchange={handleRecentChange}
						/>
						<span>{recentLabel}</span>
					</label>
					<button
						type="button"
						class="chip chip-clear"
						disabled={!hasActiveFilters}
						onclick={clearFilters}
					>
						{m.indiehackers_clear_filters({}, { locale: displayLocale })}
					</button>
				</div>
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
	{:else if leadPost}
		{@const leadTags = getIndiehackersPostTagLabels(leadPost)}
		<div class="magazine">
			<article
				class="lead-card"
				data-indiehackers-post
				data-indiehackers-title={leadPost.title}
				data-indiehackers-summary={leadPost.summary}
				data-indiehackers-tags={leadTags.join(" ")}
				data-indiehackers-tag-ids={leadPost.tags.join(" ")}
				data-indiehackers-year={leadPost.publishedAt.slice(0, 4)}
			>
				<a class="lead-link" href={getIndiehackersPostHref(leadPost.slug)}>
					{#if leadPost.coverImage}
						<span class="cover cover-lead">
							<img src={leadPost.coverImage} alt="" width="1440" height="810" loading="eager" decoding="async" />
						</span>
					{/if}
					<div class="card-body">
						<span class="eyebrow">
							<span class="product">{getProductName(leadPost)}</span>
							<time datetime={leadPost.publishedAt}>{leadPost.publishedAt}</time>
						</span>
						<h2 class="lead-title">{leadPost.title}</h2>
						<span class="indiehackers-card-summary">{leadPost.summary}</span>
						<span class="indiehackers-card-meta">
							{#each leadTags.slice(0, 3) as label}<span class="post-tag">{label}</span>{/each}
						</span>
						<span class="sr-only">{getIndiehackersPostSearchValues(leadPost).join(" ")}</span>
					</div>
				</a>
			</article>
			<div class="side-stack" role="list">
				{#each sidePosts as post (post.slug)}
					{@const tagLabels = getIndiehackersPostTagLabels(post)}
					<article
						class="side-card"
						role="listitem"
						data-indiehackers-post
						data-indiehackers-title={post.title}
						data-indiehackers-summary={post.summary}
						data-indiehackers-tags={tagLabels.join(" ")}
						data-indiehackers-tag-ids={post.tags.join(" ")}
						data-indiehackers-year={post.publishedAt.slice(0, 4)}
					>
						<a class="side-link" href={getIndiehackersPostHref(post.slug)}>
							{#if post.coverImage}
								<span class="cover cover-side">
									<img src={post.coverImage} alt="" width="1440" height="810" loading="lazy" decoding="async" />
								</span>
							{/if}
							<div class="card-body">
								<span class="eyebrow">
									<span class="product">{getProductName(post)}</span>
									<time datetime={post.publishedAt}>{post.publishedAt}</time>
								</span>
								<h2 class="side-title">{post.title}</h2>
								<span class="sr-only">{getIndiehackersPostSearchValues(post).join(" ")}</span>
							</div>
						</a>
					</article>
				{/each}
			</div>
		</div>
		{#if restPosts.length > 0}
			<ul class="indiehackers-cards rest-grid" role="list">
				{#each restPosts as post (post.slug)}
					{@const restTags = getIndiehackersPostTagLabels(post)}
					<li
						class="indiehackers-card"
						data-indiehackers-post
						data-indiehackers-title={post.title}
						data-indiehackers-summary={post.summary}
						data-indiehackers-tags={restTags.join(" ")}
						data-indiehackers-tag-ids={post.tags.join(" ")}
						data-indiehackers-year={post.publishedAt.slice(0, 4)}
					>
						<a class="indiehackers-card-link" href={getIndiehackersPostHref(post.slug)}>
							{#if post.coverImage}
								<span class="cover cover-rest">
									<img src={post.coverImage} alt="" width="1440" height="810" loading="lazy" decoding="async" />
								</span>
							{/if}
							<div class="card-body">
								<span class="eyebrow">
									<span class="product">{getProductName(post)}</span>
									<time datetime={post.publishedAt}>{post.publishedAt}</time>
								</span>
								<h2 class="rest-title">{post.title}</h2>
								<span class="indiehackers-card-summary">{post.summary}</span>
								<span class="sr-only">{getIndiehackersPostSearchValues(post).join(" ")}</span>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
</section>

<style>
	.indiehackers-header, .indiehackers-filters, .result-status { -webkit-user-select: none; user-select: none; }
	.filter-search input { -webkit-user-select: text; user-select: text; }
	.filter-search input::placeholder { -webkit-user-select: none; user-select: none; }
	.indiehackers-list { display: grid; width: 100%; max-width: 90rem; margin-inline: auto; gap: 1.35rem; color: var(--foreground); min-width: 0; }
	.indiehackers-header h1 { margin: 0; font-size: 3.25rem; font-weight: 850; letter-spacing: 0; line-height: 1.2; overflow-wrap: anywhere; }
	.indiehackers-header { padding-bottom: 0.3rem; }
	.indiehackers-filters { display: grid; gap: 1rem; padding-block: 0.25rem 1rem; min-width: 0; }
	.filter-bar { display: flex; gap: 0.8rem; align-items: stretch; }
	.filter-search { display: flex; flex: 1; align-items: center; gap: 0.75rem; min-width: 0; padding-inline: 1rem; border: 1px solid var(--input); border-radius: 6px; color: var(--muted-foreground); }
	.filter-search :global(svg) { flex-shrink: 0; }
	.filter-search input { min-width: 0; width: 100%; height: 3rem; padding: 0; border: 0; background: transparent; color: var(--foreground); font: inherit; outline: none; }
	.filter-search:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
	.filter-toggle, .chip-clear { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; min-height: 2.6rem; padding: 0.5rem 0.8rem; border: 0; border-radius: 6px; background: transparent; color: var(--foreground); font: inherit; font-size: 0.875rem; cursor: pointer; }
	.filter-toggle:hover, .chip-clear:not(:disabled):hover { background: var(--muted); }
	.filter-toggle { flex-shrink: 0; }
	.filter-toggle:focus-visible, .chip-clear:focus-visible, .facet-summary:focus-visible, a:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
	.chip-clear:disabled { opacity: 0.45; cursor: default; }
	.facet-bar { display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem 1.4rem; min-width: 0; position: relative; }
	.facet { min-width: 0; }
	.facet-summary { display: flex; align-items: center; gap: 0.7rem; min-height: 2.5rem; padding-block: 0.35rem; font-size: 0.875rem; font-weight: 650; list-style: none; cursor: pointer; }
	.facet-summary::-webkit-details-marker { display: none; }
	.facet-summary:hover, .facet[open] .facet-summary { color: var(--accent); }
	.facet[open] .facet-summary :global(svg) { transform: rotate(180deg); }
	.facet-panel { position: absolute; inset-inline: 0; top: calc(100% + 0.65rem); z-index: 20; padding: 0.75rem; border: 0; border-radius: 6px; background: var(--muted); box-shadow: 0 8px 24px rgb(0 0 0 / 0.1); max-height: 20rem; overflow: auto; }
	.tag-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0; padding: 0; list-style: none; }
	.chip { display: inline-flex; align-items: center; gap: 0.5rem; min-height: 2.5rem; padding: 0.45rem 0.65rem; border: 0; border-radius: 6px; background: transparent; color: var(--foreground); font-size: 0.875rem; line-height: 1.4; cursor: pointer; max-width: 100%; overflow-wrap: anywhere; }
	.chip:hover { background: var(--surface-hover); }
	.chip input { width: 1rem; height: 1rem; flex-shrink: 0; margin: 0; accent-color: var(--accent); }
	.chip:has(input:checked) { background: var(--mode-control-selected-background); }
	.chip:has(input:focus-visible) { outline: 2px solid var(--accent); outline-offset: 2px; }
	.facet-row-end { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem; margin-inline-start: auto; }
	.recent-chip { padding-inline: 0.35rem; }
	.recent-chip:has(input:checked) { background: transparent; }
	.result-status { margin: 0; color: var(--muted-foreground); font-size: 0.875rem; }
	.magazine { display: grid; grid-template-columns: minmax(0, 1.62fr) minmax(0, 1fr); align-items: start; gap: 2rem; }
	.lead-card, .side-card, .indiehackers-card { min-width: 0; }
	.lead-link, .side-link, .indiehackers-card-link { display: grid; gap: 0.85rem; color: inherit; text-decoration: none; }
	.cover { display: block; overflow: hidden; border-radius: 5px; aspect-ratio: 16 / 9; background: var(--muted); }
	.cover img { display: block; width: 100%; height: 100%; object-fit: cover; }
	.cover-side { aspect-ratio: 3 / 1; }
	.card-body { display: grid; min-width: 0; gap: 0.55rem; }
	.eyebrow { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.25rem 0.75rem; align-items: baseline; font-size: 0.875rem; color: var(--muted-foreground); }
	.product { color: var(--accent); font-weight: 750; }
	.eyebrow time { white-space: nowrap; font-size: 0.8rem; }
	.lead-title, .side-title, .rest-title { margin: 0; line-height: 1.4; font-weight: 750; overflow-wrap: anywhere; letter-spacing: 0; }
	.lead-title { font-size: 2rem; }
	.side-title { font-size: 1.05rem; }
	.rest-title { font-size: 1.25rem; }
	a:hover .lead-title, a:hover .side-title, a:hover .rest-title { text-decoration: underline; text-underline-offset: 4px; }
	.indiehackers-card-summary { margin: 0; font-size: 1rem; line-height: 1.75; color: var(--muted-foreground); }
	.indiehackers-card-meta { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 0.45rem; }
	.post-tag { padding: 0.35rem 0.7rem; border-radius: 999px; background: var(--muted); font-size: 0.8rem; }
	.post-tag:first-child { background: #fff3b0; color: #3f390e; }
	.post-tag:nth-child(2) { background: #dfebff; color: #174aa0; }
	.side-stack { display: grid; gap: 1rem; }
	.side-card + .side-card { border-top: 1px solid var(--border); padding-top: 1rem; }
	.indiehackers-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; list-style: none; margin: 0; padding: 0; }
	.rest-grid { border-top: 1px solid var(--border); padding-top: 2rem; margin-top: 1rem; }
	.indiehackers-empty { padding-block: 3rem; text-align: center; color: var(--muted-foreground); }
	.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
	@media (max-width: 64rem) {
		.indiehackers-header h1 { font-size: 2.5rem; }
		.magazine { gap: 1.4rem; }
		.lead-title { font-size: 1.6rem; }
		.facet-bar { column-gap: 1rem; }
	}
	@media (max-width: 48rem) {
		.indiehackers-header h1 { font-size: 2rem; }
		.magazine, .indiehackers-cards { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
		.cover-side { aspect-ratio: 16 / 9; }
		.facet-bar { gap: 0.25rem 1rem; }
		.facet { flex: 1 1 42%; }
		.facet-summary { justify-content: space-between; }
		.facet-row-end { width: 100%; margin-inline-start: 0; justify-content: space-between; padding-top: 0.5rem; }
		.lead-title { font-size: 1.5rem; }
		.side-title { font-size: 1.2rem; }
		.filter-toggle { padding-inline: 0.6rem; }
	}
</style>
