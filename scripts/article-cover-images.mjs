import { mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { articleCoverWidths, getArticleCoverSources } from "../src/lib/article-cover-sources.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const recipe = createHash("sha256")
	.update(await readFile(fileURLToPath(import.meta.url)))
	.update(await readFile(join(root, "src/lib/article-cover-sources.ts")))
	.update(JSON.stringify(sharp.versions))
	.digest("hex");

export async function prepareArticleCovers(repositoryRoot = root) {
	const content = join(repositoryRoot, "src/content/indiehackers/posts");
	const manifestPath = join(repositoryRoot, ".cache/article-covers.json");
	const previous = await readFile(manifestPath, "utf8")
		.then((text) => JSON.parse(text))
		.catch(() => ({}));
	/** @type {Record<string, string>} */
	const manifest = {};
	let generated = 0;
	for (const entry of await readdir(content, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		const metadata = JSON.parse(await readFile(join(content, entry.name, "meta.json"), "utf8"));
		if (!metadata.coverImage) continue;
		const source = await readFile(join(repositoryRoot, "static", metadata.coverImage));
		const sources = getArticleCoverSources(metadata.coverImage);
		const fingerprint = createHash("sha256").update(recipe).update(source).digest("hex");
		manifest[metadata.coverImage] = fingerprint;
		for (const width of articleCoverWidths) {
			const output = join(
				repositoryRoot,
				"static",
				sources.src.replace("-1440.webp", `-${width}.webp`),
			);
			const outputStat = await stat(output).catch(() => null);
			if (outputStat?.size && previous?.[metadata.coverImage] === fingerprint) continue;
			await mkdir(dirname(output), { recursive: true });
			const temporary = `${output}.tmp`;
			await sharp(source).rotate().resize({ width }).webp({ quality: 78 }).toFile(temporary);
			await rename(temporary, output);
			generated += 1;
		}
	}
	await mkdir(dirname(manifestPath), { recursive: true });
	await writeFile(`${manifestPath}.tmp`, JSON.stringify(manifest));
	await rename(`${manifestPath}.tmp`, manifestPath);
	return generated;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	const generated = await prepareArticleCovers();
	console.log(`Prepared article covers: ${generated} generated, remaining variants cached.`);
}
