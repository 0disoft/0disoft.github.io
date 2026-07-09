<script lang="ts">
	import { browser } from "$app/environment";
	import { pushState } from "$app/navigation";
	import { page } from "$app/state";
	import { ChevronDown } from "@lucide/svelte";
	import { onMount } from "svelte";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import {
		BLOG_FILTER_QUERY_KEYS,
		blogPosts,
		createEmptyBlogFilters,
		filterBlogPosts,
		getBlogFilterOptions,
		getBlogPostsForLocale,
		getBlogPostSearchValues,
		getBlogPostTagLabels,
		parseBlogFilters,
		type BlogFilters,
	} from "$lib/blog-posts";
	import { toDisplayLocale, withShortcut } from "$lib/site-labels";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";

	let filters = $state<BlogFilters>(createEmptyBlogFilters());
	const displayLocale = $derived(toDisplayLocale(getLocale()));
	const currentLocale = $derived(getLocale());
	const blogAction = $derived(
		localizeSitePathname("/blog", isSiteLocale(currentLocale) ? currentLocale : "en"),
	);
	const localizedBlogPosts = $derived(getBlogPostsForLocale(blogPosts, currentLocale));
	const localizedFilterOptions = $derived(getBlogFilterOptions(localizedBlogPosts));
	const filteredPosts = $derived(filterBlogPosts(localizedBlogPosts, filters));
	const hasActiveFilters = $derived(
		filters.query.length > 0 || filters.tag.length > 0 || filters.year.length > 0,
	);
	const searchShortcutTitle = $derived(
		withShortcut(m.blog_search_label({}, { locale: displayLocale }), "Alt+S"),
	);
	const blogFilterScript = `(() => {
		const script = document.currentScript;
		const section = script?.closest(".blog-section");
		const searchInput = section?.querySelector("#blog-search");
		const tagSelect = section?.querySelector("#blog-tag");
		const yearSelect = section?.querySelector("#blog-year");
		const resultStatus = section?.querySelector(".result-status");
		const emptyState = section?.querySelector(".blog-empty");
		const emptyText = emptyState?.querySelector("p");
		const posts = Array.from(section?.querySelectorAll("[data-blog-post]") ?? []);

		if (!section || !searchInput || !tagSelect || !yearSelect || !resultStatus) {
			return;
		}

		const normalize = (value) => value.trim().toLocaleLowerCase();
		const hasOption = (select, value) => Array.from(select.options).some((option) => option.value === value);
		const normalizeYear = (value) => /^\\d{4}$/.test(value) ? value : "";

		const readFilters = () => {
			const searchParams = new URLSearchParams(window.location.search);
			const query = searchParams.get("q")?.trim() ?? "";
			const tag = searchParams.get("tag")?.trim() ?? "";
			const year = normalizeYear(searchParams.get("year")?.trim() ?? "");

			return {
				query,
				tag: hasOption(tagSelect, tag) ? tag : "",
				year: hasOption(yearSelect, year) ? year : "",
			};
		};

		const writeFilters = ({ query, tag, year }) => {
			searchInput.value = query;
			tagSelect.value = tag;
			yearSelect.value = year;
		};

		const applyFilters = (nextFilters = readFilters()) => {
			writeFilters(nextFilters);

			const normalizedQuery = normalize(nextFilters.query);
			let resultCount = 0;

			for (const post of posts) {
				const haystack = normalize([
					post.dataset.blogTitle,
					post.dataset.blogSummary,
					post.dataset.blogTags,
				].filter(Boolean).join(" "));
				const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
				const matchesTag = !nextFilters.tag || (post.dataset.blogTagIds ?? "").split(" ").includes(nextFilters.tag);
				const matchesYear = !nextFilters.year || post.dataset.blogYear === nextFilters.year;
				const visible = matchesQuery && matchesTag && matchesYear;

				post.hidden = !visible;
				if (visible) resultCount += 1;
			}

			resultStatus.textContent = (resultStatus.dataset.resultsLabel ?? "Results") + ": " + resultCount;

			if (emptyState && emptyText) {
				emptyState.hidden = resultCount > 0;
				emptyText.textContent = nextFilters.query || nextFilters.tag || nextFilters.year
					? emptyState.dataset.emptyFiltered ?? ""
					: emptyState.dataset.emptyTitle ?? "";
			}
		};

		window.addEventListener("popstate", () => applyFilters());
		applyFilters();
	})();`;
	const blogFilterScriptMarkup = `<script>${blogFilterScript}</scr` + "ipt>";

	onMount(() => {
		syncFiltersFromUrl();

		window.addEventListener("popstate", syncFiltersFromUrl);
		window.addEventListener("keydown", handleSearchShortcut);

		return () => {
			window.removeEventListener("popstate", syncFiltersFromUrl);
			window.removeEventListener("keydown", handleSearchShortcut);
		};
	});

	function syncFiltersFromUrl() {
		if (!browser) {
			return;
		}

		filters = parseBlogFilters(new URLSearchParams(window.location.search));
	}

	function handleSearchShortcut(event: KeyboardEvent) {
		if (
			!browser ||
			event.defaultPrevented ||
			!event.altKey ||
			event.ctrlKey ||
			event.metaKey ||
			event.shiftKey ||
			event.key.toLocaleLowerCase() !== "s"
		) {
			return;
		}

		const searchInput = document.querySelector<HTMLInputElement>("#blog-search");

		if (!searchInput) {
			return;
		}

		event.preventDefault();
		searchInput.focus();
	}

	function handleFilterSubmit(event: SubmitEvent) {
		if (!browser || !(event.currentTarget instanceof HTMLFormElement)) {
			return;
		}

		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const searchParams = new URLSearchParams();

		for (const key of Object.values(BLOG_FILTER_QUERY_KEYS)) {
			const value = formData.get(key);

			if (typeof value === "string") {
				searchParams.set(key, value);
			}
		}

		const nextFilters = parseBlogFilters(searchParams);

		filters = nextFilters;
		pushState(createBlogFilterHref(nextFilters), page.state);
	}

	function clearFilters(event: MouseEvent) {
		if (!browser) {
			return;
		}

		event.preventDefault();
		filters = createEmptyBlogFilters();
		pushState(blogAction, page.state);
	}

	function createBlogFilterHref(nextFilters: BlogFilters): string {
		const searchParams = new URLSearchParams();

		if (nextFilters.query) {
			searchParams.set(BLOG_FILTER_QUERY_KEYS.query, nextFilters.query);
		}

		if (nextFilters.tag) {
			searchParams.set(BLOG_FILTER_QUERY_KEYS.tag, nextFilters.tag);
		}

		if (nextFilters.year) {
			searchParams.set(BLOG_FILTER_QUERY_KEYS.year, nextFilters.year);
		}

		const queryString = searchParams.toString();

		return queryString ? `${blogAction}?${queryString}` : blogAction;
	}

	function getBlogPostHref(slug: string): string {
		return localizeSitePathname(`/blog/${slug}`, isSiteLocale(currentLocale) ? currentLocale : "en");
	}
</script>

<section class="blog-section" aria-labelledby="section-title">
	<h1 id="section-title" class="sr-only">{m.nav_blog({}, { locale: displayLocale })}</h1>

	<form
		class="blog-filters"
		method="GET"
		action={blogAction}
		aria-labelledby="blog-filter-title"
		onsubmit={handleFilterSubmit}
	>
		<h2 id="blog-filter-title" class="sr-only">
			{m.blog_filter_title({}, { locale: displayLocale })}
		</h2>

		<label class="filter-field search-field" for="blog-search">
			<span title={searchShortcutTitle}>{m.blog_search_label({}, { locale: displayLocale })}</span>
			<input
				id="blog-search"
				type="search"
				name={BLOG_FILTER_QUERY_KEYS.query}
				value={filters.query}
				placeholder={m.blog_search_placeholder({}, { locale: displayLocale })}
				autocomplete="off"
				aria-keyshortcuts="Alt+S"
			/>
		</label>

		<label class="filter-field" for="blog-tag">
			<span>{m.blog_tag_label({}, { locale: displayLocale })}</span>
			<span class="select-shell">
				<select id="blog-tag" name={BLOG_FILTER_QUERY_KEYS.tag} value={filters.tag}>
					<option value="">{m.blog_all_tags({}, { locale: displayLocale })}</option>
					{#each localizedFilterOptions.tags as tag (tag.id)}
						<option value={tag.id}>{tag.label}</option>
					{/each}
				</select>
				<ChevronDown size={17} strokeWidth={2.15} aria-hidden="true" />
			</span>
		</label>

		<label class="filter-field" for="blog-year">
			<span>{m.blog_year_label({}, { locale: displayLocale })}</span>
			<span class="select-shell">
				<select id="blog-year" name={BLOG_FILTER_QUERY_KEYS.year} value={filters.year}>
					<option value="">{m.blog_all_years({}, { locale: displayLocale })}</option>
					{#each localizedFilterOptions.years as year (year)}
						<option value={year}>{year}</option>
					{/each}
				</select>
				<ChevronDown size={17} strokeWidth={2.15} aria-hidden="true" />
			</span>
		</label>

		<div class="filter-actions">
			<button type="submit">{m.blog_apply_filters({}, { locale: displayLocale })}</button>
			{#if hasActiveFilters}
				<a href={blogAction} onclick={clearFilters}>{m.blog_clear_filters({}, { locale: displayLocale })}</a>
			{/if}
		</div>
	</form>

	<p
		class="result-status"
		aria-live="polite"
		data-results-label={m.blog_results_label({}, { locale: displayLocale })}
	>
		{m.blog_results_label({}, { locale: displayLocale })}: {filteredPosts.length}
	</p>

	{#if filteredPosts.length > 0}
		<ol class="blog-list" role="list">
			{#each filteredPosts as post (post.slug)}
				{@const postTagLabels = getBlogPostTagLabels(post)}
				<li>
					<a
						class="blog-list-link"
						class:with-media={Boolean(post.heroImage)}
						href={getBlogPostHref(post.slug)}
						data-blog-post
						data-blog-title={post.title}
						data-blog-summary={post.summary}
						data-blog-tags={getBlogPostSearchValues(post).join(" ")}
						data-blog-tag-ids={post.tags.join(" ")}
						data-blog-year={post.publishedAt.slice(0, 4)}
					>
						{#if post.heroImage}
							<div class="blog-list-media">
								<img
									src={post.heroImage.src}
									alt={post.heroImage.alt}
									loading="lazy"
									decoding="async"
								/>
							</div>
						{/if}
						<article class="blog-list-item">
							<p class="post-date">
								<time datetime={post.publishedAt}>{post.publishedAt}</time>
							</p>
							<h2>{post.title}</h2>
							<p>{post.summary}</p>
							<ul aria-label={m.blog_post_tags_label({}, { locale: displayLocale })}>
								{#each postTagLabels as tag (tag)}
									<li>{tag}</li>
								{/each}
							</ul>
						</article>
					</a>
				</li>
			{/each}
		</ol>
	{/if}

	<div
		class="blog-empty"
		role="status"
		hidden={filteredPosts.length > 0}
		data-empty-title={m.blog_empty_title({}, { locale: displayLocale })}
		data-empty-filtered={m.blog_empty_filtered({}, { locale: displayLocale })}
	>
		<p>{hasActiveFilters ? m.blog_empty_filtered({}, { locale: displayLocale }) : m.blog_empty_title({}, { locale: displayLocale })}</p>
	</div>

	{@html blogFilterScriptMarkup}
</section>

<style>
	.blog-section {
		display: grid;
		width: min(100%, 54rem);
		gap: 1.2rem;
	}

	.blog-filters {
		display: grid;
		grid-template-columns: minmax(14rem, 1fr) minmax(8rem, 12rem) minmax(8rem, 10rem) auto;
		gap: 0.75rem;
		align-items: end;
		padding-bottom: 1rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 82%, transparent);
	}

	.filter-field {
		display: grid;
		gap: 0.35rem;
		min-width: 0;
		color: var(--foreground);
		font-size: 0.9rem;
		font-weight: 700;
	}

	.filter-field > span,
	.filter-field select,
	.filter-field input::placeholder,
	.filter-actions button,
	.filter-actions a,
	.result-status,
	.blog-list-link,
	.blog-list-item ul li {
		user-select: none;
	}

	.filter-field input,
	.filter-field select {
		width: 100%;
		min-height: 2.65rem;
		padding: 0 0.75rem;
		border: 1px solid var(--input);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 70%, transparent);
		color: var(--foreground);
		font: inherit;
		font-weight: 620;
	}

	.filter-field select {
		appearance: none;
		padding-inline-end: 2.4rem;
	}

	.select-shell {
		position: relative;
		display: block;
		min-width: 0;
	}

	.select-shell :global(svg) {
		position: absolute;
		top: 50%;
		right: 0.85rem;
		pointer-events: none;
		transform: translateY(-50%);
	}

	:global(.dark) .filter-field input,
	:global(.dark) .filter-field select {
		background: color-mix(in oklch, var(--card) 72%, transparent);
	}

	.filter-field input::placeholder {
		color: var(--muted-foreground);
	}

	.filter-actions {
		display: flex;
		gap: 0.45rem;
		align-items: center;
	}

	.filter-actions button,
	.filter-actions a {
		display: inline-flex;
		min-height: 2.65rem;
		align-items: center;
		justify-content: center;
		padding: 0 0.9rem;
		border: 1px solid var(--mode-control-border);
		border-radius: var(--radius-md);
		background: var(--mode-control-background);
		color: var(--mode-control-foreground);
		cursor: pointer;
		font: inherit;
		font-weight: 720;
		text-decoration: none;
	}

	.filter-actions button:hover,
	.filter-actions a:hover {
		background: var(--mode-control-hover-background);
	}

	.result-status {
		margin: 0;
		color: var(--muted-foreground);
		font-size: 0.9rem;
		font-weight: 680;
	}

	.blog-list {
		display: grid;
		gap: 0;
		padding: 0;
		margin: 0;
		list-style: none;
		border-top: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.blog-list-item {
		display: grid;
		gap: 0.45rem;
		min-width: 0;
	}

	.blog-list-link {
		display: block;
		padding: 1rem 0;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
		color: inherit;
		text-decoration: none;
	}

	.blog-list-link.with-media {
		display: grid;
		grid-template-columns: minmax(6.25rem, 8.5rem) minmax(0, 1fr);
		gap: 0.95rem;
		align-items: center;
	}

	.blog-list-link:hover h2 {
		text-decoration: underline;
		text-decoration-thickness: 0.08em;
		text-underline-offset: 0.18em;
	}

	.blog-list-media {
		overflow: hidden;
		width: 100%;
		aspect-ratio: 4 / 3;
		border: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 72%, transparent);
		user-select: none;
	}

	.blog-list-media img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		user-select: none;
	}

	.blog-list-item h2,
	.blog-list-item p {
		margin: 0;
	}

	.blog-list-item h2 {
		font-size: 1.2rem;
		font-weight: 780;
		letter-spacing: 0;
	}

	.post-date {
		color: var(--muted-foreground);
		font-size: 0.85rem;
		font-weight: 680;
	}

	.blog-list-item ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		padding: 0;
		margin: 0.2rem 0 0;
		list-style: none;
	}

	.blog-list-item ul li {
		padding: 0.15rem 0.45rem;
		border: 1px solid color-mix(in oklch, var(--border) 78%, transparent);
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		font-size: 0.82rem;
		font-weight: 680;
	}

	.blog-empty {
		padding: 1.25rem 0;
		border-top: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
		color: var(--muted-foreground);
		font-weight: 680;
	}

	.blog-empty p {
		margin: 0;
	}

	.blog-filters :is(input, select, button, a):focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 3px;
	}

	.blog-list-link:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 3px;
	}

	@media (max-width: 64rem) {
		.blog-filters {
			grid-template-columns: 1fr 1fr;
		}

		.search-field,
		.filter-actions {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 44rem) {
		.blog-list-link.with-media {
			grid-template-columns: minmax(0, 1fr);
		}

		.blog-list-media {
			width: min(100%, 12rem);
		}
	}

	@media (max-width: 36rem) {
		.blog-filters {
			grid-template-columns: 1fr;
		}

		.filter-actions {
			align-items: stretch;
			flex-direction: column;
		}
	}
</style>
