import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, MapPin, Sparkles, Check, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Modal } from './Modal';
import { RatingStars } from './RatingStars';

/**
 * Quick View Product Modal popup
 */
export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <Modal
      isOpen={Boolean(quickViewProduct)}
      onClose={() => setQuickViewProduct(null)}
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Product Media */}
        <div className="relative rounded-2xl overflow-hidden aspect-square bg-stone-100 dark:bg-stone-800">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
          {quickViewProduct.isOrganic && (
            <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
              <Sparkles size={12} /> 100% Organic
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-primary" /> {quickViewProduct.location}
              </span>
              <RatingStars rating={quickViewProduct.rating} reviewsCount={quickViewProduct.reviewsCount} />
            </div>

            <h2 className="text-xl font-bold font-heading text-charcoal dark:text-stone-100 mb-2">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-extrabold font-heading text-primary-dark dark:text-emerald-400">
                ₹{quickViewProduct.price}
              </span>
              <span className="text-sm text-stone-400 font-medium">/{quickViewProduct.unit}</span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm line-through text-stone-400">
                  ₹{quickViewProduct.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4">
              {quickViewProduct.description}
            </p>

            {/* Farmer Mini Badge */}
            <div className="p-3 rounded-2xl bg-cream/70 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700 flex items-center gap-3 mb-5">
              <img
                src={quickViewProduct.farmer.avatar}
                alt={quickViewProduct.farmer.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="text-xs">
                <div className="font-bold text-charcoal dark:text-stone-200">
                  {quickViewProduct.farmer.name}
                </div>
                <div className="text-stone-400 text-[11px]">
                  {quickViewProduct.farmer.farmName} • {quickViewProduct.harvestDate}
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Quantity Selector & Actions */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-charcoal dark:text-stone-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`p-2.5 rounded-xl border transition ${
                  isWishlisted(quickViewProduct.id)
                    ? 'bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/40 dark:border-rose-900'
                    : 'border-stone-200 dark:border-stone-700 text-stone-400 hover:text-rose-500'
                }`}
              >
                <Heart size={18} className={isWishlisted(quickViewProduct.id) ? 'fill-rose-500' : ''} />
              </button>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition active:scale-95"
              >
                {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                {added ? 'Added to Cart' : `Add for ₹${quickViewProduct.price * quantity}`}
              </button>
            </div>

            <Link
              to={`/product/${quickViewProduct.id}`}
              onClick={() => setQuickViewProduct(null)}
              className="text-xs font-semibold text-primary hover:text-primary-light flex items-center justify-center gap-1"
            >
              View Full Farm Details & Reviews <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
