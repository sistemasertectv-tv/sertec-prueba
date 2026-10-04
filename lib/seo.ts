export const SITE_URL = 'https://sertectv.com';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const setMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Sincroniza canonical, Open Graph y Twitter con el título y la descripción que fija cada página. */
export const syncSeo = (pathname: string) => {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const url = `${SITE_URL}${path}`;
  const title = document.title;
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;

  setMeta('meta[property="og:url"]', 'property', 'og:url', url);
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', url);
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
};
