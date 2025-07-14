// src/consts.ts

/**
 * 웹사이트의 전반적인 설정 정보를 정의합니다.
 */
export const SITE = {
  TITLE: 'ZeroDi the Software Engineer',
  DESCRIPTION: 'Projects, thoughts, and lessons from a solo indie developer.',
  POSTS_PER_PAGE: 6, // 블로그 페이지당 표시될 게시물 수
  BLOG_GRID_CLASSES: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8", // 블로그 그리드 레이아웃 클래스
};

/**
 * 메인 내비게이션 링크들을 정의합니다.
 */
export const NAV_LINKS = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Projects',
    path: '/projects',
  },
  {
    title: 'Blog',
    path: '/blog',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
];

/**
 * 연락처 및 외부 연결 링크들을 정의합니다.
 */
export const CONTACT_LINKS = [
  {
    name: 'Email',
    url: 'mailto:zerodi0000@gmail.com',
    icon: 'i-lucide-mail', // Lucide 아이콘
  },
  {
    name: 'GitHub',
    url: 'https://github.com/0disoft',
    icon: 'i-simple-icons-github', // Simple Icons
  },
  {
    name: 'Ko-fi',
    url: 'https://ko-fi.com/zerodi',
    icon: 'i-simple-icons-kofi', // Simple Icons
  },
];
