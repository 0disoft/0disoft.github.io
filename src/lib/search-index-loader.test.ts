import { afterEach, expect, it, vi } from "vitest";
import { createSearchIndexLoader } from "./search-index-loader";

afterEach(() => {
	vi.unstubAllGlobals();
	vi.useRealTimers();
});

it("shares a pending locale download across four queries and caches the parsed index", async () => {
	let release!: () => void;
	const pending = new Promise<void>((resolve) => {
		release = resolve;
	});
	const json = vi.fn(async () => []);
	const fetchIndex = vi.fn(async () => {
		await pending;
		return { ok: true, json };
	});
	vi.stubGlobal("fetch", fetchIndex);
	const load = createSearchIndexLoader();
	const queries = Array.from({ length: 4 }, () => load("en"));
	expect(queries.every((query) => query === queries[0])).toBe(true);
	expect(fetchIndex).toHaveBeenCalledOnce();
	release();
	await Promise.all(queries);
	await load("en");
	expect(fetchIndex).toHaveBeenCalledOnce();
	expect(json).toHaveBeenCalledOnce();
});

it("keeps indexes for different locales separate", async () => {
	const fetchIndex = vi.fn(async (_url: string) => ({ ok: true, json: async () => [] }));
	vi.stubGlobal("fetch", fetchIndex);
	const load = createSearchIndexLoader();
	await Promise.all([load("en"), load("ko"), load("en")]);
	expect(fetchIndex.mock.calls.map(([url]) => url)).toEqual([
		"/search-index/en.json",
		"/search-index/ko.json",
	]);
});

it("evicts a failed request so a later query can retry", async () => {
	const fetchIndex = vi
		.fn()
		.mockResolvedValueOnce({ ok: false })
		.mockResolvedValueOnce({ ok: true, json: async () => [] });
	vi.stubGlobal("fetch", fetchIndex);
	const load = createSearchIndexLoader();
	await expect(load("en")).rejects.toThrow("Search index unavailable");
	await expect(load("en")).resolves.toEqual([]);
	expect(fetchIndex).toHaveBeenCalledTimes(2);
});

it("aborts stalled I/O at the eight-second deadline and permits a later retry", async () => {
	vi.useFakeTimers();
	const fetchIndex = vi
		.fn()
		.mockImplementationOnce(() => new Promise(() => {}))
		.mockResolvedValueOnce({ ok: true, json: async () => [] });
	vi.stubGlobal("fetch", fetchIndex);
	const load = createSearchIndexLoader();
	const pending = load("en");
	const rejected = expect(pending).rejects.toThrow("Search timed out");
	await vi.advanceTimersByTimeAsync(8_000);
	await rejected;
	expect(fetchIndex.mock.calls[0][1].signal.aborted).toBe(true);
	await expect(load("en")).resolves.toEqual([]);
	expect(fetchIndex).toHaveBeenCalledTimes(2);
	expect(vi.getTimerCount()).toBe(0);
});
