import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';

const execFileAsync = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(await readFile(resolve(root, 'assets.json'), 'utf8'));
const schemaBytes = await readFile(resolve(root, 'schemas/assets.schema.json'));
const schema = JSON.parse(schemaBytes.toString('utf8'));
const tokens = JSON.parse(await readFile(resolve(root, 'tokens.json'), 'utf8'));
const SHA256 = /^[0-9a-f]{64}$/;
const COMMIT = /^[0-9a-f]{40}$/;
const ASSET_PATH = /^assets\/(?:[a-z0-9][a-z0-9.-]*\/)*[a-z0-9][a-z0-9.-]*$/;
const SCHEMA_SHA256 = 'cb357d1aa5c4f38c5e68eaa6326a16061723ead116e5aba324ce9144188cdcf6';
const MARK_ALPHA_SHA256 = '34fa7edccbd30722371d7a0f240fd40bc164baea934e2dbd76cf26fdcd4469db';

// The checks below intentionally mirror the dependency-free published schema.
// Pinning its bytes makes a schema edit fail until the executable contract is
// reviewed and updated with it.
if (sha256(schemaBytes) !== SCHEMA_SHA256 ||
    schema.$schema !== 'https://json-schema.org/draft/2020-12/schema' ||
    schema.additionalProperties !== false || schema.properties?.assets?.items?.additionalProperties !== false) {
  throw new Error('the local JSON Schema changed without a matching validator contract update');
}
assertShape(manifest, ['$schema', 'version', 'license', 'assets'], ['$schema', 'version', 'license', 'assets'], 'assets.json');
if (manifest.$schema !== './schemas/assets.schema.json' || manifest.version !== 1) {
  throw new Error('assets.json must use version 1 of the local asset schema');
}
if (manifest.license !== 'LICENSE.md' || !Array.isArray(manifest.assets) || manifest.assets.length === 0) {
  throw new Error('assets.json must declare the brand license and at least one asset');
}

const ids = new Set();
const paths = new Set();
const pngs = new Map();
for (const asset of manifest.assets) {
  const common = ['id', 'path', 'mediaType', 'sha256', 'width', 'height', 'purpose', 'introducedBy'];
  const format = asset.mediaType === 'image/png' ? ['hasAlpha'] : ['viewBox', 'color'];
  assertShape(asset, [...common, ...format], [...common, ...format, 'originalPath'], asset.id ?? 'unnamed asset');

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(asset.id ?? '') || ids.has(asset.id)) {
    throw new Error(`asset id must be unique kebab-case: ${asset.id}`);
  }
  ids.add(asset.id);
  if (!ASSET_PATH.test(asset.path ?? '') || paths.has(asset.path)) {
    throw new Error(`asset path must be unique and remain under assets/: ${asset.path}`);
  }
  paths.add(asset.path);
  if (!SHA256.test(asset.sha256 ?? '')) throw new Error(`${asset.id} must declare a SHA-256 digest`);
  if (!COMMIT.test(asset.introducedBy ?? '')) throw new Error(`${asset.id} must declare its full introduction commit`);
  if (asset.originalPath !== undefined && !ASSET_PATH.test(asset.originalPath)) {
    throw new Error(`${asset.id} original path must remain under assets/`);
  }
  if (!Number.isInteger(asset.width) || asset.width < 1 || !Number.isInteger(asset.height) || asset.height < 1) {
    throw new Error(`${asset.id} must declare positive integer dimensions`);
  }
  if (asset.mediaType === 'image/png' && typeof asset.hasAlpha !== 'boolean') {
    throw new Error(`${asset.id} must declare PNG alpha as a boolean`);
  }
  if (asset.mediaType === 'image/svg+xml' &&
      (typeof asset.viewBox !== 'string' || !/^#[0-9a-f]{6}$/.test(asset.color ?? ''))) {
    throw new Error(`${asset.id} must declare an SVG viewBox and lowercase six-digit hex color`);
  }
  if (typeof asset.purpose !== 'string' || asset.purpose.length === 0) {
    throw new Error(`${asset.id} must declare an approved purpose`);
  }

  const contents = await readFile(resolve(root, asset.path));
  const digest = sha256(contents);
  if (digest !== asset.sha256) throw new Error(`${asset.path} does not match its approved SHA-256 digest`);

  if (asset.mediaType === 'image/png') pngs.set(asset.id, validatePng(asset, contents));
  else if (asset.mediaType === 'image/svg+xml') validateSvg(asset, contents.toString('utf8'));
  else throw new Error(`${asset.id} has unsupported media type ${asset.mediaType}`);

  const historicalPath = asset.originalPath ?? asset.path;
  await execFileAsync('git', ['cat-file', '-e', `${asset.introducedBy}^{commit}`], { cwd: root });
  const { stdout } = await execFileAsync('git', ['show', `${asset.introducedBy}:${historicalPath}`], {
    cwd: root,
    encoding: 'buffer',
    maxBuffer: 10 * 1024 * 1024,
  });
  if (sha256(stdout) !== asset.sha256) {
    throw new Error(`${asset.id} provenance does not resolve to the approved bytes at ${asset.introducedBy}:${historicalPath}`);
  }
}

const markVariants = [
  ['mark-black-png', [0, 0, 0]],
  ['mark-green-png', [34, 197, 94]],
  ['mark-white-png', [255, 255, 255]],
];
const referenceMark = pngs.get('mark-green-png');
if (!referenceMark) throw new Error('mark-green-png must remain the raster mark geometry reference');
if (sha256(extractAlpha(referenceMark.pixels)) !== MARK_ALPHA_SHA256) {
  throw new Error('mark-green-png must retain the approved Mint Shelf mark silhouette');
}
for (const [id, color] of markVariants) {
  const variant = pngs.get(id);
  if (!variant || variant.width !== referenceMark.width || variant.height !== referenceMark.height) {
    throw new Error(`${id} must use the same raster dimensions as mark-green-png`);
  }
  for (let offset = 0; offset < variant.pixels.length; offset += 4) {
    if (variant.pixels[offset + 3] !== referenceMark.pixels[offset + 3]) {
      throw new Error(`${id} must use the same mark silhouette as mark-green-png`);
    }
    const colorMustMatch = id === 'mark-green-png'
      ? variant.pixels[offset + 3] === 255
      : variant.pixels[offset + 3] > 0;
    if (colorMustMatch &&
        (variant.pixels[offset] !== color[0] ||
         variant.pixels[offset + 1] !== color[1] ||
         variant.pixels[offset + 2] !== color[2])) {
      throw new Error(`${id} must use its approved solid color without embedded artwork`);
    }
  }
}

const files = (await walk(resolve(root, 'assets')))
  .map((path) => relative(root, path).split(sep).join('/'))
  .sort();
const approved = [...paths].sort();
if (JSON.stringify(files) !== JSON.stringify(approved)) {
  throw new Error(`assets/ must exactly match assets.json\nfiles: ${files.join(', ')}\napproved: ${approved.join(', ')}`);
}

const green = manifest.assets.find((asset) => asset.id === 'mark-green-svg');
if (green?.color !== tokens.color?.brand?.mint?.$value) {
  throw new Error('the scalable mark color must equal color.brand.mint');
}

console.log('Approved assets match their inventory, bytes, metadata, provenance, and token contract.');

function validatePng(asset, contents) {
  if (contents.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') {
    throw new Error(`${asset.path} has an invalid PNG signature`);
  }
  const chunks = [];
  for (let offset = 8; offset < contents.length;) {
    if (offset + 12 > contents.length) throw new Error(`${asset.path} has a truncated PNG chunk`);
    const length = contents.readUInt32BE(offset);
    const end = offset + 12 + length;
    if (end > contents.length) throw new Error(`${asset.path} has a truncated PNG chunk body`);
    const type = contents.subarray(offset + 4, offset + 8).toString('ascii');
    const data = contents.subarray(offset + 8, offset + 8 + length);
    const expectedCrc = contents.readUInt32BE(offset + 8 + length);
    const actualCrc = crc32(contents.subarray(offset + 4, offset + 8 + length));
    if (actualCrc !== expectedCrc) throw new Error(`${asset.path} has an invalid ${type} chunk checksum`);
    chunks.push({ type, data });
    offset = end;
  }
  if (chunks[0]?.type !== 'IHDR' || chunks[0].data.length !== 13 || chunks.at(-1)?.type !== 'IEND') {
    throw new Error(`${asset.path} must have complete IHDR and IEND chunks`);
  }
  const header = chunks[0].data;
  const width = header.readUInt32BE(0);
  const height = header.readUInt32BE(4);
  const [bitDepth, colorType, compression, filter, interlace] = header.subarray(8);
  const hasAlpha = colorType === 4 || colorType === 6;
  if (width !== asset.width || height !== asset.height || hasAlpha !== asset.hasAlpha) {
    throw new Error(`${asset.path} PNG metadata does not match assets.json`);
  }
  if (bitDepth !== 8 || colorType !== 6 || compression !== 0 || filter !== 0 || interlace !== 0) {
    throw new Error(`${asset.path} must be a non-interlaced 8-bit RGBA PNG`);
  }
  const compressed = Buffer.concat(chunks.filter(({ type }) => type === 'IDAT').map(({ data }) => data));
  const pixels = inflateSync(compressed);
  const rowSize = width * 4 + 1;
  if (pixels.length !== rowSize * height) throw new Error(`${asset.path} has incomplete PNG pixel data`);
  const decoded = Buffer.alloc(width * height * 4);
  for (let row = 0; row < height; row += 1) {
    const filterType = pixels[row * rowSize];
    if (filterType > 4) throw new Error(`${asset.path} uses an invalid PNG row filter`);
    for (let column = 0; column < width * 4; column += 1) {
      const encoded = pixels[row * rowSize + 1 + column];
      const output = row * width * 4 + column;
      const left = column >= 4 ? decoded[output - 4] : 0;
      const above = row > 0 ? decoded[output - width * 4] : 0;
      const upperLeft = row > 0 && column >= 4 ? decoded[output - width * 4 - 4] : 0;
      const predictor = filterType === 0 ? 0
        : filterType === 1 ? left
          : filterType === 2 ? above
            : filterType === 3 ? Math.floor((left + above) / 2)
              : paeth(left, above, upperLeft);
      decoded[output] = (encoded + predictor) & 0xff;
    }
  }
  return { width, height, pixels: decoded };
}

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const aboveDistance = Math.abs(estimate - above);
  const upperLeftDistance = Math.abs(estimate - upperLeft);
  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) return left;
  return aboveDistance <= upperLeftDistance ? above : upperLeft;
}

function extractAlpha(pixels) {
  const alpha = Buffer.alloc(pixels.length / 4);
  for (let source = 3, target = 0; source < pixels.length; source += 4, target += 1) {
    alpha[target] = pixels[source];
  }
  return alpha;
}

function validateSvg(asset, contents) {
  const document = contents.trim().match(/^<svg\s+([^>]+)>\s*<path\s+([^>]+)\/>\s*<\/svg>$/);
  if (!document) throw new Error(`${asset.path} must contain only one self-contained SVG path`);
  const svg = attributes(document[1], asset.path);
  const path = attributes(document[2], asset.path);
  assertShape(svg, ['xmlns', 'viewBox', 'width', 'height'], ['xmlns', 'viewBox', 'width', 'height'], `${asset.path} svg`);
  assertShape(path, ['fill', 'd'], ['fill', 'd'], `${asset.path} path`);
  if (svg.xmlns !== 'http://www.w3.org/2000/svg' || Number(svg.width) !== asset.width || Number(svg.height) !== asset.height || svg.viewBox !== asset.viewBox) {
    throw new Error(`${asset.path} SVG metadata does not match assets.json`);
  }
  if (path.fill !== asset.color || path.d.length === 0) throw new Error(`${asset.path} must use its approved path and color`);
}

function attributes(source, name) {
  const result = {};
  const remainder = source.replace(/([A-Za-z][\w:-]*)="([^"]*)"/g, (_, key, value) => {
    result[key] = value;
    return '';
  });
  if (remainder.trim() !== '') throw new Error(`${name} has malformed or unsupported SVG attributes`);
  return result;
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) return walk(path);
    if (entry.isFile()) return [path];
    throw new Error(`assets/ may contain only regular files and directories: ${relative(root, path)}`);
  }));
  return nested.flat();
}

function assertShape(value, required, allowed, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${name} must be an object`);
  const actual = Object.keys(value);
  const missing = required.filter((key) => !actual.includes(key));
  const unexpected = actual.filter((key) => !allowed.includes(key));
  if (missing.length > 0 || unexpected.length > 0) {
    throw new Error(`${name} fields do not match the contract; missing: ${missing.join(', ') || 'none'}; unexpected: ${unexpected.join(', ') || 'none'}`);
  }
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function crc32(value) {
  let crc = 0xffffffff;
  for (const byte of value) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
