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
        description={`Meet Bob and Sarah Schwartzkopf, the couple behind ${brand.fullName}.`}
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
        quote={<>What people walk in and feel <br /><em>— that's design.</em></>}
        cite="A note from St. Denis"
      />

      {/* Sarah — the soul of the room */}
      <EditorialSplit
        photoId="interior-blue-wall"
        imageSide="left"
        index="II."
        label="Designer · Co-Founder"
        kicker="The way it feels — that's Sarah."
        title="Sarah Schwartzkopf."
        caption="The navy wall, the shelves, the small things on them — Sarah's eye, throughout."
      >
        <p>
          For decades, as principal of <strong className="font-semibold">Rowland Design</strong>, Sarah helped set the standard for interior design in Indianapolis — building, along the way, the largest design library in the Midwest and a body of work that runs from boardrooms and owners' suites to private homes most of us never see. Now she has turned that whole inheritance onto a single room.
        </p>
        <p>
          She chose the navy walls. The brass lamps. The cognac banquettes. The painting nestled into the bookshelves. The book that sits next to the bottle next to the candle.
        </p>
        <p>
          What people are responding to — the warmth, the strangeness, the <em>feeling</em> — is Sarah's signature. The kind of room you don't want to leave.
        </p>
        <p>
          And almost everything in it is for sale. The room rearranges itself slowly over time, like a sentence she's still writing.
        </p>
      </EditorialSplit>

      {/* Bob */}
      <EditorialSplit
        photoId="founder-bob"
        imageSide="right"
        index="III."
        label="Co-Founder · Architect"
        kicker="The structure underneath the feeling."
        title="Bob Schwartzkopf."
        tone="burgundy"
      >
        <p>
          Bob spent his career in architecture — drawing rooms that hold conversation, light that flatters company, doors that invite people in. He helps Sarah's compositions stand up.
        </p>
        <p>
          He's the one who'll talk you into the second bottle, then hand you a first-edition paperback to take home with it.
        </p>
      </EditorialSplit>

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
