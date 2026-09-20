const projectPlaceholders = [
    {
        number: "01",
        title: "Project title",
        text: "A short description of a project, experiment, or collaboration goes here."
    },
    {
        number: "02",
        title: "Another idea",
        text: "Use these cards for work you want visitors to understand at a glance."
    },
    {
        number: "03",
        title: "Coming soon",
        text: "A flexible placeholder for something you are currently building."
    }
];

export default function HomePage() {
    return (
        <>
            <section className="hero-section" aria-labelledby="home-title">
                <div className="hero-copy">
                    <h1 id="home-title">Making thoughtful things for the web.</h1>
                    <p className="hero-description">
                        Welcome to my corner of the internet. This is a flexible starting point for sharing work, ideas, and the things I am learning along the way.
                    </p>
                    <div className="hero-actions">
                        <a className="button button-primary" href="#about">
                            Explore the work <span aria-hidden="true">↗</span>
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
                    <h2 id="selected-work-title">Selected work</h2>
                    <p>
                        Placeholder projects give the site a home now, while leaving room for the real stories you will add later.
                    </p>
                </div>
                <div className="project-grid">
                    {projectPlaceholders.map((project) => (
                        <article className="project-card" key={project.number}>
                            <span className="project-number">{project.number}</span>
                            <h3>{project.title}</h3>
                            <p>{project.text}</p>
                            <a href="#about" className="card-link">
                                Read more <span aria-hidden="true">→</span>
                            </a>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
