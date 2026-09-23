import { readFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * @typedef {{id: string, name: string, aliases: string[], profiles: string[]}} Person
 * @typedef {{id: string, name: string, aliases: string[], domains: string[], personIds: string[]}} Product
 * @typedef {{personIds: string[], productIds: string[]}} Links
 * @typedef {Links & {id: string, status: string, lastResearchedAt: string, sources: string[]}} Research
 * @typedef {{schemaVersion: number, people: Person[], products: Product[], research: Research[]}} Registry
 * @typedef {Links & {id: string, status: string, workflowStatus: string|null, path: string}} Article
 * @typedef {{registry: Registry, articles: Article[]}} Inventory
 */

export const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const states = new Set(["planned", "researching", "researched", "deferred"]);
const locales = ["en", "es", "fr", "hi", "ko", "zh"];
/** @param {string} value */
const normalize = (value) =>
	value
		.normalize("NFKD")
		.replace(/\p{M}/gu, "")
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]/gu, "");
/** @param {string} value */
const host = (value) => value.toLowerCase().replace(/^www\./, "");

/** @param {string} value */
function urlKey(value) {
	const url = new URL(value);
	if (!["https:", "http:"].includes(url.protocol) || url.username || url.password)
		throw new Error(`Invalid public URL: ${value}`);
	return `${host(url.hostname)}${url.pathname.replace(/\/+$/, "")}`;
}

/** @param {string} query */
function queryUrl(query) {
	if (!/^https?:\/\//i.test(query) && !/^[\w.-]+\.[a-z]{2,}(?:[/?#]|$)/i.test(query))
		return undefined;
	try {
		const url = new URL(/^https?:\/\//i.test(query) ? query : `https://${query}`);
		urlKey(url.href);
		return url;
	} catch {
		throw new Error("Invalid query URL");
	}
}

/** @param {unknown} value @param {string} label */
function requireList(value, label, allowEmpty = false) {
	if (
		!Array.isArray(value) ||
		(!allowEmpty && !value.length) ||
		value.some((v) => typeof v !== "string" || !v.trim()) ||
		new Set(value).size !== value.length
	) {
		throw new Error(`Invalid ${label}`);
	}
}

/** @param {Registry} registry */
export function validateRegistry(registry) {
	if (registry.schemaVersion !== 1) throw new Error("Unsupported registry schemaVersion");
	/** @type {Record<string, Set<string>>} */
	const indexes = {};
	for (const kind of /** @type {const} */ (["people", "products", "research"])) {
		if (!Array.isArray(registry[kind])) throw new Error(`Missing ${kind}`);
		indexes[kind] = new Set();
		for (const item of registry[kind]) {
			if (
				!item ||
				typeof item.id !== "string" ||
				!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) ||
				indexes[kind].has(item.id)
			)
				throw new Error(`Invalid or duplicate ${kind} ID: ${item?.id}`);
			indexes[kind].add(item.id);
			if (kind !== "research") {
				const named = /** @type {Person|Product} */ (item);
				if (typeof named.name !== "string" || !named.name.trim())
					throw new Error(`Missing name: ${item.id}`);
				requireList(named.aliases, `${item.id} aliases`, true);
			}
		}
	}
	for (const person of registry.people) {
		requireList(person.profiles, `${person.id} profiles`, true);
		person.profiles.forEach(urlKey);
	}
	const domains = new Set();
	for (const product of registry.products) {
		requireList(product.domains, `${product.id} domains`);
		for (const domain of product.domains) {
			if (
				!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(domain) ||
				domain !== host(domain) ||
				domains.has(domain)
			)
				throw new Error(`Invalid or duplicate domain: ${domain}`);
			domains.add(domain);
		}
		requireList(product.personIds, `${product.id} personIds`);
		if (product.personIds.some((id) => !indexes.people.has(id)))
			throw new Error(`Unknown person in ${product.id}`);
	}
	for (const entry of registry.research) {
		validateLinks(entry, registry, `research/${entry.id}`);
		if (!states.has(entry.status)) throw new Error(`Invalid research status: ${entry.id}`);
		if (
			!/^\d{4}-\d{2}-\d{2}$/.test(entry.lastResearchedAt) ||
			new Date(entry.lastResearchedAt).toISOString().slice(0, 10) !== entry.lastResearchedAt
		)
			throw new Error(`Invalid research date: ${entry.id}`);
		requireList(entry.sources, `${entry.id} sources`, true);
		entry.sources.forEach(urlKey);
	}
	return registry;
}

/** @param {Registry} registry */
export function findIdentityCollisions(registry) {
	/** @type {Array<{kind: string, key: string, ids: string[]}>} */
	const collisions = [];
	const groups = [
		{
			kind: "person-name",
			entries: registry.people.map((entry) => ({
				id: entry.id,
				keys: [entry.name, ...entry.aliases].map(normalize),
			})),
		},
		{
			kind: "product-name",
			entries: registry.products.map((entry) => ({
				id: entry.id,
				keys: [entry.name, ...entry.aliases].map(normalize),
			})),
		},
		{
			kind: "profile-url",
			entries: registry.people.map((entry) => ({
				id: entry.id,
				keys: entry.profiles.map(urlKey),
			})),
		},
	];
	for (const { kind, entries } of groups) {
		/** @type {Map<string, Set<string>>} */
		const owners = new Map();
		for (const entry of entries)
			for (const key of new Set(entry.keys)) {
				let ids = owners.get(key);
				if (!ids) owners.set(key, (ids = new Set()));
				ids.add(entry.id);
			}
		for (const [key, ids] of owners)
			if (ids.size > 1) collisions.push({ kind, key, ids: [...ids].sort() });
	}
	return collisions.sort((a, b) => a.kind.localeCompare(b.kind) || a.key.localeCompare(b.key));
}

/** @param {Links} metadata @param {Registry} registry @param {string} path */
function validateLinks(metadata, registry, path) {
	for (const [field, collection] of /** @type {const} */ ([
		["personIds", "people"],
		["productIds", "products"],
	])) {
		requireList(metadata[field], `${path} ${field}`);
		if (metadata[field].some((id) => !registry[collection].some((entry) => entry.id === id)))
			throw new Error(`Unknown ${field} in ${path}`);
	}
}

export function loadInventory(root = repositoryRoot) {
	const registry = validateRegistry(
		JSON.parse(readFileSync(resolve(root, "research/indiehackers.json"), "utf8")),
	);
	/** @type {Article[]} */
	const articles = [];
	for (const [directory, file, status] of [
		["src/content/indiehackers/posts", "meta.json", "published"],
		["drafts/indiehackers", "draft.json", "draft"],
	]) {
		const base = resolve(root, directory);
		if (!existsSync(base)) throw new Error(`Missing content directory: ${directory}`);
		for (const entry of readdirSync(base, { withFileTypes: true })) {
			if (!entry.isDirectory()) continue;
			const path = resolve(base, entry.name, file);
			if (!existsSync(path)) continue;
			const metadata = JSON.parse(readFileSync(path, "utf8"));
			validateLinks(metadata, registry, path);
			if (metadata.id !== entry.name) throw new Error(`Article ID and directory differ: ${path}`);
			if (articles.some((article) => article.id === metadata.id))
				throw new Error(`Article exists in both draft and published paths: ${metadata.id}`);
			for (const locale of status === "published" ? locales : ["ko"]) {
				if (!existsSync(resolve(base, entry.name, `${locale}.md`)))
					throw new Error(`Missing ${locale} content: ${path}`);
			}
			articles.push({
				id: metadata.id,
				personIds: metadata.personIds,
				productIds: metadata.productIds,
				status,
				workflowStatus: metadata.status ?? null,
				path: relative(root, path).replaceAll("\\", "/"),
			});
		}
	}
	return { registry, articles: articles.sort((a, b) => a.id.localeCompare(b.id)) };
}

/** @param {string} a @param {string} b */
function distance(a, b) {
	let row = Array.from({ length: b.length + 1 }, (_, i) => i);
	for (let i = 0; i < a.length; i++) {
		const next = [i + 1];
		for (let j = 0; j < b.length; j++)
			next.push(Math.min(next[j] + 1, row[j + 1] + 1, row[j] + (a[i] === b[j] ? 0 : 1)));
		row = next;
	}
	return row[b.length];
}

/** @param {Inventory} inventory @param {unknown} query */
export function searchInventory(inventory, query) {
	if (typeof query !== "string" || !query.trim() || query.length > 500)
		throw new Error("Query must contain 1-500 characters");
	const { registry, articles } = inventory;
	const key = normalize(query);
	if (!key) throw new Error("Query must contain a name or URL");
	const url = queryUrl(query);
	const matches = [];
	for (const [kind, entries] of /** @type {Array<["person"|"product", Array<Person|Product>]>} */ ([
		["person", registry.people],
		["product", registry.products],
	])) {
		for (const entry of entries) {
			const names = [entry.id, entry.name, ...entry.aliases];
			const exactUrl =
				url &&
				("profiles" in entry
					? entry.profiles.some((profile) => urlKey(profile) === urlKey(url.href))
					: entry.domains.includes(host(url.hostname)));
			const relatedProfileUrl =
				url &&
				"profiles" in entry &&
				entry.profiles.some((profile) => urlKey(url.href).startsWith(`${urlKey(profile)}/`));
			const exactName = !url && names.some((name) => normalize(name) === key);
			const possible =
				!url &&
				key.length >= 3 &&
				names.some((name) => {
					const candidate = normalize(name);
					return (
						candidate.includes(key) ||
						(Math.min(candidate.length, key.length) >= 5 &&
							distance(candidate, key) <= Math.floor(Math.max(candidate.length, key.length) * 0.2))
					);
				});
			if (!exactUrl && !exactName && !possible && !relatedProfileUrl) continue;
			const field = kind === "person" ? "personIds" : "productIds";
			const coverage = articles.filter((article) => article[field].includes(entry.id));
			const research = registry.research.filter((item) => item[field].includes(entry.id));
			matches.push({
				kind,
				id: entry.id,
				name: entry.name,
				match: exactUrl ? "exact-url" : exactName ? "exact-name" : "possible",
				coverage,
				research,
				relatedProducts: registry.products
					.filter((product) =>
						kind === "person" ? product.personIds.includes(entry.id) : product.id === entry.id,
					)
					.map((product) => product.id),
			});
		}
	}
	const exact = matches.filter((match) => match.match !== "possible");
	const known = exact.some(
		(match) => match.coverage.length || match.research.some((item) => item.status !== "deferred"),
	);
	return {
		query,
		recommendation:
			exact.length > 1
				? "review-ambiguous-match"
				: known
					? "already-covered-or-in-progress"
					: matches.length
						? "review-existing-candidate"
						: "not-found",
		followUpAllowed: true,
		matches,
	};
}

/** @param {Inventory} inventory @param {unknown} request */
export function searchRequest(inventory, request) {
	if (!request || typeof request !== "object" || Array.isArray(request))
		throw new Error("Request must contain query or queries");
	if ("query" in request && !("queries" in request))
		return searchInventory(inventory, request.query);
	if (!("queries" in request) || "query" in request || !Array.isArray(request.queries))
		throw new Error("Request must contain query or queries");
	if (!request.queries.length || request.queries.length > 400)
		throw new Error("queries must contain 1-400 entries");
	const seen = new Map();
	return {
		results: request.queries.map((query, index) => {
			const result = searchInventory(inventory, query);
			const url = queryUrl(query);
			const key = url ? `url:${urlKey(url.href)}` : `name:${normalize(query)}`;
			const duplicateOf = seen.get(key);
			if (duplicateOf === undefined) seen.set(key, index);
			return { index, duplicateOf: duplicateOf ?? null, ...result };
		}),
	};
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
	try {
		const args = process.argv.slice(2);
		const inventory = loadInventory();
		if (!args.length || (args.length === 1 && args[0] === "--check")) {
			console.log(
				JSON.stringify(
					{
						people: inventory.registry.people.length,
						products: inventory.registry.products.length,
						research: inventory.registry.research,
						identityCollisions: findIdentityCollisions(inventory.registry),
						articles: inventory.articles,
						publicationMeaning: "Present in repository content, not proof of deployment",
					},
					null,
					2,
				),
			);
		} else if (args.length === 2 && args[0] === "--query") {
			console.log(JSON.stringify(searchInventory(inventory, args[1]), null, 2));
		} else if (args.length === 2 && args[0] === "--request") {
			console.log(
				JSON.stringify(
					searchRequest(inventory, JSON.parse(readFileSync(args[1], "utf8"))),
					null,
					2,
				),
			);
		} else
			throw new Error(
				"Usage: indiehackers-registry.mjs [--check | --query name-or-url | --request query.json]",
			);
	} catch (error) {
		console.error(error instanceof Error ? error.message : String(error));
		process.exitCode = 1;
	}
}
