import { useState } from 'react';
import { Database, ChevronDown, Sparkles } from 'lucide-react';
import { LOGOS } from '../logos.js';

const SKILLS = [
  {
    title: 'Python',
    logo: LOGOS.python,
    desc: "Pandas, NumPy, Matplotlib & Seaborn for cleaning, analysis, and visualization — written and run in Jupyter Notebook.",
    usage: 'Primary use: cleaning & analyzing raw datasets',
    color: '#3776AB',
  },
  {
    title: 'SQL',
    icon: <Database size={16} style={{ color: 'var(--accent-2)' }} />,
    desc: 'Querying, joining, and modeling relational data for business reporting and dashboards.',
    usage: 'Primary use: querying & reporting on business data',
    color: '#22d3ee',
  },
  {
    title: 'Power BI',
    logo: LOGOS.powerbi,
    desc: 'Building interactive reports and dashboards for business insight delivery.',
    usage: 'Primary use: client-ready reporting dashboards',
    color: '#F2C811',
  },
  {
    title: 'Microsoft Excel',
    logo: LOGOS.excel,
    desc: 'Data cleaning, pivot tables, and quick exploratory analysis.',
    usage: 'Primary use: fast exploratory data checks',
    color: '#217346',
  },
  {
    title: 'Streamlit',
    logo: LOGOS.streamlit,
    desc: 'Turning analysis notebooks into deployed, interactive web dashboards.',
    usage: 'Primary use: shipping live, interactive dashboards',
    color: '#FF4B4B',
  },
  {
    title: 'GitHub',
    logo: LOGOS.github,
    desc: 'Version control, project hosting, and sharing reproducible analysis code.',
    usage: 'Primary use: version control & sharing code',
    color: '#a78bfa',
  },
];

function SkillCard({ s }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`skill-card reveal${s.featured ? ' skill-card--featured' : ''}${active ? ' is-active' : ''}`}
      style={{ '--accent': s.color }}
      tabIndex={0}
      role="button"
      aria-expanded={active}
      onClick={() => setActive((a) => !a)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive((a) => !a); } }}
      onBlur={() => setActive(false)}
    >
      <div className="skill-card-header">
        <div className="skill-icon">
          {s.logo ? <img src={s.logo} alt={`${s.title} logo`} /> : s.icon}
        </div>
        <span className="skill-card-title">{s.title}</span>
        <ChevronDown size={14} className="skill-chevron" />
      </div>
      <p className="skill-desc">{s.desc}</p>
      <div className="skill-usage">
        <Sparkles size={12} />
        <span>{s.usage}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <p className="eyebrow reveal">Skills &amp; Tools</p>
        <h2 className="reveal">What I <span className="gradient-text">work with.</span></h2>
        <p className="skills-hint reveal">Hover or tap a card to see how I actually use it.</p>
        <div className="skills-grid">
          {SKILLS.map((s) => <SkillCard s={s} key={s.title} />)}
        </div>
      </div>
    </section>
  );
}
