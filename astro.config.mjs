// @ts-check
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import unoCSS from 'unocss/astro';
import csp from 'vite-plugin-csp';

// https://astro.build/config
export default defineConfig({
  site: 'https://0disoft.github.io',
  base: '/',
  integrations: [
    unoCSS(), // UnoCSS 통합 활성화
    sitemap(), // Sitemap 통합 활성화
    partytown({
      config: {
        // Google Analytics 스크립트를 Partytown으로 전달
        forward: ['dataLayer.push'],
      },
    }),
  ],
  // // Google Fonts preconnect
  // head: {
  //   links: [
  //     {
  //       rel: 'preconnect',
  //       href: 'https://fonts.googleapis.com',
  //     },
  //     {
  //       rel: 'preconnect',
  //       href: 'https://fonts.gstatic.com',
  //       crossorigin: '',
  //     },
  //   ],
  // },
  build: {
    // 'inlineStyles'를 'inlineStylesheets'로 변경하고 값을 'always'로 설정
    inlineStylesheets: 'always',
  },
  vite: { // Vite 설정
    plugins: [
      csp({
        // Content Security Policy (CSP) 설정
        // 'unsafe-inline'은 Astro의 hydration 및 UnoCSS의 인라인 스타일 때문에 필요할 수 있습니다.
        // 보안 강화를 위해 가능한 경우 'unsafe-inline'을 제거하고 해시 또는 nonce를 사용하는 것이 권장됩니다.
        // policy 값에서 내부 작은따옴표 제거
        policy: {
          'default-src': ['self'],
          'img-src': ['self', 'data:'],
          'style-src': ['self', 'unsafe-inline'],
          'script-src': ['self', 'unsafe-inline'],
        },
      }),
    ],
  },
});