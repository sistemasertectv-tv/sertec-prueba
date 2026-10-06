import React, { useState, useEffect } from 'react';
import { SertecLogo } from '../ui/SertecLogo';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../../types';


const navItems: NavItem[] = [
  { label: 'INICIO', path: '/' },
  { label: 'SERVICIOS', path: '/servicios' },
  { label: 'PROYECTOS', path: '/proyectos' },
  { label: 'BLOG', path: '/blog' },
  { label: 'CONTACTO', path: '/contacto' },
  { label: 'ACERCA DE', path: '/acerca-de' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header className={`fixed w-full top-0 z-[100] transition-all duration-500 ${scrolled
      ? 'bg-[#04070d]/85 backdrop-blur-xl border-b border-white/10'
      : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo with Glow */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center group relative"
            onClick={() => window.scrollTo(0, 0)}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative"
            >
              <SertecLogo priority imgClassName="h-8 sm:h-9 md:h-10" />
            </motion.div>
          </Link>

          {/* Desktop Menu - REIMAGINED */}
          <nav className="hidden xl:flex items-center gap-1 lg:gap-2 relative" aria-label="Menú principal">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.scrollTo(0, 0)}
                aria-current={isActive(item.path) ? 'page' : undefined}
                className="relative px-3 lg:px-4 py-2 group"
              >
                <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${isActive(item.path) ? 'text-white' : 'text-slate-300/70 group-hover:text-white'}`}>
                  {item.label}
                </span>
                <span className={`absolute left-3 right-3 lg:left-4 lg:right-4 -bottom-0.5 h-px origin-left bg-blue-400 transition-transform duration-300 ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}

            <div className="flex items-center gap-3 ml-3 lg:ml-5 pl-3 lg:pl-5 border-l border-white/10">
              <a
                href="https://wa.me/18298778369"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-md border border-white/10 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-colors group"
                title="WhatsApp"
                aria-label="Escribir por WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/80 group-hover:fill-emerald-300 transition-colors" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <Link
                to="/contacto"
                onClick={() => window.scrollTo(0, 0)}
                className="rounded-md bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold uppercase tracking-[0.14em] px-4 py-2.5 transition-colors"
              >
                Cotizar
              </Link>
            </div>
          </nav>

          {/* Mobile Actions: ThemeToggle + WhatsApp + Burger */}
          <div className="flex xl:hidden items-center space-x-2">
            <a
              href="https://wa.me/18298778369"
              target="_blank"
              rel="noreferrer"
              aria-label="Escribir a SERTEC por WhatsApp"
              className="p-2.5 bg-green-600/10 border border-green-500/20 rounded-xl"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white relative z-10" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
            <button
              type="button"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              onClick={toggleMenu}
              className="text-slate-300 hover:text-white transition-colors p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20"
            >
              <AnimatePresence mode="wait">
                {isOpen ? <X key="x" size={20} /> : <Menu key="menu" size={20} />}
              </AnimatePresence>
            </button>
          </div>
        </div >
      </div >

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {
          isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              id="mobile-navigation"
              role="navigation"
              aria-label="Menú móvil"
              className="xl:hidden max-h-[calc(100dvh-80px)] overflow-y-auto bg-slate-950 border-t border-blue-500/20 shadow-xl"
            >
              <div className="px-6 py-8 space-y-4">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => {
                        setIsOpen(false);
                        window.scrollTo(0, 0);
                      }}
                      className={`flex items-center justify-between px-6 py-4 rounded-2xl text-[13px] font-medium tracking-[0.05em] transition-all ${isActive(item.path)
                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                        }`}
                    >
                      {item.label}
                      <ArrowRight size={16} className={isActive(item.path) ? 'opacity-100' : 'opacity-0'} />
                    </Link>
                  </motion.div>
                ))}
                <a
                  href="https://wa.me/18298778369"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-[13px] font-medium tracking-[0.05em] bg-green-500/5 text-green-500 border border-green-500/10"
                >
                  WHATSAPP
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          )
        }
      </AnimatePresence >
    </header >
  );
};

export default Navbar;