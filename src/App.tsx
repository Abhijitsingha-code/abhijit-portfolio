import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { fetchProfile, fetchProjects, fetchSkills } from './lib/sanity.queries';
import { sanityConfig } from './lib/sanity';
import type { ProfileData, ProjectData, SkillData } from './types';
import './index.css';

import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { motion, AnimatePresence, useDragControls, type Variants } from 'framer-motion';

const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    style={{ height: '100%' }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const dragControls = useDragControls();
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const [sanityStatus, setSanityStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skills, setSkills] = useState<SkillData[]>([]);

  useEffect(() => {
    const initSanity = async () => {
      // Verify config is present before fetching
      if (!sanityConfig.projectId) {
        setSanityStatus('error');
        return;
      }

      try {
        const [profileData, projectsData, skillsData] = await Promise.all([
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
        ]);

        setProfile(profileData);
        setProjects(projectsData);
        setSkills(skillsData);
        setSanityStatus('connected');
      } catch (err) {
        console.error('Sanity initialisation error:', err);
        setSanityStatus('error');
      }
    };

    initSanity();
  }, []);

  const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants: Variants = { hidden: { y: 20, opacity: 0, scale: 0.95 }, visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100 } } };

  // Helper to handle dock click (restores window if minimized or closed)
  const handleDockClick = () => {
    if (isMinimized) setIsMinimized(false);
    if (isClosed) setIsClosed(false);
  };

  return (
    <>
      <Navbar profile={profile} onDockClick={handleDockClick} />
      
      <main className="app-container" style={{ padding: isMaximized ? '28px 0 0 0' : undefined }}>
        <div className={isMaximized ? '' : 'container'} style={isMaximized ? { width: '100%', height: '100%' } : {}}>
          <AnimatePresence>
            {!isClosed && (
              <motion.div 
                className="glass"
                drag={!isMaximized}
                dragControls={dragControls}
                dragListener={false}
                dragMomentum={false}
                animate={{
                  borderRadius: isMaximized ? 0 : 12,
                  width: isMaximized ? '100vw' : '100%',
                  height: isMaximized ? 'calc(100vh - 28px)' : 'auto',
                  scale: isMinimized ? 0.4 : 1,
                  opacity: isMinimized ? 0 : 1,
                  y: isMinimized ? 300 : 0,
                  marginTop: isMaximized ? 0 : '2rem'
                }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                style={{
                  position: isMaximized ? 'fixed' : 'relative',
                  top: isMaximized ? 28 : 'auto',
                  left: isMaximized ? 0 : 'auto',
                  zIndex: 50,
                  overflow: isMaximized ? 'auto' : 'hidden',
                  margin: 0
                }}
              >
                <div 
                  className="glass-header" 
                  onPointerDown={(e) => dragControls.start(e)}
                  style={{ cursor: isMaximized ? 'default' : 'grab' }}
                  onDoubleClick={() => setIsMaximized(!isMaximized)}
                >
                  <div className="traffic-lights">
                    <button 
                      className="traffic-light close" 
                      onClick={() => setIsClosed(true)}
                      title="Close"
                    />
                    <button 
                      className="traffic-light min" 
                      onClick={() => setIsMinimized(true)}
                      title="Minimize"
                    />
                    <button 
                      className="traffic-light max" 
                      onClick={() => setIsMaximized(!isMaximized)}
                      title="Zoom"
                    />
                  </div>
                  <div className="glass-title">
                    Portfolio — Abhijit Singha
                  </div>
                </div>
                <div className="glass-content" style={{ height: isMaximized ? 'calc(100% - 64px)' : 'auto', overflowY: 'auto' }}>
                  <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                      <Route path="/" element={<AnimatedPage><Hero profile={profile} sanityStatus={sanityStatus} opacity={1} scale={1} /></AnimatedPage>} />
                      <Route path="/about" element={<AnimatedPage><About containerVariants={containerVariants} itemVariants={itemVariants} /></AnimatedPage>} />
                      <Route path="/skills" element={<AnimatedPage><Skills containerVariants={containerVariants} itemVariants={itemVariants} skills={skills} /></AnimatedPage>} />
                      <Route path="/projects" element={<AnimatedPage><Projects projects={projects} /></AnimatedPage>} />
                      <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
                    </Routes>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
}

export default App;
