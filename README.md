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
