import { motion } from 'framer-motion';
import { Picture } from '../Picture';
import { brand } from '../../data/brand';
import { hours } from '../../data/hours';
import { SectionLabel } from './SectionLabel';

/**
 * Visit panel: storefront photo + hours + address. No iframe; uses the
 * native Apple/Google maps deep-link plus a rendered address. Avoids the
 * Mapbox / Google API cost & cookie banner overhead.
 */
export function VisitMap() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address.full)}`;

  return (
    <section className="bg-st-denis-cream px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Storefront photo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7"
        >
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="block group relative">
            <Picture
              id="exterior-storefront"
              sizes="(min-width:1024px) 56vw, 100vw"
              className="w-full h-auto"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 bg-gradient-to-t from-st-denis-burgundy/85 to-transparent text-st-denis-cream">
              <p className="font-sans uppercase tracking-[0.3em] text-[0.65rem] md:text-xs opacity-80">
                Look for the etched logo
              </p>
              <p className="font-serif text-xl md:text-2xl mt-1 group-hover:text-st-denis-gold transition-colors">
                {brand.address.street}
              </p>
            </div>
          </a>
        </motion.div>

        {/* Visit details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <SectionLabel index="II.">Visit</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl text-st-denis-burgundy leading-[1.05] tracking-tight mt-6 mb-8">
            Pull up a chair.
          </h2>

          {/* Hours */}
          <div className="mb-10">
            <p className="font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-burgundy/55 mb-4">
              Hours
            </p>
            <ul className="space-y-2.5">
              {hours.map((h) => (
                <li
                  key={h.days}
                  className={`flex items-baseline gap-3 font-sans text-[0.95rem] ${
                    h.isClosed ? 'text-st-denis-burgundy/40' : 'text-st-denis-burgundy'
                  }`}
                >
                  <span className="flex-shrink-0 w-44 md:w-52">{h.days}</span>
                  <span className="flex-1 border-b border-st-denis-burgundy/15 translate-y-[-3px]" />
                  <span className={`flex-shrink-0 ${h.isClosed ? '' : 'text-st-denis-teal font-semibold'}`}>
                    {h.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Address + contact */}
          <div className="border-t border-st-denis-burgundy/15 pt-8">
            <p className="font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-burgundy/55 mb-3">
              Find us
            </p>
            <address className="not-italic font-serif text-lg md:text-xl text-st-denis-burgundy leading-relaxed">
              {brand.address.street}<br />
              {brand.address.city}, {brand.address.stateAbbr} {brand.address.postal}
            </address>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-sans">
              <a
                href={`tel:${brand.contact.phone.replace(/\D/g, '')}`}
                className="text-st-denis-burgundy hover:text-st-denis-teal underline-offset-4 hover:underline transition-colors"
              >
                {brand.contact.phoneDisplay}
              </a>
              <span className="text-st-denis-burgundy/30">·</span>
              <a
                href={`mailto:${brand.contact.email}`}
                className="text-st-denis-burgundy hover:text-st-denis-teal underline-offset-4 hover:underline transition-colors"
              >
                {brand.contact.email}
              </a>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-burgundy border-b border-st-denis-burgundy/30 pb-1 hover:border-st-denis-teal hover:text-st-denis-teal transition-colors"
            >
              Open in Maps
              <span aria-hidden>→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
