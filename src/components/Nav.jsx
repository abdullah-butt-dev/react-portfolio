import { Sun, Moon, FileText } from 'lucide-react';

const SECTIONS = ['about', 'skills', 'projects', 'experience', 'certifications', 'contact'];

export default function Nav({ theme, toggleTheme, activeSection, onNav, menuOpen, toggleMenu }) {
  return (
    <nav>
      <div className="nav-logo">A<span>.</span></div>
      <ul className="nav-links" id="navLinks">
        {SECTIONS.map((id) => (
          <li
            key={id}
            data-section={id}
            className={activeSection === id ? 'active' : ''}
            onClick={() => onNav(id)}
          >
            {id === 'certifications' ? 'Certs' : id[0].toUpperCase() + id.slice(1)}
          </li>
        ))}
        <li className="cv-pill">
          <a href="/Abdullah-CV.pdf" download style={{ display: 'flex', alignItems: 'center', gap: '.4rem', color: 'inherit' }}>
            <FileText size={14} />
            CV
          </a>
        </li>
      </ul>
      <div className="nav-right">
        <button className="icon-btn" id="themeBtn" onClick={toggleTheme} aria-label="Toggle theme">
          <span className="theme-icon">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </span>
        </button>
        <a className="icon-btn cv-mobile-btn" href="/Abdullah-CV.pdf" download aria-label="Download CV">
          <FileText size={16} />
        </a>
        <button className={`icon-btn hamburger${menuOpen ? ' active' : ''}`} id="hamburger" onClick={toggleMenu} aria-label="Menu" aria-expanded={menuOpen}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
