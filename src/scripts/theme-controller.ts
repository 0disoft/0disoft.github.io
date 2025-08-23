// src/scripts/theme-controller.ts

const THEME_KEY = 'theme';
const FONT_LEVEL_KEY = 'font-size-level';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const FONT_LEVELS = 9;
const DEFAULT_FONT_LEVEL = Math.ceil((FONT_LEVELS + 1) / 2);

function getCurrentTheme(): 'light' | 'dark' {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === THEME_DARK || savedTheme === THEME_LIGHT) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
}

function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.classList.toggle(THEME_DARK, theme === THEME_DARK);
  localStorage.setItem(THEME_KEY, theme);
}

function setupThemeToggle(): void {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.classList.contains(THEME_DARK) ? THEME_LIGHT : THEME_DARK;
    applyTheme(newTheme);
  });
}

function getCurrentFontLevel(): number {
  const savedLevelStr = localStorage.getItem(FONT_LEVEL_KEY);
  return savedLevelStr ? parseInt(savedLevelStr, 10) : DEFAULT_FONT_LEVEL;
}

function applyFontSize(level: number): void {
  document.documentElement.style.setProperty('--font-size-multiplier', `calc(0.8 + 0.05 * ${level})`);
  localStorage.setItem(FONT_LEVEL_KEY, String(level));
}

function setupFontSizeToggle(): void {
  const fontSizeToggle = document.getElementById('font-size-toggle');
  if (!fontSizeToggle) return;

  fontSizeToggle.addEventListener('click', () => {
    let currentLevel = getCurrentFontLevel();
    currentLevel = (currentLevel % FONT_LEVELS) + 1;
    applyFontSize(currentLevel);
  });
}

/**
 * 초기화 함수 - 저장된 테마와 폰트 크기를 적용하고 버튼 이벤트를 설정
 */
function initializeUIControllers(): void {
  // 저장된 테마 적용 (새로 추가!)
  const currentTheme = getCurrentTheme();
  applyTheme(currentTheme);

  // 저장된 폰트 크기 적용 (새로 추가!)
  const currentFontLevel = getCurrentFontLevel();
  applyFontSize(currentFontLevel);

  // 버튼 이벤트 리스너 설정
  setupThemeToggle();
  setupFontSizeToggle();
}

// astro:page-load 이벤트는 초기 로드와 SPA 라우팅 시 모두 발생
document.addEventListener('astro:page-load', initializeUIControllers);