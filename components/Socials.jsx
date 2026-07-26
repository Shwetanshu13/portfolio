"use client";

import Link from "next/link";
import React from "react";
import codingSocials from "../data/coding-socials.json";
import miscSocials from "../data/misc-socials.json";
import { Mail, ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Socials = () => {
  const getSocialIcon = (platform) => {
    const p = platform.toLowerCase();
    if (p.includes("github")) return <GithubIcon className="w-8 h-8" />;
    if (p.includes("linkedin")) return <LinkedinIcon className="w-8 h-8" />;
    if (p.includes("twitter") || p.includes("x")) return <TwitterIcon className="w-8 h-8" />;
    if (p.includes("leetcode")) return (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.717 2.019 7.711-.19 2.016-2.234 2.117-5.658.113-8.061l-8.87-8.647a1.375 1.375 0 0 0-1.939.001z" />
      </svg>
    );
    if (p.includes("codechef")) return (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.997.004C5.372.004.001 5.375.001 12s5.371 11.996 11.996 11.996S23.993 18.625 23.993 12 18.622.004 11.997.004zM8.44 17.67c-1.67-.63-2.69-2.17-2.69-3.97 0-1.8 1.02-3.34 2.69-3.97v1.63c-.75.5-1.21 1.35-1.21 2.34s.46 1.84 1.21 2.34v1.63zm7.12 0v-1.63c.75-.5 1.21-1.35 1.21-2.34s-.46-1.84-1.21-2.34V9.73c1.67.63 2.69 2.17 2.69 3.97 0 1.8-1.02 3.34-2.69 3.97z" />
      </svg>
    );
    return <ExternalLink className="w-8 h-8" />;
  };

  const allSocials = [
    ...codingSocials.map(s => ({ ...s, type: 'coding' })),
    ...miscSocials.map(s => ({ ...s, type: 'misc' }))
  ];

  return (
    <div className="space-y-20">
      {/* Section Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-slate-100 mb-4 font-outfit">
          Let's Connect
        </h1>
        <p className="text-base text-stone-600 dark:text-slate-400 max-w-2xl mx-auto">
          Feel free to reach out for collaborations, opportunities, or just a
          friendly chat about technology and development.
        </p>
        <div className="w-16 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Social Network Flex Layout */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {allSocials.map((social, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
            >
              <Link
                href={social.url}
                target="_blank"
                className="group flex flex-col items-center justify-center gap-3 p-6 bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-stone-200 dark:border-white/10 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all duration-300 w-36 h-36"
              >
                <div className="text-stone-500 dark:text-slate-400 group-hover:text-teal-500 transition-colors duration-300 group-hover:scale-110 group-hover:-translate-y-1 transform">
                  {social.icon && !['linkedin', 'github', 'twitter'].includes(social.icon.toLowerCase()) ? (
                    <span className="text-3xl block grayscale group-hover:grayscale-0 transition-all">{social.icon}</span>
                  ) : (
                    getSocialIcon(social.platform)
                  )}
                </div>
                <h3 className="text-sm font-bold text-stone-700 dark:text-slate-300 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {social.platform}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-3xl mx-auto text-center bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-12 border border-stone-200 dark:border-white/10 shadow-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-rose-400/5 pointer-events-none" />
        
        <h3 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-slate-100 mb-4 font-outfit relative z-10">
          Ready to Start a Conversation?
        </h3>
        <p className="text-stone-600 dark:text-slate-400 mb-10 max-w-xl mx-auto relative z-10">
          Whether you have a project idea, want to collaborate, or just want to
          say hello, I'd love to hear from you!
        </p>

        <div className="relative inline-block z-10">
          {/* Animated gradient border behind the button */}
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-rose-400 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          
          <Link
            href="mailto:shwetanshusinha13@gmail.com"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-teal-500 text-white rounded-full font-semibold overflow-hidden transition-all hover:scale-105"
          >
            {/* Button background hover effect */}
            <div className="absolute inset-0 bg-teal-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            
            <Mail className="w-5 h-5 relative z-10 group-hover:-rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Send me an Email</span>
            <ArrowRight className="w-5 h-5 relative z-10 -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Socials;
