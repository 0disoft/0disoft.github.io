import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("$app/environment", () => ({ browser: true }));

describe("Google advertising loader", () => {
	const scripts: Array<{
		onload?: (() => void) | null;
		onerror?: (() => void) | null;
		dataset: Record<string, string>;
		remove: ReturnType<typeof vi.fn>;
	}> = [];
	beforeEach(() => {
		vi.resetModules();
		vi.useFakeTimers();
		scripts.length = 0;
		vi.stubGlobal("document", {
			getElementById: () => null,
			createElement: () => {
				const script = { dataset: {}, remove: vi.fn() };
				scripts.push(script);
				return script;
			},
			head: { append: vi.fn() },
		});
	});
	afterEach(() => {
		vi.useRealTimers();
		vi.unstubAllGlobals();
	});
	it.each(["error", "timeout"])(
		"retries after %s without starting duplicate loads",
		async (failure) => {
			const { loadGoogleAdScript } = await import("./site-ad-provider-google");
			const first = loadGoogleAdScript("ca-pub-1234567890123456");
			expect(loadGoogleAdScript("ca-pub-1234567890123456")).toBe(first);
			if (failure === "error") scripts[0].onerror?.();
			else await vi.advanceTimersByTimeAsync(10_000);
			expect(await first).toBe(false);
			expect(scripts[0].remove).toHaveBeenCalledOnce();
			const retry = loadGoogleAdScript("ca-pub-1234567890123456");
			expect(scripts).toHaveLength(2);
			scripts[1].onload?.();
			expect(await retry).toBe(true);
			expect(vi.getTimerCount()).toBe(0);
		},
	);
});
