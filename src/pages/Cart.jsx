import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  ShieldCheck,
  Truck,
  ArrowLeft
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartItemCount,
    deliveryFee,
    freeDeliveryThreshold,
    progressToFreeDelivery,
    showToast
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'FARM50' || code === 'FIRSTFARM' || code === 'ORGANIC') {
      const discount = Math.round(cartSubtotal * 0.15); // 15% discount
      setAppliedDiscount(discount);
      setCouponError('');
      showToast(`Coupon ${code} applied successfully! Saved ₹${discount}`);
    } else {
      setCouponError('Invalid coupon code. Try FARM50 or ORGANIC');
    }
  };

  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount + deliveryFee);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-primary flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag size={44} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black font-heading text-charcoal dark:text-stone-100 mb-2">
          Your produce cart is currently empty
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto mb-8">
          Support local farmers by adding seasonal produce like Devgad mangoes, crisp greens, or aromatic Sharbati wheat to your kitchen.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-lg shadow-primary/25 transition active:scale-95"
        >
          <span>Explore Fresh Harvest</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black font-heading text-charcoal dark:text-stone-50">
            Shopping Cart ({cartItemCount} Items)
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Directly sourced and freshly prepared for morning delivery
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-500 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Delivery Banner */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-5 border border-stone-200/80 dark:border-stone-800 shadow-soft">
            <div className="flex justify-between items-center text-xs font-semibold text-charcoal dark:text-stone-200 mb-2">
              {progressToFreeDelivery >= 100 ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                  <Sparkles size={14} /> Congratulations! You qualified for FREE Eco-Express Delivery
                </span>
              ) : (
                <span>
                  Add <strong className="text-primary font-bold">₹{freeDeliveryThreshold - cartSubtotal}</strong> more to unlock FREE Delivery
                </span>
              )}
              <span className="text-stone-400">{progressToFreeDelivery}%</span>
            </div>
            <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToFreeDelivery}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 to-primary rounded-full transition-all duration-300"
              />
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-3">
            {cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="bg-white dark:bg-stone-900 rounded-3xl p-4 sm:p-5 border border-stone-200/80 dark:border-stone-800 shadow-soft flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover flex-shrink-0"
                />

                <div className="flex-1 w-full text-left">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-heading font-bold text-base text-charcoal dark:text-stone-100">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Grown by {item.farmer.name} • {item.location}
                  </p>
                  <div className="text-xs font-semibold text-primary dark:text-emerald-400 mt-1">
                    ₹{item.price} / {item.unit}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:border-l sm:border-stone-100 sm:dark:border-stone-800 sm:pl-6">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-xl p-1 bg-stone-50 dark:bg-stone-800">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-charcoal dark:text-stone-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 text-xs font-bold"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <div className="font-heading font-extrabold text-base text-charcoal dark:text-stone-100">
                      ₹{item.price * item.quantity}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[11px] text-stone-400 hover:text-rose-500 transition flex items-center gap-1 justify-end mt-0.5"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary-light pt-2"
          >
            <ArrowLeft size={14} /> Continue Shopping Other Harvests
          </Link>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-soft space-y-6">
            <h2 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800">
              Order Summary
            </h2>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Discount Coupon
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. FARM50, ORGANIC"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs uppercase font-bold rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-charcoal dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-charcoal hover:bg-charcoal-dark dark:bg-stone-100 dark:text-charcoal text-white font-bold text-xs transition"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <span className="text-[11px] text-rose-500 block">{couponError}</span>
              )}
              {appliedDiscount > 0 && (
                <span className="text-[11px] text-emerald-600 font-semibold block">
                  ✓ Special 15% farmer coupon discount applied!
                </span>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-stone-500 dark:text-stone-400 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex justify-between">
                <span>Produce Total</span>
                <span className="font-semibold text-charcoal dark:text-stone-200">₹{cartSubtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Savings</span>
                  <span>-₹{appliedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Eco-Temperature Delivery</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-stone-200 dark:border-stone-700 text-base font-bold text-charcoal dark:text-stone-100 font-heading">
                <span>Total Due</span>
                <span className="text-primary-dark dark:text-emerald-400">₹{finalTotal}</span>
              </div>
            </div>

            {/* Proceed to checkout button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div className="pt-2 text-[11px] text-stone-400 space-y-1.5 text-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                <ShieldCheck size={14} /> Direct Payout to Farmers Guaranteed
              </div>
              <div>Safe packaging • 100% money-back freshness guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
