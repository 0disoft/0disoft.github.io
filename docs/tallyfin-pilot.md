# Tallyfin service pilot

The `zerodi-site` project uses schema 1 and `Asia/Seoul`. The reviewed registry
lives in `0disoft/tallyfin/examples/0disoft/registry.json`. Its only allowed origin
is `https://0disoft.github.io`; deployment previews and local development do not
send real production events. No administrator credential belongs in this site.

The GitHub repository variable `PUBLIC_TALLYFIN_ENDPOINT` is public build/runtime
configuration, set to:

```text
https://tallyfin-admin.rodisoft1.workers.dev/v1/projects/zerodi-site/batches
```

The existing Pages workflow passes the variable into its build. Clear it and
redeploy to disable collection. GA4 and advertising keep their independent
configuration, and all analytics honor the existing explicit consent choice.

One `page_view` is queued per completed navigation after consent. Repeated
initialization for that navigation does not add an event; revisits can. The only
properties are `section` (home, indiehackers, story, investors, creators, privacy,
other) and `locale` (en, zh, es, fr, hi, ko), at most 42 combinations. Neither
raw paths, query strings, article slugs, titles, search text, referrers nor visitor
IDs enter those properties. Event and batch UUIDs are ephemeral deduplication
keys. The SDK sends without credentials or referrers, bounds its queue and
retries, and aborts/discards pending work when consent is withdrawn. Withdrawal
cannot undo already accepted aggregates or an already completed request.

The SDK is a reviewed local npm archive with its original Apache-2.0 license;
`bun install --frozen-lockfile` works in CI without publishing the package.

Checks:

```sh
bun run test -- src/lib/site-tallyfin.test.ts src/lib/site-analytics.test.ts
bun run check
bun run lint
bun run format:check
bun run build:index
node scripts/check-tallyfin-browser.mjs /absolute/path/to/playwright/index.mjs
```

The browser check intercepts the collector offline and verifies consent, one
initial event, bounded payloads and withdrawal. Real ingestion must additionally
be verified on the deployed site by observing successful batch responses and
the corresponding remote project aggregates. Do not infer unique visitors,
completed tasks, remote recovery readiness or load capacity from page views.

## Local verification — 2026-10-25

The full suite passed 147 tests in 26 files. Svelte checking reported 0 errors
and 0 warnings; lint, formatting, the 6-locale catalog check and production
build/index passed (828 indexed pages). The isolated browser check passed
Tallyfin-only consent, exactly one initial event, credential/referrer omission
and no new delivery after withdrawal and navigation. It made no real collection
request. Registry validation and deployed-origin preflight also passed; a foreign
origin was rejected. The first concurrent check/build attempt encountered the
type-generator lock, and the check passed when rerun sequentially after build.
