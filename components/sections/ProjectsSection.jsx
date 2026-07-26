"use client";
// Interaction pattern: react-parallax-tilt (8deg max) + cursor-following radial spotlight
// inside card border + tech chip 2px lift on hover / pressed state on touch.

import Link from "next/link";
import React, { useRef, useState, useCallback, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, BookOpen, FolderGit2 } from "lucide-react";
import { typeScale, sectionBg } from "../../theme.js";
import projects from "../../data/projects.json";

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

// ── Project card with spotlight + tilt ────────────────────────────────────────
const ProjectCard = ({ project, index, isMobile, prefersReducedMotion }) => {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.setProperty("--mouse-x", "50%");
      cardRef.current.style.setProperty("--mouse-y", "50%");
    }
  }, []);

  const tiltProps = isMobile || prefersReducedMotion
    ? { tiltMaxAngleX: 0, tiltMaxAngleY: 0, scale: 1, perspective: 1000, transitionSpeed: 0 }
    : { tiltMaxAngleX: 8, tiltMaxAngleY: 8, perspective: 1000, scale: 1.02, transitionSpeed: 400 };

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: "easeOut" }}
      className="h-full"
    >
      <Tilt {...tiltProps} className="h-full">
        <div
          ref={cardRef}
          className="spotlight-card group h-full flex flex-col rounded-[20px] shadow-sm border border-[#D8D2C8] dark:border-[#2E2B28] hover:border-[#E8614A]/40 transition-all duration-300 overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #F0EBE3 0%, #EAE4D8 100%)",
            "--mouse-x": "50%",
            "--mouse-y": "50%",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Dark mode bg */}
          <div className="absolute inset-0 bg-[#1C1A17] opacity-0 dark:opacity-100 rounded-[20px]" />

          {/* Spotlight overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[20px] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              background: "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(232,97,74,0.08), transparent 60%)",
            }}
          />

          {/* Card content */}
          <div className="relative z-10 p-6 pb-4 flex-shrink-0">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-white dark:bg-[#161513]/80 border border-[#D8D2C8] dark:border-[#2E2B28] rounded-[12px] flex items-center justify-center group-hover:border-[#E8614A]/40 group-hover:bg-[#E8614A]/8 transition-all duration-300 shadow-sm">
                <FolderGit2 className="w-6 h-6 text-[#7A8079] dark:text-[#6A6360] group-hover:text-[#E8614A] transition-colors duration-300" />
              </div>
              {project.website && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  <ExternalLink className="w-5 h-5 text-[#E8614A]" />
                </div>
              )}
            </div>

            <h2 className={`${typeScale.h3} text-[#1F2320] dark:text-[#EDE8E0] mb-3 group-hover:text-[#E8614A] transition-colors duration-200`}>
              {project.title}
            </h2>
            <p className={`${typeScale.small} text-[#4A4F4B] dark:text-[#A89F94] leading-relaxed mb-4 line-clamp-3`}>
              {project.description}
            </p>
          </div>

          {/* Tech chips */}
          <div className="relative z-10 px-6 pb-4 flex-grow">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-white/70 dark:bg-[#161513]/60 text-[#4A4F4B] dark:text-[#A89F94] text-xs rounded-[8px] font-medium border border-[#D8D2C8]/60 dark:border-[#2E2B28] hover:-translate-y-0.5 hover:bg-[#E8614A]/8 hover:text-[#E8614A] hover:border-[#E8614A]/30 active:scale-95 transition-all duration-200 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project links */}
          <div className="relative z-10 px-6 pb-6 flex flex-wrap gap-3 mt-auto">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-[#161513]/60 border border-[#D8D2C8] dark:border-[#2E2B28] hover:border-[#4A4F4B] dark:hover:border-[#6A6360] text-[#1F2320] dark:text-[#EDE8E0] rounded-[8px] text-sm font-medium transition-all duration-200 hover:shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
                Code
              </Link>
            )}
            {project.website && (
              <Link
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#E8614A] text-white rounded-[8px] text-sm font-semibold hover:bg-[#C94B35] hover:shadow-lg hover:shadow-[#E8614A]/25 transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Link>
            )}
            {project.blogUrl && (
              <Link
                href={project.blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#0F6B6B]/10 text-[#0F6B6B] dark:text-[#1A8F8F] hover:bg-[#0F6B6B]/20 rounded-[8px] text-sm font-medium transition-all duration-200"
              >
                <BookOpen className="w-4 h-4" />
                Read Blog
              </Link>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

// ── ProjectsSection ────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h1 className={`${typeScale.h1} text-[#1F2320] dark:text-[#EDE8E0] mb-4`}>
          Featured Projects
        </h1>
        <p className={`${typeScale.body} text-[#4A4F4B] dark:text-[#A89F94] max-w-2xl mx-auto`}>
          A showcase of my recent work and personal projects. Each project
          represents a unique challenge and learning experience.
        </p>
        <div className="w-16 h-1 bg-[#E8614A] mx-auto mt-6 rounded-full" />
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            isMobile={isMobile}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {/* View More */}
      <div className="text-center mt-12">
        <Link
          href="https://github.com/Shwetanshu13"
          target="_blank"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/70 dark:bg-[#1C1A17]/70 backdrop-blur-md border border-[#D8D2C8] dark:border-[#2E2B28] text-[#1F2320] dark:text-[#EDE8E0] rounded-[9999px] font-semibold hover:border-[#0F6B6B] hover:text-[#0F6B6B] dark:hover:text-[#1A8F8F] transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-[#0F6B6B]/10 transform hover:-translate-y-0.5 group"
        >
          <GithubIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          View All Projects on GitHub
        </Link>
      </div>
    </div>
  );
};

export default ProjectsSection;
