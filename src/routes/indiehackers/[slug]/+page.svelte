<script lang="ts">
	import type { PageData } from "./$types";
	import SiteSurface from "$lib/site-surface.svelte";
	import IndiehackersPostSurface from "$lib/indiehackers-post-surface.svelte";

	let { data }: { data: PageData } = $props();
	const collection = $derived(data.collection);
</script>

<SiteSurface activePath={collection ? `/${collection}` : "/indiehackers"}>
	<IndiehackersPostSurface data={data} {collection} />
</SiteSurface>
