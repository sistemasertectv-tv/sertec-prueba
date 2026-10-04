# Cambios de optimización

- Hero nuevo (`components/ui/hero-camera.tsx`): H1 con palabras clave, CTA de cotización, WhatsApp, cifras reales del sitio y la cámara con rotación 3D suave (respeta "reducir movimiento").
- Logo propio con transparencia (`public/brand/sertec-logo.webp`), sin filtros CSS; usado en Navbar y Footer.
- SEO: canonical/OG/Twitter dinámicos por ruta (`lib/seo.ts`), og-image propia, JSON-LD Organization + WebSite, robots, hreflang, noscript, preload del hero, favicons 32/180.
- Rendimiento: JPG recomprimidos, lazy-load bajo el hero.
- Menús sin cambios (el pie añade "Acerca de").


## Versión 2 (rediseño de la portada)
- Nuevo hero a pantalla completa: la cámara ocupa ~68 % del ancho, rota suavemente en 3D (+-11 grados, 18 s), con indicaciones técnicas y barra de cifras.
- Imagen recortada (sin marca de agua), tono armonizado con el fondo y bordes fundidos: public/brand/hero-camera-v2*.webp.
- Home rediseñada: servicios, centro de monitoreo, trayectoria y cierre con llamada a la acción y datos de contacto. Mismos textos y datos de la web.
- Menú de escritorio más sobrio (mismas opciones) con botón Cotizar. Se retira el foco de luz que seguía al cursor.
- Corregida la codificación de MELIÁ en el cintillo de clientes.
