import { motion } from 'framer-motion';
import { hours } from '../data/hours';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function HoursSection() {
  return (
    <section
      id="hours"
      className="py-20 md:py-28 lg:py-32 px-6 md:px-8 bg-st-denis-burgundy"
    >
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-st-denis-cream mb-12 md:mb-16"
        >
          Hours
        </motion.h2>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="space-y-4 md:space-y-5 mb-12 md:mb-16"
        >
          {hours.map((h) => (
            <div
              key={h.days}
              className="flex justify-between items-baseline max-w-md mx-auto px-2"
            >
              <span
                className={`font-sans text-sm md:text-base tracking-wide ${
                  h.isClosed
                    ? 'text-st-denis-cream/40'
                    : 'text-st-denis-cream/80'
                }`}
              >
                {h.days}
              </span>
              <span className="flex-1 mx-3 border-b border-st-denis-cream/10" />
              <span
                className={`font-sans text-sm md:text-base ${
                  h.isClosed
                    ? 'text-st-denis-cream/40 italic'
                    : 'text-st-denis-gold'
                }`}
              >
                {h.hours}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-center gap-2 text-st-denis-teal">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-st-denis-cream/70 font-sans text-sm md:text-base">
              426 Washington Street, Columbus, Indiana
            </span>
          </div>
          <a
            href="tel:+18123716114"
            className="text-st-denis-cream/70 hover:text-st-denis-gold transition-colors font-sans text-sm md:text-base"
          >
            (812) 371-6114
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
