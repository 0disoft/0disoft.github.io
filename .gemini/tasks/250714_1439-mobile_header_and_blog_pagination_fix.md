# 250714_1000: 모바일 헤더 레이아웃 개선 및 블로그 페이지네이션 버그 수정

## 작업 내용

- **모바일 헤더 레이아웃 개선**:
  - 햄버거 메뉴 버튼의 위치를 우측 상단으로 조정하고, 메뉴가 열렸을 때도 위치가 고정되도록 수정했습니다.
  - 메뉴가 닫혀 있을 때 헤더의 높이를 최소화하여 배경이 보이지 않도록 처리했습니다.
  - 메뉴가 열렸을 때 내용이 화면의 세로 중앙에 오도록 레이아웃을 개선했습니다.
- **블로그 페이지네이션 버그 수정**:
  - 페이지네이션 UI를 별도의 `Pagination.astro` 컴포넌트로 분리하여 코드 중복을 제거하고 일관성을 확보했습니다.
  - 블로그 첫 페이지(`index.astro`)에서도 페이지네이션이 정상적으로 표시되도록 수정했습니다.
- **기타 리팩토링**:
  - `theme-controller.ts`, `code-copy.ts`, `mobile-menu.ts` 스크립트 파일을 리팩토링하여 가독성과 유지보수성을 높였습니다.

## 주요 변경 파일

- `src/components/Header.astro`
- `src/components/Pagination.astro` (신규)
- `src/pages/blog/index.astro`
- `src/pages/blog/[page].astro`
- `src/scripts/mobile-menu.ts`
- `src/scripts/code-copy.ts`
- `src/scripts/theme-controller.ts`
