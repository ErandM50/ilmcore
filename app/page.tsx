"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import InteractiveGrid from "@/components/InteractiveGrid";
import Navbar from "@/components/Navbar";
import { useRef, useState } from "react";
import { ChevronRight, Sparkles, Brain, Users, Zap, Mail, MapPin, Phone } from "lucide-react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // EmailJS integration would go here
    const mailtoLink = `mailto:erand@ilmcore.com,isuf@ilmcore.com?subject=Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <InteractiveGrid />

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Announcement Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur border border-indigo-500/20 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-light text-indigo-300 uppercase tracking-wider">
                Transforming Education with AI
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-6xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight"
            >
              ilm<span className="font-light">core</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl font-light text-slate-300 tracking-[0.3em] uppercase"
            >
              Accelerating Understanding
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-2xl mx-auto text-lg text-slate-400 font-light leading-relaxed"
            >
              Pioneering the future of education through intelligent, adaptive AI systems
              that empower institutions to deliver personalized learning at scale.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8"
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 transform hover:-translate-y-1 flex items-center space-x-2">
                <span>Learn More</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300">
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white/40 rounded-full mt-2"
            />
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
            <h2 className="text-5xl font-extralight text-white mb-6">Our Mission</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative p-8 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all duration-300">
                  <item.icon className="w-12 h-12 text-indigo-400 mb-6" />
                  <h3 className="text-xl font-light text-white mb-4">{item.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed">{item.description}</p>
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
                <h2 className="text-5xl font-extralight text-white mb-6">About ilmcore</h2>
                <div className="w-24 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              </div>

              <p className="text-lg text-slate-300 font-light leading-relaxed">
                ilmcore stands at the forefront of educational innovation, developing sophisticated
                AI systems that understand and adapt to individual learning patterns.
              </p>

              <p className="text-lg text-slate-300 font-light leading-relaxed">
                Our team combines deep expertise in artificial intelligence, cognitive science,
                and educational pedagogy to create solutions that don't just digitize education—they
                fundamentally transform how knowledge is acquired and retained.
              </p>

              <p className="text-lg text-slate-300 font-light leading-relaxed">
                We believe that every learner deserves an education that adapts to their unique
                strengths, pace, and goals. Our technology makes this vision a reality for
                institutions worldwide.
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-slate-900/50 backdrop-blur border border-slate-800 rounded-3xl p-12">
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
                      className="text-center"
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
            <h2 className="text-5xl font-extralight text-white mb-6">Get in Touch</h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-8"></div>
            <p className="text-lg text-slate-400 font-light max-w-2xl mx-auto">
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
                  <label className="block text-sm font-light text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-light text-slate-300 mb-2">Message</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Tell us about your institution and goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-2xl hover:shadow-indigo-500/25 transform hover:-translate-y-0.5"
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
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8">
                <h3 className="text-2xl font-extralight text-white mb-6">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-5 h-5 text-indigo-400 mt-1" />
                    <div>
                      <p className="text-sm font-light text-slate-400 mb-1">Email</p>
                      <p className="text-white font-light">erand@ilmcore.com</p>
                      <p className="text-white font-light">isuf@ilmcore.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-indigo-400 mt-1" />
                    <div>
                      <p className="text-sm font-light text-slate-400 mb-1">Location</p>
                      <p className="text-white font-light">Building Tomorrow's Education</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 backdrop-blur border border-indigo-500/20 rounded-2xl p-8">
                <h4 className="text-lg font-light text-white mb-3">For Investors</h4>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  We're building the future of educational technology.
                  Join us in transforming how the world learns.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
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

            <p className="text-sm font-light text-slate-400">
              © 2024 ilmcore. Accelerating understanding through AI.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}