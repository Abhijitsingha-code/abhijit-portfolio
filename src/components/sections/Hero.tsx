import { Code2, Mail, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { ProfileData } from '../../types';

interface HeroProps {
  profile: ProfileData | null;
  appwriteStatus: 'checking' | 'connected' | 'error';
  opacity: any;
  scale: any;
}

export function Hero({ profile, appwriteStatus, opacity, scale }: HeroProps) {
  const isOnline = appwriteStatus === 'connected';
  const statusLabel =
    appwriteStatus === 'checking' ? 'Connecting…' :
    appwriteStatus === 'connected' ? 'Available for Projects' :
    'Offline Mode';

  return (
    <motion.section
      className="hero-section container"
      style={{ opacity, scale }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', padding: '1rem 0' }}>

        {/* Status badge */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 120 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}
          className="animate-float"
        >
          <div className="status-indicator">
            <div className={`indicator-dot ${isOnline ? 'online' : 'offline'}`} />
            <span style={{ color: 'var(--text-muted)' }}>{statusLabel}</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15, type: 'spring', stiffness: 80 }}
          style={{
            fontSize: 'clamp(3.2rem, 8vw, 5.5rem)',
            marginBottom: '1.6rem',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
          }}
        >
          {profile?.title ? (
            <span dangerouslySetInnerHTML={{ __html: profile.title }} />
          ) : (
            <>
              Crafting{' '}
              <span className="text-gradient-primary">Digital</span>
              <br />
              <span className="text-gradient-accent">Experiences</span>
            </>
          )}
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.75,
            fontWeight: 400,
          }}
        >
          {profile?.description ||
            'I architect high-performance web applications with React, Node.js, and Appwrite — focused on clean code and premium user experiences.'}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/projects" className="btn btn-primary" style={{ padding: '13px 30px', fontSize: '1rem' }}>
            <Code2 size={18} />
            Explore My Work
            <ArrowRight size={16} style={{ opacity: 0.8 }} />
          </Link>

          {profile?.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '13px 30px', fontSize: '1rem' }}
            >
              <FileText size={18} />
              View Résumé
            </a>
          )}

          <Link to="/contact" className="btn btn-secondary" style={{ padding: '13px 30px', fontSize: '1rem' }}>
            <Mail size={18} />
            Let's Talk
          </Link>
        </motion.div>

        {/* Decorative tech stack hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'var(--text-subtle)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <Sparkles size={12} style={{ color: 'var(--secondary)', opacity: 0.8 }} />
          React · TypeScript · Node.js · Appwrite · Framer Motion
          <Sparkles size={12} style={{ color: 'var(--secondary)', opacity: 0.8 }} />
        </motion.div>
      </div>
    </motion.section>
  );
}
