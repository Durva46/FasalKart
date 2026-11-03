import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable SectionHeader with clean tag pill, bold title, subtitle, and optional right action
 */
export const SectionHeader = ({
  badge,
  title,
  subtitle,
  action,
  align = 'left'
}) => {
  return (
    <div className={`mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 ${
      align === 'center' ? 'text-center md:items-center' : ''
    }`}>
      <div className={align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}>
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-primary-dark dark:bg-emerald-950/70 dark:text-emerald-300 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {badge}
          </motion.div>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-charcoal dark:text-stone-100">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-charcoal-light dark:text-stone-400">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex-shrink-0 self-start md:self-auto">
          {action}
        </div>
      )}
    </div>
  );
};
