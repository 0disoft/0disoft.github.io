// src/scripts/code-copy.ts

function setupCodeCopy() {
  // Astro가 생성한 코드 블록 컨테이너(.astro-code)를 직접 찾습니다.
  const codeBlocks = document.querySelectorAll<HTMLElement>('.prose .astro-code');

  codeBlocks.forEach((block) => {
    // 1. Astro가 만든 기존 컨테이너에 'position: relative'와 'group' 클래스를 직접 추가합니다.
    block.classList.add('relative', 'group');

    // 2. 복사 버튼 생성 (이전과 동일)
    const copyButton = document.createElement('button');
    copyButton.className =
      `absolute top-2 right-2 p-1.5 rounded border 
      bg-elementHoverBg border-border text-secondary 
      dark:(bg-dark-elementHoverBg border-dark-border text-dark-secondary)
      cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity`;

    const icon = document.createElement('div');
    icon.className = 'i-lucide-copy w-4 h-4';
    copyButton.appendChild(icon);

    // 3. 버튼을 컨테이너의 자식 요소로 '추가'합니다. (DOM 구조를 바꾸지 않음)
    block.appendChild(copyButton);

    // 4. 버튼 클릭 이벤트 리스너 (이전과 동일)
    copyButton.addEventListener('click', async () => {
      // pre > code 구조이므로, 자식인 pre 태그 내부의 code를 찾습니다.
      const code = block.querySelector<HTMLElement>('pre > code');
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.innerText);
        icon.className = 'i-lucide-check w-4 h-4 text-green-500';
        setTimeout(() => {
          icon.className = 'i-lucide-copy w-4 h-4';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        icon.className = 'i-lucide-x w-4 h-4 text-red-500';
      }
    });
  });
}

// 스크립트 실행 시점을 'astro:page-load'로 변경하여, 
// 페이지 전환 시에도 스크립트가 재실행되도록 합니다. (View Transitions 대비)
document.addEventListener('astro:page-load', setupCodeCopy);