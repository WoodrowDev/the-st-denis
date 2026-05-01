import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Picture } from '../Picture';
import { heroPhotoIds } from '../../data/photos';
import { brand } from '../../data/brand';

const SLIDE_MS = 6500;

export function CinematicHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((i) => (i + 1) % heroPhotoIds.length);
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-st-denis-burgundy">
      {/* Crossfading photo stack */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          {heroPhotoIds.map((id, i) =>
            i === active ? (
              <motion.div
                key={id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.4, ease: 'easeInOut' }, scale: { duration: SLIDE_MS / 1000, ease: 'easeOut' } }}
              >
                <Picture
                  id={id}
                  priority={i === 0}
                  sizes="100vw"
                  className="absolute inset-0 h-full w-full"
                  fit="cover"
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </div>

      {/* Vignette + bottom gradient for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(43,22,33,0) 0%, rgba(43,22,33,0.25) 70%, rgba(43,22,33,0.55) 100%)',
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-st-denis-burgundy via-st-denis-burgundy/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-st-denis-burgundy/60 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 px-6 text-center w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Tiny location marker above the wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans uppercase tracking-[0.5em] text-[0.65rem] md:text-xs text-st-denis-cream/70 mb-8 md:mb-10"
        >
          ✦ {brand.shortCity} ✦
        </motion.div>

        {/* Wordmark */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4, ease: 'easeOut' }}
          className="font-serif text-st-denis-cream text-[clamp(3rem,12vw,7.5rem)] leading-[0.95] tracking-tight mb-2"
        >
          <span className="block">
            <span className="text-[0.55em] align-baseline mr-1 italic">St.</span>
            DENIS
          </span>
        </motion.h1>

        {/* Subtitle / brand promise */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.0 }}
          className="font-sans uppercase tracking-[0.45em] text-[0.7rem] md:text-sm text-st-denis-gold mb-8"
        >
          Wine · Books · Wonders
        </motion.p>

        {/* Tagline — italic, hand-lettered feel */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="font-serif italic text-st-denis-cream/95 text-xl md:text-2xl lg:text-3xl tracking-wide"
          style={{ textShadow: '0 2px 18px rgba(0,0,0,0.5)' }}
        >
          Come curious. Leave inspired.
        </motion.p>
      </div>

      {/* Slide indicator — anchored to section bottom, outside content stack */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute z-10 bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3"
      >
        {heroPhotoIds.map((id, i) => (
          <button
            key={id}
            type="button"
            aria-label={`Show photo ${i + 1}`}
            onClick={() => setActive(i)}
            className="group p-2 -m-2"
          >
            <span
              className={`block h-px transition-all duration-700 ${
                i === active ? 'bg-st-denis-gold w-16' : 'bg-st-denis-cream/40 w-10 group-hover:bg-st-denis-cream/70'
              }`}
            />
          </button>
        ))}
      </motion.div>
    </section>
  );
}
