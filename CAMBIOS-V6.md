# Versión 6 (sobre la v5)

## Nuevo
- 5 páginas de servicio en /servicios/:slug (GPON, videovigilancia CCTV con IA, cableado estructurado, IPTV, canalización) con H1, qué incluye, proceso, FAQ y CTA. JSON-LD Service + FAQPage + BreadcrumbList.
- 4 guías en /blog/:slug con JSON-LD Article + BreadcrumbList. Textos redactados sin precios ni cifras: revisar antes de publicar. Contenido en lib/content.ts.
- Inicio: sección "Obras reales" (fotos de public/projects, sin recorte), "Guías técnicas" y "Cotización rápida" (abre WhatsApp con el mensaje).
- Cifras del hero cuentan hacia arriba una sola vez (respeta "reducir movimiento").
- Botón flotante de WhatsApp en todo el sitio.
- Enlaces internos desde Inicio, Servicios, Blog y pie.
- Menú: "Servicios" y "Blog" quedan activos también en sus subpáginas.

## Rendimiento
- Páginas secundarias cargadas bajo demanda (React.lazy).
- El vídeo de Inicio solo se carga cerca de la pantalla.
- Imágenes Cloudinary de las tarjetas: f_auto,q_auto,w_900.

## SEO
- Sitemap con 15 URLs (6 originales + 9 nuevas).
- Eliminado priceRange "$$" del LocalBusiness (dato no confirmado).
- Las etiquetas canonical/OG se resincronizan cuando una página lazy cambia el título.

## Pendiente
- Prerenderizado (requiere Node al compilar), logos reales de clientes, testimonios, caso de estudio, páginas por ciudad, sameAs, WebP en public/projects, quitar three/@react-three si no se usan.
- Seguridad: contraseña de admin en el navegador, políticas abiertas en supabase-setup.sql, credenciales en scripts/deploy-to-hostinger.cjs.
- No se compiló ni se probó en navegador (sin Node en el entorno de edición).
