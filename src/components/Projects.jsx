import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, Search, DollarSign, Eye, CircleHelp, Settings2, Lightbulb,
  ExternalLink, Github, Waves, Smile, FileText as FileTextIcon,
  FileCode, Database, BookOpen, Users,
} from 'lucide-react';
import { LOGOS } from '../logos.js';

export const PROJECTS = [
  {
    slug: 'olist-ecommerce-analytics',
    num: '01 · EDA · Dashboard',
    impactIcon: <BarChart3 size={13} />,
    impact: '100K+ orders analyzed',
    title: 'Olist Intelligence — E-Commerce Analytics',
    image: '/images/olist-thumb.png',
    alt: 'Olist Dashboard Preview',
    steps: [
      { label: 'Problem', text: '9 separate tables → no unified business view' },
      { label: 'Solution', text: 'Merged 9 CSV files into master table with 5 interactive tabs' },
      { label: 'Insight', text: 'Only 3% of customers reorder — huge retention opportunity' },
    ],
    stats: [
      { number: '100K+', label: 'Orders Analyzed' },
      { number: '9', label: 'Tables Merged' },
    ],
    desc: "Deep dive into 100K+ orders from Brazil's largest e-commerce platform. Reveals delivery, seller, category insights, and customer retention gaps.",
    tags: [
      { logo: LOGOS.python, label: 'Python' },
      { logo: LOGOS.pandas, label: 'Pandas' },
      { icon: <Waves size={12} />, label: 'Seaborn' },
      { logo: LOGOS.plotly, label: 'Plotly' },
      { logo: LOGOS.streamlit, label: 'Streamlit' },
    ],
    demo: 'https://olist-intelligence.streamlit.app/',
    code: 'https://github.com/abdullah-butt-dev/EDA-Olist',
    caseStudy: {
      problem: "Olist's order data was scattered across 9 separate CSV tables — orders, customers, products, sellers, payments, reviews, and geolocation among them — sourced from the public Olist Brazilian E-Commerce dataset on Kaggle. With no unified structure, there was no single view of how the business was actually performing: which sellers were thriving, which categories were growing, or where customers were dropping off after their first order.",
      approach: [
        'Merged all 9 tables into a single cleaned master dataset (olist_master_clean.csv), resolving join keys across orders, customers, products, and sellers, and handling missing and duplicate records along the way.',
        'Built a Streamlit dashboard around a 7-card KPI row (revenue, order volume, on-time delivery rate, average review score, etc.) and 5 interactive tabs: Revenue & Growth, Product Category Performance, Delivery & Satisfaction, Seller Segmentation, and Customer Retention (RFM analysis).',
        'Designed a seller performance quadrant to classify sellers into stars, hidden gems, and at-risk accounts based on volume and reliability.',
      ],
      findings: [
        { text: 'Only about 3% of customers place a second order — a significant retention gap for a platform this size, and the clearest opportunity in the whole dataset.', screenshot: 'https://raw.githubusercontent.com/abdullah-butt-dev/eda-olist-dashboard/main/images/dashboard-overview.png' },
        { text: 'Delivery speed and customer satisfaction show a clear negative correlation once delivery time passes 21 days — satisfaction holds up reasonably well up to that point, then drops sharply.', screenshot: 'https://raw.githubusercontent.com/abdullah-butt-dev/eda-olist-dashboard/main/images/delivery-tab.png' },
      ],
      toolsUsed: ['Python', 'Pandas', 'Seaborn', 'Plotly', 'Streamlit'],
      recommendations: [
        'Launch a targeted post-purchase retention campaign (email or app prompt) aimed at first-time buyers in the weeks following delivery, since reorder rate is the single biggest lever identified.',
        'Treat 21 days as a hard SLA threshold for delivery — orders trending toward or past that mark are the ones most likely to generate a poor review, so they are the best candidates for proactive customer outreach.',
      ],
    },
  },
  {
    slug: 'amazon-review-sentiment-analyzer',
    num: '02 · NLP · ML',
    impactIcon: <Search size={13} />,
    impact: '550K+ reviews analyzed',
    title: 'Amazon Review Sentiment Analyzer',
    image: '/images/amazon-sentiment-thumb.png',
    alt: 'Amazon Sentiment Dashboard Preview',
    steps: [
      { label: 'Problem', text: 'Manual review analysis is slow and inconsistent' },
      { label: 'Solution', text: 'NLP pipeline comparing VADER, TextBlob, and custom ML' },
      { label: 'Insight', text: 'Custom ML beats general tools by 9.4% for industry context' },
    ],
    stats: [
      { number: '89.6%', label: 'Custom ML Accuracy' },
      { number: '85.8%', label: 'VADER Accuracy' },
    ],
    desc: 'End-to-end NLP pipeline evaluating three sentiment classification techniques on 50,000 sampled e-commerce records. Interactive app for model comparison.',
    tags: [
      { logo: LOGOS.python, label: 'Python' },
      { icon: <Smile size={12} />, label: 'VADER' },
      { icon: <FileTextIcon size={12} />, label: 'TextBlob' },
      { logo: LOGOS.scikitlearn, label: 'Scikit-learn' },
      { logo: LOGOS.streamlit, label: 'Streamlit' },
    ],
    demo: 'https://amazon-reviews-sentiment-analyzer.streamlit.app/',
    code: 'https://github.com/abdullah-butt-dev/amazon-sentiment-app',
    caseStudy: {
      problem: 'Manually reading and tagging customer sentiment doesn\u2019t scale past a handful of reviews, and general-purpose sentiment tools often miss the nuance of real marketplace language — sarcasm, double negatives, and category-specific slang all trip up naive approaches. The question was whether a custom-trained model could meaningfully outperform off-the-shelf tools on e-commerce review text specifically.',
      approach: [
        'Sampled 50,000 reviews from a pool of 550K+ and built three parallel sentiment classifiers: VADER (rule-based, no training needed), TextBlob (lexicon-based), and a supervised Logistic Regression model trained on TF-IDF text features.',
        'Evaluated all three on accuracy across the same held-out review sample, then packaged the comparison into a Streamlit app with two modes: a single-review deep-dive view showing side-by-side model scores, and a bulk mode that accepts a CSV upload and returns sentiment distributions.',
      ],
      findings: [
        { text: 'The custom Logistic Regression + TF-IDF model reached 89.6% accuracy versus 85.8% for VADER and 80.2% for TextBlob — up to a 9.4-point gain from learning e-commerce-specific vocabulary instead of relying on general-purpose rules or dictionaries.', screenshot: 'https://raw.githubusercontent.com/abdullah-butt-dev/amazon-sentiment-app/main/images/app_demo.png' },
        { text: 'The custom model still has a blind spot: phrases like "not bad at all" can get misclassified as negative because the token "bad" outweighs the surrounding negation. Separately, unhappy customers write roughly 11% more text on average than satisfied ones.', screenshot: 'https://raw.githubusercontent.com/abdullah-butt-dev/amazon-sentiment-app/main/images/bulk_demo.png' },
      ],
      toolsUsed: ['Python', 'NLTK', 'TextBlob', 'Scikit-learn', 'Plotly', 'Streamlit'],
      recommendations: [
        'Deploy the custom TF-IDF model over general-purpose tools for any production sentiment tagging on marketplace reviews, given its consistent accuracy edge.',
        'Prioritize longer negative reviews for manual follow-up — the correlation between review length and dissatisfaction means they tend to contain the most specific, actionable complaints.',
      ],
    },
  },
  {
    slug: 'website-traffic-analysis-dashboard',
    num: '03 · Analytics · Dashboard',
    impactIcon: <BarChart3 size={13} />,
    impact: '2,000 visits analyzed',
    title: 'Website Traffic Analysis Dashboard',
    image: '/images/website-traffic-dash-thumb.png',
    alt: 'Website Traffic Dashboard Preview',
    steps: [
      { label: 'Problem', text: 'Unknown which traffic channels drive sales' },
      { label: 'Solution', text: 'Dashboard analyzing 2,000 visits across 5 channels' },
      { label: 'Insight', text: 'Referral traffic converts best — focus on partnerships' },
    ],
    stats: [
      { number: '28.5%', label: 'Bounce Rate Identified' },
      { number: 'Referral', label: 'Top Converting Channel' },
    ],
    desc: 'Analyzed website traffic and user engagement to identify factors influencing conversion rates. Understand which traffic sources perform best.',
    tags: [
      { logo: LOGOS.python, label: 'Python' },
      { logo: LOGOS.pandas, label: 'Pandas' },
      { logo: LOGOS.plotly, label: 'Plotly' },
      { logo: LOGOS.streamlit, label: 'Streamlit' },
    ],
    demo: 'https://website-traffic-analysis-dashboard.streamlit.app/',
    code: 'https://github.com/abdullah-butt-dev/website-traffic-analysis-dashboard',
    caseStudy: {
      problem: 'Businesses spend real money acquiring website traffic, but that spend only pays off if you know which channels and on-site behaviors actually lead to conversions. Working from 2,000 recorded visits — with page views, session duration, bounce rate, traffic source, time on page, and prior-visit history all tracked — the goal was to turn that raw behavioral data into a clear read on what to fund and what to fix.',
      approach: [
        'Ran a full EDA pass first: missing-value and duplicate checks, statistical summaries, then dedicated traffic-source, conversion, distribution, and correlation analyses.',
        'Built an interactive Streamlit dashboard with filters by traffic source and metric, KPI cards for at-a-glance conversion and bounce rate, a correlation heatmap, and a ranked traffic-source scorecard.',
      ],
      findings: [
        { text: 'Referral is the top-converting channel, and organic search is the largest source of traffic overall at close to 40% of visits — meaning the channel bringing in the most people isn\u2019t the one converting best.', screenshot: 'https://raw.githubusercontent.com/abdullah-butt-dev/website-traffic-analysis-dashboard/main/images/scorecard.png' },
        { text: 'Time on page correlates positively with conversion, and overall bounce rate sits at a healthy 28.5%. The relative gap between channels — referral leading, with organic and direct trailing behind — was the most consistent and reliable signal across the sample, and the one worth acting on.', screenshot: 'https://raw.githubusercontent.com/abdullah-butt-dev/website-traffic-analysis-dashboard/main/images/full-dashboard.png' },
      ],
      toolsUsed: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Plotly', 'Streamlit'],
      recommendations: [
        'Shift incremental marketing budget toward referral partnerships and backlink building, since that channel converts best even though it isn\u2019t the largest source of traffic.',
        'Use remarketing campaigns to bring past visitors back, and keep investing in content quality — the time-on-page correlation suggests engagement, not just traffic volume, is what moves conversion.',
      ],
    },
  },
  {
    slug: 'retail-sales-sql-analysis',
    num: '04 · SQL · Analytics',
    impactIcon: <DollarSign size={13} />,
    impact: '$2.3M+ revenue analyzed',
    title: 'Retail Sales SQL Analysis',
    image: '/images/retail-dash-thumb.png',
    alt: 'Retail Sales Dashboard Preview',
    steps: [
      { label: 'Problem', text: 'Unknown which regions/categories are profitable' },
      { label: 'Solution', text: 'SQL dashboard with regional profit analysis' },
      { label: 'Insight', text: 'Technology category has highest profit margin at 17.4%' },
    ],
    stats: [
      { number: '$2.3M+', label: 'Revenue Analyzed' },
      { number: '17.4%', label: 'Top Margin Category' },
    ],
    desc: 'PostgreSQL analysis of Superstore sales data. Identified revenue, profitability, customer behavior, product performance, and regional performance.',
    tags: [
      { icon: <Database size={15} style={{ color: 'var(--accent-2)' }} />, label: 'SQL' },
      { logo: LOGOS.postgresql, label: 'PostgreSQL' },
      { icon: <FileCode size={12} />, label: 'SQLPage' },
    ],
    demo: 'https://imab50-retail-sales-dashboard.hf.space/index.sql',
    code: 'https://github.com/abdullah-butt-dev/retail-sales-sql-analysis',
    caseStudy: {
      problem: 'The Superstore dataset — 5,009 orders from 793 customers totaling $2.3M+ in revenue — had never been broken down in a way that showed which categories, regions, or customer segments were actually driving profit versus just revenue. The goal was to use SQL not just to query the data, but to answer specific business questions with percentage-based metrics that are easy for stakeholders to act on.',
      approach: [
        'Loaded the dataset into PostgreSQL (hosted on Neon.tech) and built out CTEs and window functions (ROW_NUMBER, DENSE_RANK, LAG, SUM/AVG OVER) to calculate revenue share, profit share, profit margin, customer contribution, and growth rates.',
        'Built 6 interactive dashboard views with SQLPage — covering the executive overview, trends, category performance, customer insights, product insights, and regional performance — and deployed the whole thing on Hugging Face Spaces.',
      ],
      findings: [
        { text: 'Technology is the standout category: 36.4% of total revenue, 50.79% of total profit, and the best margin of any category at 17.4%. Overall the business ran a 12.47% profit margin on $2.3M+ revenue with a $458.61 average order value.', screenshot: '/images/categories.png' },
        { text: 'Regional performance is uneven — the West region leads with a 14.94% margin while Central lags at just 7.92%. On the customer side, concentration risk is low (the top 20 customers account for only 11.53% of revenue), but 301 individual products are actually losing money.', screenshot: '/images/regions.png' },
      ],
      toolsUsed: ['SQL', 'PostgreSQL', 'SQLPage', 'Docker'],
      recommendations: [
        'Double down on the Technology category and study what the West region is doing differently, with an eye toward applying the same approach to lift Central\u2019s margin.',
        'Address the 301 loss-making products directly — through price increases, reduced discounting, renegotiated supplier costs, or discontinuation — and use bundling to raise average order value.',
      ],
    },
  },
  {
    slug: 'hr-attrition-analysis',
    num: '05 · Excel · Analytics',
    impactIcon: <Users size={13} />,
    impact: 'Company-wide attrition mapped',
    title: 'HR Attrition Analysis Dashboard',
    image: 'https://raw.githubusercontent.com/abdullah-butt-dev/hr-attrition-analysis/main/dashboard_screenshot.png',
    alt: 'HR Attrition Dashboard Preview',
    steps: [
      { label: 'Problem', text: '16.2% attrition draining recruiting and onboarding budget' },
      { label: 'Solution', text: 'Interactive Excel dashboard with pivot tables and slicers' },
      { label: 'Insight', text: 'Overtime nearly triples attrition risk — 30.6% vs 10.5%' },
    ],
    stats: [
      { number: '20.6%', label: 'Sales Attrition Rate' },
      { number: '30.6%', label: 'Overtime Attrition Rate' },
    ],
    desc: 'Interactive Excel analytics dashboard mapping corporate workforce retention, demographic risk, and the financial impact of burnout across departments.',
    tags: [
      { logo: LOGOS.excel, label: 'Excel' },
      { icon: <BarChart3 size={12} />, label: 'Pivot Tables & Slicers' },
    ],
    demo: 'https://1drv.ms/x/c/5e946e4499e3394d/IQBwG1x5SzqPSIOFyPsTWI4ZAZv7Fy2Bb9wzFM7xsst3QrU?e=25APTc',
    code: 'https://github.com/abdullah-butt-dev/hr-attrition-analysis',
    caseStudy: {
      problem: 'Replacing an employee typically costs 50-200% of their annual salary in recruiting, onboarding, and lost productivity. With an overall attrition rate of 16.2%, leadership had no clear view of where turnover risk was concentrated or which retention levers would actually move the needle.',
      approach: [
        'Built an interactive Excel dashboard using pivot tables and slicers across department, age band, income band, overtime status, and tenure — letting stakeholders filter attrition by any dimension without touching a formula.',
        'Layered in a predictive high-risk flag for individual employees and validated it against historical outcomes to confirm it actually predicted who was likely to leave.',
      ],
      findings: [
        { text: 'Sales carries the highest departmental attrition at 20.6%, and overtime is the single biggest risk factor company-wide — employees working overtime leave at 30.6% versus 10.5% for those who don\u2019t, spiking to 37.5% for overtime staff within Sales specifically.', screenshot: 'https://raw.githubusercontent.com/abdullah-butt-dev/hr-attrition-analysis/main/dashboard_screenshot.png' },
        { text: 'Risk concentrates in younger, lower-paid employees — the under-25 bracket churns at 39.2% and the low-salary band at 29.6% — while the validated high-risk flag correctly predicted a 65.4% attrition rate among the new hires it identified.', screenshot: null },
      ],
      toolsUsed: ['Excel', 'Pivot Tables', 'Slicers', 'Conditional Formatting'],
      recommendations: [
        'Audit and cap overtime hours in Sales and HR specifically, since overtime is the strongest single driver of attrition in both departments.',
        'Review base compensation for the under-25 and low-salary bands, where attrition is highest and most sensitive to pay.',
        'Use the validated high-risk flag to trigger proactive monthly retention check-ins before an at-risk employee resigns.',
      ],
    },
  },
];

function TagRender({ tag }) {
  if (tag.logoOnly) {
    return (
      <span className="tag icon-only" title={tag.label}>
        {tag.logo ? <img src={tag.logo} alt={tag.label} /> : tag.icon}
      </span>
    );
  }
  if (tag.logo) {
    return (
      <span className="tag" title={tag.label}>
        <span className="tag-logo"><img src={tag.logo} alt="" /></span>
        {tag.label}
      </span>
    );
  }
  return (
    <span className="tag" title={tag.label}>
      {tag.icon}
      {tag.label}
    </span>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="project-card reveal">
      <div className="pc-top">
        <span className="pc-num">{p.num}</span>
        <span className="impact-badge">{p.impactIcon}{p.impact}</span>
      </div>
      <p className="pc-title">{p.title}</p>

      <div className="dashboard-preview">
        <div className="skeleton"></div>
        <img
          src={p.image}
          alt={p.alt}
          loading="lazy"
          onLoad={(e) => {
            e.target.classList.add('loaded');
            if (e.target.previousElementSibling) e.target.previousElementSibling.style.display = 'none';
          }}
        />
        <div
          className="preview-overlay"
          onClick={() => window.open(p.demo, '_blank')}
          style={{ cursor: 'pointer' }}
        >
          <Eye size={16} /><span>Click to explore</span>
        </div>
      </div>

      <div className="case-flow">
        {p.steps.map((s, i) => (
          <div className="case-step" key={s.label}>
            <div className={`case-step-icon icon-${i === 0 ? 'problem' : i === 1 ? 'solution' : 'insight'}`}>
              {i === 0 ? <CircleHelp size={14} /> : i === 1 ? <Settings2 size={14} /> : <Lightbulb size={14} />}
            </div>
            <div className="case-step-content">
              <span className="step-label">{s.label}</span>
              <span className="step-text">{s.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="project-stats">
        {p.stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-number">{s.number}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <p className="pc-desc">{p.desc}</p>

      <div className="pc-tags">
        {p.tags.map((t) => <TagRender tag={t} key={t.label} />)}
      </div>

      <div className="pc-actions">
        <Link to={`/projects/${p.slug}`} className="pc-btn">
          <BookOpen size={14} />
          Case Study
        </Link>
        <a className="pc-btn primary" href={p.demo} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={14} />
          Live Demo
        </a>
        <a className="pc-btn" href={p.code} target="_blank" rel="noopener noreferrer">
          <Github size={14} />
          Code
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 4);

  // The homepage's one-time, on-mount IntersectionObserver only ever
  // observes the ".reveal" elements that exist at that moment — the first
  // 4 project cards. Clicking "View All" mounts the 5th (and beyond) card
  // fresh, still carrying the plain ".reveal" class (opacity:0) with no
  // observer left to ever add "up" to it, so it just sat there as blank
  // space. Re-run the same reveal logic, scoped to this section, whenever
  // the visible project list changes.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const pending = node.querySelectorAll('.reveal:not(.up)');
    if (!pending.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('up');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [showAll]);

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">
        <p className="eyebrow reveal">Projects</p>
        <h2 className="reveal">Selected <span className="gradient-text">work.</span></h2>
        <div className="projects-grid">
          {visibleProjects.map((p) => <ProjectCard p={p} key={p.title} />)}
        </div>
        {!showAll && PROJECTS.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a
              href="#projects"
              className="view-all-btn"
              onClick={(e) => {
                e.preventDefault();
                setShowAll(true);
              }}
            >
              View All Projects
              <ExternalLink size={18} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}