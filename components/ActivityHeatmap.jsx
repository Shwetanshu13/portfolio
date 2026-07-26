import React from "react";
import { aggregate, githubAdapter, codeforcesAdapter, leetcodeAdapter } from "@unified-heatmap/core";
import HeatmapClientWrapper from "./HeatmapClientWrapper";

export const revalidate = 3600; // Revalidate every hour

export default async function ActivityHeatmap() {
  let data = null;
  let error = null;

  try {
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 1);
    
    const to = toDate.toISOString().split('T')[0];
    const from = fromDate.toISOString().split('T')[0];

    data = await aggregate([
      { adapter: githubAdapter, credentials: { username: "Shwetanshu13" } },
      { adapter: codeforcesAdapter, credentials: { handle: "shwetanshusinha13" } },
      { adapter: leetcodeAdapter, credentials: { username: "Shwetanshu13" } }
    ], { timezone: "UTC", from, to });
  } catch (err) {
    console.error("Failed to fetch heatmap data:", err);
    error = err.message;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-slate-100 mb-4 font-outfit">
          Daily Consistency
        </h2>
        <p className="text-base text-stone-600 dark:text-slate-400 max-w-2xl mx-auto">
          My combined coding activity across GitHub, Codeforces, and LeetCode.
        </p>
        <div className="w-16 h-1 bg-teal-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl border border-stone-200 dark:border-white/10 rounded-2xl p-6 md:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10 hover:border-teal-500/50">
        {error ? (
          <div className="text-red-500 text-center py-10 font-medium">
            Failed to load heatmap data. Please try again later.
          </div>
        ) : data ? (
          <HeatmapClientWrapper 
            data={data}
            labels={{
              github: "Commits",
              codeforces: "CF Submissions",
              leetcode: "LC Submissions"
            }}
          />
        ) : (
          <div className="text-center py-10 animate-pulse text-stone-400 dark:text-slate-500 font-medium">
            Loading activity data...
          </div>
        )}
      </div>
    </div>
  );
}
