import { User, Hammer, FolderOpen, Mail, Terminal, Apple, Search, Wifi, Battery } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ProfileData } from '../../types';

export function Navbar({ profile, onDockClick }: { profile: ProfileData | null, onDockClick?: () => void }) {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Top Menu Bar */}
      <nav className="menubar">
        <div className="menubar-left">
          <Apple size={14} className="menubar-item" />
          <NavLink to="/" className={({ isActive }) => `menubar-item bold ${isActive ? 'active' : ''}`}>Portfolio</NavLink>
          <NavLink to="/about" className={({ isActive }) => `menubar-item ${isActive ? 'active' : ''}`}>About</NavLink>
          <NavLink to="/skills" className={({ isActive }) => `menubar-item ${isActive ? 'active' : ''}`}>Toolkit</NavLink>
          <NavLink to="/projects" className={({ isActive }) => `menubar-item ${isActive ? 'active' : ''}`}>Work</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `menubar-item ${isActive ? 'active' : ''}`}>Contact</NavLink>
        </div>
        <div className="menubar-right">
          <Terminal size={14} className="menubar-item" />
          <Search size={14} className="menubar-item" />
          <Wifi size={14} className="menubar-item" />
          <Battery size={14} className="menubar-item" />
          <span className="menubar-item">{time}</span>
        </div>
      </nav>

      {/* Bottom Dock */}
      <div className="dock-container">
        <NavLink to="/" onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="Home">
          <User size={24} />
        </NavLink>
        <NavLink to="/about" onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="About">
          <Terminal size={24} />
        </NavLink>
        <NavLink to="/skills" onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="Toolkit">
          <Hammer size={24} />
        </NavLink>
        <NavLink to="/projects" onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="Work">
          <FolderOpen size={24} />
        </NavLink>
        <NavLink to="/contact" onClick={onDockClick} className={({ isActive }) => `dock-item ${isActive ? 'active' : ''}`} title="Contact">
          <Mail size={24} />
        </NavLink>
      </div>
    </>
  );
}
