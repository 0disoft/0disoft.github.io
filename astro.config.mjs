// @ts-check
import { defineConfig } from 'astro/config';
import unoCSS from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://0disoft.github.io',
  base: '/',
  integrations: [
    unoCSS(), // UnoCSS 통합을 추가합니다.
  ]
});
