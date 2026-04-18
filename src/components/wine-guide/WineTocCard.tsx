import type { Wine } from './types';

type Props = {
  wine: Wine;
  onClick: (id: string) => void;
};

export function WineTocCard({ wine, onClick }: Props) {
  const shortName = wine.title.includes(' — ') ? wine.title.split(' — ')[0] : wine.title;
  const producer = wine.title.includes(' — ') ? wine.title.split(' — ')[1] : '';
  const regionFirst = wine.region.split(',')[0];
  const vintageStr = wine.vintage ? `${wine.vintage} · ` : '';
  const detail = producer ? `${producer} · ${vintageStr}${regionFirst}` : `${vintageStr}${wine.region}`;

  return (
    <button
      className="wg-toc-card"
      data-cat={wine.cat}
      onClick={() => onClick(wine.id)}
    >
      {wine.image ? (
        <div className="wg-toc-card-img-wrap">
          <img className="wg-toc-card-img" src={wine.image} alt={shortName} loading="lazy" />
        </div>
      ) : (
        <div className="wg-toc-card-img-wrap wg-toc-card-img-empty" />
      )}
      <span className="wg-toc-card-name">{shortName}</span>
      <span className="wg-toc-card-detail">{detail}</span>
    </button>
  );
}
