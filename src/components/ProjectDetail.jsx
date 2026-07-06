import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, Github, Sun, Moon,
  Target, Wrench, Lightbulb, CheckCircle2,
} from 'lucide-react';
import { PROJECTS } from './Projects.jsx';
import Footer from './Footer.jsx';

export default function ProjectDetail({ theme, toggleTheme }) {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  // The site-wide ".reveal" fade-in only gets its "up" (visible) class from
  // an IntersectionObserver that Home.jsx sets up — but that effect never
  // runs on this page, so every section was stuck at opacity:0 forever.
  // This runs the same reveal logic scoped to this page.
  // React Router doesn't reset scroll position on navigation. Without this,
  // clicking "Case Study" from partway down the homepage lands you at
  // whatever scrollY you were already at — which, on this shorter page,
  // often clamps to the bottom instead of the top.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const revEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('up');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slug]);

  if (!project) {
    return (
      <div className="page">
        <div className="container first" style={{ textAlign: 'center' }}>
          <h2>Project not found</h2>
          <p className="cs-lede" style={{ margin: '1rem auto 0' }}>The case study you're looking for doesn't exist.</p>
          <Link to="/#projects" className="cs-back" style={{ display: 'inline-flex' }}>
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const cs = project.caseStudy || {};

  return (
    <>
      <div className="grid-bg" aria-hidden="true"></div>

      <nav>
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none' }}>A<span>.</span></Link>
        <div className="nav-right">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            <span className="theme-icon">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </span>
          </button>
        </div>
      </nav>

      <div className="page case-study-page">
        <section id="case-study">
          <div className="container first">
            <Link to="/#projects" className="cs-back">
              <ArrowLeft size={14} /> Back to Projects
            </Link>

            <span className="cs-num-badge reveal">{project.num}</span>
            <h1 className="cs-title reveal">{project.title}</h1>
            <p className="cs-lede reveal">{project.desc}</p>

            <div className="cs-cta-row reveal">
              <a className="pc-btn primary" href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} /> Live Demo
              </a>
              <a className="pc-btn" href={project.code} target="_blank" rel="noopener noreferrer">
                <Github size={14} /> Code
              </a>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="cs-hero-banner reveal">
            <img src={project.image} alt={project.alt} />
          </div>
        </div>

        <div className="divider"></div>

        <section>
          <div className="container">
            <div className="cs-section-head reveal">
              <div className="cs-section-icon problem"><Target /></div>
              <div>
                <p className="cs-section-eyebrow">Problem Statement</p>
                <h2 className="cs-section-title">What needed solving</h2>
              </div>
            </div>
            <div className="cs-problem-card cs-body reveal">
              <p>{cs.problem}</p>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        <section>
          <div className="container">
            <div className="cs-section-head reveal">
              <div className="cs-section-icon approach"><Wrench /></div>
              <div>
                <p className="cs-section-eyebrow">Approach &amp; Methodology</p>
                <h2 className="cs-section-title">How it was built</h2>
              </div>
            </div>
            <div className="cs-steps">
              {(cs.approach || []).map((step, i) => (
                <div className="cs-step reveal" key={i}>
                  <span className="cs-step-num">{i + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider"></div>

        <section>
          <div className="container">
            <div className="cs-section-head reveal">
              <div className="cs-section-icon findings"><Lightbulb /></div>
              <div>
                <p className="cs-section-eyebrow">Key Findings</p>
                <h2 className="cs-section-title">What the data showed</h2>
              </div>
            </div>
            <div className="cs-findings-grid">
              {(cs.findings || []).map((f, i) => (
                <div className="cs-finding-card reveal" key={i}>
                  {f.screenshot && (
                    <div className="cs-finding-img">
                      <img src={f.screenshot} alt={`Finding ${i + 1} screenshot`} loading="lazy" />
                    </div>
                  )}
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="divider"></div>

        <section>
          <div className="container">
            <p className="eyebrow reveal">Tools Used</p>
            <h2 className="reveal" style={{ marginBottom: '1.25rem' }}>Tech stack</h2>
            <div className="cs-tools reveal">
              {(cs.toolsUsed || project.tags.map((t) => t.label)).map((tool) => (
                <span className="tag" key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="divider"></div>

        <section>
          <div className="container">
            <div className="cs-section-head reveal">
              <div className="cs-section-icon recommendations"><CheckCircle2 /></div>
              <div>
                <p className="cs-section-eyebrow">Business Recommendations</p>
                <h2 className="cs-section-title">What I recommended</h2>
              </div>
            </div>
            <div className="cs-recs">
              {(cs.recommendations || []).map((rec, i) => (
                <div className="cs-rec reveal" key={i}>
                  <CheckCircle2 />
                  <p>{rec}</p>
                </div>
              ))}
            </div>

            <div className="cs-final-cta reveal" style={{ marginTop: '3rem' }}>
              <h3>Want to see it in action?</h3>
              <p>Explore the live dashboard or dig into the full source code on GitHub.</p>
              <div className="pc-actions">
                <a className="pc-btn primary" href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a className="pc-btn" href={project.code} target="_blank" rel="noopener noreferrer">
                  <Github size={14} /> Code
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}