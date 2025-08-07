import Blogs from "@/components/Blogs";
import Landing from "@/components/Landing";
import Projects from "@/components/Projects";
import Socials from "@/components/Socials";

export default function Home() {
  return (
    <div>
      <Landing />
      <Projects />
      <Blogs />
      <Socials />
    </div>
  );
}
