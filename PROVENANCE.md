# Provenance and rights

## Current Mint Shelf mark

The current mark was selected for Mint Shelf on July 20, 2026. It began in a
human-directed visual exploration created with OpenAI's image-generation tool.
The selected artwork was concept C in the original twelve-concept sheet. The
production vector traces the four silhouettes directly from that selected
concept rather than approximating them with geometric primitives. Its original
proportions, spacing, unequal leaf sizes, and small contour differences are
preserved; only the generated image's pixel-level color variation was replaced
with the canonical solid green.

The original concept-sheet PNG is identified by SHA-256 digest
`d57cb5949598d4a88ab9bab22dbd9a6fcb7a033cbd8affa697c95fc85ad7176a`.
Recording the digest preserves an auditable link to the exact source without
publishing the rejected concepts as approved Brand assets.

No Atlas, Cosmic Themes, Logoipsum, or other third-party artwork was traced or
embedded in the current production file. Because the concept involved generated
output, claims about copyright are limited to rights that apply under the law;
the separate trademark and clearance questions remain addressed by
[`LICENSE.md`](LICENSE.md) and [`CLEARANCE.md`](CLEARANCE.md).

The canonical source is
[`assets/marks/mark-green.svg`](assets/marks/mark-green.svg). Raster and
application-icon files are deterministic exports or compositions of that source.
The machine-readable [`assets.json`](assets.json) records their exact hashes.

## Retired placeholder

Before launch, Mint Shelf used a placeholder inherited from the paid Atlas Astro
theme by Cosmic Themes. Atlas stores that artwork as
`src/icons/atlas/logoipsum.svg`; its geometry is Logoipsum artwork 225 (internal
SVG id `logo-15`). Logoipsum's current terms describe its unaltered logos as
placeholders and prohibit using them as final brand identities or claiming
ownership of them.

The placeholder entered this repository in commit
`6e5ccc8b4abf72bb2132593cded2ca2317c9b7d8`. A later reorganization accidentally
introduced an unrelated image at the black-mark path, and subsequent commits
created black and white variants and incorrectly described the placeholder as a
Mint Shelf-owned mark. Those assets and claims are retired. Git history retains
them only as historical records; they are not approved Mint Shelf assets.

## Public Sans

This repository names but does not distribute Public Sans. Public Sans is
maintained at <https://github.com/uswds/public-sans> under the SIL Open Font
License 1.1. Consumers that download, bundle, or redistribute it are responsible
for pinning a version and carrying the upstream license and notices. Consumers
that do not ship it use the fallbacks in `tokens.json`.
