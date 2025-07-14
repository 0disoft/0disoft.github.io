import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

/**
 * 모든 블로그 게시물을 가져와 발행 날짜(최신순)와 슬러그(알파벳순)를 기준으로 정렬합니다.
 * @returns {Promise<CollectionEntry<"blog">[]>} 정렬된 블로그 게시물 배열
 */
export async function getSortedBlogPosts(): Promise<CollectionEntry<"blog">[]> {
  const allPosts = await getCollection("blog");

  allPosts.sort((a, b) => {
    // 발행 날짜를 기준으로 내림차순 정렬 (최신 게시물이 먼저 오도록)
    const dateComparison = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    if (dateComparison !== 0) {
      return dateComparison;
    }
    // 발행 날짜가 같으면 슬러그를 기준으로 오름차순 정렬
    return a.slug.localeCompare(b.slug);
  });

  return allPosts;
}