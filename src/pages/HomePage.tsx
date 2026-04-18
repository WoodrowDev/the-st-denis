import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/HeroSection';
import { MarbledDivider } from '../components/MarbledDivider';
import { MailingListSection } from '../components/MailingListSection';
import { Footer } from '../components/Footer';
import { hours } from '../data/hours';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function HomePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <HeroSection />
      <MarbledDivider texture="teal" />

      {/* About preview */}
      <section className="py-20 md:py-28 px-6 md:px-8 relative" style={{ backgroundImage: 'url(/images/paper-texture.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ staggerChildren: 0.12 }}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-st-denis-burgundy mb-8">
            Cheers, and Welcome to St. Denis!
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-base md:text-lg text-st-denis-burgundy/80 leading-relaxed mb-6">
            Nestled in the heart of downtown Columbus, Indiana, St. Denis is your cozy nook to slow down, savor, and stay awhile. A boutique haven for fine wine lovers and vintage book collectors — equal parts stylish living room and neighborhood anchor.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-serif italic text-xl text-st-denis-burgundy mb-8">
            Come curious. Leave inspired.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <Link to="/about" className="inline-block border-2 border-st-denis-burgundy text-st-denis-burgundy px-8 py-3 rounded-full font-sans text-sm tracking-[0.15em] uppercase hover:bg-st-denis-burgundy hover:text-st-denis-cream transition-all">
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <MarbledDivider texture="dark" />

      {/* Hours preview */}
      <section className="py-20 md:py-24 px-6 md:px-8 bg-st-denis-burgundy">
        <motion.div className="max-w-2xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ staggerChildren: 0.1 }}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-serif font-light text-st-denis-cream mb-10">
            Visit Us
          </motion.h2>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="space-y-3 mb-8">
            {hours.filter(h => !h.isClosed).map((h) => (
              <div key={h.days} className="flex justify-between items-baseline max-w-sm mx-auto">
                <span className="text-st-denis-cream/70 font-sans text-sm">{h.days}</span>
                <span className="flex-1 mx-3 border-b border-st-denis-cream/10" />
                <span className="text-st-denis-gold font-sans text-sm">{h.hours}</span>
              </div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-st-denis-cream/60 font-sans text-sm mb-6">
            426 Washington Street, Columbus, Indiana
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <Link to="/hours" className="inline-block border-2 border-st-denis-cream/30 text-st-denis-cream px-8 py-3 rounded-full font-sans text-sm tracking-[0.15em] uppercase hover:bg-st-denis-cream hover:text-st-denis-burgundy transition-all">
              Full Hours & Directions
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <MarbledDivider texture="multicolor" />

      {/* Events preview */}
      <section className="py-20 md:py-24 px-6 md:px-8 bg-st-denis-cream">
        <motion.div className="max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ staggerChildren: 0.12 }}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-st-denis-burgundy mb-4">
            Events
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-serif italic text-st-denis-burgundy/60 text-lg mb-8">
            Tastings, readings, and gatherings
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="py-8 px-6 border border-st-denis-burgundy/10 rounded-lg bg-white/50 mb-8">
            <p className="font-serif text-xl text-st-denis-burgundy/70 mb-3">New events are being planned.</p>
            <p className="text-st-denis-burgundy/50 font-sans text-sm">Stay tuned for our upcoming schedule of wine tastings, book readings, and community gatherings.</p>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <Link to="/events" className="inline-block border-2 border-st-denis-burgundy text-st-denis-burgundy px-8 py-3 rounded-full font-sans text-sm tracking-[0.15em] uppercase hover:bg-st-denis-burgundy hover:text-st-denis-cream transition-all">
              View Events
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <MarbledDivider texture="teal" />

      {/* Wine Guide teaser */}
      <section className="py-20 md:py-28 px-6 md:px-8 relative" style={{ backgroundImage: 'url(/images/marbled-dark.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ staggerChildren: 0.12 }}>
          <div className="bg-st-denis-cream/92 backdrop-blur-sm rounded-lg p-8 md:p-12 text-center">
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-st-denis-burgundy mb-4">
              The Wine Guide
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-st-denis-burgundy/70 font-sans text-base mb-8 max-w-xl mx-auto">
              Explore our curated collection. Every bottle has a story — from the vineyard to your glass. Curated by Josh Rattliff, certified sommelier.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <Link to="/wine-guide" className="inline-block bg-st-denis-burgundy text-st-denis-cream px-10 py-4 rounded-full font-sans text-sm tracking-[0.15em] uppercase hover:bg-st-denis-burgundy/90 transition-colors">
                Explore the Collection
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <MarbledDivider texture="dark" />
      <MailingListSection />
      <Footer />
    </>
  );
}
