<script lang="ts">
	import type { PageData } from "./$types";
	import BlogPostSurface from "$lib/blog-post-surface.svelte";
	import SiteSurface from "$lib/site-surface.svelte";

	let { data }: { data: PageData } = $props();
</script>

<SiteSurface activePath="/blog">
	<BlogPostSurface
		slug={data.slug}
		highlightedCodeByLocale={data.highlightedCodeByLocale}
	/>
</SiteSurface>
