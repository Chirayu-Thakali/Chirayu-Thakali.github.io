import { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ScrollBar from "./components/ScrollBar.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";

const routes = {
    "#home": "home",
    "#about": "about",
    "#contact": "contact",
    "#portfolio": "portfolio"
};

function getRoute() {
    const [base, rawCategorySlug] = window.location.hash.split("/");
    let categorySlug;

    try {
        categorySlug = rawCategorySlug ? decodeURIComponent(rawCategorySlug) : undefined;
    } catch {
        categorySlug = undefined;
    }

    return { page: routes[base] || "home", categorySlug };
}

function PageContent({ page, categorySlug }) {
    if (page === "about") return <AboutPage />;
    if (page === "contact") return <ContactPage />;
    if (page === "portfolio") return <PortfolioPage categorySlug={categorySlug} />;
    return <HomePage />;
}

export default function App() {
    const initialRoute = getRoute();
    const [page, setPage] = useState(initialRoute.page);
    const [categorySlug, setCategorySlug] = useState(initialRoute.categorySlug);
    const [transition, setTransition] = useState("cover");
    const [initialLoad, setInitialLoad] = useState(true);
    const transitionTimers = useRef([]);

    const clearTransitionTimers = () => {
        transitionTimers.current.forEach((timer) => window.clearTimeout(timer));
        transitionTimers.current = [];
    };

    const scheduleTransition = (callbacks) => {
        clearTransitionTimers();
        transitionTimers.current = callbacks.map(({ delay, callback }) =>
            window.setTimeout(callback, delay)
        );
    };

    useEffect(() => {
        const handleRouteChange = () => {
            const nextRoute = getRoute();
            setTransition("cover");

            scheduleTransition([
                {
                    delay: 420,
                    callback: () => {
                        setPage(nextRoute.page);
                        setCategorySlug(nextRoute.categorySlug);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setTransition("rotate");
                    }
                },
                { delay: 1070, callback: () => setTransition("reveal") },
                { delay: 1510, callback: () => setTransition("idle") }
            ]);
        };
        window.addEventListener("hashchange", handleRouteChange);
        return () => {
            window.removeEventListener("hashchange", handleRouteChange);
            clearTransitionTimers();
        };
    }, []);

    useEffect(() => {
        scheduleTransition([
            { delay: 420, callback: () => setTransition("rotate") },
            { delay: 1070, callback: () => setTransition("reveal") },
            {
                delay: 1510,
                callback: () => {
                    setTransition("idle");
                    setInitialLoad(false);
                }
            }
        ]);

        return () => {
            clearTransitionTimers();
        };
    }, []);

    return (
        <div
            className={`site-page ${transition !== "idle" ? "site-page--transitioning" : ""} ${
                initialLoad ? "site-page--initializing" : ""
            }`}
        >
            <Header currentPage={page} />
            <main id="main-content" className="page-content" key={`${page}-${categorySlug || "index"}`}>
                <PageContent page={page} categorySlug={categorySlug} />
            </main>
            <Footer />
            <ScrollBar />
            <div className={`page-wipe page-wipe--${transition}`} aria-hidden="true">
                <span className="page-wipe_shape page-wipe_shape--diamond" />
                <span className="page-wipe_shape page-wipe_shape--line" />
                <span className="page-wipe_shape page-wipe_shape--line" />
                <span className="page-wipe_shape page-wipe_shape--line" />
                <span className="page-wipe_shape page-wipe_shape--line" />
            </div>
        </div>
    );
}
