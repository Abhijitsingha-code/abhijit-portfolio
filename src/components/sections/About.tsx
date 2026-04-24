import { User } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

interface AboutProps {
  containerVariants: Variants;
  itemVariants: Variants;
}

export function About({ containerVariants, itemVariants }: AboutProps) {
  return (
    <section id="about" className="section container">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}
      >
        <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '16px', color: 'var(--accent)' }}>
            <User size={32} />
          </div>
          <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)' }}>About <span className="text-gradient-accent">Me</span></h2>
        </motion.div>

        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2rem', color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.8' }}>
          <p>
            Hello! I am a passionate developer who loves bridging the gap between elegant design and complex backend architecture. I actively focus on creating immersive digital experiences that don't just look amazing, but are highly performant and scalable.
          </p>
          <p>
            My fundamental philosophy is rooted in continuous learning execution. Whether I'm designing a new database schema, animating UI components with Framer Motion, or structuring scalable API endpoints, I strive to write code that is clean, modular, and built for the future.
          </p>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>3+</h4>
              <span style={{ fontSize: '0.9rem' }}>Years Experience</span>
            </div>
            <div style={{ borderLeft: '3px solid var(--secondary)', paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>20+</h4>
              <span style={{ fontSize: '0.9rem' }}>Projects Completed</span>
            </div>
            <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
              <h4 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>100%</h4>
              <span style={{ fontSize: '0.9rem' }}>Client Satisfaction</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
