import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Cable, ShieldCheck, Activity, Award } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  subtext: string;
}

const stats: StatItem[] = [
  {
    icon: <Award className="w-5 h-5 text-blue-400" />,
    value: 15,
    prefix: "+",
    suffix: " Años",
    label: "Liderazgo en el Caribe",
    subtext: "Ingeniería hotelera e industrial en RD"
  },
  {
    icon: <Building2 className="w-5 h-5 text-cyan-400" />,
    value: 25000,
    prefix: "+",
    suffix: "",
    label: "Habitaciones & Nodos",
    subtext: "Conectividad GPON certificada"
  },
  {
    icon: <Cable className="w-5 h-5 text-blue-400" />,
    value: 350,
    prefix: "+",
    suffix: " km",
    label: "Fibra Óptica Desplegada",
    subtext: "Redes ópticas de ultra-alta velocidad"
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
    value: 3000,
    prefix: "+",
    suffix: "",
    label: "Cámaras Activas IA Activas",
    subtext: "Analítica perimetral y seguridad 24/7"
  },
  {
    icon: <Activity className="w-5 h-5 text-emerald-400" />,
    value: 99.9,
    suffix: "%",
    decimals: 1,
    label: "Disponibilidad Operativa",
    subtext: "SLA crítico en temporada alta"
  }
];

const AnimatedCounter: React.FC<{ target: number; prefix?: string; suffix?: string; decimals?: number }> = ({
  target,
  prefix = "",
  suffix = "",
  decimals = 0
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1800;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * target;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target]);

  const formatted = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString('en-US');

  return (
    <span ref={ref} className="tabular-nums font-black">
      {prefix}{formatted}{suffix}
    </span>
  );
};

export const ImpactStatsRibbon: React.FC = () => {
  return (
    <section className="relative z-20 py-8 sm:py-10 bg-slate-950 border-y border-blue-500/20 overflow-hidden">
      {/* Glow ambiental centrado */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-blue-400">
              Capacidad Instalada y Desempeño Comprobado
            </span>
          </div>
        </div>

        {/* Grid Responsive: Teléfono (2 cols + 5to elemento centrado), Tablet (3 cols), Desktop (5 cols) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className={`group relative p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between h-full ${
                idx === 4 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors" />
                </div>

                <div className="text-2xl sm:text-3xl lg:text-3xl font-black text-white tracking-tight mb-1 group-hover:text-blue-300 transition-colors">
                  <AnimatedCounter
                    target={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                  />
                </div>

                <div className="text-xs sm:text-sm font-bold text-slate-100 tracking-tight leading-snug">
                  {stat.label}
                </div>
              </div>

              <div className="text-[11px] sm:text-xs text-slate-400 font-normal mt-2 leading-tight pt-2 border-t border-white/5">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
