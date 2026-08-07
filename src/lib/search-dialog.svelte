<script lang="ts">
	import { tick } from "svelte";
	import { X } from "@lucide/svelte";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import { toDisplayLocale } from "$lib/site-labels";
	import { isEditableKeyboardTarget, isModifiedKeyEvent } from "$lib/site-keyboard";
	import IconButton from "$lib/ui/icon-button.svelte";

	type SearchResultItem = {
		id: string;
		url: string;
		title: string;
		excerpt: string;
	};

	type PagefindSearchResponse = {
		results?: Array<{
			id: string;
			data?: {
				url?: string;
				title?: string;
				excerpt?: string;
			};
		}>;
	};

	type PagefindModule = {
		search: (term: string) => Promise<PagefindSearchResponse>;
	};

	let dialog = $state<HTMLDialogElement>();
	let searchInput = $state<HTMLInputElement>();
	let query = $state("");
	let results = $state<SearchResultItem[]>([]);
	let status: "idle" | "loading" | "ready" | "unavailable" = $state("idle");
	let pagefindModule: PagefindModule | null = null;
	let requestSequence = 0;
	let searchTimer: ReturnType<typeof setTimeout> | undefined;

	const displayLocale = $derived(toDisplayLocale(getLocale()));

	export function openSearch() {
		query = "";
		results = [];
		status = "idle";
		dialog?.showModal();
		void tick().then(() => searchInput?.focus());
	}

	function closeSearch() {
		dialog?.close();
	}

	function closeSearchOnBackdrop(event: MouseEvent) {
		if (event.target === dialog) {
			closeSearch();
		}
	}

	async function runSearch(term: string) {
		const requestId = ++requestSequence;
		const trimmedTerm = term.trim();

		if (!trimmedTerm) {
			results = [];
			status = "idle";
			return;
		}

		status = "loading";

		try {
			pagefindModule ??= await loadPagefind();
			const response = await pagefindModule.search(trimmedTerm);

			if (requestId !== requestSequence) {
				return;
			}

			results = (response.results ?? [])
				.map((result) => ({
					id: result.id,
					url: result.data?.url ?? "",
					title: result.data?.title ?? "",
					excerpt: result.data?.excerpt ?? "",
				}))
				.filter((result) => result.url.length > 0);
			status = "ready";
		} catch {
			if (requestId !== requestSequence) {
				return;
			}

			results = [];
			status = "unavailable";
		}
	}

	async function loadPagefind(): Promise<PagefindModule> {
		const moduleUrl = "/pagefind/pagefind.js";

		return (await import(/* @vite-ignore */ moduleUrl)) as PagefindModule;
	}

	function handleInput(event: Event) {
		const nextQuery = (event.currentTarget as HTMLInputElement).value;
		query = nextQuery;

		if (searchTimer) {
			clearTimeout(searchTimer);
		}

		searchTimer = setTimeout(() => void runSearch(nextQuery), 160);
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.defaultPrevented || isModifiedKeyEvent(event) || isEditableKeyboardTarget(event.target)) {
			return;
		}

		if (document.querySelector<HTMLDialogElement>(".settings-dialog")?.open) {
			return;
		}

		if (event.key === "/") {
			event.preventDefault();
			openSearch();
		}
	}

	function handleDialogKeydown(event: KeyboardEvent) {
		if (event.defaultPrevented || isModifiedKeyEvent(event)) {
			return;
		}

		if (event.key === "ArrowDown" || event.key === "ArrowUp") {
			const anchors = Array.from(
				dialog?.querySelectorAll<HTMLAnchorElement>("a[data-search-result]") ?? [],
			);

			if (anchors.length === 0) {
				return;
			}

			event.preventDefault();

			const currentIndex = anchors.indexOf(document.activeElement as HTMLAnchorElement);
			const direction = event.key === "ArrowDown" ? 1 : -1;
			const nextIndex =
				currentIndex === -1
					? direction === 1
						? 0
						: anchors.length - 1
					: (currentIndex + direction + anchors.length) % anchors.length;

			anchors[nextIndex]?.focus();
			return;
		}

		if (isEditableKeyboardTarget(event.target)) {
			return;
		}
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<dialog
	bind:this={dialog}
	class="search-dialog"
	aria-labelledby="search-dialog-title"
	onkeydown={handleDialogKeydown}
	onclick={closeSearchOnBackdrop}
>
	<div
		class="search-dialog-panel animate-in fade-in zoom-in-95 duration-200 ease-out motion-reduce:animate-none"
	>
		<header class="search-dialog-header">
			<h2 id="search-dialog-title" class="sr-only">
				{m.search_label({}, { locale: displayLocale })}
			</h2>
			<label class="search-field" for="search-dialog-input">
				<span class="sr-only">{m.search_label({}, { locale: displayLocale })}</span>
				<input
					bind:this={searchInput}
					id="search-dialog-input"
					type="search"
					value={query}
					placeholder={m.search_placeholder({}, { locale: displayLocale })}
					autocomplete="off"
					oninput={handleInput}
				/>
			</label>
			<IconButton
				icon={X}
				label={m.close_label({}, { locale: displayLocale })}
				title={m.close_label({}, { locale: displayLocale })}
				onclick={closeSearch}
			/>
		</header>

		<div class="search-dialog-body" aria-live="polite">
			{#if status === "unavailable"}
				<p class="search-note">{m.search_unavailable_label({}, { locale: displayLocale })}</p>
			{:else if status === "loading"}
				<div class="search-skeleton" aria-hidden="true">
					<span></span>
					<span></span>
					<span></span>
				</div>
			{:else if results.length > 0}
				<p class="search-summary">
					{m.search_results_label({}, { locale: displayLocale })}: {results.length}
				</p>
				<ul class="search-results" role="list">
					{#each results as result (result.id)}
						<li>
							<a
								class="search-result"
								href={result.url}
								data-search-result
								onclick={closeSearch}
							>
								<span class="search-result-title">{result.title}</span>
								{#if result.excerpt}
									<span class="search-result-excerpt">{@html result.excerpt}</span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			{:else if query.trim()}
				<p class="search-note">{m.search_no_results({}, { locale: displayLocale })}</p>
			{/if}
		</div>
	</div>
</dialog>

<style>
	.search-dialog {
		position: fixed;
		inset: 50% auto auto 50%;
		width: min(38rem, calc(100vw - 2rem));
		max-height: min(72svh, 42rem);
		padding: 0;
		border: 1px solid var(--sidebar-border);
		border-radius: var(--radius-lg);
		background: var(--popover);
		color: var(--popover-foreground);
		box-shadow: 0 1.25rem 4rem color-mix(in oklch, var(--ink) 28%, transparent);
		transform: translate(-50%, -50%);
		user-select: none;
	}

	.search-dialog::backdrop {
		background: color-mix(in oklch, var(--ink) 38%, transparent);
	}

	.search-dialog-panel {
		display: grid;
		gap: 0.9rem;
		padding: 1rem;
	}

	.search-dialog-header {
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}

	.search-field {
		flex: 1;
		min-width: 0;
	}

	.search-field input {
		width: 100%;
		min-height: 2.65rem;
		padding: 0 0.85rem;
		border: 1px solid var(--input);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 70%, transparent);
		color: var(--foreground);
		font: inherit;
		font-weight: 620;
	}

	:global(.dark) .search-field input {
		background: color-mix(in oklch, var(--card) 72%, transparent);
	}

	.search-field input:focus-visible {
		outline: 3px solid var(--focus-ring);
		outline-offset: 3px;
	}

	.search-dialog-body {
		display: grid;
		gap: 0.6rem;
		min-height: 10rem;
		max-height: min(58svh, 32rem);
		overflow: auto;
		overscroll-behavior: contain;
	}

	.search-summary {
		margin: 0;
		color: var(--muted-foreground);
		font-size: 0.88rem;
		font-weight: 680;
	}

	.search-note {
		margin: 0;
		padding: 1rem 0;
		color: var(--muted-foreground);
		font-weight: 680;
	}

	.search-results {
		display: grid;
		gap: 0.35rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.search-result {
		display: grid;
		gap: 0.3rem;
		padding: 0.7rem 0.8rem;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		color: inherit;
		text-decoration: none;
	}

	.search-result:hover {
		border-color: color-mix(in oklch, var(--border) 78%, transparent);
		background: var(--surface-hover);
	}

	.search-result:focus-visible {
		border-color: color-mix(in oklch, var(--border) 78%, transparent);
		background: var(--surface-hover);
		outline: 3px solid var(--focus-ring);
		outline-offset: 3px;
	}

	.search-result-title {
		font-weight: 760;
	}

	.search-result-excerpt {
		color: var(--muted-foreground);
		font-size: 0.88rem;
		line-height: 1.5;
	}

	.search-result-excerpt :global(mark) {
		border-radius: 0.15rem;
		background: color-mix(in oklch, var(--moss-soft) 55%, transparent);
		color: inherit;
	}

	.search-skeleton {
		display: grid;
		gap: 0.5rem;
		padding: 0.6rem 0;
	}

	.search-skeleton span {
		height: 0.75rem;
		border-radius: var(--radius-sm);
		background: color-mix(in oklch, var(--border) 42%, transparent);
		animation: search-pulse 1.4s ease-in-out infinite;
	}

	.search-skeleton span:nth-child(2) {
		width: 82%;
	}

	.search-skeleton span:nth-child(3) {
		width: 64%;
	}

	@keyframes search-pulse {
		0%,
		100% {
			opacity: 0.55;
		}

		50% {
			opacity: 1;
		}
	}
</style>
