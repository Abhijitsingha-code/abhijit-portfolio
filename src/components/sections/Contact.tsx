import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ID } from 'appwrite';
import { databases, appwriteConfig } from '../../lib/appwrite';

export function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      if (!appwriteConfig.databaseId || !appwriteConfig.contactsCollectionId) {
        throw new Error("Missing Appwrite Contact configurations.");
      }
      await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.contactsCollectionId,
        ID.unique(),
        {
           name: formState.name,
           email: formState.email,
           message: formState.message
        }
      );
      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Failed to submit message:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '3rem', textAlign: 'center' }}
      >
        <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>Get in <span className="text-gradient-primary">Touch</span></h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem 0' }}
      >
        {submitStatus === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#10b981' }}>
              <Send size={32} />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Message Sent!</h3>
            <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button onClick={() => setSubmitStatus('idle')} className="btn btn-secondary" style={{ marginTop: '2rem' }}>Send Another</button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 500 }}>Name</label>
              <input 
                type="text" 
                id="name" 
                required 
                value={formState.name}
                onChange={(e) => setFormState({...formState, name: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', transition: 'border 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 500 }}>Email Address</label>
              <input 
                type="email" 
                id="email" 
                required 
                value={formState.email}
                onChange={(e) => setFormState({...formState, email: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', transition: 'border 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 500 }}>Message</label>
              <textarea 
                id="message" 
                required 
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', outline: 'none', resize: 'vertical', transition: 'border 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                placeholder="Tell me about your project..."
              />
            </div>
            {submitStatus === 'error' && (
              <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                Failed to send message. Please ensure your backend contact collection is configured properly.
              </div>
            )}
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
            >
              {isSubmitting ? (
                <><Loader2 size={20} className="animate-spin" /> Sending...</>
              ) : (
                <><Send size={20} /> Send Message</>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
