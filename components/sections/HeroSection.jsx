"use client";
// Interaction pattern: animated gradient mesh background (Framer Motion 20s+ loop) +
// staggerChildren mount reveal + magnetic cursor-follow on CTA buttons (desktop) /
// scale press on mobile.

import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, MousePointerClick } from "lucide-react";
import { typeScale, sectionBg } from "../../theme.js";

// ── Social icon SVGs ──────────────────────────────────────────────────────────
const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

// ── Magnetic button wrapper ───────────────────────────────────────────────────
const MagneticButton = ({ children, isMobile, prefersReducedMotion }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (isMobile || prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({
      x: (clientX - (left + width / 2)) * 0.25,
      y: (clientY - (top + height / 2)) * 0.25,
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={prefersReducedMotion ? {} : { x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// ── Animated gradient mesh background ────────────────────────────────────────
const GradientMesh = ({ prefersReducedMotion }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute -inset-[10px] opacity-40 dark:opacity-30">
      {/* Coral blob */}
      <div
        className="absolute top-[-15%] left-[-5%] w-[55%] h-[55%] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, #E8614A 0%, transparent 70%)",
          animation: prefersReducedMotion ? "none" : "mesh-drift-1 24s ease-in-out infinite",
          mixBlendMode: "multiply",
        }}
      />
      {/* Teal blob */}
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[65%] h-[65%] rounded-full blur-[120px] dark:[mix-blend-mode:lighten]"
        style={{
          background: "radial-gradient(circle, #0F6B6B 0%, transparent 70%)",
          animation: prefersReducedMotion ? "none" : "mesh-drift-2 22s ease-in-out infinite",
          mixBlendMode: "multiply",
        }}
      />
      {/* Amber blob */}
      <div
        className="absolute top-[25%] left-[25%] w-[45%] h-[45%] rounded-full blur-[100px] dark:[mix-blend-mode:lighten]"
        style={{
          background: "radial-gradient(circle, #C8A96E 0%, transparent 70%)",
          animation: prefersReducedMotion ? "none" : "mesh-drift-3 28s ease-in-out infinite",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  </div>
);

// ── Stagger animation variants ────────────────────────────────────────────────
const containerVariants = (reduced) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: reduced ? 0 : 0.18,
      delayChildren: reduced ? 0 : 0.3,
    },
  },
});

const itemVariants = (reduced) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0.01 : 0.7, ease: "easeOut" },
  },
});

// ── Hero Section ──────────────────────────────────────────────────────────────
const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className={`relative min-h-screen flex items-center justify-center pt-16 overflow-hidden ${sectionBg.hero}`}>
      <GradientMesh prefersReducedMotion={prefersReducedMotion} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants(prefersReducedMotion)}
          initial="hidden"
          animate="show"
        >
          {/* Name */}
          <motion.h1
            variants={itemVariants(prefersReducedMotion)}
            className={`${typeScale.display} mb-6 text-[#1F2320] dark:text-[#EDE8E0]`}
          >
            Shwetanshu Sinha
          </motion.h1>

          {/* Tagline */}
          <motion.div
            variants={itemVariants(prefersReducedMotion)}
            className="text-xl md:text-2xl text-[#4A4F4B] dark:text-[#A89F94] mb-8 h-8 font-medium flex items-center justify-center gap-3"
          >
            <span>Full Stack Developer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8614A]" />
            <span>System Design Enthusiast</span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants(prefersReducedMotion)}
            className={`${typeScale.body} text-[#7A8079] dark:text-[#6A6360] max-w-2xl mx-auto mb-12`}
          >
            Passionate about creating innovative web applications and scalable
            systems. I love turning complex problems into simple, beautiful
            solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants(prefersReducedMotion)}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <MagneticButton isMobile={isMobile} prefersReducedMotion={prefersReducedMotion}>
              <Link href="#projects">
                <motion.button
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-lg font-semibold text-white bg-[#E8614A] rounded-[9999px] shadow-lg shadow-[#E8614A]/25 hover:bg-[#C94B35] transition-colors duration-200"
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </MagneticButton>

            <MagneticButton isMobile={isMobile} prefersReducedMotion={prefersReducedMotion}>
              <Link href="#blogs">
                <motion.button
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-lg font-semibold text-[#1F2320] dark:text-[#EDE8E0] bg-white/60 dark:bg-[#1E1B18]/60 backdrop-blur-md border border-[#D8D2C8] dark:border-[#2E2B28] rounded-[9999px] hover:border-[#0F6B6B] hover:text-[#0F6B6B] dark:hover:text-[#1A8F8F] transition-all duration-200"
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                >
                  <MousePointerClick className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Read Blogs
                </motion.button>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Social Row */}
          <motion.div
            variants={itemVariants(prefersReducedMotion)}
            className="flex justify-center gap-6"
          >
            {[
              { icon: GithubIcon, href: "https://github.com/Shwetanshu13", label: "GitHub" },
              { icon: LinkedinIcon, href: "https://www.linkedin.com/in/shwetanshu-sinha-368726280/", label: "LinkedIn" },
              { icon: TwitterIcon, href: "https://x.com/SSinha63408", label: "Twitter" },
            ].map((social) => (
              <MagneticButton key={social.label} isMobile={isMobile} prefersReducedMotion={prefersReducedMotion}>
                <Link
                  href={social.href}
                  target="_blank"
                  aria-label={social.label}
                  className="group flex p-3 bg-white/70 dark:bg-[#1E1B18]/70 backdrop-blur-md border border-[#D8D2C8] dark:border-[#2E2B28] rounded-[9999px] shadow-sm hover:shadow-[#E8614A]/20 hover:border-[#E8614A]/60 transition-all duration-300"
                >
                  <motion.div whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}>
                    <social.icon className="w-5 h-5 text-[#4A4F4B] dark:text-[#A89F94] group-hover:text-[#E8614A] transition-colors" />
                  </motion.div>
                </Link>
              </MagneticButton>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReducedMotion ? 0 : 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#activity">
          <div className="w-6 h-10 border-2 border-[#D8D2C8] dark:border-[#2E2B28] rounded-full flex justify-center hover:border-[#E8614A] transition-colors">
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-1 h-3 bg-[#E8614A] rounded-full mt-2"
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
