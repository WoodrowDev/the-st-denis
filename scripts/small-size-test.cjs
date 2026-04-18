const sharp = require('sharp');
const jsQR = require('jsqr');
const fs = require('fs');
const path = require('path');

const QR_DIR = path.resolve('public/images/qr');
const VARIANTS = ['estate', 'cellar', 'manor', 'portrait'];
const SIZES = [360, 300, 240, 200, 160, 140, 120, 100, 90, 80];
const EXPECTED = 'https://thestdenis.com/hours';

async function decode(pngBuf) {
  const { data, info } = await sharp(pngBuf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const r = jsQR(new Uint8ClampedArray(data), info.width, info.height);
  return r ? r.data : null;
}

(async () => {
  // Header
  const dpi = 300;
  console.log('Downscale test — jsQR decoding at shrinking pixel sizes.');
  console.log('Physical equivalents at', dpi, 'DPI print shown in parens.');
  console.log();
  const header = ['variant'].concat(SIZES.map(s => `${s}px`));
  console.log(header.map(h => h.padEnd(10)).join(''));
  const subheader = [''].concat(SIZES.map(s => `(${(s/dpi).toFixed(2)}")`));
  console.log(subheader.map(h => h.padEnd(10)).join(''));
  console.log('-'.repeat(header.length * 10));

  for (const variant of VARIANTS) {
    const pngPath = path.join(QR_DIR, `the-st-denis-hours-qr-${variant}.png`);
    const src = fs.readFileSync(pngPath);
    const row = [variant];
    for (const size of SIZES) {
      const resized = await sharp(src).resize(size, size, { kernel: 'lanczos3' }).png().toBuffer();
      const decoded = await decode(resized);
      row.push(decoded === EXPECTED ? '✓' : '✗');
    }
    console.log(row.map(c => c.padEnd(10)).join(''));
  }
})().catch(e => { console.error(e); process.exit(1); });
