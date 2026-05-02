export type DayHours = {
  days: string;
  hours: string;
  isClosed?: boolean;
};

export const hours: DayHours[] = [
  { days: 'Tuesday – Sunday', hours: '2:00 PM – 10:00 PM' },
  { days: 'Monday', hours: 'Closed', isClosed: true },
];
