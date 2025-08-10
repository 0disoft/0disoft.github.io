// src/scripts/mobile-menu.ts
//
// @file 모바일 메뉴 스크립트
// @description 모바일 환경에서 내비게이션 메뉴와 유틸리티 버튼의 가시성을
//              토글하고, 화면 크기 변화에 따라 메뉴 상태를 동적으로 관리하는 스크립트입니다.
// @version 1.0.0

/**
 * @section 상수 정의
 * @description 스크립트에서 참조하는 HTML 요소들의 ID와 반응형 기준점을 정의합니다.
 */
const MENU_TOGGLE_ID = 'mobile-menu-toggle';
const MOBILE_MENU_ID = 'mobile-menu';
const UTILITY_BUTTONS_ID = 'utility-buttons';
const LG_BREAKPOINT = 1024; // Tailwind CSS의 'lg' breakpoint (1024px)

/**
 * @function setMenuVisibility
 * @description 메뉴와 유틸리티 버튼의 가시성을 제어하고, 헤더 요소의 CSS 클래스를 업데이트합니다.
 * @param {boolean} show - 메뉴를 표시할지(true) 숨길지(false) 여부.
 * @param {HTMLElement} menu - 모바일 메뉴 요소.
 * @param {HTMLElement} buttons - 유틸리티 버튼 컨테이너 요소.
 * @param {HTMLElement} header - 헤더 요소.
 */
function setMenuVisibility(show: boolean, menu: HTMLElement, buttons: HTMLElement, header: HTMLElement) {
  const display = show ? 'flex' : 'none';
  menu.style.display = display;
  buttons.style.display = display;
  header.classList.toggle('menu-open', show);
}

/**
 * @function setupMobileMenu
 * @description 모바일 메뉴 기능을 초기화하는 메인 함수.
 * 메뉴 토글 버튼 클릭, 링크 클릭, 화면 리사이즈 이벤트에 대한 리스너를 설정합니다.
 */
function setupMobileMenu() {
  const menuToggle = document.getElementById(MENU_TOGGLE_ID);
  const mobileMenu = document.getElementById(MOBILE_MENU_ID);
  const utilityButtons = document.getElementById(UTILITY_BUTTONS_ID);
  const header = document.querySelector('header');

  // 필요한 요소가 모두 존재하는지 확인하는 가드(guard) 절.
  if (!menuToggle || !mobileMenu || !utilityButtons || !header) {
    return;
  }

  // 클릭 이벤트 리스너: 모바일 메뉴 토글 버튼을 클릭하면 메뉴의 가시성을 전환합니다.
  menuToggle.addEventListener('click', () => {
    // FIXME: `mobileMenu.style.display`는 초기 상태가 없으므로 정확한 상태를 파악하기 어려울 수 있습니다.
    //        대신 `header.classList.contains('menu-open')`과 같은 상태 클래스를 사용하는 것이 더 안정적입니다.
    const isHidden = mobileMenu.style.display === 'none';
    setMenuVisibility(isHidden, mobileMenu, utilityButtons, header);
  });

  // 메뉴 안의 링크 클릭 이벤트 리스너:
  // 모바일 환경에서 내비게이션 링크를 클릭하면 메뉴를 자동으로 닫아
  // 사용자 경험을 개선합니다.
  const navLinks = mobileMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < LG_BREAKPOINT) {
        setMenuVisibility(false, mobileMenu, utilityButtons, header);
      }
    });
  });

  // 화면 크기 변경을 감지하는 MediaQueryList 객체.
  const mediaQuery = window.matchMedia(`(min-width: ${LG_BREAKPOINT}px)`);

  /**
   * @function handleResize
   * @description 화면 크기 변경 시 호출되는 이벤트 핸들러.
   * 데스크톱(LG_BREAKPOINT 이상)에서는 메뉴를 항상 표시하고,
   * 모바일에서는 메뉴를 숨기는 역할을 수행합니다.
   * @param {MediaQueryList | MediaQueryListEvent} e - 이벤트 객체.
   */
  const handleResize = (e: MediaQueryList | MediaQueryListEvent) => {
    if (e.matches) {
      // 데스크톱 뷰: 항상 메뉴를 표시합니다.
      setMenuVisibility(true, mobileMenu, utilityButtons, header);
    } else {
      // 모바일 뷰: 메뉴를 숨깁니다.
      setMenuVisibility(false, mobileMenu, utilityButtons, header);
    }
  };

  // 초기 페이지 로드 시 메뉴 상태를 올바르게 설정하기 위해 핸들러를 실행합니다.
  handleResize(mediaQuery);

  // 미디어 쿼리 변경(화면 크기 변경) 이벤트 리스너를 추가합니다.
  mediaQuery.addEventListener('change', handleResize);
}

/**
 * @event astro:page-load
 * @description Astro의 View Transitions(SPA처럼 동작하는 페이지 전환) 이벤트.
 * 새 페이지가 로드될 때마다 `setupMobileMenu` 함수를 실행하여,
 * 동적으로 로드되는 콘텐츠에도 메뉴 기능이 정상적으로 동작하도록 보장합니다.
 */
document.addEventListener('astro:page-load', setupMobileMenu);