# Indiehackers Magazine QA

## Visual Target

- Source: user-selected `codex-clipboard-92dd6ec0-0150-49db-ae99-c0e7d298ad94.png` (1487 x 1058 px).
- Route: `/ko/indiehackers/`, four posts, default recent filter enabled.
- Desktop viewport: 1440 x 1000 CSS px, device scale 1.
- Mobile viewport: 390 x 844 CSS px, device scale 1.
- Evidence: `.mustflow/state/taxonomy-screenshots/filters-1440.png`, `magazine-1440.png`, `filters-390.png`, and `magazine-dark-1440.png`.
- The source is a content-only composition. The implementation retains the existing navigation, so its desktop content crop is 1080 px wide. Compare proportional layout and the content region, not full-frame pixel positions. No density rescaling was used.

## Comparison History

1. Initial browser comparison found a P1 mismatch: inherited cream colors, striped backdrop and nested card borders. A percentage grid also exceeded its available width once the gap was included.
2. Replaced the list's styling with an unframed editorial layout, neutral route-scoped tokens, blue accents and fractional grid tracks. Added matching dark tokens without changing article-page themes.
3. Reopened the selected source and updated desktop/mobile captures together. No remaining actionable P0/P1/P2 issues were found. The full-size content crop was sufficient to inspect controls and typography without a separate zoom crop.

## Fidelity and Behavior

- Typography: existing local Korean sans font, fixed breakpoint sizes, clear masthead and article hierarchy; semantic article headings and visible keyboard focus.
- Layout: lead story plus three secondary stories, additional posts in a following grid, single-column mobile layout, no horizontal overflow.
- Colors: white/charcoal surfaces, blue controls, yellow lead illustration. Dark mode maintains readable text and controls.
- Imagery: four generated editorial illustrations, not official screenshots. Local WebP assets total 421740 bytes, with explicit dimensions and lazy loading for secondary covers. Provenance is recorded beside the assets.
- Content: existing localized titles, summaries, dates, taxonomy and publication ordering are preserved. Reference-only marketing copy and manual story ordering were not copied.
- Filters: all six facets, within-group OR and cross-group AND, counts, recent-date behavior, URL reload/back, reset and empty results passed browser checks.
- Keyboard: Escape closes the active facet and returns focus. Collapsing facets leaves recent/reset controls available. All open panels stay within the viewport.
- Localization: Korean and French browser checks passed at both viewport sizes. Dark-mode checks passed. No browser page errors were recorded.

## Verification

- Vitest: 65 tests passed.
- Svelte check: zero errors and warnings.
- Static build and Pagefind: passed, 42 pages across six languages.
- Formatting: passed.
- Browser regression: passed at 1440 px and 390 px.
- Push and deployment intentionally not performed.

## Follow-up Polish

- Product imagery is an editorial interpretation of the selected mock, not a pixel-identical reproduction.
- Five-or-more-post layout and missing-cover rendering have code-level coverage/inspection but no dedicated browser fixture in this change.

final result: passed
