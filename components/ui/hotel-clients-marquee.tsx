import React from 'react';
import { Hotel, Sparkles } from 'lucide-react';

interface HotelItem {
  brand: string;
  category: string;
  resort: string;
  location: string;
}

const hotels: HotelItem[] = [
  {
    brand: "MELIÁ",
    category: "Hotels & Resorts",
    resort: "Punta Cana Beach Resort",
    location: "Bávaro • Punta Cana"
  },
  {
    brand: "IBEROSTAR",
    category: "Hotels & Resorts",
    resort: "Grand Bávaro & Waves",
    location: "Playa Bávaro • Higüey"
  },
  {
    brand: "SECRETS",
    category: "Resorts & Spas",
    resort: "Royal Beach Punta Cana",
    location: "Uvero Alto • Punta Cana"
  },
  {
    brand: "DREAMS",
    category: "Resorts & Spas",
    resort: "Flora & Cap Cana Resort",
    location: "Cap Cana • Cabeza de Toro"
  },
  {
    brand: "NICKELODEON",
    category: "Hotels & Resorts",
    resort: "Punta Cana Resort & Spa",
    location: "Uvero Alto • RD"
  },
  {
    brand: "NH HOTELS",
    category: "Hotel Group",
    resort: "Santo Domingo",
    location: "Distrito Nacional • RD"
  },
  {
    brand: "BREATHLESS",
    category: "Resorts & Spas",
    resort: "Punta Cana Resort",
    location: "Uvero Alto • Punta Cana"
  },
  {
    brand: "NOW ONYX",
    category: "Resort & Spa",
    resort: "Punta Cana",
    location: "Uvero Alto • La Altagracia"
  }
];

export const HotelClientsMarquee: React.FC = () => {
  // Duplicamos la lista para garantizar un bucle infinito continuo e imperceptible
  const marqueeItems = [...hotels, ...hotels];

  return (
    <section className="py-16 sm:py-20 bg-slate-950 relative overflow-hidden border-y border-blue-500/20">
      {/* Fondo de imagen caribeño restaurado con overlay oscuro */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
          alt="Playa Caribeña - Entorno Hotelero"
          className="w-full h-full object-cover opacity-15 grayscale mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950"></div>
      </div>

      {/* Luces y gradientes de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06),transparent_70%)] pointer-events-none" />

      {/* Encabezado del Cintillo - Perfectamente Alineado y Proporcional */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
          <Hotel className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-blue-400">
            Grandes Complejos Turísticos
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
          Cadenas Hoteleras que <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">Confían en SERTEC</span>
        </h2>
        <p className="mt-3 text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Infraestructura de telecomunicaciones, fibra óptica GPON y seguridad electrónica operando de forma continua en los resorts más exigentes del Caribe.
        </p>
      </div>

      {/* Cintillo de Desplazamiento Infinito Continuo (Infinite Marquee) */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Máscaras de desvanecimiento lateral para efecto visual cinematográfico */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent z-20" />

        {/* Pista de animación fluida */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center gap-4 sm:gap-6 md:gap-8">
          {marqueeItems.map((hotel, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 group relative px-6 sm:px-8 py-5 sm:py-6 rounded-2xl sm:rounded-3xl bg-slate-900/70 hover:bg-slate-900 border border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(37,99,235,0.2)] flex flex-col justify-center min-w-[220px] sm:min-w-[260px] md:min-w-[300px]"
            >
              {/* Badge de Categoría */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">
                  {hotel.category}
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors" />
              </div>

              {/* Nombre Principal de la Cadena Hotelera - GRANDE Y VISIBLE */}
              <div className="text-2xl sm:text-3xl md:text-3xl font-black text-white tracking-wider uppercase font-display group-hover:text-blue-300 transition-colors">
                {hotel.brand}
              </div>

              {/* Resort y Ubicación */}
              <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1 truncate">
                {hotel.resort}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {hotel.location}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sello de Confianza y Calidad al Pie del Cintillo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mt-8">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>+25,000 Habitaciones Conectadas</span>
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>Redes GPON Certificadas</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>Soporte Ininterrumpido 24/7 en Temporada Alta</span>
        </div>
      </div>
    </section>
  );
};
