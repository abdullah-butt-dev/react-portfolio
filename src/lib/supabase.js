import { createClient } from '@supabase/supabase-js';

// Vite env vars — add these to your .env (never commit it):
//   VITE_SUPABASE_URL=https://xxxxx.supabase.co
//   VITE_SUPABASE_ANON_KEY=eyJ...   <- the ANON/public key, safe for the browser.
//     This is NOT the service role key. The anon key only ever does what
//     your Row Level Security policies allow (public read, auth-only write).
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);