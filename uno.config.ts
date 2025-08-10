// uno.config.ts
//
// @file UnoCSS 설정 파일
// @description UnoCSS의 전역 설정을 정의하는 파일입니다.
//              안전 목록(safelist), 단축키(shortcuts), 테마(colors, fonts),
//              프리셋(presets) 및 변환기(transformers)를 구성합니다.
// @version 1.0.0

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import presetWind3 from '@unocss/preset-wind3';

export default defineConfig({
  /**
   * @property {string[]} safelist
   * @description UnoCSS가 동적으로 생성되거나 코드에서 직접 감지하기 어려운
   * 유틸리티 클래스를 강제로 생성하도록 지정하는 배열입니다.
   * 주로 JavaScript로 동적으로 변경되는 클래스(예: 아이콘, 텍스트 색상)를 포함합니다.
   */
  safelist: [
    // 코드 복사 스크립트에서 동적으로 사용되는 아이콘 클래스들
    'i-lucide-copy',
    'i-lucide-check',
    'i-lucide-x',
    'text-green-500', // 성공 아이콘 색상
    'text-red-500',   // 에러 아이콘 색상
  ],
  /**
   * @property {Array<Object>} shortcuts
   * @description 여러 개의 유틸리티 클래스를 하나의 단축키로 묶어 코드의 가독성을 높입니다.
   */
  shortcuts: [
    {
      // 'btn-solid' 단축키: 채워진(solid) 버튼 스타일을 정의합니다.
      'btn-solid': 'py-3 px-6 bg-primary text-background font-sans font-medium rounded-lg no-underline transition-transform hover:scale-105',
      // 'btn-outline' 단축키: 외곽선만 있는(outline) 버튼 스타일을 정의합니다.
      'btn-outline': 'py-3 px-6 bg-transparent text-primary border border-primary font-sans font-medium rounded-lg no-underline transition-all hover:(bg-primary text-background)',
    }
  ],
  /**
   * @property {Object} theme
   * @description UnoCSS에서 사용할 커스텀 테마를 정의합니다.
   * 색상 팔레트와 폰트 패밀리를 커스터마이징합니다.
   */
  theme: {
    /**
     * @property {Object} fontFamily
     * @description 프로젝트에 사용할 커스텀 폰트 패밀리를 정의합니다.
     */
    fontFamily: {
      sans: ['"Space Grotesk"', 'sans-serif'],
      serif: ['"Yeseva One"', 'serif'],
      mono: ['"Kode Mono"', 'monospace'],
      display: ['"Lilita One"', 'sans-serif'],
    },
    /**
     * @property {Object} colors
     * @description 라이트 모드와 다크 모드에 대한 커스텀 색상 팔레트를 정의합니다.
     * 다크 모드 색상은 'dark-' 접두사를 사용하여 구분합니다.
     */
    colors: {
      // 라이트 모드 색상 팔레트
      primary: '#1a1a1a',
      secondary: '#666',
      accent: '#0077b6',
      background: '#ffffff',
      headerBackground: '#f8f8f8',
      border: '#eee',
      elementHoverBg: '#f0f0f0',

      // 다크 모드 색상 팔레트 (dark- 접두사 사용)
      'dark-primary': '#f4f3ee',
      'dark-secondary': '#faedcd',
      'dark-accent': '#ffe6a7',
      'dark-background': '#a98467',
      'dark-headerBackground': '#6c584c',
      'dark-border': '#74546A',
      'dark-elementHoverBg': 'rgba(0, 0, 0, 0.3)',
    },
  },
  /**
   * @property {Array<Function>} presets
   * @description UnoCSS에 통합하여 사용할 프리셋 목록입니다.
   * 각 프리셋은 특정 기능을 제공합니다.
   */
  presets: [
    presetWind3(),           // Tailwind CSS v3의 기능을 제공하는 프리셋
    presetAttributify(),     // HTML 속성 기반의 UnoCSS 문법을 활성화하는 프리셋
    presetIcons({            // 아이콘을 유틸리티 클래스로 사용할 수 있도록 하는 프리셋
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),      // 마크다운 콘텐츠에 대한 타이포그래피 스타일을 제공하는 프리셋
    presetWebFonts({         // Google Fonts를 자동으로 가져와 사용하는 프리셋
      provider: 'google',
      fonts: {
        sans: 'Space Grotesk:300..700',
        serif: 'Yeseva One',
        mono: 'Kode Mono:400..700',
        display: 'Lilita One',
      },
    }),
  ],
  /**
   * @property {Array<Function>} transformers
   * @description UnoCSS 클래스의 변환을 처리하는 변환기 목록입니다.
   */
  transformers: [
    transformerDirectives(),     // `@apply`와 같은 지시문을 활성화하는 변환기
    transformerVariantGroup(),   // `hover:(text-red-500 bg-blue-200)`와 같은 변형 그룹 문법을 활성화하는 변환기
  ],
});