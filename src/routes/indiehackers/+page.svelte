<script lang="ts">
	import type { PageData } from "./$types";
	import SiteSurface from "$lib/site-surface.svelte";
	import IndiehackersList from "$lib/indiehackers-list.svelte";

	let { data }: { data: PageData } = $props();
</script>

<SiteSurface activePath="/indiehackers">
	<IndiehackersList />
</SiteSurface>
