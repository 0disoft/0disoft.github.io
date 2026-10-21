import { mkdir, readFile, readdir, rename, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { articleCoverWidths, getArticleCoverSources } from "../src/lib/article-cover-sources.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const content = join(root, "src/content/indiehackers/posts");
const scriptTime = Math.max(
	(await stat(fileURLToPath(import.meta.url))).mtimeMs,
	(await stat(join(root, "src/lib/article-cover-sources.ts"))).mtimeMs,
);
let generated = 0;
for (const entry of await readdir(content, { withFileTypes: true })) {
	if (!entry.isDirectory()) continue;
	const metadata = JSON.parse(await readFile(join(content, entry.name, "meta.json"), "utf8"));
	if (!metadata.coverImage) continue;
	const source = join(root, "static", metadata.coverImage);
	const sources = getArticleCoverSources(metadata.coverImage);
	const sourceTime = Math.max((await stat(source)).mtimeMs, scriptTime);
	for (const width of articleCoverWidths) {
		const output = join(root, "static", sources.src.replace("-1440.webp", `-${width}.webp`));
		const outputStat = await stat(output).catch(() => null);
		if (outputStat && outputStat.mtimeMs >= sourceTime) continue;
		await mkdir(dirname(output), { recursive: true });
		const temporary = `${output}.tmp`;
		await sharp(source).rotate().resize({ width }).webp({ quality: 78 }).toFile(temporary);
		await rename(temporary, output);
		generated += 1;
	}
}
console.log(`Prepared article covers: ${generated} generated, remaining variants cached.`);
