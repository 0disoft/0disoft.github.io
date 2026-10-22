import { afterEach, expect, it } from "vitest";
import { mkdtemp, mkdir, rm, writeFile, utimes } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import sharp from "sharp";
import { prepareArticleCovers } from "../../scripts/article-cover-images.mjs";

/** @type {string | undefined} */
let root;
afterEach(async () => {
	if (root) await rm(root, { recursive: true, force: true });
});

it("reuses content across checkouts and rebuilds changed or missing covers", async () => {
	root = await mkdtemp(join(tmpdir(), "article-covers-"));
	const content = join(root, "src/content/indiehackers/posts/example");
	const images = join(root, "static/images/indiehackers");
	await mkdir(content, { recursive: true });
	await mkdir(images, { recursive: true });
	await writeFile(
		join(content, "meta.json"),
		JSON.stringify({ coverImage: "/images/indiehackers/example.webp" }),
	);
	const source = join(images, "example.webp");
	/** @param {string} background */
	const image = (background) =>
		sharp({ create: { width: 32, height: 18, channels: 3, background } })
			.webp()
			.toBuffer();
	await writeFile(source, await image("red"));
	expect(await prepareArticleCovers(root)).toBe(4);
	const timestamp = new Date("2030-01-01");
	await utimes(source, timestamp, timestamp);
	expect(await prepareArticleCovers(root)).toBe(0);
	await writeFile(source, await image("blue"));
	await utimes(source, timestamp, timestamp);
	expect(await prepareArticleCovers(root)).toBe(4);
	await rm(join(images, "responsive/example-360.webp"));
	expect(await prepareArticleCovers(root)).toBe(1);
});
