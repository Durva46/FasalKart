import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

/**
 * Slide-in Cart Drawer from the right with interactive quantity controls and progress bar
 */
export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartItemCount,
    deliveryFee,
    freeDeliveryThreshold,
    progressToFreeDelivery,
  } = useShop();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col z-10 border-l border-stone-200 dark:border-stone-800"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-primary dark:bg-emerald-950/60 dark:text-emerald-300 rounded-xl">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100">
                    Your Fresh Cart
                  </h3>
                  <p className="text-xs text-stone-400">
                    {cartItemCount} items selected directly from farms
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Delivery Progress Bar */}
            <div className="px-5 py-3 bg-cream dark:bg-stone-800/40 border-b border-stone-100 dark:border-stone-800">
              <div className="flex justify-between text-xs font-medium mb-1.5 text-charcoal dark:text-stone-200">
                {progressToFreeDelivery >= 100 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <Sparkles size={13} /> You unlocked FREE Eco-Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-primary font-bold">₹{freeDeliveryThreshold - cartSubtotal}</strong> more for Free Delivery
                  </span>
                )}
                <span className="text-stone-400 font-bold">{progressToFreeDelivery}%</span>
              </div>
              <div className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToFreeDelivery}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-primary rounded-full"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-primary-light mb-4">
                    <ShoppingBag size={36} />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100 mb-1">
                    Your cart is completely empty
                  </h4>
                  <p className="text-xs text-stone-400 max-w-xs mb-6">
                    Fresh morning harvests like Nashik onions and Devgad Alphonso are waiting for you!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-medium text-xs shadow-md transition"
                  >
                    Start Exploring Crops
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-3.5 p-3 rounded-2xl border border-stone-100 dark:border-stone-800 hover:border-emerald-200 dark:hover:border-stone-700 transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-xs text-charcoal dark:text-stone-100 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        ₹{item.price} / {item.unit}
                      </p>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        Farmer: {item.farmer.name}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center rounded hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold font-heading text-primary-dark dark:text-emerald-400">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-300 hover:text-rose-500 transition"
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-stone-100 dark:border-stone-800 bg-cream/50 dark:bg-stone-900">
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between text-stone-500 dark:text-stone-400">
                    <span>Produce Subtotal</span>
                    <span>₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-500 dark:text-stone-400">
                    <span>Farm-Direct Handling & Delivery</span>
                    <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-base text-charcoal dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-700">
                    <span>Total Amount</span>
                    <span className="text-primary-dark dark:text-emerald-400">₹{cartSubtotal + deliveryFee}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-center font-semibold text-xs text-charcoal dark:text-stone-200 hover:bg-white dark:hover:bg-stone-800 transition"
                  >
                    View Full Cart
                  </Link>

                  <Link
                    to="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-primary hover:bg-primary-light text-white text-center font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition active:scale-95"
                  >
                    Checkout <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="mt-3 flex items-center justify-center gap-1 text-[11px] text-stone-400">
                  <ShieldCheck size={13} className="text-emerald-600" />
                  <span>100% Guaranteed Purity & Freshness</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
