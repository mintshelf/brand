# Provenance and rights

## Mint Shelf assets

Mint Shelf claims and reserves the rights in the marks in this repository.
Their public use is governed by [`LICENSE.md`](LICENSE.md), not by an open-source
license.
The machine-readable [`assets.json`](assets.json) records the SHA-256 digest,
dimensions, media type, purpose, first repository commit, and original path for
every approved binary and vector asset.

The recorded commits establish the reviewed repository chain of custody, and
the repository check verifies that each commit contains the approved bytes at
the recorded path. The initial kit was
introduced in commit `6e5ccc8b4abf72bb2132593cded2ca2317c9b7d8`, and the black
variant plus current public paths were established in commit
`74118d1101543f95905d64b9e6159627860dd894`. They do not grant rights beyond
the brand asset license. If an asset is replaced, retain its prior record in Git
history and update the manifest in the same reviewed change.

## Public Sans

The token contract names Public Sans but this repository does not distribute
font software. Public Sans is maintained at
<https://github.com/uswds/public-sans> and is licensed under the SIL Open Font
License 1.1; the upstream license explains the Libre Franklin and USWDS/GSA
provenance at <https://github.com/uswds/public-sans/blob/develop/LICENSE.md>.
Consumers that download, bundle, or redistribute the font are responsible for
pinning a version and carrying the applicable upstream license and notices.
Consumers that do not ship it use the approved fallbacks in `tokens.json`.
