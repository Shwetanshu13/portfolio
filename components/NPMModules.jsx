"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Terminal, Copy, Check, ExternalLink, Package } from "lucide-react";
import { motion } from "framer-motion";

const TerminalCard = ({ pkg, index }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative bg-[#0d1117] rounded-2xl p-1 shadow-lg border border-slate-800 hover:border-slate-700 transition-all duration-300"
    >
      {/* Mac OS Window Controls */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/60 bg-[#161b22] rounded-t-xl">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        <div className="flex-1 flex justify-center">
          <span className="text-xs text-slate-500 font-mono flex items-center gap-2">
            <Package className="w-3 h-3" />
            npm
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col h-[calc(100%-45px)]">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-200 group-hover:text-teal-400 transition-colors duration-200 font-mono">
            {pkg.name}
          </h3>
          <Link
            href={pkg.url}
            target="_blank"
            className="text-slate-500 hover:text-teal-400 transition-colors"
            title="View on npm"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>

        <p className="text-slate-400 flex-grow mb-8 leading-relaxed text-sm font-sans">
          {pkg.description}
        </p>

        {/* Install Command */}
        <div className="mt-auto">
          <div className="bg-[#161b22] border border-slate-800 rounded-lg p-1 pl-4 flex items-center justify-between group/cmd hover:border-teal-500/30 transition-colors">
            <code className="text-sm font-mono text-teal-400 flex items-center gap-2">
              <span className="text-slate-500 select-none">$</span>
              npm i {pkg.name}
            </code>
            <button
              onClick={() => copyToClipboard(`npm i ${pkg.name}`)}
              className="p-2.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-all"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="w-4 h-4 text-teal-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function NPMModules() {
  const packages = [
    {
      name: "@unified-heatmap/core",
      description:
        "Node.js engine that aggregates and normalizes coding activity from GitHub, Codeforces, and LeetCode into a single unified timeline.",
      url: "https://www.npmjs.com/package/@unified-heatmap/core",
    },
    {
      name: "@unified-heatmap/react",
      description:
        "A purely presentational, zero-dependency SVG React component for rendering unified coding activity as a beautiful GitHub-style grid.",
      url: "https://www.npmjs.com/package/@unified-heatmap/react",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-slate-100 mb-4 font-outfit">
          Open Source Contributions
        </h2>
        <p className="text-base text-stone-600 dark:text-slate-400 max-w-2xl mx-auto">
          My published NPM packages building the unified heatmap ecosystem.
        </p>
        <div className="w-16 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((pkg, index) => (
          <TerminalCard key={index} pkg={pkg} index={index} />
        ))}
      </div>
    </div>
  );
}
