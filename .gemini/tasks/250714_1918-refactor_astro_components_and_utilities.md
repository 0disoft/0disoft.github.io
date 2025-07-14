# 250714_1030-refactor_astro_components_and_utilities

## 1. 작업 개요

프로젝트의 다양한 Astro 컴포넌트 및 유틸리티 파일을 리팩토링하여 코드 가독성, 유지보수성, 그리고 일관성을 향상시켰습니다. 불필요한 주석을 제거하고, JSDoc을 추가하며, 코드 로직을 최적화했습니다.

## 2. 변경된 파일 목록

- `src/components/BlogPostPreview.astro`
- `src/components/Header.astro`
- `src/components/Pagination.astro`
- `src/components/ProjectCard.astro`
- `src/layouts/BaseLayout.astro`
- `src/pages/about.astro`
- `src/pages/blog/[page].astro`
- `src/pages/blog/[slug].astro`
- `src/pages/blog/index.astro`
- `src/pages/contact.astro`
- `src/pages/index.astro`
- `src/pages/projects.astro`
- `src/consts.ts`
- `src/content.config.ts`
- `src/scripts/code-copy.ts`
- `src/scripts/mobile-menu.ts`
- `src/scripts/theme-controller.ts`
- `src/styles/global.css`
- `src/utils/blog.ts`
- `src/utils/date.ts`
- `astro.config.mjs`
- `tsconfig.json`
- `uno.config.ts`

## 3. 특이사항 및 참고

- `src/content.config.ts` 파일에서 `z.image()` 관련 오류가 발생하여 `SchemaContext`를 활용하는 방식으로 수정했습니다.
- `node_modules` 폴더를 삭제하고 `bun install`을 통해 의존성을 재설치하여 `TypeError`를 해결했습니다.
- 모바일 헤더의 햄버거 버튼 위치 및 메뉴 레이아웃 관련 여러 차례의 수정이 있었습니다.
