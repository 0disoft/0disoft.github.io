// src/pages/api/posts.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('blog');
  allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const responseData = allPosts.map((post) => ({
    id: post.id, // slug 대신 id를 사용합니다.
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate.toISOString(),
  }));

  return new Response(JSON.stringify(responseData), {
    headers: { 'Content-Type': 'application/json' },
  });
};