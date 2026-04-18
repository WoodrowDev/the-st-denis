import { motion } from 'framer-motion';
import { MailingListForm } from './MailingListForm';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function MailingListSection() {
  return (
    <section
      id="mailing-list"
      className="py-20 md:py-28 lg:py-32 px-6 md:px-8 relative"
      style={{
        backgroundImage: 'url(/images/MarbledEndPage_light_teal.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-semibold text-st-denis-burgundy mb-4"
        >
          Stay in the Loop
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-st-denis-burgundy/70 font-sans text-base md:text-lg mb-10"
        >
          Be the first to hear about new wines, events, and arrivals.
        </motion.p>
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
          <MailingListForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
