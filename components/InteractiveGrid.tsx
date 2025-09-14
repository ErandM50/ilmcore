"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", () => setIsHovering(true));
      container.addEventListener("mouseleave", () => setIsHovering(false));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", () => setIsHovering(true));
        container.removeEventListener("mouseleave", () => setIsHovering(false));
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-dark animate-grid-move"></div>

      {/* Interactive gradient that follows mouse */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        animate={{
          x: mousePos.x - 192,
          y: mousePos.y - 192,
          opacity: isHovering ? 0.15 : 0,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Subtle animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-3/4 left-3/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "4s" }}></div>
    </div>
  );
}