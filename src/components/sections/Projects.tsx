import { ArrowUpRight, GitBranch, Globe, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProjectData } from '../../types';

interface ProjectsProps {
  projects: ProjectData[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto 4rem auto' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '40px', height: '2px', background: 'var(--accent)' }}></div>
          <span style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Portfolio</span>
        </div>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, fontFamily: 'var(--font-display)' }}>Featured <br /><span className="text-gradient-accent">Case Studies</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '600px', lineHeight: 1.7 }}>
          A curated selection of my latest technical achievements and creative developments.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {(projects.length > 0 ? projects : [
          {
            title: "Nexus SaaS Platform",
            description: "A fully-fledged enterprise SaaS product built with React and Appwrite for seamless authentication, database modeling, and real-time storage.",
            bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(0,0,0,0) 100%)",
            tags: ["React", "Appwrite", "TypeScript"],
            sourceCodeUrl: "#",
            liveSiteUrl: "#"
          },
          {
            title: "Pulse Real-time Dashboard",
            description: "Live analytics dashboard leveraging Appwrite Realtime subscriptions to track user behaviors and system metrics dynamically.",
            bg: "linear-gradient(135deg, rgba(236, 72, 153, 0.2) 0%, rgba(0,0,0,0) 100%)",
            tags: ["React", "WebSockets", "Charting"],
            sourceCodeUrl: "#",
            liveSiteUrl: "#"
          }
        ] as ProjectData[]).map((p, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="project-card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '1.5rem', 
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* Media / Image Side */}
            <div style={{ 
              height: '240px', 
              borderRadius: '12px', 
              background: p.imageUrl ? `url(${p.imageUrl}) center/cover no-repeat` : p.bg || 'var(--panel-bg)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
            }}>
              {!p.imageUrl && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5 }}>
                  <Terminal size={80} color="var(--primary)" strokeWidth={1} />
                </div>
              )}
            </div>
            
            {/* Content Side */}
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              
              {/* Tags */}
              {(p.tags ?? []).length > 0 && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {p.tags?.map((tag, tIdx) => (
                    <span key={tIdx} style={{ 
                      fontSize: '0.75rem', 
                      padding: '0.3rem 0.8rem', 
                      background: 'rgba(255,255,255,0.03)', 
                      borderRadius: '100px',
                      color: 'var(--text-muted)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.8rem', lineHeight: 1.2, fontFamily: 'var(--font-display)' }}>{p.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                {p.description}
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                {p.sourceCodeUrl && (
                  <a href={p.sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ flex: 1 }}>
                    <GitBranch size={16} /> Code
                  </a>
                )}
                {p.liveSiteUrl && (
                  <a href={p.liveSiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1 }}>
                    <Globe size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
