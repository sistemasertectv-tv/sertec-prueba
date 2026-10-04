import React from 'react';
import { SertecLogo } from '../ui/SertecLogo';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer id="contact-section" className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16 mb-12 sm:mb-16 md:mb-20">

          {/* Brand Column */}
          <div className="space-y-8">
            <SertecLogo imgClassName="h-10 sm:h-12" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Líderes en infraestructura tecnológica y seguridad electrónica. Transformamos la conectividad en el sector hotelero e industrial con soluciones de clase mundial.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook size={18} />, href: "#", color: "hover:bg-blue-600" },
                { icon: <Instagram size={18} />, href: "#", color: "hover:bg-pink-600" },
                { icon: <MessageCircle size={18} />, href: "https://wa.me/18298778369", color: "hover:bg-green-500" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-all duration-300 ${social.color} hover:text-white hover:scale-110 border border-white/10 hover:border-transparent text-slate-400`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Navegación</h3>
            <ul className="space-y-4">
              {[['Inicio', '/'], ['Servicios', '/servicios'], ['Proyectos', '/proyectos'], ['Blog', '/blog'], ['Contacto', '/contacto'], ['Acerca de', '/acerca-de']].map(([item, path]) => (
                <li key={item}>
                  <Link
                    to={path}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center group"
                  >
                    <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Contacto Directo</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Félix Marcano 318, <br />Urb. Máximo Gómez, <br />Santo Domingo
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 flex-shrink-0 mt-1">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <a href="tel:18298778369" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">1 829 877 8369</a>
                  <a href="tel:8498535122" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">849 853 5122</a>
                  <a href="tel:8099891535" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">809 989 1535</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 flex-shrink-0 mt-1">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <a href="mailto:contacto@sertectv.com" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">contacto@sertectv.com</a>
                  <a href="mailto:sertectv@gmail.com" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">sertectv@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          {/* Certification/Badge */}
          <div className="space-y-8">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Certificación Industrial</h3>
            <div className="p-6 bg-blue-600/5 rounded-2xl border border-blue-500/20">
              <p className="text-slate-400 text-xs italic leading-relaxed mb-4">
                "Nuestra infraestructura cumple con los más altos estándares internacionales para el sector hotelero."
              </p>
              <div className="flex items-center gap-3">
                <div className="h-1 w-full bg-blue-600/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-blue-600"></div>
                </div>
                <span className="text-[10px] font-bold text-blue-400 whitespace-nowrap">CALIDAD SERTEC</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 sm:pt-10 md:pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <p className="text-slate-500 text-[10px] sm:text-xs tracking-widest uppercase text-center sm:text-left">
            &copy; {new Date().getFullYear()} SERTEC CONECTIVIDAD. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 md:gap-8">
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white tracking-widest uppercase transition-colors">Política de Privacidad</a>
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white tracking-widest uppercase transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;