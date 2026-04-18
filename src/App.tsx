import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HoursPage } from './pages/HoursPage';
import { EventsPage } from './pages/EventsPage';
import { WineGuidePage } from './pages/WineGuidePage';
import { QrGeneratorPage } from './pages/QrGeneratorPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-st-denis-cream">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/hours" element={<HoursPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/wine-guide" element={<WineGuidePage />} />
          <Route path="/qr-generator" element={<QrGeneratorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
