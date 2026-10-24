import { describe, expect, it, vi } from "vitest";
import { loadSearchBatch } from "./search-results";

const healthy = { id: "healthy", data: async () => ({ url: "/healthy" }) };
const broken = {
	id: "broken",
	data: async () => {
		throw new Error("Missing fragment");
	},
};

describe("search batch recovery", () => {
	it.each([[healthy, broken], [broken]])(
		"attempts recovery once and does not propagate recovery failure: %j",
		async (...results) => {
			const onResults = vi.fn();
			const recover = vi.fn(async () => {
				throw new Error("Index unavailable");
			});
			await expect(loadSearchBatch({ results }, { onResults, recover })).resolves.toBe(false);
			expect(recover).toHaveBeenCalledOnce();
			if (results.some((result) => result.id === "healthy")) {
				expect(onResults).toHaveBeenLastCalledWith([
					{ id: "healthy", url: "/healthy", title: "", excerpt: "" },
				]);
			}
		},
	);

	it("does not recover complete or empty results", async () => {
		const recover = vi.fn();
		for (const results of [[healthy], []]) {
			await expect(loadSearchBatch({ results }, { recover })).resolves.toBe(true);
		}
		expect(recover).not.toHaveBeenCalled();
	});

	it("accepts successful recovery and allows a later batch to retry", async () => {
		const recover = vi
			.fn()
			.mockRejectedValueOnce(new Error("offline"))
			.mockResolvedValueOnce(undefined);
		await expect(loadSearchBatch({ results: [broken] }, { recover })).resolves.toBe(false);
		await expect(loadSearchBatch({ results: [broken] }, { recover })).resolves.toBe(true);
		expect(recover).toHaveBeenCalledTimes(2);
	});

	it("skips recovery for an obsolete query", async () => {
		const recover = vi.fn();
		await expect(
			loadSearchBatch({ results: [broken] }, { recover, isCurrent: () => false }),
		).resolves.toBe(false);
		expect(recover).not.toHaveBeenCalled();
	});
});
