import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
    return (
        <div className="site-page">
            <Header />
            <main id="main-content" className="page-content">
                {/* Add page-specific components here. */}
            </main>
            <Footer />
        </div>
    );
}
