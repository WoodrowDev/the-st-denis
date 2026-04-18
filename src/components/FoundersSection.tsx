import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function FoundersSection() {
  return (
    <section
      id="founders"
      className="py-20 md:py-28 lg:py-32 px-6 md:px-8 relative"
      style={{
        backgroundImage: 'url(/images/paper-texture.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-st-denis-burgundy text-center mb-12 md:mb-16"
        >
          Meet the Founders
        </motion.h2>

        <div className="text-base md:text-lg text-st-denis-burgundy/80 space-y-6 leading-relaxed">
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="drop-cap">
            Hi, we're Bob and Sarah, the couple behind St. Denis: Wine, Books,
            and Wonders. We're absolutely thrilled to bring our vision to life
            in the heart of downtown Columbus, Indiana. After decades in the
            design world — Bob as an architect, and Sarah as an interior
            designer — we decided it was time for something new. Or maybe
            something old: the passions that always brought us joy — books,
            wine, and beautifully curious things.
          </motion.p>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
            St. Denis is our toast to creativity, connection, and community. We
            imagine a space where curiosity is welcome, conversations flow
            easily, and every day holds the chance to meet someone truly
            interesting. A stylish, cozy, ever-changing space where you can come
            curious and leave inspired.
          </motion.p>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
            After years of commuting to Indianapolis, we're now fully home in
            Columbus, and we couldn't be happier. We've made our home downtown,
            and we're deeply committed to the energy and vibrancy of this
            amazing city.
          </motion.p>

          {/* Josh Rattliff callout */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="border-l-4 border-st-denis-teal pl-6 py-2 my-8"
          >
            <p>
              We're also incredibly lucky to be joined in this venture by{' '}
              <strong className="text-st-denis-burgundy">Josh Rattliff</strong>,
              a certified sommelier and all-around fantastic guy. His passion
              and knowledge elevate every bottle we serve and every experience
              we create.
            </p>
          </motion.div>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
            So come by. Sip something new. Discover a rare book. Sink into a
            beautiful chair. Meet a neighbor. Make a friend.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-semibold text-st-denis-burgundy"
          >
            We can't wait to welcome you to St. Denis.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-right italic font-bold pt-2"
          >
            — Bob & Sarah
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
