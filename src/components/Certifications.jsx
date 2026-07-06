import { useState, useRef, useEffect } from 'react';
import { Award, BadgeCheck, ArrowUpRight, RotateCw } from 'lucide-react';

const CERTS = [
  {
    name: 'Relational Database Certificate',
    issuer: 'freeCodeCamp',
    date: 'freeCodeCamp Certification',
    id: 'ID: fcc-0ea91854-9fcc-4db2-8dfb-e975e1128d9c-rdv9',
    skills: ['SQL', 'PostgreSQL', 'Bash Scripting', 'Database Design'],
    link: 'https://freecodecamp.org/certification/fcc-0ea91854-9fcc-4db2-8dfb-e975e1128d9c/relational-databases-v9',
  },
];

function CertCard({ c }) {
  const [flipped, setFlipped] = useState(false);
  // The page's ".reveal" fade-in normally gets its "up" (visible) class from
  // an IntersectionObserver that mutates the DOM directly (classList.add).
  // That works fine until something else re-renders this element — and
  // clicking the card to flip it does exactly that. React then rewrites
  // `className` from scratch using only the JSX template below, which never
  // mentions "up", so the manually-added class was being wiped out on every
  // click and the whole card would fade back to opacity:0. Tracking it in
  // React state instead (same fix as Skills.jsx) keeps it in the render
  // output permanently once revealed.
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

  return (
    <div
      ref={cardRef}
      className={`cert-flip reveal${revealed ? ' up' : ''}${flipped ? ' is-flipped' : ''}`}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped((f) => !f); } }}
    >
      <div className="cert-flip-inner">
        <div className="cert-face cert-face-front">
          <div className="cert-header">
            <div className="cert-icon"><Award size={18} /></div>
            <div>
              <p className="cert-name">{c.name}</p>
              <p className="cert-issuer">{c.issuer}</p>
            </div>
          </div>
          <span className="cert-id">{c.id}</span>
          <div className="cert-bottom">
            <span className="verified-badge"><BadgeCheck size={14} />Verified</span>
          </div>
          <span className="cert-flip-hint"><RotateCw />Click for details</span>
        </div>

        <div className="cert-face cert-face-back">
          <div>
            <p className="cert-back-title">Issued By</p>
            <p className="cert-name" style={{ marginBottom: '.9rem' }}>{c.issuer}</p>
            <p className="cert-back-date">{c.date}</p>
            <p className="cert-back-title">Skills Covered</p>
            <div className="cert-skills">
              {c.skills.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
          <a
            className="cert-link"
            href={c.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            View Certificate <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="container">
        <p className="eyebrow reveal">Certifications</p>
        <h2 className="reveal">Verified <span className="gradient-text">credentials.</span></h2>
        <div className="cert-grid">
          {CERTS.map((c) => <CertCard c={c} key={c.name} />)}
        </div>
      </div>
    </section>
  );
}