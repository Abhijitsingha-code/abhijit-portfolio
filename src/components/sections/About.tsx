import { User, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { AboutData } from '../../types';

interface AboutProps {
  containerVariants: Variants;
  itemVariants: Variants;
  about: AboutData | null;
}

export function About({ containerVariants, itemVariants, about }: AboutProps) {
  if (!about) return null;

  const displayTitle = about.title || '';
  const displaySubtitle = about.subtitle || '';
  const bioParagraphs = about.bio || [];
  const displayStats = about.stats || [];
  const displayHighlights = about.highlights || [];

  return (
    <section id="about" className="section container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        style={{ minWidth: '850px', maxWidth: '850px', margin: '0 auto' }}
      >
        {/* Section header */}
        <motion.div variants={itemVariants}>
          <div className="section-eyebrow">About Me</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem', marginBottom: '2.5rem' }}>
            <div
              style={{
                padding: '1rem',
                background: 'rgba(240, 67, 106, 0.1)',
                borderRadius: '16px',
                color: 'var(--accent)',
                flexShrink: 0,
                marginTop: '0.2rem',
              }}
            >
              <User size={30} />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-display)', marginBottom: '0.4rem' }}>
                <span dangerouslySetInnerHTML={{ __html: displayTitle }} />
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>{displaySubtitle}</p>
            </div>
          </div>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}
        >
          {displayStats.map((s) => (
            <div key={s.label} className="stat-card">
              <div
                className="stat-value"
                style={{
                  background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.value}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Bio text */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            lineHeight: '1.85',
            marginBottom: '2.5rem',
          }}
        >
          {bioParagraphs.map((para, idx) => (
            <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
          ))}
        </motion.div>

        {/* Quick tags */}
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {displayHighlights.map(({ iconName, label, color }) => {
            const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
            return (
              <div
                key={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '8px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '100px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--text-muted)',
                }}
              >
                <IconComponent size={15} style={{ color }} />
                {label}
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants}>
          <Link
            to="/skills"
            className="btn btn-secondary"
            style={{ gap: '0.6rem', paddingRight: '18px' }}
          >
            See My Technical Toolkit
            <ChevronRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
