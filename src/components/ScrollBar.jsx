import { useEffect, useRef, useState } from "react";

const minimumThumbHeight = 48;

function getScrollMetrics() {
    const documentElement = document.documentElement;
    const headerHeight = document.querySelector(".site-header")?.offsetHeight || 0;
    const viewportHeight = window.innerHeight - headerHeight;
    const scrollHeight = documentElement.scrollHeight;
    const maximumScroll = Math.max(scrollHeight - window.innerHeight, 0);
    const thumbHeight = Math.max(
        (viewportHeight / scrollHeight) * viewportHeight,
        minimumThumbHeight
    );
    const maximumThumbTop = Math.max(viewportHeight - thumbHeight, 0);
    const thumbTop = maximumScroll
        ? (window.scrollY / maximumScroll) * maximumThumbTop
        : 0;

    return { headerHeight, maximumScroll, maximumThumbTop, thumbHeight, thumbTop };
}

export default function ScrollBar() {
    const [metrics, setMetrics] = useState(getScrollMetrics);
    const dragging = useRef(null);
    const frame = useRef(null);
    const previousScrollBehavior = useRef("");

    useEffect(() => {
        const updateMetrics = () => setMetrics(getScrollMetrics());
        const handleScroll = () => {
            if (frame.current !== null) return;
            frame.current = requestAnimationFrame(() => {
                frame.current = null;
                updateMetrics();
            });
        };
        const content = document.getElementById("main-content");
        const resizeObserver = new ResizeObserver(updateMetrics);
        const mutationObserver = new MutationObserver(updateMetrics);

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateMetrics);
        resizeObserver.observe(document.documentElement);

        if (content) {
            resizeObserver.observe(content);
            mutationObserver.observe(content, { childList: true, subtree: true });
        }

        updateMetrics();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateMetrics);
            if (frame.current !== null) cancelAnimationFrame(frame.current);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    const handlePointerDown = (event) => {
        event.preventDefault();
        previousScrollBehavior.current = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        dragging.current = {
            startY: event.clientY,
            startScroll: window.scrollY,
            maximumScroll: metrics.maximumScroll,
            maximumThumbTop: metrics.maximumThumbTop
        };
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event) => {
        if (!dragging.current) {
            return;
        }

        const dragDistance = event.clientY - dragging.current.startY;
        const scrollDistance = dragging.current.maximumThumbTop
            ? (dragDistance / dragging.current.maximumThumbTop) * dragging.current.maximumScroll
            : 0;

        document.documentElement.scrollTop = dragging.current.startScroll + scrollDistance;
    };

    const stopDragging = () => {
        document.documentElement.style.scrollBehavior = previousScrollBehavior.current;
        dragging.current = null;
    };

    const handleTrackPointerDown = (event) => {
        if (event.target !== event.currentTarget || !metrics.maximumThumbTop) {
            return;
        }

        const trackBounds = event.currentTarget.getBoundingClientRect();
        const desiredThumbTop = event.clientY - trackBounds.top - metrics.thumbHeight / 2;
        const scrollRatio = Math.min(
            Math.max(desiredThumbTop / metrics.maximumThumbTop, 0),
            1
        );

        document.documentElement.scrollTop = scrollRatio * metrics.maximumScroll;
    };

    if (!metrics.maximumScroll) {
        return null;
    }

    return (
        <div
            className="custom-scrollbar"
            style={{ top: `${metrics.headerHeight}px` }}
            role="scrollbar"
            aria-label="Page scrollbar"
            aria-controls="main-content"
            aria-valuemin="0"
            aria-valuemax={metrics.maximumScroll}
            aria-valuenow={window.scrollY}
            onPointerDown={handleTrackPointerDown}
        >
            <div
                className="custom-scrollbar_thumb"
                style={{
                    height: `${metrics.thumbHeight}px`,
                    transform: `translateY(${metrics.thumbTop}px)`
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
                onLostPointerCapture={stopDragging}
            />
        </div>
    );
}
