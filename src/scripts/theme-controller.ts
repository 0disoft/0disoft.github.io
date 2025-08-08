// src/scripts/theme-controller.ts

/**
 * 로컬 스토리지에 사용될 키를 정의합니다.
 */
const THEME_KEY = 'theme';
const FONT_LEVEL_KEY = 'font-size-level';

/**
 * 테마 관련 상수를 정의합니다.
 */
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

/**
 * 폰트 크기 관련 상수를 정의합니다.
 */
const FONT_LEVELS = 9;
const DEFAULT_FONT_LEVEL = Math.ceil((FONT_LEVELS + 1) / 2);

/**
 * 현재 테마를 가져옵니다.
 * 저장된 테마가 없으면 OS 설정을 따릅니다.
 * @returns {'light' | 'dark'} 현재 테마
 */
function getCurrentTheme(): 'light' | 'dark' {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === THEME_DARK || savedTheme === THEME_LIGHT) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
}

/**
 * 지정된 테마를 문서에 적용하고 로컬 스토리지에 저장합니다.
 * @param theme {'light' | 'dark'} 적용할 테마
 */
function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.classList.toggle(THEME_DARK, theme === THEME_DARK);
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * 테마 토글 버튼을 설정합니다.
 */
function setupThemeToggle(): void {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // 클릭 이벤트 리스너
  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.classList.contains(THEME_DARK) ? THEME_LIGHT : THEME_DARK;
    applyTheme(newTheme);
  });
}

/**
 * 현재 폰트 크기 단계를 가져옵니다.
 * @returns {number} 현재 폰트 크기 단계
 */
function getCurrentFontLevel(): number {
  const savedLevelStr = localStorage.getItem(FONT_LEVEL_KEY);
  return savedLevelStr ? parseInt(savedLevelStr, 10) : DEFAULT_FONT_LEVEL;
}

/**
 * 지정된 폰트 크기 단계를 문서에 적용하고 로컬 스토리지에 저장합니다.
 * @param level {number} 적용할 폰트 크기 단계
 */
function applyFontSize(level: number): void {
  document.documentElement.style.setProperty('--font-size-multiplier', `calc(0.8 + 0.05 * ${level})`);
  localStorage.setItem(FONT_LEVEL_KEY, String(level));
}

/**
 * 폰트 크기 토글 버튼을 설정합니다.
 */
function setupFontSizeToggle(): void {
  const fontSizeToggle = document.getElementById('font-size-toggle');
  if (!fontSizeToggle) return;

  // 클릭 이벤트 리스너
  fontSizeToggle.addEventListener('click', () => {
    let currentLevel = getCurrentFontLevel();
    currentLevel = (currentLevel % FONT_LEVELS) + 1;
    applyFontSize(currentLevel);
  });
}

/**
 * 모든 UI 컨트롤러를 초기화합니다.
 */
function initializeUIControllers(): void {
  setupThemeToggle();
  setupFontSizeToggle();
}

// Astro 페이지 로드 시 컨트롤러를 초기화합니다.
document.addEventListener('astro:page-load', initializeUIControllers);
