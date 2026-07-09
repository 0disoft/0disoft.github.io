import { describe, expect, it } from "vitest";
import { filterPagefindLog } from "../../scripts/pagefind-index.mjs";

describe("pagefind index script", () => {
	it("filters known unsupported stemming notices without hiding other output", () => {
		const output = [
			"Running Pagefind v1.5.2 (Extended)",
			"Note: Pagefind doesn't support stemming for the language ko. ",
			"Search will still work, but will not match across root words.",
			"Note: Pagefind doesn't support stemming for the language zh. ",
			"Search will still work, but will not match across root words.",
			"1 page found without an <html> element.",
			"Finished in 0.586 seconds",
		].join("\n");

		expect(filterPagefindLog(output)).toBe(
			[
				"Running Pagefind v1.5.2 (Extended)",
				"1 page found without an <html> element.",
				"Finished in 0.586 seconds",
			].join("\n"),
		);
	});
});
