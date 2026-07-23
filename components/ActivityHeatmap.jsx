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

    // We aggregate data from the three platforms
    data = await aggregate([
      { adapter: githubAdapter, credentials: { username: "Shwetanshu13" } },
      { adapter: codeforcesAdapter, credentials: { handle: "shwetanshusinha13" } },
      { adapter: leetcodeAdapter, credentials: { username: "Shwetanshu13" } }
    ], { timezone: "UTC", from, to });
    console.log("Heatmap Data:", data ? { days: data.days?.length, sources: data.sources?.length } : null);
  } catch (err) {
    console.error("Failed to fetch heatmap data:", err);
    error = err.message;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
          Daily Consistency
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          My combined coding activity across GitHub, Codeforces, and LeetCode.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-3xl p-6 md:p-10 shadow-xl">
        {error ? (
          <div className="text-red-500 text-center py-10">
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
          <div className="text-center py-10 animate-pulse text-slate-500">
            Loading activity data...
          </div>
        )}
      </div>
    </div>
  );
}
