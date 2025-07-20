// @ts-check
import { defineConfig } from 'astro/config';
import unoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';
import csp from 'vite-plugin-csp';

// https://astro.build/config
export default defineConfig({
  site: 'https://0disoft.github.io',
  base: '/',
  integrations: [
    unoCSS(), // UnoCSS 통합 활성화
    sitemap(), // Sitemap 통합 활성화
  ],
  vite: { // Vite 설정
    plugins: [
      csp({
        // Content Security Policy (CSP) 설정
        // 'unsafe-inline'은 Astro의 hydration 및 UnoCSS의 인라인 스타일 때문에 필요할 수 있습니다.
        // 보안 강화를 위해 가능한 경우 'unsafe-inline'을 제거하고 해시 또는 nonce를 사용하는 것이 권장됩니다.
        policy: {
          'default-src': ["'self'"],
          'img-src': ["'self'", 'data:'],
          'style-src': ["'self'", "'unsafe-inline'"],
          'script-src': ["'self'", "'unsafe-inline'"],
        },
      }),
    ],
  },
});