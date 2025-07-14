// src/scripts/mobile-menu.ts

// 상수 정의
const MENU_TOGGLE_ID = 'mobile-menu-toggle';
const MOBILE_MENU_ID = 'mobile-menu';
const UTILITY_BUTTONS_ID = 'utility-buttons';
const LG_BREAKPOINT = 1024; // lg breakpoint (1024px)

/**
 * 메뉴와 유틸리티 버튼의 가시성을 설정하고 헤더의 상태를 업데이트합니다.
 * @param show - 메뉴를 표시할지 여부
 * @param menu - 모바일 메뉴 요소
 * @param buttons - 유틸리티 버튼 요소
 * @param header - 헤더 요소
 */
function setMenuVisibility(show: boolean, menu: HTMLElement, buttons: HTMLElement, header: HTMLElement) {
  const display = show ? 'flex' : 'none';
  menu.style.display = display;
  buttons.style.display = display;
  header.classList.toggle('menu-open', show);
}

/**
 * 모바일 메뉴 기능을 설정합니다.
 */
function setupMobileMenu() {
  const menuToggle = document.getElementById(MENU_TOGGLE_ID);
  const mobileMenu = document.getElementById(MOBILE_MENU_ID);
  const utilityButtons = document.getElementById(UTILITY_BUTTONS_ID);
  const header = document.querySelector('header');

  if (!menuToggle || !mobileMenu || !utilityButtons || !header) {
    return;
  }

  // 클릭 이벤트 리스너: 메뉴 가시성을 토글합니다.
  menuToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.style.display === 'none';
    setMenuVisibility(isHidden, mobileMenu, utilityButtons, header);
  });

  // 메뉴 안의 링크 클릭 시 메뉴를 닫습니다.
  const navLinks = mobileMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < LG_BREAKPOINT) {
        setMenuVisibility(false, mobileMenu, utilityButtons, header);
      }
    });
  });

  // 화면 크기 변경을 감지하여 메뉴 가시성을 제어합니다.
  const mediaQuery = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);

  const handleResize = (e: MediaQueryList | MediaQueryListEvent) => {
    if (e.matches) {
      // 데스크톱 뷰: 항상 메뉴를 표시합니다.
      setMenuVisibility(true, mobileMenu, utilityButtons, header);
    } else {
      // 모바일 뷰: 메뉴를 숨깁니다.
      setMenuVisibility(false, mobileMenu, utilityButtons, header);
    }
  };

  // 초기 상태 설정
  handleResize(mediaQuery);

  // 리사이즈 이벤트 리스너 추가
  mediaQuery.addEventListener('change', handleResize);
}

// Astro 페이지 로드 시 스크립트 실행
document.addEventListener('astro:page-load', setupMobileMenu);