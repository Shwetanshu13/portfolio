"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MousePointerClick } from "lucide-react";

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

const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AuroraBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute -inset-[10px] opacity-50">
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(5%, 5%) scale(1.05)",
            "translate(-5%, 5%) scale(0.95)",
            "translate(0%, 0%) scale(1)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-400/20 dark:bg-rose-500/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-lighten"
      />
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(-5%, -5%) scale(1.05)",
            "translate(5%, -5%) scale(0.95)",
            "translate(0%, 0%) scale(1)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-400/20 dark:bg-teal-500/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-lighten"
      />
      <motion.div
        animate={{
          transform: [
            "translate(0%, 0%) scale(1)",
            "translate(5%, -5%) scale(0.95)",
            "translate(-5%, 5%) scale(1.05)",
            "translate(0%, 0%) scale(1)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-amber-200/20 dark:bg-indigo-500/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-lighten"
      />
    </div>
  </div>
);

const Landing = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <AuroraBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Main heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 text-stone-800 dark:text-slate-100 font-outfit tracking-tight"
          >
            Shwetanshu Sinha
          </motion.h1>

          {/* Subtitle */}
          <motion.div 
            variants={itemVariants}
            className="text-xl md:text-2xl text-stone-500 dark:text-slate-400 mb-8 h-8 font-medium flex items-center justify-center gap-3"
          >
            <span>Full Stack Developer</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            <span>System Design Enthusiast</span>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg text-stone-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Passionate about creating innovative web applications and scalable
            systems. I love turning complex problems into simple, beautiful
            solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <MagneticButton>
              <Link href="#projects" className="group">
                <button className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-lg font-medium text-white bg-teal-500 rounded-full shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:bg-teal-400 transition-all duration-300">
                  <span>View Projects</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link href="#blogs" className="group">
                <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-lg font-medium text-stone-700 dark:text-slate-200 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-stone-200 dark:border-white/10 rounded-full hover:border-rose-400 dark:hover:border-rose-400 hover:text-rose-500 dark:hover:text-rose-400 transition-all duration-300">
                  <MousePointerClick className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Read Blogs
                </button>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-6"
          >
            {[
              { icon: GithubIcon, href: "https://github.com/Shwetanshu13" },
              { icon: LinkedinIcon, href: "https://www.linkedin.com/in/shwetanshu-sinha-368726280/" },
              { icon: TwitterIcon, href: "https://x.com/SSinha63408" }
            ].map((social, i) => (
              <MagneticButton key={i}>
                <Link
                  href={social.href}
                  target="_blank"
                  className="group flex p-3 bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-stone-200 dark:border-white/10 rounded-full shadow-sm hover:shadow-teal-500/20 hover:border-teal-500/50 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5 text-stone-600 dark:text-slate-300 group-hover:text-teal-500 transition-colors" />
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
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#projects">
          <div className="w-6 h-10 border-2 border-stone-300 dark:border-slate-600 rounded-full flex justify-center hover:border-teal-500 transition-colors">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-3 bg-teal-500 rounded-full mt-2"
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Landing;
