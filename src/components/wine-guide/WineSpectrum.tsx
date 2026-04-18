const SWEETNESS_MAP: Record<string, number> = {
  'Sweet': 5, 'Semi-Sweet': 25, 'Off-Dry': 40, 'Just Dry': 60,
  'Dry': 80, 'Dry / Tart': 95, 'Structured Dry': 90,
};

const BODY_MAP: Record<string, number> = {
  'Light': 10, 'Light to Medium': 30, 'Medium': 50,
  'Medium to Full': 70, 'Full': 90,
};

type Props = {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: string;
  map: 'sweetness' | 'body';
};

export function WineSpectrum({ label, leftLabel, rightLabel, value, map }: Props) {
  const position = (map === 'sweetness' ? SWEETNESS_MAP : BODY_MAP)[value] ?? 50;

  return (
    <div className="wg-spectrum">
      <div className="wg-spectrum-header">
        <span className="wg-spectrum-label">{label}</span>
        <span className="wg-spectrum-value">{value}</span>
      </div>
      <div className="wg-spectrum-track">
        <div className="wg-spectrum-dot" style={{ left: `${position}%` }} />
      </div>
      <div className="wg-spectrum-ends">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}
