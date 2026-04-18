export type Wine = {
  id: string;
  name: string;
  region: string;
  grape: string;
  note: string;
  price: string;
  category: 'glass' | 'bottle';
};

export const wines: Wine[] = [
  {
    id: '1',
    name: 'Château de Lancyre',
    region: 'Languedoc, France',
    grape: 'Grenache / Syrah',
    note: 'Dark cherry, wild herbs, and a whisper of lavender. A southern French charmer.',
    price: '$14',
    category: 'glass',
  },
  {
    id: '2',
    name: 'Cantina Terlan Pinot Grigio',
    region: 'Alto Adige, Italy',
    grape: 'Pinot Grigio',
    note: 'Crisp alpine minerality with ripe pear and a hint of white flower.',
    price: '$16',
    category: 'glass',
  },
  {
    id: '3',
    name: 'Domaine de la Côte Pinot Noir',
    region: 'Sta. Rita Hills, California',
    grape: 'Pinot Noir',
    note: 'Elegant and lifted — red fruit, crushed stone, and a long silky finish.',
    price: '$18',
    category: 'glass',
  },
  {
    id: '4',
    name: 'López de Heredia Viña Tondonia Reserva',
    region: 'Rioja, Spain',
    grape: 'Tempranillo',
    note: 'A timeless Rioja. Dried roses, leather, and the patience of old vines.',
    price: '$65',
    category: 'bottle',
  },
  {
    id: '5',
    name: 'Domaine Weinbach Riesling Grand Cru',
    region: 'Alsace, France',
    grape: 'Riesling',
    note: 'Honeyed citrus, petrol complexity, and crystalline acidity. A wine for book lovers.',
    price: '$72',
    category: 'bottle',
  },
  {
    id: '6',
    name: 'Marchesi Antinori Tignanello',
    region: 'Tuscany, Italy',
    grape: 'Sangiovese / Cabernet',
    note: 'Bold and polished — ripe cherry, tobacco, and Tuscan earth.',
    price: '$95',
    category: 'bottle',
  },
];
