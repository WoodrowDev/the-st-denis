import { Link } from 'react-router-dom';
import { brand } from '../data/brand';

export function Footer() {
  return (
    <footer className="relative bg-st-denis-burgundy text-st-denis-cream overflow-hidden">
      {/* subtle teal-to-burgundy wash */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: 'url(/images/Multicolor_SVG.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 px-6 md:px-10 pt-20 md:pt-24 pb-10">
        <div className="max-w-7xl mx-auto">
          {/* Top: wordmark + tagline */}
          <div className="flex flex-col items-center text-center mb-16">
            <img
              src="/images/St__Denis_Final_No_Line_08.svg"
              alt="St. Denis oval seal"
              className="w-24 h-24 md:w-28 md:h-28 mb-6"
            />
            <p className="font-serif italic text-st-denis-cream/80 text-lg md:text-xl">
              {brand.tagline}
            </p>
          </div>

          {/* 4-column footer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-st-denis-cream/15">
            <FooterCol heading="Visit">
              <Link to="/visit" className="font-sans text-sm text-st-denis-cream/75 hover:text-st-denis-gold transition-colors">Hours & Address</Link>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-st-denis-cream/75 hover:text-st-denis-gold transition-colors"
              >
                Directions
              </a>
              <p className="font-sans text-st-denis-cream/60 text-sm pt-1">
                {brand.address.street}<br />
                {brand.address.city}, {brand.address.stateAbbr}
              </p>
            </FooterCol>

            <FooterCol heading="Discover">
              <Link to="/wine-guide" className="font-sans text-sm text-st-denis-cream/75 hover:text-st-denis-gold transition-colors">The Wine Guide</Link>
              <Link to="/about" className="font-sans text-sm text-st-denis-cream/75 hover:text-st-denis-gold transition-colors">About</Link>
              <Link to="/events" className="font-sans text-sm text-st-denis-cream/75 hover:text-st-denis-gold transition-colors">Events</Link>
            </FooterCol>

            <FooterCol heading="Contact">
              <a href={`tel:${brand.contact.phone}`} className="font-sans text-sm text-st-denis-cream/75 hover:text-st-denis-gold transition-colors">
                {brand.contact.phoneDisplay}
              </a>
              <a href={`mailto:${brand.contact.email}`} className="font-sans text-sm text-st-denis-cream/75 hover:text-st-denis-gold transition-colors">
                {brand.contact.email}
              </a>
            </FooterCol>

            <FooterCol heading="Follow">
              <a href={brand.social.instagram} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-st-denis-cream/75 hover:text-st-denis-gold transition-colors">
                Instagram {brand.social.instagramHandle}
              </a>
              <a href={brand.social.facebook} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-st-denis-cream/75 hover:text-st-denis-gold transition-colors">
                Facebook
              </a>
            </FooterCol>
          </div>

          {/* Bottom row */}
          <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-sans uppercase tracking-[0.3em] text-[0.7rem] text-st-denis-cream/50">
              ✦ {brand.subtitle} ✦
            </p>
            <p className="font-sans text-xs text-st-denis-cream/40">
              © {new Date().getFullYear()} St. Denis. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="font-sans uppercase tracking-[0.28em] text-[0.7rem] text-st-denis-gold mb-2">
        {heading}
      </h3>
      {children}
    </div>
  );
}
