# Tallyfin service pilot

The `zerodi-site` project uses schema 2 (schema 1 remains active for older tabs) and `Asia/Seoul`. The reviewed registry
lives in `0disoft/tallyfin/examples/0disoft/registry-v2.json`. Its only allowed origin
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

## Action funnels

Schema 2 adds two three-step task funnels:

- `story_sharing`: story opened → copy attempted → link successfully copied.
- `search_discovery`: debounced search executed → result clicked in the current
  tab → navigation completed to that result path.

The start of a search means the 160 ms debounce fired, not each keystroke. A new
query invalidates the previous selection. A copy counts completion only after
the existing clipboard helper succeeds and the originating toolbar is still
current. Failed copies can retry the same task; each milestone counts once per
story navigation. Native sharing and social-platform links do not count as
successful link copies. Opening a result in a new tab is not linked.

Both funnels use the existing section/language enums, with language frozen at
task start for funnel groups. Random task IDs exist only in tab memory, are
new for each search/story navigation, and are dropped on withdrawal or reload.
A destination path is held only in local memory to match navigation; it never
enters an event. No query, title, slug, visitor ID or clipboard content is sent.
Late copy completions after navigation or withdrawal cannot finish a task.

These are task counts, not people. A copied link does not prove it was posted
or opened. Missing later steps do not prove abandonment. The site remains static;
no server-side business completion is claimed.

## Schema 2 local verification — 2026-10-25

The full suite passed 153 tests in 26 files. Svelte checking reported 0 errors
and 0 warnings. Lint, formatting, six-locale checks, and production build/index
passed, indexing 828 pages. The isolated action browser check exercised the real
Pagefind search, result navigation and successful native clipboard copy, then
forced both clipboard paths to fail on a fresh story. It observed 11 events:
one complete search run, one complete copy run, and one copy run without its
success milestone. Before consent and after withdrawal, requests were zero.
This check intercepted delivery and did not write production analytics.

Run it after `bun run build:index`:

```sh
node scripts/check-tallyfin-actions-browser.mjs /absolute/path/to/playwright/index.mjs
```

The reusable journey in `scripts/tallyfin-action-journey.mjs` can also verify the
deployed site. Real collection additionally requires matching receipts, ordered
run state and aggregate deltas from the remote project, plus duplicate replay
without increasing those aggregates. The schema 2 registry was registered before
site rollout; schema 1 remains active for existing tabs.
