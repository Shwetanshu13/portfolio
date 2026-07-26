"use client";

import Link from "next/link";
import React, { useState } from "react";
import Tilt from "react-parallax-tilt";
import { ExternalLink, BookOpen, FolderGit2 } from "lucide-react";

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
import projects from "../data/projects.json";

const ProjectCard = ({ project }) => {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      perspective={1000}
      scale={1.02}
      transitionSpeed={400}
      className="h-full"
    >
      <div className="group h-full flex flex-col bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-sm border border-stone-200 dark:border-white/10 hover:border-teal-500/50 transition-all duration-300 overflow-hidden relative">
        
        {/* Subtle cursor-following glow effect can be done with pure CSS or Framer Motion. Here using a simpler hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-rose-400/0 group-hover:from-teal-500/5 group-hover:to-rose-400/5 transition-all duration-500 pointer-events-none" />

        {/* Project header with icon */}
        <div className="relative p-6 pb-4 z-10 flex-shrink-0">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-white dark:bg-slate-900/50 border border-stone-200 dark:border-white/10 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:border-teal-500/30 group-hover:bg-teal-500/10 transition-all duration-300 shadow-sm">
              <FolderGit2 className="w-6 h-6 text-stone-400 dark:text-slate-400 group-hover:text-teal-500 transition-colors duration-300" />
            </div>

            {/* External link indicator */}
            {project.website && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0">
                <ExternalLink className="w-5 h-5 text-teal-500" />
              </div>
            )}
          </div>

          <h2 className="text-xl font-bold text-stone-800 dark:text-slate-100 mb-3 group-hover:text-teal-500 transition-colors duration-200">
            {project.title}
          </h2>

          <p className="text-stone-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="px-6 pb-4 relative z-10 flex-grow">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2.5 py-1 bg-stone-100 dark:bg-slate-900/50 text-stone-600 dark:text-slate-300 text-xs rounded-md font-medium group-hover:-translate-y-0.5 group-hover:bg-teal-500/10 group-hover:text-teal-600 dark:group-hover:text-teal-400 border border-stone-200/50 dark:border-white/5 transition-all duration-300 cursor-default"
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
              className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-slate-900/50 border border-stone-200 dark:border-white/10 hover:border-stone-400 dark:hover:border-slate-500 hover:bg-stone-50 dark:hover:bg-white/5 text-stone-700 dark:text-slate-200 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-sm"
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
              className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-teal-500/20 hover:bg-teal-600 transition-all duration-200"
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
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              Read Blog
            </Link>
          )}
        </div>
      </div>
    </Tilt>
  );
};

const Projects = () => {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-slate-100 mb-4 font-outfit">
          Featured Projects
        </h1>
        <p className="text-base text-stone-600 dark:text-slate-400 max-w-2xl mx-auto">
          A showcase of my recent work and personal projects. Each project
          represents a unique challenge and learning experience.
        </p>
        <div className="w-16 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-12">
        <Link
          href="https://github.com/Shwetanshu13"
          target="_blank"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/80 dark:bg-slate-800/50 backdrop-blur-md border border-stone-200 dark:border-white/10 text-stone-800 dark:text-slate-200 rounded-full font-medium hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-teal-500/10 transform hover:-translate-y-0.5 group"
        >
          <GithubIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          View All Projects on GitHub
        </Link>
      </div>
    </div>
  );
};

export default Projects;
