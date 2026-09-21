import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
    const [galleryProject, setGalleryProject] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (!galleryProject) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") setGalleryProject(null);
            if (event.key === "ArrowRight") {
                setImageIndex((currentIndex) =>
                    Math.min(currentIndex + 1, galleryProject.images.length - 1)
                );
            }
            if (event.key === "ArrowLeft") {
                setImageIndex((currentIndex) => Math.max(currentIndex - 1, 0));
            }
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [galleryProject]);

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
                        {project.images?.length > 0 ? (
                            <a
                                className="card-link"
                                href={project.images[0]}
                                onClick={(event) => {
                                    event.preventDefault();
                                    setGalleryProject(project);
                                    setImageIndex(0);
                                }}
                            >
                                See More <span aria-hidden="true">↗</span>
                            </a>
                        ) : (
                            <a className="card-link" href={project.link}>See More <span aria-hidden="true">↗</span></a>
                        )}
                    </article>
                )) : (
                    <p className="portfolio-empty">No projects are in this set yet.</p>
                )}
            </div>
            {galleryProject && createPortal((
                <div
                    className="portfolio-gallery"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${galleryProject.title} image gallery`}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) setGalleryProject(null);
                    }}
                >
                    <button
                        className="portfolio-gallery_close"
                        type="button"
                        aria-label="Close image gallery"
                        onClick={() => setGalleryProject(null)}
                    >
                        ×
                    </button>
                    {imageIndex > 0 && (
                        <button
                            className="portfolio-gallery_arrow portfolio-gallery_arrow--previous"
                            type="button"
                            aria-label="Previous image"
                            onClick={() => setImageIndex((currentIndex) => currentIndex - 1)}
                        >
                            &#8592;
                        </button>
                    )}
                    <img
                        className="portfolio-gallery_image"
                        src={galleryProject.images[imageIndex]}
                        alt={`${galleryProject.title}, image ${imageIndex + 1}`}
                    />
                    {imageIndex < galleryProject.images.length - 1 && (
                        <button
                            className="portfolio-gallery_arrow portfolio-gallery_arrow--next"
                            type="button"
                            aria-label="Next image"
                            onClick={() => setImageIndex((currentIndex) => currentIndex + 1)}
                        >
                            &#8594;
                        </button>
                    )}
                    <span className="portfolio-gallery_counter">
                        {imageIndex + 1} / {galleryProject.images.length}
                    </span>
                </div>
            ), document.body)}
        </section>
    );
}

export default function PortfolioPage({ categorySlug }) {
    return categorySlug ? <CategoryPage categorySlug={categorySlug} /> : <CategoryIndex />;
}
