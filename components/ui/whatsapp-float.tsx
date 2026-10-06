import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => (
  <a
    href="https://wa.me/18298778369?text=Hola%20SERTEC%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Escribir a SERTEC por WhatsApp"
    className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm px-4 py-3 shadow-lg shadow-black/40 transition-colors"
  >
    <MessageCircle size={20} aria-hidden="true" />
    <span className="hidden sm:inline">WhatsApp</span>
  </a>
);
export default WhatsAppFloat;
