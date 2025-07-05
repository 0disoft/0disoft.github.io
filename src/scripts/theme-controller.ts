// src/scripts/theme-controller.ts

/**
 * 테마 토글 기능을 설정합니다.
 * 페이지 로드 시 저장된 테마를 적용하고, 토글 버튼에 클릭 이벤트를 추가합니다.
 */
console.log("Theme controller script loaded!");

function setupThemeToggle(): void {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  const applyTheme = (theme: 'light' | 'dark') => {
    // data-theme 속성 대신 class를 직접 제어합니다.
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  };

  // 버튼 클릭 시 테마를 토글합니다.
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark');
  });

  // 페이지 로드 시 테마를 결정하고 적용합니다.
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  } else {
    // 저장된 테마가 없으면, 사용자의 OS 설정을 확인합니다.
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
}

/**
 * 폰트 크기 조절 기능을 설정합니다.
 * 페이지 로드 시 저장된 폰트 단계를 적용하고, 토글 버튼에 클릭 이벤트를 추가합니다.
 */
function setupFontSizeToggle(): void {
  const fontSizeToggle = document.getElementById('font-size-toggle') as HTMLButtonElement;

  // 요소가 존재하는지 확인하여 런타임 오류 방지
  if (!fontSizeToggle) {
    console.error("Font size toggle button not found.");
    return;
  }

  const FONT_LEVELS = 9;
  const DEFAULT_FONT_LEVEL = Math.ceil((FONT_LEVELS + 1) / 2);

  const applyFontSize = (level: number) => {
    document.documentElement.style.setProperty(
      '--font-size-multiplier',
      `calc(0.8 + 0.05 * ${level})`
    );
    localStorage.setItem('font-size-level', String(level));
  };

  const savedLevelStr = localStorage.getItem('font-size-level');
  const savedLevel = savedLevelStr ? parseInt(savedLevelStr, 10) : DEFAULT_FONT_LEVEL;
  applyFontSize(savedLevel);

  fontSizeToggle.addEventListener('click', () => {
    const currentLevelStr = localStorage.getItem('font-size-level');
    let currentLevel = currentLevelStr ? parseInt(currentLevelStr, 10) : DEFAULT_FONT_LEVEL;

    currentLevel = (currentLevel % FONT_LEVELS) + 1;
    applyFontSize(currentLevel);
  });
}

// 각 기능을 초기화합니다.
setupThemeToggle();
setupFontSizeToggle();