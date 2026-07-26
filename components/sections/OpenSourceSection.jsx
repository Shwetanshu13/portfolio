"use client";
// Interaction pattern: fixed dark terminal panel (ignores site theme) + monospace install command
// + always-visible copy-to-clipboard button (icon swaps Copy→Check via AnimatePresence for 2s).

import Link from "next/link";
import React, { useState } from "react";
import { Terminal, Copy, Check, ExternalLink, Package } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { typeScale } from "../../theme.js";

// ── Terminal card ─────────────────────────────────────────────────────────────
const TerminalCard = ({ pkg, index, prefersReducedMotion }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`npm install ${pkg.name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.12, duration: 0.5 }}
      // Terminal panel: always near-black regardless of site theme
      className="group relative bg-[#0D1117] rounded-[20px] shadow-xl border border-[#21262D] hover:border-[#30363D] transition-all duration-300"
    >
      {/* macOS window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#21262D]/80 bg-[#161B22] rounded-t-[20px]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        <div className="flex-1 flex justify-center">
          <span className="text-xs text-[#6E7681] font-mono flex items-center gap-1.5">
            <Package className="w-3 h-3" />
            npm
          </span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col h-[calc(100%-45px)]">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-[#E6EDF3] group-hover:text-[#E8614A] transition-colors duration-200 font-mono">
            {pkg.name}
          </h3>
          <Link
            href={pkg.url}
            target="_blank"
            className="text-[#6E7681] hover:text-[#E8614A] transition-colors"
            title="View on npm"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>

        <p className="text-[#8B949E] flex-grow mb-8 leading-relaxed text-sm font-sans">
          {pkg.description}
        </p>

        {/* Install command — always-visible copy button */}
        <div className="mt-auto">
          <div className="bg-[#161B22] border border-[#21262D] rounded-[8px] p-1 pl-4 flex items-center justify-between hover:border-[#E8614A]/30 transition-colors">
            <code className="text-sm font-mono text-[#79C0FF] flex items-center gap-2">
              <span className="text-[#6E7681] select-none">$</span>
              npm install {pkg.name}
            </code>
            <button
              onClick={copyToClipboard}
              className="p-2.5 rounded-[6px] text-[#6E7681] hover:text-[#E6EDF3] hover:bg-[#21262D] transition-all"
              title="Copy to clipboard"
              aria-label="Copy install command"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Check className="w-4 h-4 text-[#3FB950]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Copy className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ── OpenSourceSection ──────────────────────────────────────────────────────────
export default function OpenSourceSection() {
  const prefersReducedMotion = useReducedMotion();

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
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Section header — uses site theme colors, not terminal */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className={`${typeScale.h1} text-[#1F2320] dark:text-[#EDE8E0] mb-4`}>
          Open Source Contributions
        </h2>
        <p className={`${typeScale.body} text-[#4A4F4B] dark:text-[#A89F94] max-w-2xl mx-auto`}>
          My published NPM packages building the unified heatmap ecosystem.
        </p>
        <div className="w-16 h-1 bg-[#E8614A] mx-auto mt-6 rounded-full" />
      </motion.div>

      {/* Terminal cards — dark panel regardless of theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packages.map((pkg, index) => (
          <TerminalCard
            key={index}
            pkg={pkg}
            index={index}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
}
