const navigation = [
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" }
];

export default function Header() {
    const currentPage = window.location.hash || "#home";

    return (
        <header className="site-header">
            <div className="site-header_inner">
                <a className="site-brand" href="#home" aria-label="Chirayu Thakali home">
                    <span className="site-brand_mark" aria-hidden="true">⫻</span>
                    <span>Chirayu Thakali</span>
                </a>
                <nav className="site-nav" aria-label="Primary navigation">
                    <ul className="site-nav_list">
                        {navigation.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    aria-current={currentPage === item.href ? "page" : undefined}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
