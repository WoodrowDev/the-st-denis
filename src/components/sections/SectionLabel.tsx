type Props = {
  /** Roman numeral or short prefix, e.g. "I." or "—" */
  index?: string;
  /** Short uppercase label, e.g. "Welcome", "On the bar tonight" */
  children: React.ReactNode;
  /** Color variant — defaults to burgundy on cream. */
  tone?: 'burgundy' | 'cream' | 'gold';
  className?: string;
};

const toneClass: Record<NonNullable<Props['tone']>, string> = {
  burgundy: 'text-st-denis-burgundy',
  cream: 'text-st-denis-cream',
  gold: 'text-st-denis-gold',
};

export function SectionLabel({ index, children, tone = 'burgundy', className = '' }: Props) {
  return (
    <div
      className={`flex items-baseline gap-3 font-sans uppercase tracking-[0.32em] text-[0.7rem] md:text-xs ${toneClass[tone]} ${className}`}
    >
      {index && (
        <span className="font-serif italic tracking-normal text-base md:text-lg opacity-70">
          {index}
        </span>
      )}
      <span className="h-px flex-shrink-0 w-10 md:w-16 bg-current opacity-40" />
      <span className="flex-shrink-0">{children}</span>
    </div>
  );
}
