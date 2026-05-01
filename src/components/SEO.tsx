import { useEffect } from 'react';
import { brand } from '../data/brand';

type Props = {
  title?: string;
  description?: string;
  /** Path to OG image (relative to root). */
  ogImage?: string;
  /** Add LocalBusiness JSON-LD structured data. */
  localBusiness?: boolean;
  /** Path to canonical URL (without origin). */
  path?: string;
};

const SITE_ORIGIN = 'https://thestdenis.com';

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    const [, propName, propValue] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? [];
    if (propName && propValue) el.setAttribute(propName, propValue);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setStructuredData(id: string, data: object | null) {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-seo="${id}"]`);
  if (data === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.dataset.seo = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function SEO({
  title,
  description = 'A boutique wine bar and vintage book haven in downtown Columbus, Indiana. Curated bottles, beautifully made things, neighborhood mood.',
  ogImage = '/img/exterior-storefront-1280.jpg',
  localBusiness,
  path = '/',
}: Props) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${brand.name}` : `${brand.fullName}`;
    document.title = fullTitle;

    const url = `${SITE_ORIGIN}${path}`;
    const imgUrl = ogImage.startsWith('http') ? ogImage : `${SITE_ORIGIN}${ogImage}`;

    setMeta('meta[name="description"]', 'content', description);
    setLink('canonical', url);

    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', imgUrl);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:site_name"]', 'content', brand.name);

    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', imgUrl);

    if (localBusiness) {
      setStructuredData('local-business', {
        '@context': 'https://schema.org',
        '@type': 'BarOrPub',
        name: brand.fullName,
        description,
        image: imgUrl,
        url: SITE_ORIGIN,
        telephone: brand.contact.phone,
        priceRange: brand.priceRange,
        address: {
          '@type': 'PostalAddress',
          streetAddress: brand.address.street,
          addressLocality: brand.address.city,
          addressRegion: brand.address.stateAbbr,
          postalCode: brand.address.postal,
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: brand.address.lat,
          longitude: brand.address.lng,
        },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Wednesday', 'Thursday'], opens: '16:00', closes: '22:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '14:00', closes: '23:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '12:00', closes: '18:00' },
        ],
        sameAs: [brand.social.instagram, brand.social.facebook],
      });
    } else {
      setStructuredData('local-business', null);
    }
  }, [title, description, ogImage, localBusiness, path]);

  return null;
}
