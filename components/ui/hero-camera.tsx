import React from 'react';
import { CountUp } from './count-up';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight, CalendarCheck, Network, Cable, Headset } from 'lucide-react';

const WHATSAPP = 'https://wa.me/18298778369?text=Hola%20SERTEC%2C%20deseo%20solicitar%20una%20cotizaci%C3%B3n%20para%20mi%20proyecto.';
const metrics = [
  { value: '+15', label: 'Años de experiencia', Icon: CalendarCheck },
  { value: '+25.000', label: 'Habitaciones y nodos GPON', Icon: Network },
  { value: '+350 km', label: 'Fibra óptica desplegada', Icon: Cable },
  { value: '24/7', label: 'Soporte crítico', Icon: Headset },
];

export const HeroCamera: React.FC = () => (
  <div className="sertec-hero">
    <div className="sertec-hero__grid">
      <div className="sertec-hero__copy">
        <p className="sertec-hero__eyebrow"><span aria-hidden="true" /> Ingeniería para la operación hotelera e industrial</p>
        <h1 className="sertec-hero__title">
          Conectividad de Alto Rendimiento y <span>Seguridad Inteligente</span>
          <small>para Hoteles, Resorts e Industria en República Dominicana y el Caribe</small>
        </h1>
        <p className="sertec-hero__description">Diseñamos, instalamos y certificamos la infraestructura tecnológica que mantiene operando su resort: fibra óptica GPON, videovigilancia CCTV con IA perimetral, cableado estructurado e IPTV. Más de 15 años siendo el aliado de confianza para cadenas como Meliá, Iberostar y Dreams.</p>
        <div className="sertec-hero__actions">
          <Link to="/contacto" className="sertec-button sertec-button--primary"><Phone size={18} aria-hidden="true" /> Solicitar Cotización</Link>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="sertec-button sertec-button--whatsapp"><MessageCircle size={19} aria-hidden="true" /> WhatsApp Directo</a>
        </div>
        <Link to="/proyectos" className="sertec-hero__projects">Conozca nuestros proyectos <ArrowRight size={16} aria-hidden="true" /></Link>
      </div>
      <figure className="sertec-hero__visual">
        <div className="sertec-hero__camera">
          <img src="/brand/hero-camera-v2.webp" srcSet="/brand/hero-camera-v2-720.webp 720w, /brand/hero-camera-v2.webp 1120w" sizes="(min-width: 1024px) 62vw, 100vw" width={1120} height={768} alt="Cámara multisensor con domo PTZ para soluciones de videovigilancia para hoteles e industria SERTEC" fetchPriority="high" decoding="async" draggable={false} />
        </div>
        <figcaption><span aria-hidden="true" /> Videovigilancia inteligente · Control perimetral</figcaption>
      </figure>
    </div>
    <div className="sertec-hero__metrics" role="list" aria-label="SERTEC en cifras">
      {metrics.map(({ value, label, Icon }) => (
        <div key={label} role="listitem">
          <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
          <strong><CountUp value={value} /></strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  </div>
);
export default HeroCamera;
