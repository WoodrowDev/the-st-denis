const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const os = require('os');

const tmpFile = path.join(os.tmpdir(), `qr-combos-${Date.now()}.json`);
const out = spawnSync('npx', ['tsx', path.resolve(__dirname, 'build-combos.ts'), tmpFile], {
  cwd: path.resolve(__dirname, '..'), encoding: 'utf8',
});
if (out.status !== 0) { console.error(out.stderr); process.exit(1); }
const combos = JSON.parse(fs.readFileSync(tmpFile, 'utf8'));
fs.unlinkSync(tmpFile);

const OUT = path.resolve('public/images/qr/palette-samples');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  // Show Estate + Portrait in each palette — those cover the safest and
  // the most distinctive visually.
  const picks = combos.filter(c =>
    (c.variant === 'estate' || c.variant === 'portrait')
  );
  for (const c of picks) {
    const pngPath = path.join(OUT, `${c.variant}-${c.palette}.png`);
    await sharp(Buffer.from(c.svg)).png().toFile(pngPath);
    console.log(pngPath);
  }
})().catch(e => { console.error(e); process.exit(1); });
