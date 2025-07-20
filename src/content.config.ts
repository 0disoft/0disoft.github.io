// src/content.config.ts
import { defineCollection, z, type SchemaContext } from "astro:content";

/**
 * 블로그 게시물 컬렉션을 정의합니다.
 * 각 블로그 게시물은 다음 스키마를 따릅니다.
 */
const blogCollection = defineCollection({
  schema: ({}: SchemaContext) => z.object({
    title: z.string(),
    description: z.string().min(1, { message: "Description cannot be empty." }).max(300, { message: "Description cannot exceed 300 characters." }),
    author: z.string().default("ZeroDi"),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(), // 이미지 유효성 검사 강화
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

/**
 * 프로젝트 컬렉션을 정의합니다.
 * 각 프로젝트는 다음 스키마를 따릅니다.
 */
const projectCollection = defineCollection({
  type: 'content',
  schema: ({}: SchemaContext) => z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(), // 이미지 유효성 검사 강화
    techStack: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
  }),
});

/**
 * Astro에 등록할 모든 콘텐츠 컬렉션을 내보냅니다.
 */
export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};