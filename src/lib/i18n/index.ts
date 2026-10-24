import { createStore, createTranslator } from "@0disoft/saylo-core/runtime";
import type { Translator } from "@0disoft/saylo-core";
import { createSayloSvelte } from "@0disoft/saylo-svelte";
import { initialCatalogs, baseLocale, timeZone } from "virtual:saylo";
import type { SiteLocale } from "$lib/site-locales";
import type { AppSchema } from "./generated";

export type SiteTranslate = Translator<AppSchema>["t"];
export type SiteMessageKey = keyof AppSchema;
export const { setSayloContext, getI18n } = createSayloSvelte<AppSchema>();

// Only immutable translators are shared. Each rendered layout owns its mutable store.
const translators = new Map<SiteLocale, Translator<AppSchema>>();
export function getSiteTranslator(locale: SiteLocale): Translator<AppSchema> {
	let translator = translators.get(locale);
	if (!translator) {
		translator = createTranslator<AppSchema>({
			locale,
			timeZone,
			baseCatalogs: initialCatalogs.filter((catalog) => catalog.locale === baseLocale),
			translations: initialCatalogs.filter(
				(catalog) => catalog.locale === locale && locale !== baseLocale,
			),
		});
		translators.set(locale, translator);
	}
	return translator;
}

export function createSiteI18n(locale: SiteLocale) {
	return createStore<AppSchema>({ locale, baseLocale, timeZone, catalogs: initialCatalogs });
}
