import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Keep previously published cover URLs working while avoiding full-size originals
// in the deployment. Source artwork stays untouched in static/.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const directory = resolve(root, "build/images/indiehackers");
let before = 0;
let after = 0;
for (const entry of await readdir(directory, { withFileTypes: true })) {
	if (!entry.isFile() || !entry.name.endsWith(".webp")) continue;
	const path = resolve(directory, entry.name);
	const original = await readFile(resolve(root, "static/images/indiehackers", entry.name));
	const compressed = await sharp(original)
		.rotate()
		.resize({ width: 1440, withoutEnlargement: true })
		.webp({ quality: 74 })
		.toBuffer();
	const output = compressed.length < original.length ? compressed : original;
	if (output !== original) await writeFile(path, output);
	before += original.length;
	after += output.length;
}
console.log(
	`Legacy WebP covers: ${before} -> ${after} bytes; saved ${before - after} bytes. Original URLs preserved.`,
);
