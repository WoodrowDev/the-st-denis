import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { events } from '../data/events';
import { EventCard } from '../components/EventCard';
import { MarbledDivider } from '../components/MarbledDivider';
import { MailingListSection } from '../components/MailingListSection';
import { Footer } from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function EventsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* Hero banner */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-st-denis-burgundy text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-st-denis-cream">Events</h1>
        <p className="font-serif italic text-st-denis-cream/60 text-lg mt-4">Tastings, readings, and gatherings</p>
      </section>

      <MarbledDivider texture="teal" />

      {/* Events content */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-st-denis-cream">
        <motion.div className="max-w-5xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.12 }}>
          {events.length > 0 ? (
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          ) : (
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="text-center max-w-xl mx-auto">
              <div className="py-16 px-8 border border-st-denis-burgundy/10 rounded-lg bg-white/50">
                <p className="font-serif text-2xl md:text-3xl text-st-denis-burgundy/70 mb-4">
                  New events are being planned.
                </p>
                <p className="text-st-denis-burgundy/50 font-sans mb-8 leading-relaxed">
                  We're putting together a calendar of wine tastings, book readings, art openings, and community gatherings. Join our mailing list to be the first to know.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#mailing-list"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#mailing-list')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-block bg-st-denis-burgundy text-st-denis-cream px-8 py-3 rounded-full font-sans text-sm tracking-[0.15em] uppercase hover:bg-st-denis-burgundy/90 transition-colors"
                  >
                    Join the Mailing List
                  </a>
                  <Link to="/" className="inline-block border-2 border-st-denis-burgundy text-st-denis-burgundy px-8 py-3 rounded-full font-sans text-sm tracking-[0.15em] uppercase hover:bg-st-denis-burgundy hover:text-st-denis-cream transition-all">
                    Back Home
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      <MarbledDivider texture="dark" />
      <MailingListSection />
      <Footer />
    </>
  );
}
