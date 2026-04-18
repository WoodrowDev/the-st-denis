import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background image with dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/hero-wine-books.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-st-denis-burgundy/60 via-st-denis-burgundy/50 to-st-denis-burgundy/80" />

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Logo */}
        <motion.img
          src="/images/St__Denis_Final_No_Line_08.svg"
          alt="St. Denis — Wine, Books, and Wonders"
          className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Tagline */}
        <motion.p
          className="font-serif italic text-st-denis-cream text-xl md:text-2xl lg:text-3xl tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
        >
          Come curious. Leave inspired.
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          className="font-sans text-st-denis-cream/70 text-xs md:text-sm tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Downtown Columbus, Indiana
        </motion.p>

        {/* Social icons */}
        <motion.div
          className="flex justify-center gap-5 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a
            href="https://www.instagram.com/thestdenis/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="/images/Socials_01.svg"
              alt="Instagram"
              className="w-8 h-8 md:w-10 md:h-10 invert"
            />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="/images/Socials_02.svg"
              alt="Facebook"
              className="w-8 h-8 md:w-10 md:h-10 invert"
            />
          </a>
          <a
            href="mailto:Bob@TheStDenis.com"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="/images/Socials_03.svg"
              alt="Email"
              className="w-8 h-8 md:w-10 md:h-10 invert"
            />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-st-denis-cream/50 text-xs tracking-[0.2em] uppercase font-sans">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-st-denis-cream/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
