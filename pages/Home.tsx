import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { HeroCamera } from '../components/ui/hero-camera';
import { EngineeringMethodology } from '../components/ui/engineering-methodology';
import { HotelClientsMarquee } from '../components/ui/hotel-clients-marquee';
import { CorporateVideoShowcase } from '../components/ui/corporate-video-showcase';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7 },
};

const SectionHead: React.FC<{ index: string; label: string; title: React.ReactNode; text?: string }> = ({ index, label, title, text }) => (
  <motion.div {...reveal} className="max-w-3xl">
    <p className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-blue-400 mb-5">
      <span className="tabular-nums text-slate-500">{index}</span>
      <span className="h-px w-8 bg-blue-400" aria-hidden="true" />
      {label}
    </p>
    <h2 className="font-display font-bold text-white tracking-[-0.02em] leading-[1.05] text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
    {text && <p className="mt-5 text-base sm:text-lg text-slate-400 leading-relaxed">{text}</p>}
  </motion.div>
);

const services = [
  {
    n: '01',
    id: 'cams-section',
    src: 'https://res.cloudinary.com/dgjnnstkd/image/upload/v1785097767/ChatGPT_Image_26_jul_2026_04_28_57_p.m._ae2nwu.png',
    title: 'Videovigilancia AI',
    targetService: 'Cámaras de Seguridad',
    description: 'Sistemas inteligentes con reconocimiento facial y análisis térmico avanzado para hoteles.',
  },
  {
    n: '02',
    id: 'fiber-section',
    src: 'https://res.cloudinary.com/dgjnnstkd/image/upload/v1767456269/Image_202601031202_fllr6s.jpg',
    title: 'Fibra Óptica GPON',
    targetService: 'Red GPON',
    description: 'Redes pasivas de alta velocidad para máxima densidad de usuarios y conectividad robusta.',
  },
  {
    n: '03',
    id: 'networks-section',
    src: 'https://res.cloudinary.com/dgjnnstkd/image/upload/v1767457367/Whisk_e90192da8cd89b3b949495dd1f832f65dr_1_mtm15e.jpg',
    title: 'Redes Corporativas',
    targetService: 'Canalización',
    description: 'Infraestructura de telecomunicaciones robusta y certificada para entornos industriales.',
  },
];

const credentials = ['Grado industrial', 'Certificación internacional', 'Soporte crítico 24/7', 'Alta disponibilidad'];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceTitle: string) => {
    navigate('/contacto', { state: { selectedServiceTitle: serviceTitle } });
  };

  useEffect(() => {
    document.title = 'SERTEC | Fibra GPON, Videovigilancia y Redes para Hoteles - Santo Domingo';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'SERTEC - Soluciones de fibra GPON, videovigilancia AI y redes corporativas para hoteles en República Dominicana. 15 años de experiencia. Clientes: Meliá, Iberostar, Dreams. Llámanos: 1829 877 8369.'
      );
    }
  }, []);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SERTEC Telecomunicaciones y Seguridad Hotelera',
    image: 'https://sertectv.com/og-image.jpg',
    logo: 'https://sertectv.com/brand/sertec-logo.png',
    url: 'https://sertectv.com',
    description:
      'Empresa especializada en instalación de fibra óptica GPON, cámaras de seguridad para hoteles, videovigilancia AI, redes corporativas e IPTV en Santo Domingo, Punta Cana y República Dominicana.',
    telephone: '+1-829-877-8369',
    email: 'contacto@sertectv.com',
    areaServed: ['Santo Domingo', 'Punta Cana', 'Bávaro', 'La Romana', 'Santiago', 'República Dominicana'],
    knowsAbout: [
      'Cámaras de seguridad para hoteles República Dominicana',
      'Red GPON hoteles Punta Cana',
      'IPTV para hoteles Santo Domingo',
      'Videovigilancia AI',
      'Canalización eléctrica e industrial',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Félix Marcano 318, Urb. Máximo Gómez',
      addressLocality: 'Santo Domingo',
      addressCountry: 'DO',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    priceRange: '$$',
  };

  return (
    <main className="flex-col w-full bg-[#04070d]">
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>

      <section aria-label="SERTEC: fibra GPON, videovigilancia y redes para hoteles">
        <HeroCamera />
      </section>

      {/* 01 · Servicios */}
      <section id="soluciones" className="relative py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <SectionHead
              index="01"
              label="Servicios"
              title={<>Tres sistemas, una sola <span className="text-slate-500">operación sin interrupciones.</span></>}
              text="Ingeniería para proyectos críticos: hardware robusto y diseño inteligente para garantizar el flujo ininterrumpido de su operación."
            />
            <Link
              to="/servicios"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/30 hover:border-blue-400 pb-1 w-fit transition-colors"
            >
              Ver todos los servicios
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {services.map((s, idx) => (
              <motion.article
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group flex flex-col rounded-xl bg-slate-900/40 border border-white/10 hover:border-blue-500/50 overflow-hidden transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={s.src}
                    alt={`${s.title} para hoteles - SERTEC`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558494949-efc5e60dc19f?q=80&w=800&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-display text-sm font-semibold tabular-nums text-white/80">{s.n}</span>
                </div>
                <div className="flex flex-col flex-1 p-6 sm:p-7">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed flex-1">{s.description}</p>
                  <button
                    type="button"
                    onClick={() => handleServiceClick(s.targetService)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-white transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 rounded"
                  >
                    Solicitar este servicio
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 · Centro de monitoreo */}
      <section className="relative py-20 sm:py-28 border-t border-white/5 bg-gradient-to-b from-[#04070d] via-slate-950 to-[#04070d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div {...reveal} className="lg:col-span-7 order-2 lg:order-1">
            <figure className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900/60">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 text-[11px] uppercase tracking-[0.2em]">
                <span className="text-slate-300 font-semibold">Centro de Operaciones SERTEC</span>
                <span className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  24/7 en línea
                </span>
              </div>
              <img
                src="/centro_monitoreo_sertec.jpg"
                alt="Centro de monitoreo SERTEC con videovigilancia 24/7"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </figure>
          </motion.div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <SectionHead
              index="02"
              label="Control operativo continuo"
              title={<>Centros de monitoreo <span className="text-slate-500">de alta calidad.</span></>}
              text="Diseñamos e implementamos centros de monitoreo con tecnología de visualización avanzada y motores de IA que garantizan una vigilancia proactiva para la seguridad de su empresa."
            />
            <dl className="mt-8 grid grid-cols-2 border-t border-white/10">
              <div className="py-6 pr-4">
                <dt className="font-display text-4xl font-bold text-white tabular-nums">99,9 %</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Uptime operativo</dd>
              </div>
              <div className="py-6 pl-6 border-l border-white/10">
                <dt className="font-display text-4xl font-bold text-white tabular-nums">+500</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Nodos conectados</dd>
              </div>
            </dl>
            <Link
              to="/contacto"
              className="mt-2 inline-flex items-center gap-2 rounded-md bg-white text-slate-950 hover:bg-blue-50 font-semibold text-sm px-6 py-3.5 transition-colors"
            >
              Cotizar un centro de monitoreo
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 03 · Trayectoria */}
      <section className="relative py-20 sm:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <SectionHead
              index="03"
              label="Trayectoria probada"
              title={<>15 años de <span className="text-slate-500">liderazgo hotelero.</span></>}
              text="Diseñamos e implementamos sistemas de seguridad y conectividad que son el estándar de oro en el sector hotelero e industrial de la región."
            />
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {credentials.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm font-medium text-slate-200">
                  <CheckCircle size={18} className="text-blue-400 flex-shrink-0" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <motion.div {...reveal} className="lg:col-span-7">
            <figure className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900/60">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 text-[11px] uppercase tracking-[0.2em]">
                <span className="text-slate-300 font-semibold">Infraestructura SERTEC</span>
                <span className="text-blue-400 font-semibold">+15 años</span>
              </div>
              <img
                src="/infraestructura_15_anos_sertec.jpg"
                alt="Infraestructura de telecomunicaciones y fibra óptica instalada por SERTEC"
                loading="lazy"
                decoding="async"
                className="w-full h-auto block"
              />
            </figure>
          </motion.div>
        </div>
      </section>

      <CorporateVideoShowcase />
      <EngineeringMethodology />
      <HotelClientsMarquee />

      {/* Cierre con llamada a la acción */}
      <section className="relative overflow-hidden py-20 sm:py-28 border-t border-white/5">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(50% 70% at 50% 100%, rgba(37,99,235,0.22), rgba(4,7,13,0) 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div {...reveal} className="lg:col-span-7">
            <h2 className="font-display font-bold text-white tracking-[-0.02em] leading-[1.03] text-4xl sm:text-5xl lg:text-6xl">
              Hablemos de la infraestructura <span className="text-slate-500">de su próximo proyecto.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
              Cuéntenos qué necesita su hotel, resort o instalación industrial y preparamos una cotización a su medida, sin compromiso.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/contacto"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-4 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.9)] transition-colors"
              >
                Solicitar cotización gratuita
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <a
                href="https://wa.me/18298778369?text=Hola%20SERTEC%2C%20quiero%20una%20cotizaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-semibold px-7 py-4 transition-colors"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.ul {...reveal} className="lg:col-span-5 space-y-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <a href="tel:+18298778369" className="hover:text-white transition-colors">+1 (829) 877-8369</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <a href="mailto:contacto@sertectv.com" className="hover:text-white transition-colors">contacto@sertectv.com</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>Félix Marcano 318, Urb. Máximo Gómez, Santo Domingo</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={18} className="text-blue-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span>Lunes a viernes, 8:00 a 18:00 · Soporte crítico 24/7</span>
            </li>
          </motion.ul>
        </div>
      </section>
    </main>
  );
};

export default Home;
