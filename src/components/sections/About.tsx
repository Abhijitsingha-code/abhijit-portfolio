import { User, Briefcase, Heart, ChevronRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AboutProps {
  containerVariants: Variants;
  itemVariants: Variants;
}

const stats = [
  { value: '3+', label: 'Years Experience', color: 'var(--primary)' },
  { value: '20+', label: 'Projects Shipped', color: 'var(--secondary)' },
  { value: '100%', label: 'Client Satisfaction', color: 'var(--accent-green)' },
];

const highlights = [
  { icon: Briefcase, label: 'Open to Freelance', color: '#60a5fa' },
  { icon: Heart,     label: 'Passion for Clean Code', color: '#f472b6' },
];

export function About({ containerVariants, itemVariants }: AboutProps) {
  return (
    <section id="about" className="section container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        style={{ maxWidth: '820px', margin: '0 auto' }}
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
                Who <span className="text-gradient-accent">I Am</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Crafting software that's as reliable as it is beautiful.</p>
            </div>
          </div>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={itemVariants}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}
        >
          {stats.map((s) => (
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
          <p>
            Hello! I'm a passionate developer who bridges elegant design with complex backend architecture. I build immersive digital experiences that are performant, scalable, and a joy to use.
          </p>
          <p>
            My philosophy is rooted in <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}>continuous learning and intentional execution</strong>. Whether I'm designing a database schema, animating UI with Framer Motion, or structuring REST endpoints — I write code that is clean, modular, and future-proof.
          </p>
        </motion.div>

        {/* Quick tags */}
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {highlights.map(({ icon: Icon, label, color }) => (
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
              <Icon size={15} style={{ color }} />
              {label}
            </div>
          ))}
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
