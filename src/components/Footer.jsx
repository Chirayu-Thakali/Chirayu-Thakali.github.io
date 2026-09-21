const contactLinks = [
    { label: "GitHub", href: "https://github.com/Cylindricalc", icon: "fab fa-github" },
    { label: "LinkedIn", href: "#", icon: "fab fa-linkedin-in" },
    { label: "X / Twitter", href: "#", icon: "fab fa-x-twitter" },
    { label: "Instagram", href: "https://www.instagram.com/chirayu_thakali/", icon: "fab fa-instagram" },
    { label: "Discord", href: "https://discordapp.com/users/756539358852546610", icon: "fab fa-discord" },
    { label: "Email", href: "mailto:cylinavamp@gmail.com", icon: "fas fa-envelope" },
    { label: "Phone / Mobile", href: "tel:+14849042448", icon: "fas fa-phone" },
    { label: "WhatsApp", href: "https://wa.me/+14849042448", icon: "fab fa-whatsapp" }
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="site-footer_inner">
                <div>
                    <p className="site-footer_label">Get in touch</p>
                    <div className="site-footer_contacts" aria-label="Contact and social links">
                        {contactLinks.map((contact) => (
                            <a
                                key={contact.label}
                                href={contact.href}
                                aria-label={contact.label}
                                title={contact.label}
                            >
                                <i className={contact.icon} aria-hidden="true"></i>
                            </a>
                        ))}
                    </div>
                </div>
                <p className="site-footer_copyright">
                    Copyright {new Date().getFullYear()} Chirayu Thakali. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
