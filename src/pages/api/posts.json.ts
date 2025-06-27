// src/pages/api/posts.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  // 모든 게시물을 가져와 최신순으로 정렬합니다.
  const allPosts = await getCollection('blog');
  allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  // 클라이언트에 필요한 최소한의 데이터만 가공하여 전달합니다.
  const responseData = allPosts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate.toISOString(),
  }));

  // 페이지네이션 없이 전체 데이터를 하나의 배열로 반환합니다.
  return new Response(JSON.stringify(responseData), {
    headers: { 'Content-Type': 'application/json' },
  });
};