import { supabase } from './supabase.js';

export async function listAll(table) {
  const { data, error } = await supabase.from(table).select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function insertRow(table, row) {
  const { data, error } = await supabase.from(table).insert(row).select().single();
  if (error) throw error;
  return data;
}

export async function updateRow(table, id, patch) {
  const { data, error } = await supabase.from(table).update(patch).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteRow(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

// ── SITE CONTENT (key/value: one row per section) ──────────────────────

export async function getSiteContent(section) {
  const { data, error } = await supabase
    .from('site_content')
    .select('content')
    .eq('section', section)
    .maybeSingle();
  if (error) throw error;
  return data?.content ?? null;
}

export async function upsertSiteContent(section, content) {
  const { data, error } = await supabase
    .from('site_content')
    .upsert({ section, content, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── STORAGE: image upload (shared 'portfolio-images' bucket) ───────────
// Free-tier friendly: images are downscaled + re-encoded as JPEG in the
// browser before upload, so a phone screenshot doesn't eat a chunk of the
// 1GB free storage quota. `folder` just keeps things tidy in the bucket
// browser (e.g. 'projects', 'skills', 'site-content') — it has no effect
// on the free-tier quota, which is shared across the whole project.
const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.8;

function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    // Only downscale actual raster images; leave svg/gif alone (canvas
    // re-encoding would flatten animation/transparency in ways that
    // aren't worth it for a portfolio site's image sizes).
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      resolve(file);
      return;
    }
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, MAX_DIMENSION / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Image compression failed'))),
        'image/jpeg',
        JPEG_QUALITY
      );
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Could not read image file')); };
    img.src = objectUrl;
  });
}

export async function uploadImage(file, folder = 'misc') {
  const processed = await resizeImageFile(file);
  const ext = file.type === 'image/svg+xml' ? 'svg' : file.type === 'image/gif' ? 'gif' : 'jpg';
  const safeName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9-_]/gi, '-').toLowerCase().slice(0, 40);
  const path = `${folder}/${Date.now()}-${safeName || 'image'}.${ext}`;

  const { error } = await supabase.storage
    .from('portfolio-images')
    .upload(path, processed, { contentType: processed.type || file.type, upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path);
  return data.publicUrl;
  // NOTE: this does not delete the previous image when a field gets
  // replaced in a form — deleting is skipped on purpose since the old
  // URL might still be referenced elsewhere (e.g. reused across sections).
  // If storage usage ever gets close to the free-tier cap, periodically
  // audit the bucket in the Supabase dashboard and remove unused files.
}