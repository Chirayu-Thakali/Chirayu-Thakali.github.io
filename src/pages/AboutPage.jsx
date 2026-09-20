export default function AboutPage() {
    return (
        <section className="page-section" aria-labelledby="about-title">
            <h1 id="about-title">About this space</h1>
            <div className="about-layout">
                <div className="about-lead">
                    <p className="lead-text">
                        This page is ready for your story: who you are, what you care about, and the perspective you bring to your work.
                    </p>
                    <p>
                        Replace this placeholder copy with a concise introduction. Keep it human, specific, and easy to scan. This layout can grow with a biography, timeline, values, or anything else that helps people understand the person behind the work.
                    </p>
                </div>
                <dl className="fact-list">
                    <div>
                        <dt>Focus</dt>
                        <dd>Creative technology</dd>
                    </div>
                    <div>
                        <dt>Based in</dt>
                        <dd>Your city, country</dd>
                    </div>
                    <div>
                        <dt>Open to</dt>
                        <dd>Good conversations</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
