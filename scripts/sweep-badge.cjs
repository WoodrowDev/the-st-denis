const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const sharp = require('sharp');
const jsQR = require('jsqr');

const ROOT = path.resolve(__dirname, '..', 'St Denis', 'the-st-denis');
const CANVAS_SIZE = 1400;
const QR_VERSION = 6;
const ERROR_CORRECTION = 'H';
const QUIET_ZONE_MODULES = 6;
const MODULE_SIZE = 26;
const TARGET_URL = 'https://thestdenis.com/hours';
const COLORS = { burgundy: '#2B1621', cream: '#F5F1E8' };

function pointInVerticalCapsule(px, py, x, y, width, height) {
  const radius = width / 2;
  const centerX = x + width / 2;
  const topCenterY = y + radius;
  const bottomCenterY = y + height - radius;
  if (py >= topCenterY && py <= bottomCenterY && Math.abs(px - centerX) <= radius) return true;
  const topDx = px - centerX, topDy = py - topCenterY;
  const bottomDx = px - centerX, bottomDy = py - bottomCenterY;
  return topDx*topDx + topDy*topDy <= radius*radius || bottomDx*bottomDx + bottomDy*bottomDy <= radius*radius;
}
function matrixIndex(size, x, y) { return y * size + x; }
function isInFinder(size, x, y) {
  return (x<7&&y<7) || (x>=size-7&&y<7) || (x<7&&y>=size-7);
}
function isInAlignment(size, x, y) {
  const c = size-7;
  return x>=c-2&&x<=c+2&&y>=c-2&&y<=c+2;
}
function drawRoundedRect(x,y,w,h,r,fill){return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;}
function drawFinder(px,py,m){return [drawRoundedRect(px,py,m*7,m*7,m*1.15,COLORS.burgundy),drawRoundedRect(px+m,py+m,m*5,m*5,m*0.8,COLORS.cream),drawRoundedRect(px+m*2,py+m*2,m*3,m*3,m*0.45,COLORS.burgundy)].join('');}
function drawAlign(px,py,m){return [drawRoundedRect(px,py,m*5,m*5,m*0.8,COLORS.burgundy),drawRoundedRect(px+m,py+m,m*3,m*3,m*0.45,COLORS.cream),drawRoundedRect(px+m*2,py+m*2,m,m,m*0.16,COLORS.burgundy)].join('');}

async function decodePng(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const r = jsQR(new Uint8ClampedArray(data), info.width, info.height);
  return r ? r.data : null;
}

async function test(badgeWidth, badgeHeight, clearInset, moduleW, moduleH, qrVersion = QR_VERSION) {
  const qr = QRCode.create(TARGET_URL, { errorCorrectionLevel: ERROR_CORRECTION, version: qrVersion, margin: 0 });
  const size = qr.modules.size;
  const totalQrPixels = (size + QUIET_ZONE_MODULES * 2) * MODULE_SIZE;
  const outerOffset = (CANVAS_SIZE - totalQrPixels) / 2;
  const qrStart = outerOffset + QUIET_ZONE_MODULES * MODULE_SIZE;
  const qrEnd = qrStart + size * MODULE_SIZE;
  const badgeX = (CANVAS_SIZE - badgeWidth) / 2;
  const badgeY = (CANVAS_SIZE - badgeHeight) / 2;
  const maskX = badgeX - clearInset;
  const maskY = badgeY - clearInset;
  const maskW = badgeWidth + clearInset * 2;
  const maskH = badgeHeight + clearInset * 2;

  const mods = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!qr.modules.get(x, y)) continue;
      if (isInFinder(size, x, y) || isInAlignment(size, x, y)) continue;
      const px = qrStart + x * MODULE_SIZE;
      const py = qrStart + y * MODULE_SIZE;
      const cx = px + MODULE_SIZE/2, cy = py + MODULE_SIZE/2;
      const reserved = qr.modules.reservedBit[matrixIndex(size, x, y)] === 1;
      if (!reserved && pointInVerticalCapsule(cx, cy, maskX, maskY, maskW, maskH)) continue;
      const w = MODULE_SIZE * moduleW, h = MODULE_SIZE * moduleH;
      const mx = px + (MODULE_SIZE - w)/2, my = py + (MODULE_SIZE - h)/2;
      mods.push(drawRoundedRect(mx, my, w, h, Math.min(w,h)/2, COLORS.burgundy));
    }
  }

  const finders = [
    drawFinder(qrStart, qrStart, MODULE_SIZE),
    drawFinder(qrEnd - MODULE_SIZE*7, qrStart, MODULE_SIZE),
    drawFinder(qrStart, qrEnd - MODULE_SIZE*7, MODULE_SIZE),
    drawAlign(qrStart + (size-9)*MODULE_SIZE, qrStart + (size-9)*MODULE_SIZE, MODULE_SIZE),
  ];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}"><rect width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" fill="${COLORS.cream}"/>${mods.join('')}${finders.join('')}<rect x="${badgeX}" y="${badgeY}" width="${badgeWidth}" height="${badgeHeight}" rx="${badgeWidth/2}" fill="${COLORS.cream}"/></svg>`;

  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  const results = {};
  for (const s of [1400, 900, 600, 360]) {
    const r = await sharp(buf).resize(s, s).png().toBuffer();
    results[s] = await decodePng(r);
  }

  const maskArea = maskW * (maskH - maskW) + Math.PI * (maskW/2)**2;
  const qrArea = (size * MODULE_SIZE) ** 2;
  const coverage = (maskArea / qrArea * 100).toFixed(1);
  return { badgeWidth, badgeHeight, clearInset, moduleW, moduleH, coverage, results };
}

(async () => {
  const trials = [
    // [badgeW, badgeH, clearInset, modW, modH, qrVersion?]
    // ---- Tighter clearInset within v6, to buy more badge budget ----
    [380, 566, 10, 0.58, 0.87],
    [388, 578, 10, 0.58, 0.87],
    [395, 590, 8, 0.58, 0.87],
    [400, 596, 6, 0.58, 0.87],
    [410, 610, 4, 0.58, 0.87],
    // ---- Version 7 at same coverage % as Estate baseline, should allow bigger absolute badge ----
    [349, 520, 31, 0.61, 0.91, 7], // sanity check Estate at v7
    [420, 626, 28, 0.58, 0.87, 7],
    [440, 656, 24, 0.58, 0.87, 7],
    [460, 686, 22, 0.58, 0.87, 7],
    [480, 716, 18, 0.58, 0.87, 7],
  ];
  for (const t of trials) {
    const r = await test(...t);
    const allOk = Object.values(r.results).every(v => v === TARGET_URL);
    const shortResults = Object.entries(r.results).map(([s,v]) => `${s}:${v===TARGET_URL?'✓':'✗'}`).join(' ');
    const v = t[5] || 6;
    console.log(`v${v} badge ${t[0]}×${t[1]} inset ${t[2]} mod ${t[3]}×${t[4]}  cov ${r.coverage}%  ${allOk?'PASS':'fail'}  ${shortResults}`);
  }
})().catch(e => { console.error(e); process.exit(1); });
