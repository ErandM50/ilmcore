"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Neuron {
  id: number;
  x: number;
  y: number;
  connections: number[];
  pulseDelay: number;
}

interface Pulse {
  id: string;
  from: number;
  to: number;
  progress: number;
  startTime: number;
}

// Generate fixed neuron positions using deterministic algorithm
const generateNeurons = (countOverride?: number): Neuron[] => {
  const neurons: Neuron[] = [];
  const gridSize = 8;
  const spread = 12;

  const total = typeof countOverride === 'number' ? countOverride : 25;

  for (let i = 0; i < total; i++) {
    const gridX = (i % gridSize) * spread + (Math.floor(i / gridSize) % 2) * (spread / 2);
    const gridY = Math.floor(i / gridSize) * spread;

    // Add some deterministic variation
    const offsetX = ((i * 13) % 7) - 3;
    const offsetY = ((i * 17) % 5) - 2;

    neurons.push({
      id: i,
      x: 15 + gridX + offsetX,
      y: 20 + gridY + offsetY,
      connections: [],
      pulseDelay: (i * 0.3) % 4,
    });
  }

  // Create connections between nearby neurons
  neurons.forEach((neuron, i) => {
    neurons.forEach((other, j) => {
      if (i !== j) {
        const distance = Math.sqrt(
          Math.pow(neuron.x - other.x, 2) + Math.pow(neuron.y - other.y, 2)
        );
        if (distance < 20 && neuron.connections.length < 2) {
          neuron.connections.push(j);
        }
      }
    });
  });

  return neurons;
};

export default function NeuralNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isMounted, setIsMounted] = useState(false);
  const [activeNeuron, setActiveNeuron] = useState<number | null>(null);
  const [pulses, setPulses] = useState<Pulse[]>([]);

  const isCoarsePointer = useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches, []);
  const prefersReducedMotion = useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  const neurons = useMemo(() => generateNeurons(isCoarsePointer || prefersReducedMotion ? 16 : 25), [isCoarsePointer, prefersReducedMotion]);
  const animationRef = useRef<number>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });

        if (!isCoarsePointer) {
          // Find nearest neuron to mouse
          let nearestNeuron: number | null = null;
          let minDistance = 16; // increase capture radius slightly

          neurons.forEach((neuron) => {
            const distance = Math.sqrt(
              Math.pow(x - neuron.x, 2) + Math.pow(y - neuron.y, 2)
            );
            if (distance < minDistance) {
              minDistance = distance;
              nearestNeuron = neuron.id;
            }
          });

          setActiveNeuron(nearestNeuron);
        }
      }
    };

    const onMouseLeave = () => setActiveNeuron(null);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [isMounted, neurons, isCoarsePointer, prefersReducedMotion]);

  // Animate pulses along connections
  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return;

    let lastSpawn = 0;
    const spawnInterval = isCoarsePointer ? 1600 : 1200; // slower firing by default
    const maxPulses = isCoarsePointer ? 4 : 6; // fewer concurrent pulses

    const animatePulses = () => {
      const now = Date.now();

      // Add new pulses with throttling
      if (now - lastSpawn > spawnInterval && pulses.length < maxPulses) {
        lastSpawn = now;
        const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
        if (randomNeuron.connections.length > 0) {
          const targetId = randomNeuron.connections[
            Math.floor(Math.random() * randomNeuron.connections.length)
          ];

          setPulses(prev => [...prev, {
            id: `${randomNeuron.id}-${targetId}-${now}`,
            from: randomNeuron.id,
            to: targetId,
            progress: 0,
            startTime: now,
          }]);
        }
      }

      // Update existing pulses
      setPulses(prev => prev
        .map(pulse => ({
          ...pulse,
          progress: Math.min((now - pulse.startTime) / 1100, 1),
        }))
        .filter(pulse => pulse.progress < 1)
      );

      animationRef.current = requestAnimationFrame(animatePulses);
    };

    animationRef.current = requestAnimationFrame(animatePulses);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMounted, neurons, pulses.length, isCoarsePointer, prefersReducedMotion]);

  useEffect(() => {
    // Pause animation and effects when tab is hidden
    const handleVisibility = () => {
      if (document.hidden && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      } else if (!prefersReducedMotion) {
        animationRef.current = requestAnimationFrame(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [prefersReducedMotion]);

  const getConnectionOpacity = (from: number, to: number) => {
    if (activeNeuron === from || activeNeuron === to) return 0.75;
    return 0.08;
  };

  const getNeuronScale = (neuronId: number) => {
    if (activeNeuron === neuronId) return 1.35;
    if (activeNeuron !== null && neurons[activeNeuron]?.connections.includes(neuronId)) return 1.15;
    return 1;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/10 via-transparent to-purple-950/10"></div>

      {/* Soft global blur to reduce sharpness */}
      <div className="absolute inset-0" style={{ filter: 'blur(0.5px)' }} />

      {/* Neural network visualization */}
      {isMounted && !prefersReducedMotion && (
        <svg className="absolute inset-0 w-full h-full">
          {/* Connections */}
          {neurons.map((neuron) =>
            neuron.connections.map((targetId) => {
              const target = neurons[targetId];
              if (!target) return null;

              const isActive = activeNeuron === neuron.id || activeNeuron === targetId;

              return (
                <motion.line
                  key={`${neuron.id}-${targetId}`}
                  x1={`${neuron.x}%`}
                  y1={`${neuron.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="rgba(99, 102, 241, 0.2)"
                  strokeWidth={0.35}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: getConnectionOpacity(neuron.id, targetId),
                    stroke: isActive
                      ? "rgba(139, 92, 246, 0.7)"
                      : "rgba(99, 102, 241, 0.2)",
                    strokeWidth: isActive ? 0.7 : 0.35,
                  }}
                  transition={{ duration: 0.2 }}
                />
              );
            })
          )}

          {/* Pulses */}
          {pulses.map((pulse) => {
            const from = neurons[pulse.from];
            const to = neurons[pulse.to];
            if (!from || !to) return null;

            const x = from.x + (to.x - from.x) * pulse.progress;
            const y = from.y + (to.y - from.y) * pulse.progress;

            return (
              <circle
                key={pulse.id}
                cx={`${x}%`}
                cy={`${y}%`}
                r="1.8"
                fill="rgba(168, 85, 247, 0.75)"
                opacity={1 - pulse.progress * 0.5}
              >
                <animate
                  attributeName="r"
                  values="1.8;3;1.8"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}

          {/* Neurons */}
          {neurons.map((neuron) => (
            <motion.g key={neuron.id}>
              {/* Outer glow */}
              <motion.circle
                cx={`${neuron.x}%`}
                cy={`${neuron.y}%`}
                r="7"
                fill="rgba(139, 92, 246, 0.08)"
                initial={{ scale: 0 }}
                animate={{
                  scale: getNeuronScale(neuron.id),
                  opacity: activeNeuron === neuron.id ? 0.25 : 0.08
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Inner neuron */}
              <motion.circle
                cx={`${neuron.x}%`}
                cy={`${neuron.y}%`}
                r="2.6"
                fill="rgba(99, 102, 241, 0.45)"
                initial={{ scale: 0 }}
                animate={{
                  scale: getNeuronScale(neuron.id),
                  fill: activeNeuron === neuron.id
                    ? "rgba(168, 85, 247, 0.75)"
                    : "rgba(99, 102, 241, 0.45)"
                }}
                transition={{
                  duration: 0.3,
                  delay: neuron.pulseDelay,
                }}
              >
                <animate
                  attributeName="opacity"
                  values="0.5;0.75;0.5"
                  dur={`${3 + neuron.pulseDelay}s`}
                  repeatCount="indefinite"
                />
              </motion.circle>

              {/* Core */}
              <circle
                cx={`${neuron.x}%`}
                cy={`${neuron.y}%`}
                r="0.9"
                fill="rgba(255, 255, 255, 0.8)"
              />
            </motion.g>
          ))}
        </svg>
      )}

      {/* Mouse glow effect */}
      {isMounted && !prefersReducedMotion && (
        <motion.div
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          animate={{
            x: mousePos.x * (containerRef.current?.offsetWidth || 0) / 100 - 128,
            y: mousePos.y * (containerRef.current?.offsetHeight || 0) / 100 - 128,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
          }}
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}

      {/* Edge fades for blending */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-slate-950 to-transparent"></div>
    </div>
  );
}