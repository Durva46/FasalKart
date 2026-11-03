import React from 'react';

/**
 * Shimmering skeleton loader for card placeholders
 */
export const SkeletonLoader = ({ type = 'product' }) => {
  if (type === 'product') {
    return (
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-4 border border-stone-100 dark:border-stone-800 animate-pulse">
        <div className="w-full aspect-[4/3] bg-stone-200 dark:bg-stone-800 rounded-2xl mb-4" />
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3 mb-2" />
        <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-3/4 mb-3" />
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-1/4" />
          <div className="h-9 bg-stone-200 dark:bg-stone-800 rounded-xl w-1/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-32 bg-stone-200 dark:bg-stone-800 rounded-2xl animate-pulse" />
  );
};
