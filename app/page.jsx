import Blogs from "@/components/Blogs";
import Landing from "@/components/Landing";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Landing />

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Projects />
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Blogs />
        </div>
      </section>

      {/* Socials Section */}
      <section
        id="socials"
        className="py-20 bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Socials />
        </div>
      </section>
    </div>
  );
}
