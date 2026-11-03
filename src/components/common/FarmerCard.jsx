import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RatingStars } from '../common/RatingStars';

/**
 * FarmerCard highlighting verified badges, location, land size, and direct products
 */
export const FarmerCard = ({ farmer }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-soft hover:shadow-soft-hover flex flex-col justify-between"
    >
      <div>
        {/* Farm Cover Image */}
        <div className="relative h-28 w-full bg-stone-200 dark:bg-stone-800">
          <img
            src={farmer.coverImage}
            alt={farmer.farmName}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute top-2.5 right-2.5 bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={10} /> Verified Farmer
          </span>
        </div>

        {/* Farmer Info Body with Overlapping Avatar */}
        <div className="px-5 pt-0 pb-4 relative">
          <div className="flex justify-between items-end -mt-8 mb-3">
            <div className="relative">
              <img
                src={farmer.avatar}
                alt={farmer.name}
                className="w-16 h-16 rounded-2xl object-cover border-3 border-white dark:border-stone-900 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 bg-harvest text-charcoal font-black text-[9px] px-1.5 py-0.5 rounded-full shadow">
                ★ {farmer.rating}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-primary dark:text-emerald-400 block">
                {farmer.landSize}
              </span>
              <span className="text-[10px] text-stone-400">
                {farmer.experience}
              </span>
            </div>
          </div>

          <h3 className="text-base font-bold font-heading text-charcoal dark:text-stone-100">
            {farmer.name}
          </h3>
          <p className="text-xs text-primary-light dark:text-emerald-400 font-medium">
            {farmer.farmName}
          </p>

          <div className="flex items-center gap-1 text-[11px] text-stone-400 dark:text-stone-500 mt-1 mb-2.5">
            <MapPin size={11} className="text-stone-400" />
            <span>{farmer.location}</span>
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">
            "{farmer.bio}"
          </p>
        </div>
      </div>

      {/* Speciality Tag & Link */}
      <div className="px-5 py-3.5 bg-cream/70 dark:bg-stone-800/40 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
        <div className="truncate pr-2">
          <span className="text-[10px] uppercase font-bold text-stone-400 block">Speciality</span>
          <span className="text-xs font-medium text-charcoal dark:text-stone-200 truncate block">
            {farmer.speciality}
          </span>
        </div>
        <Link
          to={`/products?farmer=${encodeURIComponent(farmer.name)}`}
          className="flex-shrink-0 inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-light transition text-xs"
        >
          View Crops <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  );
};
