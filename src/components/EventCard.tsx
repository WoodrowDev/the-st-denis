import type { Event } from '../data/events';

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const date = new Date(event.date);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();

  return (
    <div className="bg-white rounded-lg shadow-sm border-t-4 border-st-denis-gold p-6 flex gap-5">
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-st-denis-teal/10 flex flex-col items-center justify-center">
        <span className="text-xs font-sans uppercase text-st-denis-teal font-bold leading-none">
          {month}
        </span>
        <span className="text-lg font-serif text-st-denis-burgundy font-bold leading-none">
          {day}
        </span>
      </div>
      <div>
        <h3 className="font-serif text-lg text-st-denis-burgundy font-semibold mb-1">
          {event.title}
        </h3>
        <p className="text-sm text-st-denis-burgundy/60 font-sans mb-2">
          {event.time}
        </p>
        <p className="text-sm text-st-denis-burgundy/70 font-sans leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
}
