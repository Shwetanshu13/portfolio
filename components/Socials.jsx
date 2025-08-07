"use client";

import Link from "next/link";
import React, { useState } from "react";
import codingSocials from "../data/coding-socials.json";
import miscSocials from "../data/misc-socials.json";

const Socials = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const getSocialIcon = (platform) => {
    const icons = {
      GitHub: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      LinkedIn: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      Twitter: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      ),
      LeetCode: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.717 2.019 7.711-.19 2.016-2.234 2.117-5.658.113-8.061l-8.87-8.647a1.375 1.375 0 0 0-1.939.001z" />
        </svg>
      ),
      CodeChef: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.997.004C5.372.004.001 5.375.001 12s5.371 11.996 11.996 11.996S23.993 18.625 23.993 12 18.622.004 11.997.004zM8.44 17.67c-1.67-.63-2.69-2.17-2.69-3.97 0-1.8 1.02-3.34 2.69-3.97v1.63c-.75.5-1.21 1.35-1.21 2.34s.46 1.84 1.21 2.34v1.63zm7.12 0v-1.63c.75-.5 1.21-1.35 1.21-2.34s-.46-1.84-1.21-2.34V9.73c1.67.63 2.69 2.17 2.69 3.97 0 1.8-1.02 3.34-2.69 3.97z" />
        </svg>
      ),
      // Default icon for unknown platforms
      default: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.997.004C5.372.004.001 5.375.001 12s5.371 11.996 11.996 11.996S23.993 18.625 23.993 12 18.622.004 11.997.004zM8.44 17.67c-1.67-.63-2.69-2.17-2.69-3.97 0-1.8 1.02-3.34 2.69-3.97v1.63c-.75.5-1.21 1.35-1.21 2.34s.46 1.84 1.21 2.34v1.63zm7.12 0v-1.63c.75-.5 1.21-1.35 1.21-2.34s-.46-1.84-1.21-2.34V9.73c1.67.63 2.69 2.17 2.69 3.97 0 1.8-1.02 3.34-2.69 3.97z" />
        </svg>
      ),
    };
    return icons[platform] || icons.default;
  };

  const getGradientColors = (index, type) => {
    const codingGradients = [
      "from-gray-700 to-gray-900", // GitHub
      "from-blue-600 to-blue-800", // LinkedIn
      "from-blue-400 to-blue-600", // Twitter
      "from-yellow-500 to-orange-600", // LeetCode
      "from-orange-500 to-red-600", // CodeChef
    ];

    const miscGradients = [
      "from-pink-500 to-rose-600",
      "from-purple-500 to-indigo-600",
      "from-green-500 to-teal-600",
      "from-cyan-500 to-blue-600",
      "from-red-500 to-pink-600",
    ];

    const gradients = type === "coding" ? codingGradients : miscGradients;
    return gradients[index % gradients.length];
  };

  return (
    <div className="space-y-16">
      {/* Section Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Let's Connect
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Feel free to reach out for collaborations, opportunities, or just a
          friendly chat about technology and development.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Coding Platforms Section */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center">
          Coding Platforms
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {codingSocials.map((social, index) => (
            <Link
              key={index}
              href={social.url}
              target="_blank"
              className="group"
              onMouseEnter={() => setHoveredSocial(`coding-${index}`)}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <div
                className={`relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-transparent transform hover:-translate-y-2 overflow-hidden`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(
                    index,
                    "coding"
                  )} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${getGradientColors(
                      index,
                      "coding"
                    )} rounded-2xl flex items-center justify-center text-white mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                  >
                    {getSocialIcon(social.platform)}
                  </div>

                  {/* Platform name */}
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-200">
                    {social.platform}
                  </h3>

                  {/* Visit link indicator */}
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 font-medium text-sm group-hover:gap-3 transition-all duration-200">
                    <span>Visit Profile</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
                  </div>
                </div>

                {/* Hover effect border */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r ${getGradientColors(
                    index,
                    "coding"
                  )} p-[2px]`}
                >
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-800"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Miscellaneous Socials Section */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center">
          Social Networks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {miscSocials.map((social, index) => (
            <Link
              key={index}
              href={social.url}
              target="_blank"
              className="group"
              onMouseEnter={() => setHoveredSocial(`misc-${index}`)}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <div
                className={`relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-transparent transform hover:-translate-y-2 overflow-hidden`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(
                    index,
                    "misc"
                  )} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon or emoji */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${getGradientColors(
                      index,
                      "misc"
                    )} rounded-2xl flex items-center justify-center text-white mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                  >
                    {social.icon ? (
                      <span className="text-2xl">{social.icon}</span>
                    ) : (
                      getSocialIcon(social.platform)
                    )}
                  </div>

                  {/* Platform name */}
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-200">
                    {social.platform}
                  </h3>

                  {/* Visit link indicator */}
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 font-medium text-sm group-hover:gap-3 transition-all duration-200">
                    <span>Connect</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
                  </div>
                </div>

                {/* Hover effect border */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-r ${getGradientColors(
                    index,
                    "misc"
                  )} p-[2px]`}
                >
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-800"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-12 border border-blue-100 dark:border-slate-600">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Ready to Start a Conversation?
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">
          Whether you have a project idea, want to collaborate, or just want to
          say hello, I'd love to hear from you!
        </p>
        <Link
          href="mailto:shwetanshu.sinha13@gmail.com"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26c.67.36 1.45.36 2.12 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Send me an Email
        </Link>
      </div>
    </div>
  );
};

export default Socials;
