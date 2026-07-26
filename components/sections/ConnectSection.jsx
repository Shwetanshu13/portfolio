"use client";
// Interaction pattern: coral accent as soft background wash (warmest panel on page) +
// closing CTA "Send me an Email" button with icon slide + glow pulse on hover
// (glow plays automatically once whileInView on mobile, then stays static).

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Mail, ArrowRight, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import miscSocials from "../../data/misc-socials.json";
import { typeScale, sectionBg } from "../../theme.js";

// ── Misc social icons ─────────────────────────────────────────────────────────
const LetterboxdIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M6.406 0C2.867 0 0 2.867 0 6.406v11.188C0 21.133 2.867 24 6.406 24h11.188C21.133 24 24 21.133 24 17.594V6.406C24 2.867 21.133 0 17.594 0H6.406zm2.844 6.75h1.5v10.5h-1.5V6.75zm5.5 0h1.5v10.5h-1.5V6.75zm-2.75 2.5h1.5v5.5h-1.5V9.25z" />
  </svg>
);

const TraktIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.667A9.333 9.333 0 0 1 21.333 12 9.333 9.333 0 0 1 12 21.333 9.333 9.333 0 0 1 2.667 12 9.333 9.333 0 0 1 12 2.667zm-3.2 3.2L7.467 7.2l5.866 5.867-1.6 1.6-4.266-4.267-1.334 1.333L12 17.6l7.2-7.2-1.333-1.333-1.6 1.6L12 6.533 9.067 9.467l-1.6-1.6L12 3.2l5.867 5.867-1.334 1.333L12 5.867l-3.2 3.2-1.6-1.6L12 3.2z" />
  </svg>
);

const getSocialIcon = (platform) => {
  const p = platform.toLowerCase();
  if (p === "letterboxd") return LetterboxdIcon;
  if (p === "trakt") return TraktIcon;
  return ExternalLink;
};

const platformColors = {
  letterboxd: "#00B020",
  trakt: "#ED1C24",
};

const getPlatformColor = (platform) =>
  platformColors[platform.toLowerCase()] ?? "#E8614A";

// ── Misc social card ──────────────────────────────────────────────────────────
const MiscSocialCard = ({ social, prefersReducedMotion }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = getSocialIcon(social.platform);
  const brandColor = getPlatformColor(social.platform);

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={social.url}
        target="_blank"
        className="group flex items-center gap-5 p-6 bg-white/70 dark:bg-[#2A1A17]/70 backdrop-blur-sm rounded-[20px] border border-[#E8614A]/20 hover:border-[#E8614A]/50 hover:shadow-lg hover:shadow-[#E8614A]/10 transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="w-14 h-14 rounded-[12px] flex items-center justify-center shrink-0 transition-all duration-300"
          style={{
            background: hovered ? brandColor : `${brandColor}15`,
            border: `1.5px solid ${hovered ? brandColor : brandColor + "40"}`,
          }}
        >
          <Icon className="w-7 h-7" style={{ color: hovered ? "#fff" : brandColor }} />
        </div>
        <div className="flex-1">
          <h3 className={`${typeScale.h3} text-[#1F2320] dark:text-[#EDE8E0] group-hover:text-[#E8614A] transition-colors`}>
            {social.platform}
          </h3>
          <p className={`${typeScale.small} text-[#7A8079] dark:text-[#6A6360]`}>
            View my {social.platform} profile
          </p>
        </div>
        <ExternalLink className="w-5 h-5 text-[#7A8079] group-hover:text-[#E8614A] transition-colors" />
      </Link>
    </motion.div>
  );
};

// ── Email CTA button with elaborate micro-interaction ─────────────────────────
const EmailButton = ({ isMobile, prefersReducedMotion }) => {
  const [glowTriggered, setGlowTriggered] = useState(false);

  const glowVariants = {
    idle: { boxShadow: "0 0 0px rgba(232,97,74,0)" },
    glow: {
      boxShadow: [
        "0 0 0px rgba(232,97,74,0)",
        "0 0 32px rgba(232,97,74,0.6)",
        "0 0 16px rgba(232,97,74,0.3)",
        "0 0 0px rgba(232,97,74,0)",
      ],
      transition: { duration: 1.4, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      onViewportEnter={() => {
        if (isMobile && !prefersReducedMotion) {
          setGlowTriggered(true);
          setTimeout(() => setGlowTriggered(false), 1500);
        }
      }}
      style={{ display: "inline-block" }}
    >
      <motion.div
        variants={glowVariants}
        animate={glowTriggered && !prefersReducedMotion ? "glow" : "idle"}
        style={{ borderRadius: "9999px" }}
      >
        <Link
          href="mailto:shwetanshusinha13@gmail.com"
          className="group relative inline-flex items-center gap-3 px-9 py-4 bg-[#E8614A] text-white rounded-[9999px] font-semibold overflow-hidden transition-all duration-300 hover:bg-[#C94B35]"
          onMouseEnter={() => {
            if (!isMobile && !prefersReducedMotion) {
              setGlowTriggered(true);
              setTimeout(() => setGlowTriggered(false), 1500);
            }
          }}
        >
          {/* Background hover sweep */}
          <div className="absolute inset-0 bg-[#C94B35] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />

          {/* Mail icon: slides in from left */}
          <motion.div
            className="relative z-10"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
          >
            <Mail className="w-5 h-5 group-hover:-rotate-12 group-hover:-translate-x-0.5 transition-all duration-300" />
          </motion.div>

          <span className="relative z-10 text-lg">Send me an Email</span>

          {/* Arrow icon: slides in from right on hover */}
          <ArrowRight className="relative z-10 w-5 h-5 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

// ── ConnectSection ─────────────────────────────────────────────────────────────
const ConnectSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="space-y-16">
      {/* Misc social cards — coral wash panel */}
      <div
        className={`rounded-[20px] p-8 md:p-12 space-y-6 ${sectionBg.connect}`}
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(232,97,74,0.10) 0%, transparent 60%), #F5E8E4",
        }}
      >
        <div className="text-center mb-8">
          <h2 className={`${typeScale.h1} text-[#1F2320] mb-4`}>
            Around the Web
          </h2>
          <p className={`${typeScale.body} text-[#4A4F4B] max-w-2xl mx-auto`}>
            Where else you can find me beyond code.
          </p>
          <div className="w-16 h-1 bg-[#E8614A] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {miscSocials.map((social) => (
            <MiscSocialCard
              key={social.platform}
              social={social}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      {/* Closing CTA — coral accent wash */}
      <motion.div
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto text-center rounded-[20px] p-12 border border-[#E8614A]/20 relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(232,97,74,0.12) 0%, rgba(232,97,74,0.04) 60%, transparent 80%), #F5E8E4",
        }}
      >
        <div className="absolute inset-0 dark:bg-[#2A1A17] -z-10 rounded-[20px]" />

        <h3 className={`${typeScale.h2} text-[#1F2320] mb-4`}>
          Ready to Start a Conversation?
        </h3>
        <p className={`${typeScale.body} text-[#4A4F4B] mb-10 max-w-xl mx-auto`}>
          Whether you have a project idea, want to collaborate, or just want to
          say hello, I&apos;d love to hear from you!
        </p>

        <EmailButton isMobile={isMobile} prefersReducedMotion={prefersReducedMotion} />
      </motion.div>
    </div>
  );
};

export default ConnectSection;
