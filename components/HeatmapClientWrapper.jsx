"use client";

import { UnifiedHeatmap } from "@unified-heatmap/react";
import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";
import { useMemo } from "react";

export default function HeatmapClientWrapper({ data, labels }) {
  const colorScale = [
    'var(--heatmap-0)',
    'var(--heatmap-1)',
    'var(--heatmap-2)',
    'var(--heatmap-3)',
    'var(--heatmap-4)'
  ];

  const stats = useMemo(() => {
    let currentStreak = 0;
    let maxStreak = 0;
    let totalActiveDays = 0;

    if (data && data.days) {
      let tempStreak = 0;
      const sortedDays = [...data.days].sort((a, b) => new Date(a.date) - new Date(b.date));
      
      sortedDays.forEach(day => {
        const total = day.total || 0;
        if (total > 0) {
          totalActiveDays++;
          tempStreak++;
          maxStreak = Math.max(maxStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      });

      // Calculate current streak
      currentStreak = 0;
      for (let i = sortedDays.length - 1; i >= 0; i--) {
        if ((sortedDays[i].total || 0) > 0) {
          currentStreak++;
        } else if (i !== sortedDays.length - 1) {
          // Break if it's not today
          break;
        }
      }
    }

    return { currentStreak, maxStreak, totalActiveDays };
  }, [data]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col gap-6"
    >
      {/* Gamified Stats Header */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-2">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 px-4 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-500/20"
        >
          <div className="p-2 bg-orange-100 dark:bg-orange-500/20 rounded-lg text-orange-500">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">Current Streak</div>
            <div className="text-xl font-bold text-orange-700 dark:text-orange-300">{stats.currentStreak} Days</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-500/20"
        >
          <div className="p-2 bg-teal-100 dark:bg-teal-500/20 rounded-lg text-teal-600 dark:text-teal-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm text-teal-600 dark:text-teal-400 font-medium">Longest Streak</div>
            <div className="text-xl font-bold text-teal-700 dark:text-teal-300">{stats.maxStreak} Days</div>
          </div>
        </motion.div>
      </div>

      <div className="w-full flex md:justify-center overflow-x-auto no-scrollbar pb-4 pt-2">
        <div className="min-w-max px-2 leading-none relative group">
          {/* We use CSS to add a slight animation to the SVG cells on load */}
          <style dangerouslySetInnerHTML={{__html: `
            .unified-heatmap rect {
              transition: all 0.3s ease;
            }
            .unified-heatmap rect:hover {
              transform: translateY(-2px) scale(1.1);
              transform-origin: center;
              filter: brightness(1.1);
              z-index: 10;
            }
          `}} />
          <UnifiedHeatmap data={data} labels={labels} colorScale={colorScale} />
        </div>
      </div>
    </motion.div>
  );
}
