import { useEffect, useRef } from 'react';
import type { Wine } from './types';
import { WineRegionMap } from './WineRegionMap';
import { WineSpectrum } from './WineSpectrum';

type Props = { wine: Wine };

export function WineEntry({ wine }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let grape = '', style = '', body = '';
  wine.facts.forEach((f) => {
    if (f.l === 'Grape' || f.l === 'Grapes' || f.l === 'Blend') grape = f.v;
    if (f.l === 'Style') style = f.v;
    if (f.l === 'Body') body = f.v;
  });

  return (
    <article className="wg-wine-entry" id={wine.id} data-cat={wine.cat} ref={ref}>
      <div className="wg-wine-card">
        <div className="wg-wine-card-accent" style={{ background: wine.color }} />
        <div className="wg-wine-card-layout">
          {/* Left column */}
          <div className="wg-wine-body-left">
            <div className="wg-wine-card-header">
              {wine.specialBadge && (
                <div className="wg-wine-special-badge">{wine.specialBadge}</div>
              )}
              <div className="wg-wine-title-row">
                <div
                  className="wg-wine-color-dot"
                  style={{ background: wine.color }}
                  data-color={wine.colorDesc}
                  title={wine.colorDesc}
                />
                <h2>{wine.title}</h2>
              </div>
            </div>

            <div className="wg-wine-glance">
              <div className="wg-glance-info">
                <div className="wg-glance-grape">
                  <div className="wg-fact-label">Grape</div>
                  <div className="wg-fact-value">{grape}</div>
                </div>
              </div>
              <div className="wg-glance-spectrums">
                <WineSpectrum label="Sweetness" leftLabel="Sweet" rightLabel="Dry" value={style} map="sweetness" />
                <WineSpectrum label="Body" leftLabel="Light" rightLabel="Full" value={body} map="body" />
              </div>
            </div>

            <div className="wg-wine-section">
              <div className="wg-wine-section-title">Aroma &amp; Taste</div>
              <p><strong>Nose:</strong> {wine.nose}</p>
              <p><strong>Palate:</strong> {wine.palate}</p>
              <p><strong>Finish:</strong> {wine.finish}</p>
            </div>

            <div className="wg-wine-opening">{wine.opening}</div>

            <div className="wg-wine-section">
              <div className="wg-wine-section-title">Pairing &amp; Experience</div>
              <ul className="wg-pairing-list">
                {wine.pairings.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          </div>

          {/* Right column */}
          <div className="wg-wine-body-right">
            <div className="wg-wine-story-header">
              <WineRegionMap mapRegion={wine.mapRegion} />
            </div>
            <div className="wg-wine-section">
              <div className="wg-wine-section-title">The Place</div>
              <p>{wine.place}</p>
            </div>
            <div className="wg-wine-section">
              <div className="wg-wine-section-title">The Producer</div>
              <p>{wine.producer}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
