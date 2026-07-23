"use client";

import React, { useEffect, useState, useRef } from "react";

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 95 },
    { name: "Node.js", level: 85 },
    { name: "Next.js", level: 90 },
    { name: "TypeScript", level: 80 },
    { name: "System Design", level: 75 },
  ];

  const technologies = [
    "JavaScript", "React", "Node.js", "Express", "MongoDB", "Next.js",
    "Tailwind CSS", "Git", "Docker", "TypeScript", "REST APIs", "System Design",
    "PostgreSQL", "GraphQL"
  ];

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Skills & Technologies
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Tools I use to bring ideas to life.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className={`bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transform transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                {skill.name}
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
                style={{
                  width: isVisible ? `${skill.level}%` : "0%",
                }}
              >
                {/* Shine effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {technologies.map((tech, index) => (
          <span
            key={tech}
            className={`px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold shadow-sm hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transform hover:-translate-y-1 transition-all duration-300 cursor-default ${
              isVisible ? "animate-bounce-in opacity-100" : "opacity-0 translate-y-4"
            }`}
            style={{ 
              transitionDelay: `${(skills.length * 100) + (index * 50)}ms`,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
