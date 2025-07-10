function initInfiniteScroll() {
  const postContainer = document.getElementById('post-container') as HTMLUListElement | null;
  const sentinel = document.getElementById('sentinel');

  if (!postContainer || !sentinel) {
    return;
  }

  let isLoading = false;
  let allPostsLoaded = false;

  const createPostElement = (post: any) => {
    const listItem = document.createElement('li');
    const postDate = new Date(post.data.pubDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    listItem.innerHTML = `
      <a
        href="/blog/${post.slug}/"
        class="group block border border-border rounded-lg no-underline transition-all hover:(border-accent dark:border-dark-accent)"
      >
        <div class="p-6">
          <h2
            class="font-serif text-2xl mb-2 group-hover:text-accent dark:group-hover:text-dark-accent transition-colors"
          >
            ${post.data.title}
          </h2>
          <p class="text-secondary dark:text-dark-secondary mb-4 leading-relaxed">
            ${post.data.description}
          </p>
          <time
            datetime="${post.data.pubDate}"
            class="text-sm text-secondary dark:text-dark-secondary"
          >
            ${postDate}
          </time>
        </div>
      </a>
    `;
    return listItem;
  };

  const loadMorePosts = async () => {
    if (isLoading || allPostsLoaded) return;

    isLoading = true;
    sentinel.textContent = '로딩 중...';

    const loadedPostsCount = postContainer.children.length;

    try {
      const response = await fetch(`/api/posts.json?offset=${loadedPostsCount}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newPosts = await response.json();

      if (newPosts.length === 0) {
        allPostsLoaded = true;
        sentinel.textContent = '모든 포스트를 불러왔습니다.';
        observer.disconnect();
        return;
      }

      newPosts.forEach((post: any) => {
        const postElement = createPostElement(post);
        postContainer.appendChild(postElement);
      });

    } catch (error) {
      console.error('Failed to load more posts:', error);
      sentinel.textContent = '포스트를 불러오는 데 실패했습니다.';
    } finally {
      isLoading = false;
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        loadMorePosts();
      }
    },
    { threshold: 1.0 }
  );

  observer.observe(sentinel);
}

document.addEventListener('astro:page-load', initInfiniteScroll);