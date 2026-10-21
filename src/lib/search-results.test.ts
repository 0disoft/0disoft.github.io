import { describe, expect, it, vi } from "vitest";
import { loadSearchResults, withSearchTimeout, type SearchResultItem } from "./search-results";

describe("search result loading", () => {
	it("finishes stalled detail requests and reports partial results", async () => {
		vi.useFakeTimers();
		try {
			const incomplete = vi.fn();
			const loading = loadSearchResults(
				{
					results: [
						{ id: "stuck", data: () => new Promise(() => {}) },
						{ id: "ok", data: async () => ({ url: "/ok" }) },
					],
				},
				{ onIncomplete: incomplete },
			);
			await vi.advanceTimersByTimeAsync(5_001);
			expect((await loading).map((result) => result.id)).toEqual(["ok"]);
			expect(incomplete).toHaveBeenCalledOnce();
			const timeout = withSearchTimeout(new Promise(() => {}));
			const rejected = expect(timeout).rejects.toThrow("Search timed out");
			await vi.advanceTimersByTimeAsync(8_001);
			await rejected;
		} finally {
			vi.useRealTimers();
		}
	});
	it("shows ready results while a higher-ranked detail is still pending", async () => {
		let resolveSlow!: (value: { url: string }) => void;
		const slow = new Promise<{ url: string }>((resolve) => {
			resolveSlow = resolve;
		});
		let firstResult!: () => void;
		const firstShown = new Promise<void>((resolve) => {
			firstResult = resolve;
		});
		const onResults = vi.fn((_results: SearchResultItem[]) => firstResult());
		const loading = loadSearchResults(
			{
				results: [
					{ id: "slow", data: () => slow },
					{ id: "fast", data: async () => ({ url: "/fast" }) },
				],
			},
			{ onResults },
		);
		await firstShown;
		expect(onResults.mock.calls[0][0].map((result) => result.id)).toEqual(["fast"]);
		resolveSlow({ url: "/slow" });
		expect((await loading).map((result) => result.id)).toEqual(["slow", "fast"]);
	});

	it("bounds active loads and stops queued work and updates for an obsolete query", async () => {
		const releases: Array<(value: { url: string }) => void> = [];
		let current = true;
		const onResults = vi.fn();
		const data = vi.fn(() => new Promise<{ url: string }>((resolve) => releases.push(resolve)));
		const loading = loadSearchResults(
			{
				results: Array.from({ length: 30 }, (_, index) => ({
					id: String(index),
					data,
				})),
			},
			{ isCurrent: () => current, onResults },
		);
		expect(data).toHaveBeenCalledTimes(6);
		current = false;
		for (const resolve of releases) resolve({ url: "/obsolete" });
		await expect(loading).resolves.toEqual([]);
		expect(data).toHaveBeenCalledTimes(6);
		expect(onResults).not.toHaveBeenCalled();
	});

	it("drains the queue without exceeding the active load bound", async () => {
		let active = 0,
			peak = 0;
		const data = async () => {
			active += 1;
			peak = Math.max(peak, active);
			await Promise.resolve();
			active -= 1;
			return { url: "/match" };
		};
		const results = await loadSearchResults({
			results: Array.from({ length: 30 }, (_, index) => ({ id: String(index), data })),
		});
		expect(peak).toBeLessThanOrEqual(6);
		expect(results).toHaveLength(30);
	});

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
