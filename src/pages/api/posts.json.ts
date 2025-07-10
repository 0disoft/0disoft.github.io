// src/pages/api/posts.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '@src/consts';

export const GET: APIRoute = async ({ url }) => {
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);
  const limit = parseInt(url.searchParams.get('limit') || SITE.POSTS_PER_PAGE.toString(), 10);

  const allPosts = await getCollection('blog');
  allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const paginatedPosts = allPosts.slice(offset, offset + limit);

  const responseData = paginatedPosts.map((post) => ({
    slug: post.slug,
    data: post.data,
  }));

  return new Response(JSON.stringify(responseData), {
    headers: { 'Content-Type': 'application/json' },
  });
};