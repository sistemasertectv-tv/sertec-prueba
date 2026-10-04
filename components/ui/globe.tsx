import React from "react";

const Globe: React.FC = () => {
    return (
        <>
            <style>
                {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 700px 0; }
          }
          @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
        `}
            </style>
            <div className="flex items-center justify-center h-full w-full py-10">
                <div
                    className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.2),-10px_0_15px_#c3f4ff_inset,25px_4px_45px_#000_inset,-40px_-4px_60px_#c3f4ff99_inset,480px_0_80px_#00000066_inset,280px_0_70px_#000000aa_inset] transition-all duration-700"
                    style={{
                        backgroundImage: "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "left",
                        animation: "earthRotate 40s linear infinite",
                    }}
                >
                    {/* Stars */}
                    <div
                        className="absolute left-[-20px] w-1 h-1 bg-white rounded-full"
                        style={{ animation: "twinkling 3s infinite" }}
                    />
                    <div
                        className="absolute left-[-40px] top-[30px] w-1 h-1 bg-white rounded-full"
                        style={{ animation: "twinkling-slow 2s infinite" }}
                    />
                    <div
                        className="absolute left-[350px] top-[90px] w-1 h-1 bg-white rounded-full"
                        style={{ animation: "twinkling-long 4s infinite" }}
                    />
                    <div
                        className="absolute left-[200px] top-[290px] w-1 h-1 bg-white rounded-full"
                        style={{ animation: "twinkling 3s infinite" }}
                    />
                    <div
                        className="absolute left-[50px] top-[270px] w-1 h-1 bg-white rounded-full"
                        style={{ animation: "twinkling-fast 1.5s infinite" }}
                    />
                    <div
                        className="absolute left-[250px] top-[-50px] w-1 h-1 bg-white rounded-full"
                        style={{ animation: "twinkling-long 4s infinite" }}
                    />
                    <div
                        className="absolute left-[290px] top-[60px] w-1 h-1 bg-white rounded-full"
                        style={{ animation: "twinkling-slow 2s infinite" }}
                    />
                </div>
            </div>
        </>
    );
};

export default Globe;
