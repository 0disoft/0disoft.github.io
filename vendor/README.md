# Tallyfin browser SDK

`tallyfin-browser-0.0.0.tgz` is an npm pack archive built from
`0disoft/tallyfin` commit `539ca62e735554ed3df7bbefac34dc8e62c3aa23` (the later
pilot-registry commit does not change SDK sources). It includes the original
Apache-2.0 LICENSE, NOTICE and declarations. The application installs it through
the repository-relative file dependency recorded in package.json and bun.lock;
no private registry, external checkout or npm publication is required.
The site also distributes the original notices at `/licenses/tallyfin/LICENSE.txt`
and `/licenses/tallyfin/NOTICE.txt` alongside the browser bundle.

Rebuild using `npm run build:browser` in Tallyfin, then `npm pack --workspace
@tallyfin/browser --pack-destination <this-directory> --ignore-scripts`. Review
and commit the archive and Bun lockfile together when updating it.
