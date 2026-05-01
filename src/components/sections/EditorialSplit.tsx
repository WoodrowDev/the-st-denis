import { motion } from 'framer-motion';
import { Picture } from '../Picture';
import { type PhotoId } from '../../data/photos';
import { SectionLabel } from './SectionLabel';

type Props = {
  photoId: PhotoId;
  /** Place photo on the left or right (desktop). Default 'left'. */
  imageSide?: 'left' | 'right';
  label?: string;
  index?: string;
  /** Eyebrow / chapter title displayed in serif. */
  kicker?: string;
  title: string;
  /** Body content — pass paragraphs as children. */
  children: React.ReactNode;
  /** Optional small caption / pull-line shown beneath the photo. */
  caption?: string;
  /** Background tone of the section. */
  tone?: 'cream' | 'burgundy';
};

export function EditorialSplit({
  photoId,
  imageSide = 'left',
  label,
  index,
  kicker,
  title,
  children,
  caption,
  tone = 'cream',
}: Props) {
  const isLeft = imageSide === 'left';
  const dark = tone === 'burgundy';

  return (
    <section
      className={`relative px-6 md:px-10 py-20 md:py-28 lg:py-32 overflow-hidden ${
        dark ? 'bg-st-denis-burgundy text-st-denis-cream' : 'bg-st-denis-cream text-st-denis-burgundy'
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Photo */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className={`lg:col-span-7 ${isLeft ? 'lg:order-1' : 'lg:order-2'} relative`}
        >
          <div className="relative">
            <Picture
              id={photoId}
              sizes="(min-width:1024px) 56vw, 100vw"
              className="block w-full h-auto"
            />
            {/* Hairline corner — design ornament */}
            <span
              className={`hidden md:block absolute -top-3 -left-3 w-12 h-12 border-t border-l ${
                dark ? 'border-st-denis-cream/50' : 'border-st-denis-burgundy/40'
              }`}
              aria-hidden
            />
            <span
              className={`hidden md:block absolute -bottom-3 -right-3 w-12 h-12 border-b border-r ${
                dark ? 'border-st-denis-cream/50' : 'border-st-denis-burgundy/40'
              }`}
              aria-hidden
            />
          </div>
          {caption && (
            <figcaption
              className={`mt-4 font-serif italic text-sm md:text-[0.95rem] tracking-wide ${
                dark ? 'text-st-denis-cream/65' : 'text-st-denis-burgundy/55'
              }`}
            >
              {caption}
            </figcaption>
          )}
        </motion.figure>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className={`lg:col-span-5 ${isLeft ? 'lg:order-2' : 'lg:order-1'}`}
        >
          {label && <SectionLabel index={index} tone={dark ? 'cream' : 'burgundy'}>{label}</SectionLabel>}
          {kicker && (
            <p
              className={`font-serif italic text-base md:text-lg mt-6 ${
                dark ? 'text-st-denis-gold' : 'text-st-denis-teal'
              }`}
            >
              {kicker}
            </p>
          )}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight mt-3 mb-8">
            {title}
          </h2>
          <div
            className={`font-sans text-[1.02rem] md:text-[1.08rem] leading-[1.75] space-y-5 max-w-[34ch] ${
              dark ? 'text-st-denis-cream/85' : 'text-st-denis-burgundy/85'
            }`}
          >
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
