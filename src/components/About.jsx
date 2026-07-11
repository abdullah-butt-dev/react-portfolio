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
              Businesses generate massive amounts of customer and sales information every day, but it is useless if it just sits there. As a data analyst, I dig into your order history, website traffic, and ad accounts to give you clear answers. 
            </p>
            <p className="reveal">
              You will see exactly which marketing channels bring in cash, where you are losing shoppers before they buy, and how to keep customers coming back for a second purchase.
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