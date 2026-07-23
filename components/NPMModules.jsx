import Link from "next/link";
import React from "react";

export default function NPMModules() {
  const packages = [
    {
      name: "@unified-heatmap/core",
      description: "Node.js engine that aggregates and normalizes coding activity from GitHub, Codeforces, and LeetCode into a single unified timeline.",
      url: "https://www.npmjs.com/package/@unified-heatmap/core"
    },
    {
      name: "@unified-heatmap/react",
      description: "A purely presentational, zero-dependency SVG React component for rendering unified coding activity as a beautiful GitHub-style grid.",
      url: "https://www.npmjs.com/package/@unified-heatmap/react"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4 font-outfit">
          Open Source Contributions
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          My published NPM packages building the unified heatmap ecosystem.
        </p>
        <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((pkg, index) => (
          <div 
            key={index} 
            className="group relative bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-white/10 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 dark:bg-black/20 border border-slate-200/50 dark:border-white/10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xl shadow-sm group-hover:text-orange-500 group-hover:border-orange-500/30 group-hover:bg-orange-500/10 transition-colors duration-300">
                  npm
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors duration-200">
                    {pkg.name}
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 flex-grow mb-6 leading-relaxed">
                {pkg.description}
              </p>

              <div className="mt-auto">
                <Link 
                  href={pkg.url} 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-orange-500 font-semibold group-hover:gap-3 transition-all duration-200"
                >
                  View on npm
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
