const textures = {
  teal: '/images/MarbledEndPage_light_teal.jpg',
  dark: '/images/marbled-dark.jpg',
  multicolor: '/images/Multicolor_SVG.svg',
};

type MarbledDividerProps = {
  texture: keyof typeof textures;
};

export function MarbledDivider({ texture }: MarbledDividerProps) {
  return (
    <div
      className="h-12 md:h-20 lg:h-24 w-full"
      style={{
        backgroundImage: `url(${textures[texture]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role="presentation"
    />
  );
}
