import { motion } from 'framer-motion';
import { brand } from '../../data/brand';

export type EventEntry = {
  id: string;
  slug?: string;
  title: string;
  date: string;
  time: string;
  description: string;
  photoId?: string;
};

type Props = {
  events: EventEntry[];
  /** Phase 1: tel/sms reservation hint. Phase 2: real reservation flow. */
  phase?: 1 | 2;
};

export function EventCardList({ events, phase = 1 }: Props) {
  if (events.length === 0) return <EmptyState />;

  return (
    <div className="max-w-5xl mx-auto space-y-10 md:space-y-14">
      {events.map((event, i) => (
        <motion.article
          key={event.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 pb-10 md:pb-14 border-b border-st-denis-burgundy/15 last:border-b-0"
        >
          {/* Date stamp */}
          <div className="md:col-span-3">
            <DateStamp dateIso={event.date} />
          </div>

          {/* Body */}
          <div className="md:col-span-7">
            <h3 className="font-serif text-2xl md:text-3xl text-st-denis-burgundy leading-tight mb-2">
              {event.title}
            </h3>
            <p className="font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-teal mb-4">
              {event.time}
            </p>
            <p className="font-sans text-st-denis-burgundy/85 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* CTA */}
          <div className="md:col-span-2 md:text-right">
            {phase === 1 ? (
              <a
                href={`tel:${brand.contact.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2 font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-burgundy/70 border-b border-st-denis-burgundy/25 pb-1 hover:text-st-denis-teal hover:border-st-denis-teal transition-colors"
              >
                Call to RSVP
              </a>
            ) : (
              <a
                href={`/events/${event.slug ?? event.id}/reserve`}
                className="inline-flex items-center gap-2 font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-burgundy border-b border-st-denis-burgundy pb-1 hover:text-st-denis-teal hover:border-st-denis-teal transition-colors"
              >
                Reserve →
              </a>
            )}
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function DateStamp({ dateIso }: { dateIso: string }) {
  const d = new Date(dateIso);
  if (isNaN(d.getTime())) {
    return <p className="font-serif italic text-st-denis-burgundy/50">{dateIso}</p>;
  }
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  const weekday = d.toLocaleString('en-US', { weekday: 'long' });
  return (
    <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1">
      <span className="font-sans uppercase tracking-[0.3em] text-[0.7rem] text-st-denis-burgundy/55">
        {month}
      </span>
      <span className="font-serif text-5xl md:text-6xl text-st-denis-burgundy leading-none">
        {day}
      </span>
      <span className="font-serif italic text-st-denis-burgundy/55 text-base">
        {weekday}
      </span>
    </div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-xl mx-auto text-center py-12 md:py-20"
    >
      <p className="font-sans uppercase tracking-[0.4em] text-[0.7rem] text-st-denis-burgundy/55 mb-6">
        ✦ A new chapter ✦
      </p>
      <p className="font-serif text-2xl md:text-3xl text-st-denis-burgundy leading-snug mb-4">
        New events are being planned.
      </p>
      <p className="font-serif italic text-st-denis-burgundy/65 text-base md:text-lg mb-8">
        Tastings, readings, and gatherings — coming soon.
      </p>
      <a
        href="#mailing-list"
        className="inline-block font-sans uppercase tracking-[0.25em] text-[0.7rem] text-st-denis-burgundy border-b border-st-denis-burgundy pb-1 hover:text-st-denis-teal hover:border-st-denis-teal transition-colors"
      >
        Be the first to know
      </a>
    </motion.div>
  );
}
