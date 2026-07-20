import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('assets.json', root), 'utf8'));
const tokens = JSON.parse(await readFile(new URL('tokens.json', root), 'utf8'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) paths.push(...(await walk(path)));
    else paths.push(path);
  }
  return paths;
}

assert(manifest.version === 2, 'assets.json must use contract version 2');
assert(manifest.license === 'LICENSE.md', 'assets.json must name LICENSE.md');
assert(Array.isArray(manifest.assets) && manifest.assets.length > 0, 'assets.json must list assets');

const ids = new Set();
const paths = new Set();
for (const asset of manifest.assets) {
  assert(!ids.has(asset.id), `duplicate asset id: ${asset.id}`);
  assert(!paths.has(asset.path), `duplicate asset path: ${asset.path}`);
  assert(!/(?:black|white)/i.test(asset.path), `color variant is not approved: ${asset.path}`);
  ids.add(asset.id);
  paths.add(asset.path);

  const bytes = await readFile(new URL(asset.path, root));
  const digest = createHash('sha256').update(bytes).digest('hex');
  assert(digest === asset.sha256, `hash mismatch: ${asset.path}`);

  if (asset.mediaType === 'image/png') {
    assert(extname(asset.path) === '.png', `PNG extension mismatch: ${asset.path}`);
    assert(bytes.subarray(1, 4).toString() === 'PNG', `invalid PNG: ${asset.path}`);
    assert(bytes.readUInt32BE(16) === asset.width, `PNG width mismatch: ${asset.path}`);
    assert(bytes.readUInt32BE(20) === asset.height, `PNG height mismatch: ${asset.path}`);
    const hasAlphaChannel = [4, 6].includes(bytes[25]);
    assert(hasAlphaChannel === asset.hasAlpha, `PNG alpha metadata mismatch: ${asset.path}`);
  } else if (asset.mediaType === 'image/svg+xml') {
    assert(extname(asset.path) === '.svg', `SVG extension mismatch: ${asset.path}`);
    const svg = bytes.toString('utf8');
    assert(svg.includes(`viewBox="${asset.viewBox}"`), `SVG viewBox mismatch: ${asset.path}`);
    assert(svg.includes(asset.color), `SVG color mismatch: ${asset.path}`);
  } else {
    throw new Error(`unsupported media type: ${asset.mediaType}`);
  }
}

const rootPath = fileURLToPath(root);
const diskAssets = (await walk(fileURLToPath(new URL('assets/', root))))
  .map((path) => relative(rootPath, path))
  .sort();
assert(
  JSON.stringify([...paths].sort()) === JSON.stringify(diskAssets),
  `manifest and assets directory differ:\nmanifest=${[...paths].sort()}\ndisk=${diskAssets}`,
);

assert(tokens.color?.brand?.mint?.$value === '#22c55e', 'brand mint token must remain #22c55e');
assert(
  tokens.color?.brand?.applicationIconSurface?.$value === '#f9faf4',
  'application icon surface token must remain #f9faf4',
);
assert(
  JSON.stringify(tokens.font?.sans?.$value) === JSON.stringify(['Public Sans', 'system-ui', 'sans-serif']),
  'brand sans token must remain Public Sans with portable fallbacks',
);
assert(tokens.$extensions?.['com.mintshelf.contract']?.version === 2, 'tokens.json must use contract version 2');
assert(tokens.color?.light === undefined && tokens.color?.dark === undefined, 'Brand must not own semantic UI palettes');
assert(tokens.radius === undefined, 'Brand must not own consumer radius tokens');

console.log(`Brand check passed: ${manifest.assets.length} approved assets, green-only contract v${manifest.version}.`);
