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
  document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach(el => { el.href = url; });

  setMeta('meta[property="og:url"]', 'property', 'og:url', url);
  setMeta('meta[property="og:title"]', 'property', 'og:title', title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', description);
  setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', url);
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
};

/** Inserta o reemplaza un bloque JSON-LD en <head>. Devuelve la función de limpieza. */
export const setJsonLd = (id: string, data: unknown) => {
  let el = document.head.querySelector<HTMLScriptElement>(`script[data-jsonld="${id}"]`);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-jsonld', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
  return () => { el?.remove(); };
};

export const setPageMeta = (title: string, description: string) => {
  document.title = title;
  let m = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!m) {
    m = document.createElement('meta');
    m.setAttribute('name', 'description');
    document.head.appendChild(m);
  }
  m.setAttribute('content', description);
};
