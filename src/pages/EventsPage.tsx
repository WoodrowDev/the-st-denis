import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { events } from '../data/events';
import { EventCardList } from '../components/sections/EventCardList';
import { SectionLabel } from '../components/sections/SectionLabel';
import { Picture } from '../components/Picture';
import { MailingListSection } from '../components/MailingListSection';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export function EventsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Map local events to EventEntry shape; in Phase 2 this comes from Supabase.
  const list = events.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    time: e.time,
    description: e.description,
  }));

  return (
    <>
      <SEO
        title="Events"
        description="Wine tastings, book readings, and gatherings at St. Denis in Columbus, Indiana."
        path="/events"
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] bg-st-denis-burgundy text-st-denis-cream flex items-end overflow-hidden">
        <Picture
          id="interior-blue-wall"
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full opacity-70"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(43,22,33,0.5) 0%, rgba(43,22,33,0.3) 40%, rgba(43,22,33,0.92) 100%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="relative z-10 px-6 md:px-12 pb-16 md:pb-24 max-w-5xl"
        >
          <SectionLabel tone="cream">Events</SectionLabel>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mt-6">
            <em>Tastings,</em> readings,<br /><em>and</em> gatherings.
          </h1>
        </motion.div>
      </section>

      {/* List */}
      <section className="bg-st-denis-cream px-6 md:px-10 py-20 md:py-28">
        <EventCardList events={list} phase={1} />
      </section>

      <MailingListSection />
      <Footer />
    </>
  );
}
