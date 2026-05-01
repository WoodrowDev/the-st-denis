import { motion } from 'framer-motion';
import { Picture } from '../Picture';
import { type PhotoId } from '../../data/photos';

type Props = {
  photoIds: PhotoId[];
  /** Background tone. */
  tone?: 'cream' | 'burgundy';
};

/**
 * Three (or more) atmospheric detail shots. No text overlays, no captions —
 * pure mood. On mobile, snaps horizontally; on desktop, an asymmetric grid
 * (taller center, shorter sides) for editorial rhythm.
 */
export function AtmosphereStrip({ photoIds, tone = 'cream' }: Props) {
  const dark = tone === 'burgundy';
  return (
    <section
      className={`px-0 md:px-6 lg:px-10 py-16 md:py-24 ${
        dark ? 'bg-st-denis-burgundy' : 'bg-st-denis-cream'
      }`}
    >
      {/* Mobile: horizontal snap scroller */}
      <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 -mx-6 pb-2 scrollbar-none">
        {photoIds.map((id) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="snap-center shrink-0 w-[80vw] aspect-[3/4]"
          >
            <Picture id={id} sizes="80vw" className="w-full h-full" />
          </motion.div>
        ))}
      </div>

      {/* Desktop: three-up asymmetric grid */}
      <div className="hidden md:grid max-w-7xl mx-auto grid-cols-12 gap-3 lg:gap-5 auto-rows-[clamp(220px,30vh,420px)]">
        {photoIds.slice(0, 3).map((id, i) => {
          // Center photo gets taller treatment, side photos shorter
          const layout =
            i === 1
              ? 'col-span-4 row-span-2'
              : i === 0
              ? 'col-span-4 row-span-2 mt-12'
              : 'col-span-4 row-span-2 mb-12';
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.12 }}
              className={`relative overflow-hidden ${layout}`}
            >
              <Picture id={id} sizes="33vw" className="absolute inset-0 w-full h-full" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
