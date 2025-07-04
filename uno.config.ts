// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

// ↓↓↓ 이 라인을 추가합니다.
import presetWind3 from '@unocss/preset-wind3';


export default defineConfig({
  // ... shortcuts, theme 설정은 동일 ...
  shortcuts: [
  ],
  theme: {
    colors: {
    }
  },

  presets: [
    presetWind3(), // <<< presetWind()를 presetWind3()로 최종 수정합니다.
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});