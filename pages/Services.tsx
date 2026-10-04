import React, { useState, useRef, useEffect } from 'react';
import { Network, Cctv, Cable, Tv, Zap, PenTool, CheckCircle, X, ArrowRight, LogIn, Plus, Trash2, Save, Loader2, ImageIcon, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface ServiceItem {
  id?: number;
  title: string;
  description: string;
  details: string;
  icon_name: string;
  color_theme: string;
  image_url?: string;
}

// Map icon names to components
const iconMap: Record<string, any> = {
  Network, Cctv, Cable, Tv, Zap, PenTool
};

const themeStyles: Record<string, any> = {
  blue: { border: "hover:border-blue-500", borderBottom: "border-b-blue-500", text: "group-hover:text-blue-600", iconBg: "group-hover:from-blue-600 group-hover:to-blue-500", iconText: "text-blue-600", shadow: "hover:shadow-blue-500/50" },
  rose: { border: "hover:border-rose-500", borderBottom: "border-b-rose-500", text: "group-hover:text-rose-600", iconBg: "group-hover:from-rose-600 group-hover:to-rose-500", iconText: "text-rose-600", shadow: "hover:shadow-rose-500/50" },
  orange: { border: "hover:border-orange-500", borderBottom: "border-b-orange-500", text: "group-hover:text-orange-600", iconBg: "group-hover:from-orange-600 group-hover:to-orange-500", iconText: "text-orange-600", shadow: "hover:shadow-orange-500/50" },
  violet: { border: "hover:border-violet-500", borderBottom: "border-b-violet-500", text: "group-hover:text-violet-600", iconBg: "group-hover:from-violet-600 group-hover:to-violet-500", iconText: "text-violet-600", shadow: "hover:shadow-violet-500/50" },
  amber: { border: "hover:border-amber-500", borderBottom: "border-b-amber-500", text: "group-hover:text-amber-600", iconBg: "group-hover:from-amber-500 group-hover:to-amber-400", iconText: "text-amber-600", shadow: "hover:shadow-amber-500/50" },
  emerald: { border: "hover:border-emerald-500", borderBottom: "border-b-emerald-500", text: "group-hover:text-emerald-600", iconBg: "group-hover:from-emerald-600 group-hover:to-emerald-500", iconText: "text-emerald-600", shadow: "hover:shadow-emerald-500/50" }
};

const convertMediaUrl = (url: string) => {
  if (!url) return '';
  const driveMatch = url.match(/[-\w]{25,}/);
  if (url.includes('drive.google.com') && driveMatch) return `https://drive.google.com/uc?export=view&id=${driveMatch[0]}`;
  if (url.includes('/s/')) {
    const cleanUrl = url.split('?')[0].replace(/\/$/, "");
    return cleanUrl.endsWith('/preview') ? cleanUrl : `${cleanUrl}/preview`;
  }
  return url;
};

const Services: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newService, setNewService] = useState<ServiceItem>({
    title: '', description: '', details: '', icon_name: 'Network', color_theme: 'blue', image_url: ''
  });

  const sectionRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
    document.title = "Cámaras de Seguridad y Red GPON para Hoteles en Punta Cana y RD | SERTEC";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Instalación de fibra óptica GPON, sistemas de videovigilancia AI, canalización industrial y redes IPTV para complejos hoteleros en Santo Domingo y Punta Cana, República Dominicana.");
    }

    // Inyección de Schema FAQPage para rich snippets en Google
    const scriptId = 'faq-schema-services';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Por qué la infraestructura de Fibra GPON es vital para hoteles en Punta Cana y Santo Domingo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La arquitectura óptica pasiva (GPON) permite transmitir gigabits de ancho de banda a cientos de habitaciones mediante un único hilo de fibra óptica. Esto elimina la necesidad de cuartos de telecomunicaciones intermedios por nivel, reduce drásticamente el consumo eléctrico y garantiza Wi-Fi 6 de ultra-alta velocidad, televisión IPTV en 4K y telefonía IP sin latencia en entornos de alta densidad hotelera."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué características tienen los sistemas de cámaras de seguridad para hoteles en República Dominicana instalados por SERTEC?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Desplegamos cámaras de videovigilancia IP avanzadas con visión nocturna infrarroja de largo alcance, lentes de alta resolución 4K y analítica de Inteligencia Artificial (detección de intrusión en perímetros de playa/piscina, reconocimiento facial en lobbies y lectura automática de placas de vehículos). Todos los sistemas cumplen con certificaciones internacionales e integran redundancia de almacenamiento local y en la nube."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cómo implementa SERTEC los sistemas de IPTV y entretenimiento para complejos turísticos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Diseñamos cabeceras de TV digital e IPTV centralizadas que entregan contenido multilingüe HD/4K directo a los Smart TVs de las habitaciones. Incluye canales de recepción satelital, plataforma interactiva de bienvenida personalizada para el huésped, menú de servicios del hotel (room service, reservas) y transmisión cifrada sobre la red de fibra GPON del resort."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué estándares de canalización e infraestructura eléctrica industrial aplican en sus proyectos?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nuestras instalaciones de canalización y cableado estructurado utilizan tubería EMT/IMC galvanizada, bandejas portacables de grado marino resistentes a la salinidad del Caribe y protección NEMA 4X. Garantizamos cumplimiento riguroso de normativas ANSI/TIA-568-D y código eléctrico nacional para prevenir fallos por fluctuaciones o condiciones climáticas extremas."
          }
        }
      ]
    });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
      if (error) throw error;
      setServices(data || []);
    } catch (err) {
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    if (password === '030925cra') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setPassword('');
    } else {
      alert('Contraseña Incorrecta');
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.from('services').insert([
        { ...newService, image_url: convertMediaUrl(newService.image_url || '') }
      ]).select();
      if (error) throw error;
      if (data) setServices([...services, data[0]]);
      setShowAddForm(false);
      setNewService({ title: '', description: '', details: '', icon_name: 'Network', color_theme: 'blue', image_url: '' });
    } catch (err) {
      alert('Error al crear servicio');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!window.confirm('¿Eliminar este servicio?')) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  return (
    <div className="w-full bg-slate-950 min-h-screen">
      <title>Servicios de Ingeniería | SERTEC</title>

      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center mb-6">
            {!isAdmin ? (
              <button onClick={() => setShowAdminLogin(true)} className="text-[10px] text-slate-700 hover:text-blue-500 transition-colors uppercase tracking-[0.3em] font-bold flex items-center">
                <LogIn size={12} className="mr-2" /> Admin Access
              </button>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => setShowAddForm(true)} className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center shadow-lg">
                  <Plus size={14} className="mr-2" /> Agregar Servicio
                </button>
                <button onClick={() => setIsAdmin(false)} className="text-[10px] text-slate-500 hover:text-red-500 uppercase tracking-widest font-bold">Cerrar Sesión</button>
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            Servicios de <span className="text-blue-500">Ingeniería</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Infraestructura crítica y conectividad de alto nivel para el sector hotelero.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={48} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = iconMap[service.icon_name] || Network;
              const theme = themeStyles[service.color_theme] || themeStyles.blue;
              return (
                <motion.div
                  key={service.id}
                  layoutId={`service-${service.id}`}
                  onClick={() => setSelectedService(service)}
                  className={`relative p-8 rounded-3xl bg-slate-900/40 border border-slate-800 ${theme.border} ${theme.borderBottom} border-b-4 transition-all cursor-pointer group hover:scale-[1.02]`}
                >
                  {isAdmin && (
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteService(service.id!); }} className="absolute top-4 right-4 p-2 bg-red-600/20 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-800 border border-slate-700 transition-all ${theme.iconBg} ${theme.iconText} group-hover:text-white`}>
                      <Icon size={32} />
                    </div>

                    {/* Flashing Pulsing Quote Button next to the Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/contacto', { state: { selectedServiceTitle: service.title } });
                      }}
                      className="group/btn relative inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.7)] transition-all hover:scale-105 active:scale-95 animate-pulse hover:animate-none border border-cyan-300/50 z-10"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-100"></span>
                      </span>
                      <span>Solicitar Cotización</span>
                      <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <h3 className={`text-2xl font-bold text-white mb-4 transition-colors ${theme.text}`}>{service.title}</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">{service.description}</p>
                  <div className={`flex items-center text-sm font-bold uppercase tracking-widest ${theme.text}`}>
                    <span>Más Detalle</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* FAQ & Casos de Uso Hotelero (SEO Optimized & Schema-Ready) */}
        <section className="mt-20 border-t border-slate-800/80 pt-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-blue-500 font-black tracking-[0.3em] text-xs uppercase block mb-2">
                Ingeniería Hotelera de Alto Rendimiento
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Preguntas Frecuentes y Especificaciones Técnicas
              </h2>
              <p className="text-slate-400 text-sm mt-3">
                Soluciones integrales de conectividad y seguridad electrónica diseñadas para complejos turísticos e infraestructura crítica en República Dominicana.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  ¿Por qué la infraestructura de Fibra GPON es vital para hoteles en Punta Cana y Santo Domingo?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  La arquitectura óptica pasiva (GPON) permite transmitir gigabits de ancho de banda a cientos de habitaciones mediante un único hilo de fibra óptica. Esto elimina la necesidad de cuartos de telecomunicaciones intermedios por nivel, reduce drásticamente el consumo eléctrico y garantiza Wi-Fi 6 de ultra-alta velocidad, televisión IPTV en 4K y telefonía IP sin latencia en entornos de alta densidad hotelera.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  ¿Qué características tienen los sistemas de cámaras de seguridad para hoteles en República Dominicana instalados por SERTEC?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Desplegamos cámaras de videovigilancia IP avanzadas con visión nocturna infrarroja de largo alcance, lentes de alta resolución 4K y analítica de Inteligencia Artificial (detección de intrusión en perímetros de playa/piscina, reconocimiento facial en lobbies y lectura automática de placas de vehículos). Todos los sistemas cumplen con certificaciones internacionales e integran redundancia de almacenamiento local y en la nube.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  ¿Cómo implementa SERTEC los sistemas de IPTV y entretenimiento para complejos turísticos?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Diseñamos cabeceras de TV digital e IPTV centralizadas que entregan contenido multilingüe HD/4K directo a los Smart TVs de las habitaciones. Incluye canales de recepción satelital, plataforma interactiva de bienvenida personalizada para el huésped, menú de servicios del hotel (room service, reservas) y transmisión cifrada sobre la red de fibra GPON del resort.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  ¿Qué estándares de canalización e infraestructura eléctrica industrial aplican en sus proyectos?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Nuestras instalaciones de canalización y cableado estructurado utilizan tubería EMT/IMC galvanizada, bandejas portacables de grado marino resistentes a la salinidad del Caribe y protección NEMA 4X. Garantizamos cumplimiento riguroso de normativas ANSI/TIA-568-D y código eléctrico nacional para prevenir fallos por fluctuaciones o condiciones climáticas extremas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* Modal - Tarjeta Grande Detallada */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl bg-slate-950/85 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700/80 rounded-[2.5rem] w-full max-w-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] my-8"
            >
              {/* Encabezado con Degradado Temático */}
              <div className={`p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-slate-900 ${
                selectedService.color_theme === 'blue' ? 'to-blue-900/60' :
                selectedService.color_theme === 'rose' ? 'to-rose-900/60' :
                selectedService.color_theme === 'orange' ? 'to-orange-900/60' :
                selectedService.color_theme === 'violet' ? 'to-violet-900/60' :
                selectedService.color_theme === 'amber' ? 'to-amber-900/60' : 'to-emerald-900/60'
              } border-b border-white/10 flex justify-between items-start relative`}>
                <div className="space-y-3 pr-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                    Especificaciones Técnicas y Alcance
                  </span>
                  <div className="flex gap-4 items-center pt-1">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-xl flex-shrink-0">
                      {React.createElement(iconMap[selectedService.icon_name] || Network, { size: 32 })}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 flex-shrink-0"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Contenido Detallado */}
              <div className="p-8 sm:p-10 space-y-8 max-h-[70vh] overflow-y-auto">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Descripción e Ingeniería del Servicio</h4>
                  <p className="text-slate-200 text-base leading-relaxed font-light">
                    {selectedService.details || selectedService.description}
                  </p>
                </div>

                {/* Características y Garantías SERTEC */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">Estándares y Garantías de Infraestructura SERTEC</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-cyan-400 flex-shrink-0" />
                      <span>Cumplimiento Normativo ANSI/TIA-568-D</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-cyan-400 flex-shrink-0" />
                      <span>Soporte Técnico Crítico 24/7/365</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-cyan-400 flex-shrink-0" />
                      <span>Insumos y Equipos Grado Industrial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-cyan-400 flex-shrink-0" />
                      <span>Garantía Extendida de Instalación y Certificación</span>
                    </div>
                  </div>
                </div>

                {selectedService.image_url && (
                  <div className="rounded-2xl overflow-hidden border border-white/10 h-72 bg-black shadow-2xl">
                    <img src={selectedService.image_url} alt={selectedService.title} className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Botones de Acción al Final del Modal */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-4 justify-end items-center">
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 text-slate-300 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all border border-slate-700"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => {
                      const serviceTitle = selectedService.title;
                      setSelectedService(null);
                      navigate('/contacto', { state: { selectedServiceTitle: serviceTitle } });
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all hover:scale-105 active:scale-95 animate-pulse hover:animate-none flex items-center justify-center gap-2"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-100"></span>
                    </span>
                    <span>Solicitar Cotización</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showAdminLogin && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-2xl bg-slate-950/60">
            <motion.div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
              <h3 className="text-center font-black uppercase tracking-widest mb-6">Admin Services</h3>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-center mb-4 transition-all focus:border-blue-500 outline-none" onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
              <div className="flex gap-4">
                <button onClick={() => setShowAdminLogin(false)} className="flex-grow py-4 text-slate-500 font-bold uppercase text-[10px]">Cancelar</button>
                <button onClick={handleLogin} className="flex-grow py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px]">Acceder</button>
              </div>
            </motion.div>
          </div>
        )}

        {showAddForm && isAdmin && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-2xl bg-slate-950/90 overflow-y-auto">
            <motion.form onSubmit={handleCreateService} className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[2rem] p-8 space-y-6 my-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black uppercase tracking-widest">Nuevo Servicio</h3>
                <button type="button" onClick={() => setShowAddForm(false)}><X /></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input required placeholder="Título del Servicio" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500" value={newService.title} onChange={e => setNewService({ ...newService, title: e.target.value })} />
                <select className="bg-slate-800 border border-white/10 p-4 rounded-xl outline-none" value={newService.color_theme} onChange={e => setNewService({ ...newService, color_theme: e.target.value })}>
                  {Object.keys(themeStyles).map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
                </select>
              </div>
              <textarea required placeholder="Breve descripción" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500" rows={2} value={newService.description} onChange={e => setNewService({ ...newService, description: e.target.value })} />
              <textarea required placeholder="Detalles técnicos completos" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500" rows={4} value={newService.details} onChange={e => setNewService({ ...newService, details: e.target.value })} />
              <div className="grid grid-cols-2 gap-4">
                <select className="bg-slate-800 border border-white/10 p-4 rounded-xl" value={newService.icon_name} onChange={e => setNewService({ ...newService, icon_name: e.target.value })}>
                  {Object.keys(iconMap).map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                <input placeholder="URL de Imagen (Nextcloud/Drive)" className="bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-blue-500" value={newService.image_url} onChange={e => setNewService({ ...newService, image_url: e.target.value })} />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 transition-all shadow-xl">
                {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : 'Publicar Servicio'}
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Services;