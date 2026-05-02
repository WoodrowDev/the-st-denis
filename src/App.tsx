import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { VisitPage } from './pages/VisitPage';
import { EventsPage } from './pages/EventsPage';
import { QrGeneratorPage } from './pages/QrGeneratorPage';

const WINE_LIBRARY_URL = 'https://st-denis-wine-library.vercel.app';

/** Client-side fallback redirect for /wine-guide (and /:slug). The Vercel
 *  config also redirects at the edge for direct URL hits — this handles
 *  in-app history navigation (browser back, etc.). */
function WineGuideRedirect() {
  const { slug } = useParams();
  useEffect(() => {
    const dest = slug ? `${WINE_LIBRARY_URL}/#${slug}` : WINE_LIBRARY_URL;
    window.location.replace(dest);
  }, [slug]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-st-denis-cream">
      <p className="font-serif italic text-st-denis-burgundy/60 text-xl">
        Opening The Wine Guide…
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-st-denis-cream">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/visit" element={<VisitPage />} />
          {/* /hours is an alias of /visit so existing links + printed QR codes still work. */}
          <Route path="/hours" element={<VisitPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/wine-guide" element={<WineGuideRedirect />} />
          <Route path="/wine-guide/:slug" element={<WineGuideRedirect />} />
          <Route path="/qr-generator" element={<QrGeneratorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
