import type { Wine } from '../data/wines';

type WineCardProps = {
  wine: Wine;
};

export function WineCard({ wine }: WineCardProps) {
  return (
    <div className="flex justify-between items-start gap-4 py-4 border-b border-st-denis-burgundy/10 last:border-0">
      <div className="flex-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h4 className="font-serif text-lg text-st-denis-burgundy font-semibold">
            {wine.name}
          </h4>
          <span className="text-st-denis-burgundy/40 font-sans text-xs tracking-wide">
            {wine.grape}
          </span>
        </div>
        <p className="text-st-denis-burgundy/50 font-sans text-xs mt-0.5">
          {wine.region}
        </p>
        <p className="text-st-denis-burgundy/70 font-sans text-sm mt-2 leading-relaxed italic">
          {wine.note}
        </p>
      </div>
      <span className="font-serif text-lg text-st-denis-gold font-semibold flex-shrink-0 pt-0.5">
        {wine.price}
      </span>
    </div>
  );
}
