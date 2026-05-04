<script lang="ts">
	import type { Component } from "svelte";

	type IconButtonProps = {
		icon: Component;
		label: string;
		title?: string;
		controlId?: string;
		settingsKeyboardTarget?: boolean;
		onclick?: (event: MouseEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
	};

	let {
		icon: Icon,
		label,
		title,
		controlId,
		settingsKeyboardTarget = false,
		onclick,
		onkeydown,
	}: IconButtonProps = $props();
</script>

<button
	class="icon-button"
	type="button"
	aria-label={label}
	title={title ?? label}
	data-settings-control={controlId}
	data-settings-keyboard-target={settingsKeyboardTarget ? "" : undefined}
	onclick={onclick}
	onkeydown={onkeydown}
>
	<Icon size={18} strokeWidth={2.15} aria-hidden="true" />
</button>

<style>
	.icon-button {
		display: inline-grid;
		width: 2.25rem;
		aspect-ratio: 1;
		place-items: center;
		border: 1px solid var(--mode-control-border);
		border-radius: var(--radius-md);
		background: var(--mode-control-background);
		color: var(--mode-control-foreground);
		cursor: pointer;
		user-select: none;
	}

	.icon-button:hover {
		background: var(--mode-control-hover-background);
	}

	.icon-button:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--sidebar-ring) 70%, white);
		outline-offset: 3px;
	}
</style>
