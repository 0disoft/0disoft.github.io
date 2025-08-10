// @ts-check
//
// @file Astro 설정 파일
// @description Astro 프로젝트의 전역 설정을 정의하는 파일입니다.
//              사이트 기본 정보, 통합(Integrations), 빌드, Vite 플러그인 등을 설정합니다.
// @version 1.0.0

import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import unoCSS from 'unocss/astro';
import csp from 'vite-plugin-csp';

// Astro 프로젝트 설정을 정의하고 내보냅니다.
// https://astro.build/config 링크는 공식 문서를 참조하라는 의미입니다.
export default defineConfig({
  // 사이트의 기본 URL을 정의합니다. sitemap 통합에서 사용됩니다.
  site: 'https://0disoft.github.io',
  // 모든 경로의 기준이 되는 디렉터리를 정의합니다.
  base: '/',
  // Astro에 통합될 기능들을 배열로 정의합니다.
  integrations: [
    unoCSS(), // UnoCSS를 Astro와 통합하여 유틸리티 기반 CSS를 사용합니다.
    sitemap(), // 사이트의 모든 페이지에 대한 sitemap을 자동으로 생성합니다.
    partytown({ // Partytown을 통합하여 서드파티 스크립트를 웹 워커에서 실행합니다.
      config: {
        // 'dataLayer.push' 함수를 메인 스레드에서 실행되도록 Partytown에 설정합니다.
        // 이는 Google Analytics 스크립트가 데이터 레이어를 통해 이벤트를 전송할 수 있도록 합니다.
        forward: ['dataLayer.push'],
      },
    }),
  ],
  // 빌드 관련 설정을 정의합니다.
  build: {
    // 모든 CSS 스타일시트를 HTML 파일에 인라인으로 삽입하도록 설정합니다.
    // 이는 외부 CSS 파일에 대한 추가적인 HTTP 요청을 제거하여 페이지 로딩 성능을 개선합니다.
    inlineStylesheets: 'always',
  },
  // Vite 관련 설정을 정의합니다.
  vite: {
    plugins: [
      csp({ // Content Security Policy (CSP)를 적용하는 Vite 플러그인.
        // @why: XSS(Cross-Site Scripting) 공격과 같은 특정 유형의 공격을 방어하여 웹사이트 보안을 강화합니다.
        policy: {
          // 'default-src': 외부 리소스 로드에 대한 기본 정책을 'self' (동일 출처)로 제한합니다.
          'default-src': ['self'],
          // 'img-src': 이미지 로드를 'self'와 'data:' URI로 제한합니다.
          'img-src': ['self', 'data:'],
          // 'style-src': 스타일시트 로드를 'self'와 'unsafe-inline' (인라인 스타일)로 제한합니다.
          // @why: UnoCSS와 같은 인라인 스타일을 사용하는 통합 기능에 필요합니다.
          'style-src': ['self', 'unsafe-inline'],
          // 'script-src': 스크립트 로드를 'self'와 'unsafe-inline'으로 제한합니다.
          // @why: Astro의 hydration이나 인라인 스크립트(예: 테마 컨트롤러)에 필요합니다.
          // @fixme: 보안 강화를 위해 'unsafe-inline' 대신 해시 또는 nonce를 사용하는 것이 좋습니다.
          'script-src': ['self', 'unsafe-inline'],
        },
      }),
    ],
  },
});