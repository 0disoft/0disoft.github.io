<script lang="ts">
	import type { PageData } from "./$types";
	import SiteSurface from "$lib/site-surface.svelte";
	import IndiehackersPostSurface from "$lib/indiehackers-post-surface.svelte";

	let { data }: { data: PageData } = $props();
</script>

<SiteSurface activePath="/indiehackers">
	<IndiehackersPostSurface data={data} />
</SiteSurface>
