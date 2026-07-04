import { useEffect, useState, useCallback } from 'react';
import Nav from './components/Nav.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import Hero from './components/Hero.jsx';
import Results from './components/Results.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Certifications from './components/Certifications.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';

const SECTION_IDS = ['hero', 'results', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => {
      const next = !open;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  const nav = useCallback((id) => {
    const wasOpen = menuOpen;
    if (wasOpen) {
      setMenuOpen(false);
      document.body.style.overflow = '';
    }
    setTimeout(() => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, wasOpen ? 320 : 0);
  }, [menuOpen]);

  // Scroll reveal for elements with class "reveal"
  useEffect(() => {
    const revEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const sibs = [...e.target.parentElement.querySelectorAll('.reveal:not(.up)')];
          const delay = Math.min(sibs.indexOf(e.target) * 70, 280);
          setTimeout(() => e.target.classList.add('up'), delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Active nav section indicator
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActiveSection(e.target.id);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach((s) => navIO.observe(s));
    return () => navIO.disconnect();
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [menuOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeydown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= SECTION_IDS.length) {
        nav(SECTION_IDS[num - 1]);
        e.preventDefault();
      }
      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
        e.preventDefault();
      }
      if ((e.key === 'm' || e.key === 'M') && window.innerWidth <= 768) {
        toggleMenu();
        e.preventDefault();
      }
      if (e.key === 'Escape' && menuOpen) {
        toggleMenu();
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [menuOpen, nav, toggleTheme, toggleMenu]);

  return (
    <>
      <div className="grid-bg" aria-hidden="true"></div>

      <Nav
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        onNav={nav}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
      />
      <MobileMenu open={menuOpen} onNav={nav} />

      <div className="page">
        <Hero onNav={nav} />
        <div className="divider"></div>

        <Results />
        <div className="divider"></div>

        <About />
        <div className="divider"></div>

        <Skills />
        <div className="divider"></div>

        <Projects />
        <div className="divider"></div>

        <Experience />
        <div className="divider"></div>

        <Certifications />
        <div className="divider"></div>

        <Contact />

        <Footer />
      </div>

      <BackToTop />
    </>
  );
}
