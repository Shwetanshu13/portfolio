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

  const skillCategories = [
  {
    title: "Languages",
    skills: [
      "TypeScript",
      "JavaScript",
      "C++",
      "Python",
      "SQL"
    ],
  },
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "Expo",
      "Tailwind CSS",
      "HTML",
      "CSS"
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "JWT Authentication",
      "Server-Sent Events"
    ],
  },
  {
    title: "Databases & ORM",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Drizzle ORM",
      "Mongoose",
      "Neon",
      "Database Design"
    ],
  },
  {
    title: "Async Processing",
    skills: [
      "BullMQ",
      "Redis Queues",
      "Background Workers",
      "Cron Jobs",
      "Job Scheduling",
      "Caching"
    ],
  },
  {
    title: "DevOps & Infrastructure",
    skills: [
      "Docker",
      "Git",
      "GitHub Actions",
      "Linux",
      "Nginx",
      "CI/CD"
    ],
  },
  {
    title: "Cloud & Deployment",
    skills: [
      "Vercel",
      "Render",
      "Railway",
      "Cloudinary"
    ],
  },
  {
    title: "Authentication & Security",
    skills: [
      "JWT",
      "OAuth",
      "Clerk",
      "AES-256-GCM",
      "Argon2",
      "Password Hashing"
    ],
  },
  {
    title: "Tools",
    skills: [
      "Postman",
      "GitHub",
      "VS Code",
      "pnpm",
      "npm",
      "Turborepo"
    ],
  },
];

  return (
    <div ref={sectionRef} className="max-w-5xl mx-auto space-y-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 font-outfit">
          Skills & Technologies
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          The tools, languages, and frameworks I use to build scalable systems and intuitive interfaces.
        </p>
        <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {skillCategories.map((category, index) => (
          <div
            key={category.title}
            className={`bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/50 transition-all duration-300 transform ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-black/20 border border-slate-200/50 dark:border-white/5 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30 transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
