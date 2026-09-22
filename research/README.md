# Indiehackers Research Registry

Before researching a person or product, query `indiehackers.json` through the
`zero_disoft_github_io_research_lookup` mustflow intent with a `request` JSON path.
Create a local `.mustflow/state/research-queries/*.json` containing, for example,
`{"query":"Previewmojo"}`. Do not commit these temporary query files.
The `zero_disoft_github_io_research_check` intent validates and lists coverage.
Both are local, read-only, and return JSON.

The standalone CLI also accepts `--query "Jon Yongfook"` or `--query "bannerbear.com"`.
Agents use the configured mustflow intents, not raw CLI execution.

## Records

- `people`: stable ID, original name, Korean/alternate names, verified profile URLs.
- `products`: stable ID, current/former names, exact official domains, founder IDs.
- `research`: work not yet represented by an article. Each record has `id`,
  `personIds`, `productIds`, `status`, `lastResearchedAt` (YYYY-MM-DD), and `sources`.
  Allowed states: `planned`, `researching`, `researched`, `deferred`.
- Every article `meta.json` and draft `draft.json` links `personIds` and `productIds`.
  These IDs refer to article subjects, not every person mentioned in the body.

Publication state is derived from actual files. `published` means present under
`src/content/indiehackers/posts`, not proof that the commit was pushed or deployed.
`draft` means present under `drafts/indiehackers`; `workflowStatus` preserves
translation-pending status. Do not manually mirror these states in the registry.

## Before New Research

1. Query the original name, Korean name, product name or official URL.
2. Inspect every match and existing article path. Exact name matches can still be
   namesakes. Partial/typo matches are suggestions, never confirmed identities.
3. Skip repeat introductory research when already covered or in progress.
   A different product or a dated follow-up remains valid: inspect `relatedProducts`
   and coverage before deciding. The tool does not forbid follow-ups.
4. Register an unlisted person/product, then add a `researching` record before work.
   Record sources and the actual research date. Never invent an unknown profile URL.
5. Link the finished draft using IDs, retain research history, and run the check.
   On publication, move rather than copy the draft so it is not counted twice.

The registry is an exclusion aid, not a global directory. `not-found` means only
that no local match was found. External redirects and fuzzy identities are not
resolved automatically. Product domains match exactly (plus `www`), so hosted
customer sites such as `customer.carrd.co` do not count as the Carrd product itself.
