"use client";
// Interaction pattern: solid warm-tinted panel + staggered whileInView grid cell animation +
// animated Tooltip on each cell (date + count) + canvas-confetti micro-burst on longest-streak cell +
// current streak counter badge above grid.

import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import { UnifiedHeatmap } from "@unified-heatmap/react";
import { AnimatedTooltip } from "../ui/AnimateUI.jsx";
import { typeScale, sectionBg } from "../../theme.js";

// ── Overlay grid to power tooltips + confetti on top of the SVG heatmap ──────
const CELL_SIZE = 14;   // px — matches @unified-heatmap/react default cell size
const CELL_GAP = 2;     // px — matches library gap
const WEEKS = 53;       // columns
const DAYS_PER_WEEK = 7;

const HeatmapOverlay = ({ data, maxStreakDate, prefersReducedMotion }) => {
  const [isMobile, setIsMobile] = useState(false);
  const confettiFired = useRef(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sortedDays = useMemo(() => {
    if (!data?.days) return [];
    return [...data.days].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

  const fireConfetti = useCallback((el) => {
    if (prefersReducedMotion || confettiFired.current || !el) return;
    confettiFired.current = true;
    const rect = el.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 28,
      spread: 40,
      startVelocity: 18,
      origin: { x, y },
      scalar: 0.7,
      colors: ["#E8614A", "#0F6B6B", "#C8A96E", "#F08070", "#1A8F8F"],
      ticks: 120,
      gravity: 1.2,
    });
  }, [prefersReducedMotion]);

  const handleCellInteract = useCallback((e, day) => {
    if (day.date === maxStreakDate) {
      fireConfetti(e.currentTarget);
    }
  }, [maxStreakDate, fireConfetti]);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (!sortedDays.length) return null;

  // Build week columns from sorted days
  const weeks = [];
  let week = [];
  // Pad first week so day 0 = Sunday
  const firstDayOfWeek = new Date(sortedDays[0].date).getDay();
  for (let i = 0; i < firstDayOfWeek; i++) week.push(null);

  sortedDays.forEach((day) => {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const gridWidth = weeks.length * (CELL_SIZE + CELL_GAP);
  const gridHeight = DAYS_PER_WEEK * (CELL_SIZE + CELL_GAP);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        // Positioned to overlap the heatmap SVG exactly
        paddingTop: "28px", // account for month labels
        paddingLeft: "32px", // account for day labels
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${weeks.length}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`,
          gap: `${CELL_GAP}px`,
          width: `${gridWidth}px`,
          height: `${gridHeight}px`,
        }}
      >
        {weeks.flatMap((wk, wi) =>
          wk.map((day, di) => {
            if (!day) {
              return <div key={`${wi}-${di}-empty`} style={{ gridColumn: wi + 1, gridRow: di + 1 }} />;
            }
            const isMaxStreak = day.date === maxStreakDate;
            const total = day.total || 0;
            const tooltipContent = `${formatDate(day.date)} — ${total} contribution${total !== 1 ? "s" : ""}`;

            return (
              <AnimatedTooltip key={`${wi}-${di}`} content={tooltipContent}>
                <motion.div
                  className="pointer-events-auto rounded-[2px] cursor-pointer"
                  style={{
                    gridColumn: wi + 1,
                    gridRow: di + 1,
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    background: "transparent",
                    outline: isMaxStreak ? "2px solid #E8614A" : "none",
                    outlineOffset: "1px",
                  }}
                  initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : wi * 0.012 + di * 0.005,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  onHoverStart={(e) => !isMobile && handleCellInteract(e, day)}
                  onTap={(e) => isMobile && handleCellInteract(e, day)}
                />
              </AnimatedTooltip>
            );
          })
        )}
      </div>
    </div>
  );
};

// ── HeatmapSection ────────────────────────────────────────────────────────────
export default function HeatmapSection({ data, labels, error }) {
  const prefersReducedMotion = useReducedMotion();

  const colorScale = [
    "var(--heatmap-0)",
    "var(--heatmap-1)",
    "var(--heatmap-2)",
    "var(--heatmap-3)",
    "var(--heatmap-4)",
  ];

  const stats = useMemo(() => {
    let currentStreak = 0;
    let maxStreak = 0;
    let maxStreakDate = null;
    let totalActiveDays = 0;

    if (data?.days) {
      let tempStreak = 0;
      let tempEnd = null;
      const sortedDays = [...data.days].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      sortedDays.forEach((day) => {
        const total = day.total || 0;
        if (total > 0) {
          totalActiveDays++;
          tempStreak++;
          tempEnd = day.date;
          if (tempStreak > maxStreak) {
            maxStreak = tempStreak;
            maxStreakDate = day.date;
          }
        } else {
          tempStreak = 0;
        }
      });

      // Current streak (count from end)
      for (let i = sortedDays.length - 1; i >= 0; i--) {
        if ((sortedDays[i].total || 0) > 0) {
          currentStreak++;
        } else if (i !== sortedDays.length - 1) {
          break;
        }
      }
    }

    return { currentStreak, maxStreak, maxStreakDate, totalActiveDays };
  }, [data]);

  return (
    <div className={`w-full rounded-[20px] p-8 md:p-12 ${sectionBg.heatmap}`}>
      {/* Section header */}
      <div className="text-center mb-10">
        <h2 className={`${typeScale.h1} text-[#1F2320] dark:text-[#EDE8E0] mb-4`}>
          Daily Consistency
        </h2>
        <p className={`${typeScale.body} text-[#4A4F4B] dark:text-[#A89F94] max-w-2xl mx-auto`}>
          My combined coding activity across GitHub, Codeforces, and LeetCode.
        </p>
        <div className="w-16 h-1 bg-[#E8614A] mx-auto mt-6 rounded-full" />
      </div>

      {/* Streak badges */}
      {data && (
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8">
          <motion.div
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            className="flex items-center gap-3 px-5 py-2.5 rounded-[12px] bg-[#E8614A]/10 border border-[#E8614A]/30"
          >
            <div className="p-2 bg-[#E8614A]/15 rounded-[8px] text-[#E8614A]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className={`${typeScale.small} text-[#E8614A] font-medium`}>Current Streak</div>
              <div className="text-xl font-bold text-[#C94B35] dark:text-[#F08070]">
                {stats.currentStreak} Days
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            className="flex items-center gap-3 px-5 py-2.5 rounded-[12px] bg-[#0F6B6B]/10 border border-[#0F6B6B]/30"
          >
            <div className="p-2 bg-[#0F6B6B]/15 rounded-[8px] text-[#0F6B6B]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className={`${typeScale.small} text-[#0F6B6B] dark:text-[#1A8F8F] font-medium`}>Longest Streak</div>
              <div className="text-xl font-bold text-[#0A4F4F] dark:text-[#1A8F8F]">
                {stats.maxStreak} Days
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Heatmap + overlay */}
      <div className="bg-white/60 dark:bg-[#161513]/50 rounded-[12px] p-6 border border-[#D8D2C8] dark:border-[#2E2B28]">
        {error ? (
          <div className="text-[#E8614A] text-center py-10 font-medium">
            Failed to load heatmap data. Please try again later.
          </div>
        ) : data ? (
          <div className="w-full flex md:justify-center overflow-x-auto no-scrollbar pb-4 pt-2">
            <div className="min-w-max px-2 leading-none relative">
              {/* Underlying SVG heatmap */}
              <UnifiedHeatmap data={data} labels={labels} colorScale={colorScale} />
              {/* Transparent overlay grid for tooltips + confetti */}
              <HeatmapOverlay
                data={data}
                maxStreakDate={stats.maxStreakDate}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-10 animate-pulse text-[#7A8079] dark:text-[#6A6360] font-medium">
            Loading activity data...
          </div>
        )}
      </div>
    </div>
  );
}
