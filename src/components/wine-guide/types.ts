export type WineFact = { l: string; v: string };

export type Wine = {
  id: string;
  cat: string;
  badge?: string;
  title: string;
  region: string;
  vintage?: string;
  opening: string;
  facts: WineFact[];
  color: string;
  colorDesc: string;
  nose: string;
  palate: string;
  finish: string;
  keyword: string;
  place: string;
  producer: string;
  whyWeChoseIt?: string;
  note?: string;
  pairings: string[];
  final: string;
  mapRegion: string;
  specialBadge?: string;
  image?: string;
  quickDescription?: string;
  tags?: string[];
};

export type Category = {
  id: string;
  label: string;
  description: string;
};

export const categories: Category[] = [
  { id: 'bubbles', label: 'Bubbles', description: 'Bright, festive bottles that open the evening with energy and lift.' },
  { id: 'white', label: 'White Wines', description: 'Mineral, floral, textured, and refreshing — built for slow exploration from light to full.' },
  { id: 'red', label: 'Red Wines', description: 'From lifted and perfumed to dark and structured — bottles that anchor the table.' },
  { id: 'dessert', label: 'Dessert Wines', description: 'Wines of sweetness, tension, perfume, and after-dinner wonder.' },
];
