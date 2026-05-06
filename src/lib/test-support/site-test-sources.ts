import { existsSync, readFileSync, readdirSync } from "node:fs";

function readRequiredText(path: string): string {
	return readFileSync(new URL(path, import.meta.url), "utf8");
}

function collectRelativeFiles(rootPath: string, suffix: string): string[] {
	const rootUrl = new URL(rootPath, import.meta.url);

	if (!existsSync(rootUrl)) {
		return [];
	}

	const rootUrlPath = rootUrl.pathname;
	const paths: string[] = [];

	function visit(directoryUrl: URL) {
		for (const entry of readdirSync(directoryUrl, { withFileTypes: true })) {
			const entryUrl = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directoryUrl);

			if (entry.isDirectory()) {
				visit(entryUrl);
				continue;
			}

			if (entry.name === suffix || entry.name.endsWith(suffix)) {
				paths.push(decodeURIComponent(entryUrl.pathname.slice(rootUrlPath.length)));
			}
		}
	}

	visit(rootUrl);

	return paths.sort();
}

export const routeSource = readRequiredText("../../routes/+page.svelte");
export const sectionRouteSource = readRequiredText("../../routes/[section]/+page.ts");
export const blogPostRouteSource = readRequiredText("../../routes/blog/[slug]/+page.ts");
export const blogPostRouteComponentSource = readRequiredText(
	"../../routes/blog/[slug]/+page.svelte",
);
export const privacyRouteSource = readRequiredText("../../routes/privacy/+page.svelte");
export const layoutCss = readRequiredText("../../routes/layout.css");
export const errorSource = readRequiredText("../../routes/+error.svelte");
export const appHtmlSource = readRequiredText("../../app.html");
export const layoutSource = readRequiredText("../../routes/+layout.svelte");
export const hooksSource = readRequiredText("../../hooks.ts");

export const koMessagesSource = readRequiredText("../../../messages/ko.json");
export const enMessagesSource = readRequiredText("../../../messages/en.json");
export const additionalLocaleMessageSources = {
	zh: readRequiredText("../../../messages/zh.json"),
	es: readRequiredText("../../../messages/es.json"),
	fr: readRequiredText("../../../messages/fr.json"),
	hi: readRequiredText("../../../messages/hi.json"),
} as const;

export const surfaceSource = readRequiredText("../site-surface.svelte");
export const sidebarSource = readRequiredText("../site-sidebar.svelte");
export const sidebarActionSource = readRequiredText("../ui/sidebar-action.svelte");
export const iconButtonSource = readRequiredText("../ui/icon-button.svelte");
export const brandIconSource = readRequiredText("../ui/brand-icon.svelte");
export const blogSurfaceSource = readRequiredText("../blog-surface.svelte");
export const blogPostSurfaceSource = readRequiredText("../blog-post-surface.svelte");
export const blogPostSeoSource = readRequiredText("../blog-post-seo.ts");
export const blogPostsSource = readRequiredText("../blog-posts.ts");
export const blogPostCoreSource = readRequiredText("../blog-post-core.ts");
export const blogShareSource = readRequiredText("../blog-share.ts");
export const localesSource = readRequiredText("../site-locales.ts");
export const labelsSource = readRequiredText("../site-labels.ts");
export const analyticsCoreSource = readRequiredText("../site-analytics-core.ts");
export const analyticsRuntimeSource = readRequiredText("../site-analytics.ts");
export const analyticsBootstrapSource = readRequiredText("../site-analytics.svelte");
export const analyticsConsentSource = readRequiredText("../site-analytics-consent.svelte");
export const navigationSource = readRequiredText("../site-navigation.ts");

export const inlangSettingsSource = readRequiredText("../../../project.inlang/settings.json");
export const packageSource = readRequiredText("../../../package.json");
export const viteConfigSource = readRequiredText("../../../vite.config.ts");
export const svelteConfigSource = readRequiredText("../../../svelte.config.js");
export const deployWorkflowSource = readRequiredText("../../../.github/workflows/deploy.yml");
export const publicBirdImageSource = readRequiredText("../../../static/images/0disoft-bird.svg");

export const blogPostsModuleExists = blogPostsSource.length > 0;
export const navigationModuleExists = navigationSource.length > 0;
export const blogMetaFilePaths = collectRelativeFiles("../../content/blog/", "meta.json");
export const blogMarkdownFilePaths = collectRelativeFiles("../../content/blog/", ".md");

export const siteSurfaceSource = [
	routeSource,
	surfaceSource,
	sidebarSource,
	sidebarActionSource,
	iconButtonSource,
	blogSurfaceSource,
	blogPostSurfaceSource,
	blogPostsSource,
	labelsSource,
].join("\n");

export const aiSmallerFasterPath = "../content/blog/2026/05/ai-smaller-faster-companies/meta.json";
export const aiSmallerFasterMetadata = JSON.parse(
	readRequiredText("../../content/blog/2026/05/ai-smaller-faster-companies/meta.json"),
);
export const aiSmallerFasterKoreanMarkdown = readRequiredText(
	"../../content/blog/2026/05/ai-smaller-faster-companies/ko.md",
);
export const aiSmallerFasterSpanishMarkdown = readRequiredText(
	"../../content/blog/2026/05/ai-smaller-faster-companies/es.md",
);
export const aiSmallerFasterFrenchMarkdown = readRequiredText(
	"../../content/blog/2026/05/ai-smaller-faster-companies/fr.md",
);
export const aiSmallerFasterHindiMarkdown = readRequiredText(
	"../../content/blog/2026/05/ai-smaller-faster-companies/hi.md",
);
export const aiSmallerFasterChineseMarkdown = readRequiredText(
	"../../content/blog/2026/05/ai-smaller-faster-companies/zh.md",
);

export const sampleOpenSourceNotePath = "../content/blog/2026/05/sample-open-source-note/meta.json";
export const sampleOpenSourceNoteMetadata = {
	id: "sample-open-source-note",
	publishedAt: "2026-05-03",
	updatedAt: "2026-05-04",
	tags: ["open-source", "product"],
};
export const sampleOpenSourceNoteMarkdown = `---
{"title":"Sample open source note","summary":"Neutral collaboration notes","searchTags":["reuse","attribution"]}
---
Open collaboration starts from a simple question: what should be easy for the next person to reuse?

This note is a parser fixture for reusable work and the amount of friction it leaves behind.`;
export const sampleOpenSourceNoteKoreanMarkdown = `---
{"title":"샘플 오픈소스 메모","summary":"협업과 출처 표시에 대한 중립 테스트 글.","searchTags":["reuse","attribution"]}
---
열린 협업에 대한 생각은 다음 사람이 무엇을 쉽게 다시 쓸 수 있어야 하는가라는 질문에서 출발합니다.`;

export const sampleRichPostPath = "../content/blog/2026/04/sample-rich-post/meta.json";
export const sampleRichPostMetadata = {
	id: "sample-rich-post",
	publishedAt: "2026-04-17",
	tags: ["design", "product"],
	heroImage: {
		src: "/images/0disoft-bird.svg",
		alt: {
			en: "0disoft bird mark",
			es: "marca de ave de 0disoft",
			fr: "marque d'oiseau 0disoft",
			hi: "0disoft पक्षी चिह्न",
			ko: "0disoft 새 그림",
			zh: "0disoft 鸟形标志",
		},
	},
};
export const sampleRichPostMarkdown = `---
{"title":"Sample rich post","summary":"A short note with headings and media."}
---
The article body should support text, headings, and media without relying on current production posts.

## Start with the mark

![0disoft bird mark](/images/0disoft-bird.svg)

This fixture keeps body parsing behavior visible without naming a deleted article.

## Keep controls clear

The interface should stay quiet around actual controls.

## Let text breathe

Line length and spacing should support reading.

## Recheck after content grows

The parser should survive more posts.`;
export const sampleRichPostKoreanMarkdown = `---
{"title":"샘플 상세 글","summary":"제목과 이미지가 있는 짧은 테스트 글."}
---
본문 파서는 현재 운영 중인 글 이름에 기대지 않고 문단, 제목, 이미지를 처리해야 합니다.

## 표식에서 출발하기

![0disoft 새 그림](/images/0disoft-bird.svg)

이 fixture는 삭제된 글 이름 없이 본문 파싱 동작을 드러냅니다.

## 조작 요소는 선명하게

실제 조작 요소 주변은 조용해야 합니다.

## 글자가 숨 쉴 자리

줄 길이와 간격은 읽기를 도와야 합니다.

## 글이 늘어난 뒤 다시 보기

파서는 글이 늘어나도 같은 규칙으로 동작해야 합니다.`;
