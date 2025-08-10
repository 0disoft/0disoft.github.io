// src/scripts/theme-controller.ts
//
// @file 테마 및 폰트 크기 컨트롤러 스크립트
// @description 사용자의 테마(라이트/다크 모드)와 폰트 크기를 제어하고,
//              그 상태를 로컬 스토리지에 저장하여 페이지 로드 시에도 유지되도록 합니다.
//              이는 사용자 맞춤 설정 기능을 제공하며 접근성을 향상시킵니다.
// @version 1.0.0

/**
 * @section 상수 정의
 * @description 로컬 스토리지에 사용될 키와 테마, 폰트 크기 관련 상수를 정의합니다.
 */
const THEME_KEY = 'theme';
const FONT_LEVEL_KEY = 'font-size-level';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const FONT_LEVELS = 9;
const DEFAULT_FONT_LEVEL = Math.ceil((FONT_LEVELS + 1) / 2);

/**
 * @function getCurrentTheme
 * @description 로컬 스토리지에 저장된 테마를 반환합니다.
 * 저장된 테마가 없거나 유효하지 않은 경우, 사용자의 OS 설정(prefers-color-scheme)을 따릅니다.
 * @returns {'light' | 'dark'} 현재 활성화된 테마.
 */
function getCurrentTheme(): 'light' | 'dark' {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === THEME_DARK || savedTheme === THEME_LIGHT) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
}

/**
 * @function applyTheme
 * @description 지정된 테마를 HTML 문서에 적용하고 로컬 스토리지에 저장합니다.
 * `document.documentElement`의 클래스를 조작하여 CSS 변수를 동적으로 변경합니다.
 * @param {'light' | 'dark'} theme - 적용할 테마.
 */
function applyTheme(theme: 'light' | 'dark'): void {
  document.documentElement.classList.toggle(THEME_DARK, theme === THEME_DARK);
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * @function setupThemeToggle
 * @description 테마 토글 버튼에 이벤트 리스너를 추가하는 함수.
 * 버튼 클릭 시 현재 테마를 반전시키고 `applyTheme` 함수를 호출합니다.
 */
function setupThemeToggle(): void {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    // 현재 HTML 요소에 'dark' 클래스가 있는지 확인하여 다음 테마를 결정합니다.
    const newTheme = document.documentElement.classList.contains(THEME_DARK) ? THEME_LIGHT : THEME_DARK;
    applyTheme(newTheme);
  });
}

/**
 * @function getCurrentFontLevel
 * @description 로컬 스토리지에 저장된 폰트 크기 단계를 가져옵니다.
 * 저장된 값이 없거나 유효하지 않으면 기본 폰트 크기 단계를 반환합니다.
 * @returns {number} 현재 폰트 크기 단계 (1부터 FONT_LEVELS까지).
 */
function getCurrentFontLevel(): number {
  const savedLevelStr = localStorage.getItem(FONT_LEVEL_KEY);
  return savedLevelStr ? parseInt(savedLevelStr, 10) : DEFAULT_FONT_LEVEL;
}

/**
 * @function applyFontSize
 * @description 지정된 폰트 크기 단계를 CSS 변수로 설정하고 로컬 스토리지에 저장합니다.
 * CSS 변수 `--font-size-multiplier`를 동적으로 변경하여 폰트 크기를 조절합니다.
 * @param {number} level - 적용할 폰트 크기 단계.
 */
function applyFontSize(level: number): void {
  document.documentElement.style.setProperty('--font-size-multiplier', `calc(0.8 + 0.05 * ${level})`);
  localStorage.setItem(FONT_LEVEL_KEY, String(level));
}

/**
 * @function setupFontSizeToggle
 * @description 폰트 크기 토글 버튼에 이벤트 리스너를 추가하는 함수.
 * 버튼 클릭 시 폰트 크기 단계를 순환하며 변경하고 `applyFontSize`를 호출합니다.
 */
function setupFontSizeToggle(): void {
  const fontSizeToggle = document.getElementById('font-size-toggle');
  if (!fontSizeToggle) return;

  fontSizeToggle.addEventListener('click', () => {
    let currentLevel = getCurrentFontLevel();
    // 폰트 크기 레벨을 1부터 FONT_LEVELS까지 순환시킵니다.
    currentLevel = (currentLevel % FONT_LEVELS) + 1;
    applyFontSize(currentLevel);
  });
}

/**
 * @function initializeUIControllers
 * @description 테마 및 폰트 크기 관련 모든 기능을 초기화하는 메인 함수.
 */
function initializeUIControllers(): void {
  setupThemeToggle();
  setupFontSizeToggle();
}

/**
 * @event astro:page-load
 * @description Astro의 View Transitions(SPA처럼 동작하는 페이지 전환) 이벤트.
 * 새 페이지가 로드될 때마다 컨트롤러를 초기화하여
 * 동적으로 로드되는 콘텐츠에도 기능이 정상적으로 동작하도록 보장합니다.
 */
document.addEventListener('astro:page-load', initializeUIControllers);