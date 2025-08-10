// src/consts.ts
//
// @file 상수 정의 파일
// @description 웹사이트 전반에 걸쳐 사용되는 정적 설정 값, 링크, 상수를 모아 관리하는 파일입니다.
//              단일 소스에서 데이터를 관리하여 유지보수성을 높입니다.
// @version 1.0.0

/**
 * @namespace SITE
 * @description 웹사이트의 전반적인 메타데이터 및 설정을 정의하는 객체.
 */
export const SITE = {
  TITLE: 'ZeroDi the Software Engineer',
  DESCRIPTION: 'Projects, thoughts, and lessons from a solo indie developer.',
  POSTS_PER_PAGE: 6, // 블로그 목록 페이지당 표시될 게시물의 수.
  BLOG_GRID_CLASSES: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8", // 블로그 포스트 목록을 위한 반응형 그리드 레이아웃 CSS 클래스.
};

/**
 * @namespace GA
 * @description Google Analytics 설정을 정의하는 객체.
 * @todo: 실제 GA 측정 ID로 값을 업데이트해야 합니다.
 */
export const GA = {
  TRACKING_ID: 'G-JKJT327TYE',
};

/**
 * @constant {Array<Object>} NAV_LINKS
 * @description 메인 내비게이션 바에 표시될 링크들의 배열.
 * 각 객체는 링크의 제목과 경로를 포함합니다.
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
    path: '/blog/1',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
];

/**
 * @constant {Array<Object>} CONTACT_LINKS
 * @description 웹사이트 푸터나 연락처 페이지에 사용될 외부 연결 링크들의 배열.
 * 각 객체는 링크의 이름, URL, 그리고 UnoCSS 아이콘 클래스를 포함합니다.
 */
export const CONTACT_LINKS = [
  {
    name: 'Email',
    url: 'mailto:zerodi0000@gmail.com',
    icon: 'i-lucide-mail', // Lucide 아이콘 라이브러리에서 가져온 이메일 아이콘
  },
  {
    name: 'GitHub',
    url: 'https://github.com/0disoft',
    icon: 'i-simple-icons-github', // Simple Icons 라이브러리에서 가져온 GitHub 아이콘
  },
  {
    name: 'Ko-fi',
    url: 'https://ko-fi.com/zerodi',
    icon: 'i-simple-icons-kofi', // Simple Icons 라이브러리에서 가져온 Ko-fi 아이콘
  },
];