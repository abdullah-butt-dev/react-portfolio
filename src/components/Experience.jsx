import { useEffect, useRef } from 'react';
import { Megaphone, BarChart3, Sparkles, Smile, Database } from 'lucide-react';
import { LOGOS } from '../logos.js';

const EXPERIENCE = [
  {
    date: <><span className="tl-current"><span className="pulse"></span>Jul 2026</span><br />— Present</>,
    org: 'FlyRank AI',
    role: 'AI Marketing Intern',
    desc: 'Working on AI-driven marketing analytics — supporting campaign performance tracking, audience insight generation, and data-backed reporting for marketing strategy decisions.',
    tags: [
      { logo: LOGOS.python, label: 'Python' },
      { icon: <BarChart3 size={12} />, label: 'Data Analysis' },
      { icon: <Megaphone size={12} />, label: 'Marketing Analytics' },
      { icon: <Sparkles size={12} />, label: 'AI Tools' },
    ],
  },
  {
    date: <>Jun 2026<br />— Jul 2026</>,
    org: 'CodeAlpha',
    role: 'Data Analyst Intern',
    desc: 'Completed analytics projects including predictive modeling and data visualization. Cleaned and queried business data in PostgreSQL and shipped a live dashboard with the SQLPage framework. Built a deployed Streamlit dashboard for sentiment analysis, applying VADER and TextBlob to a large-scale Amazon review dataset.',
    tags: [
      { icon: <Database size={15} style={{ color: 'var(--accent-2)' }}  />, label: 'SQL' },
      { logo: LOGOS.postgresql, label: 'PostgreSQL' },
      { logo: LOGOS.python, label: 'Python' },
      { icon: <Smile size={12} />, label: 'VADER' },
      { logo: LOGOS.streamlit, label: 'Streamlit' },
    ],
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
  return <span className="tag" title={tag.label}>{tag.icon}{tag.label}</span>;
}

export default function Experience() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const container = timelineRef.current;
    if (!container) return;
    const tlItems = [...container.querySelectorAll('.tl-item')];

    function updateTimelineFills() {
      const vh = window.innerHeight;
      const triggerLine = vh * 0.82;
      tlItems.forEach((item) => {
        const dot = item.querySelector('.tl-dot');
        const track = item.querySelector('.tl-track');
        if (!dot) return;
        const dotRect = dot.getBoundingClientRect();
        const started = dotRect.top <= triggerLine;
        item.classList.toggle('filled', started);
        if (track) {
          const trackRect = track.getBoundingClientRect();
          const progress = (triggerLine - trackRect.top) / trackRect.height;
          const clamped = Math.max(0, Math.min(1, progress));
          track.style.setProperty('--fill', `${clamped * 100}%`);
        }
      });
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { updateTimelineFills(); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateTimelineFills);
    updateTimelineFills();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTimelineFills);
    };
  }, []);

  return (
    <section id="experience">
      <div className="container">
        <p className="eyebrow reveal">Experience</p>
        <h2 className="reveal">Where I've <span className="gradient-text">worked.</span></h2>
        <div className="timeline" ref={timelineRef}>
          {EXPERIENCE.map((e) => (
            <div className="tl-item reveal" key={e.org}>
              <div className="tl-date">{e.date}</div>
              <div className="tl-line"><div className="tl-dot"></div><div className="tl-track"></div></div>
              <div className="tl-body">
                <p className="tl-org">{e.org}</p>
                <p className="tl-role">{e.role}</p>
                <p className="tl-desc">{e.desc}</p>
                <div className="tl-tags">
                  {e.tags.map((t) => <TagRender tag={t} key={t.label} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
