"use client";
// Interaction pattern: on hover/focus icon tile fills with platform brand color +
// icon bounces once (Framer Motion spring, single bounce, not a loop).
// On mobile tap: same fill+bounce plays once, then link opens.

import Link from "next/link";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import codingSocials from "../../data/coding-socials.json";
import { typeScale, sectionBg, brandColors } from "../../theme.js";

// ── Platform icons ────────────────────────────────────────────────────────────
const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const HashnodeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 337 337">
    <path d="M168.5 0C75.43 0 0 75.43 0 168.5S75.43 337 168.5 337 337 261.57 337 168.5 261.57 0 168.5 0zm.06 105c35.06 0 63.5 28.44 63.5 63.5s-28.44 63.5-63.5 63.5-63.5-28.44-63.5-63.5 28.44-63.5 63.5-63.5z" />
  </svg>
);

const LeetcodeIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.717 2.019 7.711-.19 2.016-2.234 2.117-5.658.113-8.061l-8.87-8.647a1.375 1.375 0 0 0-1.939.001z" />
  </svg>
);

const CodeforcesIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M4.5 7.5A1.5 1.5 0 0 1 6 9v10.5A1.5 1.5 0 0 1 4.5 21h-3A1.5 1.5 0 0 1 0 19.5V9a1.5 1.5 0 0 1 1.5-1.5h3zm9-4.5A1.5 1.5 0 0 1 15 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5v-15A1.5 1.5 0 0 1 10.5 3h3zm9 7.5A1.5 1.5 0 0 1 24 12v7.5A1.5 1.5 0 0 1 22.5 21h-3A1.5 1.5 0 0 1 18 19.5V12a1.5 1.5 0 0 1 1.5-1.5h3z" />
  </svg>
);

const getPlatformIcon = (platform) => {
  const p = platform.toLowerCase();
  if (p === "github") return GithubIcon;
  if (p === "linkedin") return LinkedinIcon;
  if (p === "twitter") return TwitterIcon;
  if (p === "hashnode") return HashnodeIcon;
  if (p === "leetcode") return LeetcodeIcon;
  if (p === "codeforces") return CodeforcesIcon;
  return ExternalLink;
};

const getPlatformColor = (platform) => {
  const p = platform.toLowerCase();
  if (p === "github") return brandColors.github;
  if (p === "linkedin") return brandColors.linkedin;
  if (p === "twitter") return brandColors.twitter;
  if (p === "hashnode") return brandColors.hashnode;
  if (p === "leetcode") return brandColors.leetcode;
  if (p === "codeforces") return brandColors.codeforces;
  return "#E8614A";
};

// ── Platform tile ─────────────────────────────────────────────────────────────
const PlatformTile = ({ social, prefersReducedMotion }) => {
  const [hovered, setHovered] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);
  const Icon = getPlatformIcon(social.platform);
  const brandColor = getPlatformColor(social.platform);

  const triggerBounce = () => {
    setBounceKey((k) => k + 1);
    setHovered(true);
  };

  const bounceVariants = {
    rest: { y: 0 },
    bounce: {
      y: [0, -14, 4, -6, 0],
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <Link
        href={social.url}
        target="_blank"
        aria-label={social.platform}
        onMouseEnter={() => { if (!prefersReducedMotion) triggerBounce(); }}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => { if (!prefersReducedMotion) triggerBounce(); }}
        onBlur={() => setHovered(false)}
        onTouchStart={(e) => {
          if (!prefersReducedMotion) {
            triggerBounce();
            // Allow the default link navigation after bounce
          }
        }}
        className="group flex flex-col items-center justify-center gap-3 p-6 rounded-[20px] border border-[#D8D2C8] dark:border-[#2E2B28] transition-all duration-200 w-32 h-32 relative overflow-hidden"
        style={{
          backgroundColor: hovered ? brandColor : undefined,
          background: hovered
            ? brandColor
            : "rgba(255,255,255,0.6)",
          borderColor: hovered ? brandColor : undefined,
        }}
      >
        {/* Dark mode base bg */}
        {!hovered && (
          <div className="absolute inset-0 bg-[#EDE8DF] dark:bg-[#232018] rounded-[20px]" />
        )}

        <motion.div
          key={bounceKey}
          variants={bounceVariants}
          initial="rest"
          animate={bounceKey > 0 && !prefersReducedMotion ? "bounce" : "rest"}
          className="relative z-10"
          style={{ color: hovered ? "#ffffff" : undefined }}
        >
          <Icon
            className="w-8 h-8 transition-colors duration-200"
            style={{
              color: hovered ? "#ffffff" : brandColor,
            }}
          />
        </motion.div>
        <h3
          className="relative z-10 text-sm font-bold transition-colors duration-200"
          style={{
            color: hovered ? "#ffffff" : undefined,
          }}
        >
          <span className={hovered ? "text-white" : "text-[#1F2320] dark:text-[#EDE8E0]"}>
            {social.platform}
          </span>
        </h3>
      </Link>
    </motion.div>
  );
};

// ── CodingPlatformsSection ─────────────────────────────────────────────────────
const CodingPlatformsSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`rounded-[20px] p-8 md:p-12 space-y-10 ${sectionBg.codingPlatforms}`}>
      {/* Section header */}
      <div className="text-center">
        <h2 className={`${typeScale.h1} text-[#1F2320] dark:text-[#EDE8E0] mb-4`}>
          Let&apos;s Connect
        </h2>
        <p className={`${typeScale.body} text-[#4A4F4B] dark:text-[#A89F94] max-w-2xl mx-auto`}>
          Find me on these coding and professional platforms.
        </p>
        <div className="w-16 h-1 bg-[#E8614A] mx-auto mt-6 rounded-full" />
      </div>

      {/* 6-icon evenly spaced row/grid */}
      <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
        {codingSocials.map((social) => (
          <PlatformTile
            key={social.platform}
            social={social}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
};

export default CodingPlatformsSection;
