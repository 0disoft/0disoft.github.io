<script lang="ts">
	import { pushState } from "$app/navigation";
	import { page } from "$app/state";
	import { ArrowLeft, Copy, MessageCircle, Send, Share2 } from "@lucide/svelte";
	import { onMount } from "svelte";
	import { siReddit, siWhatsapp, siX, type SimpleIcon } from "simple-icons";
	import * as m from "$lib/paraglide/messages";
	import { getLocale } from "$lib/paraglide/runtime";
	import {
		buildBlogPostingStructuredData,
		createStructuredDataScriptMarkup,
	} from "$lib/blog-post-seo";
	import AdUnit from "$lib/ad-unit.svelte";
	import { createBlogPostRenderItems } from "$lib/blog-post-ads";
	import { buildBlogShareLinks, type BlogSharePlatform } from "$lib/blog-share";
	import {
		BLOG_POST_TOC_SHORTCUT_LIMIT,
		BLOG_POST_TOC_SHORTCUT_PREFIX,
		blogPostDetails,
		getAdjacentBlogPosts,
		getBlogPostBodyBlocks,
		getBlogPostForLocale,
		getBlogPostTagLabels,
		getBlogPostTocShortcut,
		getBlogPostTocShortcutIndex,
	} from "$lib/blog-posts";
	import { toDisplayLocale, withShortcut } from "$lib/site-labels";
	import { isSiteLocale, localizeSitePathname } from "$lib/site-locales";
	import { siteProfile } from "$lib/site-profile";
	import BrandIcon from "$lib/ui/brand-icon.svelte";

	type SharePlatformIcon =
		| { kind: "lucide"; name: "send" | "message-circle" }
		| { kind: "brand"; icon: SimpleIcon };

	let { slug }: { slug: string } = $props();

	let canUseDeviceShare = $state(false);
	let copyState = $state<"idle" | "copied">("idle");
	let blogPostElement = $state<HTMLElement | undefined>();
	let copyFeedbackTimer: number | undefined;
	let tocShortcutPending = $state(false);
	let tocShortcutTimer: number | undefined;
	let selectedImage = $state<{ src: string; alt: string } | undefined>();
	let imagePreviewDialog = $state<HTMLDialogElement | undefined>();

	const currentLocale = $derived(getLocale());
	const displayLocale = $derived(toDisplayLocale(currentLocale));
	const post = $derived(
		getBlogPostForLocale(blogPostDetails, slug, currentLocale),
	);
	const adjacentPosts = $derived(
		getAdjacentBlogPosts(blogPostDetails, slug, currentLocale),
	);
	const postTagLabels = $derived(post ? getBlogPostTagLabels(post) : []);
	const postBodyBlocks = $derived(post ? getBlogPostBodyBlocks(post) : []);
	const postRenderItems = $derived(createBlogPostRenderItems(postBodyBlocks));
	const postHeadings = $derived(
		postBodyBlocks
			.flatMap((block, index) =>
				block.kind === "heading"
					? [{ id: getPostHeadingId(index), text: block.text }]
					: [],
			)
			.map((heading, index) => ({
				...heading,
				shortcut: getBlogPostTocShortcut(index),
			})),
	);
	const selectedLocale = $derived(
		isSiteLocale(currentLocale) ? currentLocale : "en",
	);
	const sharePath = $derived(
		post ? localizeSitePathname(`/blog/${post.slug}`, selectedLocale) : "",
	);
	const shareUrl = $derived(
		sharePath ? new URL(sharePath, siteProfile.origin).toString() : "",
	);
	const blogPostingStructuredDataMarkup = $derived(
		post && shareUrl
			? createStructuredDataScriptMarkup(
					buildBlogPostingStructuredData({
						post,
						canonicalUrl: shareUrl,
						siteProfile,
					}),
				)
			: "",
	);
	const sharePayload = $derived(
		post && shareUrl
			? {
					title: post.title,
					text: post.summary,
					url: shareUrl,
				}
			: null,
	);
	const shareLinks = $derived(
		sharePayload ? buildBlogShareLinks(sharePayload) : [],
	);
	const blogHref = $derived(localizeSitePathname("/blog", selectedLocale));
	const previousPostShortcutTitle = $derived(
		withShortcut(
			m.blog_post_previous_label({}, { locale: displayLocale }),
			"Alt+P",
		),
	);
	const nextPostShortcutTitle = $derived(
		withShortcut(
			m.blog_post_next_label({}, { locale: displayLocale }),
			"Alt+N",
		),
	);

	$effect(() => {
		if (!imagePreviewDialog) {
			return;
		}

		if (selectedImage && !imagePreviewDialog.open) {
			imagePreviewDialog.showModal();
			return;
		}

		if (!selectedImage && imagePreviewDialog.open) {
			imagePreviewDialog.close();
		}
	});

	onMount(() => {
		canUseDeviceShare =
			typeof navigator !== "undefined" && typeof navigator.share === "function";
		window.addEventListener("keydown", handleTocShortcut);
		window.addEventListener("keydown", handleAdjacentPostShortcut);
		window.addEventListener("keydown", handleBlogPostControlKeydown);

		return () => {
			window.removeEventListener("keydown", handleTocShortcut);
			window.removeEventListener("keydown", handleAdjacentPostShortcut);
			window.removeEventListener("keydown", handleBlogPostControlKeydown);

			if (copyFeedbackTimer !== undefined) {
				window.clearTimeout(copyFeedbackTimer);
			}

			clearTocShortcutSequence();
		};
	});

	function getPostHeadingId(index: number): string {
		return `post-heading-${index}`;
	}

	function getPostHeadingTitle(heading: {
		text: string;
		shortcut?: string;
	}): string | undefined {
		return heading.shortcut
			? withShortcut(heading.text, heading.shortcut)
			: undefined;
	}

	function getBlogPostHref(slug: string): string {
		return localizeSitePathname(`/blog/${slug}`, selectedLocale);
	}

	function handleTocShortcut(event: KeyboardEvent) {
		if (
			event.defaultPrevented ||
			event.altKey ||
			event.ctrlKey ||
			event.metaKey ||
			event.shiftKey
		) {
			return;
		}

		if (
			event.key.toLocaleLowerCase() ===
			BLOG_POST_TOC_SHORTCUT_PREFIX.toLocaleLowerCase()
		) {
			event.preventDefault();
			startTocShortcutSequence();
			return;
		}

		if (!tocShortcutPending) {
			return;
		}

		const shortcutIndex = getBlogPostTocShortcutIndex(event.key, event.code);

		if (
			shortcutIndex === undefined ||
			shortcutIndex >= BLOG_POST_TOC_SHORTCUT_LIMIT
		) {
			clearTocShortcutSequence();
			return;
		}

		const heading = postHeadings[shortcutIndex];

		if (!heading) {
			clearTocShortcutSequence();
			return;
		}

		const target = document.getElementById(heading.id);

		if (!target) {
			clearTocShortcutSequence();
			return;
		}

		event.preventDefault();
		clearTocShortcutSequence();
		target.focus({ preventScroll: true });
		target.scrollIntoView({ block: "start" });

		const nextUrl = new URL(window.location.href);
		nextUrl.hash = heading.id;
		pushState(nextUrl, page.state);
	}

	function startTocShortcutSequence() {
		tocShortcutPending = true;

		if (tocShortcutTimer !== undefined) {
			window.clearTimeout(tocShortcutTimer);
		}

		tocShortcutTimer = window.setTimeout(() => {
			clearTocShortcutSequence();
		}, 1600);
	}

	function clearTocShortcutSequence() {
		tocShortcutPending = false;

		if (tocShortcutTimer !== undefined) {
			window.clearTimeout(tocShortcutTimer);
			tocShortcutTimer = undefined;
		}
	}

	function openImagePreview(image: { src: string; alt: string }) {
		selectedImage = image;
	}

	function closeImagePreview() {
		selectedImage = undefined;
	}

	function handleImagePreviewDialogClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeImagePreview();
		}
	}

	function handleAdjacentPostShortcut(event: KeyboardEvent) {
		if (
			event.defaultPrevented ||
			!event.altKey ||
			event.ctrlKey ||
			event.metaKey ||
			event.shiftKey
		) {
			return;
		}

		const shortcutKey = event.key.toLocaleLowerCase();
		const adjacentPost =
			shortcutKey === "p"
				? adjacentPosts.previous
				: shortcutKey === "n"
					? adjacentPosts.next
					: null;

		if (!adjacentPost) {
			return;
		}

		event.preventDefault();
		window.location.assign(getBlogPostHref(adjacentPost.slug));
	}

	function handleBlogPostControlKeydown(event: KeyboardEvent) {
		if (
			event.defaultPrevented ||
			isModifiedKeyEvent(event) ||
			isEditableKeyboardTarget(event.target) ||
			!isBlogPostKeyboardTarget(event.target)
		) {
			return;
		}

		const key = event.key.toLocaleLowerCase();

		if (key === "arrowright" || key === "arrowdown") {
			event.preventDefault();
			focusAdjacentBlogPostControl(1);
			return;
		}

		if (key === "arrowleft" || key === "arrowup") {
			event.preventDefault();
			focusAdjacentBlogPostControl(-1);
			return;
		}

		if (key === "home") {
			event.preventDefault();
			focusBoundaryBlogPostControl("first");
			return;
		}

		if (key === "end") {
			event.preventDefault();
			focusBoundaryBlogPostControl("last");
		}
	}

	function getBlogPostFocusTargets(): HTMLElement[] {
		return Array.from(
			blogPostElement?.querySelectorAll<HTMLElement>(
				"[data-blog-post-keyboard-target]",
			) ?? [],
		);
	}

	function focusAdjacentBlogPostControl(direction: 1 | -1) {
		const targets = getBlogPostFocusTargets();

		if (targets.length === 0) {
			return;
		}

		const currentIndex = targets.indexOf(document.activeElement as HTMLElement);
		const nextIndex =
			currentIndex === -1
				? 0
				: (currentIndex + direction + targets.length) % targets.length;

		targets[nextIndex]?.focus();
	}

	function focusBoundaryBlogPostControl(boundary: "first" | "last") {
		const targets = getBlogPostFocusTargets();
		const target = boundary === "first" ? targets[0] : targets.at(-1);

		target?.focus();
	}

	function isBlogPostKeyboardTarget(target: EventTarget | null): boolean {
		return (
			target instanceof HTMLElement &&
			Boolean(target.closest("[data-blog-post-keyboard-target]"))
		);
	}

	function isModifiedKeyEvent(event: KeyboardEvent): boolean {
		return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
	}

	function isEditableKeyboardTarget(target: EventTarget | null): boolean {
		return (
			target instanceof HTMLInputElement ||
			target instanceof HTMLTextAreaElement ||
			target instanceof HTMLSelectElement ||
			(target instanceof HTMLElement && target.isContentEditable)
		);
	}

	function getSharePlatformLabel(platform: BlogSharePlatform): string {
		switch (platform) {
			case "telegram":
				return m.blog_post_share_telegram({}, { locale: displayLocale });
			case "line":
				return m.blog_post_share_line({}, { locale: displayLocale });
			case "whatsapp":
				return m.blog_post_share_whatsapp({}, { locale: displayLocale });
			case "x":
				return m.blog_post_share_x({}, { locale: displayLocale });
			case "reddit":
				return m.blog_post_share_reddit({}, { locale: displayLocale });
		}
	}

	function getSharePlatformIcon(
		platform: BlogSharePlatform,
	): SharePlatformIcon {
		switch (platform) {
			case "telegram":
				return { kind: "lucide", name: "send" };
			case "line":
				return { kind: "lucide", name: "message-circle" };
			case "whatsapp":
				return { kind: "brand", icon: siWhatsapp };
			case "x":
				return { kind: "brand", icon: siX };
			case "reddit":
				return { kind: "brand", icon: siReddit };
		}
	}

	async function copyShareUrl() {
		if (!shareUrl) {
			return;
		}

		await copyTextToClipboard(shareUrl);
		copyState = "copied";

		if (copyFeedbackTimer !== undefined) {
			window.clearTimeout(copyFeedbackTimer);
		}

		copyFeedbackTimer = window.setTimeout(() => {
			copyState = "idle";
			copyFeedbackTimer = undefined;
		}, 1500);
	}

	async function shareWithDevice() {
		if (!sharePayload) {
			return;
		}

		if (
			canUseDeviceShare &&
			typeof navigator !== "undefined" &&
			typeof navigator.share === "function"
		) {
			try {
				await navigator.share(sharePayload);
				return;
			} catch (error) {
				if (isShareAbortError(error)) {
					return;
				}
			}
		}

		await copyShareUrl();
	}

	async function copyTextToClipboard(text: string) {
		if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			return;
		}

		if (typeof document === "undefined") {
			throw new Error("Clipboard is not available");
		}

		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.setAttribute("readonly", "");
		textarea.style.position = "fixed";
		textarea.style.opacity = "0";
		document.body.append(textarea);
		textarea.select();
		document.execCommand("copy");
		textarea.remove();
	}

	function isShareAbortError(error: unknown): boolean {
		return Boolean(
			error &&
			typeof error === "object" &&
			"name" in error &&
			error.name === "AbortError",
		);
	}
</script>

<svelte:head>
	<title
		>{post ? `${post.title} · ${siteProfile.name}` : siteProfile.name}</title
	>
	{#if blogPostingStructuredDataMarkup}
		{@html blogPostingStructuredDataMarkup}
	{/if}
</svelte:head>

{#if post}
	<article
		bind:this={blogPostElement}
		class="blog-post"
		aria-labelledby="section-title"
	>
		<a class="back-link" href={blogHref}>
			<ArrowLeft aria-hidden="true" size={16} strokeWidth={2.2} />
			<span class="back-link-label"
				>{m.blog_back_to_list({}, { locale: displayLocale })}</span
			>
		</a>

		<header class="post-header">
			<dl class="post-meta">
				<div>
					<dt>{m.blog_post_author_label({}, { locale: displayLocale })}</dt>
					<dd>
						<a
							href={siteProfile.author.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							{siteProfile.author.name}
						</a>
					</dd>
				</div>
				<div>
					<dt>{m.blog_post_published_label({}, { locale: displayLocale })}</dt>
					<dd>
						<time datetime={post.publishedAt}>{post.publishedAt}</time>
					</dd>
				</div>
				{#if post.updatedAt && post.updatedAt !== post.publishedAt}
					<div>
						<dt>{m.blog_post_updated_label({}, { locale: displayLocale })}</dt>
						<dd>
							<time datetime={post.updatedAt}>{post.updatedAt}</time>
						</dd>
					</div>
				{/if}
			</dl>
			<h1 id="section-title">{post.title}</h1>
			<p>{post.summary}</p>
			<ul aria-label={m.blog_post_tags_label({}, { locale: displayLocale })}>
				{#each postTagLabels as tag (tag)}
					<li>{tag}</li>
				{/each}
			</ul>
		</header>

		<div class="post-reading-layout">
			<div class="post-body">
				{#each postRenderItems as item (item.key)}
					{#if item.kind === "ad"}
						<AdUnit slotKey={item.placement.slotKey} />
					{:else if item.block.kind === "paragraph"}
						<p>{item.block.text}</p>
					{:else if item.block.kind === "heading"}
						<h2 id={getPostHeadingId(item.blockIndex)} tabindex="-1">
							{item.block.text}
						</h2>
					{:else if item.block.kind === "image"}
						{@const imageBlock = item.block}
						<figure class="post-image">
							<button
								type="button"
								class="post-image-button"
								onclick={() =>
									openImagePreview({
										src: imageBlock.src,
										alt: imageBlock.alt,
									})}
							>
								<img
									src={imageBlock.src}
									alt={imageBlock.alt}
									loading="lazy"
									decoding="async"
								/>
							</button>
						</figure>
					{:else if item.block.kind === "table"}
						<div class="post-table-wrap">
							<table>
								<thead>
									<tr>
										{#each item.block.headers as header}
											<th scope="col">{header}</th>
										{/each}
									</tr>
								</thead>
								<tbody>
									{#each item.block.rows as row}
										<tr>
											{#each row as cell}
												<td>{cell}</td>
											{/each}
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{/if}
				{/each}

				{#if adjacentPosts.previous || adjacentPosts.next}
					<nav
						class="post-adjacent"
						aria-label={m.blog_post_adjacent_label(
							{},
							{ locale: displayLocale },
						)}
					>
						{#if adjacentPosts.previous}
							<a
								class="post-adjacent-link previous"
								href={getBlogPostHref(adjacentPosts.previous.slug)}
								title={previousPostShortcutTitle}
								aria-keyshortcuts="Alt+P"
								data-blog-post-keyboard-target
							>
								<span
									>{m.blog_post_previous_label(
										{},
										{ locale: displayLocale },
									)}</span
								>
								<strong>{adjacentPosts.previous.title}</strong>
							</a>
						{/if}

						{#if adjacentPosts.next}
							<a
								class="post-adjacent-link next"
								href={getBlogPostHref(adjacentPosts.next.slug)}
								title={nextPostShortcutTitle}
								aria-keyshortcuts="Alt+N"
								data-blog-post-keyboard-target
							>
								<span
									>{m.blog_post_next_label({}, { locale: displayLocale })}</span
								>
								<strong>{adjacentPosts.next.title}</strong>
							</a>
						{/if}
					</nav>
				{/if}
			</div>

			{#if postHeadings.length > 0 || shareLinks.length > 0}
				<aside class="post-sidecar">
					{#if postHeadings.length > 0}
						<nav
							class="post-toc"
							aria-label={m.blog_post_toc_label({}, { locale: displayLocale })}
						>
							<p>{m.blog_post_toc_label({}, { locale: displayLocale })}</p>
							<ol>
								{#each postHeadings as heading (heading.id)}
									<li>
										<a
											href={`#${heading.id}`}
											title={getPostHeadingTitle(heading)}
											data-shortcut-sequence={heading.shortcut}
											data-blog-post-keyboard-target
										>
											{heading.text}
										</a>
									</li>
								{/each}
							</ol>
						</nav>
					{/if}

					{#if shareLinks.length > 0}
						<section class="post-share" aria-labelledby="post-share-title">
							<p id="post-share-title">
								{m.blog_post_share_label({}, { locale: displayLocale })}
							</p>
							<div class="post-share-grid">
								<button
									class="post-share-icon-button"
									type="button"
									aria-label={copyState === "copied"
										? m.blog_post_copied_link({}, { locale: displayLocale })
										: m.blog_post_copy_link({}, { locale: displayLocale })}
									data-tooltip={copyState === "copied"
										? m.blog_post_copied_link({}, { locale: displayLocale })
										: m.blog_post_copy_link({}, { locale: displayLocale })}
									data-blog-post-keyboard-target
									onclick={copyShareUrl}
								>
									<Copy aria-hidden="true" size={18} strokeWidth={2.2} />
								</button>
								<button
									class="post-share-icon-button"
									type="button"
									aria-label={m.blog_post_share_device(
										{},
										{ locale: displayLocale },
									)}
									data-tooltip={m.blog_post_share_device(
										{},
										{ locale: displayLocale },
									)}
									data-blog-post-keyboard-target
									onclick={shareWithDevice}
								>
									<Share2 aria-hidden="true" size={18} strokeWidth={2.2} />
								</button>
								{#each shareLinks as shareLink (shareLink.platform)}
									{@const platformLabel = getSharePlatformLabel(
										shareLink.platform,
									)}
									{@const platformIcon = getSharePlatformIcon(
										shareLink.platform,
									)}
									<a
										class="post-share-icon-button"
										href={shareLink.href}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={platformLabel}
										data-tooltip={platformLabel}
										data-blog-post-keyboard-target
									>
										{#if platformIcon.kind === "lucide"}
											{#if platformIcon.name === "send"}
												<Send aria-hidden="true" size={18} strokeWidth={2.2} />
											{:else}
												<MessageCircle
													aria-hidden="true"
													size={18}
													strokeWidth={2.2}
												/>
											{/if}
										{:else}
											<BrandIcon icon={platformIcon.icon} size={18} />
										{/if}
									</a>
								{/each}
							</div>
							<span class="sr-only" aria-live="polite">
								{copyState === "copied"
									? m.blog_post_copied_link({}, { locale: displayLocale })
									: ""}
							</span>
						</section>
					{/if}
				</aside>
			{/if}
		</div>

		<dialog
			bind:this={imagePreviewDialog}
			class="post-image-preview-dialog"
			aria-label={selectedImage?.alt ?? ""}
			onclick={handleImagePreviewDialogClick}
			onclose={closeImagePreview}
		>
			{#if selectedImage}
				<button
					type="button"
					class="post-image-preview-close"
					onclick={closeImagePreview}
				>
					<img
						src={selectedImage.src}
						alt={selectedImage.alt}
						decoding="async"
					/>
				</button>
			{/if}
		</dialog>
	</article>
{/if}

<style>
	.blog-post {
		--post-body-width: 48rem;
		--post-toc-min-width: 12rem;
		--post-toc-max-width: 16rem;

		display: grid;
		width: min(100%, 70rem);
		gap: 1.2rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.32rem;
		justify-self: start;
		color: var(--muted-foreground);
		font-size: 0.9rem;
		font-weight: 700;
		text-decoration: none;
		user-select: none;
	}

	.back-link:hover {
		color: var(--foreground);
		text-decoration: underline;
		text-underline-offset: 0.18em;
	}

	.post-header {
		display: grid;
		width: min(100%, var(--post-body-width));
		gap: 0.65rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.post-header h1,
	.post-header p {
		margin: 0;
	}

	.post-header h1 {
		color: var(--foreground);
		font-size: clamp(1.55rem, 3.85vw, 2.9rem);
		font-weight: 740;
		letter-spacing: 0;
		line-height: 1;
		text-shadow: 0 0.07em 0 var(--display-heading-shadow);
	}

	.post-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 0.8rem;
		padding: 0;
		margin: 0;
		color: var(--muted-foreground);
		font-size: 0.9rem;
		font-weight: 680;
		user-select: none;
	}

	.post-meta div {
		display: inline-flex;
		gap: 0.28rem;
		align-items: baseline;
	}

	.post-meta dt,
	.post-meta dd {
		margin: 0;
	}

	.post-meta dt::after {
		content: ":";
	}

	.post-meta a {
		color: inherit;
		text-decoration: none;
	}

	.post-meta a:hover {
		color: var(--foreground);
		text-decoration: underline;
		text-underline-offset: 0.18em;
	}

	.post-header ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		padding: 0;
		margin: 0.2rem 0 0;
		list-style: none;
	}

	.post-header ul li {
		padding: 0.15rem 0.45rem;
		border: 1px solid color-mix(in oklch, var(--border) 78%, transparent);
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		font-size: 0.82rem;
		font-weight: 680;
		user-select: none;
	}

	.post-reading-layout {
		display: grid;
		grid-template-areas: "body toc";
		grid-template-columns: minmax(0, var(--post-body-width)) minmax(
				var(--post-toc-min-width),
				var(--post-toc-max-width)
			);
		gap: clamp(1.25rem, 4vw, 2.5rem);
		align-items: start;
	}

	.post-body {
		display: grid;
		grid-area: body;
		min-width: 0;
		gap: 1rem;
		color: var(--foreground);
		font-size: calc(1.02rem + 2pt);
		line-height: 1.75;
	}

	.post-sidecar {
		display: grid;
		position: sticky;
		top: 1.25rem;
		grid-area: toc;
		gap: 0.9rem;
		padding-left: 0.85rem;
		border-left: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		color: var(--foreground);
		font-size: calc(0.86rem + 1pt);
		line-height: 1.35;
		user-select: none;
	}

	.post-toc,
	.post-share {
		display: grid;
		gap: 0.55rem;
	}

	.post-toc p {
		margin: 0;
		font-weight: 760;
	}

	.post-toc ol {
		display: grid;
		gap: 0.45rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.post-toc a {
		color: var(--muted-foreground);
		text-decoration: none;
	}

	.post-toc a:hover {
		color: var(--foreground);
		text-decoration: underline;
		text-underline-offset: 0.18em;
	}

	.post-share {
		--post-share-icon-size: 2.35rem;
		--post-tooltip-background: oklch(0.16 0.04 132);
		--post-tooltip-border: oklch(0.98 0.026 92 / 46%);
		--post-tooltip-foreground: oklch(0.98 0.026 92);

		padding-top: 0.85rem;
		border-top: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
	}

	.post-share p {
		margin: 0;
		font-weight: 760;
	}

	.post-share-grid {
		display: grid;
		grid-template-columns: repeat(4, var(--post-share-icon-size));
		gap: 0.42rem;
	}

	.post-share-icon-button {
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		width: var(--post-share-icon-size);
		height: var(--post-share-icon-size);
		padding: 0;
		border: 1px solid color-mix(in oklch, var(--border) 76%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 42%, transparent);
		color: var(--foreground);
		cursor: pointer;
		text-decoration: none;
		user-select: none;
	}

	.post-share-icon-button:hover {
		border-color: color-mix(in oklch, var(--sidebar-ring) 62%, var(--border));
		background: color-mix(in oklch, var(--paper-soft) 58%, transparent);
	}

	.post-share-icon-button:hover,
	.post-share-icon-button:focus-visible {
		color: var(--foreground);
	}

	.post-share-icon-button::after {
		position: absolute;
		bottom: calc(100% + 0.48rem);
		left: 50%;
		z-index: 3;
		max-width: min(13rem, 70vw);
		padding: 0.34rem 0.56rem;
		border: 1px solid var(--post-tooltip-border);
		border-radius: var(--radius-sm);
		background: var(--post-tooltip-background);
		box-shadow: 0 0.55rem 1.4rem color-mix(in oklch, black 32%, transparent);
		color: var(--post-tooltip-foreground);
		content: attr(data-tooltip);
		font-size: 0.82rem;
		font-weight: 520;
		line-height: 1.2;
		opacity: 0;
		pointer-events: none;
		text-align: center;
		transform: translate(-50%, 0.18rem);
		transition:
			opacity 120ms ease,
			transform 120ms ease;
		white-space: nowrap;
	}

	.post-share-icon-button:hover::after,
	.post-share-icon-button:focus-visible::after {
		opacity: 1;
		transform: translate(-50%, 0);
	}

	.post-body p {
		margin: 0;
	}

	.post-body h2 {
		scroll-margin-top: 1.5rem;
		margin: 2.75rem 0 -0.1rem;
		color: var(--foreground);
		font-size: 1.28rem;
		font-weight: 780;
		letter-spacing: 0;
		line-height: 1.25;
	}

	.post-image {
		margin: 0.25rem 0 0.75rem;
	}

	.post-image-button {
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		background: transparent;
		color: inherit;
		cursor: zoom-in;
	}

	.post-image img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid color-mix(in oklch, var(--border) 78%, transparent);
		border-radius: var(--radius-md);
		background: var(--paper-soft);
		user-select: none;
	}

	.post-image-preview-dialog {
		display: none;
		place-items: center;
		width: 100vw;
		max-width: none;
		height: 100svh;
		max-height: none;
		padding: 1rem;
		border: 0;
		margin: 0;
		background: transparent;
		cursor: zoom-out;
	}

	.post-image-preview-dialog[open] {
		display: grid;
	}

	.post-image-preview-dialog::backdrop {
		background: color-mix(in oklch, black 78%, transparent);
	}

	.post-image-preview-close {
		display: block;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: zoom-out;
	}

	.post-image-preview-dialog img {
		display: block;
		width: auto;
		max-width: calc(100vw - 4rem);
		height: auto;
		max-height: calc(100svh - 4rem);
		border: 1px solid color-mix(in oklch, var(--border) 65%, transparent);
		border-radius: var(--radius-md);
		background: var(--paper-soft);
		box-shadow: 0 1.5rem 4rem color-mix(in oklch, black 38%, transparent);
		user-select: none;
	}

	.post-table-wrap {
		overflow-x: auto;
		margin: 0.35rem 0 0.85rem;
		border: 1px solid color-mix(in oklch, var(--border) 72%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 14%, transparent);
	}

	.post-table-wrap table {
		width: 100%;
		min-width: 34rem;
		border-collapse: collapse;
		font-size: calc(0.88rem + 1pt);
		line-height: 1.38;
	}

	.post-table-wrap :is(th, td) {
		padding: 0.72rem 0.84rem;
		border-bottom: 1px solid color-mix(in oklch, var(--border) 58%, transparent);
		text-align: left;
		vertical-align: top;
	}

	.post-table-wrap th {
		color: var(--foreground);
		font-weight: 760;
	}

	.post-table-wrap td {
		color: color-mix(in oklch, var(--foreground) 88%, var(--muted-foreground));
	}

	.post-table-wrap tr:last-child td {
		border-bottom: 0;
	}

	.post-table-wrap :is(th, td):not(:first-child) {
		text-align: right;
		white-space: nowrap;
	}

	.post-adjacent {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.75rem;
		padding-top: 1rem;
		margin-top: 0.4rem;
		border-top: 1px solid color-mix(in oklch, var(--border) 62%, transparent);
		user-select: none;
	}

	.post-adjacent-link {
		display: grid;
		gap: 0.25rem;
		min-width: 0;
		padding: 0.78rem;
		border: 1px solid color-mix(in oklch, var(--border) 72%, transparent);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--paper-soft) 38%, transparent);
		color: inherit;
		line-height: 1.28;
		text-decoration: none;
	}

	.post-adjacent-link.next {
		grid-column: 2;
		text-align: right;
	}

	.post-adjacent-link:hover {
		border-color: color-mix(in oklch, var(--sidebar-ring) 62%, var(--border));
		background: color-mix(in oklch, var(--paper-soft) 54%, transparent);
	}

	.post-adjacent-link span {
		color: var(--muted-foreground);
		font-size: 0.86rem;
		font-weight: 560;
	}

	.post-adjacent-link strong {
		overflow: hidden;
		color: var(--foreground);
		font-size: 0.98rem;
		font-weight: 620;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.blog-post :is(a, button):focus-visible {
		outline: 3px solid color-mix(in oklch, var(--sidebar-ring) 70%, white);
		outline-offset: 3px;
	}

	@media (max-width: 72rem) {
		.post-reading-layout {
			grid-template-areas:
				"toc"
				"body";
			grid-template-columns: minmax(0, var(--post-body-width));
		}

		.post-sidecar {
			position: static;
			padding: 0 0 0.8rem;
			border-left: 0;
			border-bottom: 1px solid
				color-mix(in oklch, var(--border) 76%, transparent);
		}

		.post-share {
			padding-top: 0.75rem;
		}
	}

	@media (max-width: 42rem) {
		.post-adjacent {
			grid-template-columns: minmax(0, 1fr);
		}

		.post-adjacent-link.next {
			grid-column: 1;
		}
	}
</style>
