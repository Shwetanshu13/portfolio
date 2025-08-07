import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div>
      <h1>Shwetanshu Sinha</h1>
      <h3>Full Stack Developer | System Design Enthusiast</h3>

      {/* Links to projects and blogs */}
      <div className="links">
        <Link href="/projects">
          <button>View Projects</button>
        </Link>
        <Link href="/blogs">
          <button>View Blogs</button>
        </Link>
      </div>

      {/* Skills and Technologies */}
      <h3>Skills and Technologies</h3>
      <ul className="skills-list list-none">
        <li>JavaScript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>MongoDB</li>
        <li>Next.js</li>
        <li>Tailwind CSS</li>
        <li>Git</li>
        <li>Docker</li>
        <li>TypeScript</li>
        <li>REST APIs</li>
        <li>System Design</li>
      </ul>

      {/* Socials */}
      <div className="socials">
        <Link href="https://github.com/Shwetanshu13">
          <button>GitHub</button>
        </Link>
        <Link href="https://www.linkedin.com/in/shwetanshu-sinha-368726280/">
          <button>LinkedIn</button>
        </Link>
        <Link href="https://x.com/SSinha63408">
          <button>Twitter</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
