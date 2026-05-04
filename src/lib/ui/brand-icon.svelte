<script lang="ts">
	import type { SimpleIcon } from "simple-icons";

	let { icon, size = 18 }: { icon: SimpleIcon; size?: number } = $props();
</script>

<svg
	class="brand-icon"
	viewBox="0 0 24 24"
	width={size}
	height={size}
	aria-hidden="true"
	focusable="false"
>
	<path d={icon.path} />
</svg>

<style>
	.brand-icon {
		display: block;
		flex: 0 0 auto;
	}

	.brand-icon path {
		fill: currentColor;
	}
</style>
