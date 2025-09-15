"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "./Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Check if hero is still in view
      const heroElement = document.querySelector('section[ref="heroRef"]') ||
                         document.querySelector('section:first-of-type');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        setHeroInView(rect.bottom > 100); // Hero considered in view if bottom is above fold
      }

      // Determine active section based on scroll position
      const sections = ['mission', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || '');
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: 'mission', label: 'Mission', href: '#mission' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(12,18,36,0.45)] backdrop-blur-[10px] border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Skip navigation link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-2 group" aria-label="ilmCore homepage">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-slate-900/30 to-slate-950/50 backdrop-blur flex items-center justify-center border border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-500">
                <div className="relative flex items-end justify-center space-x-[3px] h-[18px]">
                  {/* Enhanced logo bars with better gradients */}
                  <div
                    className="w-[1.5px] h-[18px] rounded-full transition-all duration-500 group-hover:h-[16px]"
                    style={{
                      background: 'linear-gradient(to bottom, var(--accent-0), rgba(122,134,255,0.3))',
                    }}
                  ></div>
                  <div
                    className="w-[1.5px] h-[11px] rounded-full transition-all duration-500 group-hover:h-[13px]"
                    style={{
                      background: 'linear-gradient(to bottom, var(--accent-1), rgba(47,230,214,0.25))',
                    }}
                  ></div>
                  <div
                    className="w-[1.5px] h-[14px] rounded-full transition-all duration-500 group-hover:h-[15px]"
                    style={{
                      background: 'linear-gradient(to bottom, var(--accent-0), rgba(122,134,255,0.28))',
                    }}
                  ></div>
                  {/* Book spine with accent colors */}
                  <div
                    className="relative w-[2px] h-[9px] origin-bottom transition-all duration-500 group-hover:h-[10px]"
                    style={{
                      transform: 'skewX(10deg) translateY(-0.5px)',
                      background: 'linear-gradient(135deg, var(--accent-1), var(--accent-0), var(--accent-1))',
                      borderRadius: '0 1px 1px 0',
                      boxShadow: 'inset -0.5px 0 0 rgba(255,255,255,0.1), 0.5px 0 1px rgba(0,0,0,0.2)',
                    }}
                  >
                    <div className="absolute inset-x-0 top-[40%] h-px bg-black/10"></div>
                    <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-[20px] font-extralight text-primary group-hover:text-accent transition-colors duration-500">ilm</span>
              <span className="text-[20px] font-thin text-secondary group-hover:text-accent-secondary transition-colors duration-500">Core</span>
            </div>
          </Link>

          {/* Enhanced Navigation with Active Indicators */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                <a
                  href={item.href}
                  className={`text-base font-medium transition-colors duration-300 ${
                    activeSection === item.id
                      ? 'text-accent'
                      : 'text-secondary hover:text-primary'
                  }`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </a>
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-[-8px] left-0 right-0 h-0.5 bg-accent rounded-full"
                    layoutId="activeSection"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Conditional CTA Button */}
          <Button
            variant={heroInView ? "secondary" : "primary"}
            size="sm"
            href="#contact"
            className="text-sm transition-all duration-300"
            aria-label="Request a demo via contact section"
          >
            Request Demo
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}