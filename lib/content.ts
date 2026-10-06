export interface FaqItem { q: string; a: string }
export interface ServicePage {
  slug: string;
  name: string;
  contactTitle: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  includes: string[];
  steps: { t: string; d: string }[];
  faqs: FaqItem[];
  guide: string;
}

export interface GuideSection { h: string; p: string[]; bullets?: string[] }
export interface GuidePage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  readTime: string;
  sections: GuideSection[];
  service: string;
}

const commonSteps = (a: string, b: string, c: string, d: string) => [
  { t: 'Levantamiento', d: a },
  { t: 'Diseño', d: b },
  { t: 'Instalación y certificación', d: c },
  { t: 'Soporte', d: d },
];

export const servicePages: ServicePage[] = [
  {
    slug: 'fibra-optica-gpon-hoteles',
    name: 'Fibra óptica GPON',
    contactTitle: 'Red GPON',
    metaTitle: 'Fibra óptica GPON para hoteles y resorts en RD | SERTEC',
    metaDescription: 'Diseño, instalación y certificación de redes de fibra óptica GPON para hoteles, resorts e instalaciones industriales en República Dominicana y el Caribe.',
    h1: 'Redes de fibra óptica GPON para hoteles, resorts e industria',
    intro: 'Una red GPON lleva fibra óptica hasta cada habitación o punto de servicio usando una infraestructura pasiva: sin electrónica activa entre el cuarto de equipos y el usuario. Es una arquitectura pensada para alta densidad de usuarios, crecimiento ordenado y menos puntos de falla. En SERTEC la diseñamos, la instalamos y la certificamos.',
    includes: [
      'Diseño de la red óptica: troncales, divisores (splitters) y distribución por planta o edificio',
      'Tendido de fibra, canalización y cuartos de telecomunicaciones (MDF/IDF)',
      'Empalmes, terminaciones y pruebas de potencia óptica con documentación de resultados',
      'Instalación y configuración de OLT y ONT según el proyecto',
      'Integración con Wi-Fi, IPTV y sistemas de seguridad sobre la misma infraestructura',
      'Planos finales y registro de la instalación para futuras ampliaciones',
    ],
    steps: commonSteps(
      'Visitamos las instalaciones, revisamos rutas, canalizaciones y cuartos de equipos, y definimos el alcance.',
      'Preparamos el diseño óptico y la lista de materiales, adaptados al número de habitaciones y servicios.',
      'Ejecutamos el tendido, empalmamos, medimos y entregamos los resultados de certificación.',
      'Acompañamos la operación con soporte técnico y ampliaciones cuando el proyecto crece.'
    ),
    faqs: [
      { q: '¿Qué es una red GPON?', a: 'Es una red de fibra óptica pasiva punto a multipunto. Una sola fibra desde el equipo central se reparte mediante divisores ópticos hacia varios usuarios, sin equipos activos intermedios.' },
      { q: '¿Para qué tipo de instalaciones es adecuada?', a: 'Para hoteles, resorts, complejos con varios edificios e instalaciones industriales donde se necesita llevar datos, Wi-Fi, televisión y otros servicios a muchos puntos con una infraestructura ordenada.' },
      { q: '¿Se puede ampliar después?', a: 'Sí. El diseño se prepara pensando en crecimiento, y por eso conviene documentar bien la instalación desde el inicio.' },
      { q: '¿Trabajan fuera de Santo Domingo?', a: 'Sí. Atendemos proyectos en República Dominicana y el Caribe, incluidas las zonas turísticas.' },
    ],
    guide: 'gpon-vs-cableado-tradicional-hoteles',
  },
  {
    slug: 'videovigilancia-cctv-ia',
    name: 'Videovigilancia CCTV con IA',
    contactTitle: 'Cámaras de Seguridad',
    metaTitle: 'Videovigilancia CCTV con IA para hoteles e industria | SERTEC',
    metaDescription: 'Sistemas de videovigilancia CCTV con analítica de video e IA perimetral para hoteles, resorts e instalaciones industriales en República Dominicana.',
    h1: 'Videovigilancia CCTV con analítica de IA para hoteles e industria',
    intro: 'Un sistema de videovigilancia moderno no solo graba: detecta, alerta y ayuda a actuar a tiempo. Diseñamos sistemas CCTV con analítica de video e IA perimetral, integrados con un centro de monitoreo, para proteger huéspedes, personal, activos e instalaciones.',
    includes: [
      'Estudio de riesgos y cobertura: accesos, perímetro, áreas comunes y zonas técnicas',
      'Selección e instalación de cámaras fijas, multisensor y PTZ según cada zona',
      'Analítica de video: detección de intrusión, cruce de línea, conteo y otras reglas según el proyecto',
      'Grabación, almacenamiento y ciberseguridad básica de la red de cámaras',
      'Diseño e integración de centros de monitoreo con visualización avanzada',
      'Capacitación del personal y documentación del sistema',
    ],
    steps: commonSteps(
      'Recorremos el sitio con el equipo de seguridad para identificar zonas críticas, ángulos y condiciones de iluminación.',
      'Definimos tipos de cámara, ubicación, almacenamiento y reglas de analítica.',
      'Instalamos, configuramos, probamos cada cámara y certificamos el cableado.',
      'Ofrecemos mantenimiento, ajustes de analítica y soporte crítico.'
    ),
    faqs: [
      { q: '¿Qué aporta la IA a un sistema de cámaras?', a: 'Permite que el sistema detecte eventos definidos, como una intrusión en una zona restringida, y avise al operador, en lugar de depender solo de que alguien esté mirando la pantalla.' },
      { q: '¿Se integra con un centro de monitoreo?', a: 'Sí. Diseñamos centros de monitoreo y conectamos las cámaras para vigilancia continua.' },
      { q: '¿Qué tipos de cámara instalan?', a: 'Cámaras fijas, multisensor y domos PTZ, elegidas según el área a cubrir y las condiciones del lugar.' },
      { q: '¿Pueden trabajar en un hotel en operación?', a: 'Sí. Planificamos las instalaciones para minimizar molestias a huéspedes y operación.' },
    ],
    guide: 'camaras-con-ia-para-resorts-que-exigir',
  },
  {
    slug: 'cableado-estructurado',
    name: 'Cableado estructurado',
    contactTitle: 'Cableado Estructurado',
    metaTitle: 'Cableado estructurado certificado para hoteles e industria | SERTEC',
    metaDescription: 'Instalación y certificación de cableado estructurado de cobre y fibra para hoteles, resorts, oficinas e instalaciones industriales en República Dominicana.',
    h1: 'Cableado estructurado certificado para hoteles, oficinas e industria',
    intro: 'El cableado estructurado es la base de cualquier red: si está bien hecho, todo lo demás funciona mejor. Instalamos y certificamos cableado de cobre y fibra con orden, etiquetado y documentación, para que su infraestructura sea fácil de operar y de ampliar.',
    includes: [
      'Cableado horizontal y vertical en cobre y fibra óptica',
      'Racks, paneles de parcheo, organización y etiquetado',
      'Cuartos de telecomunicaciones MDF/IDF',
      'Certificación de cada punto con equipo de medición y reporte',
      'Canalización y bandejas, incluidas las rutas en áreas técnicas e industriales',
      'Documentación final y planos de la instalación',
    ],
    steps: commonSteps(
      'Evaluamos rutas, distancias y espacios disponibles, y definimos puntos de red y cuartos técnicos.',
      'Dimensionamos el cableado, los racks y las rutas, con margen para crecer.',
      'Instalamos, etiquetamos y certificamos cada punto.',
      'Resolvemos incidencias y atendemos ampliaciones.'
    ),
    faqs: [
      { q: '¿Qué significa que el cableado esté certificado?', a: 'Que cada enlace se mide con equipo especializado y se verifica que cumple los parámetros del estándar aplicable. Los resultados quedan documentados.' },
      { q: '¿Instalan solo cobre o también fibra?', a: 'Ambos. Combinamos cobre y fibra según lo que requiera cada tramo del proyecto.' },
      { q: '¿Pueden ordenar un cuarto de equipos existente?', a: 'Sí. Podemos reorganizar, etiquetar y documentar instalaciones que han crecido sin orden.' },
      { q: '¿Entregan planos?', a: 'Sí, entregamos la documentación de la instalación para facilitar el mantenimiento futuro.' },
    ],
    guide: 'gpon-vs-cableado-tradicional-hoteles',
  },
  {
    slug: 'iptv-hoteles',
    name: 'IPTV para hoteles',
    contactTitle: 'IPTV',
    metaTitle: 'IPTV para hoteles y resorts en República Dominicana | SERTEC',
    metaDescription: 'Diseño e instalación de sistemas IPTV para hoteles y resorts: distribución de televisión sobre la red, integración con GPON y soporte técnico continuo.',
    h1: 'Sistemas IPTV para hoteles y resorts',
    intro: 'IPTV distribuye la televisión sobre la red IP del hotel. Permite gestionar canales y contenidos desde un punto central y compartir la infraestructura con otros servicios. Diseñamos e instalamos el sistema y su red de soporte, incluida la integración con GPON.',
    includes: [
      'Diseño de la arquitectura de distribución sobre la red del hotel',
      'Cabecera y equipos de recepción y distribución',
      'Integración con redes GPON o cableado estructurado',
      'Configuración de los televisores y dispositivos de habitación',
      'Pruebas de calidad de servicio en la red',
      'Capacitación y soporte para el equipo técnico',
    ],
    steps: commonSteps(
      'Revisamos la red existente, el número de habitaciones y los servicios que se quieren ofrecer.',
      'Definimos la arquitectura de red, los equipos y la gestión de contenidos.',
      'Instalamos, configuramos y probamos habitación por habitación.',
      'Damos soporte para incidencias y cambios en la oferta de canales.'
    ),
    faqs: [
      { q: '¿Qué diferencia hay entre IPTV y la televisión por cable tradicional?', a: 'IPTV usa la red IP del hotel en lugar de una red coaxial independiente. Eso permite aprovechar la misma infraestructura para varios servicios.' },
      { q: '¿Funciona sobre una red GPON?', a: 'Sí, es una combinación habitual, siempre que la red se diseñe con ese servicio previsto desde el inicio.' },
      { q: '¿Se puede instalar en un hotel ya construido?', a: 'Sí. Evaluamos la infraestructura existente y proponemos qué se puede aprovechar y qué hay que actualizar.' },
      { q: '¿Quién se encarga del contenido?', a: 'Nos ocupamos de la infraestructura técnica. Las licencias de contenido dependen de cada proveedor y se definen según el proyecto.' },
    ],
    guide: 'iptv-hotelero-guia-de-decision',
  },
  {
    slug: 'canalizacion-industrial',
    name: 'Canalización eléctrica e industrial',
    contactTitle: 'Canalización',
    metaTitle: 'Canalización y redes para entornos industriales | SERTEC',
    metaDescription: 'Canalización, bandejas y cableado de telecomunicaciones para entornos industriales y corporativos en República Dominicana, con materiales de grado industrial.',
    h1: 'Canalización y redes corporativas para entornos industriales',
    intro: 'Los entornos industriales exigen infraestructura robusta: rutas protegidas, materiales adecuados y una instalación que soporte el uso continuo. Realizamos la canalización y el cableado de telecomunicaciones para plantas, almacenes y oficinas corporativas.',
    includes: [
      'Rutas de canalización, tuberías y bandejas para telecomunicaciones',
      'Materiales de grado industrial según el ambiente',
      'Cableado de cobre y fibra óptica para redes corporativas',
      'Cuartos de comunicaciones y gabinetes',
      'Identificación, etiquetado y documentación',
      'Coordinación con otros trabajos de obra',
    ],
    steps: commonSteps(
      'Visitamos el lugar para evaluar las condiciones: distancias, ambiente y riesgos.',
      'Definimos rutas, soportes y materiales apropiados para cada zona.',
      'Instalamos y comprobamos cada tramo, con registro de los resultados.',
      'Mantenemos la infraestructura y atendemos ampliaciones.'
    ),
    faqs: [
      { q: '¿Trabajan en instalaciones industriales?', a: 'Sí. Atendemos entornos industriales y corporativos además del sector hotelero.' },
      { q: '¿Qué materiales utilizan?', a: 'Seleccionamos los materiales según el ambiente de cada zona, priorizando grado industrial donde se requiere.' },
      { q: '¿Se integra con el resto de la red?', a: 'Sí. La canalización se diseña junto al cableado y la fibra para que todo el proyecto sea coherente.' },
      { q: '¿Pueden coordinar con otros contratistas?', a: 'Sí. Coordinamos para que la instalación encaje con el resto de la obra.' },
    ],
    guide: 'gpon-vs-cableado-tradicional-hoteles',
  },
];

export const guidePages: GuidePage[] = [
  {
    slug: 'cuanto-cuesta-una-red-gpon-para-un-hotel',
    title: '¿De qué depende el costo de una red GPON para un hotel?',
    metaTitle: 'Costo de una red GPON para un hotel: qué lo define | SERTEC',
    metaDescription: 'Factores que determinan el costo de una red de fibra GPON en un hotel o resort: habitaciones, distancias, canalización, equipos y servicios.',
    lead: 'No existe un precio único para una red GPON: depende del proyecto. Esta guía explica los factores que más influyen para que pueda comparar propuestas con criterio.',
    readTime: '5 min',
    service: 'fibra-optica-gpon-hoteles',
    sections: [
      { h: 'El tamaño y la forma del hotel', p: ['El número de habitaciones y puntos de servicio, y cómo se distribuyen en edificios, plantas y villas, define la cantidad de fibra, divisores y cuartos técnicos.'], bullets: ['Habitaciones y áreas comunes que necesitan servicio', 'Número de edificios y distancia entre ellos', 'Plantas y altura de los edificios'] },
      { h: 'La canalización existente', p: ['Si ya hay rutas utilizables, el trabajo civil baja. Si hay que abrir canalizaciones nuevas, esa parte puede ser una porción importante del presupuesto. Una visita técnica permite saberlo antes de cotizar.'] },
      { h: 'Los equipos y los servicios', p: ['La capacidad del equipo central, los equipos en la habitación y los servicios que se montarán sobre la red (internet, Wi-Fi, IPTV, otros) influyen en la lista de materiales.'] },
      { h: 'Certificación y documentación', p: ['Una red certificada y documentada se opera y se amplía con menos problemas. Verifique que la propuesta incluya mediciones, resultados y planos finales.'] },
      { h: 'Cómo comparar propuestas', p: ['Pida que cada oferta detalle alcance, materiales, pruebas, garantía y soporte. Dos precios solo son comparables si incluyen lo mismo.'] },
    ],
  },
  {
    slug: 'camaras-con-ia-para-resorts-que-exigir',
    title: 'Cámaras con IA para resorts: qué exigir antes de comprar',
    metaTitle: 'Cámaras con IA para resorts: qué exigir | SERTEC',
    metaDescription: 'Criterios para elegir un sistema de videovigilancia con inteligencia artificial en un resort: cobertura, analítica, almacenamiento, integración y soporte.',
    lead: 'La analítica de IA es útil cuando está bien dimensionada y configurada para su operación. Estos son los puntos que conviene revisar antes de decidir.',
    readTime: '5 min',
    service: 'videovigilancia-cctv-ia',
    sections: [
      { h: 'Defina qué quiere detectar', p: ['La IA no sustituye al análisis de riesgos. Empiece por definir qué eventos son importantes en su propiedad: accesos no autorizados, perímetro, zonas técnicas o áreas de acceso restringido.'] },
      { h: 'Cobertura y tipo de cámara', p: ['Cada zona pide un tipo de cámara distinto. Las multisensor y las PTZ cubren amplias áreas, y las fijas son adecuadas para accesos y pasillos.'], bullets: ['Condiciones de luz diurna y nocturna', 'Exposición a humedad, salitre y calor', 'Ángulos que eviten puntos ciegos'] },
      { h: 'Almacenamiento y red', p: ['Cuanta más resolución y más cámaras, más almacenamiento y ancho de banda se requiere. Pida el cálculo de retención de grabación y cómo se protege la red de cámaras.'] },
      { h: 'Integración y monitoreo', p: ['Un sistema es más útil si las alertas llegan a quien puede actuar. Consulte cómo se integra con el centro de monitoreo y con otros sistemas de seguridad.'] },
      { h: 'Instalación, pruebas y soporte', p: ['Exija pruebas de cada cámara, documentación y soporte posterior. La calidad de la instalación influye tanto como la del equipo.'] },
    ],
  },
  {
    slug: 'gpon-vs-cableado-tradicional-hoteles',
    title: 'GPON frente a cableado tradicional en hoteles',
    metaTitle: 'GPON vs cableado tradicional para hoteles | SERTEC',
    metaDescription: 'Comparación entre redes de fibra GPON y cableado estructurado de cobre en hoteles: arquitectura, distancias, crecimiento y mantenimiento.',
    lead: 'Ambas opciones pueden funcionar bien. La decisión depende del tamaño de la propiedad, la infraestructura existente y los servicios que quiera ofrecer.',
    readTime: '6 min',
    service: 'fibra-optica-gpon-hoteles',
    sections: [
      { h: 'Cómo funciona cada una', p: ['El cableado tradicional lleva cobre desde un conmutador (switch) hasta cada punto, con distancias limitadas y equipos activos en los cuartos de cada planta. GPON usa fibra con divisores pasivos que reparten la señal sin electrónica activa intermedia.'] },
      { h: 'Distancias y cuartos técnicos', p: ['La fibra llega más lejos, y por eso GPON puede reducir la cantidad de cuartos de telecomunicaciones en propiedades extensas o con varios edificios.'] },
      { h: 'Mantenimiento y puntos de falla', p: ['Al no tener equipos activos entre la central y el usuario, hay menos elementos que alimentar, enfriar y reemplazar. Por otra parte, el equipo central y la fibra deben estar bien diseñados y documentados.'] },
      { h: 'Cuándo conviene cada una', p: ['En hoteles grandes o complejos con varios edificios, GPON suele ser atractivo. En propiedades pequeñas o con cobre en buen estado, el cableado estructurado puede ser más sencillo. Muchas veces se combinan.'] },
      { h: 'Qué hacer primero', p: ['Una visita técnica y un levantamiento permiten comparar ambas opciones con datos de su propiedad y no con generalidades.'] },
    ],
  },
  {
    slug: 'iptv-hotelero-guia-de-decision',
    title: 'IPTV hotelero: guía para decidir',
    metaTitle: 'IPTV hotelero: guía de decisión para hoteles y resorts | SERTEC',
    metaDescription: 'Qué considerar antes de instalar IPTV en un hotel o resort: red de soporte, integración, contenido, equipos en habitación y soporte técnico.',
    lead: 'IPTV es tan buena como la red que la soporta. Esta guía resume lo que conviene revisar antes de elegir un sistema.',
    readTime: '5 min',
    service: 'iptv-hoteles',
    sections: [
      { h: 'Empiece por la red', p: ['El sistema distribuye video sobre la red IP, por lo que su capacidad y su orden determinan la calidad del servicio. Revise si la red actual puede soportarlo o requiere actualización.'] },
      { h: 'Contenido y licencias', p: ['La infraestructura técnica y el contenido son dos temas distintos. Defina qué canales y servicios quiere ofrecer y quién aporta las licencias.'] },
      { h: 'Equipos en la habitación', p: ['Televisores, decodificadores y la forma de gestionarlos afectan la experiencia del huésped y el trabajo del equipo técnico.'] },
      { h: 'Integración con otros servicios', p: ['Si la red es GPON o cableado estructurado, el diseño debe contemplar IPTV desde el principio para evitar rehacer trabajo.'] },
      { h: 'Soporte', p: ['Pregunte cómo se atienden las incidencias y quién las resuelve. Un servicio en hotel opera todos los días.'] },
    ],
  },
];

export const getService = (slug?: string) => servicePages.find(s => s.slug === slug);
export const getGuide = (slug?: string) => guidePages.find(g => g.slug === slug);
