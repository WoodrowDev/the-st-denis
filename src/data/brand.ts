export const brand = {
  name: 'St. Denis',
  fullName: 'St. Denis — Wine, Books, and Wonders',
  tagline: 'Come curious. Leave inspired.',
  subtitle: 'Wine, Books, and Wonders',
  city: 'Columbus, Indiana',
  shortCity: 'Columbus, IN',
  address: {
    street: '426 Washington Street',
    city: 'Columbus',
    state: 'Indiana',
    stateAbbr: 'IN',
    postal: '47201',
    full: '426 Washington Street, Columbus, IN 47201',
    lat: 39.2014,
    lng: -85.9214,
  },
  contact: {
    phone: '+18123716114',
    phoneDisplay: '(812) 371-6114',
    email: 'Bob@TheStDenis.com',
  },
  social: {
    instagram: 'https://www.instagram.com/thestdenis/',
    instagramHandle: '@thestdenis',
    facebook: 'https://www.facebook.com/thestdenis',
  },
  hoursSummary: 'Wed–Thu 4–10 · Fri–Sat 2–11 · Sun 12–6 · Closed Mon–Tue',
  founders: ['Bob', 'Sarah'],
  sommelier: 'Josh Rattliff',
  priceRange: '$$',
} as const;

export type Brand = typeof brand;
