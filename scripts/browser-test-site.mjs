import { readFile, readdir } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export async function readCatalog(locale = "en") {
	const root = resolve(repositoryRoot, "src/content/indiehackers/posts");
	const collections = JSON.parse(
		await readFile(resolve(repositoryRoot, "src/content/collections/entries.json"), "utf8"),
	);
	const otherSections = new Set(
		Object.values(collections)
			.flat()
			.map((entry) => entry.slug),
	);
	return Promise.all(
		(await readdir(root)).map(async (slug) => {
			const metadata = JSON.parse(await readFile(resolve(root, slug, "meta.json"), "utf8"));
			const markdown = await readFile(resolve(root, slug, locale + ".md"), "utf8");
			return {
				...metadata,
				...JSON.parse(/^---\s*\n([\s\S]*?)\n---/.exec(markdown)[1]),
				collection: otherSections.has(slug),
			};
		}),
	);
}

export async function openBuiltSite({
	origin = "https://site-check.test",
	locale = "en-US",
	viewport = { width: 1440, height: 1000 },
	env = {},
	pagefindModule,
} = {}) {
	const driver = process.argv[2] ? pathToFileURL(resolve(process.argv[2])).href : "playwright-core";
	const { chromium } = await import(driver);
	const browser = await chromium.launch({
		channel: process.env.BROWSER_CHANNEL || (process.platform === "win32" ? "msedge" : "chrome"),
		headless: true,
	});
	try {
		const context = await browser.newContext({ locale, viewport, serviceWorkers: "block" });
		const root = resolve(repositoryRoot, "build");
		const mime = {
			".html": "text/html",
			".js": "text/javascript",
			".css": "text/css",
			".json": "application/json",
			".svg": "image/svg+xml",
			".woff2": "font/woff2",
			".webp": "image/webp",
			".wasm": "application/wasm",
		};
		await context.route("**/*", async (route) => {
			const url = new URL(route.request().url());
			if (url.origin !== origin) return route.abort();
			if (url.pathname === "/_app/env.js")
				return route.fulfill({
					contentType: mime[".js"],
					body: "export const env=" + JSON.stringify(env),
				});
			if (pagefindModule && url.pathname === "/pagefind/pagefind.js")
				return route.fulfill({ contentType: mime[".js"], body: pagefindModule });
			const file = resolve(root, "." + decodeURIComponent(url.pathname));
			if (file !== root && !file.startsWith(root + sep)) return route.abort();
			for (const candidate of [file, resolve(file, "index.html")]) {
				try {
					return await route.fulfill({
						body: await readFile(candidate),
						contentType: mime[extname(candidate)] || "application/octet-stream",
					});
				} catch (error) {
					if (!["ENOENT", "EISDIR", "ENOTDIR"].includes(error.code)) throw error;
				}
			}
			return route.fulfill({ status: 404, body: "Not found" });
		});
		const page = await context.newPage();
		const errors = [];
		page.on("pageerror", (error) => errors.push(error.message));
		return { browser, context, page, origin, errors };
	} catch (error) {
		await browser.close();
		throw error;
	}
}
