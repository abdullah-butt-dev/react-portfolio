import { useEffect, useRef } from 'react';
import { Grid2x2, Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';
import HeroIllustration from './HeroIllustration.jsx';
import { useSiteContent } from '../lib/usePortfolioData.js';

// Fallback used while the row loads (or if it's ever missing) so the hero
// never renders blank — mirrors the previous hardcoded copy exactly.
const FALLBACK = {
  greeting: "Hi, I'm",
  name: 'Abdullah',
  titles: ['Data Analyst', 'SQL Developer', 'Dashboard Developer'],
  eyebrow: 'Available for Freelance Work',
  subtext: "I help growing brands, stores and marketing teams make confident moves that increase sales. I find the hidden opportunities in your numbers so you can stop wasting your budget and scale with certainty.",
  cv_url: '/Abdullah-CV.pdf',
  github_url: 'https://github.com/abdullah-butt-dev',
  linkedin_url: 'https://linkedin.com/in/abdullah-butt-da',
  email: 'abdullah.butt.da@gmail.com',
  illustration_image: null,
};

export default function Hero({ onNav }) {
  const { content } = useSiteContent('hero', FALLBACK);
  const c = { ...FALLBACK, ...content };
  const textRef = useRef(null);

  // Typewriter effect reads the *current* titles array each render via a
  // ref, since content can (in theory) update after the effect mounts —
  // in practice this only runs once per page load, so it's mostly about
  // not capturing a stale closure over `c.titles`.
  const titlesRef = useRef(c.titles);
  titlesRef.current = c.titles && c.titles.length ? c.titles : FALLBACK.titles;

  useEffect(() => {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    function typeEffect() {
      const titles = titlesRef.current;
      const currentTitle = titles[titleIndex % titles.length];
      if (!textRef.current) return;

      if (isDeleting) {
        textRef.current.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        textRef.current.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentTitle.length) {
        timeoutId = setTimeout(() => {
          isDeleting = true;
          timeoutId = setTimeout(typeEffect, 300);
        }, 2000);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        timeoutId = setTimeout(typeEffect, 500);
        return;
      }

      const speed = isDeleting ? 40 : 80;
      timeoutId = setTimeout(typeEffect, speed);
    }

    timeoutId = setTimeout(typeEffect, 1000);
    return () => clearTimeout(timeoutId);
    // Intentionally runs once on mount, same as the original — the ref
    // above handles reading fresh titles without needing to restart the effect.
  }, []);

  return (
    <section id="hero">
      <div className="hero-grid-bg" aria-hidden="true"></div>
      <div className="hero-orb one" aria-hidden="true"></div>
      <div className="hero-orb two" aria-hidden="true"></div>
      <div className="container first hero-content">
        <div className="hero-text">
          <p className="hero-eyebrow"><span className="pulse-dot"></span>{c.eyebrow}</p>
          <p className="hero-greeting">{c.greeting}</p>
          <h1 className="hero-name">{c.name} <span className="highlight">.</span></h1>
          <div className="hero-title" id="typewriter">
            <span className="glow-text" ref={textRef}>{(c.titles && c.titles[0]) || FALLBACK.titles[0]}</span>
            <span className="typing-cursor"></span>
          </div>
          <p className="hero-sub">{c.subtext}</p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => onNav('projects')}>
              <Grid2x2 size={14} />
              View My Work
            </button>
            <a className="btn-outline" href={c.cv_url} download>
              <FileText size={14} />
              Download CV
            </a>
            <a className="btn-outline" href={c.github_url} target="_blank" rel="noopener noreferrer">
              <Github size={14} />
              GitHub
            </a>
            <a className="btn-outline" href={c.linkedin_url} target="_blank" rel="noopener noreferrer">
              <Linkedin size={14} />
              LinkedIn
            </a>
            <a className="btn-outline" href={`mailto:${c.email}`}>
              <Mail size={14} />
              Email
            </a>
          </div>
          <div className="hero-scroll">
            <span className="scroll-arrow"><ArrowDown size={13} /></span>
            <span>scroll to explore</span>
          </div>
        </div>
        <HeroIllustration imageUrl={c.illustration_image} />
      </div>
    </section>
  );
}