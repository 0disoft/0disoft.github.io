// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  safelist: [
    'i-lucide-copy',
    'i-lucide-check',
    'i-lucide-x',
    'text-green-500',
    'text-red-500',
    'bg-primary',
    'text-background',
    'bg-transparent',
    'text-primary',
    'border-primary',
  ],
  shortcuts: [
    {
      'btn-solid': 'py-3 px-6 bg-primary text-background font-sans font-medium rounded-lg no-underline transition-transform hover:scale-105',
      'btn-outline': 'py-3 px-6 bg-transparent text-primary border border-primary font-sans font-medium rounded-lg no-underline transition-all hover:(bg-primary text-background)',
    },
    [/^btn-(.*)$/, ([, c], { theme }) => {
      if (Object.keys(theme.colors).includes(c)) {
        return `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`;
      }
    }],
  ],
  theme: {
    font: {
      sans: ['"Space Grotesk"', 'sans-serif'],
      serif: ['"Yeseva One"', 'serif'],
      mono: ['"Kode Mono"', 'monospace'],
      display: ['"Lilita One"', 'sans-serif'],
    },
    colors: {
      primary: '#1a1a1a',
      secondary: '#666',
      accent: '#00539F',
      background: '#ffffff',
      headerBackground: '#f8f8f8',
      border: '#eee',
      elementHoverBg: '#f0f0f0',
      'dark-primary': '#f4f3ee',
      'dark-secondary': '#faedcd',
      'dark-accent': '#fee440',
      'dark-background': '#a98467',
      'dark-headerBackground': '#6c584c',
      'dark-border': '#74546A',
      'dark-elementHoverBg': 'rgba(0, 0, 0, 0.3)',
    },
  },
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Space Grotesk:300..700',
        serif: 'Yeseva One',
        mono: 'Kode Mono:400..700',
        display: 'Lilita One',
      },
      // 'display' 속성은 WebFontsOptions 형식에서 지원되지 않으므로 제거합니다.
      // subsets 및 preferStatic 옵션은 필요에 따라 추가할 수 있습니다.
      // subsets: ['latin'],
      // preferStatic: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});