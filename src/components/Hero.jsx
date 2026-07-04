import { useEffect, useRef } from 'react';
import { Grid2x2, Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';
import HeroIllustration from './HeroIllustration.jsx';

const TITLES = [
  'Data Analyst',
  'SQL Developer',
  'Dashboard Builder',
];

export default function Hero({ onNav }) {
  const textRef = useRef(null);

  useEffect(() => {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId;

    function typeEffect() {
      const currentTitle = TITLES[titleIndex];
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
        titleIndex = (titleIndex + 1) % TITLES.length;
        timeoutId = setTimeout(typeEffect, 500);
        return;
      }

      const speed = isDeleting ? 40 : 80;
      timeoutId = setTimeout(typeEffect, speed);
    }

    timeoutId = setTimeout(typeEffect, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="hero">
      <div className="hero-grid-bg" aria-hidden="true"></div>
      <div className="hero-orb one" aria-hidden="true"></div>
      <div className="hero-orb two" aria-hidden="true"></div>
      <div className="container first hero-content">
        <div className="hero-text">
          <p className="hero-eyebrow"><span className="pulse-dot"></span>Available for Freelance Work</p>
          <p className="hero-greeting">Hi, I'm</p>
          <h1 className="hero-name">Abdullah <span className="highlight">.</span></h1>
          <div className="hero-title" id="typewriter">
            <span className="glow-text" ref={textRef}>Data Analyst</span>
            <span className="typing-cursor"></span>
          </div>
          <p className="hero-sub">
            I turn raw data into actionable business insights that help companies make better decisions — using SQL, Python, and data visualization.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => onNav('projects')}>
              <Grid2x2 size={14} />
              View My Work
            </button>
            <a className="btn-outline" href="/Abdullah-CV.pdf" download>
              <FileText size={14} />
              Download CV
            </a>
            <a className="btn-outline" href="https://github.com/abdullah-butt-dev" target="_blank" rel="noopener noreferrer">
              <Github size={14} />
              GitHub
            </a>
            <a className="btn-outline" href="https://linkedin.com/in/abdullah-butt-da" target="_blank" rel="noopener noreferrer">
              <Linkedin size={14} />
              LinkedIn
            </a>
            <a className="btn-outline" href="mailto:abdullah.butt.da@gmail.com">
              <Mail size={14} />
              Email
            </a>
          </div>
          <div className="hero-scroll">
            <span className="scroll-arrow"><ArrowDown size={13} /></span>
            <span>scroll to explore</span>
          </div>
        </div>
        <HeroIllustration />
      </div>
    </section>
  );
}
