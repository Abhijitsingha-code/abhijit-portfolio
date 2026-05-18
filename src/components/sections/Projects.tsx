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
            whileHover="hover"
            className="project-card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Subtle Gradient Glow Background on Hover */}
            <motion.div 
              variants={{ hover: { opacity: 1 } }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, height: '150px',
                background: p.bg ? p.bg : 'linear-gradient(180deg, rgba(37, 99, 235, 0.1) 0%, transparent 100%)',
                zIndex: 0, pointerEvents: 'none'
              }}
            />

            {/* Media / Image Side */}
            <div style={{ 
              height: '220px', 
              borderRadius: '16px', 
              position: 'relative',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 8px 20px rgba(0,0,0,0.2)',
              marginBottom: '1.5rem',
              zIndex: 1
            }}>
              <motion.div 
                variants={{ hover: { scale: 1.05 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  width: '100%', height: '100%',
                  background: p.imageUrl ? `url(${p.imageUrl}) center/cover no-repeat` : p.bg || 'var(--panel-bg)'
                }}
              />
              {!p.imageUrl && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.3, pointerEvents: 'none' }}>
                  <Terminal size={60} color="var(--primary)" strokeWidth={1} />
                </div>
              )}
            </div>
            
            {/* Content Side */}
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, zIndex: 1, padding: '0 0.5rem' }}>
              {/* Tags */}
              {(p.tags ?? []).length > 0 && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                  {p.tags?.map((tag, tIdx) => (
                    <span key={tIdx} style={{ 
                      fontSize: '0.7rem', 
                      padding: '0.4rem 0.8rem', 
                      background: 'rgba(255,255,255,0.04)', 
                      borderRadius: '100px',
                      color: 'var(--text-muted)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase'
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h3 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', lineHeight: 1.2, fontFamily: 'var(--font-display)', color: 'var(--text-main)' }}>{p.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                {p.description}
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                {p.sourceCodeUrl && (
                  <a href={p.sourceCodeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>
                    <GitBranch size={16} /> Code
                  </a>
                )}
                {p.liveSiteUrl && (
                  <a href={p.liveSiteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
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
