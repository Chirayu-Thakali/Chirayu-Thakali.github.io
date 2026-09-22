import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ProjectGallery({ project, onClose }) {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (!project) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowRight") {
                setImageIndex((currentIndex) =>
                    Math.min(currentIndex + 1, project.images.length - 1)
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
    }, [project, onClose]);

    if (!project) return null;

    return createPortal(
        <div
            className="portfolio-gallery"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} image gallery`}
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <button
                className="portfolio-gallery_close"
                type="button"
                aria-label="Close image gallery"
                onClick={onClose}
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
                src={project.images[imageIndex]}
                alt={`${project.title}, image ${imageIndex + 1}`}
            />
            {imageIndex < project.images.length - 1 && (
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
                {imageIndex + 1} / {project.images.length}
            </span>
        </div>,
        document.body
    );
}
