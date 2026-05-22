import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BootLoaderProps {
  isComplete: boolean;
  isError: boolean;
  onRetry: () => void;
}

export function BootLoader({ isComplete, isError, onRetry }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [showError, setShowError] = useState(false);

  // Simulate booting progress
  useEffect(() => {
    if (isError) {
      // Small delay to make error screen transition feel more natural
      const timer = setTimeout(() => {
        setShowError(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (isComplete) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) {
          return prev + Math.random() * 12 + 6; // quick initial load
        } else if (prev < 75) {
          return prev + Math.random() * 4 + 1.5; // steady booting
        } else if (prev < 88) {
          return prev + Math.random() * 0.8 + 0.1; // slow down towards end
        }
        return prev;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isComplete, isError]);

  return (
    <motion.div
      initial={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(30px)',
        scale: 1.06,
        transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {showError ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          {/* Flashing Folder Icon */}
          <div className="mac-blink-animation" style={{ display: 'flex', justifyContent: 'center' }}>
            <svg viewBox="0 0 100 100" width="90" height="90" fill="none" stroke="#dcdcdc" strokeWidth="2.5">
              {/* Folder tab and main body */}
              <path d="M12 28 C 12 24, 16 22, 20 22 L 38 22 C 41 22, 44 24, 46 27 L 52 35 L 82 35 C 86 35, 88 38, 88 42 L 88 74 C 88 78, 86 80, 82 80 L 18 80 C 14 80, 12 78, 12 74 Z" strokeLinejoin="round" />
              {/* Monospace Question Mark in the center */}
              <text x="50" y="62" fill="#dcdcdc" fontSize="28" fontFamily="monospace" fontWeight="bold" textAnchor="middle">?</text>
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#f3f4f6', letterSpacing: '-0.01em' }}>
              Connection Failure
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#9ca3af', lineHeight: 1.5 }}>
              A database connection error occurred during startup. Please check your internet connection and try again.
            </p>
          </div>

          <button
            onClick={onRetry}
            style={{
              marginTop: '0.5rem',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#f3f4f6',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '8px 20px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(8px)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            }}
          >
            Retry Connection
          </button>
          
          <span style={{ fontSize: '0.72rem', color: '#4b5563', marginTop: '1rem', letterSpacing: '0.02em' }}>
            support.sanity.io/connection-failure
          </span>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4.5rem', // 72px space between logo and progress bar
          }}
        >
          {/* Apple Logo SVG */}
          <svg viewBox="0 0 24 24" width="64" height="64" fill="#ffffff">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94 1.07.08 2.15-.52 2.81-1.33z" />
          </svg>

          {/* Minimalist Progress Bar */}
          <div
            style={{
              width: '200px',
              height: '4px',
              background: '#2c2c2e', // Sleek dark gray background
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: '#ffffff', // Pristine white progress fill
                width: 0,
              }}
              animate={{ width: `${progress}%` }}
              transition={{
                ease: isComplete ? 'easeOut' : 'easeInOut',
                duration: isComplete ? 0.35 : 0.2,
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
