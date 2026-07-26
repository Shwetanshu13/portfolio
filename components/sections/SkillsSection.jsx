"use client";
// Interaction pattern: Framer Motion animated Tabs (9 categories) — layoutId sliding indicator;
// chip fade/scale in via AnimatePresence on tab change; horizontally scrollable tab bar on mobile.

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AnimatedTabs } from "../ui/AnimateUI.jsx";
import { typeScale, sectionBg } from "../../theme.js";

const skillCategories = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript", "C++", "Python", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "GraphQL", "WebSockets", "SSE"],
  },
  {
    title: "Databases & ORM",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Drizzle ORM", "Mongoose", "Neon"],
  },
  {
    title: "Async Processing",
    skills: ["BullMQ", "Redis", "Node Cron", "Background Jobs"],
  },
  {
    title: "DevOps & Infrastructure",
    skills: ["Docker", "Git", "GitHub Actions", "Linux", "Nginx", "CI/CD"],
  },
  {
    title: "Cloud & Deployment",
    skills: ["Vercel", "Render", "Railway", "Turborepo"],
  },
  {
    title: "Authentication & Security",
    skills: ["JWT", "Clerk", "AES-256-GCM", "Argon2", "Session Management", "OAuth"],
  },
  {
    title: "Tools",
    skills: ["Postman", "GitHub", "VS Code", "Turborepo"],
  },
];

const tabTitles = skillCategories.map((c) => c.title);

const SkillsSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState(tabTitles[0]);

  const currentSkills =
    skillCategories.find((c) => c.title === activeTab)?.skills ?? [];
  const uniqueSkills = [...new Set(currentSkills)];

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.82 },
    show: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.04,
        type: "spring",
        stiffness: 320,
        damping: 24,
      },
    }),
    exit: { opacity: 0, scale: 0.82, transition: { duration: 0.15 } },
  };

  return (
    <div className={`rounded-[20px] p-8 md:p-12 space-y-10 ${sectionBg.skills}`}>
      {/* Section header */}
      <div className="text-center">
        <h2 className={`${typeScale.h1} text-[#1F2320] dark:text-[#EDE8E0] mb-4`}>
          Skills &amp; Technologies
        </h2>
        <p className={`${typeScale.body} text-[#4A4F4B] dark:text-[#A89F94] max-w-2xl mx-auto`}>
          The tools, languages, and frameworks I use to build scalable systems and intuitive interfaces.
        </p>
        <div className="w-16 h-1 bg-[#E8614A] mx-auto mt-6 rounded-full" />
      </div>

      {/* Animated Tabs — horizontally scrollable on mobile */}
      <div className="flex justify-center">
        <AnimatedTabs
          tabs={tabTitles}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="max-w-full"
        />
      </div>

      {/* Chip grid */}
      <motion.div
        layout={!prefersReducedMotion}
        className="flex flex-wrap justify-center items-start gap-3 md:gap-4 max-w-4xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {uniqueSkills.map((skill, i) => (
            <motion.div
              key={skill}
              layout={!prefersReducedMotion}
              variants={chipVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              custom={i}
              className="px-4 py-2.5 bg-white/70 dark:bg-[#161513]/60 border border-[#D8D2C8] dark:border-[#2E2B28] text-[#1F2320] dark:text-[#EDE8E0] rounded-[12px] text-sm font-medium hover:border-[#E8614A]/50 hover:text-[#E8614A] hover:shadow-lg hover:shadow-[#E8614A]/8 cursor-default transition-colors duration-200"
            >
              {skill}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SkillsSection;
