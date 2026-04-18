import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  generateQr,
  downloadBlob,
  downloadSvg,
  type GeneratedQr,
} from '../lib/qr-generator';
import {
  VARIANT_LIST,
  VARIANT_NOTES,
  PALETTE_LIST,
  type VariantName,
  type PaletteName,
} from '../lib/qr-svg';

const BASE_URL = 'https://thestdenis.com';
const DEBOUNCE_MS = 300;

/** Normalize path: ensure leading slash, strip trailing slash (except root). */
function normalizePath(raw: string): string {
  let p = raw.trim();
  if (!p.startsWith('/')) p = '/' + p;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

/** Safe filename slug derived from the path. `/wine-guide` → `wine-guide`. */
function slugFromPath(path: string): string {
  const s = path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-').replace(/[^a-zA-Z0-9\-_]/g, '-');
  return s || 'home';
}

export function QrGeneratorPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [path, setPath] = useState<string>('/hours');
  const [variantName, setVariantName] = useState<VariantName>('estate');
  const [paletteName, setPaletteName] = useState<PaletteName>('brand');
  const [result, setResult] = useState<GeneratedQr | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);

  const normalizedPath = useMemo(() => normalizePath(path), [path]);
  const fullUrl = `${BASE_URL}${normalizedPath}`;

  // Debounce regeneration so every keystroke doesn't rerun the canvas pipeline.
  // The generation call holds an ID in a ref so that if a new run kicks off
  // before the previous settles, we discard the stale result.
  const runIdRef = useRef(0);
  useEffect(() => {
    const handle = setTimeout(() => {
      const thisRun = ++runIdRef.current;
      setIsGenerating(true);
      setError(null);
      generateQr({ url: fullUrl, variantName, paletteName })
        .then((r) => {
          if (runIdRef.current === thisRun) setResult(r);
        })
        .catch((err: unknown) => {
          if (runIdRef.current === thisRun) {
            const msg = err instanceof Error ? err.message : String(err);
            setError(msg.includes('Data is too big')
              ? `URL is too long for this QR version (${fullUrl.length} chars). Try a shorter path.`
              : msg);
            setResult(null);
          }
        })
        .finally(() => {
          if (runIdRef.current === thisRun) setIsGenerating(false);
        });
    }, DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [fullUrl, variantName, paletteName]);

  // Include palette in the filename only when it's not the default brand
  // palette, so everyday downloads stay clean (e.g. stdenis-qr-hours-estate.png).
  const paletteSuffix = paletteName === 'brand' ? '' : `-${paletteName}`;
  const baseFilename = `stdenis-qr-${slugFromPath(normalizedPath)}-${variantName}${paletteSuffix}`;

  return (
    <div className="min-h-screen bg-st-denis-cream pt-28 md:pt-36 pb-16 md:pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-light text-st-denis-burgundy">
              QR Generator
            </h1>
            <p className="font-serif italic text-st-denis-burgundy/60 mt-1">
              Make a branded QR for any page on the site.
            </p>
          </div>
          <Link
            to="/"
            className="text-sm font-sans text-st-denis-burgundy/60 hover:text-st-denis-burgundy transition-colors"
          >
            ← back to site
          </Link>
        </header>

        {/* URL input */}
        <section className="mb-8">
          <label className="block text-xs font-sans font-bold tracking-[0.2em] uppercase text-st-denis-burgundy/60 mb-2">
            Link destination
          </label>
          <div className="flex items-stretch border border-st-denis-burgundy/20 bg-white rounded-md overflow-hidden focus-within:border-st-denis-gold transition-colors">
            <span className="px-4 py-3 font-sans text-st-denis-burgundy/50 bg-st-denis-cream/50 border-r border-st-denis-burgundy/10 select-none">
              thestdenis.com
            </span>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="/hours"
              className="flex-1 px-4 py-3 font-sans text-st-denis-burgundy outline-none bg-transparent"
            />
          </div>
          <p className="mt-2 text-xs font-sans text-st-denis-burgundy/50">
            Full URL: <span className="font-mono">{fullUrl}</span>{' '}
            <span className="text-st-denis-burgundy/30">({fullUrl.length} chars)</span>
          </p>
        </section>

        {/* Variant picker */}
        <section className="mb-10">
          <label className="block text-xs font-sans font-bold tracking-[0.2em] uppercase text-st-denis-burgundy/60 mb-3">
            Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {VARIANT_LIST.map((v) => {
              const selected = v.name === variantName;
              return (
                <button
                  key={v.name}
                  type="button"
                  onClick={() => setVariantName(v.name)}
                  className={[
                    'text-left px-4 py-4 rounded-md border transition-colors',
                    selected
                      ? 'border-st-denis-gold bg-st-denis-burgundy text-st-denis-cream'
                      : 'border-st-denis-burgundy/20 bg-white hover:border-st-denis-burgundy/50 text-st-denis-burgundy',
                  ].join(' ')}
                >
                  <div className="font-serif text-lg">{v.label}</div>
                  <div className={[
                    'text-xs font-sans mt-1 leading-snug',
                    selected ? 'text-st-denis-cream/70' : 'text-st-denis-burgundy/60',
                  ].join(' ')}>
                    {VARIANT_NOTES[v.name]}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Palette picker */}
        <section className="mb-10">
          <label className="block text-xs font-sans font-bold tracking-[0.2em] uppercase text-st-denis-burgundy/60 mb-3">
            Color palette
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PALETTE_LIST.map((p) => {
              const selected = p.name === paletteName;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setPaletteName(p.name)}
                  className={[
                    'text-left px-4 py-3 rounded-md border transition-colors flex items-center gap-3',
                    selected
                      ? 'border-st-denis-gold bg-st-denis-burgundy text-st-denis-cream'
                      : 'border-st-denis-burgundy/20 bg-white hover:border-st-denis-burgundy/50 text-st-denis-burgundy',
                  ].join(' ')}
                >
                  {/* Two-tone swatch showing the ink + bg for this palette */}
                  <span
                    className="inline-block w-10 h-10 rounded-full border shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${p.bg} 0 50%, ${p.ink} 50% 100%)`,
                      borderColor: selected ? 'rgba(245,241,232,0.4)' : 'rgba(43,22,33,0.2)',
                    }}
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="block font-serif text-base">{p.label}</span>
                    <span className={[
                      'block text-xs font-sans mt-0.5 leading-snug',
                      selected ? 'text-st-denis-cream/70' : 'text-st-denis-burgundy/60',
                    ].join(' ')}>
                      {p.note}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Preview + actions */}
        <section className="grid md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-3">
            <div className="aspect-square bg-white rounded-md border border-st-denis-burgundy/10 overflow-hidden relative">
              {result && (
                <img
                  src={result.pngDataUrl}
                  alt={`QR code for ${fullUrl}`}
                  className={[
                    'w-full h-full object-contain transition-opacity duration-200',
                    isGenerating ? 'opacity-60' : 'opacity-100',
                  ].join(' ')}
                />
              )}
              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xs font-sans tracking-[0.2em] uppercase text-st-denis-burgundy/40">
                    Generating…
                  </span>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                  <p className="font-sans text-sm text-st-denis-burgundy/80">{error}</p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            {/* Validation */}
            <div className="bg-white border border-st-denis-burgundy/10 rounded-md p-4">
              <div className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-st-denis-burgundy/60 mb-2">
                Scan check
              </div>
              {result ? (
                <>
                  <div className={[
                    'font-sans text-sm mb-2',
                    result.allOk ? 'text-green-700' : 'text-red-700',
                  ].join(' ')}>
                    {result.allOk
                      ? '✓ Scans cleanly at every size'
                      : '✗ Fails to scan at some sizes'}
                  </div>
                  <ul className="space-y-1">
                    {result.validations.map((v) => (
                      <li key={v.size} className="flex justify-between text-xs font-mono text-st-denis-burgundy/70">
                        <span>{v.size} px</span>
                        <span className={v.ok ? 'text-green-700' : 'text-red-700'}>
                          {v.ok ? 'pass' : 'fail'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="font-sans text-sm text-st-denis-burgundy/40">Waiting for first render…</div>
              )}
            </div>

            {/* Downloads */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => result && downloadBlob(result.pngBlob, `${baseFilename}.png`)}
                disabled={!result}
                className="w-full px-4 py-3 rounded-md bg-st-denis-burgundy text-st-denis-cream font-sans font-medium tracking-wide hover:bg-st-denis-burgundy/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Download PNG
              </button>
              <button
                type="button"
                onClick={() => result && downloadSvg(result.svg, `${baseFilename}.svg`)}
                disabled={!result}
                className="w-full px-4 py-3 rounded-md border border-st-denis-burgundy text-st-denis-burgundy font-sans font-medium tracking-wide hover:bg-st-denis-burgundy/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Download SVG
              </button>
              <p className="text-xs font-sans text-st-denis-burgundy/40 text-center">
                PNG for print & social. SVG scales crisp at any size.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
