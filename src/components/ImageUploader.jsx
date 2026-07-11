import { useRef, useState } from 'react';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { uploadImage } from '../lib/adminApi.js';

// Drop-in replacement for a plain "image URL" text input, used by
// Projects, Skills, and the Site Content admin forms. Uploads go to the
// shared 'portfolio-images' Storage bucket (see lib/adminApi.js) and this
// component just hands the resulting public URL back via onChange —
// callers store that string exactly like they used to store a manual URL.
//
// `folder` is purely cosmetic (keeps the bucket browser organized in the
// Supabase dashboard) — pass 'projects', 'skills', or 'site-content'.
export default function ImageUploader({ value, onChange, folder = 'misc', label = 'Image' }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    setError('');
    setBusy(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (e) {
      setError(e.message || 'Upload failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="form-group">
      <label>{label}</label>

      <div
        className={`image-uploader${dragOver ? ' drag-over' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        role="button"
        tabIndex={0}
      >
        {value ? (
          <div className="image-uploader-preview">
            <img src={value} alt="" />
            <button
              type="button"
              className="icon-btn image-uploader-remove"
              aria-label="Remove image"
              onClick={(e) => { e.stopPropagation(); onChange(''); }}
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="image-uploader-empty">
            {busy ? <Loader2 size={18} className="spin" /> : <UploadCloud size={18} />}
            <span>{busy ? 'Uploading…' : 'Click or drag an image here'}</span>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      {/* Manual URL fallback — useful for pasting an existing path like
          the ones already used in projects (e.g. /images/x.png) without
          re-uploading. */}
      <input
        type="text"
        placeholder="or paste an image URL directly"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="image-uploader-url-input"
      />
    </div>
  );
}