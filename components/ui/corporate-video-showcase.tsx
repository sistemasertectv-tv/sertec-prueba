import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, Video, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoOption {
  id: string;
  title: string;
  badge: string;
  src: string;
  description: string;
}

const videoSources: VideoOption[] = [
  {
    id: 'institutional',
    title: 'Video Institucional SERTEC (60s)',
    badge: 'Producción en Código Remotion • 4K',
    src: 'https://res.cloudinary.com/dgjnnstkd/video/upload/v1785089766/video_sertectv_remotion_60s_qr2ksa.mp4',
    description: 'Resumen corporativo de nuestros 15 años de liderazgo en fibra óptica GPON, videovigilancia AI y telecomunicaciones hoteleras.'
  },
  {
    id: 'field',
    title: 'Evidencia Técnica en Complejos Hoteleros',
    badge: 'Showcase en Vivo • Punta Cana & Bávaro',
    src: 'https://res.cloudinary.com/dgjnnstkd/video/upload/v1767567217/video2525_whrlyr.mp4',
    description: 'Muestra real de despliegue de cableado estructurado, cuartos de datos IDF/MDF y cámaras de seguridad en operación.'
  }
];

export const CorporateVideoShowcase: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoOption>(videoSources[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Fondo de resplandor ambiental */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado Principal de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
            <Video className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-blue-400">
              Evidencia Audiovisual en Alta Fidelidad
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Ingeniería SERTEC <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400">en Movimiento</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mt-3 mb-4" />
          <p className="text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Compruebe la precisión milimétrica de nuestras instalaciones y la tecnología que respalda a las cadenas hoteleras más exigentes del país.
          </p>

          {/* Selector de Videos: Institucional Remotion vs Evidencia en Campo */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:gap-4 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 w-fit mx-auto backdrop-blur-md">
            {videoSources.map((v) => {
              const isActive = selectedVideo.id === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVideo(v);
                    setIsPlaying(true);
                  }}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-cyan-300 animate-pulse' : 'bg-slate-600'}`} />
                  <span>{v.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reproductor de Video Cinematográfico */}
        <motion.div
          key={selectedVideo.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Marco con borde de alta tecnología */}
          <div className="relative rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden border border-white/15 bg-slate-900/80 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] group">
            {/* Barra Superior de Estado */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950/90 border-b border-white/10">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-slate-200">
                  {selectedVideo.badge}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-blue-400 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Certificación Técnica SERTEC</span>
              </div>
            </div>

            {/* Video Container 16:9 */}
            <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                key={selectedVideo.src}
                src={selectedVideo.src}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Botón flotante central de Play/Pause en hover o cuando está pausado */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
                className={`absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600/85 hover:bg-blue-500 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl transition-all transform hover:scale-110 active:scale-95 z-20 ${
                  isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 scale-105'
                }`}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} className="translate-x-0.5" fill="currentColor" />}
              </button>

              {/* Barra de Controles Inferior Integrada */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex items-center justify-between z-20">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                    title={isPlaying ? "Pausar" : "Reproducir"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md flex items-center gap-2 text-xs font-bold"
                    title={isMuted ? "Activar Audio" : "Silenciar"}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX size={16} className="text-red-400" />
                        <span className="hidden sm:inline text-[11px] text-slate-300">Activar Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={16} className="text-emerald-400" />
                        <span className="hidden sm:inline text-[11px] text-slate-300">Audio Activo</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
                    title="Pantalla Completa"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Pie de Información del Video */}
            <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-300 text-center sm:text-left leading-relaxed">
                {selectedVideo.description}
              </p>

              <div className="flex items-center gap-3 flex-shrink-0">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95"
                >
                  <span>Cotizar Proyecto</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
