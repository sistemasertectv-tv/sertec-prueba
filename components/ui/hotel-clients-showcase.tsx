import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hotel, MapPin, CheckCircle2, Shield, ArrowRight, Building } from 'lucide-react';

interface HotelClient {
  brand: string;
  resort: string;
  location: string;
  scope: string;
  tags: string[];
}

const clients: HotelClient[] = [
  {
    brand: "MELIÁ",
    resort: "Meliá Punta Cana Beach Resort",
    location: "Bávaro - Punta Cana",
    scope: "Infraestructura de Fibra GPON y Sistema Integral de Videovigilancia AI Perimetral.",
    tags: ["Red GPON", "Cámaras AI", "Wi-Fi 6"]
  },
  {
    brand: "IBEROSTAR",
    resort: "Iberostar Grand Bávaro & Waves",
    location: "Playa Bávaro, Higüey",
    scope: "Canalización de grado marino, cableado estructurado Cat 6A y enlaces troncales de fibra.",
    tags: ["Canalización NEMA 4X", "Cableado", "Fibra Troncal"]
  },
  {
    brand: "SECRETS",
    resort: "Secrets Royal Beach Punta Cana",
    location: "Uvero Alto - Punta Cana",
    scope: "Cabecera IPTV centralizada para distribución 4K interactiva en habitaciones y suites.",
    tags: ["IPTV 4K", "Distribución Óptica", "TV Hotelera"]
  },
  {
    brand: "DREAMS",
    resort: "Dreams Flora Resort & Spa / Cap Cana",
    location: "Cabeza de Toro & Cap Cana",
    scope: "Despliegue de red de fibra óptica a cada suite y sistema de control de acceso perimetral.",
    tags: ["GPON Habitaciones", "Control Acceso", "CCTV"]
  },
  {
    brand: "NICKELODEON",
    resort: "Nickelodeon Hotels & Resorts Punta Cana",
    location: "Uvero Alto",
    scope: "Mantenimiento preventivo 24/7 y optimización de centro de cómputo y conmutación.",
    tags: ["SLA 24/7", "Centro de Cómputo", "Red Core"]
  },
  {
    brand: "NH HOTELS",
    resort: "NH Hotel Santo Domingo",
    location: "Distrito Nacional, Santo Domingo",
    scope: "Modernización de infraestructura de voz IP, seguridad electrónica y conmutadores gestionados.",
    tags: ["Voz IP", "Switching 10G", "Seguridad"]
  },
  {
    brand: "BREATHLESS",
    resort: "Breathless Punta Cana Resort & Spa",
    location: "Playas de Uvero Alto",
    scope: "Monitoreo perimetral térmico e interconexión de villas mediante fibra óptica subterránea.",
    tags: ["Fibra Subterránea", "Cámaras Térmicas", "Red GPON"]
  },
  {
    brand: "NOW ONYX",
    resort: "Now Onyx Resort & Spa",
    location: "Uvero Alto, La Altagracia",
    scope: "Instalación de gabinetes y canalizaciones con tubería galvanizada EMT/IMC para intemperie.",
    tags: ["Canalización Industrial", "Racks Certificados"]
  }
];

export const HotelClientsShowcase: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<HotelClient>(clients[0]);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/20 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
            <Hotel className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">
              Cartera de Clientes Institucionales
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
            Grandes Cadenas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Hoteleras</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Complejos turísticos de categoría internacional en Punta Cana, Bávaro y Santo Domingo confían su infraestructura y seguridad a la ingeniería de SERTEC.
          </p>
        </div>

        {/* Grid interactivo de marcas hoteleras */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {clients.map((client, idx) => {
            const isSelected = selectedClient.brand === client.brand;
            return (
              <motion.button
                key={idx}
                type="button"
                onClick={() => setSelectedClient(client)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500/60 shadow-[0_0_25px_rgba(37,99,235,0.25)] scale-[1.02]'
                    : 'bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      {client.location.split('-')[0].trim()}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-400 shadow-[0_0_8px_#38bdf8]' : 'bg-slate-700'}`} />
                  </div>
                  <div className="text-lg sm:text-xl font-black tracking-wider text-white uppercase font-display">
                    {client.brand}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-medium truncate mt-2">
                  {client.resort}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Panel de detalle de proyecto para el cliente seleccionado */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedClient.brand}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-blue-500/30 backdrop-blur-xl shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    {selectedClient.resort}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-blue-400 font-bold bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    <MapPin size={12} /> {selectedClient.location}
                  </span>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedClient.scope}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedClient.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 bg-white/5 px-3 py-1 rounded-lg border border-white/10"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center sm:items-end">
                <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 w-full sm:w-auto text-left sm:text-right">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                    Infraestructura Verificada
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Operación continua sin interrupciones reportadas
                  </div>
                  <div className="mt-3 flex items-center justify-start sm:justify-end gap-1.5 text-[11px] font-bold text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Soporte Activo SERTEC
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
