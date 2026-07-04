import {
  BarChart3, Search, DollarSign, Eye, CircleHelp, Settings2, Lightbulb,
  ExternalLink, Github, Waves, Smile, FileText as FileTextIcon,
  FileCode, Database,
} from 'lucide-react';
import { LOGOS } from '../logos.js';

const PROJECTS = [
  {
    num: '01 · EDA · Dashboard',
    impactIcon: <BarChart3 size={13} />,
    impact: '100K+ orders analyzed',
    title: 'Olist Intelligence — E-Commerce Analytics',
    image: '/images/olist-thumb.png',
    alt: 'Olist Dashboard Preview',
    steps: [
      { label: 'Problem', text: '9 separate tables → no unified business view' },
      { label: 'Solution', text: 'Merged 9 CSV files into master table with 5 interactive tabs' },
      { label: 'Insight', text: 'Only 3% of customers reorder — huge retention opportunity' },
    ],
    stats: [
      { number: '100K+', label: 'Orders Analyzed' },
      { number: '9', label: 'Tables Merged' },
    ],
    desc: "Deep dive into 100K+ orders from Brazil's largest e-commerce platform. Reveals delivery, seller, category insights, and customer retention gaps.",
    tags: [
      { logo: LOGOS.python, label: 'Python' },
      { logo: LOGOS.pandas, label: 'Pandas' },
      { icon: <Waves size={12} />, label: 'Seaborn' },
      { logo: LOGOS.plotly, label: 'Plotly' },
      { logo: LOGOS.streamlit, label: 'Streamlit' },
    ],
    demo: 'https://olist-intelligence.streamlit.app/',
    code: 'https://github.com/abdullah-butt-dev/EDA-Olist',
  },
  {
    num: '02 · NLP · ML',
    impactIcon: <Search size={13} />,
    impact: '550K+ reviews analyzed',
    title: 'Amazon Review Sentiment Analyzer',
    image: '/images/amazon-sentiment-thumb.png',
    alt: 'Amazon Sentiment Dashboard Preview',
    steps: [
      { label: 'Problem', text: 'Manual review analysis is slow and inconsistent' },
      { label: 'Solution', text: 'NLP pipeline comparing VADER, TextBlob, and custom ML' },
      { label: 'Insight', text: 'Custom ML beats general tools by 9.4% for industry context' },
    ],
    stats: [
      { number: '89.6%', label: 'Custom ML Accuracy' },
      { number: '85.8%', label: 'VADER Accuracy' },
    ],
    desc: 'End-to-end NLP pipeline evaluating three sentiment classification techniques on 50,000 sampled e-commerce records. Interactive app for model comparison.',
    tags: [
      { logo: LOGOS.python, label: 'Python' },
      { icon: <Smile size={12} />, label: 'VADER' },
      { icon: <FileTextIcon size={12} />, label: 'TextBlob' },
      { logo: LOGOS.scikitlearn, label: 'Scikit-learn' },
      { logo: LOGOS.streamlit, label: 'Streamlit' },
    ],
    demo: 'https://amazon-reviews-sentiment-analyzer.streamlit.app/',
    code: 'https://github.com/abdullah-butt-dev/amazon-sentiment-app',
  },
  {
    num: '03 · Analytics · Dashboard',
    impactIcon: <BarChart3 size={13} />,
    impact: '2,000 visits analyzed',
    title: 'Website Traffic Analysis Dashboard',
    image: '/images/website-traffic-dash-thumb.png',
    alt: 'Website Traffic Dashboard Preview',
    steps: [
      { label: 'Problem', text: 'Unknown which traffic channels drive sales' },
      { label: 'Solution', text: 'Dashboard analyzing 2,000 visits across 5 channels' },
      { label: 'Insight', text: 'Referral traffic converts best — focus on partnerships' },
    ],
    stats: [
      { number: '98.2%', label: 'Conversion Rate Found' },
      { number: '28.5%', label: 'Bounce Rate Identified' },
    ],
    desc: 'Analyzed website traffic and user engagement to identify factors influencing conversion rates. Understand which traffic sources perform best.',
    tags: [
      { logo: LOGOS.python, label: 'Python' },
      { logo: LOGOS.pandas, label: 'Pandas' },
      { logo: LOGOS.plotly, label: 'Plotly' },
      { logo: LOGOS.streamlit, label: 'Streamlit' },
    ],
    demo: 'https://website-traffic-analysis-dashboard.streamlit.app/',
    code: 'https://github.com/abdullah-butt-dev/website-traffic-analysis-dashboard',
  },
  {
    num: '04 · SQL · Analytics',
    impactIcon: <DollarSign size={13} />,
    impact: '$2.3M+ revenue analyzed',
    title: 'Retail Sales SQL Analysis',
    image: '/images/retail-dash-thumb.png',
    alt: 'Retail Sales Dashboard Preview',
    steps: [
      { label: 'Problem', text: 'Unknown which regions/categories are profitable' },
      { label: 'Solution', text: 'SQL dashboard with regional profit analysis' },
      { label: 'Insight', text: 'Technology category has highest profit margin at 17.4%' },
    ],
    stats: [
      { number: '$2.3M+', label: 'Revenue Analyzed' },
      { number: '17.4%', label: 'Top Margin Category' },
    ],
    desc: 'PostgreSQL analysis of Superstore sales data. Identified revenue, profitability, customer behavior, product performance, and regional performance.',
    tags: [
      { icon: <Database size={15} style={{ color: 'var(--accent-2)' }} />, label: 'SQL' },
      { logo: LOGOS.postgresql, label: 'PostgreSQL' },
      { icon: <FileCode size={12} />, label: 'SQLPage' },
    ],
    demo: 'https://imab50-retail-sales-dashboard.hf.space/index.sql',
    code: 'https://github.com/abdullah-butt-dev/retail-sales-sql-analysis',
  },
];

function TagRender({ tag }) {
  if (tag.logoOnly) {
    return (
      <span className="tag icon-only" title={tag.label}>
        {tag.logo ? <img src={tag.logo} alt={tag.label} /> : tag.icon}
      </span>
    );
  }
  if (tag.logo) {
    return (
      <span className="tag" title={tag.label}>
        <span className="tag-logo"><img src={tag.logo} alt="" /></span>
        {tag.label}
      </span>
    );
  }
  return (
    <span className="tag" title={tag.label}>
      {tag.icon}
      {tag.label}
    </span>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="project-card reveal">
      <div className="pc-top">
        <span className="pc-num">{p.num}</span>
        <span className="impact-badge">{p.impactIcon}{p.impact}</span>
      </div>
      <p className="pc-title">{p.title}</p>

      <div className="dashboard-preview">
        <div className="skeleton"></div>
        <img
          src={p.image}
          alt={p.alt}
          loading="lazy"
          onLoad={(e) => {
            e.target.classList.add('loaded');
            if (e.target.previousElementSibling) e.target.previousElementSibling.style.display = 'none';
          }}
        />
        <div className="preview-overlay">
          <Eye size={16} /><span>Click to explore</span>
        </div>
      </div>

      <div className="case-flow">
        {p.steps.map((s, i) => (
          <div className="case-step" key={s.label}>
            <div className={`case-step-icon icon-${i === 0 ? 'problem' : i === 1 ? 'solution' : 'insight'}`}>
              {i === 0 ? <CircleHelp size={14} /> : i === 1 ? <Settings2 size={14} /> : <Lightbulb size={14} />}
            </div>
            <div className="case-step-content">
              <span className="step-label">{s.label}</span>
              <span className="step-text">{s.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="project-stats">
        {p.stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-number">{s.number}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <p className="pc-desc">{p.desc}</p>

      <div className="pc-tags">
        {p.tags.map((t) => <TagRender tag={t} key={t.label} />)}
      </div>

      <div className="pc-actions">
        <a className="pc-btn primary" href={p.demo} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={14} />
          Live Demo
        </a>
        <a className="pc-btn" href={p.code} target="_blank" rel="noopener noreferrer">
          <Github size={14} />
          Code
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <p className="eyebrow reveal">Projects</p>
        <h2 className="reveal">Selected <span className="gradient-text">work.</span></h2>
        <div className="projects-grid">
          {PROJECTS.map((p) => <ProjectCard p={p} key={p.title} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href="#projects"
            className="view-all-btn"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects .projects-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            View All Projects
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
