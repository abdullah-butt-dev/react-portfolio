export default function HeroIllustration() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg className="hero-illustration" viewBox="0 30 340 220" xmlns="http://www.w3.org/2000/svg">
        {/* platform */}
        <polygon points="146,120 58,164 58,156 146,112" fill="var(--border)" />
        <polygon points="58,164 190,230 190,222 58,156" fill="var(--border2)" />
        <polygon points="146,112 278,178 190,222 58,156" fill="var(--card-bg)" stroke="var(--border2)" strokeWidth="1" />

        {/* monitor block */}
        <polygon points="97.6,140.6 89.9,144.4 89.9,82.4 97.6,78.6" fill="var(--border)" />
        <polygon points="89.9,144.4 114.1,156.6 114.1,94.6 89.9,82.4" fill="var(--border2)" />
        <polygon points="97.6,78.6 121.8,90.7 114.1,94.6 89.9,82.4" fill="var(--card-bg)" stroke="var(--border2)" strokeWidth="1" />

        {/* bar 1 (cyan) */}
        <polygon points="152.6,137.3 132.8,147.2 132.8,102.2 152.6,92.3" fill="var(--gradient-start)" />
        <polygon points="152.6,137.3 132.8,147.2 132.8,102.2 152.6,92.3" fill="#000" opacity=".32" style={{ mixBlendMode: 'multiply' }} />
        <polygon points="132.8,147.2 152.6,157.1 152.6,112.1 132.8,102.2" fill="var(--gradient-start)" />
        <polygon points="132.8,147.2 152.6,157.1 152.6,112.1 132.8,102.2" fill="#000" opacity=".14" style={{ mixBlendMode: 'multiply' }} />
        <polygon points="152.6,92.3 172.4,102.2 152.6,112.1 132.8,102.2" fill="var(--gradient-start)" />

        {/* bar 2 (purple) */}
        <polygon points="168.0,156.0 148.2,165.9 148.2,90.9 168.0,81.0" fill="var(--gradient-middle)" />
        <polygon points="168.0,156.0 148.2,165.9 148.2,90.9 168.0,81.0" fill="#000" opacity=".32" style={{ mixBlendMode: 'multiply' }} />
        <polygon points="148.2,165.9 168.0,175.8 168.0,100.8 148.2,90.9" fill="var(--gradient-middle)" />
        <polygon points="148.2,165.9 168.0,175.8 168.0,100.8 148.2,90.9" fill="#000" opacity=".14" style={{ mixBlendMode: 'multiply' }} />
        <polygon points="168.0,81.0 187.8,90.9 168.0,100.8 148.2,90.9" fill="var(--gradient-middle)" />

        {/* bar 3 (pink) */}
        <polygon points="205.4,163.7 185.6,173.6 185.6,115.6 205.4,105.7" fill="var(--gradient-end)" />
        <polygon points="205.4,163.7 185.6,173.6 185.6,115.6 205.4,105.7" fill="#000" opacity=".32" style={{ mixBlendMode: 'multiply' }} />
        <polygon points="185.6,173.6 205.4,183.5 205.4,125.5 185.6,115.6" fill="var(--gradient-end)" />
        <polygon points="185.6,173.6 205.4,183.5 205.4,125.5 185.6,115.6" fill="#000" opacity=".14" style={{ mixBlendMode: 'multiply' }} />
        <polygon points="205.4,105.7 225.2,115.6 205.4,125.5 185.6,115.6" fill="var(--gradient-end)" />

        {/* floating accent cube */}
        <g style={{ animation: 'floatOrbit 5s ease-in-out infinite' }}>
          <polygon points="238.4,141.0 225.2,147.6 225.2,127.6 238.4,121.0" fill="var(--accent-2)" />
          <polygon points="238.4,141.0 225.2,147.6 225.2,127.6 238.4,121.0" fill="#000" opacity=".32" style={{ mixBlendMode: 'multiply' }} />
          <polygon points="225.2,147.6 238.4,154.2 238.4,134.2 225.2,127.6" fill="var(--accent-2)" />
          <polygon points="225.2,147.6 238.4,154.2 238.4,134.2 225.2,127.6" fill="#000" opacity=".14" style={{ mixBlendMode: 'multiply' }} />
          <polygon points="238.4,121.0 251.6,127.6 238.4,134.2 225.2,127.6" fill="var(--accent-2)" />
        </g>

        {/* scattered accent dots */}
        <circle cx="70" cy="100" r="3" fill="var(--accent-2)" opacity=".45" />
        <circle cx="255" cy="150" r="3" fill="var(--accent-2)" opacity=".35" />
        <circle cx="200" cy="55" r="2.5" fill="var(--accent-2)" opacity=".4" />
      </svg>
    </div>
  );
}
