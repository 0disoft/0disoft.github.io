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
    {
      'btn-solid': 'py-3 px-6 bg-primary text-background font-sans font-medium rounded-lg no-underline transition-transform hover:scale-105',
      'btn-outline': 'py-3 px-6 bg-transparent text-primary border border-primary font-sans font-medium rounded-lg no-underline transition-all hover:(bg-primary text-background)',
    }
  ],
  theme: {
    // 폰트 변수를 theme으로 이동
    fontFamily: {
      sans: ['"Space Grotesk"', 'sans-serif'],
      serif: ['"Yeseva One"', 'serif'],
      mono: ['"Kode Mono"', 'monospace'],
      display: ['"Lilita One"', 'sans-serif'],
    },
    // 색상 변수를 theme으로 이동
    colors: {
      // 라이트 모드 색상
      primary: '#1a1a1a',
      secondary: '#666',
      accent: 'royalblue',
      background: '#ffffff',
      headerBackground: '#f8f8f8',
      border: '#eee',
      elementHoverBg: '#f0f0f0',
      // 다크 모드 색상을 css 변수로 정의
      dark: {
        primary: '#f4f3ee',
        secondary: '#faedcd',
        accent: '#fee440',
        background: '#a98467',
        headerBackground: '#6c584c',
        border: '#74546A',
        elementHoverBg: 'rgba(128, 128, 128, 0.1)',
      },
    },
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