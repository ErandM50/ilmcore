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
const generateNeurons = (): Neuron[] => {
  const neurons: Neuron[] = [];
  const gridSize = 8;
  const spread = 12;

  for (let i = 0; i < 25; i++) {
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
        if (distance < 20 && neuron.connections.length < 3) {
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
  const neurons = useMemo(() => generateNeurons(), []);
  const animationRef = useRef<number>();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });

        // Find nearest neuron to mouse
        let nearestNeuron = null;
        let minDistance = 15; // Threshold distance

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
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", () => setActiveNeuron(null));
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", () => setActiveNeuron(null));
      }
    };
  }, [isMounted, neurons]);

  // Animate pulses along connections
  useEffect(() => {
    if (!isMounted) return;

    const animatePulses = () => {
      const now = Date.now();

      // Add new pulses periodically
      if (Math.random() < 0.02 && pulses.length < 10) {
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
          progress: Math.min((now - pulse.startTime) / 1000, 1),
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
  }, [isMounted, neurons, pulses.length]);

  const getConnectionOpacity = (from: number, to: number) => {
    if (activeNeuron === from || activeNeuron === to) return 0.6;
    return 0.15;
  };

  const getNeuronScale = (neuronId: number) => {
    if (activeNeuron === neuronId) return 1.5;
    if (activeNeuron !== null && neurons[activeNeuron]?.connections.includes(neuronId)) return 1.2;
    return 1;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/10 via-transparent to-purple-950/10"></div>

      {/* Neural network visualization */}
      {isMounted && (
        <svg className="absolute inset-0 w-full h-full">
          {/* Connections */}
          {neurons.map((neuron) =>
            neuron.connections.map((targetId) => {
              const target = neurons[targetId];
              if (!target) return null;

              return (
                <motion.line
                  key={`${neuron.id}-${targetId}`}
                  x1={`${neuron.x}%`}
                  y1={`${neuron.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke="rgba(99, 102, 241, 0.3)"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: getConnectionOpacity(neuron.id, targetId),
                    stroke: activeNeuron === neuron.id || activeNeuron === targetId
                      ? "rgba(139, 92, 246, 0.5)"
                      : "rgba(99, 102, 241, 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
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
                r="2"
                fill="rgba(168, 85, 247, 0.8)"
                opacity={1 - pulse.progress * 0.5}
              >
                <animate
                  attributeName="r"
                  values="2;4;2"
                  dur="0.5s"
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
                r="8"
                fill="rgba(139, 92, 246, 0.1)"
                initial={{ scale: 0 }}
                animate={{
                  scale: getNeuronScale(neuron.id),
                  opacity: activeNeuron === neuron.id ? 0.3 : 0.1
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Inner neuron */}
              <motion.circle
                cx={`${neuron.x}%`}
                cy={`${neuron.y}%`}
                r="3"
                fill="rgba(99, 102, 241, 0.5)"
                initial={{ scale: 0 }}
                animate={{
                  scale: getNeuronScale(neuron.id),
                  fill: activeNeuron === neuron.id
                    ? "rgba(168, 85, 247, 0.8)"
                    : "rgba(99, 102, 241, 0.5)"
                }}
                transition={{
                  duration: 0.3,
                  delay: neuron.pulseDelay,
                }}
              >
                <animate
                  attributeName="opacity"
                  values="0.5;0.8;0.5"
                  dur={`${3 + neuron.pulseDelay}s`}
                  repeatCount="indefinite"
                />
              </motion.circle>

              {/* Core */}
              <circle
                cx={`${neuron.x}%`}
                cy={`${neuron.y}%`}
                r="1"
                fill="rgba(255, 255, 255, 0.8)"
              />
            </motion.g>
          ))}
        </svg>
      )}

      {/* Mouse glow effect */}
      {isMounted && (
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
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
}