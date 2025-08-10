// src/scripts/code-copy.ts
//
// @file 코드 복사 스크립트
// @description 웹페이지 내의 모든 코드 블록에 '클립보드 복사' 버튼을 동적으로 추가하고,
//              버튼 클릭 시 해당 코드 내용을 클립보드에 복사하는 기능을 구현합니다.
// @version 1.0.0

/**
 * @section 상수 정의
 * @description 코드 복사 기능에 사용되는 CSS 클래스와 타이밍 상수를 정의합니다.
 */
const COPY_BUTTON_CLASS = 'code-copy-button';
const ICON_BASE_CLASS = 'w-4 h-4';
const ICON_COPY_CLASS = `i-lucide-copy text-primary dark:text-dark-primary`;
const ICON_SUCCESS_CLASS = 'i-lucide-check text-green-500';
const ICON_ERROR_CLASS = 'i-lucide-x text-red-500';
const SUCCESS_ICON_DURATION = 2000;

/**
 * @function handleCopyClick
 * @description 코드 복사 버튼 클릭 이벤트 핸들러.
 * 코드 블록의 텍스트를 클립보드에 복사하고, 성공/실패에 따라 아이콘을 변경합니다.
 * @param {HTMLButtonElement} button - 클릭된 버튼 요소.
 * @param {HTMLElement} preElement - 코드 블록을 감싸는 <pre> 요소.
 */
async function handleCopyClick(button: HTMLButtonElement, preElement: HTMLElement) {
  const code = preElement.querySelector('code')?.innerText;
  if (!code) return;

  const icon = button.querySelector('div');
  if (!icon) return;

  try {
    // 텍스트를 클립보드에 비동기적으로 복사합니다.
    await navigator.clipboard.writeText(code);
    // 성공 시 아이콘을 체크 표시로 변경합니다.
    icon.className = `${ICON_BASE_CLASS} ${ICON_SUCCESS_CLASS}`;
  } catch (err) {
    // 복사 실패 시 콘솔에 에러를 기록하고 아이콘을 'x'로 변경합니다.
    console.error('텍스트 복사에 실패했습니다: ', err);
    icon.className = `${ICON_BASE_CLASS} ${ICON_ERROR_CLASS}`;
  } finally {
    // 성공/실패 여부와 관계없이 일정 시간(2초) 후에 아이콘을 원래대로 되돌립니다.
    setTimeout(() => {
      icon.className = `${ICON_BASE_CLASS} ${ICON_COPY_CLASS}`;
    }, SUCCESS_ICON_DURATION);
  }
}

/**
 * @function createCopyButton
 * @description 코드 블록에 추가할 복사 버튼 DOM 요소를 생성합니다.
 * @param {HTMLElement} preElement - 버튼을 추가할 <pre> 요소.
 * @returns {HTMLButtonElement} 생성된 버튼 요소.
 */
function createCopyButton(preElement: HTMLElement): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = `${COPY_BUTTON_CLASS} p-1.5 bg-transparent border-none cursor-pointer rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100`;
  button.setAttribute('aria-label', '코드 복사');

  // JS로 직접 위치 스타일을 지정하여 CSS 유틸리티 클래스와의 충돌을 방지하고
  // 버튼의 절대 위치를 안정적으로 설정합니다.
  button.style.position = 'absolute';
  button.style.top = '1rem';
  button.style.right = '1rem';
  button.style.zIndex = '10';

  const icon = document.createElement('div');
  icon.className = `${ICON_BASE_CLASS} ${ICON_COPY_CLASS}`;
  button.appendChild(icon);

  // 버튼 클릭 시 복사 로직을 실행하는 이벤트 리스너를 추가합니다.
  button.addEventListener('click', () => handleCopyClick(button, preElement));

  return button;
}

/**
 * @function setupCodeCopy
 * @description 페이지의 모든 코드 블록을 순회하며 복사 버튼을 추가하는 메인 함수.
 * 페이지 로드 시점에 한 번만 실행되도록 설계되었습니다.
 */
function setupCodeCopy() {
  document.querySelectorAll<HTMLElement>('pre.astro-code').forEach((preElement) => {
    // `group-hover`와 `position:absolute`를 사용하기 위한 부모 요소 스타일 설정.
    preElement.classList.add('group');
    preElement.style.position = 'relative';

    // 중복으로 버튼이 생성되는 것을 방지하기 위한 가드(guard) 절.
    if (preElement.querySelector(`.${COPY_BUTTON_CLASS}`)) {
      return;
    }

    const button = createCopyButton(preElement);
    preElement.appendChild(button);
  });
}

/**
 * @event astro:page-load
 * @description Astro의 View Transitions(SPA처럼 동작하는 페이지 전환) 이벤트.
 * 새 페이지가 로드될 때마다 `setupCodeCopy` 함수를 실행하여,
 * 동적으로 로드되는 콘텐츠에도 복사 버튼이 추가되도록 보장합니다.
 */
document.addEventListener('astro:page-load', setupCodeCopy);