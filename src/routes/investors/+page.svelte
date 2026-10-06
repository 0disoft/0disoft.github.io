<script lang="ts">
	import SiteSurface from "$lib/site-surface.svelte";
	import IndiehackersList from "$lib/indiehackers-list.svelte";
</script>

<SiteSurface activePath="/investors">
	<IndiehackersList collection="investors" />
</SiteSurface>
