import { User, Hammer, FolderOpen, Mail, Terminal, Apple, Search, Wifi, Battery, Cpu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ProfileData } from '../../types';

export function Navbar({ profile, onDockClick }: { profile: ProfileData | null, onDockClick?: () => void }) {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );
  const [date, setDate] = useState(() =>
    new Date().toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    }, 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Top Menu Bar */}
      <nav className="menubar" role="navigation" aria-label="Top menu bar">
        <div className="menubar-left">
          <Apple size={15} style={{ color: 'rgba(255,255,255,0.8)', margin: '0 4px' }} />
          <NavLink
            to="/"
            className={({ isActive }) => `menubar-item bold ${isActive ? 'active' : ''}`}
          >
            {profile?.name ?? 'Portfolio'}
          </NavLink>
          <NavLink to="/about"    className={({ isActive }) => `menubar-item ${isActive ? 'active' : ''}`}>About</NavLink>
          <NavLink to="/skills"   className={({ isActive }) => `menubar-item ${isActive ? 'active' : ''}`}>Toolkit</NavLink>
          <NavLink to="/projects" className={({ isActive }) => `menubar-item ${isActive ? 'active' : ''}`}>Work</NavLink>
          <NavLink to="/contact"  className={({ isActive }) => `menubar-item ${isActive ? 'active' : ''}`}>Contact</NavLink>
        </div>

        {/* Center label */}
        <div className="menubar-center" aria-hidden="true">
          <Cpu size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          Full Stack Developer
        </div>

        <div className="menubar-right">
          <Terminal size={13} className="menubar-item" style={{ opacity: 0.6 }} />
          <Search   size={13} className="menubar-item" style={{ opacity: 0.6 }} />
          <Wifi     size={13} className="menubar-item" style={{ opacity: 0.6 }} />
          <Battery  size={13} className="menubar-item" style={{ opacity: 0.6 }} />
          <span className="menubar-item" style={{ opacity: 0.75, fontSize: 12 }}>{date}</span>
          <span className="menubar-item" style={{ fontWeight: 600, fontSize: 12 }}>{time}</span>
        </div>
      </nav>

      {/* Bottom Dock */}
      <div className="dock-container" role="navigation" aria-label="Section navigation dock">
        <NavLink to="/"         onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="Home">
          <User size={22} />
        </NavLink>
        <NavLink to="/about"    onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="About">
          <Terminal size={22} />
        </NavLink>
        <NavLink to="/skills"   onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="Toolkit">
          <Hammer size={22} />
        </NavLink>
        <NavLink to="/projects" onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="Work">
          <FolderOpen size={22} />
        </NavLink>
        <NavLink to="/contact"  onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="Contact">
          <Mail size={22} />
        </NavLink>
      </div>
    </>
  );
}
