import React from 'react';
import { Star } from 'lucide-react';

/**
 * Reusable RatingStars component displaying glowing golden stars with rating count
 */
export const RatingStars = ({ rating = 5, size = 'sm', showValue = true, reviewsCount = null }) => {
  const iconSize = size === 'sm' ? 14 : size === 'md' ? 18 : 22;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={iconSize}
            className={`${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-stone-200 text-stone-200 dark:fill-stone-700 dark:text-stone-700'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-charcoal-light dark:text-stone-300">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewsCount !== null && (
        <span className="text-xs text-stone-400 dark:text-stone-500">
          ({reviewsCount})
        </span>
      )}
    </div>
  );
};
