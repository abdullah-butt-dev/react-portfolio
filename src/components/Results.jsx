import { useEffect, useRef } from 'react';
import { useSiteContent } from '../lib/usePortfolioData.js';

const FALLBACK_STATS = [
  { target: 650000, decimals: 0, prefix: '', suffix: '+', label: 'Data Points Analyzed' },
  { target: 23, decimals: 1, prefix: '$', suffix: 'M+', label: 'Revenue Analyzed (SQL)' },
  { target: 5, decimals: 0, prefix: '', suffix: '+', label: 'End-to-End Dashboards Shipped' },
  { target: 94, decimals: 1, prefix: '', suffix: '%', label: 'ML Accuracy Gain Over Baseline' },
];

const FALLBACK = {
  eyebrow: 'By The Numbers',
  heading_line1: "What I've",
  heading_line2: 'Actually Done.',
  stats: FALLBACK_STATS,
};

function formatValue(rawValue, divisor, decimals, prefix, suffix) {
  const val = rawValue / divisor;
  const body = decimals > 0
    ? val.toFixed(decimals)
    : (val >= 1000 ? Math.floor(val).toLocaleString() : Math.floor(val).toString());
  return prefix + body + suffix;
}

function Counter({ target, decimals, prefix, suffix, label }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const divisor = Math.pow(10, decimals);
    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const duration = 2000;
          const startTime = performance.now();
          function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            if (ref.current) ref.current.textContent = formatValue(current, divisor, decimals, prefix, suffix);
            if (progress < 1) requestAnimationFrame(update);
            else if (ref.current) ref.current.textContent = formatValue(target, divisor, decimals, prefix, suffix);
          }
          requestAnimationFrame(update);
          observer.unobserve(node);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, decimals, prefix, suffix]);

  return (
    <div className="result-card reveal" ref={wrapRef}>
      <span className="big-number" ref={ref}>0</span>
      <span className="result-label">{label}</span>
    </div>
  );
}

export default function Results() {
  const { content } = useSiteContent('results', FALLBACK);
  const c = { ...FALLBACK, ...content };
  const stats = c.stats && c.stats.length ? c.stats : FALLBACK_STATS;

  return (
    <section id="results">
      <div className="container">
        <p className="eyebrow reveal">{c.eyebrow}</p>
        <h2 className="reveal">{c.heading_line1} <span className="gradient-text">{c.heading_line2}</span></h2>
        <div className="results-grid">
          {stats.map((s) => <Counter key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  );
}