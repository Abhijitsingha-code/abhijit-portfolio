import { useState, useRef } from 'react';
import { Send, Loader2, Mail, Link2, CheckCircle2, AlertCircle, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const SOCIAL_LINKS = [
  { icon: Link2, label: 'GitHub', href: 'https://github.com/abhijitsingha', color: '#f0f6fc' },
  { icon: Link2, label: 'LinkedIn', href: 'https://linkedin.com/in/abhijitsingha', color: '#0a66c2' },
  { icon: Link2, label: 'Twitter', href: 'https://twitter.com/abhijitsingha', color: '#1d9bf0' },
];

interface ContactProps {
  email?: string;
}

export function Contact({ email }: ContactProps) {
  const form = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS configuration is missing.');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formState.name,
          from_email: formState.email,
          user_name: formState.name,
          user_email: formState.email,
          message: formState.message,
          to_name: 'Abhijit',
          reply_to: formState.email,
        },
        publicKey
      );
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={{ minWidth: '850px', maxWidth: '850px', margin: '0 auto 3rem' }}
      >
        <div className="section-eyebrow">Contact</div>
        <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginBottom: '0.8rem', fontFamily: 'var(--font-display)' }}>
          Let's <span className="text-gradient-primary">Build</span> Something
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '540px', lineHeight: 1.7 }}>
          Have a project in mind, or just want to say hi? I'm always open to new opportunities and conversations.
        </p>
      </motion.div>

      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.6fr)',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* ---- Left Panel: Info ---- */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {/* Contact info cards */}
          {[
            {
              icon: Mail,
              label: 'Email',
              value: email || 'hi@abhijitsingha.dev',
              href: `mailto:${email || 'hi@abhijitsingha.dev'}`,
              color: '#60a5fa',
              bg: 'rgba(96, 165, 250, 0.08)',
            },
            {
              icon: MapPin,
              label: 'Location',
              value: 'India · Remote',
              color: '#f472b6',
              bg: 'rgba(244, 114, 182, 0.08)',
            },
            {
              icon: Clock,
              label: 'Response Time',
              value: 'Within 24 hours',
              color: '#34d399',
              bg: 'rgba(52, 211, 153, 0.08)',
            },
          ].map(({ icon: Icon, label, value, href, color, bg }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.2rem',
                background: bg,
                border: `1px solid ${color}22`,
                borderRadius: '14px',
                cursor: href ? 'pointer' : 'default',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              {...(href ? { as: 'a', onClick: () => window.open(href) } : {})}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color,
                  flexShrink: 0,
                }}
              >
                <Icon size={17} />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                  {label}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 500 }}>{value}</div>
              </div>
            </div>
          ))}

          {/* Social links */}
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Find me on
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              {SOCIAL_LINKS.map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.22s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = color;
                    (e.currentTarget as HTMLElement).style.background = `${color}14`;
                    (e.currentTarget as HTMLElement).style.borderColor = `${color}35`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </motion.aside>

        {/* ---- Right Panel: Form ---- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            padding: '2rem',
          }}
        >
          <AnimatePresence mode="wait">
            {submitStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    background: 'rgba(16, 217, 160, 0.1)',
                    border: '1px solid rgba(16, 217, 160, 0.25)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: 'var(--accent-green)',
                  }}
                >
                  <CheckCircle2 size={34} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
                  Message Sent! 🎉
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="btn btn-secondary"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleContactSubmit}
                ref={form}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.01em' }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="user_name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.01em' }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="user_email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.01em' }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project, idea, or just say hi…"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Error state */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '0.9rem 1.1rem',
                      background: 'rgba(239, 68, 68, 0.08)',
                      color: '#f87171',
                      borderRadius: '10px',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <AlertCircle size={16} />
                    Failed to send. Please check your EmailJS config or try again.
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem', marginTop: '0.25rem' }}
                >
                  {isSubmitting ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={18} /> Send Message</>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
