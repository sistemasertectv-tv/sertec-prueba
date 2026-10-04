import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const WHATSAPP = 'https://wa.me/18298778369?text=Hola%20SERTEC%2C%20quiero%20una%20cotizaci%C3%B3n';

const metrics = [
  { value: '+15', label: 'Años en proyectos hoteleros e industriales' },
  { value: '+25.000', label: 'Habitaciones y nodos con GPON' },
  { value: '+350 km', label: 'Fibra óptica desplegada' },
  { value: '99,9 %', label: 'Disponibilidad operativa' },
];

const callouts = [
  { x: '76%', y: '30%', label: 'Multisensor panorámico' },
  { x: '60%', y: '74%', label: 'Domo PTZ con analítica IA' },
];

export const HeroCamera: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div className="relative isolate overflow-hidden bg-[#04070d] flex flex-col lg:min-h-[100svh]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(48% 62% at 72% 46%, rgba(37,99,235,0.20) 0%, rgba(4,7,13,0) 72%), linear-gradient(180deg, rgba(4,7,13,0) 75%, #04070d 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(65% 80% at 72% 48%, #000 0%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(65% 80% at 72% 48%, #000 0%, transparent 78%)',
        }}
      />

      {/* Cámara: más de la mitad de la pantalla, se sale por la derecha en escritorio */}
      <div
        className="relative pt-20 lg:pt-0 lg:pb-24 lg:absolute lg:inset-y-0 lg:right-[-7vw] lg:w-[68vw] lg:max-w-[1250px] flex items-center justify-center"
        style={{ perspective: 1600 }}
      >
        <div className="relative w-full">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={
              reduce
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, rotateY: [-11, 11, -11], y: [0, -10, 0] }
            }
            transition={{
              opacity: { duration: 1.1 },
              scale: { duration: 1.1, ease: 'easeOut' },
              rotateY: { duration: 18, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <img
              src="/brand/hero-camera-v2.webp"
              srcSet="/brand/hero-camera-v2-720.webp 720w, /brand/hero-camera-v2.webp 1120w"
              sizes="(min-width: 1024px) 68vw, 100vw"
              width={1120}
              height={768}
              alt="Cámara de videovigilancia multisensor con domo PTZ, instalada por SERTEC para hoteles y resorts"
              fetchPriority="high"
              decoding="async"
              draggable={false}
              className="w-full h-auto select-none"
            />
          </motion.div>

          {callouts.map((c) => (
            <div
              key={c.label}
              className="hidden xl:flex absolute items-center gap-3 -translate-y-1/2 pointer-events-none"
              style={{ left: c.x, top: c.y }}
              aria-hidden="true"
            >
              <span className="block w-2.5 h-2.5 rounded-full bg-blue-400 ring-4 ring-blue-400/20" />
              <span className="block h-px w-12 bg-white/30" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-300 whitespace-nowrap">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Texto */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl xl:max-w-2xl py-8 lg:py-28">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-blue-400 mb-6"
          >
            <span className="h-px w-8 bg-blue-400" aria-hidden="true" />
            Telecomunicaciones y seguridad electrónica
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display font-bold text-white tracking-[-0.02em] leading-[1.02] text-[2.6rem] sm:text-6xl xl:text-7xl"
          >
            Fibra GPON, videovigilancia y redes para hoteles
            <span className="block mt-2 text-slate-500 text-[0.55em] font-medium tracking-tight leading-tight">
              en República Dominicana
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-7 text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg"
          >
            Diseñamos, instalamos y damos soporte a la infraestructura que mantiene conectado y vigilado su resort:
            cableado estructurado, GPON, CCTV con analítica de video e IPTV. Más de 15 años trabajando con
            Meliá, Iberostar y Dreams.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
          >
            <Link
              to="/contacto"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm sm:text-base px-7 py-4 shadow-[0_10px_40px_-10px_rgba(37,99,235,0.9)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Solicitar cotización gratuita
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              to="/proyectos"
              className="inline-flex items-center justify-center rounded-md border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-semibold text-sm sm:text-base px-7 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Ver proyectos
            </Link>
          </motion.div>

          <motion.a
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <MessageCircle size={16} className="text-emerald-400" aria-hidden="true" />
            ¿Prefiere escribirnos? Respondemos por WhatsApp
          </motion.a>
        </div>
      </div>

      {/* Cifras */}
      <div className="relative z-10 border-t border-white/10 bg-[#04070d]/80 backdrop-blur-md">
        <dl className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 px-4 sm:px-6 lg:px-8">
          {metrics.map((m, i) => (
            <div
              key={m.value}
              className={`py-5 sm:py-6 lg:px-6 ${i > 0 ? 'lg:border-l lg:border-white/10' : 'lg:pl-0'} ${i % 2 === 1 ? 'pl-4 border-l border-white/10 lg:pl-6' : ''}`}
            >
              <dt className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">{m.value}</dt>
              <dd className="mt-1 text-[11px] sm:text-xs leading-snug text-slate-400 max-w-[14rem]">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default HeroCamera;
