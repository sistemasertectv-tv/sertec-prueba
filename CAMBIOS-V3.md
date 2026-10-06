# SERTEC — versión 3

## Cambios aplicados
- Portada en dos columnas independientes, sin superponer texto y cámara. En móvil: texto, botones e imagen.
- Título y párrafo solicitados por Víctor, respetados literalmente. Cotización abre /contacto; WhatsApp abre el número ya presente en el proyecto.
- Cámara grande con giro suave de 18 segundos; respeta movimiento reducido. No es un modelo 3D, es animación de la fotografía.
- Eslogan «Conectividad Sin Fronteras» debajo del logo en cabecera y pie.
- Imagen de monitoreo e infraestructura con columnas equilibradas y recorte object-cover, sin deformación; originales intactos.
- Imágenes de tarjetas de Inicio en proporción 16:10 y respaldo local sin bucle de errores.
- Menú completo conservado; navegación compacta hasta 1280 px, cierre al cambiar ruta y con Escape, botón accesible y panel móvil desplazable.
- Eliminados enlaces sociales sin URL y reemplazados enlaces legales vacíos por consultas reales, sin inventar perfiles ni políticas.
- Respaldos del blog usan un archivo existente, no nombres construidos con IDs que pueden no existir.
- Ruta desconocida muestra página no encontrada en vez de contenido vacío.
- Corrección de .npmrc para incluir dependencias opcionales. Eliminados binarios directos forzados: Rollup/esbuild eligen sus propias versiones y plataforma.
- Prebuild deja de instalar paquetes de Linux durante cada compilación.
- SEO inicial actualizado y hreflang sincronizado con la ruta.
- Formulario evita un segundo envío durante el envío y comprueba errores HTTP de la notificación. El éxito sigue dependiendo de guardar en Supabase.

## Qué NO se ha verificado
No hay Node/npm ni navegador ejecutable en este entorno. No se ejecutaron tsc, Vite, ni pruebas visuales o de interacción. La revisión local es estática, no una certificación funcional completa. No hay red: no se verificaron Cloudinary, Supabase, Google Maps, FormSubmit, correo ni WhatsApp en vivo.

## Riesgos heredados que requieren backend
Las pantallas de administración de Servicios, Proyectos, Blog y Contacto siguen utilizando una contraseña incrustada en el cliente: no es autenticación segura. Deben reemplazarse por autenticación de servidor/Supabase Auth y políticas RLS comprobadas antes de publicar. La integración de Gemini en el navegador expone su clave: moverla a un endpoint de servidor. No se han migrado estas funciones, para no romper el backend sin credenciales ni acceso de configuración. Una clave anónima pública de Supabase es normal, pero solo es segura con RLS adecuado.
La web sigue siendo una SPA: para SEO sin depender de JavaScript se necesita prerenderizado/SSR.
