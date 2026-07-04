import { Award, BadgeCheck, ArrowUpRight } from 'lucide-react';

const CERTS = [
  {
    name: 'Relational Database Certificate',
    issuer: 'freeCodeCamp',
    id: 'ID: fcc-0ea91854-9fcc-4db2-8dfb-e975e1128d9c-rdv9',
    link: 'https://freecodecamp.org/certification/fcc-0ea91854-9fcc-4db2-8dfb-e975e1128d9c/relational-databases-v9',
  },
];

export default function Certifications() {
  return (
    <section id="certifications">
      <div className="container">
        <p className="eyebrow reveal">Certifications</p>
        <h2 className="reveal">Verified <span className="gradient-text">credentials.</span></h2>
        <div className="cert-grid">
          {CERTS.map((c) => (
            <div className="cert-card reveal" key={c.name}>
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
                <a className="cert-link" href={c.link} target="_blank" rel="noopener noreferrer">
                  View <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
