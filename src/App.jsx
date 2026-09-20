import { useEffect, useState } from "react";
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
    const categorySlug = rawCategorySlug ? decodeURIComponent(rawCategorySlug) : undefined;
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

    useEffect(() => {
        const handleRouteChange = () => {
            const nextRoute = getRoute();
            setTransition("cover");

            window.setTimeout(() => {
                setPage(nextRoute.page);
                setCategorySlug(nextRoute.categorySlug);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTransition("rotate");
            }, 420);

            window.setTimeout(() => setTransition("reveal"), 1070);
            window.setTimeout(() => setTransition("idle"), 1510);
        };
        window.addEventListener("hashchange", handleRouteChange);
        return () => window.removeEventListener("hashchange", handleRouteChange);
    }, []);

    useEffect(() => {
        const rotateTimer = window.setTimeout(() => setTransition("rotate"), 420);
        const revealTimer = window.setTimeout(() => setTransition("reveal"), 1070);
        const idleTimer = window.setTimeout(() => {
            setTransition("idle");
            setInitialLoad(false);
        }, 1510);
        return () => {
            window.clearTimeout(rotateTimer);
            window.clearTimeout(revealTimer);
            window.clearTimeout(idleTimer);
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
