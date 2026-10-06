<script lang="ts">
	import { browser } from "$app/environment";
	import type { PageData } from "./$types";
	import SiteSurface from "$lib/site-surface.svelte";
	import IndiehackersPostSurface from "$lib/indiehackers-post-surface.svelte";
	import { page } from "$app/state";
	import { getStoryCollectionContext } from "$lib/story-collections";

	let { data }: { data: PageData } = $props();
	const collection = $derived(browser ? getStoryCollectionContext(page.url.searchParams.get("collection"), data.post.slug) : null);
</script>

<SiteSurface activePath={collection ? `/${collection}` : "/indiehackers"}>
	<IndiehackersPostSurface data={data} {collection} />
</SiteSurface>
