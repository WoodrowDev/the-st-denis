import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Wine } from '../wine-guide/types';
import { categories } from '../wine-guide/types';
import { Picture } from '../Picture';
import { photoForWine } from '../../data/photos';

type Props = {
  wines: Wine[];
  filter?: string;
};

export function WineCardGrid({ wines, filter = 'all' }: Props) {
  const filtered = filter === 'all' ? wines : wines.filter((w) => w.cat === filter);

  // Group by category for editorial dividers
  const cats = categories.filter(
    (c) => filter === 'all' || filter === c.id
  ).filter((c) => filtered.some((w) => w.cat === c.id));

  return (
    <div className="space-y-20 md:space-y-28">
      {cats.map((cat) => {
        const winesInCat = filtered.filter((w) => w.cat === cat.id);
        return (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
            {/* Category divider */}
            <motion.header
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
              <div>
                <p className="font-sans uppercase tracking-[0.4em] text-[0.7rem] text-st-denis-burgundy/55 mb-3">
                  ✦ A Chapter ✦
                </p>
                <h2
                  id={`cat-${cat.id}`}
                  className="font-serif text-4xl md:text-5xl lg:text-6xl text-st-denis-burgundy leading-none tracking-tight"
                >
                  {cat.label}
                </h2>
              </div>
              <p className="font-serif italic text-st-denis-burgundy/65 text-base md:text-lg max-w-md md:text-right">
                {cat.description}
              </p>
            </motion.header>

            {/* Card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {winesInCat.map((w, i) => (
                <WineCard key={w.id} wine={w} index={i} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function WineCard({ wine, index }: { wine: Wine; index: number }) {
  const photoId = photoForWine(wine.id);
  const shortName = wine.title.includes(' — ') ? wine.title.split(' — ')[0] : wine.title;
  const producer = wine.title.includes(' — ') ? wine.title.split(' — ')[1] : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: (index % 3) * 0.08 }}
    >
      <Link to={`/wine-guide/${wine.id}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-st-denis-burgundy/5">
          {photoId ? (
            <Picture
              id={photoId}
              sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
              className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: wine.color }}>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-serif italic text-st-denis-cream/80 text-sm">
                  {wine.colorDesc}
                </p>
              </div>
            </div>
          )}
          {/* Vintage badge */}
          {wine.vintage && (
            <div className="absolute top-4 right-4 bg-st-denis-cream/90 backdrop-blur-sm font-sans uppercase tracking-[0.18em] text-[0.65rem] text-st-denis-burgundy px-3 py-1.5">
              {wine.vintage}
            </div>
          )}
        </div>
        <div className="mt-5 md:mt-6">
          <p className="font-sans uppercase tracking-[0.25em] text-[0.65rem] text-st-denis-teal/90 mb-2">
            {wine.region.split(',')[0]}
          </p>
          <h3 className="font-serif text-xl md:text-2xl text-st-denis-burgundy leading-[1.15] mb-1 group-hover:text-st-denis-teal transition-colors duration-300">
            {shortName}
          </h3>
          {producer && (
            <p className="font-serif italic text-st-denis-burgundy/55 text-sm md:text-base">
              {producer}
            </p>
          )}
          {wine.tags && wine.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {wine.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="font-sans uppercase tracking-[0.18em] text-[0.6rem] text-st-denis-burgundy/60 border border-st-denis-burgundy/20 px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
