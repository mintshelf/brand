# Mint Shelf brand

This repository is the canonical public home for the approved Mint Shelf
identity. If an asset is not listed in [`assets.json`](assets.json), treat it as
unapproved.

## The mark

![Mint Shelf mark](assets/marks/mark-green.svg)

The Mint Shelf mark is always green. It is a four-leaf symbol with controlled
asymmetry: balanced as a whole, organic on closer inspection.

- [`mark-green.svg`](assets/marks/mark-green.svg) is the canonical mark.
- [`mark-green.png`](assets/marks/mark-green.png) is the standard raster export.
- [`app-icon.svg`](assets/app-icon.svg) is the scalable application-icon source.
- [`app-icon.png`](assets/app-icon.png) is the 1024-pixel application-icon source.

There are no approved black or white variants, wordmarks, or lockups. Use the
mark with the live-text name “Mint Shelf” when the name must accompany it.

## Usage and motion

[`GUIDELINES.md`](GUIDELINES.md) defines clear space, minimum size,
accessibility, permitted transforms, and consumer boundaries. [`MOTION.md`](MOTION.md)
defines the orbit-and-settle entrance and its reduced-motion behavior.

[`assets.json`](assets.json) is the machine-readable approved-asset inventory.
It records stable identifiers, paths, formats, dimensions, and SHA-256 digests.
[`PROVENANCE.md`](PROVENANCE.md) records the retired placeholder and the origin
of the current mark. [`CLEARANCE.md`](CLEARANCE.md) records the preliminary
similarity search and the remaining professional-clearance gate.

Run `node scripts/check.mjs` before proposing a Brand change. The dependency-free
check rejects unlisted files, black or white variants, hash drift, dimension
drift, and changes to the fixed recognition color.

## Tokens

[`tokens.json`](tokens.json) contains only the fixed mark color, application-icon
surface, and brand typeface stack. Semantic UI colors, radii, type scales,
spacing, and components belong to each consumer rather than to Brand.

Consumers pin an exact Brand commit. This repository does not publish software
packages or require a release workflow; its continuous check only validates the
asset inventory and fixed brand decisions.

Work in progress and campaign files belong outside this public repository. See
[`LICENSE.md`](LICENSE.md) before using the approved assets publicly. For
questions, email [press@mintshelf.com](mailto:press@mintshelf.com).
