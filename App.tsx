import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import { WhatsAppFloat } from './components/ui/whatsapp-float';
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const GuideDetail = lazy(() => import('./pages/GuideDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
import { Link } from 'react-router-dom';
import { syncSeo } from './lib/seo';







const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Se coloca después de <Routes>: sus efectos corren cuando la página ya ha fijado título y descripción.
const SeoManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    syncSeo(pathname);
    // Las páginas cargadas bajo demanda fijan su título después de montarse: se vuelve a sincronizar si cambia.
    let last = document.title;
    const mo = new MutationObserver(() => {
      if (document.title !== last) { last = document.title; syncSeo(pathname); }
    });
    mo.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => mo.disconnect();
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (

    <Router>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-[#04070d] text-slate-100 transition-colors duration-300">
        <Navbar />
        <div className="flex-grow">
          <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/servicios/:slug" element={<ServiceDetail />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<GuideDetail />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/acerca-de" element={<About />} />
            <Route path="*" element={<main className="max-w-3xl mx-auto px-6 pt-40 pb-24"><h1 className="text-4xl font-bold mb-5">Página no encontrada</h1><p className="text-slate-400 mb-6">La dirección que abrió no existe. Puede volver al inicio o contactarnos para ayudarle.</p><Link className="sertec-button sertec-button--primary" to="/">Volver al inicio</Link></main>} />
          </Routes>
          </Suspense>
        </div>
        <SeoManager />
        <Footer />
        <WhatsAppFloat />



      </div>
    </Router>

  );
};

export default App;