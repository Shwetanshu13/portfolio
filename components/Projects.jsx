import Link from "next/link";
import projects from "../data/projects.json";

const Projects = () => {
  return (
    <div>
      <h1>Projects</h1>
      {projects.map((project, index) => (
        <div key={index}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <h3>Tech used : </h3>
          <div>
            {project.tech.map((tech, techIndex) => (
              <span key={techIndex} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
          {project.website && (
            <Link href={project.website} target="_blank">
              {project.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
