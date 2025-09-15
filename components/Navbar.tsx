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
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur flex items-center justify-center shadow-xl border border-white/5">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
                <svg className="relative w-6 h-6 drop-shadow-[0_0_8px_rgba(139,92,246,0.35)]" viewBox="0 0 24 24" aria-hidden="true">
                  <defs>
                    <linearGradient id="logoBars" x1="0" y1="0" x2="0" y2="24">
                      <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>
                  <rect x="5.5" y="9" width="1.6" height="6" rx="0.8" fill="url(#logoBars)" />
                  <rect x="9.5" y="6" width="1.6" height="9" rx="0.8" fill="url(#logoBars)" />
                  <rect x="13.5" y="8" width="1.6" height="7" rx="0.8" fill="url(#logoBars)" />
                  <rect x="17.5" y="4" width="1.6" height="11" rx="0.8" fill="url(#logoBars)" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-light text-white tracking-tight">ilmCore</span>
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