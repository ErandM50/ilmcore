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
          width: '220%',
          height: '100%',
          background: `radial-gradient(ellipse 170% 110% at 50% 120%,
            rgba(251, 146, 60, 0.28) 0%,
            rgba(251, 146, 60, 0.22) 10%,
            rgba(254, 178, 108, 0.16) 22%,
            rgba(252, 165, 82, 0.12) 32%,
            rgba(251, 146, 60, 0.08) 44%,
            rgba(245, 124, 36, 0.04) 56%,
            transparent 76%)`,
        }}
      />

      {/* Bright orange core */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{
          opacity: isVisible ? [0.65, 0.9, 0.65] : 0,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: '110%',
          height: '60%',
          background: `radial-gradient(ellipse 110% 100% at 50% 100%,
            rgba(251, 146, 60, 0.42) 0%,
            rgba(249, 115, 22, 0.24) 18%,
            rgba(234, 88, 12, 0.16) 34%,
            transparent 64%)`,
        }}
      />

      {/* Warm yellow accent layer */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{
          opacity: isVisible ? [0.45, 0.6, 0.45] : 0,
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          width: '130%',
          height: '52%',
          background: `radial-gradient(ellipse 130% 100% at 50% 100%,
            rgba(254, 215, 170, 0.26) 0%,
            rgba(254, 202, 138, 0.18) 22%,
            rgba(252, 191, 73, 0.1) 42%,
            transparent 70%)`,
        }}
      />

      {/* Subtle purple/pink accent for depth */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{
          opacity: isVisible ? 0.22 : 0,
        }}
        transition={{
          duration: 2,
          delay: 0.5,
        }}
        style={{
          width: '190%',
          height: '42%',
          background: `radial-gradient(ellipse 160% 100% at 50% 100%,
            rgba(219, 39, 119, 0.08) 0%,
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
          background: 'linear-gradient(90deg, transparent 0%, rgba(251, 146, 60, 0.7) 20%, rgba(249, 115, 22, 0.9) 50%, rgba(251, 146, 60, 0.7) 80%, transparent 100%)',
          boxShadow: '0 0 18px rgba(251, 146, 60, 0.55), 0 0 36px rgba(249, 115, 22, 0.35), 0 0 70px rgba(234, 88, 12, 0.18)',
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
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">Platform</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">API</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-light text-white/60 mb-4 uppercase tracking-wider text-xs">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">About</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">Careers</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">Contact</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">News</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-light text-white/60 mb-4 uppercase tracking-wider text-xs">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">Documentation</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">Security</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-light text-white/60 mb-4 uppercase tracking-wider text-xs">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">Twitter</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">LinkedIn</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors font-extralight underline-offset-4 hover:underline">GitHub</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-7 h-7 rounded-md bg-gradient-to-b from-slate-900/20 to-slate-950/40 backdrop-blur flex items-center justify-center border border-white/[0.03]">
                  <div className="relative flex items-end justify-center space-x-[2.5px] h-[15px]">
                    {/* Bar 1 - tallest */}
                    <div
                      className="w-[1.2px] h-[15px] rounded-full"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.25))',
                      }}
                    ></div>
                    {/* Bar 2 */}
                    <div
                      className="w-[1.2px] h-[9px] rounded-full"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.2))',
                      }}
                    ></div>
                    {/* Bar 3 */}
                    <div
                      className="w-[1.2px] h-[12px] rounded-full"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.23))',
                      }}
                    ></div>
                    {/* Bar 4 - Book spine */}
                    <div
                      className="relative w-[1.5px] h-[7px] origin-bottom"
                      style={{
                        transform: 'skewX(10deg) translateY(-0.5px)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.65), rgba(255,255,255,0.4))',
                        borderRadius: '0 0.5px 0.5px 0',
                        boxShadow: 'inset -0.5px 0 0 rgba(255,255,255,0.08)',
                      }}
                    >
                      {/* Single subtle page line */}
                      <div className="absolute inset-x-0 top-[45%] h-px bg-black/8"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <span className="text-[16px] font-extralight text-white/90 tracking-[0.01em]">ilm</span>
                  <span className="text-[16px] font-thin text-white/50 tracking-[0.01em]">Core</span>
                </div>
              </div>

              <p className="text-sm font-extralight text-white/60">
                © 2025 ilmcore. Accelerating understanding through AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}