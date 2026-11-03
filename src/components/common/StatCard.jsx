import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated StatCard with icon, gradient accent, and responsive layout
 */
export const StatCard = ({ icon: Icon, value, label, subtitle, color = 'emerald' }) => {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900',
    amber: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-100 dark:border-amber-900',
    green: 'bg-green-50 text-green-700 dark:bg-green-950/60 dark:text-green-300 border-green-100 dark:border-green-900',
    blue: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-100 dark:border-sky-900',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 shadow-soft relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-2xl border ${colorMap[color] || colorMap.emerald}`}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
      </div>
      <div className="text-3xl font-bold font-heading text-charcoal dark:text-stone-100 mb-1">
        {value}
      </div>
      <div className="text-sm font-semibold text-charcoal-light dark:text-stone-300">
        {label}
      </div>
      {subtitle && (
        <div className="text-xs text-stone-400 dark:text-stone-500 mt-1">
          {subtitle}
        </div>
      )}
    </motion.div>
  );
};
