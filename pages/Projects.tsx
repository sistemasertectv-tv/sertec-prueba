import React, { useState, useEffect } from 'react';
import { Zap, Trash2, Plus, LogIn, Save, X, ShieldAlert, ImageIcon, Loader2, Maximize2, Video, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { supabase } from '../lib/supabase';

const defaultProjects: Project[] = [
  {
    id: 23,
    src: "/projects/project-23.jpg",
    alt: "Cámaras de Seguridad y Monitoreo Hotelero",
    type: 'image'
  },
  {
    id: 22,
    src: "/projects/project-22.jpg",
    alt: "Infraestructura y Conectividad en Complejo Turístico",
    type: 'image'
  },
  {
    id: 21,
    src: "/projects/project-21.jpg",
    alt: "Despliegue de Red GPON y Racks de Servidores",
    type: 'image'
  },
  {
    id: 20,
    src: "/projects/project-20.jpg",
    alt: "Canalización y Cableado Estructurado en Altura",
    type: 'image'
  },
  {
    id: 18,
    src: "/projects/project-18.jpg",
    alt: "Instalación de Puntos de Acceso Wi-Fi y Cámaras IP",
    type: 'image'
  },
  {
    id: 17,
    src: "/projects/project-17.jpg",
    alt: "Cuarto de Telecomunicaciones MDF en Resort",
    type: 'image'
  },
  {
    id: 16,
    src: "/projects/project-16.jpg",
    alt: "Fusión de Fibra Óptica y Certificación Fluke",
    type: 'image'
  },
  {
    id: 15,
    src: "/projects/project-15.jpg",
    alt: "Sistemas de Seguridad Perimetral Hotelera",
    type: 'image'
  },
  {
    id: 14,
    src: "/projects/project-14.jpg",
    alt: "Instalación Técnica en Complejo Hotelero",
    type: 'image'
  },
  {
    id: 13,
    src: "/projects/project-13.jpg",
    alt: "Cámaras Domo AI para Interiores y Lobbies",
    type: 'image'
  },
  {
    id: 11,
    src: "/projects/project-11.jpg",
    alt: "Canalización NEMA 4X Anticorrosión en Entorno Marino",
    type: 'image'
  },
  {
    id: 10,
    src: "/projects/project-10.jpg",
    alt: "Gabinete de Comunicaciones y Patch Panels",
    type: 'image'
  },
  {
    id: 9,
    src: "/projects/project-9.jpg",
    alt: "Cableado Certificado de Alta Densidad",
    type: 'image'
  },
  {
    id: 8,
    src: "/projects/project-8.jpg",
    alt: "Monitoreo y Seguridad en Áreas Comunes de Resort",
    type: 'image'
  },
  {
    id: 7,
    src: "/projects/project-7.jpg",
    alt: "Centro de Distribución Óptica OLT / ONT",
    type: 'image'
  },
  {
    id: 6,
    src: "/projects/project-6.jpg",
    alt: "Infraestructura de Telecomunicaciones Hotelera",
    type: 'image'
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop",
    alt: "Sistemas Integrados de Seguridad y Datos",
    type: 'image'
  }
];

// Helper to convert Google Drive and Nextcloud URLs to direct links
const convertMediaUrl = (url: string, type: 'image' | 'video' = 'image') => {
  if (!url) return '';

  // SUPPORT FOR GOOGLE DRIVE
  const driveMatch = url.match(/[-\w]{25,}/);
  if (url.includes('drive.google.com') && driveMatch) {
    const id = driveMatch[0];
    return type === 'image'
      ? `https://lh3.googleusercontent.com/d/${id}`
      : `https://drive.google.com/uc?export=download&id=${id}`;
  }

  // SUPPORT FOR NEXTCLOUD (Personal Cloud)
  if (url.includes('/s/')) {
    const cleanUrl = url.split('?')[0].replace(/\/$/, "");
    if (type === 'image') {
      return cleanUrl.endsWith('/preview') ? cleanUrl : `${cleanUrl}/preview`;
    }
    return cleanUrl.endsWith('/download') ? cleanUrl : `${cleanUrl}/download`;
  }

  if (url.includes('dropbox.com')) {
    return url.replace('dl=0', 'dl=1');
  }

  return url;
};

const LOCAL_PROJECT_IDS = new Set([6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23]);

const resolveProjectSrc = (p: Project | any): string => {
  if (p && p.id && LOCAL_PROJECT_IDS.has(p.id)) {
    return `/projects/project-${p.id}.jpg`;
  }
  if (p && p.src && (p.src.includes('drive.google.com') || p.src.includes('lh3.googleusercontent.com'))) {
    return `/projects/project-${p.id}.jpg`;
  }
  return (p && p.src) || (p && p.id ? `/projects/project-${p.id}.jpg` : '');
};

interface ProjectCardProps {
  project: Project;
  isAdmin: boolean;
  onDelete: (id: number) => void;
  onSelect: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isAdmin, onDelete, onSelect }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(() => resolveProjectSrc(project));

  useEffect(() => {
    setCurrentSrc(resolveProjectSrc(project));
  }, [project.id, project.src]);

  const handleImgError = () => {
    const fallbackLocal = `/projects/project-${project.id}.jpg`;
    if (currentSrc !== fallbackLocal && LOCAL_PROJECT_IDS.has(project.id)) {
      setCurrentSrc(fallbackLocal);
    } else {
      setCurrentSrc('https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop');
    }
    setIsLoaded(true);
  };

  return (
    <motion.div
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onClick={() => onSelect({ ...project, src: currentSrc })}
      className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-60 sm:h-72 md:h-80 group relative border border-white/5 bg-slate-900 cursor-zoom-in"
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <Loader2 className="text-blue-500 animate-spin" size={32} />
        </div>
      )}

      {project.type === 'video' ? (
        <div className="w-full h-full relative">
          <video
            className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            muted loop playsInline
            onMouseOver={e => (e.target as HTMLVideoElement).play()}
            onMouseOut={e => (e.target as HTMLVideoElement).pause()}
            onLoadedData={() => setIsLoaded(true)}
          >
            <source src={project.src} />
          </video>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/20">
            <div className="w-16 h-16 rounded-full bg-blue-600/80 flex items-center justify-center text-white backdrop-blur-md">
              <Play size={32} fill="currentColor" />
            </div>
          </div>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={project.alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleImgError}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {isAdmin && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
          className="absolute top-4 right-4 z-20 bg-red-600 text-white p-3 rounded-2xl hover:bg-red-700 transition-all shadow-xl"
          title="Eliminar Proyecto"
        >
          <Trash2 size={18} />
        </button>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8 pointer-events-none">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {project.type === 'video' ? <Video size={14} className="text-blue-400" /> : <ImageIcon size={14} className="text-blue-400" />}
              <span className="text-blue-400 font-bold text-[8px] uppercase tracking-widest">{project.type || 'image'}</span>
            </div>
            <span className="text-white font-bold text-xl uppercase tracking-tighter block">{project.alt}</span>
            <div className="w-8 h-1 bg-blue-600 mt-2 transition-all group-hover:w-16"></div>
          </div>
          <Maximize2 className="text-white/50 group-hover:text-blue-500 transition-colors" size={24} />
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({ src: '', alt: '', type: 'image' as 'image' | 'video' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
    document.title = "Proyectos de Telecomunicaciones y Seguridad Hotelera | SERTEC RD";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Conozca nuestros proyectos ejecutados en redes GPON, videovigilancia y canalización para cadenas hoteleras líderes (Meliá, Iberostar, Dreams) en Santo Domingo, Bávaro y Punta Cana.");
    }
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      const formatted = (data || []).map((p: any) => ({
        ...p,
        src: resolveProjectSrc(p)
      }));
      setProjects(formatted);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
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

  const handleDeleteProject = async (id: number) => {
    if (window.confirm("¿Seguro que deseas eliminar este proyecto de la galería permanentemente?")) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setProjects(prev => prev.filter(p => p.id !== id));
        if (selectedProject?.id === id) setSelectedProject(null);
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error al eliminar el proyecto');
      }
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.src || !newProject.alt) return;

    setIsSubmitting(true);
    const finalUrl = convertMediaUrl(newProject.src, newProject.type);

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([
          {
            src: finalUrl,
            alt: newProject.alt,
            type: newProject.type
          }
        ])
        .select();

      if (error) throw error;

      if (data) {
        setProjects([data[0], ...projects]);
      }

      setNewProject({ src: '', alt: '', type: 'image' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Error al agregar el proyecto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-950 min-h-screen">
      <h1 className="sr-only">Proyectos de fibra GPON, videovigilancia y redes en hoteles de República Dominicana</h1>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.15),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center mb-6">
            {!isAdmin ? (
              <button onClick={() => setShowAdminLogin(true)} className="text-[10px] text-slate-700 hover:text-blue-500 transition-colors uppercase tracking-[0.3em] font-bold flex items-center">
                <LogIn size={12} className="mr-2" /> Admin Access
              </button>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => setShowAddForm(true)} className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center shadow-lg shadow-blue-600/20">
                  <Plus size={14} className="mr-2" /> Agregar Proyecto
                </button>
                <button onClick={() => setIsAdmin(false)} className="text-[10px] text-slate-500 hover:text-red-500 uppercase tracking-widest font-bold">Cerrar Sesión</button>
              </div>
            )}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-6 uppercase tracking-tighter"
          >
            Ingeniería de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Vanguardia</span>
          </motion.h1>
          <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            Documentamos cada fase de implementación para asegurar los estándares más altos de la industria hotelera.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-white tracking-widest uppercase inline-block pb-2 border-b-2 border-blue-600">
              Evidencia Técnica
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-60 sm:h-72 md:h-80 group relative border border-blue-500/30 bg-slate-900"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              >
                <source src="https://res.cloudinary.com/dgjnnstkd/video/upload/v1767567217/video2525_whrlyr.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 to-transparent p-6 pointer-events-none">
                <span className="text-white font-bold text-sm uppercase tracking-widest">Showcase en Vivo</span>
              </div>
              <div className="absolute top-4 right-4 bg-blue-600/80 backdrop-blur-md p-2 rounded-full">
                <Zap size={14} className="text-white animate-pulse" />
              </div>
            </motion.div>

            <AnimatePresence mode="popLayout">
              {isLoading ? (
                // Skeleton Loader
                [...Array(6)].map((_, i) => (
                  <div key={`skeleton-${i}`} className="rounded-3xl h-80 bg-slate-900 animate-pulse border border-white/5 flex items-center justify-center">
                    <Loader2 className="text-blue-500/20 animate-spin" size={40} />
                  </div>
                ))
              ) : (
                (projects.length > 0 ? projects : defaultProjects).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isAdmin={isAdmin}
                    onDelete={handleDeleteProject}
                    onSelect={setSelectedProject}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-4 md:p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />

            <motion.div
              layoutId={`project-${selectedProject.id}`}
              className="relative w-full max-w-[95vw] lg:max-w-6xl aspect-video bg-slate-900 rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)] border border-white/10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md transition-colors"
              >
                <X size={24} />
              </button>

              {selectedProject.type === 'video' ? (
                <video
                  src={selectedProject.src}
                  className="w-full h-full object-contain bg-black"
                  controls autoPlay
                />
              ) : (
                <img
                  src={selectedProject.src}
                  alt={selectedProject.alt}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `/projects/project-${selectedProject.id}.jpg`;
                  }}
                  className="w-full h-full object-contain bg-black/40"
                />
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-12 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                    Evidencia de Ingeniería {selectedProject.type === 'video' ? '(Video HD)' : '(Imagen)'}
                  </span>
                  <h3 className="text-white font-black text-3xl md:text-5xl uppercase tracking-tighter">{selectedProject.alt}</h3>
                  <div className="w-24 h-1.5 bg-blue-600 mt-6 rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAdminLogin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-2xl bg-slate-950/60 text-white">
            <motion.div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl">
              <div className="text-center mb-8">
                <div className="bg-blue-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-500"><ShieldAlert size={32} /></div>
                <h3 className="font-black uppercase tracking-widest">Panel de Control Galería</h3>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-2xl bg-slate-950/90 text-white overflow-y-auto">
            <motion.div className="bg-slate-900 border border-white/10 w-full max-w-xl shadow-2xl rounded-3xl my-auto">
              <div className="flex justify-between items-center p-8 bg-slate-950/50 border-b border-white/5 sticky top-0 z-10 backdrop-blur-md">
                <h3 className="font-black uppercase tracking-widest flex items-center"><ImageIcon className="mr-3 text-blue-400" /> Nuevo Proyecto Galería</h3>
                <button onClick={() => setShowAddForm(false)} className="text-slate-500 hover:text-white transition-colors"><X /></button>
              </div>

              <form onSubmit={handleAddProject} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => setNewProject({ ...newProject, type: 'image' })} className={`py-4 rounded-xl border transition-all font-black text-[10px] uppercase tracking-widest ${newProject.type === 'image' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}>
                    Imagen
                  </button>
                  <button type="button" onClick={() => setNewProject({ ...newProject, type: 'video' })} className={`py-4 rounded-xl border transition-all font-black text-[10px] uppercase tracking-widest ${newProject.type === 'video' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}>
                    Video
                  </button>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Enlace de Google Drive / Nextcloud</label>
                  <input required type="url" value={newProject.src} onChange={(e) => setNewProject({ ...newProject, src: e.target.value })} placeholder="Copia el enlace de Drive o Nextcloud aquí..." className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-blue-500 transition-all outline-none" />
                </div>

                {newProject.src && newProject.type === 'image' && (
                  <div className="space-y-4">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Vista Previa</label>
                    <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 bg-black/40 relative">
                      <img
                        src={convertMediaUrl(newProject.src, 'image')}
                        alt="Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Descripción del Proyecto</label>
                  <input required type="text" value={newProject.alt} onChange={(e) => setNewProject({ ...newProject, alt: e.target.value })} placeholder="Ej: Instalación Meliá Punta Cana" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-blue-500 transition-all outline-none" />
                </div>

                <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20 text-[10px] text-blue-400 uppercase tracking-widest leading-relaxed flex items-start gap-3">
                  <div className="mt-0.5"><Zap size={10} /></div>
                  <p>Auto-Converter: El sistema transformará automáticamente tus enlaces de Drive o Nextcloud para que funcionen aquí.</p>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.4em] shadow-xl hover:bg-blue-500 transition-all flex items-center justify-center">
                  {isSubmitting ? <Loader2 className="animate-spin mr-3" /> : <Save className="mr-3" size={20} />}
                  Publicar en Galería
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;