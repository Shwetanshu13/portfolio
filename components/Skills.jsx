"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

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
    skills: ["Node.js", "Express", "REST APIs", "GraphQL", "WebSockets", "JWT", "SSE"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Drizzle ORM", "Mongoose", "Neon"],
  },
  {
    title: "DevOps",
    skills: ["Docker", "Git", "GitHub Actions", "Linux", "Nginx", "CI/CD"],
  },
  {
    title: "Cloud & Tools",
    skills: ["Vercel", "Render", "Railway", "Postman", "GitHub", "VS Code", "Turborepo"],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", ...skillCategories.map((c) => c.title)];

  const filteredSkills = activeTab === "All"
    ? skillCategories.flatMap((c) => c.skills)
    : skillCategories.find((c) => c.title === activeTab)?.skills || [];

  // Remove duplicates if any exist across categories when showing "All"
  const uniqueSkills = [...new Set(filteredSkills)];

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-slate-100 mb-4 font-outfit">
          Skills & Technologies
        </h2>
        <p className="text-base text-stone-600 dark:text-slate-400 max-w-2xl mx-auto">
          The tools, languages, and frameworks I use to build scalable systems and intuitive interfaces.
        </p>
        <div className="w-16 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="flex flex-col items-center gap-10">
        {/* Animated Tabs */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-stone-100 dark:bg-slate-800/50 rounded-2xl max-w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors outline-none",
                  isActive
                    ? "text-teal-700 dark:text-teal-300"
                    : "text-stone-600 dark:text-slate-400 hover:text-stone-900 dark:hover:text-slate-200 hover:bg-stone-200/50 dark:hover:bg-slate-700/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-xl shadow-sm border border-stone-200/50 dark:border-slate-600/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Filterable Tag Cluster */}
        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl"
        >
          <AnimatePresence mode="popLayout">
            {uniqueSkills.map((skill) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                key={skill}
                className="px-4 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-stone-200 dark:border-white/10 text-stone-700 dark:text-slate-200 rounded-xl text-sm font-medium hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400 hover:shadow-lg hover:shadow-teal-500/10 cursor-default flex items-center justify-center transition-colors"
              >
                {skill}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
