import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Network, Layers } from 'lucide-react';

interface Partner {
  name: string;
  category: string;
  description: string;
  badge: string;
}

const partners: Partner[] = [
  {
    name: "HUAWEI ENTERPRISE",
    category: "GPON & Óptica",
    description: "OLTs, ONTs y distribución de fibra pasiva de alta densidad",
    badge: "Hardware Certificado"
  },
  {
    name: "UBIQUITI UNIFI",
    category: "Wi-Fi 6 & Switching",
    description: "Puntos de acceso para resorts y distribución 10G",
    badge: "Solución Hotelera"
  },
  {
    name: "HIKVISION ACUSENSE",
    category: "Videovigilancia AI",
    description: "Cámaras perimetrales con analítica y reconocimiento facial",
    badge: "Seguridad Grado 3"
  },
  {
    name: "CISCO SYSTEMS",
    category: "Core & Routing",
    description: "Switches troncales y seguridad perimetral de red",
    badge: "Tier 1 Enterprise"
  },
  {
    name: "DAHUA TECHNOLOGY",
    category: "Inteligencia Visual",
    description: "Sistemas de lectura LPR y monitoreo térmico 24/7",
    badge: "Analítica AI"
  },
  {
    name: "PANDUIT",
    category: "Infraestructura",
    description: "Cableado estructurado Cat 6A / Fibra y racks certificados",
    badge: "Garantía 25 Años"
  },
  {
    name: "FURUKAWA ELECTRIC",
    category: "Fibra Monomodo",
    description: "Cables ópticos dieléctricos y cajas de empalme herméticas",
    badge: "Grado Marino"
  },
  {
    name: "MIKROTIK",
    category: "Carrier Routing",
    description: "Gestión de ancho de banda y balanceo de enlaces hoteleros",
    badge: "High Throughput"
  }
];

export const TechPartnersMarquee: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Luces decorativas de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">
              Ecosistema Homologado
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
            Marcas y Fabricantes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Certificados</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Implementamos exclusivamente hardware de clase mundial con respaldo directo de los fabricantes líderes en telecomunicaciones y seguridad electrónica.
          </p>
        </div>

        {/* Grid de Marcas Homologadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group relative p-5 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-blue-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-md bg-blue-600/15 text-blue-400 border border-blue-500/20">
                    {partner.category}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    {partner.badge}
                  </span>
                </div>

                <div className="text-lg font-black text-white tracking-wider group-hover:text-blue-300 transition-colors uppercase font-display mb-2">
                  {partner.name}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {partner.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-slate-500 group-hover:text-blue-400 transition-colors">
                <span>Tecnología Homologada</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota de garantía de fábrica */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/40 to-slate-950/40 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Garantía y Soporte Oficial de Fabricante
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400">
                Todos los proyectos entregados por SERTEC cuentan con certificación directa de canal y garantía extendida de hardware.
              </div>
            </div>
          </div>
          <div className="text-xs font-black uppercase tracking-widest text-blue-400 whitespace-nowrap bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/30">
            100% Repuestos Originales
          </div>
        </div>
      </div>
    </section>
  );
};
