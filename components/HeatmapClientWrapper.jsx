"use client";

import { UnifiedHeatmap } from "@unified-heatmap/react";

export default function HeatmapClientWrapper({ data, labels }) {
  const colorScale = [
    'var(--heatmap-0)',
    'var(--heatmap-1)',
    'var(--heatmap-2)',
    'var(--heatmap-3)',
    'var(--heatmap-4)'
  ];

  return (
    <div className="w-full flex md:justify-center overflow-x-auto no-scrollbar pb-4 pt-2">
      <div className="min-w-max px-2 leading-none">
        <UnifiedHeatmap data={data} labels={labels} colorScale={colorScale} />
      </div>
    </div>
  );
}
