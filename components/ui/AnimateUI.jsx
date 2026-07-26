"use client";
// Animate UI primitives — built with Framer Motion (animate-ui npm package is Vue 2, incompatible).
// These replace animated Button, animated Tabs, and animated Tooltip from the spec.

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ─── AnimatedButton ────────────────────────────────────────────────────────────
// Spec: animated Button — coral primary, teal secondary, icon slide, glow pulse.
// Interaction: magnetic cursor-follow on desktop, scale press on mobile/touch.
export const AnimatedButton = ({
  children,
  variant = "primary", // "primary" (coral) | "secondary" (teal) | "ghost"
  className,
  magnetic = false,
  glowPulse = false,
  onClick,
  href,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const [magPos, setMagPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouse = (e) => {
    if (!magnetic || isMobile || prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setMagPos({
      x: (clientX - (left + width / 2)) * 0.25,
      y: (clientY - (top + height / 2)) * 0.25,
    });
  };

  const resetMag = () => setMagPos({ x: 0, y: 0 });

  const baseClasses = "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 font-semibold rounded-[9999px] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variantClasses = {
    primary: "bg-[#E8614A] text-white hover:bg-[#C94B35] focus-visible:ring-[#E8614A] shadow-lg shadow-[#E8614A]/20",
    secondary: "bg-[#0F6B6B] text-white hover:bg-[#0A4F4F] focus-visible:ring-[#0F6B6B] shadow-lg shadow-[#0F6B6B]/20",
    ghost: "bg-transparent border border-[#D8D2C8] dark:border-[#2E2B28] text-[#1F2320] dark:text-[#EDE8E0] hover:border-[#E8614A] hover:text-[#E8614A]",
  };

  const glowVariants = glowPulse && !prefersReducedMotion
    ? {
        initial: { boxShadow: "0 0 0px #E8614A00" },
        animate: {
          boxShadow: ["0 0 0px #E8614A00", "0 0 24px #E8614A66", "0 0 0px #E8614A00"],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        },
      }
    : {};

  const Wrapper = glowPulse ? motion.div : "div";

  const buttonContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetMag}
      animate={prefersReducedMotion ? {} : { x: magPos.x, y: magPos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <motion.button
        className={cn(baseClasses, variantClasses[variant], className)}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.button>
    </motion.div>
  );

  if (glowPulse) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={glowVariants}
        style={{ borderRadius: "9999px", display: "inline-block" }}
      >
        {buttonContent}
      </motion.div>
    );
  }

  return buttonContent;
};

// ─── AnimatedTabs ─────────────────────────────────────────────────────────────
// Spec: animated Tabs — layoutId sliding indicator, one tab per category.
// Mobile: horizontally scrollable tab bar.
export const AnimatedTabs = ({ tabs, activeTab, onTabChange, className }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "flex gap-1 p-1.5 bg-[#EDE8DF] dark:bg-[#1E1B18] rounded-[20px] overflow-x-auto no-scrollbar",
        className
      )}
      style={{ scrollSnapType: "x mandatory" }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "relative flex-shrink-0 px-4 py-2 text-sm font-medium rounded-[12px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#E8614A] whitespace-nowrap scroll-snap-align-start",
              isActive
                ? "text-[#E8614A]"
                : "text-[#4A4F4B] dark:text-[#A89F94] hover:text-[#1F2320] dark:hover:text-[#EDE8E0]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="active-tab-indicator"
                className="absolute inset-0 bg-white dark:bg-[#2E2B28] rounded-[12px] shadow-sm border border-[#D8D2C8] dark:border-[#2E2B28]"
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", bounce: 0.2, duration: 0.5 }
                }
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        );
      })}
    </div>
  );
};

// ─── AnimatedTooltip ──────────────────────────────────────────────────────────
// Spec: animated Tooltip — hover on desktop, tap-to-reveal on mobile.
// Content: date + count label.
export const AnimatedTooltip = ({ children, content, className }) => {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);
  const toggle = () => setVisible((v) => !v);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={!isMobile ? show : undefined}
      onMouseLeave={!isMobile ? hide : undefined}
      onClick={isMobile ? toggle : undefined}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.92 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
          >
            <div className="bg-[#1F2320] dark:bg-[#EDE8E0] text-[#EDE8E0] dark:text-[#1F2320] text-xs font-medium px-2.5 py-1.5 rounded-[8px] whitespace-nowrap shadow-lg">
              {content}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#1F2320] dark:border-t-[#EDE8E0]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
