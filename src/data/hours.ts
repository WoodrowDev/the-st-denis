export type DayHours = {
  days: string;
  hours: string;
  isClosed?: boolean;
};

export const hours: DayHours[] = [
  { days: 'Wednesday - Thursday', hours: '4:00 PM – 10:00 PM' },
  { days: 'Friday - Saturday', hours: '2:00 PM – 11:00 PM' },
  { days: 'Sunday', hours: '12:00 PM – 6:00 PM' },
  { days: 'Monday - Tuesday', hours: 'Closed', isClosed: true },
];
