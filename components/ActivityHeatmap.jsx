import React from "react";
import { aggregate, githubAdapter, codeforcesAdapter, leetcodeAdapter } from "@unified-heatmap/core";
import HeatmapSection from "./sections/HeatmapSection";

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
    <HeatmapSection
      data={data}
      labels={{
        github: "Commits",
        codeforces: "CF Submissions",
        leetcode: "LC Submissions"
      }}
      error={error}
    />
  );
}
