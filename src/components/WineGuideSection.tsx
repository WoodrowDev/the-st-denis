import { motion } from 'framer-motion';
import { wines } from '../data/wines';
import { WineCard } from './WineCard';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const glassWines = wines.filter((w) => w.category === 'glass');
const bottleWines = wines.filter((w) => w.category === 'bottle');

export function WineGuideSection() {
  return (
    <section
      id="wine-guide"
      className="py-20 md:py-28 lg:py-32 px-6 md:px-8 relative"
      style={{
        backgroundImage: 'url(/images/marbled-dark.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.12 }}
      >
        <div className="bg-st-denis-cream/92 backdrop-blur-sm rounded-lg p-8 md:p-12 lg:p-16">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-st-denis-burgundy text-center mb-4"
          >
            The Wine Guide
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center font-sans text-st-denis-burgundy/60 text-sm md:text-base mb-12 max-w-2xl mx-auto"
          >
            Curated by Josh Rattliff, certified sommelier. Our selection
            celebrates discovery — wines with character, story, and soul.
          </motion.p>

          {/* By the Glass */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-st-denis-teal font-bold mb-4">
              By the Glass
            </h3>
            <div>
              {glassWines.map((wine) => (
                <WineCard key={wine.id} wine={wine} />
              ))}
            </div>
          </motion.div>

          {/* By the Bottle */}
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-st-denis-teal font-bold mb-4">
              By the Bottle
            </h3>
            <div>
              {bottleWines.map((wine) => (
                <WineCard key={wine.id} wine={wine} />
              ))}
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center text-st-denis-burgundy/40 font-sans text-xs mt-10 tracking-wide"
          >
            Featured selections. Full list available in store.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
