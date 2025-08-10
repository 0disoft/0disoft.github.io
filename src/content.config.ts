// src/content.config.ts
//
// @file Astro 콘텐츠 컬렉션 설정 파일
// @description Astro 콘텐츠 컬렉션 API를 사용하여 블로그 게시물과 프로젝트에 대한
//              데이터 스키마를 정의합니다. 이는 콘텐츠의 유효성을 보장하고
//              데이터 모델을 명확히 하는 데 사용됩니다.
// @version 1.0.0

// Astro 콘텐츠 API와 Zod 유효성 검사 라이브러리를 가져옵니다.
import { defineCollection, z, type SchemaContext } from "astro:content";

/**
 * @namespace blogCollection
 * @description 블로그 게시물 콘텐츠 컬렉션을 정의하는 객체.
 * 각 블로그 게시물은 다음 Zod 스키마를 따릅니다.
 */
const blogCollection = defineCollection({
  schema: ({ }: SchemaContext) => z.object({
    title: z.string(),
    // description 필드는 최소 1자, 최대 300자의 문자열이어야 합니다.
    description: z.string().min(1, { message: "Description cannot be empty." }).max(300, { message: "Description cannot exceed 300 characters." }),
    author: z.string().default("ZeroDi"), // 기본값 "ZeroDi"를 설정합니다.
    pubDate: z.date(), // 발행일은 Date 객체여야 합니다.
    updatedDate: z.date().optional(), // 업데이트 날짜는 선택 사항입니다.
    heroImage: z.string().optional(), // 대표 이미지는 선택 사항이며, 문자열 형식이어야 합니다.
    heroImageAlt: z.string().optional(), // 이미지 대체 텍스트도 선택 사항입니다.
    tags: z.array(z.string()), // 태그는 문자열 배열이어야 합니다.
  }),
});

/**
 * @namespace projectCollection
 * @description 프로젝트 콘텐츠 컬렉션을 정의하는 객체.
 * 각 프로젝트는 다음 Zod 스키마를 따릅니다.
 */
const projectCollection = defineCollection({
  type: 'content', // 컬렉션 타입이 콘텐츠 파일(마크다운, MDX 등)임을 명시합니다.
  schema: ({ }: SchemaContext) => z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(), // 대표 이미지는 선택 사항입니다.
    techStack: z.array(z.string()), // 기술 스택은 문자열 배열이어야 합니다.
    githubUrl: z.string().url().optional(), // GitHub URL은 유효한 URL이어야 하며 선택 사항입니다.
    liveUrl: z.string().url().optional(), // 라이브 데모 URL도 유효한 URL이어야 하며 선택 사항입니다.
  }),
});

/**
 * @constant {object} collections
 * @description Astro에 등록할 모든 콘텐츠 컬렉션을 내보내는 객체.
 * Astro는 이 객체를 사용하여 콘텐츠 파일을 처리하고 유효성을 검사합니다.
 */
export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};