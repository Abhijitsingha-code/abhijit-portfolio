import { useScroll, useTransform, type Variants } from 'framer-motion';
import type { ProfileData, ProjectData, SkillData } from '../types';

import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Contact } from '../components/sections/Contact';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeProps {
  appwriteStatus: 'checking' | 'connected' | 'error';
  projects: ProjectData[];
  profile: ProfileData | null;
  skills: SkillData[];
}

export function Home({ appwriteStatus, projects, profile, skills }: HomeProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    }
  };

  return (
    <main>
      <Hero profile={profile} appwriteStatus={appwriteStatus} opacity={opacity} scale={scale} />
      
      <About containerVariants={containerVariants} itemVariants={itemVariants} />
      
      <Skills containerVariants={containerVariants} itemVariants={itemVariants} skills={skills} />
      
      <Projects projects={projects} />

      {appwriteStatus !== 'connected' && (
        <section id="setup" className="section container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass"
            style={{ borderLeft: '4px solid var(--accent)', background: 'linear-gradient(90deg, rgba(236, 72, 153, 0.05) 0%, rgba(20, 20, 25, 0.4) 100%)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <ShieldCheck size={32} color="var(--accent)" />
              <h3 style={{ fontSize: '1.8rem' }}>Backend Configuration</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              To fully unlock the real-time capabilities and database features, connect your Appwrite instance by creating a <code>.env</code> file in the project root:
            </p>
            <div style={{ background: '#000', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto', marginBottom: '1.5rem' }}>
              <pre style={{ color: '#e2e8f0', fontFamily: 'monospace', fontSize: '1rem' }}>
{`VITE_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
VITE_APPWRITE_PROJECT="YOUR_PROJECT_ID"
VITE_APPWRITE_DATABASE_ID="YOUR_DATABASE_ID"`}
              </pre>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>
              Restart your dev server after saving. The status indicator in the hero section will turn glowing green once successfully connected.
            </p>
          </motion.div>
        </section>
      )}

      <Contact />
    </main>
  );
}
