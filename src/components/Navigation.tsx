import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollPosition } from '../hooks/useScrollPosition';

const navItems = [
  { label: 'About Us', to: '/about' },
  { label: 'Hours', to: '/hours' },
  { label: 'Events', to: '/events' },
  { label: 'The Wine Guide', to: '/wine-guide' },
];

export function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollY = useScrollPosition();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const pastHero = !isHome || scrollY > window.innerHeight * 0.3;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          pastHero
            ? 'bg-st-denis-burgundy/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/images/St__Denis_Final_No_Line_08.svg"
              alt="St. Denis"
              className="h-10 md:h-14 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`font-sans text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${
                  location.pathname === item.to
                    ? 'text-st-denis-gold'
                    : 'text-st-denis-cream/80 hover:text-st-denis-cream'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-6 h-0.5 bg-st-denis-cream transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-st-denis-cream transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-st-denis-cream transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-st-denis-burgundy/95 backdrop-blur-md flex flex-col items-center justify-center"
            style={{
              backgroundImage: 'url(/images/marbled-dark.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
            }}
          >
            <div className="absolute inset-0 bg-st-denis-burgundy/85" />
            <nav className="relative z-10 flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={item.to}
                    className="text-st-denis-cream font-serif text-3xl tracking-wide hover:text-st-denis-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 pt-8 border-t border-st-denis-cream/20">
                <p className="text-st-denis-cream/60 font-serif italic text-lg">
                  Come curious. Leave inspired.
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
