const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const sharp = require('sharp');
const jsQR = require('jsqr');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'qr');
const SOURCE_LOGO = path.join(ROOT, 'public', 'images', 'St__Denis_Logo.png');

const TARGET_URL = 'https://thestdenis.com/hours';
const CANVAS_SIZE = 1400;
const QR_VERSION = 6;
const ERROR_CORRECTION = 'H';
const QUIET_ZONE_MODULES = 6;
const MODULE_SIZE = 26;

const COLORS = {
  burgundy: '#2B1621',
  cream: '#F5F1E8',
  gold: '#D4A574',
};

const VARIANTS = [
  {
    name: 'estate',
    label: 'Estate',
    moduleShape: 'capsule',
    moduleWidthScale: 0.62,
    moduleHeightScale: 0.9,
    badgeWidth: 317,
    badgeHeight: 473,
    badgeStroke: 0,
    innerStroke: 0,
    logoScale: 1,
    logoOffsetX: 0,
    logoOffsetY: 0,
    clearInset: 28,
  },
  {
    name: 'cellar',
    label: 'Cellar',
    moduleShape: 'circle',
    moduleScale: 0.78,
    badgeWidth: 258,
    badgeHeight: 404,
    badgeStroke: 4,
    innerStroke: 2,
    logoScale: 1.16,
    logoOffsetX: -10,
    logoOffsetY: 10,
    clearInset: 22,
  },
];

function esc(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function fmt(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.00$/, '');
}

function matrixIndex(size, x, y) {
  return y * size + x;
}

function isInFinder(size, x, y) {
  return (
    (x >= 0 && x < 7 && y >= 0 && y < 7) ||
    (x >= size - 7 && x < size && y >= 0 && y < 7) ||
    (x >= 0 && x < 7 && y >= size - 7 && y < size)
  );
}

function isInAlignment(size, x, y) {
  const center = size - 7;
  return x >= center - 2 && x <= center + 2 && y >= center - 2 && y <= center + 2;
}

function pointInVerticalCapsule(px, py, x, y, width, height) {
  const radius = width / 2;
  const centerX = x + width / 2;
  const topCenterY = y + radius;
  const bottomCenterY = y + height - radius;

  if (py >= topCenterY && py <= bottomCenterY && Math.abs(px - centerX) <= radius) {
    return true;
  }

  const topDx = px - centerX;
  const topDy = py - topCenterY;
  const bottomDx = px - centerX;
  const bottomDy = py - bottomCenterY;

  return topDx * topDx + topDy * topDy <= radius * radius ||
    bottomDx * bottomDx + bottomDy * bottomDy <= radius * radius;
}

function drawRoundedRect(x, y, width, height, radius, fill) {
  return `<rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(width)}" height="${fmt(height)}" rx="${fmt(radius)}" fill="${fill}"/>`;
}

function drawCircle(cx, cy, radius, fill) {
  return `<circle cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(radius)}" fill="${fill}"/>`;
}

function drawModule(px, py, moduleSize, variant, fill) {
  if (variant.moduleShape === 'circle') {
    const size = moduleSize * variant.moduleScale;
    return drawCircle(px + moduleSize / 2, py + moduleSize / 2, size / 2, fill);
  }

  if (variant.moduleShape === 'capsule') {
    const width = moduleSize * (variant.moduleWidthScale ?? variant.moduleScale);
    const height = moduleSize * (variant.moduleHeightScale ?? variant.moduleScale);
    const capsuleX = px + (moduleSize - width) / 2;
    const capsuleY = py + (moduleSize - height) / 2;
    const radius = Math.min(width, height) / 2;

    return drawRoundedRect(capsuleX, capsuleY, width, height, radius, fill);
  }

  const size = moduleSize * variant.moduleScale;
  const inset = (moduleSize - size) / 2;
  const x = px + inset;
  const y = py + inset;
  const radius = Math.min(size * 0.28, size / 2);
  return drawRoundedRect(x, y, size, size, radius, fill);
}

function drawFinderPattern(px, py, moduleSize) {
  return [
    drawRoundedRect(px, py, moduleSize * 7, moduleSize * 7, moduleSize * 1.15, COLORS.burgundy),
    drawRoundedRect(px + moduleSize, py + moduleSize, moduleSize * 5, moduleSize * 5, moduleSize * 0.8, COLORS.cream),
    drawRoundedRect(px + moduleSize * 2, py + moduleSize * 2, moduleSize * 3, moduleSize * 3, moduleSize * 0.45, COLORS.burgundy),
  ].join('');
}

function drawAlignmentPattern(px, py, moduleSize) {
  return [
    drawRoundedRect(px, py, moduleSize * 5, moduleSize * 5, moduleSize * 0.8, COLORS.burgundy),
    drawRoundedRect(px + moduleSize, py + moduleSize, moduleSize * 3, moduleSize * 3, moduleSize * 0.45, COLORS.cream),
    drawRoundedRect(px + moduleSize * 2, py + moduleSize * 2, moduleSize, moduleSize, moduleSize * 0.16, COLORS.burgundy),
  ].join('');
}

async function buildFaceMarkBuffer() {
  return sharp(SOURCE_LOGO)
    .trim()
    .resize({ width: 900, fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer();
}

function buildVariantSvg({ qr, faceMarkBase64, variant }) {
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

  const moduleParts = [];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (!qr.modules.get(x, y)) {
        continue;
      }

      if (isInFinder(size, x, y) || isInAlignment(size, x, y)) {
        continue;
      }

      const px = qrStart + x * MODULE_SIZE;
      const py = qrStart + y * MODULE_SIZE;
      const centerX = px + MODULE_SIZE / 2;
      const centerY = py + MODULE_SIZE / 2;
      const reserved = qr.modules.reservedBit[matrixIndex(size, x, y)] === 1;

      if (!reserved && pointInVerticalCapsule(centerX, centerY, maskX, maskY, maskWidth, maskHeight)) {
        continue;
      }

      moduleParts.push(drawModule(px, py, MODULE_SIZE, variant, COLORS.burgundy));
    }
  }

  const finderParts = [
    drawFinderPattern(qrStart, qrStart, MODULE_SIZE),
    drawFinderPattern(qrEnd - MODULE_SIZE * 7, qrStart, MODULE_SIZE),
    drawFinderPattern(qrStart, qrEnd - MODULE_SIZE * 7, MODULE_SIZE),
    drawAlignmentPattern(qrStart + (size - 9) * MODULE_SIZE, qrStart + (size - 9) * MODULE_SIZE, MODULE_SIZE),
  ];

  const clipId = `${variant.name}-badge-clip`;
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}" role="img" aria-labelledby="${variant.name}-title ${variant.name}-desc">`,
    '<defs>',
    `<clipPath id="${clipId}">`,
    `<rect x="${fmt(badgeX)}" y="${fmt(badgeY)}" width="${fmt(variant.badgeWidth)}" height="${fmt(variant.badgeHeight)}" rx="${fmt(variant.badgeWidth / 2)}"/>`,
    '</clipPath>',
    '</defs>',
    `<title id="${variant.name}-title">The St. Denis Hours QR Code, ${esc(variant.label)} variant</title>`,
    `<desc id="${variant.name}-desc">A custom QR code linking to ${esc(TARGET_URL)} with The St. Denis face mark in the center.</desc>`,
    `<rect width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" fill="${COLORS.cream}"/>`,
    moduleParts.join(''),
    finderParts.join(''),
    `<rect x="${fmt(badgeX)}" y="${fmt(badgeY)}" width="${fmt(variant.badgeWidth)}" height="${fmt(variant.badgeHeight)}" rx="${fmt(variant.badgeWidth / 2)}" fill="${COLORS.cream}" stroke="${COLORS.burgundy}" stroke-width="${fmt(variant.badgeStroke)}"/>`,
    `<rect x="${fmt(badgeX + 9)}" y="${fmt(badgeY + 9)}" width="${fmt(variant.badgeWidth - 18)}" height="${fmt(variant.badgeHeight - 18)}" rx="${fmt((variant.badgeWidth - 18) / 2)}" fill="none" stroke="${COLORS.gold}" stroke-width="${fmt(variant.innerStroke)}"/>`,
    `<image x="${fmt(logoX)}" y="${fmt(logoY)}" width="${fmt(logoWidth)}" height="${fmt(logoHeight)}" href="data:image/png;base64,${faceMarkBase64}" clip-path="url(#${clipId})" preserveAspectRatio="xMidYMid meet"/>`,
    '</svg>',
  ].join('');

  return svg;
}

async function decodePng(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const result = jsQR(new Uint8ClampedArray(data), info.width, info.height);
  return result ? result.data : null;
}

async function validateVariant(pngBuffer) {
  const sizes = [1400, 900, 600, 360];
  const checks = [];

  for (const size of sizes) {
    const resized = await sharp(pngBuffer)
      .resize(size, size)
      .png()
      .toBuffer();

    const decoded = await decodePng(resized);
    checks.push({ size, decoded, ok: decoded === TARGET_URL });
  }

  return checks;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const qr = QRCode.create(TARGET_URL, {
    errorCorrectionLevel: ERROR_CORRECTION,
    version: QR_VERSION,
    margin: 0,
  });

  const faceMarkBuffer = await buildFaceMarkBuffer();
  const faceMarkBase64 = faceMarkBuffer.toString('base64');

  const manifest = {
    targetUrl: TARGET_URL,
    qrVersion: QR_VERSION,
    errorCorrection: ERROR_CORRECTION,
    outputs: [],
  };
  const previews = [];

  for (const variant of VARIANTS) {
    const svg = buildVariantSvg({ qr, faceMarkBase64, variant });
    const svgPath = path.join(OUTPUT_DIR, `the-st-denis-hours-qr-${variant.name}.svg`);
    const pngPath = path.join(OUTPUT_DIR, `the-st-denis-hours-qr-${variant.name}.png`);

    fs.writeFileSync(svgPath, svg);

    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    fs.writeFileSync(pngPath, pngBuffer);

    const validation = await validateVariant(pngBuffer);
    previews.push({
      label: variant.label,
      note: variant.name === 'estate' ? 'Best for print and signage' : 'More ornamental, still validated',
      pngBase64: pngBuffer.toString('base64'),
    });
    manifest.outputs.push({
      variant: variant.name,
      label: variant.label,
      svg: path.relative(ROOT, svgPath),
      png: path.relative(ROOT, pngPath),
      validation,
    });
  }

  const sheetWidth = 2200;
  const sheetHeight = 1420;
  const panelWidth = 940;
  const panelHeight = 1040;
  const panelY = 250;
  const panelXs = [100, 1160];
  const panelBg = '#FBF7F1';
  const panelStroke = '#E4D4BF';

  const sheetSvg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sheetWidth} ${sheetHeight}">`,
    `<rect width="${sheetWidth}" height="${sheetHeight}" fill="${COLORS.cream}"/>`,
    `<text x="100" y="110" fill="${COLORS.burgundy}" font-family="Georgia, serif" font-size="64">St. Denis Hours QR Concepts</text>`,
    `<text x="100" y="165" fill="${COLORS.burgundy}" font-family="Arial, sans-serif" font-size="28">Both variants validate to ${esc(TARGET_URL)}.</text>`,
    previews.map((preview, index) => {
      const panelX = panelXs[index];
      const qrX = panelX + 60;
      const qrY = panelY + 130;
      return [
        `<rect x="${panelX}" y="${panelY}" width="${panelWidth}" height="${panelHeight}" rx="38" fill="${panelBg}" stroke="${panelStroke}" stroke-width="4"/>`,
        `<text x="${panelX + 48}" y="${panelY + 82}" fill="${COLORS.burgundy}" font-family="Georgia, serif" font-size="44">${esc(preview.label)}</text>`,
        `<text x="${panelX + 48}" y="${panelY + 122}" fill="${COLORS.burgundy}" font-family="Arial, sans-serif" font-size="24">${esc(preview.note)}</text>`,
        `<image x="${qrX}" y="${qrY}" width="820" height="820" href="data:image/png;base64,${preview.pngBase64}"/>`,
      ].join('');
    }).join(''),
    '</svg>',
  ].join('');

  const sheetSvgPath = path.join(OUTPUT_DIR, 'the-st-denis-hours-qr-sheet.svg');
  const sheetPngPath = path.join(OUTPUT_DIR, 'the-st-denis-hours-qr-sheet.png');
  fs.writeFileSync(sheetSvgPath, sheetSvg);
  fs.writeFileSync(sheetPngPath, await sharp(Buffer.from(sheetSvg)).png().toBuffer());

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'the-st-denis-hours-qr-validation.json'),
    JSON.stringify(manifest, null, 2),
  );

  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
