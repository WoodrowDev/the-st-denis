// Browser-side orchestration for generating a St. Denis QR code.
// Takes a URL + variant, builds the SVG, rasterizes it via Canvas, and
// runs jsQR against the result at four sizes to confirm scannability.

import jsQR from 'jsqr';
import { buildQrSvg, CANVAS_SIZE, type VariantName, type PaletteName } from './qr-svg';

export type ValidationResult = {
  size: number;
  ok: boolean;
  decoded: string | null;
};

export type GeneratedQr = {
  svg: string;
  pngBlob: Blob;
  pngDataUrl: string;
  svgDataUrl: string;
  validations: ValidationResult[];
  allOk: boolean;
};

export async function generateQr(opts: {
  url: string;
  variantName: VariantName;
  paletteName?: PaletteName;
}): Promise<GeneratedQr> {
  const svg = buildQrSvg(opts);
  const img = await loadSvgImage(svg);

  // Rasterize at full canvas size for preview + download.
  const { blob, dataUrl } = await imageToPng(img, CANVAS_SIZE);

  // Validate at four sizes. Decoder failures at smaller sizes predict real-
  // world scan failures on small prints more reliably than passes at 1400.
  const validations: ValidationResult[] = [];
  for (const size of [1400, 900, 600, 360]) {
    const imageData = await imageToImageData(img, size);
    const decoded = jsQR(imageData.data, imageData.width, imageData.height);
    validations.push({
      size,
      ok: decoded?.data === opts.url,
      decoded: decoded?.data ?? null,
    });
  }

  const svgDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return {
    svg,
    pngBlob: blob,
    pngDataUrl: dataUrl,
    svgDataUrl,
    validations,
    allOk: validations.every((v) => v.ok),
  };
}

// --- canvas plumbing ------------------------------------------------------

async function loadSvgImage(svg: string): Promise<HTMLImageElement> {
  // Using a Blob URL rather than a data URL so very large SVGs (the inlined
  // base64 face mark is ~230KB) don't choke the URL parser in older browsers.
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error('Failed to load generated SVG as an image'));
      el.src = url;
    });
    // Force decode so subsequent canvas draws don't race.
    if (typeof img.decode === 'function') {
      try { await img.decode(); } catch { /* fall through; onload already fired */ }
    }
    return img;
  } finally {
    // Safe to revoke after load completes — the image holds its own pixel data.
    URL.revokeObjectURL(url);
  }
}

function makeCanvas(size: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create 2D canvas context');
  return { canvas, ctx };
}

async function imageToPng(
  img: HTMLImageElement,
  size: number,
): Promise<{ blob: Blob; dataUrl: string }> {
  const { canvas, ctx } = makeCanvas(size);
  ctx.drawImage(img, 0, 0, size, size);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('canvas.toBlob returned null'))), 'image/png');
  });
  const dataUrl = canvas.toDataURL('image/png');
  return { blob, dataUrl };
}

async function imageToImageData(img: HTMLImageElement, size: number): Promise<ImageData> {
  const { ctx } = makeCanvas(size);
  ctx.drawImage(img, 0, 0, size, size);
  return ctx.getImageData(0, 0, size, size);
}

// --- helpers for callers --------------------------------------------------

/** Convert a Blob to a clean filename-bound URL for an anchor download. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Download a raw SVG string as a file. */
export function downloadSvg(svg: string, filename: string) {
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  downloadBlob(blob, filename);
}
