import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CinematicHero } from '../components/sections/CinematicHero';
import { AtmosphereStrip } from '../components/sections/AtmosphereStrip';
import { PairingDiptych } from '../components/sections/PairingDiptych';
import { FullBleedQuote } from '../components/sections/FullBleedQuote';
import { VisitMap } from '../components/sections/VisitMap';
import { SectionLabel } from '../components/sections/SectionLabel';
import { Picture } from '../components/Picture';
import { MailingListSection } from '../components/MailingListSection';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { atmosphereStripIds, featuredPairings, photoForWine } from '../data/photos';
import type { Wine } from '../components/wine-guide/types';
import { brand } from '../data/brand';

/** Wines we feature in the "Tonight on the bar" block. */
const FEATURED_WINE_IDS = ['mtsvane', 'brunello', 'cabernet', 'gentil'];

export function HomePage() {
  const [wines, setWines] = useState<Wine[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/wines.json').then((r) => r.json()).then(setWines).catch(() => {});
  }, []);

  const featured = FEATURED_WINE_IDS
    .map((id) => wines.find((w) => w.id === id))
    .filter((w): w is Wine => Boolean(w));

  return (
    <>
      <SEO
        title="Wine, Books, and Wonders"
        description={`A boutique wine bar and vintage book haven in downtown Columbus, Indiana. ${brand.tagline}`}
        localBusiness
        path="/"
      />

      <CinematicHero />

      {/* Welcome chapter */}
      <section className="bg-st-denis-cream px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-10"
          >
            <SectionLabel index="I.">Welcome</SectionLabel>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl text-st-denis-burgundy leading-[1.1] tracking-tight mb-8"
          >
            A boutique haven for fine wine lovers <span className="italic text-st-denis-burgundy/65">and vintage book collectors.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-serif italic text-st-denis-burgundy/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Nestled in the heart of downtown Columbus, Indiana — your cozy nook to slow down, savor, and stay awhile.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <Link
              to="/wine-guide"
              className="inline-block bg-st-denis-burgundy text-st-denis-cream px-9 py-4 font-sans uppercase tracking-[0.25em] text-[0.7rem] hover:bg-st-denis-burgundy-light transition-colors"
            >
              Read the Wine Guide
            </Link>
            <Link
              to="/visit"
              className="inline-flex items-center gap-2 font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-burgundy border-b border-st-denis-burgundy/30 pb-1 hover:text-st-denis-teal hover:border-st-denis-teal transition-colors"
            >
              Plan your visit →
            </Link>
          </motion.div>
        </div>
      </section>

      <AtmosphereStrip photoIds={atmosphereStripIds} />

      {/* On the bar tonight */}
      <section className="bg-st-denis-burgundy text-st-denis-cream px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          >
            <div>
              <SectionLabel index="II." tone="cream">On the bar tonight</SectionLabel>
              <h2 className="font-serif text-3xl md:text-5xl mt-6 leading-[1.1] tracking-tight">
                Four to know.
              </h2>
            </div>
            <p className="font-serif italic text-st-denis-cream/65 text-base md:text-lg max-w-md">
              A rotating quartet from Josh, our certified sommelier — pulled from the cellar for tonight's pouring.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {featured.map((w, i) => {
              const photoId = photoForWine(w.id);
              const shortName = w.title.includes(' — ') ? w.title.split(' — ')[0] : w.title;
              return (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                >
                  <Link to={`/wine-guide/${w.id}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-st-denis-burgundy-light">
                      {photoId ? (
                        <Picture
                          id={photoId}
                          sizes="(min-width:1024px) 22vw, 45vw"
                          className="absolute inset-0 w-full h-full transition-transform duration-[1500ms] ease-out group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="absolute inset-0" style={{ background: w.color }} />
                      )}
                    </div>
                    <p className="font-sans uppercase tracking-[0.22em] text-[0.65rem] text-st-denis-gold mt-4 mb-1">
                      {w.region.split(',')[0]}
                    </p>
                    <h3 className="font-serif text-lg md:text-xl leading-snug group-hover:text-st-denis-gold transition-colors">
                      {shortName}
                    </h3>
                    {w.keyword && (
                      <p className="font-serif italic text-st-denis-cream/55 text-sm mt-1">
                        “{w.keyword}”
                      </p>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-14 flex justify-center">
            <Link
              to="/wine-guide"
              className="inline-flex items-center gap-3 font-sans uppercase tracking-[0.3em] text-[0.7rem] text-st-denis-cream/80 border-b border-st-denis-cream/30 pb-1 hover:text-st-denis-gold hover:border-st-denis-gold transition-colors"
            >
              All 26 wines in The Guide
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <FullBleedQuote
        photoId="interior-banquette"
        quote={<>Equal parts stylish living room <br /><em>and neighborhood anchor.</em></>}
        cite="A note from St. Denis"
      />

      <PairingDiptych
        pairing={[featuredPairings[0], featuredPairings[1]]}
        numerals={['III.', 'IV.']}
      />

      <PairingDiptych
        pairing={[featuredPairings[2], featuredPairings[3]]}
        numerals={['V.', 'VI.']}
      />

      <VisitMap />
      <MailingListSection />
      <Footer />
    </>
  );
}
