import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Wine } from '../components/wine-guide/types';
import { WineRegionMap } from '../components/wine-guide/WineRegionMap';
import { WineSpectrum } from '../components/wine-guide/WineSpectrum';
import { Picture } from '../components/Picture';
import { SectionLabel } from '../components/sections/SectionLabel';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { photoForWine } from '../data/photos';
import { brand } from '../data/brand';

export function WineDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/wines.json')
      .then((r) => r.json())
      .then((data: Wine[]) => {
        setWines(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-st-denis-cream">
        <p className="font-serif italic text-st-denis-burgundy/60 text-xl">Pouring…</p>
      </div>
    );
  }

  const wine = wines.find((w) => w.id === slug);
  if (!wine) {
    return <Navigate to="/wine-guide" replace />;
  }

  const photoId = photoForWine(wine.id);
  const shortName = wine.title.includes(' — ') ? wine.title.split(' — ')[0] : wine.title;
  const producer = wine.title.includes(' — ') ? wine.title.split(' — ')[1] : '';

  // Pull spectrum values from facts
  const factMap = Object.fromEntries(wine.facts.map((f) => [f.l, f.v]));
  const grape = factMap['Grape'] ?? factMap['Grapes'] ?? factMap['Blend'] ?? '';
  const style = factMap['Style'] ?? '';
  const body = factMap['Body'] ?? '';

  // Find adjacent wines for prev/next nav
  const idx = wines.findIndex((w) => w.id === wine.id);
  const prev = wines[idx - 1];
  const next = wines[idx + 1];

  return (
    <div className="wine-detail-page">
      <SEO
        title={shortName}
        description={`${wine.opening} — ${wine.region}. From The Wine Guide at ${brand.fullName}.`}
        ogImage={photoId ? `/img/${photoId}-1280.jpg` : undefined}
        path={`/wine-guide/${wine.id}`}
      />

      {/* Hero — bottle photo + headline */}
      <section className="relative bg-st-denis-burgundy text-st-denis-cream pt-28 md:pt-36 pb-20 md:pb-28 px-6 md:px-10 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: wine.color, filter: 'blur(120px)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Bottle photo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="lg:col-span-5 lg:order-2"
          >
            {photoId ? (
              <Picture
                id={photoId}
                priority
                sizes="(min-width:1024px) 40vw, 80vw"
                className="w-full h-auto max-w-md mx-auto"
              />
            ) : (
              <div
                className="aspect-[3/4] w-full max-w-md mx-auto rounded-sm"
                style={{ background: wine.color }}
              />
            )}
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1 }}
            className="lg:col-span-7 lg:order-1"
          >
            <Link
              to="/wine-guide"
              className="inline-flex items-center gap-2 font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-cream/65 hover:text-st-denis-gold transition-colors mb-8"
            >
              ← The Wine Guide
            </Link>
            <SectionLabel tone="gold">
              {wine.cat === 'bubbles' ? 'Bubbles' : wine.cat === 'white' ? 'White' : wine.cat === 'red' ? 'Red' : 'Dessert'}
              {wine.vintage ? ` · ${wine.vintage}` : ''}
            </SectionLabel>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.0] tracking-tight mt-6 mb-4">
              {shortName}
            </h1>
            {producer && (
              <p className="font-serif italic text-st-denis-cream/70 text-xl md:text-2xl mb-6">
                {producer}
              </p>
            )}
            <p className="font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-cream/55 mb-10">
              {wine.region}
            </p>
            <p className="font-serif italic text-st-denis-cream text-lg md:text-2xl leading-snug max-w-2xl">
              “{wine.opening}”
            </p>
            {wine.keyword && (
              <div className="mt-10 inline-flex items-baseline gap-3">
                <span className="font-sans uppercase tracking-[0.3em] text-[0.65rem] text-st-denis-cream/55">
                  Keyword
                </span>
                <span className="font-serif italic text-st-denis-gold text-xl">
                  {wine.keyword}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* At a glance */}
      <section className="bg-st-denis-cream px-6 md:px-10 py-16 md:py-20 border-b border-st-denis-burgundy/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start">
          <div>
            <SectionLabel index="I.">At a glance</SectionLabel>
            <dl className="mt-6 space-y-3">
              {wine.facts.map((f) => (
                <div key={f.l} className="flex items-baseline gap-4">
                  <dt className="font-sans uppercase tracking-[0.2em] text-[0.65rem] text-st-denis-burgundy/55 w-24 flex-shrink-0">
                    {f.l}
                  </dt>
                  <dd className="font-serif text-st-denis-burgundy text-base md:text-lg flex-1">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <SectionLabel index="II.">Color</SectionLabel>
            <div className="mt-6 flex items-start gap-4">
              <div
                className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-full border border-st-denis-burgundy/15"
                style={{ background: wine.color }}
                aria-hidden
              />
              <p className="font-serif italic text-st-denis-burgundy/85 text-base md:text-lg leading-snug">
                {wine.colorDesc}
              </p>
            </div>
          </div>
          <div>
            <SectionLabel index="III.">Profile</SectionLabel>
            <div className="mt-6 space-y-5">
              {style && (
                <WineSpectrum label="Sweetness" leftLabel="Sweet" rightLabel="Dry" value={style} map="sweetness" />
              )}
              {body && (
                <WineSpectrum label="Body" leftLabel="Light" rightLabel="Full" value={body} map="body" />
              )}
              {grape && (
                <div>
                  <p className="font-sans uppercase tracking-[0.2em] text-[0.65rem] text-st-denis-burgundy/55 mb-1">
                    Grape
                  </p>
                  <p className="font-serif italic text-st-denis-burgundy/85">{grape}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Aroma & taste */}
      <section className="bg-st-denis-cream px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <SectionLabel index="IV.">Aroma &amp; Taste</SectionLabel>
          <div className="mt-10 space-y-10 font-serif text-st-denis-burgundy">
            <Sense label="Nose" body={wine.nose} />
            <Sense label="Palate" body={wine.palate} />
            <Sense label="Finish" body={wine.finish} />
          </div>
        </div>
      </section>

      {/* The Place + Region map */}
      <section className="bg-st-denis-burgundy text-st-denis-cream px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <SectionLabel index="V." tone="cream">The Place</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mt-6 mb-8 leading-tight">
              <em className="text-st-denis-gold italic">{wine.region.split(',')[0]}</em>{wine.region.includes(',') && <>,{wine.region.split(',').slice(1).join(',')}</>}
            </h2>
            <p className="font-sans text-st-denis-cream/85 text-[1.05rem] leading-relaxed">
              {wine.place}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="bg-st-denis-burgundy-light/30 p-6 md:p-10 border border-st-denis-cream/10">
              <WineRegionMap mapRegion={wine.mapRegion} />
            </div>
          </div>
        </div>
      </section>

      {/* The Producer */}
      <section className="bg-st-denis-cream px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <SectionLabel index="VI.">The Producer</SectionLabel>
          <p className="mt-10 font-serif text-st-denis-burgundy text-xl md:text-2xl leading-[1.5]">
            {wine.producer}
          </p>
        </div>
      </section>

      {/* Why we chose it */}
      {wine.whyWeChoseIt && (
        <section className="bg-st-denis-burgundy text-st-denis-cream px-6 md:px-10 py-20 md:py-28 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: wine.color, filter: 'blur(140px)' }}
          />
          <div className="relative max-w-3xl mx-auto">
            <SectionLabel index="VII." tone="cream">A note from St. Denis</SectionLabel>
            <p className="mt-10 font-serif italic text-st-denis-cream text-2xl md:text-3xl leading-snug">
              “{wine.whyWeChoseIt}”
            </p>
            <p className="mt-8 font-sans uppercase tracking-[0.3em] text-[0.7rem] text-st-denis-gold">
              — St. Denis
            </p>
          </div>
        </section>
      )}

      {/* Pairings */}
      <section className="bg-st-denis-cream px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <SectionLabel index="VIII.">Pour it with</SectionLabel>
          <ul className="mt-10 space-y-6 md:space-y-8">
            {wine.pairings.map((p, i) => (
              <li
                key={i}
                className="flex items-baseline gap-5 md:gap-8 pb-6 border-b border-st-denis-burgundy/15 last:border-b-0 last:pb-0"
              >
                <span className="font-serif italic text-st-denis-teal text-2xl md:text-3xl flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}.
                </span>
                <span className="font-serif text-st-denis-burgundy text-lg md:text-xl leading-snug">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final note */}
      <section className="bg-st-denis-cream px-6 md:px-10 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto text-center pt-12 border-t border-st-denis-burgundy/15">
          <p className="font-serif italic text-st-denis-burgundy/85 text-xl md:text-2xl leading-snug">
            {wine.final}
          </p>
        </div>
      </section>

      {/* Prev/Next */}
      <section className="bg-st-denis-burgundy text-st-denis-cream px-6 md:px-10 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6 md:gap-12">
          {prev ? (
            <Link to={`/wine-guide/${prev.id}`} className="group block">
              <p className="font-sans uppercase tracking-[0.25em] text-[0.65rem] text-st-denis-cream/55 mb-2">
                ← Previous
              </p>
              <p className="font-serif text-lg md:text-2xl leading-tight group-hover:text-st-denis-gold transition-colors">
                {prev.title.split(' — ')[0]}
              </p>
            </Link>
          ) : <div />}
          {next && (
            <Link to={`/wine-guide/${next.id}`} className="group block text-right ml-auto">
              <p className="font-sans uppercase tracking-[0.25em] text-[0.65rem] text-st-denis-cream/55 mb-2">
                Next →
              </p>
              <p className="font-serif text-lg md:text-2xl leading-tight group-hover:text-st-denis-gold transition-colors">
                {next.title.split(' — ')[0]}
              </p>
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Sense({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="font-sans uppercase tracking-[0.3em] text-[0.7rem] text-st-denis-teal mb-3">
        {label}
      </p>
      <p className="font-serif text-xl md:text-2xl leading-[1.5] text-st-denis-burgundy/90">
        {body}
      </p>
    </div>
  );
}
