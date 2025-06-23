// src/content.config.ts
import { defineCollection, z } from "astro:content";

// 'blog' 컬렉션을 정의합니다.
const blogCollection = defineCollection({
  // Zod를 사용하여 스키마를 정의합니다.
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default("ZeroDi"), // 기본값 설정
    pubDate: z.date(),
    updatedDate: z.date().optional(), // 선택적 필드
    heroImage: z.string().optional(),
    tags: z.array(z.string()), // 태그들을 위한 문자열 배열
  }),
});

// 'collections' 객체를 내보내 Astro에 컬렉션을 등록합니다. 
export const collections = {
  blog: blogCollection,
};