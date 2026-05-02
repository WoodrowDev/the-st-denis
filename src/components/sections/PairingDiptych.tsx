import { motion } from 'framer-motion';
import { Picture } from '../Picture';
import { photos, type PhotoEntry, type PhotoId } from '../../data/photos';

type Props = {
  /** Photo IDs of the two pairings to feature side-by-side. */
  pairing: [PhotoId, PhotoId];
  /** Chapter prefix above each pairing (Roman numeral, etc.). */
  numerals?: [string, string];
};

/**
 * The signature brand visual: two wine+book pairings shown side-by-side
 * with a typographic caption between them. Each pairing photo links to
 * its wine guide entry when a wineId is present.
 */
export function PairingDiptych({ pairing, numerals = ['I.', 'II.'] }: Props) {
  return (
    <section className="bg-st-denis-cream px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="font-sans uppercase tracking-[0.4em] text-xs text-st-denis-burgundy/60 mb-4">
            ✦ Wine, Books · A Pairing ✦
          </p>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-st-denis-burgundy leading-[1.05] tracking-tight max-w-3xl mx-auto">
            Every bottle a chapter.<br />
            <span className="italic text-st-denis-burgundy/70">Every book a glass poured.</span>
          </h2>
        </motion.div>

        {/* Diptych */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-3 lg:gap-6">
          {pairing.map((id, i) => {
            const photo = photos[id] as PhotoEntry;
            const slug = photo.wineId;
            const Wrap: React.ElementType = slug ? 'a' : 'div';
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.15 }}
              >
                <Wrap
                  {...(slug
                    ? {
                        href: `https://st-denis-wine-library.vercel.app/#${slug}`,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      }
                    : {})}
                  className="group block relative"
                >
                  <div className="relative overflow-hidden bg-st-denis-burgundy/5">
                    <Picture
                      id={id}
                      sizes="(min-width:768px) 50vw, 100vw"
                      className="w-full h-auto transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-6 md:mt-8 flex items-baseline gap-4">
                    <span className="font-serif italic text-2xl md:text-3xl text-st-denis-teal">
                      {numerals[i]}
                    </span>
                    <div className="flex-1">
                      {photo.book && (
                        <p className="font-sans uppercase tracking-[0.22em] text-[0.7rem] md:text-xs text-st-denis-burgundy/55">
                          paired with
                        </p>
                      )}
                      <p
                        className={`font-serif text-base md:text-lg leading-snug ${
                          photo.book ? 'mt-1' : ''
                        } text-st-denis-burgundy`}
                      >
                        {photo.book ?? photo.alt}
                      </p>
                    </div>
                    {slug && (
                      <span
                        className="font-sans uppercase tracking-[0.25em] text-[0.65rem] md:text-xs text-st-denis-burgundy/60 group-hover:text-st-denis-teal transition-colors"
                        aria-hidden
                      >
                        Read →
                      </span>
                    )}
                  </div>
                </Wrap>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
