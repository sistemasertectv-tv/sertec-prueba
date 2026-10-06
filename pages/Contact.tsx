import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, MapPin, CheckCircle2, Shield, LogIn, Trash2, Mail, User, Clock, X, MessageSquare, Archive, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import Globe from '../components/ui/globe';

const Contact: React.FC = () => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const [formState, setFormState] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    document.title = "Cotización de Redes GPON y Cámaras para Hoteles | SERTEC Santo Domingo";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Solicite una propuesta técnica gratuita para su proyecto de fibra GPON, cámaras de seguridad o redes corporativas en Santo Domingo y todo RD. Tel: +1 (829) 877-8369.");
    }
  }, []);

  useEffect(() => {
    if (location.state?.selectedServiceTitle) {
      setFormState(prev => ({
        ...prev,
        message: `Hola, deseo solicitar una cotización técnica para el servicio de: ${location.state.selectedServiceTitle}.`
      }));
    }
  }, [location.state]);

  // Cargar mensajes si el usuario es Admin
  useEffect(() => {
    if (isAdmin) {
      loadSubmissions();
    }
  }, [isAdmin]);

  const loadSubmissions = async () => {
    setIsLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    } finally {
      setIsLoadingMessages(false);
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

  const handleDeleteMessage = async (id: number) => {
    if (window.confirm("¿Eliminar este mensaje permanentemente?")) {
      try {
        const { error } = await supabase
          .from('contact_submissions')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setSubmissions(current => current.filter(m => m.id !== id));
      } catch (error) {
        alert('Error al eliminar mensaje');
      }
    }
  };

  const handleArchiveMessage = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'archived' ? 'pending' : 'archived';
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setSubmissions(current => current.map(m => m.id === id ? { ...m, status: newStatus } : m));
    } catch (error) {
      alert('Error al actualizar mensaje');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      // Guardar en Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formState.name,
            surname: formState.surname,
            email: formState.email,
            phone: formState.phone,
            message: formState.message,
          }
        ]);

      if (error) throw error;

      // Enviar notificación instantánea al correo sertectv@gmail.com
      try {
        const notification = await fetch("https://formsubmit.co/ajax/sertectv@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            _subject: `🔴 Nueva Cotización SERTEC: ${formState.name} ${formState.surname}`,
            Nombre_Cliente: `${formState.name} ${formState.surname}`,
            Correo_Cliente: formState.email,
            Telefono: formState.phone,
            Solicitud_Detallada: formState.message,
            _template: "table"
          })
        });
        if (!notification.ok) throw new Error(`Notificación de correo: HTTP ${notification.status}`);
      } catch (emailErr) {
        console.warn("No se pudo enviar el correo de notificación:", emailErr);
      }

      // Mostrar éxito
      setSubmitSuccess(true);
      setFormState({ name: '', surname: '', email: '', phone: '', message: '' });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Hubo un error al enviar tu mensaje: ' + ((error as any)?.message || 'Por favor intenta nuevamente.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 pt-28 pb-16 relative overflow-hidden flex flex-col">

      {/* Cyber Grid/Mesh Effect Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent_50%)]"></div>
        {/* Top closing gradient */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            {!isAdmin ? (
              <button onClick={() => setShowAdminLogin(true)} className="text-[10px] text-slate-600 hover:text-blue-500 transition-colors uppercase tracking-[0.3em] font-bold flex items-center">
                <LogIn size={12} className="mr-2" /> Admin Inbox
              </button>
            ) : (
              <div className="flex gap-4">
                <span className="bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center">
                  <Shield size={12} className="mr-2" /> Inbox de Mensajes
                </span>
                <button onClick={() => setIsAdmin(false)} className="text-[10px] text-slate-500 hover:text-red-500 uppercase tracking-widest font-bold">Cerrar Sesión</button>
              </div>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter mb-4">
            CENTRO DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">CONTACTO</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {isAdmin ? `Gestionando ${submissions.length} mensajes recibidos.` : 'Cuéntenos su proyecto. Le respondemos en menos de 24 horas con una propuesta técnica personalizada.'}
          </p>
        </div>

        {isAdmin ? (
          <div className="grid grid-cols-1 gap-6 mb-16">
            <AnimatePresence>
              {submissions.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`bg-slate-900/60 backdrop-blur-xl border ${msg.status === 'archived' ? 'border-white/5 opacity-60' : 'border-blue-500/20 shadow-[0_0_20px_rgba(37,99,235,0.05)]'} rounded-3xl p-8 transition-all hover:border-blue-500/40`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="space-y-4 flex-grow">
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-400/10 px-3 py-1 rounded-lg">
                          <User size={14} className="mr-2" /> {msg.name} {msg.surname}
                        </div>
                        <div className="flex items-center text-slate-400 text-xs font-medium bg-white/5 px-3 py-1 rounded-lg">
                          <Mail size={14} className="mr-2" /> {msg.email}
                        </div>
                        {msg.phone && (
                          <div className="flex items-center text-blue-400 text-xs font-medium bg-blue-400/10 px-3 py-1 rounded-lg">
                            <Phone size={14} className="mr-2" /> {msg.phone}
                          </div>
                        )}
                        <div className="flex items-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                          <Clock size={12} className="mr-2" /> {new Date(msg.created_at).toLocaleString('es-ES')}
                        </div>
                      </div>
                      <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5">
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-3 justify-end items-center">
                      <button
                        onClick={() => handleArchiveMessage(msg.id, msg.status)}
                        className={`p-4 rounded-2xl transition-all ${msg.status === 'archived' ? 'bg-amber-600/20 text-amber-500' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                        title={msg.status === 'archived' ? 'Restaurar' : 'Archivar'}
                      >
                        <Archive size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-4 bg-red-600/10 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-lg"
                        title="Eliminar permanentemente"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {submissions.length === 0 && (
              <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-white/5">
                <MessageSquare size={48} className="mx-auto text-slate-700 mb-4" />
                <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No hay mensajes en el inbox</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 flex-grow h-full min-h-[500px] lg:min-h-[600px]">
            {/* Section 1: Futuristics Form Panel */}
            <div className="lg:w-5/12 order-2 lg:order-1">
              <div className="h-full bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                {/* Decorative glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary tracking-widest uppercase ml-1">Nombre</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                        placeholder="Juan"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary tracking-widest uppercase ml-1">Apellido</label>
                      <input
                        type="text"
                        name="surname"
                        required
                        value={formState.surname}
                        onChange={handleChange}
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                        placeholder="Pérez"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary tracking-widest uppercase ml-1">Correo Electrónico</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                        placeholder="contacto@empresa.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary tracking-widest uppercase ml-1">Teléfono</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600"
                        placeholder="+1 (829) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary tracking-widest uppercase ml-1">Mensaje</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-600 resize-none"
                      placeholder="Describa su requerimiento..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center space-x-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'ENVIANDO...' : 'ENVIAR SOLICITUD'}</span>
                    <Send size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {/* Mensaje de éxito */}
                  {submitSuccess && (
                    <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-2">
                      <CheckCircle2 className="text-green-500 flex-shrink-0" size={24} />
                      <div className="text-sm text-green-400">
                        <p className="font-bold">¡Mensaje enviado con éxito!</p>
                        <p className="text-green-300/80">Nos pondremos en contacto pronto.</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Section 2: Map / Info Display */}
            <div className="lg:w-7/12 order-1 lg:order-2 h-[280px] sm:h-[350px] md:h-[400px] lg:h-auto min-h-[250px] sm:min-h-[300px] relative">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">

                <Globe />

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.576166540608!2d-69.919561!3d18.457589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDI3JzI3LjMiTiA2OcKwNTUnMTAuNCJX!5e0!3m2!1sen!2sdo!4v1600000000000!5m2!1sen!2sdo"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Mapa Ubicación SERTEC"
                  className="absolute inset-0 z-0 opacity-0 pointer-events-none transition-opacity duration-700"
                ></iframe>

                {/* Info Card Overlay on Map - Refined & Functional */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Calle+Luna+201,+Sol+de+Luz,+Santo+Domingo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 group/map-btn"
                >
                  <div className="flex items-center space-x-3 bg-slate-950/90 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2 shadow-lg transform transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer">
                    <div className="p-1.5 bg-primary/20 rounded-full text-primary group-hover/map-btn:bg-primary group-hover/map-btn:text-slate-900 transition-colors">
                      <MapPin size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xs tracking-wide">ABRIR UBICACIÓN</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showAdminLogin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-2xl bg-slate-950/60 text-white">
            <motion.div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
              <div className="text-center mb-8">
                <div className="bg-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500"><Shield size={32} /></div>
                <h3 className="font-black uppercase tracking-widest">Admin Access</h3>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-center font-mono mb-4 outline-none focus:border-blue-500 font-black" onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
              <div className="flex gap-4">
                <button onClick={() => setShowAdminLogin(false)} className="flex-grow py-4 text-slate-500 text-[10px] font-bold uppercase transition-colors hover:text-white">Cancelar</button>
                <button onClick={handleLogin} className="flex-grow py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase">Acceder</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;