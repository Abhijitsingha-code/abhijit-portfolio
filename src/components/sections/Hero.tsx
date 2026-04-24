import { Code2, Mail, FileText } from 'lucide-react';
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
  return (
    <motion.section 
      className="hero-section container"
      style={{ opacity, scale }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}
          className="animate-float"
        >
          <div className="status-indicator">
            <div className={`indicator-dot ${appwriteStatus === 'checking' ? 'offline' : appwriteStatus === 'connected' ? 'online' : 'offline'}`}></div>
            <span style={{ fontWeight: 500, color: 'var(--text-muted)' }}>{appwriteStatus === 'checking' ? 'Connecting to Backend...' : appwriteStatus === 'connected' ? 'System Online & Ready' : 'System Offline (Appwrite Not Configured)'}</span>
          </div>
        </motion.div>

        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: 'spring', stiffness: 100 }}
          style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.1, fontFamily: 'var(--font-display)' }}
        >
          {profile?.title ? (
            <span dangerouslySetInnerHTML={{ __html: profile.title }} />
          ) : (
            <>Crafting <span className="text-gradient-primary">Digital</span> <br /> <span className="text-gradient-accent">Experiences</span></>
          )}
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 3rem', lineHeight: 1.7, fontWeight: 400 }}
        >
          {profile?.description || 'I architect high-performance web applications using robust technologies like React, Node.js, and Appwrite, delivering premium quality solutions.'}
        </motion.p>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link to="/projects" className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '1.05rem' }}>
            <Code2 size={20} />
            Explore My Work
          </Link>
          {profile?.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '1.05rem' }}>
              <FileText size={20} />
              View Resume
            </a>
          )}
          <Link to="/contact" className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '1.05rem' }}>
            <Mail size={20} />
            Let's Talk
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
