import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getGuide, getService, guidePages } from '../lib/content';
import { SITE_URL, setJsonLd, setPageMeta, syncSeo } from '../lib/seo';

const GuideDetail: React.FC = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const g = getGuide(slug);

  useEffect(() => {
    if (!g) return;
    setPageMeta(g.metaTitle, g.metaDescription);
    syncSeo(pathname);
    const url = `${SITE_URL}/blog/${g.slug}`;
    return setJsonLd('guide-page', {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Article', headline: g.title, description: g.metaDescription, mainEntityOfPage: url, image: `${SITE_URL}/og-image.jpg`, inLanguage: 'es-DO', author: { '@type': 'Organization', name: 'SERTEC' }, publisher: { '@type': 'Organization', name: 'SERTEC', logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/sertec-logo.png` } } },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: g.title, item: url },
        ] },
      ],
    });
  }, [g, pathname]);

  if (!g) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-40 pb-24">
        <h1 className="text-4xl font-bold mb-5">Guía no encontrada</h1>
        <Link className="sertec-button sertec-button--primary" to="/blog">Ir al blog</Link>
      </main>
    );
  }
  const svc = getService(g.service);
  const more = guidePages.filter(x => x.slug !== g.slug);

  return (
    <main className="w-full bg-[#04070d] pt-32 sm:pt-40 pb-20">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Ruta de navegación" className="text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-white">Inicio</Link> / <Link to="/blog" className="hover:text-white">Blog</Link>
        </nav>
        <p className="text-xs uppercase tracking-[0.2em] text-blue-400 font-semibold">Guía técnica · {g.readTime} de lectura</p>
        <h1 className="mt-4 font-display font-bold text-white tracking-[-0.02em] leading-[1.08] text-3xl sm:text-5xl">{g.title}</h1>
        <p className="mt-6 text-lg text-slate-300 leading-relaxed">{g.lead}</p>
        {g.sections.map(sec => (
          <section key={sec.h} className="mt-10">
            <h2 className="text-2xl font-bold text-white tracking-tight">{sec.h}</h2>
            {sec.p.map((p, i) => <p key={i} className="mt-3 text-slate-300 leading-relaxed">{p}</p>)}
            {sec.bullets && <ul className="mt-3 list-disc pl-6 space-y-1 text-slate-300">{sec.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
          </section>
        ))}
        <aside className="mt-14 rounded-xl border border-blue-500/30 bg-blue-600/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white">¿Quiere evaluar su caso?</h2>
          <p className="mt-2 text-slate-300">Cuéntenos su proyecto y preparamos una propuesta a su medida.</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link to="/contacto" state={{ selectedServiceTitle: svc?.contactTitle }} className="sertec-button sertec-button--primary">Solicitar cotización <ArrowRight size={16} aria-hidden="true" /></Link>
            {svc && <Link to={`/servicios/${svc.slug}`} className="sertec-button" style={{ borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}>Ver servicio: {svc.name}</Link>}
          </div>
        </aside>
        <div className="mt-12">
          <h2 className="text-lg font-bold text-white">Otras guías</h2>
          <ul className="mt-4 space-y-2">
            {more.map(m => <li key={m.slug}><Link to={`/blog/${m.slug}`} className="text-blue-400 hover:text-white underline underline-offset-4">{m.title}</Link></li>)}
          </ul>
        </div>
      </article>
    </main>
  );
};
export default GuideDetail;
