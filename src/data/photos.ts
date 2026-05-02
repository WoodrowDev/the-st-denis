/**
 * Curated photo manifest. Source files are professional photos by Rachel,
 * stored outside the repo at `../photos-from-rachel/`. The build script
 * `scripts/build-images.mjs` reads this manifest, generates AVIF/WebP/JPG
 * variants at multiple widths into `public/img/`, and writes LQIP base64
 * placeholders into `photos.generated.ts`.
 *
 * Use `<Picture id="..." />` to render. Never reference `public/img/`
 * paths directly.
 */

export type PhotoOrientation = 'landscape' | 'portrait' | 'square';

export type PhotoEntry = {
  /** Source filename (without path) inside `../photos-from-rachel/`. */
  source: string;
  /** Accessibility text — describe what's visually present, not metadata. */
  alt: string;
  /** Aspect ratio for layout reservation (prevents CLS). [w, h] e.g. [3, 4]. */
  ratio: [number, number];
  /** Hint for cropping/object-position when used as a cover image. CSS values. */
  focal?: string;
  orientation: PhotoOrientation;
  /** Optional book paired in the shot, for editorial captions. */
  book?: string;
  /** Optional wine ID this photo represents (matches wines.json). */
  wineId?: string;
  /** Photographer credit. */
  credit?: string;
};

export const photos = {
  /* Storefront & exterior */
  'exterior-storefront': {
    source: '892825ec64befc30846e32561ade21c7-xxlarge.jpg',
    alt: 'St. Denis storefront at 426 Washington Street, with double wood doors and the oval St. Denis logo etched on the glass.',
    ratio: [3, 4],
    focal: 'center 35%',
    orientation: 'portrait',
    credit: 'Rachel',
  },

  /* Interior wides */
  'interior-banquette': {
    source: '9e70e94d2903186d78e27e5c9579031b-xxlarge.jpg',
    alt: 'Cognac leather banquette with marble cafe tables, Nelson bubble pendants overhead, and Washington Street twinkle lights through the window.',
    ratio: [3, 4],
    focal: 'center',
    orientation: 'portrait',
    credit: 'Rachel',
  },
  'interior-blue-wall': {
    source: 'ddb620bc0f1de542024b7eb2c6aa8836-xxlarge.jpg',
    alt: 'Deep navy wall with a blue-toned painting hung above a dark shelf of stemware, Pyrex, and small sculptures.',
    ratio: [3, 4],
    focal: 'center',
    orientation: 'portrait',
    credit: 'Rachel',
  },
  'interior-painting-shelf': {
    source: '60e81cd2a7187b9bb76cb1b41982f69d-xxlarge.jpg',
    alt: 'A large teal and red abstract painting nestled inside a wall of dark walnut bookshelves filled with hardcover books.',
    ratio: [4, 3],
    focal: 'center',
    orientation: 'landscape',
    credit: 'Rachel',
  },

  /* Bar details */
  'bar-mtsvane-lamp': {
    source: 'c6497103b399e94dfe9f8eb57e2ba1d9-xxlarge.jpg',
    alt: 'A brass mushroom-shade table lamp glows next to a small candle and a green Mtsvane wine bottle on the marble bar.',
    ratio: [3, 4],
    focal: 'center 60%',
    orientation: 'portrait',
    credit: 'Rachel',
  },
  'bar-brass-detail': {
    source: '55e6b01311d360396772d39a28cd286c-xxlarge.jpg',
    alt: 'Brass and brushed steel bar detail with a candle, lamp, and Mtsvane wine bottle in low light.',
    ratio: [3, 4],
    focal: 'center',
    orientation: 'portrait',
    credit: 'Rachel',
  },

  /* Founders & staff */
  'staff-sandy': {
    source: '913fc20d53469c1ee8e18382405d0880-xxlarge.jpg',
    alt: 'Sandy, smiling behind the bar with stemware suspended overhead.',
    ratio: [3, 4],
    focal: 'center 30%',
    orientation: 'portrait',
    credit: 'Rachel',
  },
  'founder-bob': {
    source: '88f74db658de065f335327ee5ec64bc5-xxlarge.jpg',
    alt: 'Bob, an older gentleman with glasses and a salt-and-pepper beard, smiling and resting his chin on his hand at the bar.',
    ratio: [3, 4],
    focal: 'center 35%',
    orientation: 'portrait',
    credit: 'Rachel',
  },
  'staff-storefront': {
    source: '5dff0fe711cbce7ddd94a5ecf75f87a5-xxlarge.jpg',
    alt: 'A young woman with shoulder-length hair smiling in front of the St. Denis storefront window.',
    ratio: [3, 4],
    focal: 'center 30%',
    orientation: 'portrait',
    credit: 'Rachel',
  },

  /* Wine + Book pairings — keyed to wine IDs */
  'pairing-cabernet-faust': {
    source: '95039c3985b9cc5bc90b50e3ecd1a2ea-xxlarge.jpg',
    alt: 'Faust Napa Valley Cabernet Sauvignon paired with leather-bound editions of War & Peace and Don Quixote.',
    ratio: [2, 3],
    focal: 'center',
    orientation: 'portrait',
    book: 'War & Peace · Don Quixote',
    wineId: 'cabernet',
    credit: 'Rachel',
  },
  'pairing-reserve-zinfandel-wing': {
    source: '1059ccf27cc0108922c4ad8f995b84e8-xxlarge.jpg',
    alt: 'Ridge Pagani Ranch Zinfandel beside a vintage red cloth-bound copy of Wing and Wing.',
    ratio: [2, 3],
    focal: 'center',
    orientation: 'portrait',
    book: 'Wing and Wing',
    wineId: 'reserve-zinfandel',
    credit: 'Rachel',
  },
  'pairing-brut-rose-ost': {
    source: 'cc49e55c51d7f76b5f1f2a85d5656d94-xxlarge.jpg',
    alt: 'A bottle of Crémant Rosé from Burgundy beside a hardcover edition of Daniel Ost: Invitations II.',
    ratio: [2, 3],
    focal: 'center',
    orientation: 'portrait',
    book: 'Daniel Ost — Invitations II',
    wineId: 'brut-rose',
    credit: 'Rachel',
  },
  'pairing-mtsvane-robbins': {
    source: '622cf7961aaa10c89b9e5803c98fcb5d-xxlarge.jpg',
    alt: 'A bottle of Georgian Mtsvane next to a yellow Tom Robbins novel, Skinny Legs and All.',
    ratio: [2, 3],
    focal: 'center',
    orientation: 'portrait',
    book: 'Skinny Legs and All — Tom Robbins',
    wineId: 'mtsvane',
    credit: 'Rachel',
  },
  'pairing-chenin-sherlock': {
    source: '543519542a0078a70bf59553bf1de931-xxlarge.jpg',
    alt: 'A handwritten-label Old Vine Chenin Blanc bottle beside a navy hardcover of The Complete Sherlock Holmes.',
    ratio: [2, 3],
    focal: 'center',
    orientation: 'portrait',
    book: 'The Complete Sherlock Holmes',
    wineId: 'chenin-blanc',
    credit: 'Rachel',
  },
  'pairing-gentil-hiaasen': {
    source: '4d10f619ff7377d805cd702806275576-xxlarge.jpg',
    alt: 'Hugel Gentil from Alsace beside a yellow Carl Hiaasen novel, Squeeze Me.',
    ratio: [2, 3],
    focal: 'center',
    orientation: 'portrait',
    book: 'Squeeze Me — Carl Hiaasen',
    wineId: 'gentil',
    credit: 'Rachel',
  },
  'pairing-gentil-painting': {
    source: 'eae2151ea601bbab17c9b2830f4ab623-xxlarge.jpg',
    alt: 'Hugel Gentil from Alsace photographed against a vivid abstract painting in teal, navy, and orange brushwork.',
    ratio: [2, 3],
    focal: 'center',
    orientation: 'portrait',
    wineId: 'gentil',
    credit: 'Rachel',
  },
  'pairing-brunello-steinbeck': {
    source: 'd6aea713a6666b2efd4bb9b7945b11b2-xxlarge.jpg',
    alt: 'A bottle of Col d’Orcia Brunello di Montalcino beside a hardcover of John Steinbeck’s The Grapes of Wrath.',
    ratio: [2, 3],
    focal: 'center',
    orientation: 'portrait',
    book: 'The Grapes of Wrath — John Steinbeck',
    wineId: 'brunello',
    credit: 'Rachel',
  },
} as const satisfies Record<string, PhotoEntry>;

export type PhotoId = keyof typeof photos;

export const photoIds = Object.keys(photos) as PhotoId[];

/** Photos used in the home-page atmosphere strip (detail / mood, no text). */
export const atmosphereStripIds: PhotoId[] = [
  'bar-mtsvane-lamp',
  'interior-painting-shelf',
  'interior-blue-wall',
];

/** Pairings to feature on the home page diptych row. */
export const featuredPairings: PhotoId[] = [
  'pairing-cabernet-faust',
  'pairing-brunello-steinbeck',
  'pairing-mtsvane-robbins',
  'pairing-chenin-sherlock',
];

/** Hero crossfade order. */
export const heroPhotoIds: PhotoId[] = [
  'interior-banquette',
  'bar-mtsvane-lamp',
  'exterior-storefront',
];

/** Map wine.id → photoId for use in the wine guide. */
export function photoForWine(wineId: string): PhotoId | undefined {
  return (Object.entries(photos) as [PhotoId, PhotoEntry][]).find(
    ([, p]) => p.wineId === wineId
  )?.[0];
}
