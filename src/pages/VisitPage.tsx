import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Picture } from '../components/Picture';
import { SectionLabel } from '../components/sections/SectionLabel';
import { VisitMap } from '../components/sections/VisitMap';
import { MailingListSection } from '../components/MailingListSection';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { brand } from '../data/brand';

export function VisitPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Visit"
        description={`${brand.address.full}. ${brand.hoursSummary}.`}
        localBusiness
        path="/visit"
      />

      {/* Hero — full-bleed exterior twilight, anchored info card */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] bg-st-denis-burgundy flex items-end overflow-hidden">
        <Picture
          id="exterior-storefront"
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(43,22,33,0.4) 0%, rgba(43,22,33,0.2) 40%, rgba(43,22,33,0.85) 100%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="relative z-10 px-6 md:px-12 pb-20 md:pb-28 max-w-5xl"
        >
          <SectionLabel tone="cream">Visit</SectionLabel>
          <h1 className="font-serif text-st-denis-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mt-6">
            Find us at <em className="text-st-denis-gold">426</em>.
          </h1>
          <p className="font-serif italic text-st-denis-cream/85 text-lg md:text-2xl mt-6 max-w-2xl">
            Look for the etched seal on the doors. Push them open. Stay awhile.
          </p>
        </motion.div>
      </section>

      <VisitMap />

      {/* Light bites + parking notes */}
      <section className="bg-st-denis-burgundy text-st-denis-cream px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel tone="gold">By the Glass &amp; Bottle</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl mt-6 mb-5 leading-tight">
              Light bites,<br />curated for the wine.
            </h2>
            <p className="font-sans text-st-denis-cream/80 leading-relaxed">
              Cheese boards, charcuterie, olives, marcona almonds, and small plates designed by Josh to play with each pour. Ask what's open — we love a recommendation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <SectionLabel tone="gold">Getting here</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl mt-6 mb-5 leading-tight">
              Right downtown.
            </h2>
            <p className="font-sans text-st-denis-cream/80 leading-relaxed mb-3">
              Street parking on Washington and the surrounding blocks. A short walk from anywhere downtown — and right next door to the rest of an evening worth lingering over.
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address.full)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-gold border-b border-st-denis-gold/40 pb-1 hover:border-st-denis-gold transition-colors mt-4"
            >
              Open in Google Maps →
            </a>
          </motion.div>
        </div>
      </section>

      <MailingListSection />
      <Footer />
    </>
  );
}
