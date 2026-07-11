import { useEffect, useState } from 'react';
import { getSiteContent, upsertSiteContent } from '../lib/adminApi.js';
import ImageUploader from './ImageUploader.jsx';

const SECTIONS = ['Hero', 'About', 'Experience', 'Results', 'Footer'];

// ── Hero ──────────────────────────────────────────────────────────────
function HeroForm({ content, setContent }) {
  const c = content;
  const set = (k, v) => setContent({ ...c, [k]: v });
  const setTitle = (i, v) => {
    const titles = [...(c.titles || [])];
    titles[i] = v;
    set('titles', titles);
  };
  const addTitle = () => set('titles', [...(c.titles || []), '']);
  const removeTitle = (i) => set('titles', (c.titles || []).filter((_, idx) => idx !== i));

  return (
    <>
      <div className="form-group"><label>Eyebrow (top badge text)</label>
        <input type="text" value={c.eyebrow || ''} onChange={(e) => set('eyebrow', e.target.value)} /></div>
      <div className="form-group"><label>Greeting</label>
        <input type="text" value={c.greeting || ''} onChange={(e) => set('greeting', e.target.value)} /></div>
      <div className="form-group"><label>Name</label>
        <input type="text" value={c.name || ''} onChange={(e) => set('name', e.target.value)} /></div>

      <div className="form-group">
        <label>Rotating titles (typewriter effect)</label>
        {(c.titles || []).map((t, i) => (
          <div key={i} className="form-row" style={{ marginBottom: '.4rem' }}>
            <input type="text" value={t} onChange={(e) => setTitle(i, e.target.value)} />
            <button type="button" className="icon-btn" onClick={() => removeTitle(i)} aria-label="Remove title">×</button>
          </div>
        ))}
        <button type="button" className="pc-btn" onClick={addTitle}>+ Add title</button>
      </div>

      <div className="form-group"><label>Subtext</label>
        <textarea rows={3} value={c.subtext || ''} onChange={(e) => set('subtext', e.target.value)} /></div>
      <div className="form-group"><label>CV download URL</label>
        <input type="text" value={c.cv_url || ''} onChange={(e) => set('cv_url', e.target.value)} /></div>
      <div className="form-group"><label>GitHub URL</label>
        <input type="text" value={c.github_url || ''} onChange={(e) => set('github_url', e.target.value)} /></div>
      <div className="form-group"><label>LinkedIn URL</label>
        <input type="text" value={c.linkedin_url || ''} onChange={(e) => set('linkedin_url', e.target.value)} /></div>
      <div className="form-group"><label>Email</label>
        <input type="text" value={c.email || ''} onChange={(e) => set('email', e.target.value)} /></div>

      <ImageUploader
        label="Hero illustration (optional — leave empty to keep the animated graphic)"
        folder="site-content"
        value={c.illustration_image || ''}
        onChange={(url) => set('illustration_image', url)}
      />
    </>
  );
}

// ── About ─────────────────────────────────────────────────────────────
function AboutForm({ content, setContent }) {
  const c = content;
  const set = (k, v) => setContent({ ...c, [k]: v });
  return (
    <>
      <div className="form-group"><label>Eyebrow</label>
        <input type="text" value={c.eyebrow || ''} onChange={(e) => set('eyebrow', e.target.value)} /></div>
      <div className="form-group"><label>Heading line 1</label>
        <input type="text" value={c.heading_line1 || ''} onChange={(e) => set('heading_line1', e.target.value)} /></div>
      <div className="form-group"><label>Heading line 2 (gradient text)</label>
        <input type="text" value={c.heading_line2 || ''} onChange={(e) => set('heading_line2', e.target.value)} /></div>
      <div className="form-group"><label>Paragraph 1</label>
        <textarea rows={3} value={c.paragraph1 || ''} onChange={(e) => set('paragraph1', e.target.value)} /></div>
      <div className="form-group"><label>Paragraph 2</label>
        <textarea rows={3} value={c.paragraph2 || ''} onChange={(e) => set('paragraph2', e.target.value)} /></div>
      <div className="form-group"><label>Status</label>
        <input type="text" value={c.status || ''} onChange={(e) => set('status', e.target.value)} /></div>
      <div className="form-group"><label>Focus</label>
        <input type="text" value={c.focus || ''} onChange={(e) => set('focus', e.target.value)} /></div>
      <div className="form-group"><label>Stack</label>
        <input type="text" value={c.stack || ''} onChange={(e) => set('stack', e.target.value)} /></div>
    </>
  );
}

// ── Experience ────────────────────────────────────────────────────────
// Timeline items are JSON-edited (like Projects' steps/stats/tags) since
// each item has nested tags with icon/logo keys — a flat form would need
// a lot of custom UI for not much benefit over Projects' existing pattern.
function ExperienceForm({ content, setContent, jsonText, setJsonText, jsonError }) {
  const c = content;
  return (
    <>
      <div className="form-group"><label>Eyebrow</label>
        <input type="text" value={c.eyebrow || ''} onChange={(e) => setContent({ ...c, eyebrow: e.target.value })} /></div>
      <div className="form-group">
        <label>Timeline items (array of {'{'}date_label, date_sub, current, org, role, desc, tags[{'{'}logo|icon, label{'}'}]{'}'})</label>
        <textarea
          rows={16}
          className="admin-json-field"
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
        />
        {jsonError && <p className="form-error">{jsonError}</p>}
        <p className="form-hint">Icon/logo keys must exist in <code>lib/iconMap.jsx</code> or <code>logos.js</code> — e.g. <code>python</code>, <code>database</code>, <code>megaphone</code>, <code>sparkles</code>.</p>
      </div>
    </>
  );
}

// ── Results ───────────────────────────────────────────────────────────
function ResultsForm({ content, setContent }) {
  const c = content;
  const set = (k, v) => setContent({ ...c, [k]: v });
  const setStat = (i, key, v) => {
    const stats = [...(c.stats || [])];
    stats[i] = { ...stats[i], [key]: key === 'target' || key === 'decimals' ? Number(v) || 0 : v };
    set('stats', stats);
  };
  const addStat = () => set('stats', [...(c.stats || []), { target: 0, decimals: 0, prefix: '', suffix: '', label: '' }]);
  const removeStat = (i) => set('stats', (c.stats || []).filter((_, idx) => idx !== i));

  return (
    <>
      <div className="form-group"><label>Eyebrow</label>
        <input type="text" value={c.eyebrow || ''} onChange={(e) => set('eyebrow', e.target.value)} /></div>
      <div className="form-group"><label>Heading line 1</label>
        <input type="text" value={c.heading_line1 || ''} onChange={(e) => set('heading_line1', e.target.value)} /></div>
      <div className="form-group"><label>Heading line 2 (gradient text)</label>
        <input type="text" value={c.heading_line2 || ''} onChange={(e) => set('heading_line2', e.target.value)} /></div>

      <div className="form-group">
        <label>Stat counters</label>
        {(c.stats || []).map((s, i) => (
          <div key={i} className="admin-form-card" style={{ marginBottom: '.6rem' }}>
            <div className="form-row">
              <div className="form-group"><label>Target number</label>
                <input type="number" value={s.target} onChange={(e) => setStat(i, 'target', e.target.value)} /></div>
              <div className="form-group"><label>Decimal places</label>
                <input type="number" value={s.decimals} onChange={(e) => setStat(i, 'decimals', e.target.value)} /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Prefix (e.g. $)</label>
                <input type="text" value={s.prefix} onChange={(e) => setStat(i, 'prefix', e.target.value)} /></div>
              <div className="form-group"><label>Suffix (e.g. +, %, M+)</label>
                <input type="text" value={s.suffix} onChange={(e) => setStat(i, 'suffix', e.target.value)} /></div>
            </div>
            <div className="form-group"><label>Label</label>
              <input type="text" value={s.label} onChange={(e) => setStat(i, 'label', e.target.value)} /></div>
            <button type="button" className="pc-btn" onClick={() => removeStat(i)}>Remove stat</button>
          </div>
        ))}
        <button type="button" className="pc-btn" onClick={addStat}>+ Add stat</button>
      </div>
    </>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
function FooterForm({ content, setContent }) {
  const c = content;
  const set = (k, v) => setContent({ ...c, [k]: v });
  return (
    <>
      <div className="form-group"><label>Name</label>
        <input type="text" value={c.name || ''} onChange={(e) => set('name', e.target.value)} /></div>
      <div className="form-group"><label>Tagline</label>
        <input type="text" value={c.tagline || ''} onChange={(e) => set('tagline', e.target.value)} /></div>
    </>
  );
}

const SECTION_KEY = { Hero: 'hero', About: 'about', Experience: 'experience', Results: 'results', Footer: 'footer' };

export default function SiteContentAdmin() {
  const [section, setSection] = useState('Hero');
  const [content, setContent] = useState(null);
  const [experienceJsonText, setExperienceJsonText] = useState('[]');
  const [experienceJsonError, setExperienceJsonError] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    setSaved(false);
    getSiteContent(SECTION_KEY[section])
      .then((data) => {
        if (cancelled) return;
        const c = data || {};
        setContent(c);
        if (section === 'Experience') {
          setExperienceJsonText(JSON.stringify(c.items || [], null, 2));
          setExperienceJsonError('');
        }
      })
      .catch((e) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [section]);

  const save = async () => {
    setError('');
    setSaved(false);
    let payload = content || {};

    if (section === 'Experience') {
      try {
        payload = { ...payload, items: JSON.parse(experienceJsonText) };
        setExperienceJsonError('');
      } catch {
        setExperienceJsonError("Timeline items isn't valid JSON — check for a missing comma or bracket.");
        return;
      }
    }

    setBusy(true);
    try {
      await upsertSiteContent(SECTION_KEY[section], payload);
      setSaved(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h3>Site Content</h3>
      </div>

      <div className="admin-tabs" style={{ marginBottom: '1.25rem' }}>
        {SECTIONS.map((s) => (
          <button key={s} className={`admin-tab${section === s ? ' active' : ''}`} onClick={() => setSection(s)}>{s}</button>
        ))}
      </div>

      {loading && <p className="lead">Loading…</p>}

      {!loading && content !== null && (
        <div className="admin-form-card">
          {section === 'Hero' && <HeroForm content={content} setContent={setContent} />}
          {section === 'About' && <AboutForm content={content} setContent={setContent} />}
          {section === 'Experience' && (
            <ExperienceForm
              content={content}
              setContent={setContent}
              jsonText={experienceJsonText}
              setJsonText={setExperienceJsonText}
              jsonError={experienceJsonError}
            />
          )}
          {section === 'Results' && <ResultsForm content={content} setContent={setContent} />}
          {section === 'Footer' && <FooterForm content={content} setContent={setContent} />}

          {error && <p className="form-error">{error}</p>}
          {saved && !error && <p className="form-hint">Saved.</p>}
          <div className="form-footer-row">
            <button className="form-submit-btn" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      )}
    </div>
  );
}