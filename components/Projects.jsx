"use client";

import Link from "next/link";
import React, { useState } from "react";
import projects from "../data/projects.json";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 font-outfit">
          Featured Projects
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          A showcase of my recent work and personal projects. Each project
          represents a unique challenge and learning experience.
        </p>
        <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden border border-slate-200 dark:border-white/10 hover:border-orange-500/50 transform hover:-translate-y-1"
            onMouseEnter={() => setHoveredProject(index)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Project header with icon */}
            <div className="relative p-6 pb-4 z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:border-orange-500/30 group-hover:bg-orange-500/10 transition-all duration-300 shadow-sm">
                  <svg
                    className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>

                {/* External link indicator */}
                {project.website && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-5 h-5 text-orange-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3 group-hover:text-orange-500 transition-colors duration-200">
                {project.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Tech stack */}
            <div className="px-6 pb-4 relative z-10">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2.5 py-1 bg-slate-100 dark:bg-black/20 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium group-hover:bg-orange-500/10 group-hover:text-orange-500 border border-slate-200/50 dark:border-white/5 transition-colors duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project links */}
            <div className="px-6 pb-6 flex flex-wrap gap-3 relative z-10 mt-auto">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Code
                </Link>
              )}

              {project.website && (
                <Link
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </Link>
              )}

              {project.blogUrl && (
                <Link
                  href={project.blogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  Read Blog
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-12">
        <Link
          href="https://github.com/Shwetanshu13"
          target="_blank"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-full font-medium hover:border-orange-500 hover:text-orange-500 transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-orange-500/10 transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View All Projects on GitHub
        </Link>
      </div>
    </div>
  );
};

export default Projects;
