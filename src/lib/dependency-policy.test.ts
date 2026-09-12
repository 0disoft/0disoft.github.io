import { describe, expect, it } from "vitest";
import { checkDependencyPolicies } from "./test-support/dependency-policy";

describe("dependency compatibility policy", () => {
	it("accepts newer compatible minima and equivalent ranges without exact string matching", () => {
		expect(
			checkDependencyPolicies([
				{ range: "^4.4.5", installed: "4.4.6", supported: "^4.4.4" },
				{ range: ">=4.4.5 <5", installed: "4.4.6", supported: "^4.4.4" },
			]),
		).toEqual([true, true]);
	});

	it("rejects pins, minor-only ranges, next-major upgrades and prereleases", () => {
		expect(
			checkDependencyPolicies([
				{ range: "4.4.6", installed: "4.4.6", supported: "^4.4.4" },
				{ range: "~4.4.6", installed: "4.4.6", supported: "^4.4.4" },
				{ range: "*", installed: "4.4.6", supported: "^4.4.4" },
				{ range: "^5", installed: "5.0.0", supported: "^4.4.4" },
				{ range: "^4.4.4", installed: "4.4.6-beta.1", supported: "^4.4.4" },
				{ range: "^4.5.0", installed: "4.4.6", supported: "^4.4.4" },
			]),
		).toEqual([false, false, false, false, false, false]);
	});
});
