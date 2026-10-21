<script lang="ts">
	import { getArticleCoverSources } from "$lib/article-cover-sources";
	let { src, sizes, loading = "lazy" }: { src: string; sizes: string; loading?: "eager" | "lazy" } = $props();
	const sources = $derived(getArticleCoverSources(src));
</script>

<img src={sources.src} srcset={sources.srcset} {sizes} {loading} alt="" width="1440" height="810" decoding="async" />
