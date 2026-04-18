import { useEffect, useState } from 'react';
import type { Wine } from '../components/wine-guide/types';
import { categories } from '../components/wine-guide/types';
import { WineTocCard } from '../components/wine-guide/WineTocCard';
import { WineEntry } from '../components/wine-guide/WineEntry';
import '../styles/wine-guide.css';

export function WineGuidePage() {
  const [wines, setWines] = useState<Wine[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/wines.json')
      .then((r) => r.json())
      .then((data) => { setWines(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? wines : wines.filter((w) => w.cat === filter);
  const visibleCount = filtered.length;

  const scrollToWine = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="wine-guide-page">
      {/* Hero */}
      <section className="wg-hero">
        <div className="wg-hero-content">
          <h1>The Wine <em>Guide</em></h1>
          <p className="wg-hero-desc">
            A living document, always evolving. Slow down, explore, and
            understand the collection at St. Denis.
          </p>
          <p className="wg-hero-guidance">
            Curated by Josh Rattliff, certified sommelier. Each wine is chosen
            for character, story, and soul.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="wg-filter-bar">
        <div className="wg-filter-inner">
          {['all', ...categories.map((c) => c.id)].map((cat) => (
            <button
              key={cat}
              className={`wg-filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'All' : categories.find((c) => c.id === cat)?.label ?? cat}
            </button>
          ))}
        </div>
      </div>

      {/* TOC */}
      <section className="wg-toc-section" id="toc">
        <div className="wg-toc-header">
          <h2>The Collection</h2>
          {loading ? (
            <p>Pouring the collection...</p>
          ) : (
            <p>{visibleCount} {visibleCount === 1 ? 'Wine' : 'Wines'}, Explored</p>
          )}
        </div>
        <div className="wg-toc-grid">
          {filtered.map((w) => (
            <WineTocCard key={w.id} wine={w} onClick={scrollToWine} />
          ))}
        </div>
      </section>

      {/* Wine entries grouped by category */}
      <div id="wine-list">
        {categories
          .filter((cat) => filter === 'all' || filter === cat.id)
          .filter((cat) => wines.some((w) => w.cat === cat.id))
          .map((cat) => (
            <div key={cat.id}>
              <section className="wg-category-divider" id={cat.id} data-cat={cat.id}>
                <h2>{cat.label}</h2>
                <p>{cat.description}</p>
              </section>
              {wines
                .filter((w) => w.cat === cat.id)
                .map((w) => (
                  <WineEntry key={w.id} wine={w} />
                ))}
            </div>
          ))}
      </div>

      {/* Footer */}
      <footer className="wg-footer">
        <p className="wg-footer-tagline">Come curious. Leave inspired.</p>
        <p className="wg-footer-note">A living list — always evolving, never finished.</p>
      </footer>
    </div>
  );
}
