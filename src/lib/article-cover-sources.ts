export const articleCoverWidths = [180, 360, 720, 1440] as const;

export function getArticleCoverSources(source: string) {
	const name = /^\/images\/indiehackers\/([a-z0-9-]+)\.(?:webp|png|jpg)$/.exec(source)?.[1];
	if (!name) throw new Error(`Unsupported article cover: ${source}`);
	const base = `/images/indiehackers/responsive/${name}`;
	return {
		src: `${base}-1440.webp`,
		srcset: articleCoverWidths.map((width) => `${base}-${width}.webp ${width}w`).join(", "),
	};
}
