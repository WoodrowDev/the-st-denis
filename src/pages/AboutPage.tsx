import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MarbledDivider } from '../components/MarbledDivider';
import { MailingListSection } from '../components/MailingListSection';
import { Footer } from '../components/Footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      {/* Hero banner */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 bg-st-denis-burgundy text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-st-denis-cream">About Us</h1>
        <p className="font-serif italic text-st-denis-cream/60 text-lg mt-4">Wine, Books, and Wonders</p>
      </section>

      <MarbledDivider texture="teal" />

      {/* Welcome section */}
      <section className="py-20 md:py-28 px-6 md:px-8 relative" style={{ backgroundImage: 'url(/images/paper-texture.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <motion.div className="max-w-3xl mx-auto space-y-8" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ staggerChildren: 0.12 }}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-serif font-light text-st-denis-burgundy text-center mb-10">
            Cheers, and Welcome to St. Denis!
          </motion.h2>

          <div className="text-base md:text-lg text-st-denis-burgundy/80 space-y-6 leading-relaxed">
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="drop-cap">
              Nestled in the heart of downtown Columbus, Indiana, St. Denis is your cozy nook to slow down, savor, and stay awhile.
            </motion.p>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
              A boutique haven for fine wine lovers and vintage book collectors, St. Denis is more than just a space — it's a mood. Equal parts stylish living room and neighborhood anchor, it's designed for every kind of moment...
            </motion.p>
            <motion.ul variants={fadeUp} transition={{ duration: 0.6 }} className="space-y-3 list-none pl-4 md:pl-8 border-l-2 border-st-denis-teal/30">
              <li className="flex items-start"><span className="text-st-denis-teal mr-3 text-lg">&#9830;</span><span>A solo escape with a rare book and a bold red.</span></li>
              <li className="flex items-start"><span className="text-st-denis-teal mr-3 text-lg">&#9830;</span><span>A spontaneous hangout with friends over a bottle.</span></li>
              <li className="flex items-start"><span className="text-st-denis-teal mr-3 text-lg">&#9830;</span><span>A curious wander through art, stories, and design.</span></li>
            </motion.ul>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
              Each visit feels new. That cozy lamp you're reading under? The chair you're curled up in? The artwork catching your eye? It's all for sale, because St. Denis is an ever-evolving experience. Part boutique, part gallery, part wine bar.
            </motion.p>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
              Enjoy curated wines by the glass or bottle, paired with thoughtful light snacks. Whether you're beginning your night, in between events, or ending your day, St. Denis is a place to connect — with stories, style, and the people around you.
            </motion.p>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-center pt-4">
              <span className="font-serif italic text-xl md:text-2xl text-st-denis-burgundy">Come curious. Leave inspired.</span>
            </motion.p>
          </div>
        </motion.div>
      </section>

      <MarbledDivider texture="dark" />

      {/* Founders section */}
      <section className="py-20 md:py-28 px-6 md:px-8 bg-st-denis-cream">
        <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} transition={{ staggerChildren: 0.12 }}>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-serif font-light text-st-denis-burgundy text-center mb-12">
            Meet the Founders
          </motion.h2>
          <div className="text-base md:text-lg text-st-denis-burgundy/80 space-y-6 leading-relaxed">
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="drop-cap">
              Hi, we're Bob and Sarah, the couple behind St. Denis: Wine, Books, and Wonders. We're absolutely thrilled to bring our vision to life in the heart of downtown Columbus, Indiana. After decades in the design world — Bob as an architect, and Sarah as an interior designer — we decided it was time for something new. Or maybe something old: the passions that always brought us joy — books, wine, and beautifully curious things.
            </motion.p>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
              St. Denis is our toast to creativity, connection, and community. We imagine a space where curiosity is welcome, conversations flow easily, and every day holds the chance to meet someone truly interesting.
            </motion.p>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
              After years of commuting to Indianapolis, we're now fully home in Columbus, and we couldn't be happier. We've made our home downtown, and we're deeply committed to the energy and vibrancy of this amazing city.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="border-l-4 border-st-denis-teal pl-6 py-2 my-8">
              <p>We're also incredibly lucky to be joined in this venture by <strong className="text-st-denis-burgundy">Josh Rattliff</strong>, a certified sommelier and all-around fantastic guy. His passion and knowledge elevate every bottle we serve and every experience we create.</p>
            </motion.div>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
              So come by. Sip something new. Discover a rare book. Sink into a beautiful chair. Meet a neighbor. Make a friend.
            </motion.p>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-semibold text-st-denis-burgundy">
              We can't wait to welcome you to St. Denis.
            </motion.p>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-right italic font-bold pt-2">
              — Bob & Sarah
            </motion.p>
          </div>
        </motion.div>
      </section>

      <MarbledDivider texture="multicolor" />
      <MailingListSection />
      <Footer />
    </>
  );
}
