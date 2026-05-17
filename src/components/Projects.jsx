import React from 'react';
import ProjectCard from './ProjectCard';
import './Projects.css';

const IconDots = () => (
  <div className="icon-dots">
    {[...Array(9)].map((_, i) => (
      <span key={i}></span>
    ))}
  </div>
);

const Projects = ({ title, description, projects }) => {
  return (
    <section className="projects-section">
      <div className="container">
        <div className="projects-header">
          <div className="projects-header-left">
            <h2 className="projects-title">
              {title} <IconDots />
            </h2>
            <p className="projects-desc">{description}</p>
          </div>
          <button className="btn-outline">Show All</button>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              category={project.category}
              image={project.image}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
