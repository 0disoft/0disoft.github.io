import { micromark } from "micromark";

export function renderArticleMarkdown(markdown: string): string {
	return micromark(markdown, { allowDangerousHtml: false, allowDangerousProtocol: false });
}
