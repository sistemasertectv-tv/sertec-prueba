import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { Clock, Calendar, X, Plus, LogIn, Save, Shield, Sparkles, Loader2, CheckCircle2, Eye, Image as ImageIcon, Wand2, Trash2, Zap, ArrowRight, Link2 as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { guidePages } from '../lib/content';


// Configuración de la IA (Gemini API)
const GEMINI_API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.VITE_OPENAI_API_KEY;


const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: "Inteligencia Visual para la Hospitalidad: Claves en la Instalación de Cámaras IP en Hoteles",
    date: "9 de julio, 2026",
    readTime: "5 min de lectura",
    excerpt: "Los sistemas de videovigilancia AI modernos no solo aseguran instalaciones, sino que optimizan la gestión operativa y la experiencia del huésped.",
    content: "En la industria hotelera actual de la República Dominicana, la seguridad electrónica ha evolucionado de ser un elemento reactivo a un pilar proactivo de inteligencia operativa.\n\nAl instalar cámaras IP con analítica de inteligencia artificial en resorts de Punta Cana y Santo Domingo, se logran beneficios clave:\n1. Monitoreo Inteligente de Perímetros: Detección automática de intrusiones en zonas de playa y alberca sin falsas alarmas.\n2. Control de Acceso Vehicular: Reconocimiento de placas (LPR) para acceso fluido de huéspedes y proveedores.\n3. Privacidad y Seguridad: Cumplimiento de normativas de protección de datos con almacenamiento cifrado.",
    image: "/blog/blog-1.jpg"
  },
  {
    id: 2,
    title: "Canalizaciones: El Cimiento Invisible de una Infraestructura de Telecomunicaciones Robusta",
    date: "9 de julio, 2026",
    readTime: "6 min de lectura",
    excerpt: "La correcta canalización metálica y organizada es la garantía de longevidad para las redes de fibra óptica en proyectos turísticos e industriales.",
    content: "En SERTEC, la excelencia en infraestructura es nuestra promesa. Aunque elementos como la fibra óptica GPON, los equipos de seguridad electrónica y los servidores de última generación acaparan la atención, existe un componente fundamental que a menudo pasa desapercibido, pero cuya correcta implementación es crítica para la fiabilidad y el rendimiento de toda la red: las canalizaciones.\n\n**¿Qué son las Canalizaciones y Por Qué Son Vitales?**\n\nLas canalizaciones son sistemas diseñados para alojar, proteger, organizar y enrutar los cables y conductores de una infraestructura de telecomunicaciones. Lejos de ser un mero accesorio, son la columna vertebral que asegura la integridad física y operativa de la red, desde un centro de datos empresarial hasta el último punto de conexión de una red FTTH (Fiber To The Home).\n\nSu importancia radica en múltiples factores clave:\n\n1.  **Protección Integral:** Los cables, especialmente la delicada fibra óptica, son vulnerables a daños físicos por golpes, aplastamientos o roedores. Las canalizaciones actúan como una barrera robusta contra estas amenazas, además de proteger contra factores ambientales como el polvo, la humedad, la radiación UV y las temperaturas extremas, extendiendo significativamente la vida útil de la infraestructura.\n2.  **Organización y Gestión Eficiente:** Un cableado desorganizado es un caldo de cultivo para errores, fallos y dificultades en el mantenimiento. Las canalizaciones permiten un tendido ordenado, facilitando la identificación de cables, la resolución de problemas y la realización de futuras intervenciones o expansiones con el mínimo impacto.\n3.  **Optimización del Rendimiento:** Un cableado inadecuadamente enrutado puede sufrir de curvas excesivas que degradan la señal (especialmente en fibra óptica), interferencias electromagnéticas (EMI) o sobrecalentamiento. Una canalización bien diseñada garantiza radios de curvatura adecuados, separación de cables de potencia y datos, y ventilación, asegurando el máximo rendimiento de la red.\n4.  **Escalabilidad y Flexibilidad:** Las empresas y los hogares demandan una infraestructura que pueda crecer y adaptarse a nuevas tecnologías. Las canalizaciones permiten planificar espacio para futuras expansiones, simplificando la adición de nuevos cables o la sustitución de tecnologías sin interrumpir las operaciones existentes. Es una inversión de futuro que evita costosas reingenierías.\n5.  **Seguridad y Conformidad Normativa:** Un cableado expuesto o mal instalado puede representar riesgos eléctricos y de incendio. Las canalizaciones adecuadas, instaladas según normativas locales e internacionales (como ANSI/TIA, NFPA), garantizan la seguridad del personal y los equipos, además de cumplir con los requisitos legales y de seguros.\n\n**Tipos de Canalizaciones Comunes en Telecomunicaciones:**\n\n*   **Ductos Subterráneos (HDPE, PVC):** Esenciales para redes de fibra óptica exteriores y urbanas, protegiendo los cables de las inclemencias del tiempo, el tráfico y las excavaciones. El HDPE corrugado es ideal por su flexibilidad y resistencia.\n*   **Canaletas (PVC, Metálicas):** Utilizadas en interiores para un tendido ordenado y estético, tanto en oficinas como en edificios residenciales. Las metálicas ofrecen mayor protección física y, si están aterrizadas, contra EMI.\n*   **Bandejas Portacables:** Comunes en centros de datos, cuartos de equipos y grandes instalaciones, ofrecen una solución robusta y accesible para el tendido de grandes volmenes de cables, facilitando la ventilación y futuras adiciones.\n*   **Tubos Rígidos (EMT, IMC):** Utilizados en entornos industriales, zonas de alta seguridad o donde se requiere máxima protección física y contra incendios.\n\n**El Enfoque de SERTEC en Canalizaciones:**\n\nEn SERTEC, entendemos que la calidad de una infraestructura comienza con una base sólida. Por ello, nuestra metodología de implementación de canalizaciones se basa en:\n\n*   **Planificación Rigurosa:** Evaluación exhaustiva de las necesidades actuales y futuras, considerando el entorno, la carga de cables y los requisitos de expansión.\n*   **Materiales de Vanguardia:** Selección de canalizaciones de alta calidad, resistentes y certificadas, que garantizan durabilidad y protección efectiva.\n*   **Instalación Profesional:** Nuestro equipo de ingenieros y técnicos especializados aplica las mejores prácticas y cumple estrictamente con las normativas nacionales e internacionales, asegurando una instalación impecable.\n*   **Documentación Detallada:** Generación de planos y diagramas precisos de la infraestructura de canalizaciones, facilitando el mantenimiento y las futuras ampliaciones.\n\nInvertir en canalizaciones de calidad es invertir en la longevidad, el rendimiento y la seguridad de su red. Con SERTEC, su infraestructura de fibra óptica, GPON y seguridad electrónica estará construida sobre cimientos robustos y preparados para los desafíos del mañana, garantizando la conectividad y la protección que su negocio o residencia merece.",
    image: "/blog/blog-2.jpg"
  }
];

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  // Cargar posts desde Supabase al iniciar
  useEffect(() => {
    loadPosts();
    document.title = "Blog de Conectividad y Seguridad Hotelera en RD | SERTEC";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Artículos técnicos sobre tendencias de fibra óptica GPON, cámaras de seguridad AI, Wi-Fi 6 hotelero y canalización eléctrica en República Dominicana.");
    }
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Convertir los datos de Supabase al formato BlogPost asegurando imagen válida
        const formattedPosts = data.map(post => ({
          id: post.id,
          title: post.title,
          date: post.date || (post.created_at ? new Date(post.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Reciente'),
          readTime: post.read_time || '5 min de lectura',
          excerpt: post.excerpt,
          content: post.content,
          image: (post.id === 1 || post.id === 2)
            ? `/blog/blog-${post.id}.jpg`
            : (post.image || `/blog/blog-${post.id}.jpg` || 'https://images.unsplash.com/photo-1551703599-6b3e8379aa8b?q=80&w=1200&auto=format&fit=crop')
        }));

        // Fusionar posts iniciales con los de la DB evitando duplicados por título
        setPosts(prev => {
          const dbTitles = new Set(formattedPosts.map(p => p.title));
          const uniqueInitial = initialPosts.filter(p => !dbTitles.has(p.title));
          return [...formattedPosts, ...uniqueInitial];
        });
      } else {
        setPosts(initialPosts);
      }
    } catch (error) {
      console.error('Error cargando posts:', error);
      setPosts(initialPosts);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [customImagePrompt, setCustomImagePrompt] = useState('');
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false);

  const [newPost, setNewPost] = useState<Partial<BlogPost>>(() => {
    try {
      const draft = sessionStorage.getItem('sertec_blog_draft');
      return draft ? JSON.parse(draft) : {
        title: '',
        excerpt: '',
        content: '',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
        date: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
        readTime: '5 min'
      };
    } catch {
      return {
        title: '', excerpt: '', content: '',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
        date: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
        readTime: '5 min'
      };
    }
  });

  // Persistir borrador del formulario
  useEffect(() => {
    sessionStorage.setItem('sertec_blog_draft', JSON.stringify(newPost));
  }, [newPost]);

  // Función para convertir imagen a Base64 (Evita que caduquen los links de OpenAI)
  const persistImage = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      console.error("Error persistiendo imagen:", e);
      return url;
    }
  };


  const handleLogin = () => {
    if (password === '030925cra') {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setPassword('');
    } else {
      alert('Contraseña Incorrecta');
    }
  };

  const handleDeletePost = async (id: number) => {
    if (window.confirm("¿CONFIRMAR ELIMINACIÓN? Esta acción es permanente.")) {
      try {
        // Eliminar de Supabase
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Actualizar estado local
        setPosts(current => current.filter(p => p.id !== id));
        if (selectedPost?.id === id) setSelectedPost(null);
      } catch (error) {
        console.error('Error eliminando post:', error);
        alert('Error al eliminar el post. Intenta nuevamente.');
      }
    }
  };

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.content) return;

    try {
      // Preparar datos para Supabase
      const postData = {
        title: newPost.title!,
        excerpt: newPost.excerpt || (newPost.content!.substring(0, 100) + '...'),
        content: newPost.content!,
        image: newPost.image,
        date: newPost.date!,
        read_time: newPost.readTime!
      };

      // Insertar en Supabase
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select();

      if (error) throw error;

      // Recargar posts desde Supabase
      await loadPosts();

      setShowAddForm(false);
      setIsPreviewExpanded(false);
      clearDraft();
    } catch (error) {
      console.error('Error guardando post:', error);
      alert('Error al publicar el post. Verifica tu conexión.');
    }
  };

  // Función para subir a Cloudinary (Conversión de URL temporal a hosting permanente)
  const uploadToCloudinary = async (tempUrl: string) => {
    try {
      // 1. Descargamos la imagen como blob
      const response = await fetch(tempUrl);
      const blob = await response.blob();

      // 2. Preparamos el FormData
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', 'serteclabs'); // Preset que configuraremos o un preset default
      formData.append('cloud_name', (import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME);

      // Usamos el endpoint de subida no firmada (más seguro para frontend)
      // Nota: El usuario debe crear un preset 'serteclabs' en Cloudinary -> Settings -> Upload -> Upload Presets
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${(import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        const errorData = await cloudinaryResponse.json();
        throw new Error(errorData.error.message || 'Error en Cloudinary');
      }

      const data = await cloudinaryResponse.json();
      return data.secure_url;
    } catch (e) {
      console.error("Cloudinary Error:", e);
      return tempUrl; // Fallback a la temporal si falla
    }
  };

  const convertMediaUrl = (url: string) => {
    if (!url) return url;
    if (url.includes('/s/')) {
      return url.endsWith('/download') ? url : `${url.replace(/\/$/, '')}/download`;
    }
    const driveMatch = url.match(/[-\w]{25,}/);
    if (url.includes('drive.google.com') && driveMatch) {
      return `https://lh3.googleusercontent.com/d/${driveMatch[0]}`;
    }
    if (url.includes('dropbox.com')) {
      return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
    }
    return url;
  };

  const handleImageLink = (url: string) => {
    const directUrl = convertMediaUrl(url);
    setNewPost(prev => ({ ...prev, image: directUrl }));
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    setErrorLog(null);
    setIsPreviewExpanded(false);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Escribe un artículo profesional para el blog de SERTEC (empresa de telecomunicaciones, fibra óptica, GPON y seguridad electrónica en República Dominicana y el Caribe) sobre el tema: "${aiPrompt}". 
                    Enfócate en un tono técnico pero accesible, corporativo y profesional.
                    IMPORTANTE: Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta (no agregues formato markdown como \`\`\`json ni texto extra fuera del JSON):
                    { 
                      "title": "título impactante", 
                      "excerpt": "resumen breve de una o dos líneas para el feed", 
                      "content": "contenido completo del artículo con varios párrafos explicativos",
                      "visualPrompt": "Una descripción visual técnica y extremadamente detallada para generar una foto profesional de este tema, mencionando hardware específico, cables, luces led, texturas reales y estilo corporativo tech" 
                    }`
                }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Error de la API de Gemini: ${response.status}`);
      }

      const rawData = await response.json();
      const text = rawData.candidates[0].content.parts[0].text;
      const data = JSON.parse(text);

      setNewPost(prev => ({
        ...prev,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'
      }));
      setAiPrompt('');
      setCustomImagePrompt(data.visualPrompt || data.title); // Usar el prompt visual generado por la IA
      setIsPreviewExpanded(true);

    } catch (error: any) {
      console.error("Gemini IA Error:", error);
      setErrorLog("Reintente la generación.");
    } finally {
      setIsGenerating(false);
    }
  };

  const clearDraft = () => {
    sessionStorage.removeItem('sertec_blog_draft');
    setNewPost({
      title: '', excerpt: '', content: '',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
      date: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      readTime: '5 min'
    });
  };

  return (
    <div className="w-full bg-slate-950 min-h-screen pt-32 pb-24 relative overflow-hidden">
      <title>Insights Técnicos | SERTEC</title>

      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[150px] z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 blur-[150px] z-0 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16 text-white leading-none">
          <div className="flex justify-center mb-6">
            {!isAdmin ? (
              <button onClick={() => setShowAdminLogin(true)} className="text-[10px] text-slate-600 hover:text-blue-500 transition-colors uppercase tracking-[0.3em] font-bold flex items-center">
                <LogIn size={12} className="mr-2" /> Admin Access
              </button>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => setShowAddForm(true)} className="bg-blue-600 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center shadow-lg shadow-blue-600/20">
                  <Sparkles size={14} className="mr-2" /> Nuevo Artículo IA
                </button>
                <button onClick={() => setIsAdmin(false)} className="text-[10px] text-slate-500 hover:text-red-500 uppercase tracking-widest font-bold">Cerrar Sesión</button>
              </div>
            )}
          </div>
          <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Knowledge Hub</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 sm:mb-6 uppercase tracking-tighter">
            Insights <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Tecnológicos</span>
          </h1>
        </motion.div>

        <section className="mb-14" aria-label="Guías técnicas de SERTEC">
          <h2 className="text-white text-xl font-bold mb-5">Guías técnicas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guidePages.map(g => (
              <Link key={g.slug} to={`/blog/${g.slug}`} className="group rounded-xl border border-white/10 hover:border-blue-500/50 bg-slate-900/40 p-5 transition-colors">
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{g.readTime} de lectura</p>
                <h3 className="mt-2 font-bold text-white">{g.title}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm text-blue-400 group-hover:text-white">Leer guía <ArrowRight size={14} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        {/* FEED DE BLOG: 2 COLUMNAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {posts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/5 hover:border-blue-600/30 transition-all duration-500 flex flex-col group relative shadow-2xl"
            >
              {isAdmin && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeletePost(post.id); }}
                  className="absolute top-4 right-4 z-20 bg-red-600 text-white p-3 rounded-2xl hover:bg-red-700 transition-all shadow-xl"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <div className="h-40 sm:h-48 md:h-56 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/blog/blog-1.jpg';
                  }}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-600/10 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                  {post.date}
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-grow">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-400 transition-colors tracking-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem]">
                  {post.title}
                </h2>
                <p className="text-slate-400 mb-6 sm:mb-8 leading-relaxed font-light text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto">
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center space-x-2 text-blue-500 font-bold uppercase text-[10px] tracking-[0.2em] hover:text-white transition-all group/btn"
                  >
                    <span>Leer Artículo</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-slate-950/80 text-white">
            <motion.div className="bg-slate-900 border border-white/10 w-full max-w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl relative shadow-2xl">
              <button onClick={() => setSelectedPost(null)} className="absolute top-6 right-6 z-50 p-3 bg-white/5 rounded-full text-white hover:bg-white/10 transition-colors shadow-lg"><X size={20} /></button>
              <div className="h-48 sm:h-56 md:h-64 lg:h-96 w-full relative overflow-hidden">
                <img
                  src={selectedPost.image}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/blog/blog-1.jpg';
                  }}
                  className="w-full h-full object-cover"
                  alt={selectedPost.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>
              <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-4 sm:mb-6 md:mb-8 tracking-tighter uppercase leading-none">{selectedPost.title}</h2>
                <div className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed space-y-4 sm:space-y-6 font-light whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAdminLogin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-2xl bg-slate-950/60 text-white">
            <motion.div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
              <div className="text-center mb-8">
                <div className="bg-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500"><Shield size={32} /></div>
                <h3 className="font-black uppercase tracking-widest">Admin Access</h3>
              </div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-center font-mono mb-4 outline-none focus:border-blue-500 font-black" onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
              <div className="flex gap-4">
                <button onClick={() => setShowAdminLogin(false)} className="flex-grow py-4 text-slate-500 text-[10px] font-bold uppercase transition-colors hover:text-white">Cancelar</button>
                <button onClick={handleLogin} className="flex-grow py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase">Acceder</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAddForm && isAdmin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-2xl bg-slate-950/90 overflow-y-auto text-white">
            <motion.div className="bg-slate-900 border border-white/10 w-full max-w-3xl shadow-2xl rounded-3xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
              <div className="flex justify-between items-center p-8 bg-slate-950/50 border-b border-white/5 flex-shrink-0">
                <h3 className="font-black uppercase tracking-widest flex items-center"><Zap className="mr-3 text-yellow-400" /> Generador de Contenido</h3>
                <button onClick={() => { setShowAddForm(false); setIsPreviewExpanded(false); }} className="text-slate-500 hover:text-white transition-colors"><X /></button>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto">
                <div className="space-y-4">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">¿De qué trata el artículo?</label>
                  <div className="flex gap-3">
                    <input type="text" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Ej: Seguridad hotelera..." className="flex-grow bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-blue-500 transition-all outline-none" onKeyDown={(e) => e.key === 'Enter' && handleAIGenerate()} />
                    <button onClick={handleAIGenerate} disabled={isGenerating || !aiPrompt} className="bg-blue-600 text-white w-16 h-16 rounded-xl hover:bg-blue-500 flex items-center justify-center disabled:opacity-50 transition-all shadow-lg shadow-blue-600/40">
                      {isGenerating ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {newPost.title && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center text-green-500 font-black text-[10px] uppercase tracking-widest"><CheckCircle2 size={16} className="mr-2" /> Redacción Lista</div>
                        <button onClick={() => setIsPreviewExpanded(!isPreviewExpanded)} className="flex items-center text-blue-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                          <Eye size={16} className="mr-2" /> {isPreviewExpanded ? 'Cerrar Vista' : 'Ver Vista Previa'}
                        </button>
                      </div>

                      {isPreviewExpanded && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                          <div className="bg-slate-950/50 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <div className="aspect-video relative overflow-hidden bg-slate-900 flex items-center justify-center">
                              {isGeneratingImage ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/80">
                                  <Loader2 className="animate-spin text-blue-500 mb-2" size={32} />
                                  <span className="text-[10px] text-blue-500 font-black uppercase tracking-widest">Generando IA...</span>
                                </div>
                              ) : null}
                              <img src={newPost.image} alt="" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                              <div className="absolute bottom-6 left-6 right-6">
                                <h4 className="text-white font-black uppercase text-xl leading-tight border-l-4 border-blue-600 pl-4">{newPost.title}</h4>
                              </div>
                            </div>

                            <div className="p-6 bg-slate-900 border-t border-white/5 space-y-6">
                              <div className="space-y-3">
                                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                                  <LinkIcon size={12} className="text-blue-400" /> Vincular Imagen (Nextcloud / Google Drive / URL)
                                </label>
                                <div className="flex gap-3">
                                  <input
                                    type="text"
                                    placeholder="https://nextcloud.sertec.do/s/..."
                                    className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-xs text-white focus:border-blue-500 transition-all outline-none"
                                    onChange={(e) => handleImageLink(e.target.value)}
                                  />
                                </div>
                                <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest pl-1">
                                  * El sistema convertirá el link automáticamente para visualización directa.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 bg-slate-950/50 rounded-2xl border border-white/5 space-y-4">
                            <p className="text-slate-400 text-sm italic border-l-2 border-blue-500 pl-4 bg-white/5 p-4 rounded-r-xl">{newPost.excerpt}</p>
                            <div className="text-slate-500 text-xs leading-relaxed max-h-40 overflow-y-auto pr-4 whitespace-pre-wrap">
                              {newPost.content}
                            </div>
                          </div>

                          <button onClick={handleAddPost} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.4em] shadow-xl hover:bg-blue-500 transition-all">
                            <Save className="mr-3" size={20} /> Publicar blog
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;