<script lang="ts">
	import { browser } from "$app/environment";
	import { pushState } from "$app/navigation";
	import { page } from "$app/state";
	import { ChevronDown } from "@lucide/svelte";
	import { onMount } from "svelte";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import { toDisplayLocale, withShortcut } from "$lib/site-labels";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";
	import {
		WORK_FILTER_QUERY_KEYS,
		createEmptyWorkFilters,
		filterWorks,
		getWorkFilterOptions,
		getWorksForLocale,
		parseWorkFilters,
		workItems,
		workLinkKeys,
		type WorkFilters,
		type WorkLinkKey,
		type WorkLinks,
		type WorkStatus,
	} from "$lib/works";

	type WorkLink = {
		key: WorkLinkKey;
		href: string | null;
		external: boolean;
	};

	let filters = $state<WorkFilters>(createEmptyWorkFilters());
	const displayLocale = $derived(toDisplayLocale(getLocale()));
	const currentLocale = $derived(getLocale());
	const worksAction = $derived(
		localizeSitePathname("/works", isSiteLocale(currentLocale) ? currentLocale : "en"),
	);
	const localizedWorks = $derived(getWorksForLocale(workItems, currentLocale));
	const localizedFilterOptions = $derived(getWorkFilterOptions(localizedWorks));
	const filteredWorks = $derived(filterWorks(localizedWorks, filters));
	const hasActiveFilters = $derived(
		filters.query.length > 0 || filters.tag.length > 0 || filters.language.length > 0,
	);
	const searchShortcutTitle = $derived(
		withShortcut(m.works_search_label({}, { locale: displayLocale }), "Alt+W"),
	);
	const worksFilterScript = `(() => {
		const script = document.currentScript;
		const section = script?.closest(".works-section");
		const searchInput = section?.querySelector("#works-search");
		const tagSelect = section?.querySelector("#works-tag");
		const languageSelect = section?.querySelector("#works-language");
		const resultStatus = section?.querySelector(".works-result-status");
		const emptyState = section?.querySelector(".works-empty");
		const emptyText = emptyState?.querySelector("p");
		const works = Array.from(section?.querySelectorAll("[data-work-card]") ?? []);

		if (!section || !searchInput || !tagSelect || !languageSelect || !resultStatus) {
			return;
		}

		const normalize = (value) => value.trim().toLocaleLowerCase();
		const hasOption = (select, value) => Array.from(select.options).some((option) => option.value === value);

		const readFilters = () => {
			const searchParams = new URLSearchParams(window.location.search);
			const query = searchParams.get("q")?.trim() ?? "";
			const tag = searchParams.get("tag")?.trim() ?? "";
			const language = searchParams.get("language")?.trim() ?? "";

			return {
				query,
				tag: hasOption(tagSelect, tag) ? tag : "",
				language: hasOption(languageSelect, language) ? language : "",
			};
		};

		const writeFilters = ({ query, tag, language }) => {
			searchInput.value = query;
			tagSelect.value = tag;
			languageSelect.value = language;
		};

		const applyFilters = (nextFilters = readFilters()) => {
			writeFilters(nextFilters);

			const normalizedQuery = normalize(nextFilters.query);
			let resultCount = 0;

			for (const work of works) {
				const haystack = normalize([
					work.dataset.workTitle,
					work.dataset.workSummary,
					work.dataset.workStatus,
					work.dataset.workLicense,
					work.dataset.workTags,
					work.dataset.workLanguages,
				].filter(Boolean).join(" "));
				const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
				const matchesTag = !nextFilters.tag || (work.dataset.workTagIds ?? "").split(" ").includes(nextFilters.tag);
				const matchesLanguage = !nextFilters.language || (work.dataset.workLanguageNames ?? "").split("|").includes(nextFilters.language);
				const visible = matchesQuery && matchesTag && matchesLanguage;

				work.hidden = !visible;
				if (visible) resultCount += 1;
			}

			resultStatus.textContent = (resultStatus.dataset.resultsLabel ?? "Results") + ": " + resultCount;

			if (emptyState && emptyText) {
				emptyState.hidden = resultCount > 0;
				emptyText.textContent = nextFilters.query || nextFilters.tag || nextFilters.language
					? emptyState.dataset.emptyFiltered ?? ""
					: emptyState.dataset.emptyTitle ?? "";
			}
		};

		window.addEventListener("popstate", () => applyFilters());
		applyFilters();
	})();`;
	const worksFilterScriptMarkup = `<script>${worksFilterScript}</scr` + "ipt>";

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

		filters = parseWorkFilters(new URLSearchParams(window.location.search));
	}

	function handleSearchShortcut(event: KeyboardEvent) {
		if (
			!browser ||
			event.defaultPrevented ||
			!event.altKey ||
			event.ctrlKey ||
			event.metaKey ||
			event.shiftKey ||
			event.key.toLocaleLowerCase() !== "w"
		) {
			return;
		}

		const searchInput = document.querySelector<HTMLInputElement>("#works-search");

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

		for (const key of Object.values(WORK_FILTER_QUERY_KEYS)) {
			const value = formData.get(key);

			if (typeof value === "string") {
				searchParams.set(key, value);
			}
		}

		const nextFilters = parseWorkFilters(searchParams);

		filters = nextFilters;
		pushState(createWorkFilterHref(nextFilters), page.state);
	}

	function clearFilters(event: MouseEvent) {
		if (!browser) {
			return;
		}

		event.preventDefault();
		filters = createEmptyWorkFilters();
		pushState(worksAction, page.state);
	}

	function createWorkFilterHref(nextFilters: WorkFilters): string {
		const searchParams = new URLSearchParams();

		if (nextFilters.query) {
			searchParams.set(WORK_FILTER_QUERY_KEYS.query, nextFilters.query);
		}

		if (nextFilters.tag) {
			searchParams.set(WORK_FILTER_QUERY_KEYS.tag, nextFilters.tag);
		}

		if (nextFilters.language) {
			searchParams.set(WORK_FILTER_QUERY_KEYS.language, nextFilters.language);
		}

		const queryString = searchParams.toString();

		return queryString ? `${worksAction}?${queryString}` : worksAction;
	}

	function getWorkStatusLabel(status: WorkStatus): string {
		switch (status) {
			case "live":
				return m.work_status_live({}, { locale: displayLocale });
			case "building":
				return m.work_status_building({}, { locale: displayLocale });
			case "experimental":
				return m.work_status_experimental({}, { locale: displayLocale });
			case "archived":
				return m.work_status_archived({}, { locale: displayLocale });
		}
	}

	function getWorkLinkLabel(key: WorkLinkKey): string {
		switch (key) {
			case "live":
				return m.work_link_live({}, { locale: displayLocale });
			case "source":
				return m.work_link_source({}, { locale: displayLocale });
			case "docs":
				return m.work_link_docs({}, { locale: displayLocale });
			case "post":
				return m.work_link_post({}, { locale: displayLocale });
		}
	}

	function getWorkTagLabel(tag: string): string {
		switch (tag) {
			case "agent-workflow":
				return m.work_tag_agent_workflow({}, { locale: displayLocale });
			case "developer-tools":
				return m.work_tag_developer_tools({}, { locale: displayLocale });
			default:
				return tag;
		}
	}

	function getWorkLinks(links: WorkLinks): WorkLink[] {
		return workLinkKeys.flatMap((key) => {
			const href = links[key];

			if (typeof href === "undefined") {
				return [];
			}

			return [
				{
					key,
					href,
					external: typeof href === "string" && href.startsWith("http"),
				},
			];
		});
	}
</script>

<section class="works-section" aria-labelledby="section-title">
	<h1 id="section-title" class="sr-only">{m.nav_works({}, { locale: displayLocale })}</h1>

	<form
		class="works-filters"
		method="GET"
		action={worksAction}
		aria-labelledby="works-filter-title"
		onsubmit={handleFilterSubmit}
	>
		<h2 id="works-filter-title" class="sr-only">
			{m.works_filter_title({}, { locale: displayLocale })}
		</h2>

		<label class="filter-field search-field" for="works-search">
			<span title={searchShortcutTitle}>{m.works_search_label({}, { locale: displayLocale })}</span>
			<input
				id="works-search"
				type="search"
				name={WORK_FILTER_QUERY_KEYS.query}
				value={filters.query}
				placeholder={m.works_search_placeholder({}, { locale: displayLocale })}
				autocomplete="off"
				aria-keyshortcuts="Alt+W"
			/>
		</label>

		<label class="filter-field" for="works-tag">
			<span>{m.works_tag_label({}, { locale: displayLocale })}</span>
			<span class="select-shell">
				<select id="works-tag" name={WORK_FILTER_QUERY_KEYS.tag} value={filters.tag}>
					<option value="">{m.works_all_tags({}, { locale: displayLocale })}</option>
					{#each localizedFilterOptions.tags as tag (tag)}
						<option value={tag}>{getWorkTagLabel(tag)}</option>
					{/each}
				</select>
				<ChevronDown size={17} strokeWidth={2.15} aria-hidden="true" />
			</span>
		</label>

		<label class="filter-field" for="works-language">
			<span>{m.works_language_label({}, { locale: displayLocale })}</span>
			<span class="select-shell">
				<select id="works-language" name={WORK_FILTER_QUERY_KEYS.language} value={filters.language}>
					<option value="">{m.works_all_languages({}, { locale: displayLocale })}</option>
					{#each localizedFilterOptions.languages as language (language)}
						<option value={language}>{language}</option>
					{/each}
				</select>
				<ChevronDown size={17} strokeWidth={2.15} aria-hidden="true" />
			</span>
		</label>

		<div class="filter-actions">
			<button type="submit">{m.works_apply_filters({}, { locale: displayLocale })}</button>
			{#if hasActiveFilters}
				<a href={worksAction} onclick={clearFilters}>{m.works_clear_filters({}, { locale: displayLocale })}</a>
			{/if}
		</div>
	</form>

	<p
		class="works-result-status"
		aria-live="polite"
		data-results-label={m.works_results_label({}, { locale: displayLocale })}
	>
		{m.works_results_label({}, { locale: displayLocale })}: {filteredWorks.length}
	</p>

	{#if filteredWorks.length > 0}
		<ol class="works-list" role="list">
			{#each filteredWorks as work (work.slug)}
				{@const links = getWorkLinks(work.links)}
				{@const hasWorkDetails =
					Boolean(work.summary) ||
					Boolean(work.license) ||
					work.languages.length > 0 ||
					work.tags.length > 0 ||
					links.length > 0}
				<li
					data-work-card
					data-work-title={work.title}
					data-work-summary={work.summary}
					data-work-status={getWorkStatusLabel(work.status)}
					data-work-license={work.license}
					data-work-tags={work.tags.map(getWorkTagLabel).join(" ")}
					data-work-tag-ids={work.tags.join(" ")}
					data-work-languages={work.languages.join(" ")}
					data-work-language-names={work.languages.join("|")}
				>
					<article class="work-card" class:compact={!hasWorkDetails}>
						<div class="work-heading">
							<h2>{work.title}</h2>
							<span class="work-status" data-status={work.status}>
								{getWorkStatusLabel(work.status)}
							</span>
						</div>

						{#if work.summary}
							<p class="work-summary">{work.summary}</p>
						{/if}

						{#if work.license || work.languages.length > 0}
							<dl class="work-meta">
								{#if work.license}
									<div>
										<dt>{m.works_license_label({}, { locale: displayLocale })}</dt>
										<dd>{work.license}</dd>
									</div>
								{/if}
								{#if work.languages.length > 0}
									<div>
										<dt>{m.works_languages_label({}, { locale: displayLocale })}</dt>
										<dd>
											<ul
												class="work-languages"
												aria-label={m.works_languages_label({}, { locale: displayLocale })}
											>
												{#each work.languages as language (language)}
													<li>{language}</li>
												{/each}
											</ul>
										</dd>
									</div>
								{/if}
							</dl>
						{/if}

						{#if work.tags.length > 0}
							<ul class="work-tags" aria-label={m.works_tags_label({}, { locale: displayLocale })}>
								{#each work.tags as tag (tag)}
									<li data-tag={tag}>{getWorkTagLabel(tag)}</li>
								{/each}
							</ul>
						{/if}

						{#if links.length > 0}
							<nav class="work-links" aria-label={m.works_links_label({}, { locale: displayLocale })}>
								{#each links as link (link.key)}
									{#if link.href}
										<a
											href={link.href}
											target={link.external ? "_blank" : undefined}
											rel={link.external ? "noopener noreferrer" : undefined}
										>
											{getWorkLinkLabel(link.key)}
										</a>
									{:else}
										<button class="work-link-disabled" type="button" disabled>
											{getWorkLinkLabel(link.key)}
										</button>
									{/if}
								{/each}
							</nav>
						{/if}
					</article>
				</li>
			{/each}
		</ol>
	{/if}

	<div
		class="works-empty"
		role="status"
		hidden={filteredWorks.length > 0}
		data-empty-title={m.works_empty_title({}, { locale: displayLocale })}
		data-empty-filtered={m.works_empty_filtered({}, { locale: displayLocale })}
	>
		<p>{hasActiveFilters ? m.works_empty_filtered({}, { locale: displayLocale }) : m.works_empty_title({}, { locale: displayLocale })}</p>
	</div>

	{@html worksFilterScriptMarkup}
</section>

<style>
	.works-section {
		display: grid;
		width: min(100%, 58rem);
		gap: 1.1rem;
	}

	.works-filters {
		display: grid;
		grid-template-columns: minmax(14rem, 1fr) minmax(8rem, 12rem) minmax(8rem, 12rem) auto;
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
	.works-result-status,
	.work-tags li,
	.work-languages li,
	.work-links a,
	.work-links button {
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

	.works-result-status {
		margin: 0;
		color: var(--muted-foreground);
		font-size: 0.9rem;
		font-weight: 680;
	}

	.works-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
		grid-auto-rows: 1fr;
		gap: 0.85rem;
		align-items: stretch;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.works-list > li {
		display: flex;
		min-height: 100%;
	}

	.work-card {
		display: flex;
		width: 100%;
		min-height: 100%;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem;
		border: 1px solid color-mix(in oklch, var(--border) 78%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 72%, transparent);
		box-shadow: 0 0.85rem 2rem color-mix(in oklch, var(--display-heading-shadow) 58%, transparent);
	}

	.work-card.compact {
		gap: 0;
	}

	:global(.dark) .work-card {
		background: color-mix(in oklch, var(--card) 78%, transparent);
	}

	.work-heading {
		display: flex;
		gap: 0.7rem;
		align-items: start;
		justify-content: space-between;
		min-width: 0;
	}

	.work-heading h2,
	.work-summary,
	.work-meta,
	.work-meta dd,
	.work-languages,
	.works-empty {
		margin: 0;
	}

	.work-heading h2 {
		min-width: 0;
		font-size: 1.08rem;
		font-weight: 780;
		letter-spacing: 0;
		overflow-wrap: anywhere;
	}

	.work-status {
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

	.work-status[data-status="live"] {
		border-color: color-mix(in oklch, var(--moss) 48%, var(--border));
	}

	.work-status[data-status="building"] {
		border-color: color-mix(in oklch, var(--water-deep) 52%, var(--border));
	}

	.work-status[data-status="experimental"] {
		border-color: color-mix(in oklch, var(--wildflower) 48%, var(--border));
	}

	.work-summary {
		color: var(--foreground);
		line-height: 1.58;
	}

	.work-meta {
		display: grid;
		gap: 0.32rem;
		color: var(--muted-foreground);
		font-size: 0.86rem;
	}

	.work-meta div {
		display: grid;
		grid-template-columns: 4.2rem minmax(0, 1fr);
		gap: 0.55rem;
	}

	.work-meta dt {
		font-weight: 760;
	}

	.work-tags,
	.work-languages,
	.work-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.work-tags,
	.work-languages {
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.work-tags li,
	.work-languages li,
	.work-links a,
	.work-links button {
		border-radius: var(--radius-sm);
		font-size: 0.82rem;
		font-weight: 700;
		user-select: none;
	}

	.work-tags li {
		padding: 0.15rem 0.45rem;
		border: 1px solid color-mix(in oklch, var(--border) 78%, transparent);
		color: var(--muted-foreground);
	}

	.work-languages li {
		color: var(--foreground);
	}

	.work-links {
		align-self: end;
		margin-top: auto;
		padding-top: 0.2rem;
	}

	.work-links a,
	.work-links button {
		display: inline-flex;
		min-height: 2rem;
		align-items: center;
		justify-content: center;
		padding: 0 0.62rem;
		border: 1px solid var(--mode-control-border);
		background: var(--mode-control-background);
		color: var(--mode-control-foreground);
		text-decoration: none;
	}

	.work-links a:hover {
		background: var(--mode-control-hover-background);
	}

	.work-link-disabled {
		opacity: 0.54;
		cursor: not-allowed;
	}

	.work-links a:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--sidebar-ring) 70%, white);
		outline-offset: 3px;
	}

	.works-filters :is(input, select, button, a):focus-visible {
		outline: 3px solid color-mix(in oklch, var(--sidebar-ring) 70%, white);
		outline-offset: 3px;
	}

	.works-empty {
		padding: 1.25rem 0;
		border-top: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
		color: var(--muted-foreground);
		font-weight: 680;
	}

	.works-empty p {
		margin: 0;
	}

	@media (max-width: 64rem) {
		.works-filters {
			grid-template-columns: 1fr 1fr;
		}

		.search-field,
		.filter-actions {
			grid-column: 1 / -1;
		}
	}

	@media (max-width: 36rem) {
		.works-filters {
			grid-template-columns: 1fr;
		}

		.filter-actions {
			align-items: stretch;
			flex-direction: column;
		}

		.work-heading {
			display: grid;
		}

		.work-status {
			justify-self: start;
		}

		.work-meta div {
			grid-template-columns: 1fr;
			gap: 0.15rem;
		}
	}
</style>
