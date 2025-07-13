// @ts-check
import { defineConfig } from 'astro/config';
import unoCSS from 'unocss/astro';
import csp from 'vite-plugin-csp';

// https://astro.build/config
export default defineConfig({
  site: 'https://0disoft.github.io',
  base: '/',
  integrations: [
    unoCSS(), // UnoCSS 통합을 추가합니다。
  ],
  vite: { // Vite 설정 추가
    plugins: [
      csp({
        // CSP 정책 설정
        // 'unsafe-inline'은 Astro의 hydration 및 UnoCSS 인라인 스타일 때문에 필요할 수 있습니다.
        // 가능한 한 'unsafe-inline'을 제거하고 해시 또는 nonce를 사용하는 것이 더 안전합니다.
        // 하지만 현재 프로젝트 구조에서는 'unsafe-inline'이 필요할 가능성이 높습니다.
        policy: {
          'default-src': ["'self'"], // 여기서 수정!
          'img-src': ["'self'", 'data:'], // 여기서 수정!
          'style-src': ["'self'", "'unsafe-inline'"], // 여기서 수정!
          'script-src': ["'self'", "'unsafe-inline'"], // 여기서 수정!
        },
      }),
    ],
  },
});
