import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import { listAll, insertRow, updateRow, deleteRow } from '../lib/adminApi.js';
import ImageUploader from './ImageUploader.jsx';

const FLAT_FIELDS = [
  { name: 'slug', label: 'Slug (used in the URL, e.g. my-project)' },
  { name: 'num', label: 'Number/tag label (e.g. "03 · Analytics · Dashboard")' },
  { name: 'impact_icon', label: 'Impact icon key (e.g. barchart3, search, dollarsign, users)' },
  { name: 'impact', label: 'Impact line (e.g. "100K+ orders analyzed")' },
  { name: 'title', label: 'Title' },
  { name: 'image', label: 'Thumbnail image', type: 'image' },
  { name: 'alt', label: 'Thumbnail alt text' },
  { name: 'demo', label: 'Live demo URL' },
  { name: 'code', label: 'GitHub repo URL' },
  { name: 'description', label: 'Short description (card + case study lede)' },
];

const JSON_FIELDS = [
  { name: 'steps', label: 'Steps (array of {label, text}) \u2014 shown as Problem/Solution/Insight on the card', example: '[\n  { "label": "Problem", "text": "..." },\n  { "label": "Solution", "text": "..." },\n  { "label": "Insight", "text": "..." }\n]' },
  { name: 'stats', label: 'Stats (array of {number, label}) \u2014 shown as highlighted numbers on the card', example: '[\n  { "number": "100K+", "label": "Orders Analyzed" }\n]' },
  { name: 'tags', label: 'Tags (array of {label, logo?, icon?}) \u2014 logo/icon are string keys, see iconMap.jsx / logos.js', example: '[\n  { "logo": "python", "label": "Python" },\n  { "icon": "database", "label": "SQL" }\n]' },
  { name: 'case_study', label: 'Case study (object: problem, approach[], findings[{text, screenshot}], toolsUsed[], recommendations[])', example: '{\n  "problem": "...",\n  "approach": ["...", "..."],\n  "findings": [{ "text": "...", "screenshot": "/images/x.png" }],\n  "toolsUsed": ["Python", "SQL"],\n  "recommendations": ["...", "..."]\n}' },
];

function emptyValues() {
  const v = {};
  FLAT_FIELDS.forEach((f) => { v[f.name] = ''; });
  JSON_FIELDS.forEach((f) => { v[f.name] = f.name === 'case_study' ? '{}' : '[]'; });
  v.sort_order = 0;
  return v;
}

function rowToValues(row) {
  const v = {};
  FLAT_FIELDS.forEach((f) => { v[f.name] = row[f.name] ?? ''; });
  JSON_FIELDS.forEach((f) => { v[f.name] = JSON.stringify(row[f.name] ?? (f.name === 'case_study' ? {} : []), null, 2); });
  v.sort_order = row.sort_order ?? 0;
  return v;
}

export default function ProjectsAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [values, setValues] = useState(emptyValues());
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    listAll('projects').then(setRows).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const startNew = () => { setEditingId('new'); setValues(emptyValues()); setError(''); };
  const startEdit = (row) => { setEditingId(row.id); setValues(rowToValues(row)); setError(''); };
  const cancel = () => { setEditingId(null); setError(''); };

  const save = async () => {
    setError('');
    const payload = {};
    FLAT_FIELDS.forEach((f) => { payload[f.name] = values[f.name]; });
    payload.sort_order = Number(values.sort_order) || 0;
    for (const f of JSON_FIELDS) {
      try {
        payload[f.name] = JSON.parse(values[f.name]);
      } catch {
        setError(`"${f.label}" isn't valid JSON \u2014 check for a missing comma or bracket.`);
        return;
      }
    }
    setBusy(true);
    try {
      if (editingId === 'new') await insertRow('projects', payload);
      else await updateRow('projects', editingId, payload);
      setEditingId(null);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    setBusy(true);
    try {
      await deleteRow('projects', id);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h3>Projects</h3>
        {editingId === null && (
          <button className="form-submit-btn" onClick={startNew}><Plus size={15} /> Add New</button>
        )}
      </div>

      {loading && <p className="lead">Loading\u2026</p>}

      {editingId !== null && (
        <div className="admin-form-card">
          {FLAT_FIELDS.map((f) => (
            f.type === 'image' ? (
              <ImageUploader
                key={f.name}
                label={f.label}
                folder="projects"
                value={values[f.name]}
                onChange={(url) => setValues((v) => ({ ...v, [f.name]: url }))}
              />
            ) : (
              <div className="form-group" key={f.name}>
                <label>{f.label}</label>
                <input type="text" value={values[f.name]} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} />
              </div>
            )
          ))}
          <div className="form-group">
            <label>Sort order (lower shows first)</label>
            <input type="number" value={values.sort_order} onChange={(e) => setValues((v) => ({ ...v, sort_order: e.target.value }))} />
          </div>

          {JSON_FIELDS.map((f) => (
            <div className="form-group" key={f.name}>
              <label>{f.label}</label>
              <textarea
                rows={8}
                className="admin-json-field"
                placeholder={f.example}
                value={values[f.name]}
                onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
              />
            </div>
          ))}

          {error && <p className="form-error">{error}</p>}
          <div className="form-footer-row">
            <button className="form-submit-btn" onClick={save} disabled={busy}>{busy ? 'Saving\u2026' : 'Save'}</button>
            <button className="pc-btn" onClick={cancel}><X size={14} /> Cancel</button>
          </div>
        </div>
      )}

      <div className="admin-list">
        {rows.map((row) => (
          <div className="admin-list-item" key={row.id}>
            <span>{row.title}</span>
            <div className="admin-list-actions">
              <button className="icon-btn" onClick={() => startEdit(row)} aria-label="Edit"><Pencil size={15} /></button>
              <button className="icon-btn" onClick={() => remove(row.id)} aria-label="Delete"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}