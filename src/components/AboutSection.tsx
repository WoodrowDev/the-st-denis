import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 lg:py-32 px-6 md:px-8 relative"
      style={{
        backgroundImage: 'url(/images/paper-texture.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="max-w-4xl mx-auto space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.15 }}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-st-denis-burgundy text-center mb-10"
        >
          Cheers, and Welcome to St. Denis!
        </motion.h2>

        <div className="text-base md:text-lg lg:text-xl text-st-denis-burgundy/80 space-y-6 leading-relaxed">
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="drop-cap">
            Nestled in the heart of downtown Columbus, Indiana, St. Denis is
            your cozy nook to slow down, savor, and stay awhile.
          </motion.p>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
            A boutique haven for fine wine lovers and vintage book collectors,
            St. Denis is more than just a space — it's a mood. Equal parts
            stylish living room and neighborhood anchor, it's designed for every
            kind of moment...
          </motion.p>

          <motion.ul variants={fadeUp} transition={{ duration: 0.6 }} className="space-y-3 list-none pl-4 md:pl-8 border-l-2 border-st-denis-teal/30">
            <li className="flex items-start">
              <span className="text-st-denis-teal mr-3 text-lg">&#9830;</span>
              <span>A solo escape with a rare book and a bold red.</span>
            </li>
            <li className="flex items-start">
              <span className="text-st-denis-teal mr-3 text-lg">&#9830;</span>
              <span>
                A spontaneous hangout with friends over a bottle.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-st-denis-teal mr-3 text-lg">&#9830;</span>
              <span>
                A curious wander through art, stories, and design.
              </span>
            </li>
          </motion.ul>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
            Each visit feels new. That cozy lamp you're reading under? The chair
            you're curled up in? The artwork catching your eye? It's all for
            sale, because St. Denis is an ever-evolving experience. Part
            boutique, part gallery, part wine bar.
          </motion.p>

          <motion.p variants={fadeUp} transition={{ duration: 0.6 }}>
            Enjoy curated wines by the glass or bottle, paired with thoughtful
            light snacks. Whether you're beginning your night, in between
            events, or ending your day, St. Denis is a place to connect — with
            stories, style, and the people around you.
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center pt-4"
          >
            <span className="font-serif italic text-xl md:text-2xl text-st-denis-burgundy">
              Come curious. Leave inspired.
            </span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-right italic text-st-denis-burgundy/60 pt-2"
          >
            Cheers to new friends and favorite finds, only at St. Denis.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
