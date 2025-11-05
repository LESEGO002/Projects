// src/components/Projects.jsx
import ProjectCard from "./ProjectCard";

function Projects() {
  const projectData = [
    {
      title: "Calculator App",
      description: "A simple calculator using HTML, CSS, and JavaScript.",
      link: "https://github.com/ST1047510/calculator"
    },
    {
      title: "To-Do List",
      description: "A to-do list app that saves tasks to local storage.",
      link: "https://github.com/ST1047510/todo-list"
    },
    {
      title: "Weather App",
      description: "Displays real-time weather data using OpenWeather API.",
      link: "https://github.com/ST1047510/weather-app"
    }
  ];

  return (
    <section className="projects-section">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projectData.map((p, index) => (
          <ProjectCard key={index} title={p.title} description={p.description} link={p.link} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
