"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Fixed crystal positions to avoid hydration mismatch
const CRYSTALS = [
  { id: 0, x: 15, y: 25, size: 250, rotation: 45, opacity: 0.05 },
  { id: 1, x: 70, y: 15, size: 180, rotation: 120, opacity: 0.07 },
  { id: 2, x: 85, y: 65, size: 220, rotation: 200, opacity: 0.04 },
  { id: 3, x: 30, y: 70, size: 200, rotation: 280, opacity: 0.06 },
  { id: 4, x: 50, y: 45, size: 300, rotation: 160, opacity: 0.03 },
  { id: 5, x: 65, y: 85, size: 160, rotation: 320, opacity: 0.08 },
];

export default function CrystalStructures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [isMounted]);

  const calculateDistortion = (crystalX: number, crystalY: number) => {
    if (!isMounted) return 0;
    const distance = Math.sqrt(
      Math.pow(mousePos.x - crystalX, 2) + Math.pow(mousePos.y - crystalY, 2)
    );
    const maxDistance = 30;
    const distortion = Math.max(0, 1 - distance / maxDistance);
    return distortion;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 via-transparent to-purple-950/20"></div>

      {/* Crystal structures */}
      {CRYSTALS.map((crystal) => {
        const distortion = calculateDistortion(crystal.x, crystal.y);
        const scale = 1 + distortion * 0.2;
        const brightness = 1 + distortion * 0.5;

        return (
          <div
            key={crystal.id}
            className="absolute"
            style={{
              left: `${crystal.x}%`,
              top: `${crystal.y}%`,
              width: crystal.size,
              height: crystal.size,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {isMounted && (
              <motion.div
                className="w-full h-full"
                animate={{
                  scale,
                  filter: `brightness(${brightness})`,
                  rotate: crystal.rotation + distortion * 10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                {/* Crystal shape with gradients */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${45 + crystal.rotation}deg,
                      rgba(99, 102, 241, ${crystal.opacity}) 0%,
                      rgba(139, 92, 246, ${crystal.opacity * 0.8}) 25%,
                      rgba(59, 130, 246, ${crystal.opacity * 0.6}) 50%,
                      transparent 75%)`,
                    clipPath: "polygon(50% 0%, 80% 20%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)",
                    filter: "blur(1px)",
                  }}
                />

                {/* Inner glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at center,
                      rgba(168, 85, 247, ${crystal.opacity * 0.5}) 0%,
                      transparent 70%)`,
                    transform: "scale(0.6)",
                    filter: "blur(20px)",
                  }}
                />
              </motion.div>
            )}
          </div>
        );
      })}

      {/* Subtle animated light beams */}
      <div className="absolute inset-0">
        <div
          className="absolute w-px h-full left-1/4 bg-gradient-to-b from-transparent via-indigo-500/10 to-transparent animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute w-px h-full left-2/3 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "1s" }}
        />
        <div
          className="absolute w-full h-px top-1/3 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "2s" }}
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
}