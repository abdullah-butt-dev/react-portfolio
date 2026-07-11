import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useSkills } from '../lib/usePortfolioData.js';
import { renderIcon, renderLogo } from '../lib/iconMap.jsx';

function SkillCard({ s }) {
  const [active, setActive] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.unobserve(node);
        }
      });
    }, { threshold: 0.1 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const logoSrc = s.logo ? renderLogo(s.logo) : null;
  const icon = s.icon ? renderIcon(s.icon, { size: 16, style: { color: 'var(--accent-2)' } }) : null;

  return (
    <div
      ref={cardRef}
      className={`skill-card reveal${revealed ? ' up' : ''}${active ? ' is-active' : ''}`}
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
          {logoSrc ? <img src={logoSrc} alt={`${s.title} logo`} /> : icon}
        </div>
        <span className="skill-card-title">{s.title}</span>
        <ChevronDown size={14} className="skill-chevron" />
      </div>
      <p className="skill-desc">{s.description}</p>
      <div className="skill-usage">
        <Sparkles size={12} />
        <span>{s.usage}</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const { data: skills, loading, error } = useSkills();

  return (
    <section id="skills">
      <div className="container">
        <p className="eyebrow reveal">Skills &amp; Tools</p>
        <h2 className="reveal">What I <span className="gradient-text">work with.</span></h2>
        <p className="skills-hint reveal">Hover or tap a card to see how I actually use it.</p>
        {loading && <p className="lead">Loading skills\u2026</p>}
        {error && <p className="form-error">Couldn't load skills \u2014 {error.message}</p>}
        <div className="skills-grid">
          {skills.map((s) => <SkillCard s={s} key={s.id} />)}
        </div>
      </div>
    </section>
  );
}