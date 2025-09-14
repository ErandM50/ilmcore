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
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur flex items-center justify-center shadow-xl border border-white/5">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10"></div>
                <div className="relative flex justify-center items-end space-x-0.5 h-6">
                  <div className="w-0.5 h-3 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                  <div className="w-0.5 h-5 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                  <div className="w-0.5 h-4 bg-white/50 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                  <div className="w-0.5 h-6 bg-white/80 rounded-full animate-pulse" style={{animationDelay: '450ms'}}></div>
                </div>
              </div>
            </div>
            <span className="text-xl font-extralight text-white tracking-tight">ilmcore</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#mission"
              className="text-sm font-light text-slate-300 hover:text-white transition-colors tracking-wide"
            >
              Mission
            </a>
            <a
              href="#about"
              className="text-sm font-light text-slate-300 hover:text-white transition-colors tracking-wide"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm font-light text-slate-300 hover:text-white transition-colors tracking-wide"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </div>
    </motion.nav>
  );
}