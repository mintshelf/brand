# Mint Shelf brand usage

This document is the approval boundary for every Mint Shelf surface. The current
identity is the four-part standalone mark, the name “Mint Shelf,” and the
portable values in [`tokens.json`](tokens.json). There is no approved wordmark,
horizontal lockup, slogan, alternate mark, gradient, or campaign palette.

## Mark rules

Use [`assets/marks/mark-green.svg`](assets/marks/mark-green.svg) when a scalable
asset is accepted and the mark has at least 3:1 contrast with its background;
use the green PNG when SVG is unavailable under the same condition. Otherwise,
black is required on light backgrounds and white is required on dark backgrounds.
The application icon is only for platform icon slots; it is not a substitute for
the standalone mark in page layouts.

The mark's square is `1x`. Keep at least `0.25x` empty on every side, measured
from the visible mark, and render the standalone mark at least 24 CSS pixels wide
on screen or 8 mm wide in print. Platform icon masks control the application
icon's final safe area.

Uniform scaling, lossless optimization, and format conversion that preserve the
exact appearance and clear space are allowed. Do not crop, stretch, rotate,
recolor, outline, animate individual parts, add effects, place content in its
clear space, or construct a lockup. Write “Mint Shelf” as live text when the name
must accompany the mark; do not simulate a wordmark.

## Color, type, and shape

`color.brand.mint` is the fixed recognition color, not a general-purpose UI
role. UI and publication layouts use the semantic light or dark roles. An
`on…` role is the foreground for its matching base or container role. Surface
container levels communicate elevation or grouping; they are not borders.
`outline` and `outlineVariant` are color inputs, not accessibility guarantees;
consumers must test any required boundary against its actual adjacent colors.

Public Sans is the preferred typeface. Consumers may load their own licensed
copy; otherwise the declared `system-ui` and `sans-serif` fallbacks are part of
the approved contract. Font weights, sizes, line heights, spacing, and layout
remain consumer decisions. Radius tokens describe container shape only and do
not prescribe components.

## Accessibility

Remove a decorative mark from the accessibility tree: for example, use `alt=""`
on an HTML image or `aria-hidden="true"` on inline SVG. When the mark identifies
the organization, expose the name “Mint Shelf” through image alternative text,
text participating in the same link or control, or that container's accessible
name. Avoid duplicate naming only among content that contributes to the same
accessible-name computation.

Logos are exempt from non-text contrast requirements, but must remain visually
distinct. The 3:1 selection rule above makes variant choice deterministic.
Never use the mark as an unlabeled control or as the only indication of state.
For text, use the paired semantic roles; the repository check enforces at least
4.5:1 for those foreground/background pairs and 7:1 for primary surface text.
Consumers must separately test control boundaries, focus, hover, disabled, and
other interaction states against their adjacent colors, including the 3:1
non-text contrast requirement where applicable.

## Consumer contracts

All consumers pin an exact commit from this repository, preserve the paths and
token names, and record that commit in their dependency or handoff. A local copy
is a delivery artifact, not a new source of approval.

- **Product** maps semantic colors and radii to native platform primitives and
  owns components, interaction states, typography scale, layout, and motion.
  It uses `assets/app-icon.png` only as input to platform-specific icon tooling.
- **Site** prefers the green SVG for identity and maps semantic tokens to its
  own CSS or design system. It owns responsive behavior, components, favicons,
  metadata images, and webfont delivery.
- **Content** uses the display name “Mint Shelf” and these accessibility rules.
  Editorial illustrations, screenshots, diagrams, and voice are not approved
  merely because they appear beside the mark.
- **Marketing** uses only the published mark variants for evergreen identity.
  Campaign art, partner lockups, slogans, templates, photography, and paid-media
  variants require a separate approval and stay outside this public repository.
- **Media Tools** reads [`assets.json`](assets.json) for deterministic paths,
  dimensions, media types, and hashes. It may resize or convert under the mark
  rules, but must not synthesize missing variants or infer approval from a file
  that is absent from the manifest.

Token contract version 1 is a closed set of names and types; value changes still
require brand review. Adding, removing, renaming, or changing the type of a token
requires a new token contract version and a coordinated downstream migration.
Changing an asset's visible design or these usage rules also requires coordinated
review. Asset hash changes always require an intentional manifest update.

## Handoff checklist

Record the Brand commit, consume only manifest-listed assets, preserve semantic
names rather than raw values, verify light and dark output, test accessible
naming, and retain [`LICENSE.md`](LICENSE.md) when redistributing the marks.
Escalate any missing format, new lockup, campaign variant, or unclear use to
[press@mintshelf.com](mailto:press@mintshelf.com); absence is not approval.
