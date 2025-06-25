// src/scripts/code-copy.ts

function setupCodeCopy() {
  // 게시물 본문(.prose) 안의 모든 pre 태그를 찾습니다.
  const codeBlocks = document.querySelectorAll<HTMLElement>('.prose pre');

  codeBlocks.forEach((block) => {
    // 1. 컨테이너 div 생성 및 pre 태그 감싸기
    const container = document.createElement('div');
    container.className = 'code-block-container';
    block.parentNode?.insertBefore(container, block);
    container.appendChild(block);

    // 2. 복사 버튼 생성
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    container.appendChild(copyButton);

    // 3. 버튼 클릭 이벤트 리스너 추가
    copyButton.addEventListener('click', async () => {
      const code = block.querySelector('code');
      if (!code) return;

      try {
        await navigator.clipboard.writeText(code.innerText);

        // 피드백 제공
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);

      } catch (err) {
        console.error('Failed to copy text: ', err);
        copyButton.textContent = 'Error';
      }
    });
  });
}

// 페이지가 로드되면 함수를 실행합니다.
document.addEventListener('DOMContentLoaded', setupCodeCopy);