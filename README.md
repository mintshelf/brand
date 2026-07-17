# Mint Shelf brand

This is the canonical public home for the approved Mint Shelf identity. If an
asset is not listed in [`assets.json`](assets.json), treat it as unapproved.

## The mark

![Mint Shelf mark](assets/marks/mark-black.png)

- [`mark-green.svg`](assets/marks/mark-green.svg) is the scalable color mark.
- [`mark-green.png`](assets/marks/mark-green.png) is the standard color mark.
- [`mark-black.png`](assets/marks/mark-black.png) is for light backgrounds.
- [`mark-white.png`](assets/marks/mark-white.png) is for dark backgrounds.
- [`app-icon.png`](assets/app-icon.png) is the square application icon.

The approved identity is a standalone mark and the live-text name “Mint Shelf.”
There is no approved wordmark or lockup. See [`GUIDELINES.md`](GUIDELINES.md)
for measurable clear space, minimum size, accessibility, permitted transforms,
and consumer-specific handoffs.

## For designers and developers

[`tokens.json`](tokens.json) is the portable source for approved brand and
semantic color roles, the typeface stack, and the corner-radius scale. Its light
and dark roles are named by purpose, so each surface can consume the same visual
contract without copying platform components.

[`assets.json`](assets.json) is the portable approved-asset inventory. It records
stable identifiers, paths, formats, dimensions, SHA-256 digests, purposes, and
repository provenance. [`PROVENANCE.md`](PROVENANCE.md) documents rights and the
Public Sans dependency boundary.

Product, Site, Content, Marketing, and Media Tools each retain their own delivery
systems and should derive brand-facing values from an exact commit of this
repository. They must not treat local copies as new brand approvals.

The repository check requires a complete light and dark token contract, verifies
contrast for paired roles, and rejects asset drift from the approved manifest.

Install [Mise](https://mise.jdx.dev/) natively, then run `mise install` once and
`mise run check` before proposing changes. Installation also configures HK to
run the same repository check before pushes.

Work in progress and campaign files belong in private repositories. See
[`LICENSE.md`](LICENSE.md) before using these assets publicly. For questions,
email [press@mintshelf.com](mailto:press@mintshelf.com).
