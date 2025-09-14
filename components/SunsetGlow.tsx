"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SunsetGlow() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-[500px] bg-slate-950 overflow-hidden">
      {/* Main orange/amber sunset gradient */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          width: '200%',
          height: '100%',
          background: `radial-gradient(ellipse 150% 100% at 50% 120%,
            rgba(251, 146, 60, 0.4) 0%,
            rgba(251, 146, 60, 0.3) 10%,
            rgba(254, 178, 108, 0.2) 20%,
            rgba(252, 165, 82, 0.15) 30%,
            rgba(251, 146, 60, 0.1) 40%,
            rgba(245, 124, 36, 0.05) 50%,
            transparent 70%)`,
        }}
      />

      {/* Bright orange core */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{
          opacity: isVisible ? [0.8, 1, 0.8] : 0,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: '100%',
          height: '60%',
          background: `radial-gradient(ellipse 100% 100% at 50% 100%,
            rgba(251, 146, 60, 0.5) 0%,
            rgba(249, 115, 22, 0.3) 15%,
            rgba(234, 88, 12, 0.2) 30%,
            transparent 60%)`,
        }}
      />

      {/* Warm yellow accent layer */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{
          opacity: isVisible ? [0.5, 0.7, 0.5] : 0,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          width: '120%',
          height: '50%',
          background: `radial-gradient(ellipse 120% 100% at 50% 100%,
            rgba(254, 215, 170, 0.3) 0%,
            rgba(254, 202, 138, 0.2) 20%,
            rgba(252, 191, 73, 0.1) 40%,
            transparent 70%)`,
        }}
      />

      {/* Subtle purple/pink accent for depth */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={{
          duration: 2,
          delay: 0.5,
        }}
        style={{
          width: '180%',
          height: '40%',
          background: `radial-gradient(ellipse 150% 100% at 50% 100%,
            rgba(219, 39, 119, 0.1) 0%,
            rgba(147, 51, 234, 0.05) 30%,
            transparent 60%)`,
        }}
      />

      {/* Bright horizon line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: isVisible ? 1 : 0, scaleX: isVisible ? 1 : 0 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(251, 146, 60, 0.8) 20%, rgba(249, 115, 22, 1) 50%, rgba(251, 146, 60, 0.8) 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(251, 146, 60, 0.6), 0 0 40px rgba(249, 115, 22, 0.4), 0 0 80px rgba(234, 88, 12, 0.2)',
        }}
      />

      {/* Footer content with navigation */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            {/* Products */}
            <div>
              <h4 className="font-light text-white/60 mb-4 uppercase tracking-wider text-xs">Products</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">Platform</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">API</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-light text-white/60 mb-4 uppercase tracking-wider text-xs">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">About</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">Careers</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">Contact</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">News</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-light text-white/60 mb-4 uppercase tracking-wider text-xs">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">Documentation</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">Privacy Policy</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">Security</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-light text-white/60 mb-4 uppercase tracking-wider text-xs">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">Twitter</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">LinkedIn</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight">GitHub</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur flex items-center justify-center shadow-lg border border-white/5">
                  <div className="flex justify-center items-end space-x-0.5 h-5">
                    <div className="w-0.5 h-2.5 bg-white/40 rounded-full"></div>
                    <div className="w-0.5 h-4 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-3 bg-white/50 rounded-full"></div>
                    <div className="w-0.5 h-5 bg-white/80 rounded-full"></div>
                  </div>
                </div>
                <span className="text-lg font-extralight text-white">ilmcore</span>
              </div>

              <p className="text-sm font-extralight text-white/60">
                © 2024 ilmcore. Accelerating understanding through AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}