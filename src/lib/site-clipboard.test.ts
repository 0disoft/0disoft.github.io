import { afterEach, describe, expect, it, vi } from "vitest";
import { copyTextToClipboard } from "./site-clipboard";

afterEach(() => vi.unstubAllGlobals());

describe("clipboard fallback", () => {
	it("uses the native API without creating a temporary element", async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal("navigator", { clipboard: { writeText } });
		vi.stubGlobal("document", undefined);
		await copyTextToClipboard("native");
		expect(writeText).toHaveBeenCalledWith("native");
	});

	it.each(["success", "false", "throw", "select-throw"])(
		"cleans up and restores focus/selection on %s",
		async (outcome) => {
			vi.stubGlobal("navigator", {
				clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
			});
			const range = {};
			const selection = {
				rangeCount: 1,
				getRangeAt: () => ({ cloneRange: () => range }),
				removeAllRanges: vi.fn(),
				addRange: vi.fn(),
			};
			const dialog = { append: vi.fn() };
			const activeElement = { isConnected: true, focus: vi.fn(), closest: () => dialog };
			const textarea = {
				value: "",
				style: {},
				setAttribute: vi.fn(),
				remove: vi.fn(),
				select: vi.fn(() => {
					if (outcome === "select-throw") throw new Error("Selection failed");
				}),
			};
			vi.stubGlobal("document", {
				activeElement,
				getSelection: () => selection,
				createElement: () => textarea,
				execCommand: () => {
					if (outcome === "throw") throw new Error("Copy failed");
					return outcome !== "false";
				},
			});
			const operation = copyTextToClipboard("fallback");
			if (outcome === "success") await expect(operation).resolves.toBeUndefined();
			else await expect(operation).rejects.toThrow();
			expect(textarea.value).toBe("fallback");
			expect(dialog.append).toHaveBeenCalledWith(textarea);
			expect(textarea.remove).toHaveBeenCalledOnce();
			expect(activeElement.focus).toHaveBeenCalledWith({ preventScroll: true });
			expect(selection.removeAllRanges).toHaveBeenCalledOnce();
			expect(selection.addRange).toHaveBeenCalledWith(range);
		},
	);
});
