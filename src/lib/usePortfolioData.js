import { useEffect, useState } from 'react';
import { supabase } from './supabase.js';

// Simple module-level cache: whichever component asks first triggers the
// fetch, everyone else reuses the same in-flight promise / result. Good
// enough for a single-page portfolio site's data volume.
function makeCachedFetcher(table, orderCol = 'sort_order') {
  let cache = null;
  let inflight = null;
  return function useTable() {
    const [data, setData] = useState(cache);
    const [loading, setLoading] = useState(!cache);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (cache) { setData(cache); setLoading(false); return; }
      if (!inflight) {
        inflight = supabase.from(table).select('*').order(orderCol, { ascending: true });
      }
      let cancelled = false;
      inflight.then(({ data: rows, error: err }) => {
        if (cancelled) return;
        if (err) { setError(err); setLoading(false); return; }
        cache = rows;
        setData(rows);
        setLoading(false);
      });
      return () => { cancelled = true; };
    }, []);

    return { data: data || [], loading, error };
  };
}

export const useProjects = makeCachedFetcher('projects');
export const useSkills = makeCachedFetcher('skills');
export const useCertifications = makeCachedFetcher('certifications');

// site_content is one table, many rows (one per section) — cache per
// section so Hero/About/Experience/Results/Footer don't refetch each other.
const siteContentCache = {};
const siteContentInflight = {};

// `fallback` is returned while loading (and if the row is missing/empty)
// so a component never has to render blank text before the fetch resolves.
export function useSiteContent(section, fallback) {
  const [data, setData] = useState(siteContentCache[section] ?? null);
  const [loading, setLoading] = useState(!siteContentCache[section]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (siteContentCache[section]) {
      setData(siteContentCache[section]);
      setLoading(false);
      return;
    }
    if (!siteContentInflight[section]) {
      siteContentInflight[section] = supabase
        .from('site_content')
        .select('content')
        .eq('section', section)
        .maybeSingle();
    }
    let cancelled = false;
    siteContentInflight[section].then(({ data: row, error: err }) => {
      if (cancelled) return;
      if (err) { setError(err); setLoading(false); return; }
      const content = row?.content ?? null;
      siteContentCache[section] = content;
      setData(content);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [section]);

  return { content: data || fallback, loading, error };
}