import { existsSync, readFileSync, readdirSync } from "node:fs";

function readRequiredText(path: string): string {
	return readFileSync(new URL(path, import.meta.url), "utf8");
}

function readOptionalText(path: string): string {
	const url = new URL(path, import.meta.url);

	return existsSync(url) ? readFileSync(url, "utf8") : "";
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
export const blogPostRouteSource = readOptionalText("../../routes/blog/[slug]/+page.ts");
export const blogPostRouteComponentSource = readOptionalText(
	"../../routes/blog/[slug]/+page.svelte",
);
export const privacyRouteSource = readOptionalText("../../routes/privacy/+page.svelte");
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

export const surfaceSource = readOptionalText("../site-surface.svelte");
export const sidebarSource = readOptionalText("../site-sidebar.svelte");
export const sidebarActionSource = readOptionalText("../ui/sidebar-action.svelte");
export const iconButtonSource = readOptionalText("../ui/icon-button.svelte");
export const brandIconSource = readOptionalText("../ui/brand-icon.svelte");
export const blogSurfaceSource = readOptionalText("../blog-surface.svelte");
export const blogPostSurfaceSource = readOptionalText("../blog-post-surface.svelte");
export const blogPostsSource = readOptionalText("../blog-posts.ts");
export const blogPostCoreSource = readRequiredText("../blog-post-core.ts");
export const blogShareSource = readOptionalText("../blog-share.ts");
export const localesSource = readRequiredText("../site-locales.ts");
export const labelsSource = readRequiredText("../site-labels.ts");
export const analyticsCoreSource = readOptionalText("../site-analytics-core.ts");
export const analyticsRuntimeSource = readOptionalText("../site-analytics.ts");
export const analyticsBootstrapSource = readOptionalText("../site-analytics.svelte");
export const analyticsConsentSource = readOptionalText("../site-analytics-consent.svelte");
export const navigationSource = readOptionalText("../site-navigation.ts");

export const inlangSettingsSource = readRequiredText("../../../project.inlang/settings.json");
export const packageSource = readRequiredText("../../../package.json");
export const viteConfigSource = readRequiredText("../../../vite.config.ts");
export const svelteConfigSource = readRequiredText("../../../svelte.config.js");
export const deployWorkflowSource = readOptionalText("../../../.github/workflows/deploy.yml");
export const publicBirdImageSource = readOptionalText("../../../static/images/0disoft-bird.svg");

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

export const sampleZeroLicensePath = "../content/blog/2026/05/zero-license-notes/meta.json";
export const sampleZeroLicenseMetadata = {
	id: "zero-license-notes",
	publishedAt: "2026-05-03",
	tags: ["open-source", "product"],
};
export const sampleZeroLicenseMarkdown = `---
{"title":"Zero License notes","summary":"Permissive license notes","searchTags":["0BSD","MIT-0"]}
---
Zero-license thinking starts from a simple question: what should be easy for the next person to reuse?

This note is a placeholder for comparing permissive licenses and the amount of friction they leave behind.`;
export const sampleZeroLicenseKoreanMarkdown = `---
{"title":"제로 라이선스 메모","summary":"허용적인 라이선스와 출처 표시에 대한 짧은 초안.","searchTags":["0BSD","MIT-0"]}
---
제로 라이선스에 대한 생각은 다음 사람이 무엇을 쉽게 다시 쓸 수 있어야 하는가라는 질문에서 출발합니다.`;

export const sampleWatercolorPath = "../content/blog/2026/04/watercolor-interface/meta.json";
export const sampleWatercolorMetadata = {
	id: "watercolor-interface",
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
export const sampleWatercolorMarkdown = `---
{"title":"Watercolor interface","summary":"A short note about the site surface."}
---
The visual direction should feel hand-made without turning into decoration for its own sake.

## Start with the mark

![0disoft bird mark](/images/0disoft-bird.svg)

This note is a placeholder for palette, surface, and typography decisions.

## Keep controls clear

The interface should stay quiet around actual controls.

## Let text breathe

Line length and spacing should support reading.

## Recheck after content grows

The design should survive more posts.`;
export const sampleWatercolorKoreanMarkdown = `---
{"title":"수채화 인터페이스","summary":"사이트 표면에 대한 짧은 메모."}
---
시각 방향은 손맛을 품고 있어야 하지만, 장식만을 위한 장식으로 변하면 안 됩니다.

## 표식에서 출발하기

![0disoft 새 그림](/images/0disoft-bird.svg)

이 글은 색상, 표면, 글자 체계에 대한 선택을 정리하기 위한 자리입니다.

## 조작 요소는 선명하게

실제 조작 요소 주변은 조용해야 합니다.

## 글자가 숨 쉴 자리

줄 길이와 간격은 읽기를 도와야 합니다.

## 글이 늘어난 뒤 다시 보기

디자인은 글이 늘어나도 버텨야 합니다.`;
