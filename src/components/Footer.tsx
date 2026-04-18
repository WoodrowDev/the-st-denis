export function Footer() {
  return (
    <footer className="py-16 md:py-20 px-6 md:px-8 bg-st-denis-burgundy relative overflow-hidden">
      {/* Subtle marbled texture overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/Multicolor_SVG.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img
            src="/images/St__Denis_Final_No_Line_08.svg"
            alt="St. Denis"
            className="w-28 h-28 md:w-36 md:h-36 object-contain"
          />
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center mb-12">
          <div>
            <h3 className="font-sans font-bold text-sm tracking-[0.2em] uppercase text-st-denis-gold mb-3">
              Address
            </h3>
            <p className="text-st-denis-cream/70 font-sans text-sm">
              426 Washington Street
            </p>
            <p className="text-st-denis-cream/70 font-sans text-sm">
              Columbus, Indiana
            </p>
          </div>

          <div>
            <h3 className="font-sans font-bold text-sm tracking-[0.2em] uppercase text-st-denis-gold mb-3">
              Phone
            </h3>
            <a
              href="tel:+18123716114"
              className="text-st-denis-cream/70 hover:text-st-denis-cream transition-colors font-sans text-sm"
            >
              (812) 371-6114
            </a>
          </div>

          <div>
            <h3 className="font-sans font-bold text-sm tracking-[0.2em] uppercase text-st-denis-gold mb-3">
              Email
            </h3>
            <a
              href="mailto:Bob@TheStDenis.com"
              className="text-st-denis-cream/70 hover:text-st-denis-cream transition-colors font-sans text-sm"
            >
              Bob@TheStDenis.com
            </a>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex justify-center gap-5 mb-10">
          <a
            href="https://www.instagram.com/thestdenis/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="/images/Socials_01.svg"
              alt="Instagram"
              className="w-7 h-7 invert"
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
              className="w-7 h-7 invert"
            />
          </a>
          <a
            href="mailto:Bob@TheStDenis.com"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="/images/Socials_03.svg"
              alt="Email"
              className="w-7 h-7 invert"
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-st-denis-cream/10 pt-8">
          <p className="text-st-denis-cream/30 font-sans text-xs tracking-wide">
            &copy; {new Date().getFullYear()} St. Denis: Wine, Books, and
            Wonders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
