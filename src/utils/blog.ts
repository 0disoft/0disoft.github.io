import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export async function getSortedBlogPosts(): Promise<CollectionEntry<"blog">[]> {
  const allPosts = await getCollection("blog");
  allPosts.sort((a, b) => {
    if (a.data.pubDate.valueOf() !== b.data.pubDate.valueOf()) {
      return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    }
    return a.slug.localeCompare(b.slug);
  });
  return allPosts;
}
