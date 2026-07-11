import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye, CircleHelp, Settings2, Lightbulb,
  ExternalLink, Github, BookOpen,
} from 'lucide-react';
import { useProjects } from '../lib/usePortfolioData.js';
import { renderIcon, renderLogo } from '../lib/iconMap.jsx';

// Converts a raw Supabase `projects` row back into the exact shape
// ProjectCard/TagRender/ProjectDetail expect \u2014 icon/logo string keys become
// real elements/images, snake_case DB columns become the camelCase field
// names the rest of the app already uses.
export function mapProjectRow(row) {
  return {
    slug: row.slug,
    num: row.num,
    impactIcon: renderIcon(row.impact_icon),
    impact: row.impact,
    title: row.title,
    image: row.image,
    alt: row.alt,
    steps: row.steps || [],
    stats: row.stats || [],
    desc: row.description,
    tags: (row.tags || []).map((t) => ({
      ...t,
      icon: t.icon ? renderIcon(t.icon, { size: 12 }) : undefined,
      logo: t.logo ? renderLogo(t.logo) : undefined,
    })),
    demo: row.demo,
    code: row.code,
    caseStudy: row.case_study || {},
  };
}

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
        <div
          className="preview-overlay"
          onClick={() => window.open(p.demo, '_blank')}
          style={{ cursor: 'pointer' }}
        >
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

      <div className="pc-tags">
        {p.tags.map((t) => <TagRender tag={t} key={t.label} />)}
      </div>

      <div className="pc-actions">
        <Link to={`/projects/${p.slug}`} className="pc-btn">
          <BookOpen size={14} />
          Case Study
        </Link>
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
  const { data: rows, loading, error } = useProjects();
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const projects = rows.map(mapProjectRow);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const pending = node.querySelectorAll('.reveal:not(.up)');
    if (!pending.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('up');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [showAll, loading]);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">
        <p className="eyebrow reveal">Projects</p>
        <h2 className="reveal">Selected <span className="gradient-text">work.</span></h2>

        {loading && <p className="lead" style={{ marginTop: '1.5rem' }}>Loading projects\u2026</p>}
        {error && <p className="form-error">Couldn't load projects \u2014 {error.message}</p>}

        <div className="projects-grid">
          {visibleProjects.map((p) => <ProjectCard p={p} key={p.slug} />)}
        </div>
        {!loading && !showAll && projects.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              href="#projects"
              className="view-all-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowAll(true);
              }}
            >
              View All Projects
              <ExternalLink size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}