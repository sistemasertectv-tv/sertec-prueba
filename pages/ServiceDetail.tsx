import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle, MessageCircle } from 'lucide-react';
import { getService, getGuide, servicePages } from '../lib/content';
import { SITE_URL, setJsonLd, setPageMeta, syncSeo } from '../lib/seo';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const s = getService(slug);

  useEffect(() => {
    if (!s) return;
    setPageMeta(s.metaTitle, s.metaDescription);
    syncSeo(pathname);
    const url = `${SITE_URL}/servicios/${s.slug}`;
    return setJsonLd('service-page', {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Service', name: s.name, description: s.metaDescription, url, serviceType: s.name, provider: { '@type': 'Organization', name: 'SERTEC', url: SITE_URL }, areaServed: ['República Dominicana', 'Caribe'] },
        { '@type': 'FAQPage', mainEntity: s.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
        { '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${SITE_URL}/servicios` },
          { '@type': 'ListItem', position: 3, name: s.name, item: url },
        ] },
      ],
    });
  }, [s, pathname]);

  if (!s) {
    return (
      <main className="max-w-3xl mx-auto px-6 pt-40 pb-24">
        <h1 className="text-4xl font-bold mb-5">Servicio no encontrado</h1>
        <Link className="sertec-button sertec-button--primary" to="/servicios">Ver todos los servicios</Link>
      </main>
    );
  }
  const guide = getGuide(s.guide);
  const others = servicePages.filter(x => x.slug !== s.slug);
  const wa = `https://wa.me/18298778369?text=${encodeURIComponent(`Hola SERTEC, quiero una cotización de: ${s.name}.`)}`;

  return (
    <main className="w-full bg-[#04070d]">
      <section className="pt-32 sm:pt-40 pb-16 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Ruta de navegación" className="text-xs text-slate-500 mb-6">
            <Link to="/" className="hover:text-white">Inicio</Link> / <Link to="/servicios" className="hover:text-white">Servicios</Link> / <span className="text-slate-300">{s.name}</span>
          </nav>
          <h1 className="font-display font-bold text-white tracking-[-0.02em] leading-[1.05] text-3xl sm:text-5xl">{s.h1}</h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-3xl">{s.intro}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link to="/contacto" state={{ selectedServiceTitle: s.contactTitle }} className="sertec-button sertec-button--primary">Solicitar cotización <ArrowRight size={16} aria-hidden="true" /></Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="sertec-button sertec-button--whatsapp"><MessageCircle size={18} aria-hidden="true" /> WhatsApp Directo</a>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Qué incluye</h2>
          <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {s.includes.map(i => (
              <li key={i} className="flex items-start gap-3 text-slate-300"><CheckCircle size={18} className="text-blue-400 mt-1 flex-shrink-0" aria-hidden="true" />{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Cómo trabajamos</h2>
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-5">
            {s.steps.map((st, i) => (
              <li key={st.t} className="rounded-xl border border-white/10 bg-slate-900/40 p-5">
                <span className="text-sm font-semibold text-blue-400 tabular-nums">0{i + 1}</span>
                <h3 className="mt-2 font-bold text-white">{st.t}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{st.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Preguntas frecuentes</h2>
          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {s.faqs.map(f => (
              <details key={f.q} className="group py-5">
                <summary className="cursor-pointer list-none flex justify-between gap-4 font-semibold text-white">{f.q}<span className="text-blue-400 group-open:rotate-45 transition-transform" aria-hidden="true">+</span></summary>
                <p className="mt-3 text-slate-400 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          {guide && (
            <p className="mt-8 text-slate-400">Más información: <Link to={`/blog/${guide.slug}`} className="text-blue-400 hover:text-white underline underline-offset-4">{guide.title}</Link></p>
          )}
        </div>
      </section>

      <section className="py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white">Otros servicios</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {others.map(o => <li key={o.slug}><Link to={`/servicios/${o.slug}`} className="inline-block rounded-md border border-white/10 hover:border-blue-500/60 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors">{o.name}</Link></li>)}
          </ul>
        </div>
      </section>
    </main>
  );
};
export default ServiceDetail;
