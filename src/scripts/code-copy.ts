// src/scripts/code-copy.ts

// 상수 정의
const COPY_BUTTON_CLASS = 'code-copy-button';
const ICON_BASE_CLASS = 'w-4 h-4';
const ICON_COPY_CLASS = `i-lucide-copy text-primary dark:text-dark-primary`;
const ICON_SUCCESS_CLASS = 'i-lucide-check text-green-500';
const ICON_ERROR_CLASS = 'i-lucide-x text-red-500';
const SUCCESS_ICON_DURATION = 2000;

/**
 * 클립보드 복사 로직을 처리합니다.
 * @param button - 클릭된 버튼 요소
 * @param preElement - 코드 블록을 감싸는 <pre> 요소
 */
async function handleCopyClick(button: HTMLButtonElement, preElement: HTMLElement) {
  const code = preElement.querySelector('code')?.innerText;
  if (!code) return;

  const icon = button.querySelector('div');
  if (!icon) return;

  try {
    await navigator.clipboard.writeText(code);
    icon.className = `${ICON_BASE_CLASS} ${ICON_SUCCESS_CLASS}`;
  } catch (err) {
    console.error('텍스트 복사에 실패했습니다: ', err);
    icon.className = `${ICON_BASE_CLASS} ${ICON_ERROR_CLASS}`;
  } finally {
    setTimeout(() => {
      icon.className = `${ICON_BASE_CLASS} ${ICON_COPY_CLASS}`;
    }, SUCCESS_ICON_DURATION);
  }
}

/**
 * 코드 블록을 위한 복사 버튼을 생성하고 설정합니다.
 * @param preElement - 버튼을 추가할 <pre> 요소
 * @returns 생성된 버튼 요소
 */
function createCopyButton(preElement: HTMLElement): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = `${COPY_BUTTON_CLASS} p-1.5 bg-transparent border-none cursor-pointer rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100`;
  button.setAttribute('aria-label', '코드 복사');

  // JS로 직접 위치 스타일을 지정하여 안정성 확보
  button.style.position = 'absolute';
  button.style.top = '1rem';
  button.style.right = '1rem';
  button.style.zIndex = '10';

  const icon = document.createElement('div');
  icon.className = `${ICON_BASE_CLASS} ${ICON_COPY_CLASS}`;
  button.appendChild(icon);

  button.addEventListener('click', () => handleCopyClick(button, preElement));

  return button;
}

/**
 * 모든 코드 블록을 찾아 복사 버튼을 추가합니다.
 */
function setupCodeCopy() {
  document.querySelectorAll<HTMLElement>('pre.astro-code').forEach((preElement) => {
    // group-hover와 position:absolute를 위한 스타일 설정
    preElement.classList.add('group');
    preElement.style.position = 'relative';

    // 버튼 중복 생성 방지
    if (preElement.querySelector(`.${COPY_BUTTON_CLASS}`)) {
      return;
    }

    const button = createCopyButton(preElement);
    preElement.appendChild(button);
  });
}

// Astro 페이지 로드 시 스크립트 실행
document.addEventListener('astro:page-load', setupCodeCopy);
