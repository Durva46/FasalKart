import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

/**
 * Animated Toast Notification (Bottom Right)
 */
export const Toast = () => {
  const { toastMessage, clearToast } = useShop();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 bg-stone-900/95 text-white dark:bg-stone-100 dark:text-stone-900 rounded-2xl shadow-2xl border border-stone-800 dark:border-stone-200 max-w-sm"
          >
            {toastMessage.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            )}
            {toastMessage.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            )}
            {toastMessage.type === 'info' && (
              <Info className="w-5 h-5 text-amber-400 flex-shrink-0" />
            )}

            <p className="text-sm font-medium flex-1 pr-2">
              {toastMessage.text}
            </p>

            <button
              onClick={clearToast}
              className="p-1 rounded-full hover:bg-stone-800 dark:hover:bg-stone-200 text-stone-400 dark:text-stone-600 transition"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
