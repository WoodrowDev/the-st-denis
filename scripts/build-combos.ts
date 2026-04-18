import { buildQrSvg, VARIANT_LIST, PALETTE_LIST } from '../src/lib/qr-svg';
const url = 'https://thestdenis.com/hours';
const combos: Array<{ variant: string; palette: string; svg: string }> = [];
for (const v of VARIANT_LIST) for (const p of PALETTE_LIST) {
  combos.push({ variant: v.name, palette: p.name, svg: buildQrSvg({ url, variantName: v.name, paletteName: p.name }) });
}
import { writeFileSync } from 'fs';
writeFileSync(process.argv[2], JSON.stringify(combos));
