import * as LucideIcons from 'lucide-react';
import { Zap } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import type { SkillData } from '../../types';

interface SkillsProps {
  containerVariants: Variants;
  itemVariants: Variants;
  skills: SkillData[];
}

const DEFAULT_SKILLS = [
  { name: 'React',           iconName: 'Boxes',     category: 'Frontend', color: '#61dafb' },
  { name: 'TypeScript',      iconName: 'Terminal',  category: 'Frontend', color: '#3178c6' },
  { name: 'Tailwind CSS',    iconName: 'Layers',    category: 'Frontend', color: '#38bdf8' },
  { name: 'Framer Motion',   iconName: 'Sparkles',  category: 'Frontend', color: '#e879f9' },
  { name: 'Node.js',         iconName: 'Server',    category: 'Backend',  color: '#5fa04e' },
  { name: 'PostgreSQL',      iconName: 'Database',  category: 'Backend',  color: '#336791' },
  { name: 'Appwrite',        iconName: 'Shield',    category: 'Backend',  color: '#f02e65' },
  { name: 'REST APIs',       iconName: 'Globe',     category: 'Backend',  color: '#60a5fa' },
  { name: 'Git & GitHub',    iconName: 'GitBranch', category: 'Tools',    color: '#f97316' },
  { name: 'VS Code',         iconName: 'Code',      category: 'Tools',    color: '#0078d4' },
  { name: 'Figma',           iconName: 'Pen',       category: 'Tools',    color: '#ff7262' },
  { name: 'React Native',    iconName: 'Smartphone',category: 'Mobile',   color: '#61dafb' },
];

const CATEGORY_META: Record<string, { label: string; color: string; bg: string }> = {
  Frontend: { label: 'Frontend',      color: '#60a5fa', bg: 'rgba(96, 165, 250, 0.08)' },
  Backend:  { label: 'Backend',       color: '#34d399', bg: 'rgba(52, 211, 153, 0.08)' },
  Tools:    { label: 'Dev Tools',     color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
  Mobile:   { label: 'Mobile',        color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.08)' },
};

export function Skills({ containerVariants, itemVariants, skills }: SkillsProps) {
  const displaySkills = skills.length > 0 ? skills : DEFAULT_SKILLS;

  // Group by category
  const categories = Array.from(new Set(displaySkills.map((s: any) => s.category ?? 'Other')));

  return (
    <section id="skills" className="section container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        style={{ maxWidth: '820px', margin: '0 auto' }}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
          <div className="section-eyebrow">Toolkit</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.2rem' }}>
            <div
              style={{
                padding: '1rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '16px',
                color: 'var(--secondary)',
                flexShrink: 0,
                marginTop: '0.2rem',
              }}
            >
              <Zap size={30} />
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-display)', marginBottom: '0.4rem' }}>
                Technical <span className="text-gradient-accent">Arsenal</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                The technologies and tools I use to bring ideas to life.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Skills grouped by category */}
        {skills.length > 0 ? (
          // Flat list when data comes from DB (no category grouping)
          <motion.div variants={itemVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {displaySkills.map((skill, index) => {
              const IconComponent =
                skill.iconName && (LucideIcons as any)[skill.iconName]
                  ? (LucideIcons as any)[skill.iconName]
                  : LucideIcons.Code;
              return (
                <motion.div
                  key={skill.name + index}
                  whileHover={{ y: -4, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="skill-tag"
                >
                  <IconComponent size={15} />
                  {skill.name}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          // Grouped view for default skills
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {categories.map((cat) => {
              const catSkills = DEFAULT_SKILLS.filter((s) => (s as any).category === cat);
              const meta = CATEGORY_META[cat] ?? { label: cat, color: 'var(--text-muted)', bg: 'rgba(255,255,255,0.04)' };
              return (
                <motion.div key={cat} variants={itemVariants}>
                  {/* Category label */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: meta.bg,
                      border: `1px solid ${meta.color}25`,
                      borderRadius: '100px',
                      padding: '4px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: meta.color,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                    }}
                  >
                    {meta.label}
                  </div>
                  {/* Skills row */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                    {catSkills.map((skill, index) => {
                      const IconComponent =
                        (LucideIcons as any)[skill.iconName] ?? LucideIcons.Code;
                      return (
                        <motion.div
                          key={skill.name + index}
                          whileHover={{ y: -4, scale: 1.04 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className="skill-tag"
                          style={{ borderColor: `${skill.color}22` }}
                        >
                          <IconComponent size={15} style={{ color: skill.color }} />
                          {skill.name}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
}
