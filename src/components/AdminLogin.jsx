import { useState } from 'react';
import { useAuth } from '../lib/useAuth.js';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const { error: err } = await signIn(email, password);
    setBusy(false);
    if (err) setError(err.message);
  };

  return (
    <div className="page">
      <div className="container first" style={{ maxWidth: 420 }}>
        <p className="eyebrow">Admin</p>
        <h2 style={{ marginBottom: '1.5rem' }}>Sign in</h2>
        <form onSubmit={onSubmit} className="contact-form-card" noValidate>
          <div className="form-group">
            <label htmlFor="admin-email">Email</label>
            <input id="admin-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="form-submit-btn" type="submit" disabled={busy}>
            {busy ? 'Signing in\u2026' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}