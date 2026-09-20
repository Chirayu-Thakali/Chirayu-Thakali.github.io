import { useState } from "react";
import { portfolioCategories, portfolioProjects } from "../data/portfolioData.js";

function CategoryIndex() {
    return (
        <section className="page-section portfolio-page" aria-labelledby="portfolio-title">
            <p className="eyebrow">Portfolio</p>
            <h1 id="portfolio-title">My Works</h1>
            <p className="portfolio-disclaimer">
                This portfolio is a work in progress. The categories below are just a starting point for more of my future work to come.
            </p>
            <div className="portfolio-category-grid">
                {portfolioCategories.map((category, index) => (
                    <a
                        className="portfolio-category-card"
                        href={`#portfolio/${encodeURIComponent(category.slug)}`}
                        key={category.slug}
                    >
                        <span className="project-number">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                        <h2>{category.name}</h2>
                        <p>{category.description}</p>
                        <span className="card-link">Browse category <span aria-hidden="true">→</span></span>
                    </a>
                ))}
            </div>
        </section>
    );
}

function CategoryPage({ categorySlug }) {
    const category = portfolioCategories.find((item) => item.slug === categorySlug);
    const [activeSet, setActiveSet] = useState("all");

    if (!category) return <CategoryIndex />;

    const categoryProjects = portfolioProjects.filter((project) => project.category === category.slug);
    const sets = [...new Set(categoryProjects.map((project) => project.set).filter(Boolean))];
    const visibleProjects = activeSet === "all"
        ? categoryProjects
        : activeSet === "singles"
            ? categoryProjects.filter((project) => !project.set)
            : categoryProjects.filter((project) => project.set === activeSet);

    return (
        <section className="page-section portfolio-page" aria-labelledby="category-title">
            <a className="portfolio-back-link" href="#portfolio">← All categories</a>
            <p className="eyebrow">Category</p>
            <h1 id="category-title">{category.name}</h1>
            <p className="portfolio-disclaimer">{category.description}</p>
            <div className="portfolio-filters" aria-label="Filter projects by set">
                <span className="portfolio-filter-label">Browse by set</span>
                <button
                    className={activeSet === "all" ? "portfolio-filter portfolio-filter--active" : "portfolio-filter"}
                    type="button"
                    onClick={() => setActiveSet("all")}
                >
                    All projects
                </button>
                {sets.map((set) => (
                    <button
                        className={activeSet === set ? "portfolio-filter portfolio-filter--active" : "portfolio-filter"}
                        type="button"
                        onClick={() => setActiveSet(set)}
                        key={set}
                    >
                        {set}
                    </button>
                ))}
                <button
                    className={activeSet === "singles" ? "portfolio-filter portfolio-filter--active" : "portfolio-filter"}
                    type="button"
                    onClick={() => setActiveSet("singles")}
                >
                    Singles
                </button>
            </div>
            <div className="portfolio-project-list">
                {visibleProjects.length > 0 ? visibleProjects.map((project) => (
                    <article className="portfolio-project" key={project.id}>
                        <div className="portfolio-project_meta">
                            <span>{project.year}</span>
                            <span>{project.set || "Single"}</span>
                        </div>
                        <div>
                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                        </div>
                        <a className="card-link" href={project.link}>View project <span aria-hidden="true">↗</span></a>
                    </article>
                )) : (
                    <p className="portfolio-empty">No projects are in this set yet.</p>
                )}
            </div>
        </section>
    );
}

export default function PortfolioPage({ categorySlug }) {
    return categorySlug ? <CategoryPage categorySlug={categorySlug} /> : <CategoryIndex />;
}
