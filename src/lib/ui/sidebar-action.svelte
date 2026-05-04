<script lang="ts">
	import type { Component } from "svelte";

	type SidebarActionProps = {
		icon: Component;
		label: string;
		href?: string;
		current?: boolean;
		shortcut?: string;
		title?: string;
		ariaLabel?: string;
		rel?: string;
		target?: string;
		tone?: "default" | "sponsor";
		onclick?: (event: MouseEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
	};

	let {
		icon: Icon,
		label,
		href,
		current = false,
		shortcut,
		title,
		ariaLabel,
		rel,
		target,
		tone = "default",
		onclick,
		onkeydown,
	}: SidebarActionProps = $props();
</script>

{#snippet content()}
	<span class="action-icon" aria-hidden="true">
		<Icon size={18} strokeWidth={2.15} />
	</span>
	<span>{label}</span>
{/snippet}

{#if href}
	<a
		class="sidebar-action"
		class:active={current}
		class:sponsor={tone === "sponsor"}
		{href}
		aria-label={ariaLabel}
		aria-current={current ? "page" : undefined}
		aria-keyshortcuts={shortcut}
		title={title ?? label}
		rel={rel}
		target={target}
		data-sidebar-keyboard-target
		onclick={onclick}
		onkeydown={onkeydown}
	>
		{@render content()}
	</a>
{:else}
	<button
		class="sidebar-action"
		class:sponsor={tone === "sponsor"}
		type="button"
		aria-label={ariaLabel}
		aria-keyshortcuts={shortcut}
		title={title ?? label}
		data-sidebar-keyboard-target
		onclick={onclick}
		onkeydown={onkeydown}
	>
		{@render content()}
	</button>
{/if}

<style>
	.sidebar-action {
		display: flex;
		width: 100%;
		min-height: 2.65rem;
		align-items: center;
		gap: 0.65rem;
		padding: 0 0.75rem;
		border: 0;
		border-radius: var(--radius-md);
		background: transparent;
		color: inherit;
		cursor: pointer;
		font: inherit;
		font-weight: 560;
		text-align: left;
		text-decoration: none;
		transition:
			background-color 160ms ease,
			color 160ms ease,
			transform 160ms ease;
		user-select: none;
	}

	.sidebar-action:hover {
		background: color-mix(in oklch, var(--sidebar-accent) 72%, transparent);
		color: var(--sidebar-accent-foreground);
		transform: translateX(1px);
	}

	.sidebar-action.active {
		background: var(--sidebar-primary);
		color: var(--sidebar-primary-foreground);
	}

	.action-icon {
		display: inline-grid;
		place-items: center;
	}

	.sidebar-action.sponsor .action-icon {
		color: oklch(0.58 0.22 24);
	}

	.sidebar-action.sponsor .action-icon :global(svg) {
		fill: currentcolor;
	}

	.sidebar-action:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--sidebar-ring) 70%, white);
		outline-offset: 3px;
	}
</style>
