import { useState, useRef, useEffect } from 'react';
import { Award, BadgeCheck, ArrowUpRight, RotateCw } from 'lucide-react';
import { useCertifications } from '../lib/usePortfolioData.js';

function CertCard({ c }) {
  const [flipped, setFlipped] = useState(false);
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
          <span className="cert-id">{c.cert_id}</span>
          <div className="cert-bottom">
            <span className="verified-badge"><BadgeCheck size={14} />Verified</span>
          </div>
          <span className="cert-flip-hint"><RotateCw />Click for details</span>
        </div>

        <div className="cert-face cert-face-back">
          <div className="cert-back-top">
            <div>
              <p className="cert-back-title">Issued By</p>
              <p className="cert-name" style={{ marginBottom: 0 }}>{c.issuer}</p>
            </div>
            <a
              className="cert-link-icon"
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="View Certificate"
              title="View Certificate"
            >
              <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="cert-back-date">{c.cert_date}</p>
          <div>
            <p className="cert-back-title">Skills Covered</p>
            <div className="cert-skills">
              {(c.skills || []).map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const { data: certs, loading, error } = useCertifications();

  return (
    <section id="certifications">
      <div className="container">
        <p className="eyebrow reveal">Certifications</p>
        <h2 className="reveal">Verified <span className="gradient-text">credentials.</span></h2>
        {loading && <p className="lead">Loading certifications\u2026</p>}
        {error && <p className="form-error">Couldn't load certifications \u2014 {error.message}</p>}
        <div className="cert-grid">
          {certs.map((c) => <CertCard c={c} key={c.id} />)}
        </div>
      </div>
    </section>
  );
}