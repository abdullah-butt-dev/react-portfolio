export default function HeroIllustration({ imageUrl }) {
  // If the admin has uploaded a custom hero image, use it. Otherwise fall
  // back to the built-in animated "data pipeline" illustration below.
  if (imageUrl) {
    return (
      <div className="hero-visual" aria-hidden="true">
        <img src={imageUrl} alt="" className="hero-illustration-img" />
      </div>
    );
  }

  return (
    <div className="hero-visual" aria-hidden="true">
      <svg className="hero-illustration" viewBox="0 30 380 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pipeChartGrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--gradient-start)" />
            <stop offset="100%" stopColor="var(--gradient-end)" />
          </linearGradient>
        </defs>

        {/* ── guide path (faint, static) ── */}
        <path d="M80,130 C120,110 150,100 178,105" fill="none" stroke="var(--border2)" strokeWidth="1.5" strokeDasharray="3 4" opacity=".5" />
        <path d="M192,160 C210,180 235,170 258,140" fill="none" stroke="var(--border2)" strokeWidth="1.5" strokeDasharray="3 4" opacity=".5" />

        {/* ── database cylinder (raw data) ── */}
        <path d="M30,145 A25,10 0 0 0 80,145 L80,90 A25,10 0 0 0 30,90 Z" fill="var(--card-bg)" stroke="var(--border2)" strokeWidth="1.5" />
        <ellipse cx="55" cy="90" rx="25" ry="10" fill="var(--card-bg)" stroke="var(--border2)" strokeWidth="1.5" />
        <ellipse cx="55" cy="90" rx="25" ry="10" fill="var(--gradient-start)" opacity=".12" />
        <line x1="38" y1="106" x2="72" y2="106" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="38" y1="119" x2="72" y2="119" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="38" y1="132" x2="72" y2="132" stroke="var(--border)" strokeWidth="1.5" />

        {/* ── funnel (cleaning) ── */}
        <path d="M163,95 L217,95 L196,150 L184,150 Z" fill="var(--card-bg)" stroke="var(--border2)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M184,150 L196,150 L190,163 Z" fill="var(--accent-2)" opacity=".8" />
        <circle cx="190" cy="120" r="16" fill="var(--accent-2)" opacity=".12">
          <animate attributeName="opacity" values=".08;.32;.08" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="r" values="12;18;12" dur="1.8s" repeatCount="indefinite" />
        </circle>

        {/* ── chart panel (insight) ── */}
        <rect x="255" y="60" width="100" height="130" rx="12" fill="var(--card-bg)" stroke="var(--border2)" strokeWidth="1.5" />
        <line x1="270" y1="170" x2="340" y2="170" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="270" y1="170" x2="270" y2="80" stroke="var(--border)" strokeWidth="1.5" />
        <polyline points="275,152 291,133 306,142 321,107 336,90" fill="none" stroke="url(#pipeChartGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="275" cy="152" r="3" fill="var(--gradient-start)" />
        <circle cx="291" cy="133" r="3" fill="var(--gradient-start)" />
        <circle cx="306" cy="142" r="3" fill="var(--gradient-middle)" />
        <circle cx="321" cy="107" r="3" fill="var(--gradient-end)" />
        <circle cx="336" cy="90" r="3" fill="var(--gradient-end)" />
        <circle cx="345" cy="72" r="9" fill="var(--accent-2)" />
        <path d="M341,74 L345,69 L349,74 M345,69 L345,78" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

        {/* ── flowing raw-data dots: database → funnel ── */}
        {[0, 0.9, 1.8].map((delay, i) => (
          <circle key={`raw-${i}`} r="4.5" fill="var(--fg-dim)">
            <animateMotion dur="2.2s" begin={`${delay}s`} repeatCount="indefinite" path="M80,130 C120,110 150,100 178,105" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.2s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* ── flowing clean-data dots: funnel → chart ── */}
        {[0.6, 1.5, 2.4].map((delay, i) => (
          <circle key={`clean-${i}`} r="4.5" fill={i % 2 === 0 ? 'var(--gradient-start)' : 'var(--gradient-end)'}>
            <animateMotion dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" path="M192,160 C210,180 235,170 258,140" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="1.8s" begin={`${delay}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* ── labels ── */}
        <text x="55" y="188" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="9" letterSpacing="1" fill="var(--fg-dim)">RAW DATA</text>
        <text x="190" y="188" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="9" letterSpacing="1" fill="var(--fg-dim)">CLEANING</text>
        <text x="305" y="212" textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize="9" letterSpacing="1" fill="var(--fg-dim)">INSIGHT</text>

        {/* ── scattered texture dots ── */}
        <circle cx="120" cy="60" r="2.5" fill="var(--accent-2)" opacity=".35" />
        <circle cx="235" cy="200" r="2.5" fill="var(--accent-2)" opacity=".3" />
      </svg>
    </div>
  );
}