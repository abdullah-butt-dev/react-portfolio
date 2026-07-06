export default function About() {
  return (
    <section id="about">
      <div className="container">
        <p className="eyebrow reveal">About</p>
        <div className="about-grid">
          <div className="about-body">
            <h2 className="reveal" style={{ marginBottom: '1.25rem' }}>
              Turning data into<br /><span className="gradient-text">revenue decisions.</span>
            </h2>
            <p className="reveal">
              I'm a data analyst focused on e-commerce and marketing analytics — helping brands understand their customers, their campaigns, and their sales performance well enough to act on it.
            </p>
            <p className="reveal">
              My work centers on customer behavior analysis, campaign performance tracking, retention metrics, and sales trend analysis. I use SQL, Python, and interactive dashboards to turn scattered order, traffic, and marketing data into clear answers — which channels are actually driving revenue, where customers drop off, and what's worth doubling down on.
            </p>
          </div>
          <div className="about-meta reveal">
            <div className="meta-row">
              <span className="meta-key">Status</span>
              <span className="meta-val"><span className="pulse"></span>Open to freelance</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Focus</span>
              <span className="meta-val">E-Commerce &amp; Marketing Analytics</span>
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