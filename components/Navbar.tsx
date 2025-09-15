"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-slate-900/30 to-slate-950/50 backdrop-blur flex items-center justify-center border border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-500">
                <div className="relative flex items-end justify-center space-x-[3px] h-[18px]">
                  {/* Bar 1 - tallest */}
                  <div
                    className="w-[1.5px] h-[18px] rounded-full transition-all duration-500 group-hover:h-[16px]"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.3))',
                    }}
                  ></div>
                  {/* Bar 2 */}
                  <div
                    className="w-[1.5px] h-[11px] rounded-full transition-all duration-500 group-hover:h-[13px]"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.25))',
                    }}
                  ></div>
                  {/* Bar 3 */}
                  <div
                    className="w-[1.5px] h-[14px] rounded-full transition-all duration-500 group-hover:h-[15px]"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.28))',
                    }}
                  ></div>
                  {/* Bar 4 - Book spine */}
                  <div
                    className="relative w-[2px] h-[9px] origin-bottom transition-all duration-500 group-hover:h-[10px]"
                    style={{
                      transform: 'skewX(10deg) translateY(-0.5px)',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.75), rgba(255,255,255,0.5))',
                      borderRadius: '0 1px 1px 0',
                      boxShadow: 'inset -0.5px 0 0 rgba(255,255,255,0.1), 0.5px 0 1px rgba(0,0,0,0.2)',
                    }}
                  >
                    {/* Single page line for minimal look */}
                    <div className="absolute inset-x-0 top-[40%] h-px bg-black/10"></div>
                    {/* Book edge glow */}
                    <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-[17px] font-extralight text-white/95 tracking-[0.01em] group-hover:text-white transition-colors duration-500">ilm</span>
              <span className="text-[17px] font-thin text-white/60 tracking-[0.01em] group-hover:text-white/80 transition-colors duration-500">Core</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-9">
            <a
              href="#mission"
              className="text-[13px] md:text-sm font-light text-white/70 hover:text-white transition-colors tracking-wide"
            >
              Mission
            </a>
            <a
              href="#about"
              className="text-[13px] md:text-sm font-light text-white/70 hover:text-white transition-colors tracking-wide"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-[13px] md:text-sm font-light text-white/70 hover:text-white transition-colors tracking-wide"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <a href="#contact" className="px-8 py-2.5 bg-white/5 backdrop-blur text-white text-sm font-thin rounded-full border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300 tracking-wider" aria-label="Request a demo via contact section">
            Request Demo
          </a>
        </div>
      </div>
    </motion.nav>
  );
}