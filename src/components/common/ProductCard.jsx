import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, MapPin, Sparkles, Plus, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { RatingStars } from '../common/RatingStars';

/**
 * Premium ProductCard
 * Features:
 * - Image zoom & lift on hover
 * - Floating badges (Organic, Fresh Today, Discount)
 * - Quick "Add to Cart" button slide-up
 * - Pop-animation Wishlist heart
 * - Quick View modal trigger
 */
export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative bg-white dark:bg-stone-900 rounded-3xl p-4 sm:p-5 border border-stone-200/80 dark:border-stone-800 shadow-soft hover:shadow-soft-hover transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center"
      >
        {/* Image Container */}
        <div className="relative w-full sm:w-48 h-44 flex-shrink-0 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {product.isOrganic && (
            <span className="absolute top-2 left-2 bg-emerald-600/95 text-white text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm shadow flex items-center gap-1">
              <Sparkles size={11} /> Organic
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-primary-light" />
                {product.location}
              </span>
              <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
            </div>

            <Link to={`/product/${product.id}`} className="block group-hover:text-primary transition">
              <h3 className="text-lg font-bold font-heading text-charcoal dark:text-stone-100 mb-1">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2 mb-3">
              {product.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-primary dark:text-emerald-400 font-medium">
              <span>By {product.farmer.name}</span>
              <span>•</span>
              <span className="text-stone-400">{product.harvestDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-heading text-primary-dark dark:text-emerald-400">
                ₹{product.price}
              </span>
              <span className="text-xs text-stone-400">/{product.unit}</span>
              {product.originalPrice && (
                <span className="text-xs line-through text-stone-400">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlist}
                className={`p-2.5 rounded-full border transition ${
                  isWishlisted(product.id)
                    ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-400 hover:text-rose-500'
                }`}
              >
                <Heart size={16} className={isWishlisted(product.id) ? 'fill-rose-500' : ''} />
              </button>

              <button
                onClick={handleAddToCart}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-medium text-sm flex items-center gap-2 shadow-sm transition active:scale-95"
              >
                {isAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
                {isAdded ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-white dark:bg-stone-900 rounded-3xl p-3.5 sm:p-4 border border-stone-200/80 dark:border-stone-800 shadow-soft hover:shadow-soft-hover flex flex-col justify-between overflow-hidden"
    >
      {/* Top Media Section */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3">
        {/* Shimmer Placeholder before load */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800 animate-pulse" />
        )}

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-108 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isOrganic && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 backdrop-blur-sm">
              <Sparkles size={10} /> Organic
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-harvest text-charcoal-dark font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist & QuickView Overlay Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleWishlist}
            aria-label="Wishlist"
            className={`p-2 rounded-full backdrop-blur-md shadow-md transition ${
              isWishlisted(product.id)
                ? 'bg-rose-50 text-rose-500'
                : 'bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:text-rose-500'
            }`}
          >
            <Heart
              size={15}
              className={`transition-all ${isWishlisted(product.id) ? 'fill-rose-500 text-rose-500 scale-110' : ''}`}
            />
          </motion.button>

          <button
            onClick={handleQuickView}
            aria-label="Quick preview"
            className="p-2 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md shadow-md text-stone-600 dark:text-stone-300 hover:text-primary transition opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center"
          >
            <Eye size={15} />
          </button>
        </div>

        {/* Slide-up Add to Cart overlay bar on hover (Desktop) */}
        <div className="absolute inset-x-2 bottom-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-300 hidden sm:block z-10">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 shadow-lg transition ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-primary/95 hover:bg-primary text-white backdrop-blur-sm'
            }`}
          >
            {isAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
            {isAdded ? 'Added to Cart!' : `Quick Add (+₹${product.price})`}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 mb-1">
            <span className="flex items-center gap-1 truncate max-w-[55%]">
              <MapPin size={11} className="text-primary-light flex-shrink-0" />
              <span className="truncate">{product.location}</span>
            </span>
            <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block group-hover:text-primary transition">
            <h3 className="text-sm sm:text-base font-bold font-heading text-charcoal dark:text-stone-100 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Farmer tagline */}
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
            Grown by <span className="font-semibold text-primary dark:text-emerald-400">{product.farmer.name}</span>
          </p>
        </div>

        {/* Pricing & Mobile Add Button */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-heading text-primary-dark dark:text-emerald-400">
                ₹{product.price}
              </span>
              <span className="text-[11px] text-stone-400 font-medium">
                /{product.unit}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-[11px] line-through text-stone-400 block -mt-1">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Mobile button (or fallback when hover is not active) */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className={`p-2 rounded-xl sm:hidden flex items-center justify-center transition shadow-sm ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-primary-50 text-primary dark:bg-primary-950/60 dark:text-emerald-300'
            }`}
          >
            {isAdded ? <Check size={16} /> : <Plus size={16} />}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
