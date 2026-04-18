// Browser-safe QR SVG generator. This is a faithful TS port of the SVG-building
// parts of scripts/generate-hours-qr.cjs — they must stay in sync because
// both are expected to produce identical output for the same inputs. The Node
// script keeps its own copy because it runs under sharp; this module uses
// pre-rendered assets from qr-assets.ts (emitted by that same script).
//
// The only raster work that happens here is inside the browser's <img> +
// canvas pipeline, which the caller handles (see qr-generator.ts).

import QRCode from 'qrcode';
import { PALETTE_ASSETS, type PaletteName } from './qr-assets';

export const COLORS = {
  burgundy: '#2B1621',
  cream: '#F5F1E8',
  gold: '#D4A574',
  black: '#000000',
  white: '#FFFFFF',
} as const;

// Palette system. `ink` is the "dark" color (modules, finders, face-mark
// lines, cameo body). `bg` is the "light" color (canvas background,
// cameo carve-out). Gold stays gold across all palettes — it's used only
// by Cellar's inner ring, which keeps its own character.
export type Palette = {
  name: PaletteName;
  label: string;
  ink: string;
  bg: string;
  /** User-facing one-liner for the picker. */
  note: string;
};

export const PALETTES: Record<PaletteName, Palette> = {
  brand: {
    name: 'brand',
    label: 'Brand',
    ink: COLORS.burgundy,
    bg: COLORS.cream,
    note: 'The house palette — burgundy on cream',
  },
  ink: {
    name: 'ink',
    label: 'Ink',
    ink: COLORS.black,
    bg: COLORS.white,
    note: 'Pure B&W for embossing, foil, single-color print',
  },
  window: {
    name: 'window',
    label: 'Window',
    ink: COLORS.cream,
    bg: COLORS.burgundy,
    note: 'Inverted — for light vinyl on a dark window',
  },
};

export const PALETTE_LIST: Palette[] = Object.values(PALETTES);
export type { PaletteName };

export const CANVAS_SIZE = 1400;
export const QR_VERSION = 6;
export const ERROR_CORRECTION = 'H';
export const QUIET_ZONE_MODULES = 6;
export const MODULE_SIZE = 26;

export type VariantName = 'estate' | 'cellar' | 'manor' | 'portrait';

export type Variant = {
  name: VariantName;
  label: string;
  moduleShape: 'capsule' | 'circle' | 'cameo';
  moduleWidthScale?: number;
  moduleHeightScale?: number;
  moduleScale?: number;
  badgeWidth: number;
  badgeHeight: number;
  badgeStroke: number;
  innerStroke: number;
  innerInset: number;
  logoScale: number;
  logoOffsetX: number;
  logoOffsetY: number;
  clearInset: number;
};

export const VARIANTS: Record<VariantName, Variant> = {
  estate: {
    name: 'estate',
    label: 'Estate',
    moduleShape: 'capsule',
    moduleWidthScale: 0.61,
    moduleHeightScale: 0.91,
    badgeWidth: 349,
    badgeHeight: 520,
    badgeStroke: 0,
    innerStroke: 0,
    innerInset: 9,
    logoScale: 1,
    logoOffsetX: 0,
    logoOffsetY: 0,
    clearInset: 31,
  },
  cellar: {
    name: 'cellar',
    label: 'Cellar',
    moduleShape: 'circle',
    moduleScale: 0.78,
    badgeWidth: 258,
    badgeHeight: 404,
    badgeStroke: 4,
    innerStroke: 2,
    innerInset: 9,
    logoScale: 1.16,
    logoOffsetX: -10,
    logoOffsetY: 10,
    clearInset: 22,
  },
  manor: {
    name: 'manor',
    label: 'Manor',
    moduleShape: 'capsule',
    // Aspect 0.58/0.87 matches badge 380/566. No gold ring (innerStroke=0),
    // clearInset 10 gives breathing room around the badge. 17.6% coverage
    // under jsQR's ~18.8% ceiling. See generate-hours-qr.cjs for full notes.
    moduleWidthScale: 0.58,
    moduleHeightScale: 0.87,
    badgeWidth: 380,
    badgeHeight: 566,
    badgeStroke: 0,
    innerStroke: 0,
    innerInset: 9,
    logoScale: 1,
    logoOffsetX: 0,
    logoOffsetY: 0,
    clearInset: 10,
  },
  portrait: {
    name: 'portrait',
    label: 'Portrait',
    moduleShape: 'cameo',
    moduleScale: 0.95,
    badgeWidth: 349,
    badgeHeight: 520,
    badgeStroke: 0,
    innerStroke: 0,
    innerInset: 9,
    logoScale: 1,
    logoOffsetX: 0,
    logoOffsetY: 0,
    clearInset: 31,
  },
};

export const VARIANT_LIST: Variant[] = Object.values(VARIANTS);

export const VARIANT_NOTES: Record<VariantName, string> = {
  estate: 'Clean and legible — best for print and signage',
  cellar: 'More ornamental dots, still validated',
  manor: 'Maximalist medallion — bigger center, oval dots',
  portrait: 'Every dot is a tiny St. Denis cameo',
};

// --- helpers --------------------------------------------------------------

function esc(text: string): string {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function fmt(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.00$/, '');
}

function matrixIndex(size: number, x: number, y: number): number {
  return y * size + x;
}

function isInFinder(size: number, x: number, y: number): boolean {
  return (
    (x >= 0 && x < 7 && y >= 0 && y < 7) ||
    (x >= size - 7 && x < size && y >= 0 && y < 7) ||
    (x >= 0 && x < 7 && y >= size - 7 && y < size)
  );
}

function isInAlignment(size: number, x: number, y: number): boolean {
  const center = size - 7;
  return x >= center - 2 && x <= center + 2 && y >= center - 2 && y <= center + 2;
}

function pointInVerticalCapsule(
  px: number, py: number, x: number, y: number, width: number, height: number,
): boolean {
  const radius = width / 2;
  const centerX = x + width / 2;
  const topCenterY = y + radius;
  const bottomCenterY = y + height - radius;
  if (py >= topCenterY && py <= bottomCenterY && Math.abs(px - centerX) <= radius) return true;
  const topDx = px - centerX;
  const topDy = py - topCenterY;
  const bottomDx = px - centerX;
  const bottomDy = py - bottomCenterY;
  return (
    topDx * topDx + topDy * topDy <= radius * radius ||
    bottomDx * bottomDx + bottomDy * bottomDy <= radius * radius
  );
}

// --- SVG draw primitives --------------------------------------------------

function drawRoundedRect(x: number, y: number, w: number, h: number, r: number, fill: string): string {
  return `<rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}" rx="${fmt(r)}" fill="${fill}"/>`;
}

function drawCircle(cx: number, cy: number, r: number, fill: string): string {
  return `<circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(r)}" fill="${fill}"/>`;
}

function drawModule(
  px: number,
  py: number,
  moduleSize: number,
  variant: Variant,
  fill: string,
  cameoDims: { width: number; height: number },
): string {
  if (variant.moduleShape === 'cameo') {
    const h = moduleSize * (variant.moduleScale ?? 0.95);
    const aspect = cameoDims.width / cameoDims.height;
    const w = h * aspect;
    const x = px + (moduleSize - w) / 2;
    const y = py + (moduleSize - h) / 2;
    return `<use href="#mini-cameo" x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}"/>`;
  }
  if (variant.moduleShape === 'circle') {
    const size = moduleSize * (variant.moduleScale ?? 0.78);
    return drawCircle(px + moduleSize / 2, py + moduleSize / 2, size / 2, fill);
  }
  if (variant.moduleShape === 'capsule') {
    const w = moduleSize * (variant.moduleWidthScale ?? variant.moduleScale ?? 0.61);
    const h = moduleSize * (variant.moduleHeightScale ?? variant.moduleScale ?? 0.91);
    const cx = px + (moduleSize - w) / 2;
    const cy = py + (moduleSize - h) / 2;
    const r = Math.min(w, h) / 2;
    return drawRoundedRect(cx, cy, w, h, r, fill);
  }
  // default: rounded square
  const size = moduleSize * (variant.moduleScale ?? 0.85);
  const inset = (moduleSize - size) / 2;
  return drawRoundedRect(px + inset, py + inset, size, size, Math.min(size * 0.28, size / 2), fill);
}

function drawFinderPattern(px: number, py: number, m: number, ink: string, bg: string): string {
  return [
    drawRoundedRect(px, py, m * 7, m * 7, m * 1.15, ink),
    drawRoundedRect(px + m, py + m, m * 5, m * 5, m * 0.8, bg),
    drawRoundedRect(px + m * 2, py + m * 2, m * 3, m * 3, m * 0.45, ink),
  ].join('');
}

function drawAlignmentPattern(px: number, py: number, m: number, ink: string, bg: string): string {
  return [
    drawRoundedRect(px, py, m * 5, m * 5, m * 0.8, ink),
    drawRoundedRect(px + m, py + m, m * 3, m * 3, m * 0.45, bg),
    drawRoundedRect(px + m * 2, py + m * 2, m, m, m * 0.16, ink),
  ].join('');
}

// --- main ----------------------------------------------------------------

export type BuildQrSvgInput = {
  url: string;
  variantName: VariantName;
  paletteName?: PaletteName;
};

/**
 * Build a branded St. Denis QR SVG for the given URL, variant, and palette.
 * Returns a standalone SVG string with all assets inlined (data URIs) so it
 * can be saved or rasterized without further fetching.
 */
export function buildQrSvg({
  url,
  variantName,
  paletteName = 'brand',
}: BuildQrSvgInput): string {
  const variant = VARIANTS[variantName];
  if (!variant) throw new Error(`Unknown variant: ${variantName}`);
  const palette = PALETTES[paletteName];
  if (!palette) throw new Error(`Unknown palette: ${paletteName}`);
  const assets = PALETTE_ASSETS[paletteName];

  const qr = QRCode.create(url, {
    errorCorrectionLevel: ERROR_CORRECTION,
    version: QR_VERSION,
    margin: 0,
  });

  const size = qr.modules.size;
  const totalQrPixels = (size + QUIET_ZONE_MODULES * 2) * MODULE_SIZE;
  const outerOffset = (CANVAS_SIZE - totalQrPixels) / 2;
  const qrStart = outerOffset + QUIET_ZONE_MODULES * MODULE_SIZE;
  const qrEnd = qrStart + size * MODULE_SIZE;

  const badgeX = (CANVAS_SIZE - variant.badgeWidth) / 2;
  const badgeY = (CANVAS_SIZE - variant.badgeHeight) / 2;
  const maskX = badgeX - variant.clearInset;
  const maskY = badgeY - variant.clearInset;
  const maskWidth = variant.badgeWidth + variant.clearInset * 2;
  const maskHeight = variant.badgeHeight + variant.clearInset * 2;

  const logoWidth = variant.badgeWidth * variant.logoScale;
  const logoHeight = variant.badgeHeight * variant.logoScale;
  const logoX = badgeX + (variant.badgeWidth - logoWidth) / 2 + variant.logoOffsetX;
  const logoY = badgeY + (variant.badgeHeight - logoHeight) / 2 + variant.logoOffsetY;

  const moduleParts: string[] = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!qr.modules.get(x, y)) continue;
      if (isInFinder(size, x, y) || isInAlignment(size, x, y)) continue;

      const px = qrStart + x * MODULE_SIZE;
      const py = qrStart + y * MODULE_SIZE;
      const cx = px + MODULE_SIZE / 2;
      const cy = py + MODULE_SIZE / 2;
      const reserved = qr.modules.reservedBit[matrixIndex(size, x, y)] === 1;

      if (!reserved && pointInVerticalCapsule(cx, cy, maskX, maskY, maskWidth, maskHeight)) continue;

      moduleParts.push(drawModule(px, py, MODULE_SIZE, variant, palette.ink, assets.cameo));
    }
  }

  const finderParts = [
    drawFinderPattern(qrStart, qrStart, MODULE_SIZE, palette.ink, palette.bg),
    drawFinderPattern(qrEnd - MODULE_SIZE * 7, qrStart, MODULE_SIZE, palette.ink, palette.bg),
    drawFinderPattern(qrStart, qrEnd - MODULE_SIZE * 7, MODULE_SIZE, palette.ink, palette.bg),
    drawAlignmentPattern(qrStart + (size - 9) * MODULE_SIZE, qrStart + (size - 9) * MODULE_SIZE, MODULE_SIZE, palette.ink, palette.bg),
  ];

  const clipId = `${variant.name}-${palette.name}-badge-clip`;
  const cameoSymbol = variant.moduleShape === 'cameo'
    ? `<symbol id="mini-cameo" viewBox="0 0 ${assets.cameo.width} ${assets.cameo.height}"><image x="0" y="0" width="${assets.cameo.width}" height="${assets.cameo.height}" href="data:image/png;base64,${assets.cameo.base64}"/></symbol>`
    : '';

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}" role="img" aria-labelledby="${variant.name}-title ${variant.name}-desc">`,
    '<defs>',
    `<clipPath id="${clipId}">`,
    `<rect x="${fmt(badgeX)}" y="${fmt(badgeY)}" width="${fmt(variant.badgeWidth)}" height="${fmt(variant.badgeHeight)}" rx="${fmt(variant.badgeWidth / 2)}"/>`,
    '</clipPath>',
    cameoSymbol,
    '</defs>',
    `<title id="${variant.name}-title">The St. Denis QR Code, ${esc(variant.label)} variant, ${esc(palette.label)} palette</title>`,
    `<desc id="${variant.name}-desc">A custom QR code linking to ${esc(url)} with The St. Denis face mark in the center.</desc>`,
    `<rect width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" fill="${palette.bg}"/>`,
    moduleParts.join(''),
    finderParts.join(''),
    `<rect x="${fmt(badgeX)}" y="${fmt(badgeY)}" width="${fmt(variant.badgeWidth)}" height="${fmt(variant.badgeHeight)}" rx="${fmt(variant.badgeWidth / 2)}" fill="${palette.bg}" stroke="${palette.ink}" stroke-width="${fmt(variant.badgeStroke)}"/>`,
    `<rect x="${fmt(badgeX + variant.innerInset)}" y="${fmt(badgeY + variant.innerInset)}" width="${fmt(variant.badgeWidth - variant.innerInset * 2)}" height="${fmt(variant.badgeHeight - variant.innerInset * 2)}" rx="${fmt((variant.badgeWidth - variant.innerInset * 2) / 2)}" fill="none" stroke="${COLORS.gold}" stroke-width="${fmt(variant.innerStroke)}"/>`,
    `<g clip-path="url(#${clipId})"><image x="${fmt(logoX)}" y="${fmt(logoY)}" width="${fmt(logoWidth)}" height="${fmt(logoHeight)}" href="data:image/png;base64,${assets.faceMark}" preserveAspectRatio="xMidYMid meet"/></g>`,
    '</svg>',
  ].join('');
}
