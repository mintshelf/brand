# Mint Shelf brand

This is the public home for approved Mint Shelf brand assets. If an asset is not
here, treat it as work in progress.

## The mark

![Mint Shelf mark](assets/marks/mark-green.png)

- [`mark-green.svg`](assets/marks/mark-green.svg) is the preferred scalable mark.
- [`mark-green.png`](assets/marks/mark-green.png) is the standard color mark.
- [`mark-black.png`](assets/marks/mark-black.png) is for light backgrounds.
- [`mark-white.png`](assets/marks/mark-white.png) is for dark backgrounds.
- [`app-icon.png`](assets/app-icon.png) is the square application icon.

Keep clear space around the mark. Do not stretch it, recolor it, add effects, or
combine it with another company's mark.

## For designers and developers

[`tokens.json`](tokens.json) is the portable source for approved brand and
semantic color roles, the typeface stack, and the corner-radius scale. Its light
and dark roles are named by purpose, so each surface can consume the same visual
contract without copying platform components.

Product and Site retain their own components, layout rules, interaction states,
and platform code. They should derive brand-facing values from an exact commit
of this repository and must not treat local copies as new brand approvals.

Run `node scripts/validate-tokens.mjs` before proposing token changes. The check
requires a complete light and dark contract and verifies contrast for paired
foreground and background roles.

Install [Mise](https://mise.jdx.dev/) natively, then run `mise install` once and
`mise run check` before proposing changes. Installation also configures HK to
run the same repository check before pushes.

Work in progress and campaign files belong in private repositories. See
[`LICENSE.md`](LICENSE.md) before using these assets publicly. For questions,
email [press@mintshelf.com](mailto:press@mintshelf.com).
