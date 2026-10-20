import { describe, expect, it } from "vitest";
import { loadSearchResults } from "./search-results";

describe("search result loading", () => {
	it("keeps healthy results when one detail request fails", async () => {
		await expect(
			loadSearchResults({
				results: [
					{
						id: "broken",
						data: async () => {
							throw new Error("offline");
						},
					},
					{
						id: "healthy",
						data: async () => ({
							url: "/healthy",
							meta: { title: "Healthy" },
							excerpt: "<mark>match</mark>",
						}),
					},
					{ id: "missing-url", data: async () => ({}) },
				],
			}),
		).resolves.toEqual([
			{ id: "healthy", url: "/healthy", title: "Healthy", excerpt: "<mark>match</mark>" },
		]);
	});

	it("preserves relevance order when details resolve out of order", async () => {
		let resolveFirst!: (value: { url: string }) => void;
		const first = new Promise<{ url: string }>((resolve) => {
			resolveFirst = resolve;
		});
		const loading = loadSearchResults({
			results: [
				{ id: "first", data: () => first },
				{ id: "second", data: async () => ({ url: "/second" }) },
			],
		});
		resolveFirst({ url: "/first" });
		expect((await loading).map((result) => result.id)).toEqual(["first", "second"]);
	});

	it("signals total failure so the caller can use its fallback", async () => {
		await expect(
			loadSearchResults({
				results: [
					{
						id: "broken",
						data: async () => {
							throw new Error("offline");
						},
					},
					{
						id: "also-broken",
						data: () => {
							throw new Error("missing fragment");
						},
					},
				],
			}),
		).rejects.toThrow("All search result details failed");
	});

	it("returns no matches without triggering the failure fallback", async () => {
		await expect(loadSearchResults({ results: [] })).resolves.toEqual([]);
		await expect(loadSearchResults({})).resolves.toEqual([]);
	});
});
