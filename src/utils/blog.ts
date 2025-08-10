// src/utils/blog.ts
//
// @file 블로그 유틸리티 함수
// @description Astro 콘텐츠 컬렉션에서 블로그 포스트를 가져와 정렬하는 함수를 제공합니다.
// @version 1.0.0

// Astro 콘텐츠 컬렉션 API와 타입을 가져옵니다.
import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

/**
 * @function getSortedBlogPosts
 * @description 모든 블로그 포스트를 가져와 정렬된 배열로 반환합니다.
 * 정렬 우선순위는 다음과 같습니다.
 * 1. 발행 날짜(pubDate)를 기준으로 최신순(내림차순)으로 정렬합니다.
 * 2. 발행 날짜가 동일할 경우, 포스트의 슬러그(slug)를 기준으로 알파벳순(오름차순)으로 정렬합니다.
 * @returns {Promise<CollectionEntry<"blog">[]>} 정렬된 블로그 포스트 객체들의 배열.
 */
export async function getSortedBlogPosts(): Promise<CollectionEntry<"blog">[]> {
  // 'blog' 콘텐츠 컬렉션에 있는 모든 포스트를 가져옵니다.
  const allPosts = await getCollection("blog");

  // Array.prototype.sort() 메서드를 사용하여 정렬 로직을 구현합니다.
  allPosts.sort((a, b) => {
    // 1. 발행 날짜를 기준으로 내림차순 정렬
    // `valueOf()`는 Date 객체를 밀리초 단위의 숫자로 변환하여 비교를 용이하게 합니다.
    const dateComparison = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

    // 날짜가 다르면 날짜 비교 결과를 반환하고,
    // 같으면 다음 정렬 조건으로 넘어갑니다.
    if (dateComparison !== 0) {
      return dateComparison;
    }

    // 2. 발행 날짜가 같으면 슬러그를 기준으로 오름차순 정렬
    // `localeCompare()`를 사용하여 문자열을 사전순으로 비교합니다.
    return a.slug.localeCompare(b.slug);
  });

  return allPosts;
}