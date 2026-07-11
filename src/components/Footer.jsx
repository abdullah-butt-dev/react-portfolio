import { useSiteContent } from '../lib/usePortfolioData.js';

const FALLBACK = { name: 'Abdullah', tagline: 'Data Analyst' };

export default function Footer() {
  const { content } = useSiteContent('footer', FALLBACK);
  const c = { ...FALLBACK, ...content };

  return (
    <footer>
      <span>{c.name} · {c.tagline}</span>
      <span className="footer-year">© {new Date().getFullYear()}</span>
    </footer>
  );
}