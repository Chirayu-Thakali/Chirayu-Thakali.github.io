import { useState } from "react";
import ProjectGallery from "../components/ProjectGallery.jsx";
import { portfolioProjects } from "../data/portfolioData.js";

const recentProjects = portfolioProjects.slice(-3).reverse();

export default function HomePage() {
    const [galleryProject, setGalleryProject] = useState(null);

    return (
        <>
            <section className="hero-section" aria-labelledby="home-title">
                <div className="hero-copy">
                    <h1 id="home-title">Chirayu Thakali</h1>
                    <p className="hero-description">
                        Welcome to my corner of the internet. This is a flexible starting point for sharing work, ideas, and the things I am learning along the way.
                    </p>
                    <div className="hero-actions">
                        <a className="button button-primary" href="#portfolio">
                            Explore my work <span aria-hidden="true">↗</span>
                        </a>
                        <a className="text-link" href="#contact">
                            Start a conversation
                        </a>
                    </div>
                </div>
                <div className="hero-note" aria-label="Introduction note">
                    <span className="hero-note_mark">CT</span>
                    <p>
                        Currently shaping a personal space for projects, notes, and future experiments.
                    </p>
                    <span className="hero-note_line" aria-hidden="true"></span>
                </div>
            </section>
            <section className="section-block" aria-labelledby="selected-work-title">
                <div className="section-heading">
                    <h2 id="selected-work-title">Recent Projects</h2>
                    <p>
                        These are the most recent projects I have worked on and achievements I've accomplished.
                    </p>
                </div>
                <div className="project-grid">
                    {recentProjects.map((project, index) => (
                        <article className="project-card" key={project.id}>
                            <span className="project-number">
                                {index === 0 ? "Latest" : String(index + 1).padStart(2, "0")}
                            </span>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            {project.images?.length > 0 ? (
                                <a
                                    className="card-link"
                                    href={project.images[0]}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setGalleryProject(project);
                                    }}
                                >
                                    See More <span aria-hidden="true">↗</span>
                                </a>
                            ) : (
                                <a className="card-link" href={project.link}>
                                    See More <span aria-hidden="true">↗</span>
                                </a>
                            )}
                        </article>
                    ))}
                </div>
            </section>
            <ProjectGallery
                project={galleryProject}
                onClose={() => setGalleryProject(null)}
            />
        </>
    );
}
