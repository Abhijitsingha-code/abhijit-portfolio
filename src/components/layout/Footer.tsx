import { Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--panel-border)', padding: '3rem 0', marginTop: '4rem', textAlign: 'center' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: 0.6 }}>
          <Layers size={16} />
          <p>Designed and built with React, Framer Motion, and Appwrite.</p>
        </div>
      </div>
    </footer>
  );
}
