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
    heroImageAlt: z.string().optional(), // heroImage의 alt 텍스트 필드 추가
    tags: z.array(z.string()), // 태그들을 위한 문자열 배열
  }),
});

// 'projects' 컬렉션을 새로 정의합니다.
const projectCollection = defineCollection({
  type: 'content', // 또는 'content' for Markdown body
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(), // z.string()을 image()로 변경합니다.
    techStack: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
  }),
});

// 'collections' 객체를 내보내 Astro에 컬렉션을 등록합니다. 
export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};