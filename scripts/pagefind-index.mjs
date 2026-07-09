import { access, mkdir, rename, rm } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";

const siteDirectory = "build";
const pagefindBinaryCandidates =
	process.platform === "win32"
		? [join("node_modules", ".bin", "pagefind.exe"), join("node_modules", ".bin", "pagefind.cmd")]
		: [join("node_modules", ".bin", "pagefind")];
const verificationFilesExcludedFromIndex = ["googled410e8c95b586079.html"];
const unsupportedStemmingLanguages = new Set(["ko", "zh"]);
const stemmingFollowup = "Search will still work, but will not match across root words.";

/**
 * @param {string} output
 * @returns {string}
 */
export function filterPagefindLog(output) {
	const lines = output.split(/\r?\n/);
	const filtered = [];

	for (let index = 0; index < lines.length; index += 1) {
		const line = lines[index];
		const normalizedLine = line.trimEnd();
		const unsupportedLanguage = normalizedLine.match(
			/^Note: Pagefind doesn't support stemming for the language ([a-z]{2})\.$/,
		)?.[1];

		if (unsupportedLanguage && unsupportedStemmingLanguages.has(unsupportedLanguage)) {
			if (lines[index + 1]?.trimEnd() === stemmingFollowup) {
				index += 1;
			}
			continue;
		}

		filtered.push(line);
	}

	return filtered.join("\n");
}

/**
 * @param {string} path
 * @returns {Promise<boolean>}
 */
async function pathExists(path) {
	try {
		await access(path, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}

/**
 * @returns {Promise<string>}
 */
async function resolvePagefindBinary() {
	for (const candidate of pagefindBinaryCandidates) {
		if (await pathExists(candidate)) {
			return candidate;
		}
	}

	return pagefindBinaryCandidates[0];
}

/**
 * @param {string[]} paths
 * @returns {Promise<{ tempRoot: string; moved: Array<{ source: string; destination: string }> }>}
 */
async function temporarilyMoveFiles(paths) {
	const tempRoot = join(tmpdir(), `pagefind-skip-${process.pid}-${Date.now()}`);
	const moved = [];

	for (const source of paths) {
		if (!(await pathExists(source))) {
			continue;
		}

		const destination = join(tempRoot, source);
		await mkdir(dirname(destination), { recursive: true });
		await rename(source, destination);
		moved.push({ source, destination });
	}

	return { tempRoot, moved };
}

/**
 * @param {{ tempRoot: string; moved: Array<{ source: string; destination: string }> }} movedFiles
 * @returns {Promise<void>}
 */
async function restoreMovedFiles({ tempRoot, moved }) {
	for (const { source, destination } of moved.reverse()) {
		await mkdir(dirname(source), { recursive: true });
		await rename(destination, source);
	}

	await rm(tempRoot, { recursive: true, force: true });
}

/**
 * @returns {Promise<void>}
 */
async function runPagefind() {
	const excludedPaths = verificationFilesExcludedFromIndex.map((file) => join(siteDirectory, file));
	const movedFiles = await temporarilyMoveFiles(excludedPaths);

	try {
		const pagefindBinary = await resolvePagefindBinary();
		const result = await runCommand(pagefindBinary, ["--site", siteDirectory]);
		const stdout = filterPagefindLog(result.stdout);
		const stderr = filterPagefindLog(result.stderr);

		if (stdout.trim().length > 0) {
			process.stdout.write(stdout.endsWith("\n") ? stdout : `${stdout}\n`);
		}
		if (stderr.trim().length > 0) {
			process.stderr.write(stderr.endsWith("\n") ? stderr : `${stderr}\n`);
		}

		process.exitCode = result.code;
	} finally {
		await restoreMovedFiles(movedFiles);
	}
}

/**
 * @param {string} command
 * @param {string[]} args
 * @returns {Promise<{ code: number; stdout: string; stderr: string }>}
 */
function runCommand(command, args) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			cwd: process.cwd(),
			env: process.env,
			stdio: ["ignore", "pipe", "pipe"],
			windowsHide: true,
		});
		let stdout = "";
		let stderr = "";

		child.stdout.setEncoding("utf8");
		child.stderr.setEncoding("utf8");
		child.stdout.on("data", (chunk) => {
			stdout += chunk;
		});
		child.stderr.on("data", (chunk) => {
			stderr += chunk;
		});
		child.on("error", reject);
		child.on("close", (code) => {
			resolve({ code: code ?? 1, stdout, stderr });
		});
	});
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	await runPagefind();
}
