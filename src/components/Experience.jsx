import { useEffect, useRef } from 'react';
import { useSiteContent } from '../lib/usePortfolioData.js';
import { renderIcon, renderLogo } from '../lib/iconMap.jsx';

const FALLBACK_ITEMS = [
  {
    date_label: 'Jul 2026',
    date_sub: '— Present',
    current: true,
    org: 'FlyRank AI',
    role: 'AI Marketing Intern',
    desc: 'Working on AI-driven marketing analytics — supporting campaign performance tracking, audience insight generation, and data-backed reporting for marketing strategy decisions.',
    tags: [
      { logo: 'python', label: 'Python' },
      { icon: 'barchart3', label: 'Data Analysis' },
      { icon: 'megaphone', label: 'Marketing Analytics' },
      { icon: 'sparkles', label: 'AI Tools' },
    ],
  },
  {
    date_label: 'Jun 2026',
    date_sub: '— Jul 2026',
    current: false,
    org: 'CodeAlpha',
    role: 'Data Analyst Intern',
    desc: 'Completed analytics projects including predictive modeling and data visualization. Cleaned and queried business data in PostgreSQL and shipped a live dashboard with the SQLPage framework. Built a deployed Streamlit dashboard for sentiment analysis, applying VADER and TextBlob to a large-scale Amazon review dataset.',
    tags: [
      { icon: 'database', label: 'SQL' },
      { logo: 'postgresql', label: 'PostgreSQL' },
      { logo: 'python', label: 'Python' },
      { icon: 'smile', label: 'VADER' },
      { logo: 'streamlit', label: 'Streamlit' },
    ],
  },
];

const FALLBACK = { eyebrow: 'Experience', items: FALLBACK_ITEMS };

// Tags now carry string keys ('logo'/'icon') resolved through the shared
// iconMap — same lookup Skills.jsx already uses, so a tag added via the
// admin panel just needs a key that exists in iconMap.jsx / logos.js.
function TagRender({ tag }) {
  const logoSrc = tag.logo ? renderLogo(tag.logo) : null;
  const icon = tag.icon ? renderIcon(tag.icon, { size: 12 }) : null;

  if (logoSrc) {
    return (
      <span className="tag" title={tag.label}>
        <span className="tag-logo"><img src={logoSrc} alt="" /></span>
        {tag.label}
      </span>
    );
  }
  return <span className="tag" title={tag.label}>{icon}{tag.label}</span>;
}

export default function Experience() {
  const { content } = useSiteContent('experience', FALLBACK);
  const c = { ...FALLBACK, ...content };
  const items = c.items && c.items.length ? c.items : FALLBACK_ITEMS;

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
    // Re-run when the number of timeline items changes (e.g. right after
    // the Supabase fetch resolves and swaps in real content), so the fill
    // measurements aren't stuck from an empty/fallback render.
  }, [items.length]);

  return (
    <section id="experience">
      <div className="container">
        <p className="eyebrow reveal">{c.eyebrow}</p>
        <h2 className="reveal">Where I've <span className="gradient-text">worked.</span></h2>
        <div className="timeline" ref={timelineRef}>
          {items.map((e) => (
            <div className="tl-item reveal" key={e.org}>
              <div className="tl-date">
                {e.current ? <span className="tl-current"><span className="pulse"></span>{e.date_label}</span> : e.date_label}
                <br />{e.date_sub}
              </div>
              <div className="tl-line"><div className="tl-dot"></div><div className="tl-track"></div></div>
              <div className="tl-body">
                <p className="tl-org">{e.org}</p>
                <p className="tl-role">{e.role}</p>
                <p className="tl-desc">{e.desc}</p>
                <div className="tl-tags">
                  {(e.tags || []).map((t) => <TagRender tag={t} key={t.label} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}