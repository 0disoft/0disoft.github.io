# Responsive Header and Mobile Menu Implementation

## 1. 작업 개요

모바일 및 데스크톱 환경에서 웹사이트 헤더의 반응형 디자인을 구현하고, 햄버거 메뉴를 통한 모바일 내비게이션 토글 기능을 추가했습니다. 테마 및 폰트 사이즈 변경 버튼의 가시성과 위치를 각 화면 크기에 맞게 조정했습니다.

## 2. 변경된 파일 목록

- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/styles/global.css`
- `src/scripts/mobile-menu.ts`

## 3. 특이사항 및 참고

- 초기에는 UnoCSS 클래스만으로 반응형을 시도했으나, `display: none`과 `display: flex` 간의 충돌 및 복잡한 토글 로직으로 인해 JavaScript를 통한 `display` 속성 직접 제어 방식으로 변경했습니다.
- 테마 및 폰트 사이즈 변경 버튼의 위치를 `nav` 태그 내부와 외부로 여러 번 이동하며 데스크톱과 모바일 양쪽에서 원하는 동작을 구현하기 위해 시도했습니다. 최종적으로는 `nav` 태그 외부에 배치하고 JavaScript로 가시성을 제어하는 방식으로 해결했습니다.
- `mobile-menu.ts`에서 `window.innerWidth`를 사용하여 `lg` 브레이크포인트(1024px)를 기준으로 메뉴 및 유틸리티 버튼의 초기 가시성을 설정하고, `resize` 이벤트 리스너를 추가하여 화면 크기 변경 시에도 올바르게 동작하도록 했습니다.
