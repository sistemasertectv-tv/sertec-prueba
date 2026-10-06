import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { guidePages, servicePages } from '../../lib/content';

const works = [
  { src: '/projects/project-13.jpg', w: 1344, h: 768 },
  { src: '/projects/project-14.jpg', w: 1200, h: 1600 },
  { src: '/projects/project-15.jpg', w: 1600, h: 1200 },
  { src: '/projects/project-23.jpg', w: 1600, h: 900 },
  { src: '/projects/project-16.jpg', w: 1200, h: 1600 },
  { src: '/projects/project-20.jpg', w: 1600, h: 1200 },
];

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-blue-400 mb-5">
    <span className="h-px w-8 bg-blue-400" aria-hidden="true" /> {children}
  </p>
);

export const RealWorks: React.FC = () => (
  <section className="relative py-20 sm:py-28 border-t border-white/5" aria-labelledby="obras-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div className="max-w-3xl">
          <Eyebrow>Obras reales</Eyebrow>
          <h2 id="obras-title" className="font-display font-bold text-white tracking-[-0.02em] leading-[1.05] text-3xl sm:text-4xl lg:text-5xl">
            Instalaciones de SERTEC <span className="text-slate-500">en campo.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed">Fotografías de trabajos ejecutados por nuestro equipo.</p>
        </div>
        <Link to="/proyectos" className="group inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/30 hover:border-blue-400 pb-1 w-fit transition-colors">
          Ver todos los proyectos <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
        {works.map((p, i) => (
          <figure key={p.src} className="break-inside-avoid rounded-xl overflow-hidden border border-white/10 bg-slate-900/60">
            <img src={p.src} width={p.w} height={p.h} loading="lazy" decoding="async" alt={`Instalación de telecomunicaciones y seguridad realizada por SERTEC, proyecto ${i + 1}`} className="w-full h-auto block" />
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export const GuidesSection: React.FC = () => (
  <section className="relative py-20 sm:py-28 border-t border-white/5 bg-gradient-to-b from-[#04070d] via-slate-950 to-[#04070d]" aria-labelledby="guias-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Eyebrow>Guías técnicas</Eyebrow>
      <h2 id="guias-title" className="font-display font-bold text-white tracking-[-0.02em] leading-[1.05] text-3xl sm:text-4xl lg:text-5xl max-w-3xl">
        Decida con información, <span className="text-slate-500">no con suposiciones.</span>
      </h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
        {guidePages.map(g => (
          <Link key={g.slug} to={`/blog/${g.slug}`} className="group rounded-xl border border-white/10 hover:border-blue-500/50 bg-slate-900/40 p-6 sm:p-7 transition-colors">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Guía · {g.readTime} de lectura</p>
            <h3 className="mt-3 text-xl font-bold text-white tracking-tight">{g.title}</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">{g.lead}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-white transition-colors">
              Leer guía <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export const QuickQuote: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [need, setNeed] = useState(servicePages[0].name);
  const [detail, setDetail] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola SERTEC, soy ${name}${company ? ` de ${company}` : ''}. Necesito: ${need}.${detail ? ` ${detail}` : ''}`;
    window.open(`https://wa.me/18298778369?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };
  const field = 'w-full rounded-md bg-white/5 border border-white/10 focus:border-blue-500 outline-none px-4 py-3 text-sm text-white placeholder-slate-500';

  return (
    <section className="relative py-20 sm:py-28 border-t border-white/5" aria-labelledby="cotiza-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <Eyebrow>Cotización rápida</Eyebrow>
          <h2 id="cotiza-title" className="font-display font-bold text-white tracking-[-0.02em] leading-[1.05] text-3xl sm:text-4xl">
            Cuéntenos su proyecto <span className="text-slate-500">en 30 segundos.</span>
          </h2>
          <p className="mt-5 text-slate-400 leading-relaxed">Al enviar, se abre WhatsApp con su mensaje ya redactado. Para un formulario completo, use la página de <Link to="/contacto" className="text-blue-400 hover:text-white underline underline-offset-4">contacto</Link>.</p>
        </div>
        <form onSubmit={submit} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-white/10 bg-slate-900/40 p-6 sm:p-8">
          <label className="text-sm text-slate-300">Nombre
            <input required value={name} onChange={e => setName(e.target.value)} className={`${field} mt-2`} placeholder="Su nombre" autoComplete="name" />
          </label>
          <label className="text-sm text-slate-300">Empresa u hotel
            <input value={company} onChange={e => setCompany(e.target.value)} className={`${field} mt-2`} placeholder="Nombre de la empresa" autoComplete="organization" />
          </label>
          <label className="text-sm text-slate-300 sm:col-span-2">Qué necesita
            <select value={need} onChange={e => setNeed(e.target.value)} className={`${field} mt-2`}>
              {servicePages.map(s => <option key={s.slug} value={s.name} className="bg-slate-900">{s.name}</option>)}
            </select>
          </label>
          <label className="text-sm text-slate-300 sm:col-span-2">Detalles (opcional)
            <textarea value={detail} onChange={e => setDetail(e.target.value)} rows={3} className={`${field} mt-2`} placeholder="Ubicación, número de habitaciones, plazos…" />
          </label>
          <button type="submit" className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-4 transition-colors">
            <MessageCircle size={18} aria-hidden="true" /> Enviar por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};
