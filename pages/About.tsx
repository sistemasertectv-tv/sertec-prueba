import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Users, Target, Zap, Shield, X, Award, Briefcase, Hotel, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  const historyRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [selectedStat, setSelectedStat] = useState<number | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Sobre SERTEC | 15+ Años de Liderazgo en Redes y Seguridad Hotelera en RD";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Empresa dominicana líder en ingeniería de telecomunicaciones, redes ópticas pasivas GPON y seguridad electrónica de grado industrial para resorts y hoteles.");
    }
  }, []);

  const modalDetails = [
    {
      title: "Nuestra Misión",
      icon: <Target size={120} />,
      description: (
        <>
          <p>
            Nuestra misión es ser el motor de innovación para las empresas del sector hospitalidad y corporativo en la región. Nos dedicamos a diseñar e implementar infraestructuras de red de última generación, sistemas de seguridad electrónica avanzados y soluciones de conectividad de fibra óptica que no solo cumplen con los estándares actuales, sino que anticipan las necesidades futuras.
          </p>
          <br />
          <p>
            Buscamos empoderar a nuestros clientes a través de la tecnología, asegurando que cada instalación sea un activo estratégico que impulse su eficiencia operativa y mejore la experiencia final de sus usuarios.
          </p>
        </>
      )
    },
    {
      title: "Nuestra Visión",
      icon: <Zap size={120} />,
      description: (
        <>
          <p>
            Visualizamos a SERTEC como el líder indiscutible y el socio tecnológico preferido en todo el Caribe. Nuestra meta es transformar radicalmente la forma en que los hoteles y empresas gestionan su infraestructura digital, promoviendo entornos más inteligentes, seguros y sostenibles.
          </p>
          <br />
          <p>
            Aspiramos a ser pioneros en la adopción de nuevas tecnologías como la inteligencia artificial aplicada a la seguridad y el IoT a gran escala, estableciendo un nuevo paradigma de calidad y servicio técnico que sea reconocido a nivel internacional.
          </p>
        </>
      )
    },
    {
      title: "Nuestros Valores",
      icon: <Shield size={120} />,
      description: (
        <div className="space-y-4">
          <p>Nuestra cultura organizacional se cimenta en tres pilares fundamentales que guían cada uno de nuestros proyectos:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">01.</span>
              <span><strong>Excelencia Técnica:</strong> No nos conformamos con lo funcional; buscamos la perfección en cada conexión y configuración.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">02.</span>
              <span><strong>Compromiso con el Cliente:</strong> Entendemos que nuestro éxito depende del éxito operativo de nuestros aliados, ofreciendo soporte y soluciones personalizadas.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">03.</span>
              <span><strong>Integridad:</strong> Operamos con total transparencia, honestidad y responsabilidad, construyendo relaciones de confianza a largo plazo.</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const statDetails = [
    {
      title: "Trayectoria de Excelencia",
      icon: <Award size={120} />,
      description: "Desde nuestra fundación en 2008, hemos liderado la innovación tecnológica en el Caribe. Nuestra trayectoria se define por la confiabilidad y la capacidad de adaptarnos a los retos de infraestructura más exigentes de la región, construyendo soluciones que perduran y definen nuevos estándares de calidad."
    },
    {
      title: "Impacto y Alcance Regional",
      icon: <Briefcase size={120} />,
      description: "Nuestra huella abarca desde complejos turísticos de clase mundial hasta centros operativos de alto rendimiento. Hemos transformado la conectividad en más de 500 locaciones críticas, garantizando excelencia técnica y cumplimiento estricto de cronogramas en cada entrega."
    },
    {
      title: "Socios Estratégicos Globales",
      icon: <Hotel size={120} />,
      description: "Somos el aliado tecnológico de confianza de las cadenas hoteleras más prestigiosas y exigentes del mundo, incluyendo Meliá, Iberostar, Secrets, Dreams y Royalton. Superamos las auditorías más rigurosas de seguridad avanzada y eficiencia digital, consolidándonos como el referente indiscutible del sector hospitality."
    },
    {
      title: "Garantía de Continuidad Total",
      icon: <Activity size={120} />,
      description: "Nuestra infraestructura está diseñada para una operatividad absoluta. Mediante el uso de topologías redundantes, fibra óptica de grado industrial y monitoreo preventivo con analíticas de IA las 24 horas del día, garantizamos un uptime del 99.9% para que su negocio nunca se vea comprometido por fallas técnicas."
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (historyRef.current) {
      const rect = historyRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const clients = [
    { name: "Meliá Caribe", logo: "MELIÁ CARIBE", color: "from-amber-200 to-yellow-500" },
    { name: "Meliá Tropical", logo: "MELIÁ TROPICAL", color: "from-amber-300 to-yellow-600" },
    { name: "Paradisus Punta Cana", logo: "PARADISUS", color: "from-emerald-300 to-blue-500" },
    { name: "Iberostar Dominicana", logo: "IBEROSTAR DOMINICANA", color: "from-blue-300 to-indigo-500" },
    { name: "Iberostar Punta Cana", logo: "IBEROSTAR PUNTA CANA", color: "from-sky-300 to-blue-500" },
    { name: "Iberostar Grand Bávaro", logo: "IBEROSTAR GRAND BÁVARO", color: "from-amber-300 to-yellow-600" },
    { name: "Secrets Royal Beach", logo: "SECRETS ROYAL", color: "from-purple-400 to-fuchsia-600" },
    { name: "NH Hotels", logo: "nH HOTELS", color: "from-red-400 to-rose-600" },
    { name: "Dreams Flora", logo: "DREAMS FLORA", color: "from-blue-400 to-indigo-600" },
    { name: "Nickelodeon", logo: "NICKELODEON", color: "from-orange-400 to-yellow-600" },
    { name: "Now Onyx", logo: "now ONYX", color: "from-pink-400 to-rose-500" },
    { name: "Breathless Punta Cana", logo: "BREATHLESS", color: "from-blue-400 to-blue-700" },
    { name: "Royalton", logo: "ROYALTON", color: "from-amber-400 to-orange-600" },
    { name: "Dreams Cap Cana", logo: "DREAMS CAP CANA", color: "from-sky-400 to-blue-600" },
    { name: "Dreams Royal Beach", logo: "DREAMS ROYAL", color: "from-indigo-400 to-blue-700" }
  ];

  // Duplicate clients for perfect news-ticker continuity
  const marqueeClients = [...clients, ...clients, ...clients];

  const cameraBrands = [
    { name: "Hikvision", logo: "HIKVISION", color: "from-red-500 to-rose-700" },
    { name: "Dahua", logo: "DAHUA", color: "from-blue-500 to-indigo-700" },
    { name: "HiLook", logo: "HILOOK", color: "from-slate-400 to-slate-600" },
    { name: "Hanwha", logo: "HANWHA", color: "from-orange-500 to-amber-700" },
    { name: "Axis", logo: "AXIS", color: "from-yellow-400 to-amber-600" },
    { name: "Bosch", logo: "BOSCH", color: "from-blue-600 to-slate-800" },
    { name: "Ubiquiti", logo: "UBIQUITI", color: "from-sky-400 to-blue-600" }
  ];
  const marqueeCameras = [...cameraBrands, ...cameraBrands, ...cameraBrands];

  // Component for each hotel in the ticker to handle its own spotlight logic
  const TickerItem = ({ client, label = "Partner" }: { client: any, label?: string, key?: any }) => {
    const itemRef = useRef(null);
    const isInCenter = useInView(itemRef, {
      margin: "0px -45% 0px -45%", // Detects when item is in the middle 10% of viewport
    });

    return (
      <motion.div
        ref={itemRef}
        animate={{
          scale: isInCenter ? 1.1 : 0.8,
          opacity: isInCenter ? 1 : 0.35,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-16 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer"
        style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      >
        <span className={`text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b ${client.color} uppercase tracking-tighter whitespace-nowrap drop-shadow-xl`}>
          {client.logo}
        </span>
        <motion.span
          animate={{ opacity: isInCenter ? 1 : 0 }}
          className="text-[10px] font-bold text-blue-500 tracking-[0.5em] uppercase mt-2"
        >
          {label}
        </motion.span>
      </motion.div>
    );
  };

  return (
    <div className="w-full bg-slate-950 min-h-screen pt-28 pb-16 relative overflow-hidden">
      <title>Nosotros | SERTEC - Ingeniería en Punta Cana y Santo Domingo</title>
      <meta name="description" content="Conoce la trayectoria de SERTEC, líderes en infraestructura tecnológica, redes GPON y centros de monitoreo avanzado en Punta Cana y todo el Caribe." />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Nuestra Esencia</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tighter">
            Construyendo el <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-400 to-blue-700">Futuro Conectado</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Más de una década definiendo los estándares de infraestructura tecnológica en la industria hotelera del Caribe.
          </p>
        </motion.div>
      </section>

      {/* News-Ticker Section - Hotels (Corriendo hacia la derecha con efecto de luz central) */}
      <section className="py-8 sm:py-10 md:py-12 bg-slate-900/40 backdrop-blur-md border-y-[0.2px] border-white/5 relative overflow-hidden mb-12 sm:mb-16 md:mb-24">
        {/* Central Spotlight Indicator (Invisible line to align with user's eye) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-primary/0 z-30 pointer-events-none"></div>

        {/* Foggy edges for depth */}
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

        <div className="flex w-max animate-marquee-right py-4" style={{ animationDuration: '80s' }}>
          {marqueeClients.map((client, index) => (
            <TickerItem key={index} client={client} label="HOTELS" />
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group cursor-pointer lg:col-span-7 scale-105"
            onClick={() => setIsHistoryModalOpen(true)}
          >
            <video
              src="https://res.cloudinary.com/dgjnnstkd/video/upload/v1785089766/video_sertectv_remotion_60s_qr2ksa.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="relative rounded-2xl shadow-2xl border border-white/10 transition-all duration-700 w-full group-hover:scale-[1.01] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
              <span className="bg-slate-900/80 backdrop-blur-md text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-white/10 shadow-2xl transform translate-y-4 group-hover:translate-y-0">
                Ver en Detalle
              </span>
            </div>
          </motion.div>

          <div className="space-y-8 lg:col-span-5">
            <div className="border-l-2 border-primary/30 pl-8 relative group">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(37,99,235,0.5)] group-hover:scale-125 transition-transform"></span>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">2008 - LA FUNDACIÓN</h3>
              <p className="text-slate-400 leading-relaxed text-sm font-light">
                SERTEC nace de la visión de un grupo de ingenieros decididos a transformar la infraestructura tecnológica del Caribe. Iniciamos con un compromiso irrenunciable: la excelencia técnica.
              </p>
            </div>
            <div className="border-l-2 border-slate-700 pl-8 relative group hover:border-primary/50 transition-colors">
              <span className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-600 group-hover:bg-primary transition-colors"></span>
              <h3 className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors mb-2 tracking-tight">2015 - LIDERAZGO HOTELERO</h3>
              <p className="text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed text-sm font-light">
                Nos convertimos en el socio de confianza de las cadenas hoteleras más prestigiosas, desplegando redes GPON y sistemas de seguridad de alta complejidad.
              </p>
            </div>
            <div className="border-l-2 border-slate-700 pl-8 relative group hover:border-primary/50 transition-colors">
              <span className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-slate-600 group-hover:bg-primary transition-colors"></span>
              <h3 className="text-xl font-bold text-slate-300 group-hover:text-white transition-colors mb-2 tracking-tight">2024 - EL FUTURO HOY</h3>
              <p className="text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed text-sm font-light">
                Hoy lideramos la integración de IA y Fibra Óptica de última generación, asegurando que nuestros clientes estén siempre un paso adelante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision Cards */}
      <section className="py-16 relative overflow-hidden mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: <Target size={32} className="text-white" />,
                title: "Misión",
                desc: "Proveer soluciones tecnológicas integrales que garanticen la continuidad operativa de nuestros clientes.",
                color: "from-blue-600 to-cyan-500",
                shadow: "shadow-blue-500/20"
              },
              {
                icon: <Zap size={32} className="text-white" />,
                title: "Visión",
                desc: "Ser el referente indiscutible en infraestructura tecnológica en el Caribe reuniendo innovación y calidad.",
                color: "from-amber-500 to-orange-400",
                shadow: "shadow-amber-500/20"
              },
              {
                icon: <Shield size={32} className="text-white" />,
                title: "Valores",
                desc: "Integridad, excelencia técnica y compromiso con el cliente en cada proyecto ejecutado.",
                color: "from-emerald-500 to-teal-400",
                shadow: "shadow-emerald-500/20"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                layoutId={`card-${idx}`}
                onClick={() => setSelectedValue(idx)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 hover:border-white/20 transition-all duration-300 cursor-pointer group shadow-2xl ${item.shadow}`}
              >
                <div className={`mb-6 bg-gradient-to-br ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm font-light">
                  {item.desc}
                </p>
                <div className="mt-6 flex items-center text-[10px] font-black text-white/40 group-hover:text-white transition-colors uppercase tracking-widest">
                  Explorar más <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Camera Brands Ticker - Same style as Hotels */}
      <section className="py-12 bg-slate-900/20 backdrop-blur-md border-y border-white/5 relative overflow-hidden mb-12">
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-950 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none"></div>

        <div className="flex w-max animate-marquee-right py-4" style={{ animationDuration: '37s' }}>
          {marqueeCameras.map((brand, index) => (
            <TickerItem key={index} client={brand} label="BRANDS" />
          ))}
        </div>
      </section>

      {/* Stats Counter Section - Premium & Dynamic */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: Award, value: "+15", label: "Años Experiencia", color: "from-blue-600 to-indigo-500" },
              { icon: Briefcase, value: "+500", label: "Proyectos", color: "from-purple-600 to-pink-500" },
              { icon: Hotel, value: "+12", label: "Cadenas Aliadas", color: "from-cyan-600 to-blue-500" },
              { icon: Activity, value: "99.9%", label: "Uptime Garantizado", color: "from-emerald-600 to-teal-500" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedStat(idx)}
                className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-8 rounded-[2.5rem] text-center group hover:bg-slate-800/60 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-white/30" />
                </div>
                <div className="mb-6 flex justify-center transform group-hover:-translate-y-2 transition-transform duration-500">
                  <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg`}>
                    <stat.icon size={32} className="text-white" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Detail Modal Overlay */}
      <AnimatePresence>
        {selectedStat !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
            onClick={() => setSelectedStat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-white/10 p-8 md:p-12 rounded-[2.5rem] w-full max-w-2xl shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none select-none transform translate-x-12 -translate-y-12">
                {statDetails[selectedStat].icon}
              </div>

              <div className="flex items-center gap-4 mb-8 text-primary uppercase font-black tracking-widest text-xs">
                <CheckCircle2 size={18} />
                <span>Compromiso SERTEC</span>
              </div>

              <h3 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                {statDetails[selectedStat].title}
              </h3>

              <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light mb-10">
                {statDetails[selectedStat].description}
              </p>

              <button
                onClick={() => setSelectedStat(null)}
                className="w-full py-5 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.4em] shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95"
              >
                Cerrar Detalle
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Monitoring Center Section - Refined & More Compact */}
      <AnimatePresence>
        {selectedValue !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedValue(null)}
          >
            <motion.div
              layoutId={`card-${selectedValue}`}
              className="bg-slate-900 p-8 rounded-3xl max-w-2xl w-full border border-primary/30 shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                {modalDetails[selectedValue].icon}
              </div>

              <button
                onClick={() => setSelectedValue(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
                {modalDetails[selectedValue].title}
              </h3>

              <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base font-light">
                {modalDetails[selectedValue].description}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  className="px-8 py-2 bg-gradient-to-r from-primary to-blue-600 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(37, 99, 235, 0.4)] transition-all"
                  onClick={() => setSelectedValue(null)}
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHistoryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
            onClick={() => setIsHistoryModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative flex items-center justify-center max-w-[95vw] max-h-[90vh] overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="absolute top-4 right-4 z-[110] text-white/50 hover:text-white bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur-md transition-all border border-white/10 group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
              <video
                src="https://res.cloudinary.com/dgjnnstkd/video/upload/v1785089766/video_sertectv_remotion_60s_qr2ksa.mp4"
                autoPlay
                loop
                muted
                controls
                playsInline
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl shadow-primary/20 border border-white/5"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Monitoring Center Section - Refined & More Compact */}
      <section className="py-16 bg-slate-950 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <span className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-2 block">Capacidad Operativa</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 uppercase tracking-tighter">Centros de <span className="text-primary">Monitoreo</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">Diseñamos e implementamos centros con tecnología de visualización avanzada para un control absoluto.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(37,99,235,0.1)] group max-w-4xl mx-auto"
          >
            <img
              src="https://lh3.googleusercontent.com/d/1G-EKLnLMH24vFeCGAozWe8QFbMtJZIcX"
              alt="Centro de Monitoreo SERTEC"
              className="w-full h-auto object-contain rounded-xl transform transition-transform duration-1000 group-hover:scale-[1.01]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70"></div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-end gap-4 text-white">
              <div className="glass-panel p-5 rounded-xl border-white/10 max-w-xs backdrop-blur-md">
                <p className="text-[11px] font-light leading-snug text-slate-300">Fabricamos e integramos centros de monitoreo con IA para un control total sobre infraestructuras críticas.</p>
              </div>
              <div className="flex gap-3">
                <div className="text-center p-3 glass-panel rounded-lg border-white/10 min-w-[100px] backdrop-blur-md">
                  <div className="text-xl font-black text-primary">24/7</div>
                  <div className="text-[8px] uppercase font-bold tracking-widest text-slate-400">Vigilancia</div>
                </div>
                <div className="text-center p-3 glass-panel rounded-lg border-white/10 min-w-[100px] backdrop-blur-md">
                  <div className="text-xl font-black text-primary">99.9%</div>
                  <div className="text-[8px] uppercase font-bold tracking-widest text-slate-400">Uptime</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;