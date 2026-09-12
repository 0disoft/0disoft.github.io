<script lang="ts">
	import type { PageData } from "./$types";
	import BlogPostSurface from "$lib/blog-post-surface.svelte";
	import SiteSurface from "$lib/site-surface.svelte";

	let { data }: { data: PageData } = $props();
</script>

<SiteSurface activePath="/blog">
	<BlogPostSurface
		post={data.post}
		adjacentPosts={data.adjacentPosts}
		highlightedCodeByLocale={data.highlightedCodeByLocale}
	/>
</SiteSurface>
