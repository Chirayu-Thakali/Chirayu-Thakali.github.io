import { useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import ScrollBar from "./components/ScrollBar.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import HomePage from "./pages/HomePage.jsx";

const routes = {
    "#home": "home",
    "#about": "about",
    "#contact": "contact"
};

function PageContent({ page }) {
    if (page === "about") return <AboutPage />;
    if (page === "contact") return <ContactPage />;
    return <HomePage />;
}

export default function App() {
    const [page, setPage] = useState(routes[window.location.hash] || "home");

    useEffect(() => {
        const handleRouteChange = () => {
            setPage(routes[window.location.hash] || "home");
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
        window.addEventListener("hashchange", handleRouteChange);
        return () => window.removeEventListener("hashchange", handleRouteChange);
    }, []);

    return (
        <div className="site-page">
            <Header currentPage={page} />
            <main id="main-content" className="page-content">
                <PageContent page={page} />
            </main>
            <Footer />
            <ScrollBar />
        </div>
    );
}
