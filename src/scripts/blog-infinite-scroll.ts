function initInfiniteScroll() {
  const postList = document.getElementById("post-list") as HTMLUListElement;
  const trigger = document.getElementById("load-more-trigger") as HTMLElement;

  // postList나 trigger 요소가 없으면 스크립트를 실행하지 않음
  if (!postList || !trigger) return;

  // astro 파일에서 data 속성으로 전달된 값을 읽어옴
  const postsPerPage = parseInt(postList.dataset.postsPerPage || '6', 10);

  let allPostsData: any[] = [];
  let loadedPostsCount = postList.children.length;
  let isLoading = false; // 중복 로드를 방지하기 위한 플래그

  const createPostElement = (post: any) => {
    const postDate = new Date(post.pubDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="/blog/${post.id}/" class="group block border border-border rounded-lg no-underline transition-all hover:(border-accent dark:border-dark-accent)">
        <div class="p-6">
          <h2 class="font-serif text-2xl mb-2 group-hover:text-accent dark:group-hover:text-dark-accent transition-colors">${post.title}</h2>
          <p class="text-secondary dark:text-dark-secondary mb-4 leading-relaxed">${post.description}</p>
          <time datetime="${post.pubDate}" class="text-sm text-secondary dark:text-dark-secondary">${postDate}</time>
        </div>
      </a>
    `;
    return li;
  };

  const fetchAllPosts = async () => {
    if (allPostsData.length > 0) return;
    try {
      const response = await fetch('/api/posts.json');
      if (!response.ok) throw new Error('Failed to fetch posts');
      allPostsData = await response.json();
    } catch (error) {
      console.error(error);
      if (trigger) trigger.textContent = "Failed to load posts.";
    }
  };

  const loadMorePosts = () => {
    if (isLoading) return;
    isLoading = true;

    const postsToLoad = allPostsData.slice(loadedPostsCount, loadedPostsCount + postsPerPage);
    if (postsToLoad.length > 0) {
      postsToLoad.forEach(post => {
        postList.appendChild(createPostElement(post));
      });
      loadedPostsCount += postsToLoad.length;
    }

    if (loadedPostsCount >= allPostsData.length) {
      if (trigger) trigger.style.display = 'none';
      observer.disconnect(); // 더 이상 관찰할 필요가 없으므로 observer를 해제
    }

    isLoading = false;
  };

  const observer = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && !isLoading) {
      if (allPostsData.length === 0) {
        await fetchAllPosts();
      }
      if (allPostsData.length > 0) {
        loadMorePosts();
      }
    }
  }, {
    rootMargin: '200px'
  });

  // 최초 로드 시 이미 모든 게시물이 표시되었다면 트리거를 숨깁니다.
  // 이 부분은 서버에서 allPosts.length를 전달받아야 정확하지만, 
  // 우선 클라이언트에서 간단히 처리합니다.
  if (loadedPostsCount < postsPerPage) {
    trigger.style.display = 'none';
  } else {
    observer.observe(trigger);
  }
}

// Astro의 페이지 전환 이벤트를 수신하여 스크립트 실행
document.addEventListener('astro:page-load', initInfiniteScroll);

// 최초 페이지 로드 시에도 스크립트 실행
if (document.readyState !== 'loading') {
  initInfiniteScroll();
} else {
  document.addEventListener('DOMContentLoaded', initInfiniteScroll);
}