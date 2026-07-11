import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../lib/useAuth.js';
import AdminLogin from './AdminLogin.jsx';
import ProjectsAdmin from './ProjectsAdmin.jsx';
import SimpleTableAdmin from './SimpleTableAdmin.jsx';
import SiteContentAdmin from './SiteContentAdmin.jsx';

const SKILLS_FIELDS = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'logo', label: 'Logo key (e.g. python, streamlit, github) \u2014 leave blank if using an icon instead', type: 'text' },
  { name: 'icon', label: 'Icon key (e.g. database) \u2014 only used if no logo set', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'usage', label: 'Usage line (e.g. "Primary use: ...")', type: 'text' },
  { name: 'color', label: 'Accent color (hex, e.g. #3776AB)', type: 'text' },
  { name: 'sort_order', label: 'Sort order (lower shows first)', type: 'number' },
];

const CERTS_FIELDS = [
  { name: 'name', label: 'Certificate name', type: 'text' },
  { name: 'issuer', label: 'Issuer', type: 'text' },
  { name: 'cert_date', label: 'Date / label (e.g. "Coursera Certification")', type: 'text' },
  { name: 'cert_id', label: 'Credential ID text', type: 'text' },
  { name: 'skills', label: 'Skills (comma-separated)', type: 'list' },
  { name: 'link', label: 'Certificate URL', type: 'text' },
  { name: 'sort_order', label: 'Sort order (lower shows first)', type: 'number' },
];

const TABS = ['Projects', 'Skills', 'Certifications', 'Site Content'];

export default function Admin() {
  const { user, loading, signOut } = useAuth();
  const [tab, setTab] = useState('Projects');

  if (loading) return <div className="page"><div className="container first"><p className="lead">Loading\u2026</p></div></div>;
  if (!user) return <AdminLogin />;

  return (
    <div className="page">
      <div className="container first">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Admin</p>
            <h2>Content manager</h2>
          </div>
          <button className="pc-btn" onClick={signOut}><LogOut size={14} /> Sign Out</button>
        </div>

        <div className="admin-tabs">
          {TABS.map((t) => (
            <button key={t} className={`admin-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>

        {tab === 'Projects' && <ProjectsAdmin />}
        {tab === 'Skills' && <SimpleTableAdmin table="skills" title="Skills" fields={SKILLS_FIELDS} />}
        {tab === 'Certifications' && <SimpleTableAdmin table="certifications" title="Certifications" fields={CERTS_FIELDS} />}
        {tab === 'Site Content' && <SiteContentAdmin />}
      </div>
    </div>
  );
}