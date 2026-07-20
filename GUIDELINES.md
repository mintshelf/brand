# Mint Shelf brand usage

The approved identity is the green four-leaf mark, the live-text name “Mint
Shelf,” and the portable values in [`tokens.json`](tokens.json). There is no
approved wordmark, horizontal lockup, slogan, alternate mark, gradient, or
campaign palette.

## Mark rules

Use [`assets/marks/mark-green.svg`](assets/marks/mark-green.svg) whenever SVG is
accepted and the green PNG otherwise. The mark remains `#22c55e` on both light
and dark themes. If it is not visually distinct on a surface, change the surface
or placement rather than recoloring the mark.

The application icon uses the same green mark on the fixed warm surface
`#f9faf4`. It is only for platform icon slots and is not a substitute for the
standalone mark in page layouts. Platform-specific masks and monochrome inputs
are implementation artifacts owned by Product, not alternate Brand marks.

The visible mark is `1x`. Keep at least `0.25x` empty on every side and render
the standalone mark at least 24 CSS pixels wide on screen or 8 mm wide in print.
Platform icon masks control the application icon's final safe area.

Uniform scaling, lossless optimization, rasterization, and format conversion
that preserve the exact appearance and clear space are allowed. Do not crop,
stretch, rotate, recolor, outline, add effects, place content in its clear space,
or construct a lockup. Do not rearrange or reshape individual leaves.

Approved motion may move the four leaves during a transition but must resolve to
the exact still geometry. See [`MOTION.md`](MOTION.md). Outside that motion
system, do not animate individual leaves or continuously rotate the assembled
mark.

## Color, type, and shape

`color.brand.mint` is the fixed recognition color, not a general-purpose UI
role. `color.brand.applicationIconSurface` is fixed only within the application
icon. Consumers define and test their own semantic light and dark colors.

Public Sans is the current preferred typeface. Consumers may load their own
licensed copy; otherwise the declared `system-ui` and `sans-serif` fallbacks are
part of the current contract. Font weights, sizes, line heights, spacing, and
layout remain consumer decisions. Brand does not define radii, elevation,
spacing, or a UI type scale.

## Accessibility

Remove a decorative mark from the accessibility tree with `alt=""` or
`aria-hidden="true"`. When the mark identifies the organization, expose the
name “Mint Shelf” through image alternative text, visible text participating in
the same link or control, or the container's accessible name. Avoid duplicate
naming within the same accessible-name computation.

Logos are exempt from non-text contrast requirements but must remain visually
distinct. Never use the mark as an unlabeled control or as the only indication
of state. Consumers must test text, control boundaries, focus, hover, disabled,
and other interaction states against their actual adjacent colors.

## Consumer contracts

Consumers pin an exact Brand commit, consume only manifest-listed assets, and
record the revision in their dependency or handoff. A local copy is a delivery
artifact, not a new approval.

- **Product** owns semantic colors, spacing, radii, elevation, components,
  interaction states, typography scale, layout, platform icon generation, and
  production motion code.
- **Site** owns web presentation, page composition, theme code, and web-specific
  accessibility behavior while using the approved mark, recognition color, and
  typeface.
- **CMS** owns editorial type treatments and delivery-specific presentation.
  Campaign art, screenshots, templates, photography, partner lockups, and other
  delivery-specific material remain outside Brand.

Asset manifest version 2 removes every black and white mark variant and adds the
new mark, application-icon source, and motion reference. Consumers require a
coordinated migration before adopting this Brand revision.
