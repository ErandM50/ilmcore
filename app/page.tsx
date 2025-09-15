"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import NeuralNetwork from "@/components/NeuralNetwork";
import SunsetGlow from "@/components/SunsetGlow";
import Navbar from "@/components/Navbar";
import { useRef, useState } from "react";
import { ChevronRight, Brain, Users, Zap, Mail, MapPin, ChevronDown } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const networkY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:erand@ilmcore.com,isuf@ilmcore.com?subject=Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      {/* Hero Section - Matching Auth Page Left Side */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient Neural Network with parallax and blending */}
        <motion.div
          aria-hidden
          style={{ y: networkY }}
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen"
        >
          <NeuralNetwork />
        </motion.div>

        {/* Subtle grid overlay and gradient mask for legibility */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-grid-slate-dark opacity-[0.06]" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/40" />

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-lg w-full px-12"
        >
          <div className="flex flex-col items-center space-y-16">

            {/* Premium Logo/Icon - Matching Auth Page */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur flex items-center justify-center shadow-2xl border border-white/5">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10"></div>
                <div className="relative">
                  <div className="flex justify-center items-end space-x-2.5 h-16">
                    <div className="w-0.5 h-8 bg-white/30 rounded-full" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 0ms'}}></div>
                    <div className="w-0.5 h-14 bg-white/50 rounded-full" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 150ms'}}></div>
                    <div className="w-0.5 h-10 bg-white/40 rounded-full" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 300ms'}}></div>
                    <div className="w-0.5 h-16 bg-white/70 rounded-full" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 450ms'}}></div>
                    <div className="w-0.5 h-9 bg-white/35 rounded-full" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 600ms'}}></div>
                    <div className="w-0.5 h-12 bg-white/45 rounded-full" style={{animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 750ms'}}></div>
                    <div
                      className="relative w-1 h-7 rounded-sm origin-bottom"
                      style={{
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite 900ms',
                        transform: 'skewX(8deg)',
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.35) 15%, rgba(255,255,255,0.55) 100%)',
                        boxShadow: '-1px 0 2px rgba(0,0,0,0.1), 1px 0 1px rgba(255,255,255,0.05)'
                      }}
                    >
                      {/* Page lines */}
                      <div className="absolute inset-x-0 top-2 h-px bg-white/10"></div>
                      <div className="absolute inset-x-0 top-4 h-px bg-white/8"></div>
                      <div className="absolute inset-x-0 bottom-2 h-px bg-white/10"></div>

                      {/* Spine highlight */}
                      <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-white/10 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Typography - Matching Auth Page Style */}
            <motion.div
              className="text-center space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="space-y-2">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white tracking-tight">
                  ilmCore
                </h1>
                <p className="text-base font-light text-white/60 tracking-[0.3em] uppercase">
                  accelerating understanding
                </p>
              </div>
            </motion.div>

            {/* Minimalist feature indicators - Matching Auth Page */}
            <motion.div
              className="flex items-center justify-center space-x-12 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-indigo-400"></div>
                <span className="text-[10px] font-light text-white/40 uppercase tracking-[0.2em]">AI Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                <span className="text-[10px] font-light text-white/40 uppercase tracking-[0.2em]">Interactive</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                <span className="text-[10px] font-light text-white/40 uppercase tracking-[0.2em]">Adaptive</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8"
            >
              <a href="#contact" className="px-10 py-3.5 bg-transparent backdrop-blur border border-white/10 text-white font-extralight rounded-full hover:bg-white/5 hover:border-white/20 transition-all duration-300 inline-flex items-center justify-center">
                <span>Contact Us</span>
              </a>
              <a href="#mission" className="group px-10 py-3.5 bg-transparent backdrop-blur border border-white/10 text-white font-extralight rounded-full hover:bg-white/5 hover:border-white/20 transition-all duration-300 flex items-center space-x-2">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator - left aligned to container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="pointer-events-none absolute bottom-10 left-0 right-0"
          aria-hidden
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="inline-flex items-center justify-center text-white/60">
              <svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]">
                <line x1="9" y1="2" x2="9" y2="18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <polyline points="4,14 9,19 14,14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <SectionHeader eyebrow="Mission" title="Our Mission" align="center" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {[
              {
                icon: Brain,
                title: "Intelligent Learning",
                description: "Leveraging cutting-edge AI to create adaptive learning experiences that evolve with each student's unique needs.",
              },
              {
                icon: Users,
                title: "Institutional Partnership",
                description: "Working hand-in-hand with educational institutions to seamlessly integrate AI into existing curricula.",
              },
              {
                icon: Zap,
                title: "Accelerated Outcomes",
                description: "Dramatically improving learning efficiency and retention through personalized, data-driven insights.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-2xl blur-xl group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-300"></div>
                <div className="relative h-full p-8 bg-slate-900/30 backdrop-blur border border-slate-800/50 rounded-2xl hover:border-slate-700/50 transition-all duration-300 group-hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 text-indigo-300/80 mb-6">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-extralight text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 font-extralight leading-relaxed text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6 lg:px-8 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <div>
                <SectionHeader eyebrow="About" title="About ilmcore" align="left" />
              </div>

              <p className="text-lg text-slate-300 font-extralight leading-relaxed">
                ilmcore stands at the forefront of educational innovation, developing sophisticated
                AI systems that understand and adapt to individual learning patterns.
              </p>

              <p className="text-lg text-slate-300 font-extralight leading-relaxed">
                Our team combines deep expertise in artificial intelligence, cognitive science,
                and educational pedagogy to create solutions that don't just digitize education—they
                fundamentally transform how knowledge is acquired and retained.
              </p>

              <p className="text-lg text-slate-300 font-extralight leading-relaxed">
                We believe that every learner deserves an education that adapts to their unique
                strengths, pace, and goals. Our technology makes this vision a reality for
                institutions worldwide.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
              <div className="relative bg-slate-900/30 backdrop-blur border border-slate-800/50 rounded-3xl p-12">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: "Founded", value: "2024" },
                    { label: "Focus", value: "AI Education" },
                    { label: "Mission", value: "Transform Learning" },
                    { label: "Vision", value: "Global Impact" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center bg-slate-900/30 backdrop-blur border border-slate-800/50 rounded-xl p-6 hover:border-slate-700/50 transition-colors"
                    >
                      <p className="text-3xl font-extralight text-white mb-2">{stat.value}</p>
                      <p className="text-xs font-light text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <SectionHeader eyebrow="Contact" title="Get in Touch" align="center" />
            <p className="text-lg text-slate-400 font-extralight max-w-2xl mx-auto mt-6">
              Ready to transform your institution's approach to education?
              Let's discuss how ilmcore can accelerate your journey.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-extralight text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/50 backdrop-blur border border-slate-800/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors font-thin"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-extralight text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/50 backdrop-blur border border-slate-800/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors font-thin"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-extralight text-slate-300 mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/50 backdrop-blur border border-slate-800/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none font-thin"
                    placeholder="Tell us about your institution and goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-white/5 backdrop-blur border border-white/20 text-white font-thin rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-slate-950/50 backdrop-blur border border-slate-800/30 rounded-2xl p-8">
                <h3 className="text-2xl font-thin text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-indigo-400/70 mt-1" />
                    <div>
                      <p className="text-sm font-thin text-slate-400 mb-1">Email</p>
                      <p className="text-white font-thin">erand@ilmcore.com</p>
                      <p className="text-white font-thin">isuf@ilmcore.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-indigo-400/70 mt-1" />
                    <div>
                      <p className="text-sm font-thin text-slate-400 mb-1">Location</p>
                      <p className="text-white font-thin">Building Tomorrow's Education</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/30 backdrop-blur border border-indigo-500/10 rounded-2xl p-8">
                <h4 className="text-lg font-thin text-white mb-3">For Investors</h4>
                <p className="text-sm text-slate-300 font-thin leading-relaxed">
                  We're building the future of educational technology.
                  Join us in transforming how the world learns.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sunset Glow Effect with Footer */}
      <SunsetGlow />
    </main>
  );
}