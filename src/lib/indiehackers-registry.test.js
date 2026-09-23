import { describe, expect, it } from "vitest";
import {
	findIdentityCollisions,
	loadInventory,
	searchInventory,
	searchRequest,
	validateRegistry,
} from "../../scripts/indiehackers-registry.mjs";

describe("indiehackers research registry", () => {
	const inventory = loadInventory();
	it("links existing articles and untranslated drafts", () => {
		expect(inventory.registry.people.length).toBeGreaterThanOrEqual(8);
		expect(inventory.registry.products.length).toBeGreaterThanOrEqual(7);
		expect(inventory.articles.map((item) => item.id)).toEqual(
			expect.arrayContaining(["buttondown", "carrd", "simple-analytics", "bannerbear"]),
		);
	});
	it("matches Korean names, original names and former product names", () => {
		for (const query of ["Jon Yongfook", "존 용푹", "Previewmojo", "BANNERBEAR"]) {
			const result = searchInventory(inventory, query);
			expect(result.recommendation).toBe("already-covered-or-in-progress");
			expect(result.matches[0].coverage[0]).toMatchObject({ id: "bannerbear" });
			expect(["draft", "published"]).toContain(result.matches[0].coverage[0].status);
		}
	});
	it("matches normalized URLs but not shared hosts or lookalike domains", () => {
		expect(searchInventory(inventory, "https://www.bannerbear.com/blog/?q=abc").matches[0].id).toBe(
			"bannerbear",
		);
		expect(searchInventory(inventory, "http://www.jmduke.com/?ref=test#about").matches[0].id).toBe(
			"justin-duke",
		);
		for (const url of [
			"https://bannerbear.com.evil.test",
			"https://x.com/someone-else",
			"https://customer.carrd.co",
		])
			expect(searchInventory(inventory, url).recommendation).toBe("not-found");
	});
	it("suggests profile descendants without claiming a confirmed identity", () => {
		const result = searchInventory(inventory, "https://x.com/ajlkn/status/123");
		expect(result.recommendation).toBe("review-existing-candidate");
		expect(result.matches[0]).toMatchObject({ id: "aj-carrd", match: "possible" });
		expect(searchInventory(inventory, "https://x.com/ajlkn2/status/123").matches).toEqual([]);
	});
	it("flags spelling similarities for review instead of treating them as duplicates", () => {
		const result = searchInventory(inventory, "Jon Yongfok");
		expect(result.recommendation).toBe("review-existing-candidate");
		expect(result.matches[0].match).toBe("possible");
		expect(searchInventory(inventory, "Unregistered Founder").recommendation).toBe("not-found");
	});
	it("does not block follow-ups or a founder's new product", () => {
		const result = searchInventory(inventory, "Jason McCreary");
		expect(result.followUpAllowed).toBe(true);
		expect(result.matches[0].relatedProducts).toEqual(["laravel-shift"]);
	});
	it("reports in-progress research without an article", () => {
		const fixture = structuredClone(inventory);
		fixture.articles = [];
		fixture.registry.research.push({
			id: "bannerbear-update",
			personIds: ["jon-yongfook"],
			productIds: ["bannerbear"],
			status: "researching",
			lastResearchedAt: "2026-09-23",
			sources: [],
		});
		validateRegistry(fixture.registry);
		expect(searchInventory(fixture, "Bannerbear").recommendation).toBe(
			"already-covered-or-in-progress",
		);
	});
	it("rejects duplicate IDs and broken relationships", () => {
		const duplicate = structuredClone(inventory.registry);
		duplicate.people.push(duplicate.people[0]);
		expect(() => validateRegistry(duplicate)).toThrow(/duplicate/);
		const broken = structuredClone(inventory.registry);
		broken.products[0].personIds = ["missing-person"];
		expect(() => validateRegistry(broken)).toThrow(/Unknown person/);
	});
	it("requires manual review when distinct people share a name", () => {
		const fixture = structuredClone(inventory);
		fixture.registry.people.push({ id: "another-aj", name: "AJ", aliases: [], profiles: [] });
		validateRegistry(fixture.registry);
		expect(searchInventory(fixture, "AJ").recommendation).toBe("review-ambiguous-match");
		expect(findIdentityCollisions(fixture.registry)).toEqual(
			expect.arrayContaining([{ kind: "person-name", key: "aj", ids: ["aj-carrd", "another-aj"] }]),
		);
	});
	it("reports shared profile URLs as reviewable collisions", () => {
		const registry = structuredClone(inventory.registry);
		registry.people.push({
			id: "another-founder",
			name: "Another Founder",
			aliases: [],
			profiles: ["http://www.jmduke.com/?source=other"],
		});
		validateRegistry(registry);
		expect(findIdentityCollisions(registry)).toEqual(
			expect.arrayContaining([
				{ kind: "profile-url", key: "jmduke.com", ids: ["another-founder", "justin-duke"] },
			]),
		);
	});
	it("checks a candidate batch and marks repeated names or tracking URLs", () => {
		const response = searchRequest(inventory, {
			queries: [
				"Previewmojo",
				"Unregistered Founder",
				"unregistered-founder",
				"https://bannerbear.com/?ref=one",
				"bannerbear.com?ref=two",
			],
		});
		if (!("results" in response)) throw new Error("Expected batch results");
		const { results } = response;
		expect(results.map(({ recommendation, duplicateOf }) => [recommendation, duplicateOf])).toEqual(
			[
				["already-covered-or-in-progress", null],
				["not-found", null],
				["not-found", 1],
				["already-covered-or-in-progress", null],
				["already-covered-or-in-progress", 3],
			],
		);
		expect(results[0].matches[0].coverage[0].workflowStatus).toBe("awaiting-translation");
		expect(searchRequest(inventory, { query: "Previewmojo" })).toEqual(
			searchInventory(inventory, "Previewmojo"),
		);
	});
	it("rejects empty, oversized or malformed candidate batches", () => {
		for (const request of [
			{ queries: [] },
			{ queries: Array(401).fill("AJ") },
			{ queries: ["AJ", " "] },
			{ query: "AJ", queries: ["Carrd"] },
		]) {
			expect(() => searchRequest(inventory, request)).toThrow();
		}
	});
});
