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
For text, use the paired semantic roles and verify their contrast in the actual
surface. Consumers must also test control boundaries, focus, hover, disabled,
and other interaction states against their adjacent colors, including the 3:1
non-text contrast requirement where applicable.

## Consumer contracts

All consumers pin an exact commit from this repository, preserve the paths and
token names, and record that commit in their dependency or handoff. A local copy
is a delivery artifact, not a new source of approval.

- **Product** maps semantic colors and radii to native platform primitives and
  owns components, interaction states, typography scale, layout, and motion.
  It uses `assets/app-icon.png` only as input to platform-specific icon tooling.
- **CMS** uses these assets and tokens across Site, Content, Studio, Channels,
  and Publishing. Campaign art, screenshots, templates, photography, partner
  lockups, and other delivery-specific material remain outside this repository.

Token contract version 1 is a closed set of names and types; value changes still
require an intentional decision. Adding, removing, renaming, or changing the
type of a token requires a new token contract version and a coordinated
downstream migration. Asset hash changes require an intentional manifest update.

## Handoff checklist

Record the Brand commit, consume only manifest-listed assets, preserve semantic
names rather than raw values, verify light and dark output, test accessible
naming, and retain the exact [`LICENSE.md`](LICENSE.md) bytes from the pinned
Brand commit when redistributing a mark. Redistribution includes copied or
renamed assets and marks embedded in generated images, video, documents, or
other downloadable outputs. Keep the license beside those assets or at the
repository/package root. When the root contains multiple licenses or notices,
include the scope sentence required by the license; do not replace the license
copy with a link or paraphrase. Escalate any missing format, new lockup, campaign
variant, or unclear use to [press@mintshelf.com](mailto:press@mintshelf.com);
absence is not approval.
