import { countryMaps, regionToCountry } from './maps';

type Props = { mapRegion: string };

export function WineRegionMap({ mapRegion }: Props) {
  const countryKey = regionToCountry[mapRegion];
  if (!countryKey) return null;
  const c = countryMaps[countryKey];
  const r = c.regions[mapRegion];
  if (!r) return null;

  return (
    <svg className="wg-region-map" viewBox={c.vb} xmlns="http://www.w3.org/2000/svg">
      <path d={c.path} className="wg-country-fill" />
      <circle cx={r.x} cy={r.y} r={32} className="wg-dot-pulse" />
      <circle cx={r.x} cy={r.y} r={18} className="wg-dot-outer" />
      <circle cx={r.x} cy={r.y} r={9} className="wg-dot-inner" />
      <text x={r.x} y={r.y - 28} textAnchor="middle" className="wg-map-label">{r.label}</text>
      <text x={c.labelX} y={c.labelY} textAnchor="middle" className="wg-country-label">{c.label}</text>
    </svg>
  );
}
