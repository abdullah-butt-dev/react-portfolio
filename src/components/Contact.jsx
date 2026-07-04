import { Mail, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <p className="eyebrow reveal">Contact</p>
        <h2 className="reveal">Let's <span className="gradient-text">connect.</span></h2>
        <p className="lead reveal" style={{ marginTop: '.85rem', marginBottom: 0 }}>
          Open to freelance projects and collaboration. Reach out via any channel below.
        </p>
        <div className="contact-links">
          <a className="contact-link reveal" href="mailto:abdullah.butt.da@gmail.com" aria-label="Email" title="Email">
            <Mail size={20} />
          </a>
          <a className="contact-link reveal" href="https://linkedin.com/in/abdullah-butt-da" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a className="contact-link reveal" href="https://github.com/abdullah-butt-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <Github size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
