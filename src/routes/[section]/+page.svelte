<script lang="ts">
	import type { PageData } from "./$types";
	import SiteSurface from "$lib/site-surface.svelte";

	let { data }: { data: PageData } = $props();
</script>

<SiteSurface activePath={data.activePath} />
