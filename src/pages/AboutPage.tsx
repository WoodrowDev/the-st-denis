import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Picture } from '../components/Picture';
import { EditorialSplit } from '../components/sections/EditorialSplit';
import { FullBleedQuote } from '../components/sections/FullBleedQuote';
import { SectionLabel } from '../components/sections/SectionLabel';
import { MailingListSection } from '../components/MailingListSection';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { brand } from '../data/brand';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="About"
        description={`Meet Bob & Sarah, the couple behind ${brand.fullName}, and Josh Rattliff, our certified sommelier.`}
        path="/about"
      />

      {/* Hero — interior wide, headline anchored bottom-left */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] bg-st-denis-burgundy flex items-end overflow-hidden">
        <Picture
          id="interior-banquette"
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(43,22,33,0.35) 0%, rgba(43,22,33,0.15) 40%, rgba(43,22,33,0.85) 100%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="relative z-10 px-6 md:px-12 pb-16 md:pb-24 max-w-5xl"
        >
          <SectionLabel tone="cream">About</SectionLabel>
          <h1 className="font-serif text-st-denis-cream text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mt-6">
            Cheers, and welcome <em className="text-st-denis-gold">to St. Denis.</em>
          </h1>
          <p className="font-serif italic text-st-denis-cream/85 text-lg md:text-2xl mt-6 max-w-2xl">
            Wine, Books, and Wonders — equal parts stylish living room and neighborhood anchor.
          </p>
        </motion.div>
      </section>

      {/* The mood */}
      <section className="bg-st-denis-cream px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <SectionLabel index="I.">More than a space — a mood</SectionLabel>
          <div className="mt-10 font-sans text-[1.05rem] md:text-[1.12rem] text-st-denis-burgundy/85 leading-[1.85] space-y-6">
            <p>
              Nestled in the heart of downtown Columbus, Indiana, St. Denis is your cozy nook to slow down, savor, and stay awhile.
            </p>
            <p>
              A boutique haven for fine wine lovers and vintage book collectors, designed for every kind of moment:
            </p>
            <ul className="space-y-3 list-none pl-4 md:pl-8 border-l-2 border-st-denis-teal/40 my-8">
              <li className="flex items-start gap-3">
                <span className="text-st-denis-teal font-serif italic text-lg">◆</span>
                <span>A solo escape with a rare book and a bold red.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-st-denis-teal font-serif italic text-lg">◆</span>
                <span>A spontaneous hangout with friends over a bottle.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-st-denis-teal font-serif italic text-lg">◆</span>
                <span>A curious wander through art, stories, and design.</span>
              </li>
            </ul>
            <p>
              Each visit feels new. That cozy lamp you're reading under? The chair you're curled up in? The artwork catching your eye? It's all for sale, because St. Denis is an ever-evolving experience. Part boutique, part gallery, part wine bar.
            </p>
            <p>
              Enjoy curated wines by the glass or bottle, paired with thoughtful light snacks. Whether you're beginning your night, in between events, or ending your day, St. Denis is a place to connect — with stories, style, and the people around you.
            </p>
            <p className="font-serif italic text-2xl text-st-denis-burgundy text-center pt-4">
              Come curious. Leave inspired.
            </p>
          </div>
        </div>
      </section>

      <FullBleedQuote
        photoId="interior-painting-shelf"
        quote={<>A toast to <em>creativity, connection,</em> <br />and community.</>}
        cite="— Bob &amp; Sarah, Founders"
      />

      {/* Sarah */}
      <EditorialSplit
        photoId="founder-sarah"
        imageSide="left"
        index="II."
        label="Co-Founder"
        kicker="An interior designer's eye for the room."
        title="Sarah."
        caption="Sarah behind the bar — where the room composes itself."
      >
        <p>
          After decades shaping homes in Indianapolis, Sarah turned her attention to one space — and what a space it became. The blue walls, the brass lamps, the cognac banquettes, the bookshelves rearranged like exhibitions: every corner of St. Denis carries her signature.
        </p>
        <p>
          Most nights you'll find her behind the bar, pouring something she's excited about and asking what you've been reading.
        </p>
      </EditorialSplit>

      {/* Bob */}
      <EditorialSplit
        photoId="founder-bob"
        imageSide="right"
        index="III."
        label="Co-Founder"
        kicker="An architect's love of the long story."
        title="Bob."
        tone="burgundy"
      >
        <p>
          Bob spent his career in architecture — drawing rooms that hold conversation, light that flatters company, doors that invite people in. St. Denis is the building he's been sketching all along.
        </p>
        <p>
          He's the one who'll talk you into the second bottle, then hand you a first-edition paperback to take home with it.
        </p>
      </EditorialSplit>

      {/* Josh */}
      <section className="bg-st-denis-cream px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="border-l-4 border-st-denis-teal pl-6 md:pl-10 py-2"
          >
            <SectionLabel index="IV.">The Sommelier</SectionLabel>
            <h2 className="font-serif text-3xl md:text-4xl text-st-denis-burgundy mt-6 mb-5 leading-tight">
              Curated by <em className="text-st-denis-teal">Josh Rattliff.</em>
            </h2>
            <p className="font-sans text-[1.05rem] text-st-denis-burgundy/85 leading-relaxed">
              We're incredibly lucky to be joined in this venture by Josh, a certified sommelier and all-around fantastic guy. His passion and knowledge elevate every bottle we serve and every experience we create.
            </p>
            <p className="font-sans text-st-denis-burgundy/75 leading-relaxed mt-4">
              Read his curation in <a href="/wine-guide" className="text-st-denis-burgundy border-b border-st-denis-burgundy/30 hover:text-st-denis-teal hover:border-st-denis-teal transition-colors">The Wine Guide</a>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Closing letter */}
      <section className="bg-st-denis-burgundy text-st-denis-cream px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <SectionLabel tone="cream">A note from us</SectionLabel>
          <div className="mt-10 font-serif text-2xl md:text-3xl leading-[1.4] text-st-denis-cream/95 space-y-6">
            <p>
              So come by. Sip something new. Discover a rare book. <em>Sink into a beautiful chair.</em> Meet a neighbor. Make a friend.
            </p>
            <p className="text-st-denis-gold italic">
              We can't wait to welcome you to St. Denis.
            </p>
          </div>
          <p className="font-serif italic text-st-denis-cream/65 text-lg mt-12">
            — Bob &amp; Sarah
          </p>
        </div>
      </section>

      <MailingListSection />
      <Footer />
    </>
  );
}
