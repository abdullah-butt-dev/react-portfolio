import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

// ── EmailJS config ──────────────────────────────────────────────────────
// Reads from Vite env vars (must be prefixed VITE_ and defined in a .env
// file at your project root, never committed to git):
//   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
//   VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
//   VITE_EMAILJS_PUBLIC_KEY=your_public_key
// If your project uses Create React App instead of Vite, swap the three
// lines below for process.env.REACT_APP_EMAILJS_SERVICE_ID (etc.) and
// prefix the .env keys with REACT_APP_ instead of VITE_.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

if (PUBLIC_KEY) emailjs.init({ publicKey: PUBLIC_KEY });

const EMPTY_ERRORS = { name: '', email: '', message: '' };

function validate({ name, email, message }) {
  const errors = { ...EMPTY_ERRORS };
  if (!name.trim()) errors.name = 'Please enter your name.';
  if (!email.trim()) errors.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'That email doesn\u2019t look right.';
  if (!message.trim()) errors.message = 'Please add a short message.';
  else if (message.trim().length < 10) errors.message = 'A little more detail helps \u2014 at least 10 characters.';
  return errors;
}

export default function Contact() {
  const formRef = useRef(null);
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState(EMPTY_ERRORS);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS is not configured \u2014 missing VITE_EMAILJS_* env vars. Did you restart `npm run dev` after creating .env?');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current);
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
    } catch (err) {
      // EmailJS puts the real reason in err.text (e.g. "Public Key is invalid",
      // "The service ID not found") \u2014 check the browser console for this,
      // it's almost always more specific than the generic CORS message.
      console.error('EmailJS send failed:', err?.text || err?.message || err);
      setStatus('error');
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <p className="eyebrow reveal">Contact</p>
        <h2 className="reveal">Let's <span className="gradient-text">connect.</span></h2>
        <p className="lead reveal" style={{ marginTop: '.85rem', marginBottom: 0 }}>
          Open to freelance projects and collaboration. Send a message below, or reach out directly.
        </p>

        <form ref={formRef} className="contact-form-card reveal" onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                autoComplete="name"
                value={values.name}
                onChange={onChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'cf-name-err' : undefined}
              />
              {errors.name && <span className="form-error" id="cf-name-err">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                placeholder="jane@company.com"
                autoComplete="email"
                value={values.email}
                onChange={onChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'cf-email-err' : undefined}
              />
              {errors.email && <span className="form-error" id="cf-email-err">{errors.email}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cf-message">Message</label>
            <textarea
              id="cf-message"
              name="message"
              rows={5}
              placeholder={"Tell me a bit about your project or opportunity\u2026"}
              value={values.message}
              onChange={onChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'cf-message-err' : undefined}
            />
            {errors.message && <span className="form-error" id="cf-message-err">{errors.message}</span>}
          </div>

          <div className="form-footer-row">
            <button className="form-submit-btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <><Loader2 size={16} className="spin" /> Sending&hellip;</>
              ) : (
                <><Send size={16} /> Send Message</>
              )}
            </button>

            <div className="form-status-row" role="status" aria-live="polite">
              {status === 'success' && (
                <p className="form-status success"><CheckCircle2 size={16} /> Thanks &mdash; your message is on its way. I&rsquo;ll reply soon.</p>
              )}
              {status === 'error' && (
                <p className="form-status error"><AlertCircle size={16} /> Couldn&rsquo;t send that. Try again, or reach me directly below.</p>
              )}
            </div>
          </div>
        </form>

        <p className="contact-alt-line reveal">
          Prefer email or LinkedIn? Reach out directly &mdash; I read and reply to both.
        </p>

        <div className="contact-links">
          <a className="contact-link reveal" href="mailto:abdullah.butt.da@gmail.com" aria-label="Email" title="Email">
            <Mail size={20} />
          </a>
          <a className="contact-link reveal" href="https://linkedin.com/in/abdullah-butt-da" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a className="contact-link reveal" href="https://github.com/abdullah-butt-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <Github size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}