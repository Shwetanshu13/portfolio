// Design system — single source of truth for accent colors, radius, and type scale.
// All section components MUST import from here. No ad-hoc values allowed in sections.

/** Accent pair — coral (primary CTA) and teal (secondary/links/active states) */
export const accent = {
  coral: "#E8614A",
  coralLight: "#F08070",
  coralDark: "#C94B35",
  teal: "#0F6B6B",
  tealLight: "#1A8F8F",
  tealDark: "#0A4F4F",
};

/** Background palette — light: warm paper, dark: warm charcoal */
export const palette = {
  light: {
    bg: "#F7F3EC",
    bgAlt: "#EDE8DF",
    bgPanel: "#EAE4D8",
    ink: "#1F2320",
    inkMuted: "#4A4F4B",
    inkSubtle: "#7A8079",
    border: "#D8D2C8",
  },
  dark: {
    bg: "#161513",
    bgAlt: "#1E1B18",
    bgPanel: "#242018",
    ink: "#EDE8E0",
    inkMuted: "#A89F94",
    inkSubtle: "#6A6360",
    border: "#2E2B28",
  },
};

/**
 * Radius scale — exactly 4 values.
 * r8  → subtle rounding (chips, small buttons)
 * r12 → cards inner elements
 * r20 → cards
 * r999 → pill (full-round buttons, badges)
 */
export const radius = {
  r8: "8px",
  r12: "12px",
  r20: "20px",
  r999: "9999px",
};

/**
 * Type scale — exactly 6 sizes.
 * Tailwind class strings for use in className.
 */
export const typeScale = {
  display: "text-5xl md:text-7xl font-bold font-outfit tracking-tight",
  h1: "text-3xl md:text-4xl font-bold font-outfit",
  h2: "text-2xl md:text-3xl font-bold font-outfit",
  h3: "text-xl font-semibold font-outfit",
  body: "text-base leading-relaxed",
  small: "text-sm",
};

/** Section background tokens — each section gets a unique bg treatment */
export const sectionBg = {
  hero: "bg-[#F7F3EC] dark:bg-[#161513]", // base, mesh overlaid by Framer Motion
  heatmap: "bg-[#EDE8DF] dark:bg-[#1E1B18]", // solid warm panel
  projects: "bg-[#F0EBE3] dark:bg-[#1C1A17]", // slightly lighter warm
  skills: "bg-[#EAE5DC] dark:bg-[#201D1A]", // mid warm
  blogs: "bg-gradient-to-b from-[#F3EDE3] to-[#EAE3D6] dark:from-[#1A1714] dark:to-[#131110]", // subtle vertical gradient
  openSource: "bg-[#0D1117]", // fixed terminal dark — intentionally breaks theme
  codingPlatforms: "bg-[#E8E2D8] dark:bg-[#232018]", // distinct warm
  connect: "bg-[#F5E8E4] dark:bg-[#2A1A17]", // coral wash
};

/** Platform brand colors for Coding Platforms section */
export const brandColors = {
  github: "#24292F",
  linkedin: "#0A66C2",
  twitter: "#000000",
  hashnode: "#2962FF",
  leetcode: "#FFA116",
  codeforces: "#1F8ACB",
};
