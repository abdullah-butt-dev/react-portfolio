import { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import { listAll, insertRow, updateRow, deleteRow } from '../lib/adminApi.js';

function emptyValues(fields) {
  const v = {};
  fields.forEach((f) => { v[f.name] = f.type === 'number' ? 0 : ''; });
  return v;
}

function rowToValues(row, fields) {
  const v = {};
  fields.forEach((f) => {
    const raw = row[f.name];
    v[f.name] = f.type === 'list' ? (raw || []).join(', ') : (raw ?? (f.type === 'number' ? 0 : ''));
  });
  return v;
}

function valuesToPayload(values, fields) {
  const payload = {};
  fields.forEach((f) => {
    if (f.type === 'list') {
      payload[f.name] = values[f.name].split(',').map((s) => s.trim()).filter(Boolean);
    } else if (f.type === 'number') {
      payload[f.name] = Number(values[f.name]) || 0;
    } else {
      payload[f.name] = values[f.name];
    }
  });
  return payload;
}

export default function SimpleTableAdmin({ table, title, fields }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null); // null = not editing, 'new' = adding
  const [values, setValues] = useState(emptyValues(fields));
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    listAll(table).then(setRows).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };

  useEffect(load, [table]);

  const startNew = () => { setEditingId('new'); setValues(emptyValues(fields)); setError(''); };
  const startEdit = (row) => { setEditingId(row.id); setValues(rowToValues(row, fields)); setError(''); };
  const cancel = () => { setEditingId(null); setError(''); };

  const save = async () => {
    setBusy(true);
    setError('');
    try {
      const payload = valuesToPayload(values, fields);
      if (editingId === 'new') {
        await insertRow(table, payload);
      } else {
        await updateRow(table, editingId, payload);
      }
      setEditingId(null);
      load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    setBusy(true);
    try {
      await deleteRow(table, id);
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
        <h3>{title}</h3>
        {editingId === null && (
          <button className="form-submit-btn" onClick={startNew}><Plus size={15} /> Add New</button>
        )}
      </div>

      {loading && <p className="lead">Loading\u2026</p>}

      {editingId !== null && (
        <div className="admin-form-card">
          {fields.map((f) => (
            <div className="form-group" key={f.name}>
              <label>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea rows={3} value={values[f.name]} onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))} />
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={values[f.name]}
                  onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                />
              )}
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
            <span>{row.title || row.name}</span>
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