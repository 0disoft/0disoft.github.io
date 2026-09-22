import { describe, expect, it } from "vitest";
import {
	loadInventory,
	searchInventory,
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
	});
});
