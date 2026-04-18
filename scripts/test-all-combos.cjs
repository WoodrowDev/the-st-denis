const sharp = require('sharp');
const jsQR = require('jsqr');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const tmpFile = path.join(os.tmpdir(), `qr-combos-${Date.now()}.json`);
const out = spawnSync('npx', ['tsx', path.resolve(__dirname, 'build-combos.ts'), tmpFile], {
  cwd: path.resolve(__dirname, '..'),
  encoding: 'utf8',
});
if (out.status !== 0) { console.error('tsx failed:', out.stderr); process.exit(1); }
const combos = JSON.parse(fs.readFileSync(tmpFile, 'utf8'));
fs.unlinkSync(tmpFile);

async function decode(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const r = jsQR(new Uint8ClampedArray(data), info.width, info.height);
  return r ? r.data : null;
}

(async () => {
  const SIZES = [1400, 900, 600, 360];
  const EXPECTED = 'https://thestdenis.com/hours';
  const header = ['variant/palette'].concat(SIZES.map(s => `${s}px`));
  console.log(header.map(h => h.padEnd(18)).join(''));
  console.log('-'.repeat(header.length * 18));
  let allGood = true;
  for (const c of combos) {
    const row = [`${c.variant}/${c.palette}`];
    const base = await sharp(Buffer.from(c.svg)).png().toBuffer();
    for (const size of SIZES) {
      const resized = await sharp(base).resize(size, size).png().toBuffer();
      const decoded = await decode(resized);
      const ok = decoded === EXPECTED;
      if (!ok) allGood = false;
      row.push(ok ? '✓' : '✗');
    }
    console.log(row.map(c => c.padEnd(18)).join(''));
  }
  console.log();
  console.log(allGood ? 'All combos validate ✓' : 'Some combos FAILED');
  process.exit(allGood ? 0 : 1);
})().catch(e => { console.error(e); process.exit(1); });
