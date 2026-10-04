import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import About from './pages/About';
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/acerca-de" element={<About />} />
          </Routes>
        </div>
        <SeoManager />
        <Footer />



      </div>
    </Router>

  );
};

export default App;