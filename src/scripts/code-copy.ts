// src/scripts/code-copy.ts

function setupCodeCopy() {
  // 1. '.astro-code' 클래스를 가진 모든 <pre> 태그를 찾습니다.
  document.querySelectorAll<HTMLElement>('pre.astro-code').forEach((preElement) => {
    // 이미 버튼이 있다면 중복 생성 방지
    if (preElement.querySelector('.code-copy-button')) {
      return;
    }

    // 2. 복사 버튼 생성
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-button'; // 식별을 위한 클래스 추가
    copyButton.style.position = 'absolute'; // JS로 직접 스타일 설정
    copyButton.style.zIndex = '10';
    copyButton.style.opacity = '0'; // 기본적으로 숨김
    copyButton.style.transition = 'opacity 0.2s';
    copyButton.style.cursor = 'pointer';
    copyButton.style.background = 'transparent';
    copyButton.style.border = 'none';
    copyButton.style.padding = '0.375rem'; // p-1.5

    const icon = document.createElement('div');
    // UnoCSS 아이콘 클래스를 직접 설정합니다.
    icon.className = 'i-lucide-copy w-4 h-4 text-primary dark:text-dark-primary';
    copyButton.appendChild(icon);

    // 3. 버튼을 body에 직접 추가합니다.
    // 이렇게 하면 다른 요소의 스타일에 전혀 영향을 받지 않습니다.
    document.body.appendChild(copyButton);

    // 4. 버튼 위치를 계산하고 설정하는 함수
    function positionButton() {
      const rect = preElement.getBoundingClientRect();
      const buttonWidth = 28; // 버튼의 대략적인 너비
      const padding = 8; // 원하는 여백 (0.5rem = 8px)

      // top 위치에 여백 추가
      copyButton.style.top = `${rect.top + window.scrollY + padding}px`;
      // left 위치 계산 시, 오른쪽 끝에서 버튼 너비와 여백만큼 왼쪽으로 이동
      copyButton.style.left = `${rect.right + window.scrollX - buttonWidth - padding}px`;
    }

    // 5. 초기 위치 설정 및 창 크기 변경 시 위치 재조정
    positionButton();
    window.addEventListener('resize', positionButton);

    // 6. 마우스 호버 효과
    preElement.addEventListener('mouseenter', () => {
      copyButton.style.opacity = '1';
    });
    preElement.addEventListener('mouseleave', () => {
      copyButton.style.opacity = '0';
    });
    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.opacity = '1';
    });
    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.opacity = '0';
    });


    // 7. 클릭 이벤트 리스너 설정
    copyButton.addEventListener('click', async () => {
      const code = preElement.querySelector('code');
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.innerText);
        icon.className = 'i-lucide-check w-4 h-4 text-green-500';
        setTimeout(() => {
          icon.className = 'i-lucide-copy w-4 h-4 text-primary dark:text-dark-primary';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        icon.className = 'i-lucide-x w-4 h-4 text-red-500';
      }
    });
  });
}

document.addEventListener('astro:page-load', setupCodeCopy);