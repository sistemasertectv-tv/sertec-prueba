import React from 'react';
import { motion } from 'framer-motion';
import { Network, Camera, Cable, Tv, Zap, Hammer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const values = [
    {
        icon: <Network className="w-3 h-3" />,
        title: "G-PON",
        desc: "Fibra Óptica",
        serviceTitle: "Red GPON",
        glowColor: "from-blue-600/40 to-cyan-500/40",
        hoverBg: "group-hover:bg-blue-600/10",
        iconColor: "text-blue-400"
    },
    {
        icon: <Camera className="w-3 h-3" />,
        title: "Seguridad",
        desc: "Cámaras IP",
        serviceTitle: "Cámaras de Seguridad",
        glowColor: "from-blue-600/40 to-cyan-500/40",
        hoverBg: "group-hover:bg-blue-600/10",
        iconColor: "text-blue-400"
    },
    {
        icon: <Cable className="w-3 h-3" />,
        title: "Infraestructura",
        desc: "Canalización",
        serviceTitle: "Canalización",
        glowColor: "from-blue-600/40 to-cyan-500/40",
        hoverBg: "group-hover:bg-blue-600/10",
        iconColor: "text-blue-400"
    },
    {
        icon: <Tv className="w-3 h-3" />,
        title: "TV Digital",
        desc: "Cabeceras IP",
        serviceTitle: "Red de Televisión",
        glowColor: "from-blue-600/40 to-cyan-500/40",
        hoverBg: "group-hover:bg-blue-600/10",
        iconColor: "text-blue-400"
    },
    {
        icon: <Zap className="w-3 h-3" />,
        title: "Red Eléctrica",
        desc: "Baja Tensión",
        serviceTitle: "Red Eléctrica",
        glowColor: "from-blue-600/40 to-cyan-500/40",
        hoverBg: "group-hover:bg-blue-600/10",
        iconColor: "text-blue-400"
    },
    {
        icon: <Hammer className="w-3 h-3" />,
        title: "Mantenimiento",
        desc: "Soporte 24/7",
        serviceTitle: "Mantenimiento",
        glowColor: "from-blue-600/40 to-cyan-500/40",
        hoverBg: "group-hover:bg-blue-600/10",
        iconColor: "text-blue-400"
    }
];

export const CompactValueRibbon: React.FC = () => {
    const navigate = useNavigate();

    const handleItemClick = (serviceTitle: string) => {
        navigate('/servicios', { state: { selectedServiceTitle: serviceTitle } });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative z-20 bg-slate-950 pt-2 pb-8 border-y border-white/5 transition-colors">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 xl:gap-10">
                    {values.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            whileHover={{
                                scale: 1.02,
                                y: -2,
                                transition: { duration: 0.2 }
                            }}
                            onClick={() => handleItemClick(item.serviceTitle)}
                            className="group relative cursor-pointer"
                        >
                            {/* Dynamic Glow Color */}
                            <div className={`absolute -inset-x-2 -inset-y-1 bg-gradient-to-r ${item.glowColor} rounded-xl blur-md opacity-0 group-hover:opacity-100 transition duration-300`}></div>

                            <div className="relative bg-slate-900/40 hover:bg-slate-900/80 transition-all duration-300 rounded-lg p-2.5 border border-white/5 flex items-center gap-3 shadow-lg">
                                {/* Dynamic Icon Background Color on Hover */}
                                <div className={`p-1.5 rounded-md bg-slate-800/50 ${item.iconColor} group-hover:scale-110 ${item.hoverBg} transition-all`}>
                                    {item.icon}
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-white font-black text-[8.5px] sm:text-[9px] tracking-tight uppercase truncate">
                                        {item.title}
                                    </span>
                                    <span className="text-blue-400 text-[8px] font-medium leading-none mt-1 truncate group-hover:text-blue-300 transition-colors duration-300">
                                        {item.desc}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
