import { motion } from 'framer-motion';
import { Picture } from '../Picture';
import { type PhotoId } from '../../data/photos';

type Props = {
  photoId: PhotoId;
  quote: React.ReactNode;
  /** Citation, e.g. "— Bob & Sarah" */
  cite?: string;
  /** Min-height as a CSS clamp; defaults to 70vh. */
  minHeight?: string;
};

export function FullBleedQuote({
  photoId,
  quote,
  cite,
  minHeight = 'clamp(420px, 70vh, 720px)',
}: Props) {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ minHeight }}
    >
      <Picture id={photoId} sizes="100vw" className="absolute inset-0 w-full h-full" priority={false} />

      {/* Dark overlay with vignette for legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(43,22,33,0.55) 0%, rgba(43,22,33,0.35) 50%, rgba(43,22,33,0.7) 100%)',
        }}
      />

      <motion.blockquote
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto px-8 text-center"
      >
        <span
          aria-hidden
          className="block font-serif italic text-st-denis-gold text-6xl md:text-7xl leading-none mb-2 -mt-4 select-none"
        >
          “
        </span>
        <p className="font-serif italic text-st-denis-cream text-2xl md:text-4xl lg:text-5xl leading-[1.18] tracking-tight">
          {quote}
        </p>
        {cite && (
          <footer className="mt-8 font-sans uppercase tracking-[0.4em] text-[0.7rem] md:text-xs text-st-denis-cream/70">
            {cite}
          </footer>
        )}
      </motion.blockquote>
    </section>
  );
}
