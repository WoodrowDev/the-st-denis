import { type CSSProperties, type ImgHTMLAttributes } from 'react';
import { photos, type PhotoId } from '../data/photos';
import { lqips } from '../data/photos.generated';

const WIDTHS = [480, 768, 1280, 1920, 2560] as const;

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes'> & {
  id: PhotoId;
  /** Responsive sizes attribute; defaults to full viewport. */
  sizes?: string;
  /** Whether this is a hero image (eager-loaded, fetchpriority high). */
  priority?: boolean;
  /** CSS object-position; defaults to manifest focal or 'center'. */
  objectPosition?: string;
  /** Treat as cover (fills container) vs. contain (preserves aspect). */
  fit?: 'cover' | 'contain';
  /** Inline style override. */
  style?: CSSProperties;
  /** Tailwind / className. */
  className?: string;
};

export function Picture({
  id,
  sizes = '100vw',
  priority = false,
  objectPosition,
  fit = 'cover',
  style,
  className,
  alt: altOverride,
  ...rest
}: Props) {
  const photo = photos[id];
  if (!photo) {
    if (import.meta.env.DEV) console.warn(`[Picture] unknown id "${id}"`);
    return null;
  }
  const lqip = lqips[id];
  const objPos = objectPosition ?? photo.focal ?? 'center';
  const [w, h] = photo.ratio;

  const buildSrcSet = (fmt: 'avif' | 'webp' | 'jpg') =>
    WIDTHS.map((width) => `/img/${id}-${width}.${fmt} ${width}w`).join(', ');

  return (
    <picture>
      <source type="image/avif" srcSet={buildSrcSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={buildSrcSet('webp')} sizes={sizes} />
      <img
        src={`/img/${id}-1280.jpg`}
        srcSet={buildSrcSet('jpg')}
        sizes={sizes}
        alt={altOverride ?? photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        width={w}
        height={h}
        className={className}
        style={{
          backgroundImage: lqip ? `url("${lqip}")` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: objPos,
          objectFit: fit,
          objectPosition: objPos,
          ...style,
        }}
        {...rest}
      />
    </picture>
  );
}
