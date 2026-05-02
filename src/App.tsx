import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { VisitPage } from './pages/VisitPage';
import { EventsPage } from './pages/EventsPage';
import { WineGuidePage } from './pages/WineGuidePage';
import { WineDetailPage } from './pages/WineDetailPage';
import { QrGeneratorPage } from './pages/QrGeneratorPage';

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
          <Route path="/wine-guide" element={<WineGuidePage />} />
          <Route path="/wine-guide/:slug" element={<WineDetailPage />} />
          <Route path="/qr-generator" element={<QrGeneratorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
