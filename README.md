# 0disoft.github.io

## Color System

Use OKLCH for UI color tokens in `src/routes/layout.css`.

Use HEX only for fixed artwork colors inside standalone assets, such as SVG
favicons and illustrations.

## Development Checks

Use Prek for optional Git hooks:

```sh
uvx prek install
uvx prek install --hook-type pre-push
uvx prek run --all-files
```

Pre-commit hooks format matched files, then run linting and tests. Pre-push
hooks run Svelte checking and the production build.

The bounded search browser check (`scripts/check-search-browser.mjs`) exercises
the built Pagefind index and delayed search responses, including clear and
close/reopen races. Build the site and index first. The check requires Chrome and
`playwright-core`; its optional first argument is an installed driver entrypoint.
In the workspace, use the configured `zero_disoft_github_io_search_browser` intent.
It serves build assets through browser request interception without a dev server.

Pagefind indexes the shared main content area (`data-pagefind-body`), excluding
sidebar/settings chrome, share tools, image previews and ad placeholders. Public
content pages retain this boundary in every locale; error and verification pages
do not opt into the index. The browser check verifies both content matches and
the exclusion of theme-control text from unrelated pages.

Analytics page views are opt-in and deduplicated per completed navigation, not
per URL. Revisiting a page (including a new navigation to the same URL) records a
new view; analytics initialization and navigation callbacks for one visit do not
record it twice. Delivery regression tests use an offline GA4 stub.

## License

This repository is licensed under the BSD Zero Clause License (0BSD).

Unless otherwise noted, the 0BSD license applies only to original materials
created for this repository by 0disoft, including code, documentation, profile
text, website copy, configuration files, website content, UI design,
project-specific artwork, images, and logo-like assets.

No attribution is required for those original materials.

Third-party dependencies, frameworks, packages, fonts, icons, templates, and
external assets are not relicensed by this repository. They remain under their
own respective licenses.
