import ActivityHeatmap from "@/components/ActivityHeatmap";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import BlogsSection from "@/components/sections/BlogsSection";
import OpenSourceSection from "@/components/sections/OpenSourceSection";
import CodingPlatformsSection from "@/components/sections/CodingPlatformsSection";
import ConnectSection from "@/components/sections/ConnectSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Daily Consistency (heatmap) */}
      <section id="activity" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ActivityHeatmap />
        </div>
      </section>

      {/* 3. Featured Projects */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsSection />
        </div>
      </section>

      {/* 4. Skills & Technologies */}
      <section id="skills" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkillsSection />
        </div>
      </section>

      {/* 5. Latest Blogs */}
      <section id="blogs" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogsSection />
        </div>
      </section>

      {/* 6. Open Source Contributions */}
      <section id="oss" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OpenSourceSection />
        </div>
      </section>

      {/* 7. Let's Connect — Coding Platforms */}
      <section id="socials" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CodingPlatformsSection />
        </div>
      </section>

      {/* 8. Let's Connect — Social Networks + Email CTA */}
      <section id="connect" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ConnectSection />
        </div>
      </section>
    </div>
  );
}
