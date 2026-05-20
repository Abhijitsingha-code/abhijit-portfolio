import { ArrowUpRight, GitBranch, Globe, Terminal, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProjectData } from '../../types';

interface ProjectsProps {
  projects: ProjectData[];
}

const FALLBACK_PROJECTS = [
  {
    title: 'Nexus SaaS Platform',
    description:
      'A fully-fledged enterprise SaaS built with React and Appwrite for seamless authentication, real-time database modeling, and cloud storage — designed to scale from day one.',
    bg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.2) 100%)',
    tags: ['React', 'Appwrite', 'TypeScript', 'Tailwind'],
    sourceCodeUrl: '#',
    liveSiteUrl: '#',
  },
  {
    title: 'Pulse Analytics Dashboard',
    description:
      'Live analytics dashboard leveraging Appwrite Realtime subscriptions to track user behaviors and system metrics dynamically — with beautiful, animated charts.',
    bg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(245, 158, 11, 0.15) 100%)',
    tags: ['React', 'WebSockets', 'Recharts', 'Node.js'],
    sourceCodeUrl: '#',
    liveSiteUrl: '#',
  },
];

const ACCENT_COLORS = [
  { glow: 'rgba(79, 142, 247, 0.25)', border: 'rgba(79, 142, 247, 0.2)', tag: 'rgba(79, 142, 247, 0.15)' },
  { glow: 'rgba(240, 67, 106, 0.25)', border: 'rgba(240, 67, 106, 0.2)', tag: 'rgba(240, 67, 106, 0.12)' },
];

export function Projects({ projects }: ProjectsProps) {
  const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS as unknown as ProjectData[];

  return (
    <section id="projects" className="section container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        style={{ minWidth: '850px', maxWidth: '850px', margin: '0 auto 3.5rem' }}
      >
        <div className="section-eyebrow">Portfolio</div>
        <h2
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            marginBottom: '1rem',
            fontFamily: 'var(--font-display)',
          }}
        >
          Featured{' '}
          <span className="text-gradient-accent">Case Studies</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '560px', lineHeight: 1.7 }}>
          A curated selection of my latest technical achievements and creative builds.
        </p>
      </motion.div>

      {/* Project grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '2rem',
          maxWidth: '820px',
          margin: '0 auto',
        }}
      >
        {displayProjects.map((p, i) => {
          const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
          return (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover="hover"
              className="project-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '22px',
                border: `1px solid rgba(255, 255, 255, 0.06)`,
                backdropFilter: 'blur(12px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Hover glow */}
              <motion.div
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: p.bg ?? 'linear-gradient(135deg, rgba(79,142,247,0.15) 0%, transparent 60%)',
                  zIndex: 0,
                  pointerEvents: 'none',
                  borderRadius: 'inherit',
                }}
              />

              {/* Top accent bar */}
              <motion.div
                variants={{ hover: { opacity: 1, scaleX: 1 } }}
                initial={{ opacity: 0, scaleX: 0.5 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '2px',
                  background: p.bg ?? `linear-gradient(90deg, ${accent.border}, transparent)`,
                  transformOrigin: 'left',
                  borderRadius: '2px 2px 0 0',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
              />

              {/* Image / Preview */}
              <div
                style={{
                  height: '200px',
                  borderRadius: '14px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.25)`,
                  marginBottom: '1.5rem',
                  zIndex: 1,
                  background: p.bg ?? 'var(--panel-bg)',
                }}
              >
                <motion.div
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: p.imageUrl
                      ? `url(${p.imageUrl}) center/cover no-repeat`
                      : p.bg ?? 'var(--panel-bg)',
                  }}
                />
                {!p.imageUrl && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.2,
                    }}
                  >
                    <Terminal size={56} color="white" strokeWidth={1} />
                  </div>
                )}
                {/* External link overlay on hover */}
                {p.liveSiteUrl && p.liveSiteUrl !== '#' && (
                  <motion.a
                    href={p.liveSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={{ hover: { opacity: 1 } }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(4px)',
                      color: 'white',
                      textDecoration: 'none',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    }}
                  >
                    <ExternalLink size={18} />
                    View Live
                  </motion.a>
                )}
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, zIndex: 1 }}>
                {/* Tags */}
                {(p.tags ?? []).length > 0 && (
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {p.tags?.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '0.7rem',
                          padding: '4px 10px',
                          background: accent.tag,
                          borderRadius: '100px',
                          color: 'var(--text-muted)',
                          border: `1px solid ${accent.border}`,
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h3
                  style={{
                    fontSize: '1.55rem',
                    marginBottom: '0.6rem',
                    lineHeight: 1.2,
                    fontFamily: 'var(--font-display)',
                    color: 'var(--text-main)',
                    fontWeight: 700,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    fontSize: '0.95rem',
                    lineHeight: 1.65,
                    marginBottom: '1.75rem',
                    flexGrow: 1,
                  }}
                >
                  {p.description}
                </p>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                  {p.sourceCodeUrl && (
                    <a
                      href={p.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '11px', fontSize: '0.88rem' }}
                    >
                      <GitBranch size={15} /> Code
                    </a>
                  )}
                  {p.liveSiteUrl && (
                    <a
                      href={p.liveSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '11px', fontSize: '0.88rem' }}
                    >
                      <Globe size={15} /> Live Demo
                      <ArrowUpRight size={14} style={{ marginLeft: 2 }} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
