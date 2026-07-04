import { ArrowUpRight, FileText, Github, Linkedin, Mail } from 'lucide-react';

const LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export default function MobileMenu({ open, onNav }) {
  return (
    <div className="mobile-menu" id="mobileMenu" aria-hidden={!open}>
      {LINKS.map((l) => (
        <a key={l.id} href={`#${l.id}`} onClick={(e) => { e.preventDefault(); onNav(l.id); }}>
          {l.label}
          <span className="menu-arrow"><ArrowUpRight size={16} /></span>
        </a>
      ))}
      <a href="/Abdullah-CV.pdf" download className="mobile-cv-btn">
        <FileText size={16} />
        Download CV
      </a>
      <div className="mobile-socials">
        <a href="https://github.com/abdullah-butt-dev" target="_blank" rel="noopener noreferrer">
          <Github size={16} /> GitHub
        </a>
        <a href="https://linkedin.com/in/abdullah-butt-dev-" target="_blank" rel="noopener noreferrer">
          <Linkedin size={16} /> LinkedIn
        </a>
        <a href="mailto:imabd50@gmail.com">
          <Mail size={16} /> Email
        </a>
      </div>
    </div>
  );
}
