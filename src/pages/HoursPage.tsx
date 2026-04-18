import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { hours } from '../data/hours';
import { MarbledDivider } from '../components/MarbledDivider';
import { Footer } from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function HoursPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* Hero banner */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-st-denis-burgundy text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-st-denis-cream">Hours & Location</h1>
        <p className="font-serif italic text-st-denis-cream/60 text-lg mt-4">426 Washington Street, Columbus, Indiana</p>
      </section>

      <MarbledDivider texture="teal" />

      {/* Hours */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-st-denis-cream">
        <motion.div className="max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.1 }}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-serif font-light text-st-denis-burgundy text-center mb-12">
            Our Hours
          </motion.h2>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="space-y-5 mb-16">
            {hours.map((h) => (
              <div key={h.days} className="flex justify-between items-baseline max-w-md mx-auto px-2">
                <span className={`font-sans text-base md:text-lg tracking-wide ${h.isClosed ? 'text-st-denis-burgundy/40' : 'text-st-denis-burgundy/80'}`}>
                  {h.days}
                </span>
                <span className="flex-1 mx-4 border-b border-st-denis-burgundy/10" />
                <span className={`font-sans text-base md:text-lg font-medium ${h.isClosed ? 'text-st-denis-burgundy/40 italic' : 'text-st-denis-gold'}`}>
                  {h.hours}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <MarbledDivider texture="dark" />

      {/* Contact info */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-st-denis-burgundy">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.12 }}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-serif font-light text-st-denis-cream text-center mb-12">
            Get in Touch
          </motion.h2>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="font-sans font-bold text-sm tracking-[0.2em] uppercase text-st-denis-gold mb-3">Address</h3>
              <p className="text-st-denis-cream/70 font-sans">426 Washington Street</p>
              <p className="text-st-denis-cream/70 font-sans">Columbus, Indiana</p>
            </div>
            <div>
              <h3 className="font-sans font-bold text-sm tracking-[0.2em] uppercase text-st-denis-gold mb-3">Phone</h3>
              <a href="tel:+18123716114" className="text-st-denis-cream/70 hover:text-st-denis-cream transition-colors font-sans">(812) 371-6114</a>
            </div>
            <div>
              <h3 className="font-sans font-bold text-sm tracking-[0.2em] uppercase text-st-denis-gold mb-3">Email</h3>
              <a href="mailto:Bob@TheStDenis.com" className="text-st-denis-cream/70 hover:text-st-denis-cream transition-colors font-sans">Bob@TheStDenis.com</a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <MarbledDivider texture="multicolor" />
      <Footer />
    </>
  );
}
