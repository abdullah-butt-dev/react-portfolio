import {
  BarChart3, Search, DollarSign, Users, Waves, Smile,
  FileText, FileCode, Database, Megaphone, Sparkles,
} from 'lucide-react';
import { LOGOS } from '../logos.js';

// Keys here must exactly match whatever gets stored in the `icon` /
// `impactIcon` columns in Supabase (always lowercase). If you add a new
// icon via the admin panel, add its entry here too — this is the one place
// a plain string in the database gets turned back into a real component.
export const ICON_MAP = {
  barchart3: BarChart3,
  search: Search,
  dollarsign: DollarSign,
  users: Users,
  waves: Waves,
  smile: Smile,
  filetexticon: FileText,
  filecode: FileCode,
  database: Database,
  megaphone: Megaphone,
  sparkles: Sparkles,
};

export function renderIcon(key, props = { size: 13 }) {
  const Icon = ICON_MAP[key];
  return Icon ? <Icon {...props} /> : null;
}

export function renderLogo(key) {
  return LOGOS[key] || null;
}