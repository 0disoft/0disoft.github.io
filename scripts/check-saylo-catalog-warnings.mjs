import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";
import { createLogger, createServer, normalizePath } from "vite";
import { repositoryRoot } from "./browser-test-site.mjs";

const driver = process.argv[2];
const catalog = resolve(repositoryRoot, "locales/en/site.json");
const original = await readFile(catalog, "utf8");
const warnings = [];
const logger = createLogger("warn");
const warn = logger.warn.bind(logger);
logger.warn = (message, options) => {
	warnings.push(message);
	warn(message, options);
};
const server = await createServer({
	root: repositoryRoot,
	customLogger: logger,
	server: { host: "127.0.0.1", port: 0, open: false },
});
try {
	await server.listen();
	const address = server.httpServer.address();
	assert.ok(address && typeof address !== "string");
	const origin = `http://127.0.0.1:${address.port}`;
	const { stdout } = await promisify(execFile)(
		process.execPath,
		[resolve(repositoryRoot, "scripts/check-saylo-dev.mjs"), driver ?? "", origin],
		{ timeout: 120_000, windowsHide: true },
	);
	console.log(stdout.trim());
	const directImports = () =>
		warnings.filter((message) => message.includes("Managed catalog is directly imported"));
	assert.deepEqual(
		directImports(),
		[],
		"ordinary catalog edits must not warn about direct imports",
	);
	const nodes = [
		...(server.environments.client.moduleGraph.getModulesByFile(normalizePath(catalog)) ?? []),
	];
	assert.ok(
		nodes.some((node) => node.id === null),
		"exercise the real application's watch-only catalog node",
	);

	console.log(
		"PASS no false catalog-import warnings with the real CSS watcher; dev state and invalid-edit recovery preserved",
	);
} finally {
	try {
		await writeFile(catalog, original);
	} finally {
		await server.close();
	}
}
