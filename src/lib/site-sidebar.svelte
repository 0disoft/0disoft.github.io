<script lang="ts">
	import type { Component } from "svelte";
	import { tick } from "svelte";
	import {
		BookOpenText,
		Briefcase,
		Contact,
		FileText,
		Heart,
		Map,
		Monitor,
		Moon,
		Settings,
		Sun,
		X,
	} from "@lucide/svelte";
	import { resetMode, setMode, userPrefersMode } from "mode-watcher";
	import * as m from "$lib/paraglide/messages";
	import { getLocale, setLocale } from "$lib/paraglide/runtime";
	import { birdMarkPath } from "$lib/site-assets";
	import {
		getLocalizedLanguageLabel,
		getLocalizedNavigationLabel,
		toDisplayLocale,
		withShortcut,
	} from "$lib/site-labels";
	import {
		isSiteLocale,
		languageOptions,
		localizeSitePathname,
		writeStoredSiteLocale,
	} from "$lib/site-locales";
	import {
		defaultSettingsTab,
		languageShortcutByKey,
		languageShortcutByLocale,
		navigationPathByShortcut,
		navigationShortcutByHref,
		themeShortcutByKey,
		type SettingsTab,
		type ThemeChoice,
	} from "$lib/site-settings-model";
	import {
		getKeyboardFocusIntent,
		isEditableKeyboardTarget,
		isModifiedKeyEvent,
		resolveAdjacentFocusIndex,
		resolveBoundaryFocusIndex,
	} from "$lib/site-keyboard";
	import {
		isSiteAnalyticsConfigured,
		readStoredAnalyticsConsent,
		writeStoredAnalyticsConsent,
	} from "$lib/site-analytics";
	import {
		readStoredAdvertisingConsent,
		writeStoredAdvertisingConsent,
	} from "$lib/site-advertising-consent";
	import { isSiteAdvertisingConfigured } from "$lib/site-advertising";
	import type { SiteLocale } from "$lib/site-locales";
	import type { SiteSectionPath } from "$lib/site-navigation";
	import { siteProfile } from "$lib/site-profile";
	import IconButton from "$lib/ui/icon-button.svelte";
	import SidebarAction from "$lib/ui/sidebar-action.svelte";

	let { activePath = "/" }: { activePath?: SiteSectionPath | "/" } = $props();
	let settingsDialog = $state<HTMLDialogElement>();
	let activeSettingsTab = $state<SettingsTab>(defaultSettingsTab);
	const displayLocale = $derived(toDisplayLocale(getLocale()));
	const selectedTheme = $derived(userPrefersMode.current);
	const analyticsConfigured = isSiteAnalyticsConfigured();
	const settingsLabel = $derived(m.settings_trigger_label({}, { locale: displayLocale }));
	const sponsorLabel = $derived(m.sponsor_label({}, { locale: displayLocale }));
	const advertisingConfigured = isSiteAdvertisingConfigured();

	const navigationIconByHref = {
		"/manifesto": FileText,
		"/blog": BookOpenText,
		"/works": Briefcase,
		"/roadmap": Map,
		"/contact": Contact,
	} as const satisfies Record<SiteSectionPath, Component>;

	function getSettingsLocale(): SiteLocale {
		const locale = getLocale();

		return isSiteLocale(locale) ? locale : "en";
	}

	let selectedLocale = $state<SiteLocale>(getSettingsLocale());
	let analyticsConsent = $state(false);
	let advertisingConsent = $state(false);

	function isSettingsDialogOpen(): boolean {
		return settingsDialog?.open === true;
	}

	function focusSettingsControl(id: string) {
		settingsDialog?.querySelector<HTMLElement>(`[data-settings-control="${id}"]`)?.focus();
	}

	function focusSettingsTab(tab: SettingsTab) {
		focusSettingsControl(`${tab}-tab`);
	}

	function getSettingsFocusTargets(): HTMLElement[] {
		return Array.from(
			settingsDialog?.querySelectorAll<HTMLElement>("[data-settings-keyboard-target]") ?? [],
		);
	}

	function focusAdjacentSettingsControl(direction: 1 | -1) {
		const targets = getSettingsFocusTargets();

		if (targets.length === 0) {
			return;
		}

		const nextIndex = resolveAdjacentFocusIndex(
			targets.length,
			targets.indexOf(document.activeElement as HTMLElement),
			direction,
			{ missing: "by-direction" },
		);

		if (nextIndex !== null) {
			targets[nextIndex]?.focus();
		}
	}

	function focusBoundarySettingsControl(boundary: "first" | "last") {
		const targets = getSettingsFocusTargets();
		const targetIndex = resolveBoundaryFocusIndex(targets.length, boundary);
		const target = targetIndex === null ? undefined : targets[targetIndex];

		target?.focus();
	}

	function getSidebarFocusTargets(sidebar: HTMLElement): HTMLElement[] {
		return Array.from(sidebar.querySelectorAll<HTMLElement>("[data-sidebar-keyboard-target]"));
	}

	function focusAdjacentSidebarControl(direction: 1 | -1, sidebar: HTMLElement) {
		const targets = getSidebarFocusTargets(sidebar);

		if (targets.length === 0) {
			return;
		}

		const nextIndex = resolveAdjacentFocusIndex(
			targets.length,
			targets.indexOf(document.activeElement as HTMLElement),
			direction,
			{ missing: "by-direction" },
		);

		if (nextIndex !== null) {
			targets[nextIndex]?.focus();
		}
	}

	function focusBoundarySidebarControl(boundary: "first" | "last", sidebar: HTMLElement) {
		const targets = getSidebarFocusTargets(sidebar);
		const targetIndex = resolveBoundaryFocusIndex(targets.length, boundary);
		const target = targetIndex === null ? undefined : targets[targetIndex];

		target?.focus();
	}

	async function openSettingsDialog() {
		activeSettingsTab = defaultSettingsTab;
		analyticsConsent = readStoredAnalyticsConsent();
		advertisingConsent = readStoredAdvertisingConsent();
		settingsDialog?.showModal();
		await tick();
		focusSettingsTab("theme");
	}

	async function selectSettingsTab(tab: SettingsTab) {
		activeSettingsTab = tab;
		await tick();
		focusSettingsTab(tab);
	}

	function closeSettingsDialog() {
		settingsDialog?.close();
	}

	function closeSettingsDialogOnBackdrop(event: MouseEvent) {
		if (event.target === settingsDialog) {
			closeSettingsDialog();
		}
	}

	function chooseTheme(theme: ThemeChoice) {
		if (theme === "system") {
			resetMode();
		} else {
			setMode(theme);
		}

		focusSettingsControl(`theme-${theme}`);
	}

	function chooseLocale(locale: SiteLocale) {
		selectedLocale = locale;
		writeStoredSiteLocale(locale);
		setLocale(locale, { reload: false });

		const nextPathname = localizeSitePathname(window.location.pathname, locale);
		window.location.assign(`${nextPathname}${window.location.search}${window.location.hash}`);
	}

	function chooseAnalyticsConsent(enabled: boolean) {
		analyticsConsent = enabled;
		writeStoredAnalyticsConsent(enabled);
		focusSettingsControl("privacy-analytics");
	}

	function chooseAdvertisingConsent(enabled: boolean) {
		advertisingConsent = enabled;
		writeStoredAdvertisingConsent(enabled);
		focusSettingsControl("privacy-advertising");
	}

	function navigateToSection(path: SiteSectionPath) {
		window.location.assign(localizeSitePathname(path, getSettingsLocale()));
	}

	function openSponsorLink() {
		window.open(siteProfile.links[0].href, "_blank", "noopener,noreferrer");
	}

	function handleGlobalKeydown(event: KeyboardEvent) {
		if (event.defaultPrevented || isModifiedKeyEvent(event) || isEditableKeyboardTarget(event.target)) {
			return;
		}

		if (isSettingsDialogOpen()) {
			return;
		}

		const key = event.key.toLowerCase();
		const navigationPath = navigationPathByShortcut[key];

		if (key === "s") {
			event.preventDefault();
			void openSettingsDialog();
			return;
		}

		if (key === "p") {
			event.preventDefault();
			openSponsorLink();
			return;
		}

		if (navigationPath) {
			event.preventDefault();
			navigateToSection(navigationPath);
		}
	}

	function handleSettingsDialogKeydown(event: KeyboardEvent) {
		if (event.defaultPrevented || isModifiedKeyEvent(event) || isEditableKeyboardTarget(event.target)) {
			return;
		}

		const key = event.key.toLowerCase();

		const focusIntent = getKeyboardFocusIntent(key);

		if (focusIntent) {
			event.preventDefault();
			if (focusIntent.kind === "adjacent") {
				focusAdjacentSettingsControl(focusIntent.direction);
			} else {
				focusBoundarySettingsControl(focusIntent.boundary);
			}
			return;
		}

		if (key === "t") {
			event.preventDefault();
			void selectSettingsTab("theme");
			return;
		}

		if (key === "l") {
			event.preventDefault();
			void selectSettingsTab("language");
			return;
		}

		if (key === "p") {
			event.preventDefault();
			void selectSettingsTab("privacy");
			return;
		}

		if (activeSettingsTab === "theme" && key in themeShortcutByKey) {
			event.preventDefault();
			chooseTheme(themeShortcutByKey[key as keyof typeof themeShortcutByKey]);
			return;
		}

		if (activeSettingsTab === "language" && key in languageShortcutByKey) {
			event.preventDefault();
			chooseLocale(languageShortcutByKey[key as keyof typeof languageShortcutByKey]);
			return;
		}

		if (activeSettingsTab === "privacy" && key === "a") {
			event.preventDefault();
			chooseAnalyticsConsent(!analyticsConsent);
			return;
		}

		if (activeSettingsTab === "privacy" && key === "d" && advertisingConfigured) {
			event.preventDefault();
			chooseAdvertisingConsent(!advertisingConsent);
		}
	}

	function handleSidebarKeydown(event: KeyboardEvent) {
		if (event.defaultPrevented || isModifiedKeyEvent(event) || isEditableKeyboardTarget(event.target)) {
			return;
		}

		if (!(event.currentTarget instanceof HTMLElement)) {
			return;
		}

		const sidebar = event.currentTarget.closest<HTMLElement>(".site-sidebar");

		if (!(sidebar instanceof HTMLElement)) {
			return;
		}

		const key = event.key.toLowerCase();

		const focusIntent = getKeyboardFocusIntent(key);

		if (focusIntent) {
			event.preventDefault();
			if (focusIntent.kind === "adjacent") {
				focusAdjacentSidebarControl(focusIntent.direction, sidebar);
			} else {
				focusBoundarySidebarControl(focusIntent.boundary, sidebar);
			}
		}
	}
</script>

<svelte:window onkeydown={handleGlobalKeydown} />

<aside
	class="site-sidebar"
	aria-label={m.primary_navigation_label({}, { locale: displayLocale })}
>
	<a
		class="brand-link"
		href={localizeSitePathname("/", selectedLocale)}
		aria-label={`${siteProfile.name} ${m.home_label({}, { locale: displayLocale })}`}
		data-sidebar-keyboard-target
		onkeydown={handleSidebarKeydown}
	>
		<img src={birdMarkPath} alt="" />
		<span>{siteProfile.name}</span>
	</a>

	<nav aria-label={m.primary_navigation_label({}, { locale: displayLocale })}>
		<ul class="menu-list">
			{#each siteProfile.navigation as item (item.href)}
				{@const Icon = navigationIconByHref[item.href]}
				{@const label = getLocalizedNavigationLabel(item.href, displayLocale)}
				{@const shortcut = navigationShortcutByHref[item.href]}
				<li>
					<SidebarAction
						icon={Icon}
						label={label}
						href={localizeSitePathname(item.href, selectedLocale)}
						current={item.href === activePath}
						shortcut={shortcut}
						title={withShortcut(label, shortcut)}
						onkeydown={handleSidebarKeydown}
					/>
				</li>
			{/each}
		</ul>
	</nav>

	<section class="settings-panel" aria-label={settingsLabel}>
		<SidebarAction
			icon={Settings}
			label={settingsLabel}
			shortcut="S"
			ariaLabel={withShortcut(settingsLabel, "S")}
			title={withShortcut(settingsLabel, "S")}
			onclick={openSettingsDialog}
			onkeydown={handleSidebarKeydown}
		/>

		{#each siteProfile.links as link (link.href)}
			<SidebarAction
				icon={Heart}
				label={sponsorLabel}
				href={link.href}
				shortcut="P"
				title={withShortcut(sponsorLabel, "P")}
				rel="noopener noreferrer"
				target="_blank"
				tone="sponsor"
				onkeydown={handleSidebarKeydown}
			/>
		{/each}
	</section>
</aside>

<dialog
	bind:this={settingsDialog}
	class="settings-dialog"
	aria-labelledby="settings-dialog-title"
	onkeydown={handleSettingsDialogKeydown}
	onclick={closeSettingsDialogOnBackdrop}
>
	<div class="settings-dialog-panel">
		<header class="settings-dialog-header">
			<h2 id="settings-dialog-title">{m.settings_dialog_title({}, { locale: displayLocale })}</h2>
			<IconButton
				icon={X}
				label={m.close_label({}, { locale: displayLocale })}
				title={m.close_label({}, { locale: displayLocale })}
				settingsKeyboardTarget
				onclick={closeSettingsDialog}
			/>
		</header>

		<div
			class="settings-tabs"
			role="tablist"
			aria-label={m.settings_sections_label({}, { locale: displayLocale })}
		>
			<button
				type="button"
				role="tab"
				id="settings-theme-tab"
				aria-controls="settings-theme-panel"
				aria-selected={activeSettingsTab === "theme"}
				aria-keyshortcuts="T"
				class:active={activeSettingsTab === "theme"}
				data-settings-control="theme-tab"
				data-settings-keyboard-target
				title={withShortcut(m.settings_theme_tab({}, { locale: displayLocale }), "T")}
				onclick={() => selectSettingsTab("theme")}
			>
				{m.settings_theme_tab({}, { locale: displayLocale })}
			</button>
			<button
				type="button"
				role="tab"
				id="settings-language-tab"
				aria-controls="settings-language-panel"
				aria-selected={activeSettingsTab === "language"}
				aria-keyshortcuts="L"
				class:active={activeSettingsTab === "language"}
				data-settings-control="language-tab"
				data-settings-keyboard-target
				title={withShortcut(m.settings_language_tab({}, { locale: displayLocale }), "L")}
				onclick={() => selectSettingsTab("language")}
			>
				{m.settings_language_tab({}, { locale: displayLocale })}
			</button>
			<button
				type="button"
				role="tab"
				id="settings-privacy-tab"
				aria-controls="settings-privacy-panel"
				aria-selected={activeSettingsTab === "privacy"}
				aria-keyshortcuts="P"
				class:active={activeSettingsTab === "privacy"}
				data-settings-control="privacy-tab"
				data-settings-keyboard-target
				title={withShortcut(m.settings_privacy_tab({}, { locale: displayLocale }), "P")}
				onclick={() => selectSettingsTab("privacy")}
			>
				{m.settings_privacy_tab({}, { locale: displayLocale })}
			</button>
		</div>

		{#if activeSettingsTab === "theme"}
			<div
				id="settings-theme-panel"
				class="settings-tab-panel"
				role="tabpanel"
				aria-labelledby="settings-theme-tab"
			>
				<div class="choice-grid theme-grid mode-controls">
					<button
						type="button"
						class:active={selectedTheme === "light"}
						aria-pressed={selectedTheme === "light"}
						aria-keyshortcuts="I"
						data-settings-control="theme-light"
						data-settings-keyboard-target
						title={withShortcut(m.theme_light({}, { locale: displayLocale }), "I")}
						onclick={() => chooseTheme("light")}
					>
						<Sun size={17} strokeWidth={2.15} aria-hidden="true" />
						<span>{m.theme_light({}, { locale: displayLocale })}</span>
					</button>
					<button
						type="button"
						class:active={selectedTheme === "dark"}
						aria-pressed={selectedTheme === "dark"}
						aria-keyshortcuts="D"
						data-settings-control="theme-dark"
						data-settings-keyboard-target
						title={withShortcut(m.theme_dark({}, { locale: displayLocale }), "D")}
						onclick={() => chooseTheme("dark")}
					>
						<Moon size={17} strokeWidth={2.15} aria-hidden="true" />
						<span>{m.theme_dark({}, { locale: displayLocale })}</span>
					</button>
					<button
						type="button"
						class:active={selectedTheme === "system"}
						aria-pressed={selectedTheme === "system"}
						aria-keyshortcuts="S"
						data-settings-control="theme-system"
						data-settings-keyboard-target
						title={withShortcut(m.theme_system({}, { locale: displayLocale }), "S")}
						onclick={() => chooseTheme("system")}
					>
						<Monitor size={17} strokeWidth={2.15} aria-hidden="true" />
						<span>{m.theme_system({}, { locale: displayLocale })}</span>
					</button>
				</div>
			</div>
		{:else if activeSettingsTab === "language"}
			<div
				id="settings-language-panel"
				class="settings-tab-panel"
				role="tabpanel"
				aria-labelledby="settings-language-tab"
			>
				<div class="choice-grid language-grid">
					{#each languageOptions as language (language.locale)}
						{@const languageLabel = getLocalizedLanguageLabel(language.locale, displayLocale)}
						{@const languageShortcut = languageShortcutByLocale[language.locale]}
						<button
							type="button"
							class:active={language.locale === selectedLocale}
							aria-pressed={language.locale === selectedLocale}
							aria-keyshortcuts={languageShortcut}
							data-settings-control={`language-${language.locale}`}
							data-settings-keyboard-target
							title={withShortcut(languageLabel, languageShortcut)}
							onclick={() => chooseLocale(language.locale)}
						>
							<span>{languageLabel}</span>
						</button>
					{/each}
				</div>
			</div>
		{:else}
			<div
				id="settings-privacy-panel"
				class="settings-tab-panel"
				role="tabpanel"
				aria-labelledby="settings-privacy-tab"
			>
				<div class="privacy-panel">
					<div class="privacy-row">
						<div class="privacy-copy">
							<span>{m.settings_analytics_label({}, { locale: displayLocale })}</span>
							<p>
								{analyticsConfigured
									? m.settings_analytics_description({}, { locale: displayLocale })
									: m.settings_analytics_unavailable({}, { locale: displayLocale })}
							</p>
							<a
								class="privacy-policy-link"
								href={localizeSitePathname("/privacy", selectedLocale)}
								target="_blank"
								rel="noopener noreferrer"
								data-settings-control="privacy-policy"
								data-settings-keyboard-target
							>
								<FileText size={14} strokeWidth={2.1} aria-hidden="true" />
								<span>{m.settings_privacy_policy_link({}, { locale: displayLocale })}</span>
							</a>
						</div>
						<button
							type="button"
							class="analytics-switch"
							class:active={analyticsConsent}
							role="switch"
							aria-checked={analyticsConsent}
							aria-keyshortcuts="A"
							disabled={!analyticsConfigured}
							data-settings-control="privacy-analytics"
							data-settings-keyboard-target
							title={withShortcut(m.settings_analytics_label({}, { locale: displayLocale }), "A")}
							onclick={() => chooseAnalyticsConsent(!analyticsConsent)}
						>
							<span>
								{analyticsConsent
									? m.settings_analytics_enabled({}, { locale: displayLocale })
									: m.settings_analytics_disabled({}, { locale: displayLocale })}
							</span>
						</button>
					</div>

					{#if advertisingConfigured}
						<div class="privacy-row">
							<div class="privacy-copy">
								<span>{m.settings_advertising_label({}, { locale: displayLocale })}</span>
								<p>{m.settings_advertising_description({}, { locale: displayLocale })}</p>
							</div>
							<button
								type="button"
								class="analytics-switch"
								class:active={advertisingConsent}
								role="switch"
								aria-checked={advertisingConsent}
								aria-keyshortcuts="D"
								data-settings-control="privacy-advertising"
								data-settings-keyboard-target
								title={withShortcut(m.settings_advertising_label({}, { locale: displayLocale }), "D")}
								onclick={() => chooseAdvertisingConsent(!advertisingConsent)}
							>
								<span>
									{advertisingConsent
										? m.settings_advertising_enabled({}, { locale: displayLocale })
										: m.settings_advertising_disabled({}, { locale: displayLocale })}
								</span>
							</button>
						</div>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</dialog>

<style>
	.site-sidebar {
		--sidebar-focus-ring-space: 0.45rem;

		position: sticky;
		top: 0;
		z-index: 2;
		display: grid;
		height: 100svh;
		min-height: 0;
		grid-template-rows: auto minmax(0, 1fr) auto;
		gap: 1.25rem;
		overflow: hidden;
		padding: 1rem;
		border-right: 1px solid var(--sidebar-border);
		background:
			linear-gradient(180deg, color-mix(in oklch, var(--sidebar) 96%, white) 0%, var(--sidebar) 100%);
		color: var(--sidebar-foreground);
		box-shadow: 0.75rem 0 2.4rem color-mix(in oklch, var(--ink) 10%, transparent);
		user-select: none;
	}

	.brand-link {
		display: grid;
		grid-template-columns: 3rem minmax(0, 1fr);
		gap: 0.75rem;
		align-items: center;
		min-height: 3.6rem;
		padding: 0.35rem;
		border-radius: var(--radius-lg);
		color: inherit;
		font-size: 1.1rem;
		font-feature-settings: "zero" 1;
		font-variant-numeric: slashed-zero;
		font-weight: 780;
		letter-spacing: 0;
		text-decoration: none;
	}

	.brand-link img {
		width: 3rem;
		aspect-ratio: 1;
		border: 1px solid color-mix(in oklch, var(--ink) 24%, var(--bronze));
		border-radius: var(--radius-md);
		object-fit: cover;
	}

	.site-sidebar nav {
		min-height: 0;
		margin-inline: calc(var(--sidebar-focus-ring-space) * -1);
		margin-block: calc(var(--sidebar-focus-ring-space) * -1);
		padding-inline: var(--sidebar-focus-ring-space);
		padding-block: var(--sidebar-focus-ring-space);
		overflow-x: hidden;
		overflow-y: auto;
		overscroll-behavior: contain;
		scrollbar-width: thin;
	}

	.menu-list {
		display: grid;
		align-content: start;
		gap: 0.35rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.menu-list li {
		min-width: 0;
	}

	.settings-panel {
		display: grid;
		gap: 0.75rem;
		padding-top: 1rem;
		border-top: 1px solid color-mix(in oklch, var(--sidebar-border) 78%, transparent);
	}

	.settings-dialog {
		position: fixed;
		inset: 50% auto auto 50%;
		width: min(32rem, calc(100vw - 2rem));
		max-height: calc(100svh - 2rem);
		padding: 0;
		border: 1px solid var(--sidebar-border);
		border-radius: var(--radius-lg);
		background: var(--popover);
		color: var(--popover-foreground);
		box-shadow: 0 1.25rem 4rem color-mix(in oklch, var(--ink) 28%, transparent);
		transform: translate(-50%, -50%);
		user-select: none;
	}

	.settings-dialog::backdrop {
		background: color-mix(in oklch, var(--ink) 38%, transparent);
	}

	.settings-dialog-panel {
		display: grid;
		gap: 1.2rem;
		padding: 1rem;
	}

	.settings-dialog-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.settings-dialog-header h2 {
		margin: 0;
		font-size: 1rem;
		font-weight: 780;
		letter-spacing: 0;
	}

	.settings-tabs {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.35rem;
		padding-bottom: 0.9rem;
		border-bottom: 1px solid color-mix(in oklch, var(--mode-control-border) 82%, transparent);
	}

	.settings-tabs button {
		min-height: 2.5rem;
		border: 1px solid var(--mode-control-border);
		border-radius: var(--radius-md);
		background: var(--mode-control-background);
		color: var(--mode-control-foreground);
		cursor: pointer;
		font: inherit;
		font-weight: 720;
	}

	.settings-tabs button:hover,
	.settings-tabs button.active {
		background: var(--mode-control-hover-background);
	}

	.settings-tab-panel {
		display: grid;
		gap: 0.65rem;
	}

	.choice-grid {
		display: grid;
		gap: 0.35rem;
	}

	.theme-grid {
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.language-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.choice-grid button {
		display: flex;
		min-height: 2.6rem;
		align-items: center;
		justify-content: center;
		gap: 0.45rem;
		padding: 0 0.7rem;
		border: 1px solid var(--mode-control-border);
		border-radius: var(--radius-md);
		background: var(--mode-control-background);
		color: var(--mode-control-foreground);
		cursor: pointer;
		font: inherit;
		font-weight: 680;
	}

	.choice-grid button:hover,
	.choice-grid button.active {
		background: var(--mode-control-hover-background);
	}

	.privacy-panel {
		display: grid;
		gap: 0.8rem;
		padding: 0.85rem;
		border: 1px solid var(--mode-control-border);
		border-radius: var(--radius-md);
		background: color-mix(in oklch, var(--mode-control-background) 74%, transparent);
	}

	.privacy-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(6.5rem, auto);
		gap: 0.8rem;
		align-items: center;
	}

	.privacy-copy {
		display: grid;
		gap: 0.3rem;
	}

	.privacy-copy span {
		font-weight: 620;
	}

	.privacy-copy p {
		margin: 0;
		color: color-mix(in oklch, var(--mode-control-foreground) 76%, transparent);
		font-size: 0.88rem;
		line-height: 1.45;
	}

	.privacy-policy-link {
		display: inline-flex;
		width: fit-content;
		min-height: 1.85rem;
		align-items: center;
		gap: 0.35rem;
		padding: 0 0.55rem;
		border: 1px solid var(--mode-control-border);
		border-radius: 999px;
		background: var(--mode-control-background);
		color: var(--mode-control-foreground);
		font-size: 0.82rem;
		font-weight: 560;
		text-decoration: none;
		user-select: none;
	}

	.privacy-policy-link:hover {
		background: var(--mode-control-hover-background);
	}

	.analytics-switch {
		display: inline-flex;
		min-height: 2.5rem;
		align-items: center;
		justify-content: center;
		padding: 0 0.95rem;
		border: 1px solid var(--mode-control-border);
		border-radius: var(--radius-md);
		background: var(--mode-control-background);
		color: var(--mode-control-foreground);
		cursor: pointer;
		font: inherit;
		font-weight: 560;
		user-select: none;
	}

	.analytics-switch:hover,
	.analytics-switch.active {
		background: var(--mode-control-hover-background);
	}

	.analytics-switch:disabled {
		cursor: not-allowed;
		opacity: 0.62;
	}

	a:focus-visible,
	button:focus-visible {
		outline: 3px solid color-mix(in oklch, var(--sidebar-ring) 70%, white);
		outline-offset: 3px;
	}

	@media (max-width: 48rem) {
		.site-sidebar {
			position: sticky;
			top: 0;
			height: auto;
			min-height: 0;
			grid-template-rows: auto auto auto;
			overflow: visible;
			border-right: 0;
			border-bottom: 1px solid var(--sidebar-border);
		}

		.site-sidebar nav {
			margin-inline: 0;
			margin-block: 0;
			padding-inline: 0;
			padding-block: 0;
			overflow: visible;
		}

		.menu-list {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
