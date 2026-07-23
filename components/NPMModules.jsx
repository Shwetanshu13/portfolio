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
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Open Source Contributions
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          My published NPM packages building the unified heatmap ecosystem.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((pkg, index) => (
          <div 
            key={index} 
            className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          >
            {/* Background gradient shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  npm
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
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
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-3 transition-all"
                >
                  View on npm
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Animated border on hover */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-3xl transition-colors duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
