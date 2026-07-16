import { readFile } from 'node:fs/promises';

const tokens = JSON.parse(await readFile(new URL('../tokens.json', import.meta.url), 'utf8'));
const HEX = /^#[0-9a-f]{6}$/;

const semanticNames = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'surface',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'outline',
  'outlineVariant',
];

for (const mode of ['light', 'dark']) {
  const palette = tokens.color?.[mode];
  if (palette?.$type !== 'color') throw new Error(`${mode} must declare the color token type`);
  if (JSON.stringify(Object.keys(palette).filter((key) => key !== '$type')) !== JSON.stringify(semanticNames)) {
    throw new Error(`${mode} must expose the complete ordered semantic color contract`);
  }
  for (const name of semanticNames) {
    if (!HEX.test(palette[name]?.$value ?? '')) throw new Error(`${mode}.${name} must be a six-digit hex color`);
  }
  assertContrast(palette.primary.$value, palette.onPrimary.$value, 4.5, `${mode}.primary`);
  assertContrast(palette.primaryContainer.$value, palette.onPrimaryContainer.$value, 4.5, `${mode}.primaryContainer`);
  assertContrast(palette.secondary.$value, palette.onSecondary.$value, 4.5, `${mode}.secondary`);
  assertContrast(palette.secondaryContainer.$value, palette.onSecondaryContainer.$value, 4.5, `${mode}.secondaryContainer`);
  assertContrast(palette.tertiary.$value, palette.onTertiary.$value, 4.5, `${mode}.tertiary`);
  assertContrast(palette.tertiaryContainer.$value, palette.onTertiaryContainer.$value, 4.5, `${mode}.tertiaryContainer`);
  assertContrast(palette.surface.$value, palette.onSurface.$value, 7, `${mode}.surface`);
  assertContrast(palette.surfaceVariant.$value, palette.onSurfaceVariant.$value, 4.5, `${mode}.surfaceVariant`);
}

if (!HEX.test(tokens.color?.brand?.mint?.$value ?? '')) throw new Error('color.brand.mint must be a hex color');
if (tokens.font?.sans?.$type !== 'fontFamily' || !Array.isArray(tokens.font.sans.$value)) {
  throw new Error('font.sans must be a portable font-family list');
}
if (tokens.radius?.$type !== 'dimension') throw new Error('radius must declare the dimension token type');
for (const [name, token] of Object.entries(tokens.radius)) {
  if (name === '$type') continue;
  if (token?.$value?.unit !== 'px' || !Number.isFinite(token.$value.value) || token.$value.value < 0) {
    throw new Error(`radius.${name} must be a non-negative pixel dimension`);
  }
}

console.log('Brand tokens are structurally valid and semantic color pairs meet contrast requirements.');

function assertContrast(background, foreground, minimum, name) {
  const ratio = contrast(background, foreground);
  if (ratio < minimum) throw new Error(`${name} contrast ${ratio.toFixed(2)} is below ${minimum}`);
}

function contrast(left, right) {
  const lighter = Math.max(luminance(left), luminance(right));
  const darker = Math.min(luminance(left), luminance(right));
  return (lighter + 0.05) / (darker + 0.05);
}

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map((value) => Number.parseInt(value, 16) / 255);
  const [red, green, blue] = channels.map((value) =>
    value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}
