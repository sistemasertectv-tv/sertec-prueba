import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ShootingStars } from './shooting-stars';
import { NetworkBackground } from './network-background';

export const HeroTextEffect: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Reset to center
        setMousePosition({
            x: rect.width / 2,
            y: rect.height / 2,
        });
    };

    const mouseXSpring = useSpring(mousePosition.x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(mousePosition.y, { stiffness: 100, damping: 20 });

    useEffect(() => {
        // Initialize position on mount
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
                x: rect.width / 2,
                y: rect.height / 2,
            });
        }
    }, []);

    useEffect(() => {
        mouseXSpring.set(mousePosition.x);
        mouseYSpring.set(mousePosition.y);
    }, [mousePosition, mouseXSpring, mouseYSpring]);

    const spotlightX = useTransform(mouseXSpring, (val) => `${val}px`);
    const spotlightY = useTransform(mouseYSpring, (val) => `${val}px`);

    // Normalized Rotation for 3D Effect (Subtle tilt)
    const rotateX = useTransform(mouseYSpring, (val) => {
        if (!containerRef.current) return 0;
        const center = containerRef.current.offsetHeight / 2;
        return ((val - center) / center) * -10; // Max 10deg tilt
    });

    const rotateY = useTransform(mouseXSpring, (val) => {
        if (!containerRef.current) return 0;
        const center = containerRef.current.offsetWidth / 2;
        return ((val - center) / center) * 15; // Max 15deg tilt
    });

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-4"
            style={{ perspective: "1000px" }}
        >
            {/* Ambient Deep Navy Glow */}
            <div className="absolute inset-0 bg-[#020617]">
                {/* Dynamic Spotlight */}
                <motion.div
                    className="absolute w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"
                    style={{
                        left: spotlightX,
                        top: spotlightY,
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                {/* Constant Ambient Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[100px]" />
            </div>

            {/* MAIN BACKGROUND: Neural Connectivity Network */}
            <NetworkBackground
                nodeColor="rgba(56, 189, 248, 0.4)"
                lineColor="rgba(56, 189, 248, 0.1)"
                particleCount={100}
                connectionDistance={180}
            />

            {/* SECONDARY BACKGROUND: Meteors as Data Pulses */}
            <ShootingStars
                starColor="#0ea5e9"
                trailColor="#0284c7"
                minSpeed={20}
                maxSpeed={40}
                minDelay={800}
                maxDelay={2500}
                starWidth={15}
                starHeight={1.5}
                className="opacity-30"
            />

            <div className="relative z-10 flex flex-col items-center select-none transform-style-3d">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 animate-gradient-flow bg-[length:200%_200%] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        SERTEC
                        <span className="sr-only"> - Telecomunicaciones e Infraestructura de Redes</span>
                        {/* Advanced Metallic Shine Sweep */}
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none mix-blend-overlay"
                            animate={{
                                x: ['-150%', '250%'],
                                opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut",
                                repeatDelay: 3
                            }}
                        />
                        {/* Secondary subtle light line */}
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent pointer-events-none"
                            animate={{
                                x: ['-200%', '300%'],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 6,
                                ease: "linear",
                                repeatDelay: 1
                            }}
                        />
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5, z: -100 }}
                    animate={{ opacity: 1, scale: 1, z: 0 }}
                    transition={{
                        delay: 0.8,
                        duration: 1.2,
                        ease: "easeOut"
                    }}
                    style={{
                        transformStyle: "preserve-3d"
                    }}
                    className="mt-10 text-center space-y-8 max-w-4xl"
                >
                    <motion.div className="space-y-1">
                        <motion.p
                            className="text-lg md:text-2xl font-bold uppercase tracking-[0.3em] px-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-100 to-blue-400 animate-gradient-flow bg-[length:200%_200%]"
                        >
                            CONECTIVIDAD SIN FRONTERAS
                        </motion.p>
                        {/* Decorative underline moved here for better visual flow */}
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "80px", opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="h-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full mx-auto shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                        />
                    </motion.div>

                    <div className="space-y-3 pt-4">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                            className="text-white text-base md:text-xl font-semibold tracking-[0.2em] uppercase"
                        >
                            INFRAESTRUCTURA DE CLASE MUNDIAL
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 0.8 }}
                            className="text-slate-400 text-sm md:text-xl font-light max-w-4xl mx-auto leading-[1.8] px-4 italic tracking-wide"
                        >
                            Especialista en instalación de cámaras, cableado estructurado UTP y Fibra Óptica; experto en centros de monitoreo y cabeceras IP de televisión.
                        </motion.p>
                    </div>
                </motion.div>
            </div>

            {/* Floating Bokeh Effect (Re-imagined for Fiber feel) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-12 bg-gradient-to-t from-transparent via-blue-400/30 to-transparent blur-[1px]"
                        animate={{
                            y: [400, -200],
                            opacity: [0, 0.4, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: `-10%`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
