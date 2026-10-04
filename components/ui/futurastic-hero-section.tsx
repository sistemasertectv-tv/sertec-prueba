import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import {
    useMotionTemplate,
    useMotionValue,
    motion,
    animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
    const color = useMotionValue(COLORS_TOP[0]);

    useEffect(() => {
        animate(color, COLORS_TOP, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
        });
    }, [color]);

    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
    const border = useMotionTemplate`1px solid ${color}`;
    const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

    return (
        <motion.section
            style={{
                backgroundImage,
            }}
            className="relative grid h-[60vh] md:h-[50vh] place-content-center overflow-hidden bg-slate-950 px-4 py-12 text-gray-200"
        >
            <div className="relative z-10 flex flex-col items-center select-none">
                <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-6xl font-black leading-tight text-transparent sm:text-7xl md:text-9xl tracking-tighter">
                    SERTEC
                </h1>

                <motion.div
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.4em" }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-4 mb-8"
                >
                    <p className="text-sm md:text-base font-bold text-blue-400/80 uppercase tracking-[0.4em] text-center">
                        Conectividad sin fronteras
                    </p>
                </motion.div>

                <motion.button
                    style={{
                        border,
                        boxShadow,
                    }}
                    whileHover={{
                        scale: 1.05,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    onClick={() => {
                        const el = document.getElementById('soluciones');
                        el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative flex w-fit items-center gap-1.5 rounded-full bg-slate-950/20 px-6 py-3 text-gray-50 transition-colors hover:bg-slate-950/50 font-bold uppercase tracking-widest text-xs"
                >
                    Explorar Servicios
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
            </div>

            <div className="absolute inset-0 z-0">
                <Canvas>
                    <Stars radius={50} count={2500} factor={4} fade speed={2} />
                </Canvas>
            </div>
        </motion.section>
    );
};
