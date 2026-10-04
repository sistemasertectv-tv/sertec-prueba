import React from 'react';
import { motion } from 'framer-motion';
import { SearchCheck, Compass, Zap, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Step {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    step: "01",
    title: "Auditoría & Site Survey",
    subtitle: "Inspección Técnica en Sitio",
    description: "Evaluación física en el complejo hotelero: pruebas de atenuación óptica, mapeo de rutas de canalización y mapas de calor radioeléctrico Wi-Fi 6.",
    deliverable: "Reporte de Factibilidad",
    icon: <SearchCheck className="w-6 h-6 text-blue-400" />
  },
  {
    step: "02",
    title: "Ingeniería & Planos CAD",
    subtitle: "Normativa ANSI/TIA-568-D",
    description: "Diseño milimétrico de cuartos de telecomunicaciones (MDF/IDF), cálculo de trayectorias con protección anticorrosión NEMA 4X y planos As-Built.",
    deliverable: "Planos y Memoria Técnica",
    icon: <Compass className="w-6 h-6 text-cyan-400" />
  },
  {
    step: "03",
    title: "Despliegue & Fusión Óptica",
    subtitle: "Certificación con Equipos Fluke",
    description: "Tendido de cableado estructurado, empalmes de fibra por fusión de arco con atenuación menor a 0.02 dB y reflectometría OTDR certificada.",
    deliverable: "Certificación Punto a Punto",
    icon: <Zap className="w-6 h-6 text-indigo-400" />
  },
  {
    step: "04",
    title: "Puesta en Marcha & SLA 24/7",
    subtitle: "Continuidad Operativa Garantizada",
    description: "Conmutación en caliente, monitoreo continuo de telemetría de red, capacitación de personal local y soporte crítico 24/7/365 en temporada alta.",
    deliverable: "SLA Crítico 99.9% 24/7",
    icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />
  }
];

export const EngineeringMethodology: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-blue-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-blue-400">
              Metodología de Grado Hotelero
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            Cómo Garantizamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Cero Caídas</span>
          </h2>
          <p className="mt-3 text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Un proceso de 4 etapas que asegura que cada proyecto de telecomunicaciones y seguridad cumpla con los más altos estándares internacionales antes de recibir al primer huésped.
          </p>
        </div>

        {/* Pasos de la metodología con alineación uniforme garantizada */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {steps.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group relative p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-black text-slate-700 group-hover:text-blue-500 transition-colors font-mono">
                    {s.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600/10 transition-all">
                    {s.icon}
                  </div>
                </div>

                <div className="min-h-[48px] sm:min-h-[56px] flex items-center">
                  <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight group-hover:text-blue-300 transition-colors leading-snug">
                    {s.title}
                  </h3>
                </div>

                <div className="min-h-[22px] flex items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {s.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[64px] sm:min-h-[80px]">
                  {s.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                  Entregable Oficial:
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
                  <span>{s.deliverable}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA para solicitar levantamiento */}
        <div className="mt-12 text-center">
          <Link
            to="/contacto"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all transform hover:scale-105 w-full sm:w-auto"
          >
            <span>Agendar Levantamiento Técnico en Sitio (Gratuito)</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
