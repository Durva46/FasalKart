import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Animated Modal with backdrop blur and smooth scale-in animation
 */
export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`relative w-full ${maxWidth} bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 my-8`}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
                <h3 className="text-lg font-bold font-heading text-charcoal dark:text-stone-100">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-stone-400 hover:text-charcoal dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 dark:bg-stone-800/80 backdrop-blur text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 shadow transition"
              >
                <X size={18} />
              </button>
            )}

            <div className="max-h-[85vh] overflow-y-auto no-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
