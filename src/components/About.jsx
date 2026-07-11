import { useSiteContent } from '../lib/usePortfolioData.js';

const FALLBACK = {
  eyebrow: 'About',
  heading_line1: 'Turning data into',
  heading_line2: 'revenue decisions.',
  paragraph1: 'Businesses generate massive amounts of customer and sales information every day, but it is useless if it just sits there. As a data analyst, I dig into your order history, website traffic, and ad accounts to give you clear answers.',
  paragraph2: 'You will see exactly which marketing channels bring in cash, where you are losing shoppers before they buy, and how to keep customers coming back for a second purchase.',
  status: 'Open to freelance',
  focus: 'E-Commerce & Marketing Analytics',
  stack: 'SQL · Power BI · Excel · Python',
};

export default function About() {
  const { content } = useSiteContent('about', FALLBACK);
  const c = { ...FALLBACK, ...content };

  return (
    <section id="about">
      <div className="container">
        <p className="eyebrow reveal">{c.eyebrow}</p>
        <div className="about-grid">
          <div className="about-body">
            <h2 className="reveal" style={{ marginBottom: '1.25rem' }}>
              {c.heading_line1}<br /><span className="gradient-text">{c.heading_line2}</span>
            </h2>
            <p className="reveal">{c.paragraph1}</p>
            <p className="reveal">{c.paragraph2}</p>
          </div>
          <div className="about-meta reveal">
            <div className="meta-row">
              <span className="meta-key">Status</span>
              <span className="meta-val"><span className="pulse"></span>{c.status}</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Focus</span>
              <span className="meta-val">{c.focus}</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">Stack</span>
              <span className="meta-val">{c.stack}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}