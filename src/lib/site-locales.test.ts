import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	getPreferredClientLocale,
	readStoredSiteLocale,
	siteLocaleCookieName,
	siteLocaleStorageKey,
	writeStoredSiteLocale,
} from "./site-locales";

describe("saved locale recovery", () => {
	const getItem = vi.fn();
	const setItem = vi.fn();

	beforeEach(() => {
		getItem.mockReset().mockReturnValue(null);
		setItem.mockReset();
		vi.stubGlobal("window", { localStorage: { getItem, setItem } });
		vi.stubGlobal("navigator", { languages: ["fr-FR"] });
		vi.stubGlobal("document", { cookie: "" });
	});

	afterEach(() => vi.unstubAllGlobals());

	it.each(["%", "%E0%A4%A"])(
		"ignores malformed cookie %s and uses the browser language",
		(value) => {
			document.cookie = `${siteLocaleCookieName}=${value}`;
			expect(readStoredSiteLocale()).toBeNull();
			expect(getPreferredClientLocale()).toBe("fr");
		},
	);

	it("uses an encoded cookie when local storage is blocked", () => {
		getItem.mockImplementation(() => {
			throw new Error("Storage blocked");
		});
		document.cookie = `unrelated=value; ${siteLocaleCookieName}=%6B%6F`;
		expect(getPreferredClientLocale()).toBe("ko");
	});

	it("prefers valid local storage over a malformed cookie", () => {
		getItem.mockReturnValue("es");
		document.cookie = `${siteLocaleCookieName}=%`;
		expect(getPreferredClientLocale()).toBe("es");
	});

	it("uses the browser language when reading cookies is blocked", () => {
		vi.stubGlobal("document", {
			get cookie() {
				throw new Error("Cookies blocked");
			},
		});
		expect(getPreferredClientLocale()).toBe("fr");
	});

	it("allows language switching when writing cookies is blocked", () => {
		vi.stubGlobal("document", {
			set cookie(_value: string) {
				throw new Error("Cookies blocked");
			},
		});
		expect(() => writeStoredSiteLocale("ko")).not.toThrow();
		expect(setItem).toHaveBeenCalledWith(siteLocaleStorageKey, "ko");
	});

	it("still saves a cookie when local storage is blocked", () => {
		setItem.mockImplementation(() => {
			throw new Error("Storage blocked");
		});
		writeStoredSiteLocale("ko");
		expect(document.cookie).toContain(`${siteLocaleCookieName}=ko; path=/;`);
	});

	it.each([
		["%", "/fr/blog?query=test#post"],
		["%E0%A4%A", "/fr/blog?query=test#post"],
		["%6B%6F", "/ko/blog?query=test#post"],
		["blocked", "/fr/blog?query=test#post"],
	])("recovers from cookie %s before hydration too", (value, expectedPath) => {
		const html = readFileSync(new URL("../app.html", import.meta.url), "utf8");
		const bootstrapScript = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
		if (!bootstrapScript) throw new Error("Locale bootstrap script missing");
		const replace = vi.fn();
		runInNewContext(bootstrapScript, {
			window: {
				localStorage: { getItem },
				location: { pathname: "/blog", search: "?query=test", hash: "#post", replace },
			},
			document: {
				get cookie() {
					if (value === "blocked") throw new Error("Cookies blocked");
					return `${siteLocaleCookieName}=${value}`;
				},
			},
			navigator: { languages: ["fr-FR"] },
		});
		expect(replace).toHaveBeenCalledExactlyOnceWith(expectedPath);
	});
});
