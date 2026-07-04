export default function About() {
  return (
    <section id="about">
      <div className="container">
        <p className="eyebrow reveal">About</p>
        <div className="about-grid">
          <div className="about-body">
            <h2 className="reveal" style={{ marginBottom: '1.25rem' }}>
              Analytics with a<br /><span className="gradient-text">business lens.</span>
            </h2>
            <p className="reveal">
              I'm a data analyst who focuses on extracting actionable business insights from complex datasets. My goal is to help companies make better, more informed decisions through data.
            </p>
            <p className="reveal">
              I work with SQL, Python, and data visualization tools to transform raw data into clear, compelling stories that drive value. Whether it's analyzing customer behavior, identifying growth opportunities, or building interactive dashboards — I deliver insights that matter.
            </p>
          </div>
          <div className="about-meta reveal">
            <div className="meta-row">
              <span className="meta-key">Status</span>
              <span className="meta-val"><span className="pulse"></span>Open to freelance</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Focus</span>
              <span className="meta-val">Business Insights &amp; Analytics</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Stack</span>
              <span className="meta-val">SQL · Power BI · Excel · Python</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
