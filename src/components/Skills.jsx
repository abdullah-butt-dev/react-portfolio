import { Database } from 'lucide-react';
import { LOGOS } from '../logos.js';

const SKILLS = [
  {
    title: 'Python',
    logo: LOGOS.python,
    desc: "Pandas, NumPy, Matplotlib & Seaborn for cleaning, analysis, and visualization — written and run in Jupyter Notebook.",
  },
  {
    title: 'SQL',
    icon: <Database size={16} style={{ color: 'var(--accent-2)' }} />,
    desc: 'Querying, joining, and modeling relational data for business reporting and dashboards.',
  },
  {
    title: 'Power BI',
    logo: LOGOS.powerbi,
    desc: 'Building interactive reports and dashboards for business insight delivery.',
  },
  {
    title: 'Microsoft Excel',
    logo: LOGOS.excel,
    desc: 'Data cleaning, pivot tables, and quick exploratory analysis.',
  },
  {
    title: 'Streamlit',
    logo: LOGOS.streamlit,
    desc: 'Turning analysis notebooks into deployed, interactive web dashboards.',
  },
  {
    title: 'GitHub',
    logo: LOGOS.github,
    desc: 'Version control, project hosting, and sharing reproducible analysis code.',
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <p className="eyebrow reveal">Skills &amp; Tools</p>
        <h2 className="reveal">What I <span className="gradient-text">work with.</span></h2>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <div className="skill-card reveal" key={s.title}>
              <div className="skill-card-header">
                <div className="skill-icon">
                  {s.logo ? <img src={s.logo} alt={`${s.title} logo`} /> : s.icon}
                </div>
                <span className="skill-card-title">{s.title}</span>
              </div>
              <p className="skill-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
