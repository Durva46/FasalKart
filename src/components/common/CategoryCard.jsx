import React from 'react';
import { motion } from 'framer-motion';
import { Carrot, Apple, Wheat, Flame, Sparkles } from 'lucide-react';

/**
 * CategoryCard with vibrant icon, subtle glow and active indicator
 */
export const CategoryCard = ({ category, isSelected = false, onClick }) => {
  const iconComponents = {
    Sparkles: Sparkles,
    Carrot: Carrot,
    Apple: Apple,
    Wheat: Wheat,
    Flame: Flame,
  };

  const Icon = iconComponents[category.icon] || Sparkles;

  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`group flex items-center gap-3.5 px-5 py-3.5 rounded-2xl border transition-all duration-200 text-left whitespace-nowrap min-w-max shadow-sm ${
        isSelected
          ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
          : 'bg-white dark:bg-stone-900 text-charcoal dark:text-stone-200 border-stone-200/80 dark:border-stone-800 hover:border-primary-light/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
          isSelected
            ? 'bg-white/20 text-white'
            : 'bg-emerald-50 text-primary-light dark:bg-emerald-950/60 dark:text-emerald-300 group-hover:bg-primary group-hover:text-white'
        }`}
      >
        <Icon size={20} />
      </div>

      <div>
        <div className="font-heading font-bold text-sm tracking-tight">
          {category.name}
        </div>
        <div
          className={`text-[11px] ${
            isSelected ? 'text-emerald-100' : 'text-stone-400 dark:text-stone-500'
          }`}
        >
          {category.count} items available
        </div>
      </div>
    </motion.button>
  );
};
