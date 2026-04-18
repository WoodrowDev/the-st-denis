import { motion } from 'framer-motion';
import { events } from '../data/events';
import { EventCard } from './EventCard';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function EventsSection() {
  return (
    <section
      id="events"
      className="py-20 md:py-28 lg:py-32 px-6 md:px-8 bg-st-denis-cream"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-st-denis-burgundy text-center mb-4"
        >
          Events
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center font-serif italic text-st-denis-burgundy/60 text-lg md:text-xl mb-12 md:mb-16"
        >
          Join us for tastings, readings, and gatherings
        </motion.p>

        {events.length > 0 ? (
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center py-12 px-8 border border-st-denis-burgundy/10 rounded-lg bg-white/50"
          >
            <p className="font-serif text-xl md:text-2xl text-st-denis-burgundy/70 mb-4">
              New events are being planned.
            </p>
            <p className="text-st-denis-burgundy/50 font-sans mb-6">
              Be the first to know when we announce our next tasting, reading,
              or gathering.
            </p>
            <a
              href="#mailing-list"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#mailing-list')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block bg-st-denis-burgundy text-st-denis-cream px-8 py-3 rounded-full font-sans text-sm tracking-[0.15em] uppercase hover:bg-st-denis-burgundy/90 transition-colors"
            >
              Join the Mailing List
            </a>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
