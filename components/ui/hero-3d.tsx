import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import * as THREE from 'three';

function StarField(props: any) {
    const ref = useRef<any>(null);
    const [sphere] = useState(() => {
        const coords = new Float32Array(1200 * 3);
        for (let i = 0; i < 1200; i++) {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 1.2 + Math.random() * 0.5; // Radius between 1.2 and 1.7
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);
            coords[i * 3] = x;
            coords[i * 3 + 1] = y;
            coords[i * 3 + 2] = z;
        }
        return coords;
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

function ConnectivityLines() {
    // Simple rotating aesthetic rings/lines
    const ref = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.z += delta * 0.05;
            ref.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <group ref={ref}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.002, 16, 100]} />
                <meshBasicMaterial color="#60a5fa" transparent opacity={0.3} />
            </mesh>
            <mesh rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[1.8, 0.002, 16, 100]} />
                <meshBasicMaterial color="#93c5fd" transparent opacity={0.2} />
            </mesh>
        </group>
    )
}

export const Hero3D = () => {
    return (
        <div className="relative w-full h-full bg-slate-950 overflow-hidden">
            {/* 3D Scene */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 2.5] }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                    <ambientLight intensity={0.5} />
                    <StarField />
                    <ConnectivityLines />
                </Canvas>
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center px-4 max-w-4xl mx-auto"
                >
                    <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tight sm:tracking-tighter drop-shadow-2xl">
                        SERTEC
                        <span className="sr-only"> | Infraestructura de Telecomunicaciones, Fibra Óptica GPON y Seguridad para Hoteles en República Dominicana</span>
                    </h1>
                    <div className="h-1 w-20 sm:w-28 md:w-32 bg-blue-600 mx-auto my-4 sm:my-6 rounded-full shadow-[0_0_20px_rgba(37,99,235,1)]" />
                    <p className="font-sans text-sm sm:text-lg md:text-2xl text-blue-100 tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.3em] font-black uppercase">
                        Conectividad Sin Fronteras
                    </p>
                    <p className="mt-2 sm:mt-3 font-sans text-[11px] sm:text-xs md:text-sm text-slate-400 font-medium tracking-[0.2em] uppercase">
                        Infraestructura de Grado Hotelero & Industrial
                    </p>

                    {/* Botones de Acción Adaptados a Teléfono, Tablet y Computadora */}
                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pointer-events-auto w-full max-w-xs sm:max-w-none mx-auto">
                        <Link
                            to="/contacto"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-black text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-full shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all transform hover:scale-105 w-full sm:w-auto text-center"
                        >
                            <span>Solicitar Cotización Gratuita</span>
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            to="/proyectos"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/15 hover:border-blue-500/50 font-bold text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-full transition-all backdrop-blur-md w-full sm:w-auto text-center"
                        >
                            <span>Ver Nuestros Proyectos</span>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Vignette - Original deep dark */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,23,0.8)_100%)]" />
        </div>
    );
};
