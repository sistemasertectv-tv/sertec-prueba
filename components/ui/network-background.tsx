"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface Point {
    x: number;
    y: number;
    vx: number;
    vy: number;
    originalX: number;
    originalY: number;
}

interface NetworkBackgroundProps {
    className?: string;
    nodeColor?: string;
    lineColor?: string;
    particleCount?: number;
    connectionDistance?: number;
}

export const NetworkBackground: React.FC<NetworkBackgroundProps> = ({
    className,
    nodeColor = "rgba(56, 189, 248, 0.5)",
    lineColor = "rgba(56, 189, 248, 0.15)",
    particleCount = 80,
    connectionDistance = 150,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const pointsRef = useRef<Point[]>([]);
    const animationFrameRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initPoints();
        };

        const initPoints = () => {
            const points: Point[] = [];
            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                points.push({
                    x,
                    y,
                    originalX: x,
                    originalY: y,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                });
            }
            pointsRef.current = points;
        };

        const draw = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const points = pointsRef.current;
            const mouse = mouseRef.current;
            const time = Date.now() * 0.001;
            const globalPulse = Math.sin(time * 2) * 0.5 + 0.5; // Pulse between 0 and 1

            // Update and draw points
            points.forEach((p, i) => {
                // Movement
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse interaction - subtle attraction
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 250) {
                    p.x += dx * 0.01;
                    p.y += dy * 0.01;
                }

                // Draw point with pulse
                const pointPulse = Math.sin(time * 3 + i) * 0.3 + 0.7;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5 * pointPulse, 0, Math.PI * 2);
                ctx.fillStyle = nodeColor.replace("0.4", (0.4 * pointPulse).toFixed(2));
                ctx.fill();

                // Draw lines between points
                for (let j = i + 1; j < points.length; j++) {
                    const p2 = points[j];
                    const ldx = p.x - p2.x;
                    const ldy = p.y - p2.y;
                    const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

                    if (ldist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);

                        // Brighten line near mouse
                        const midX = (p.x + p2.x) / 2;
                        const midY = (p.y + p2.y) / 2;
                        const mdx = mouse.x - midX;
                        const mdy = mouse.y - midY;
                        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

                        // Base opacity with distance decay
                        let opacity = (1 - ldist / connectionDistance) * 0.4;

                        // Add rhythmic pulse to the line
                        const linePulse = Math.sin(time * 2 + (i + j) * 0.5) * 0.2 + 0.8;
                        opacity *= linePulse;

                        if (mdist < 200) {
                            opacity *= (1 + (1 - mdist / 200) * 2.5);
                        }

                        ctx.strokeStyle = lineColor.replace("0.1", opacity.toFixed(2));
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            });

            animationFrameRef.current = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [particleCount, connectionDistance, nodeColor, lineColor]);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            className={cn("absolute inset-0 pointer-events-none", className)}
        />
    );
};
