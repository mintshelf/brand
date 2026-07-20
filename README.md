# Mint Shelf brand

This repository is the public source for the approved Mint Shelf identity and
downloadable brand assets.

![Mint Shelf logo](assets/logo.svg)

## Identity

The **mark** is the standalone four-leaf symbol. The **logo** combines that exact
mark with the name “Mint Shelf” rendered in Public Sans Medium. The **app icon**
places the mark on a fixed square surface for operating systems and app stores.

| Asset | SVG | PNG | Use |
| --- | --- | --- | --- |
| Primary logo | [`logo.svg`](assets/logo.svg) | [`logo.png`](assets/logo.png) | Default company identification |
| Mark | [`mark.svg`](assets/mark.svg) | [`mark.png`](assets/mark.png) | Compact or already-labelled contexts |
| App icon | [`app-icon.svg`](assets/app-icon.svg) | [`app-icon.png`](assets/app-icon.png) | Platform icon generation only |
| Motion reference | [`motion-reference.svg`](assets/motion-reference.svg) | — | Non-production animation reference |

[`brand.json`](brand.json) exposes the same asset paths, colors, and typeface in
a small machine-readable form. Git commits provide versioning and integrity;
consumers should pin the exact Brand commit they adopt.

## Logo usage

The mark is always `#22c55e`; there are no approved black, white, gradient,
outlined, or alternate-color mark variants. In the primary logo, the name uses
the light-theme `onSurface` color, `#1a1c19`. If the mark is not visually
distinct on a surface, change the surface or placement rather than recoloring it.

Keep clear space equal to at least one quarter of the mark's visible width on
every side. Render the standalone mark at least 24 CSS pixels wide on screen or
8 mm wide in print. Scale assets uniformly. Do not crop, stretch, rotate,
rearrange, redraw, outline, add effects, or change the spacing within the logo.

Use the supplied primary logo when an exported asset must contain both the symbol
and company name. In application and web interfaces, the same treatment may be
built accessibly from the mark plus live text set in Public Sans Medium. Use the
standalone mark when Mint Shelf is already named nearby or the context is very
compact. Never use generated or model-drawn lettering for the company name.

For accessibility, hide a decorative identity asset with `alt=""` or
`aria-hidden="true"`. When it identifies the organization, provide “Mint Shelf”
as alternative text or through visible text in the same link or control. Never
use the mark as an unlabeled control or as the only indication of state.

## Color and typography

- Mint: `#22c55e`
- Application-icon surface: `#f9faf4`
- Typeface: [Public Sans](https://github.com/uswds/public-sans), then
  `system-ui`, then `sans-serif`

The logo lettering is an exact rendering of the Public Sans Medium font bundled
by Product. Its mark-to-type scale and spacing match Product's 36 px mark,
16 px gap, and 22 px title treatment. The SVG stores those real letterforms as
outlines so it does not require the font to be installed; the PNG is a direct
rasterization of that same SVG. No image model is used to draw the name. Brand
does not define UI palettes, type scales, spacing, radii, elevation, components,
or page layouts; those decisions belong to Product, Site, and CMS.

## Motion

The preferred entrance distributes the four leaves around a broad clockwise
orbit, then moves them along curved paths into the exact still geometry. Each
leaf may rotate counterclockwise during assembly, but all rotation stops when
the mark settles.

- Assembly: approximately 1,500 ms
- Easing: approximately `cubic-bezier(.22, 1, .36, 1)`
- Hold before transition: at least 400 ms
- Optional surface fade: 500 ms
- Stagger: none by default

[`motion-reference.svg`](assets/motion-reference.svg) loops only to demonstrate
the idea. Production implementations should play once, use native motion
primitives, and finish on the canonical mark. When reduced motion is requested,
show the complete mark immediately with an opacity transition no longer than
200 ms. Do not substitute orbiting, pulsing, scaling, or continuous rotation.

## Ownership boundaries

- **Brand** owns the approved identity assets, recognition color, app-icon
  surface, typeface choice, and usage rules in this repository.
- **Product** owns platform icon generation, semantic UI colors, typography
  scales, components, layout, interaction states, and production motion code.
- **Site** owns web presentation, favicon generation, page composition, and
  web-specific accessibility behavior.
- **CMS** owns editorial treatments, campaigns, screenshots, photography,
  partner material, and channel-specific output.

See [`LICENSE.md`](LICENSE.md) before using these assets publicly. Questions may
be sent to [press@mintshelf.com](mailto:press@mintshelf.com).
