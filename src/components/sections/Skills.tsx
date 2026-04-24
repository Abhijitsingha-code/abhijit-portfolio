import * as LucideIcons from 'lucide-react';
import { Zap } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import type { SkillData } from '../../types';

interface SkillsProps {
  containerVariants: Variants;
  itemVariants: Variants;
  skills: SkillData[];
}

export function Skills({ containerVariants, itemVariants, skills }: SkillsProps) {
  return (
    <section id="skills" className="section container">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        style={{ maxWidth: '800px', margin: '0 auto' }}
      >
        <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '16px', color: 'var(--secondary)' }}>
            <Zap size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)' }}>Technical <span className="text-gradient-accent">Arsenal</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>The tools I use to bring ideas to life.</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {(skills.length > 0 ? skills : [
            { name: 'React', iconName: 'Boxes' },
            { name: 'TypeScript', iconName: 'Terminal' },
            { name: 'Appwrite', iconName: 'Database' },
            { name: 'Node.js', iconName: 'Server' },
            { name: 'Tailwind CSS', iconName: 'Layers' },
            { name: 'PostgreSQL', iconName: 'Database' },
            { name: 'Framer Motion', iconName: 'Sparkles' }
          ]).map((skill, index) => {
            const IconComponent = skill.iconName && (LucideIcons as any)[skill.iconName] 
              ? (LucideIcons as any)[skill.iconName] 
              : LucideIcons.Code;
            
            return (
              <motion.div 
                key={skill.name + index}
                whileHover={{ y: -5 }}
                className="skill-tag"
              >
                <IconComponent size={16} />
                {skill.name}
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
