"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import NeuralNetwork from "@/components/NeuralNetwork";
import SunsetGlow from "@/components/SunsetGlow";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { MissionCard, StatCard, ContactInfoCard } from "@/components/Card";
import FormField from "@/components/FormField";
import SuccessCard from "@/components/SuccessCard";
import { useRef, useState } from "react";
import { ChevronRight, Brain, Users, Zap, Mail, MapPin, ChevronDown } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const networkY = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormState('loading');

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create mailto link
      const subject = `Contact from ${formData.name}${formData.topic ? ` - ${formData.topic}` : ''}`;
      const body = `${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
      const mailtoLink = `mailto:erand@ilmcore.com,isuf@ilmcore.com?subject=${encodeURIComponent(subject)}&body=${body}`;

      window.location.href = mailtoLink;
      setFormState('success');
    } catch (error) {
      setFormState('error');
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", topic: "", message: "" });
    setFormState('idle');
    setErrors({});
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" role="main">
      <Navbar />

      {/* Hero Section - Matching Auth Page Left Side */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Subtle spotlight behind neural network */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
            style={{
              background: 'radial-gradient(circle, rgba(122,134,255,0.06) 0%, rgba(122,134,255,0.03) 40%, transparent 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>

        {/* Enhanced Neural Network with better visibility */}
        <motion.div
          aria-hidden
          style={{ y: networkY }}
          className="absolute inset-0 z-0 opacity-75 mix-blend-screen"
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
                        transform: 'skewX(12deg)',
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

            {/* Enhanced feature indicators - More prominent but not button-like */}
            <motion.div
              className="flex items-center justify-center space-x-16 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-sm shadow-accent/30"></div>
                <span className="text-sm font-light text-white/70 uppercase tracking-[0.15em]">AI Powered</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-secondary shadow-sm shadow-accent-secondary/30"></div>
                <span className="text-sm font-light text-white/70 uppercase tracking-[0.15em]">Interactive</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary shadow-sm shadow-accent/30"></div>
                <span className="text-sm font-light text-white/70 uppercase tracking-[0.15em]">Adaptive</span>
              </div>
            </motion.div>

            {/* Enhanced CTA Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
            >
              <Button
                variant="primary"
                size="lg"
                href="#contact"
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Request Demo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="#mission"
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Learn More
              </Button>
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
                number: "01",
                title: "Intelligent Learning",
                subtitle: "AI-Powered Personalization",
                description: "Leveraging cutting-edge AI to create adaptive learning experiences that evolve with each student's unique needs.",
              },
              {
                icon: Users,
                number: "02",
                title: "Institutional Partnership",
                subtitle: "Seamless Integration",
                description: "Working hand-in-hand with educational institutions to seamlessly integrate AI into existing curricula.",
              },
              {
                icon: Zap,
                number: "03",
                title: "Accelerated Outcomes",
                subtitle: "Measurable Results",
                description: "Dramatically improving learning efficiency and retention through personalized, data-driven insights.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                viewport={{ once: true }}
                className="h-full"
              >
                <MissionCard
                  icon={item.icon}
                  number={item.number}
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  onClick={() => {
                    // Navigate to detailed view or modal
                    console.log(`Clicked on ${item.title}`);
                  }}
                />
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
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            <div className="space-y-8">
              <div>
                <SectionHeader eyebrow="About" title="About ilmCore" align="left" />
              </div>

              {/* Break into digestible paragraphs */}
              <div className="space-y-6">
                <p className="text-lead text-secondary">
                  ilmCore stands at the forefront of educational innovation, developing sophisticated AI systems that understand and adapt to individual learning patterns.
                </p>

                <p className="text-body text-secondary">
                  Our team combines deep expertise in artificial intelligence, cognitive science, and educational pedagogy to create solutions that fundamentally transform knowledge acquisition.
                </p>
              </div>

              {/* What makes us different */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-primary">What makes us different</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <span className="text-body text-secondary">Real-time adaptation to learning patterns</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent-secondary mt-2 flex-shrink-0"></div>
                    <span className="text-body text-secondary">Seamless institutional integration</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <span className="text-body text-secondary">Measurable learning outcome improvements</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              {/* Enhanced stats with better hierarchy */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Founded", value: "2025" },
                  { label: "Focus", value: "AI Education" },
                  { label: "Mission", value: "Transform Learning" },
                  { label: "Vision", value: "Global Impact" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                    viewport={{ once: true }}
                  >
                    <StatCard label={stat.label} value={stat.value} />
                  </motion.div>
                ))}
              </div>

              {/* Credibility indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="card">
                  <h4 className="text-lg font-medium text-primary mb-4">Proven Results</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-light text-accent">+18%</div>
                      <div className="text-meta text-tertiary">Retention Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-light text-accent-secondary">3x</div>
                      <div className="text-meta text-tertiary">Faster Mastery</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 lg:px-8 border-b border-white/[0.03]">
        {/* Gradient overlay that darkens toward the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-slate-950/90 pointer-events-none"></div>
        <div className="relative max-w-7xl mx-auto">
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
            {/* Enhanced Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {formState === 'success' ? (
                <SuccessCard onClose={resetForm} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <FormField
                    label="Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    error={errors.name}
                    placeholder="Your full name"
                    required
                    success={!errors.name && formData.name.length > 0}
                  />

                  <FormField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    error={errors.email}
                    placeholder="your@email.com"
                    required
                    success={!errors.email && formData.email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                  />

                  <FormField
                    label="Topic"
                    type="select"
                    value={formData.topic}
                    onChange={(e) => updateFormData('topic', e.target.value)}
                    options={['Sales', 'Partnership', 'Support', 'Media', 'Investment']}
                    placeholder="Select a topic"
                    hint="Help us route your message to the right team"
                  />

                  <FormField
                    label="Message"
                    type="textarea"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    error={errors.message}
                    placeholder="Tell us about your institution and goals..."
                    required
                    rows={6}
                    hint="Minimum 10 characters"
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={formState === 'loading'}
                    disabled={formState === 'loading'}
                  >
                    {formState === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>

                  {formState === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <p className="text-sm text-red-400">
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    </motion.div>
                  )}
                </form>
              )}
            </motion.div>

            {/* Enhanced Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Contact Information Card */}
              <ContactInfoCard title="Contact Information" icon={Mail}>
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                      <Mail className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-meta text-tertiary mb-2">Email</p>
                      <div className="space-y-1">
                        <a href="mailto:erand@ilmcore.com" className="block text-secondary hover:text-accent transition-colors">
                          erand@ilmcore.com
                        </a>
                        <a href="mailto:isuf@ilmcore.com" className="block text-secondary hover:text-accent transition-colors">
                          isuf@ilmcore.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                      <MapPin className="w-5 h-5 text-white/50" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-meta text-tertiary mb-2">Location</p>
                      <p className="text-secondary">Building Tomorrow's Education</p>
                    </div>
                  </div>
                </div>
              </ContactInfoCard>

              {/* Investor Card */}
              <ContactInfoCard title="For Investors" icon={Zap}>
                <p className="text-body text-secondary leading-relaxed">
                  We're building the future of educational technology.
                  Join us in transforming how the world learns.
                </p>
                <div className="mt-6">
                  <Button
                    variant="tertiary"
                    size="sm"
                    href="mailto:erand@ilmcore.com?subject=Investment Inquiry"
                  >
                    Learn About Investment
                  </Button>
                </div>
              </ContactInfoCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="relative py-24 px-6 lg:px-8 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-h1 text-primary">
              Ready to accelerate understanding?
            </h2>
            <p className="text-lead text-secondary max-w-2xl mx-auto">
              Join forward-thinking institutions that are already transforming education with AI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button
                variant="primary"
                size="lg"
                href="#contact"
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Request Demo
              </Button>
              <Button
                variant="tertiary"
                size="lg"
                href="mailto:erand@ilmcore.com"
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sunset Glow Effect with Footer */}
      <SunsetGlow />
    </main>
  );
}