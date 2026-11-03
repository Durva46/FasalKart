import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  MapPin,
  CreditCard,
  Check,
  Truck,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Home
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Checkout = () => {
  const { cart, cartSubtotal, deliveryFee, clearCart } = useShop();

  // 3-step checkout flow: 1: Address, 2: Payment, 3: Review / Success
  const [step, setStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    phone: '9876543210',
    street: 'Flat 402, Green Meadows, MG Road',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    paymentMethod: 'upi',
    upiId: 'rahul@okhdfcbank',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const fakeId = `FSK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(fakeId);
    setOrderSuccess(true);
    clearCart();
  };

  const stepsList = [
    { number: 1, label: 'Delivery Address', icon: MapPin },
    { number: 2, label: 'Payment Method', icon: CreditCard },
    { number: 3, label: 'Review & Confirm', icon: ShieldCheck },
  ];

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        {/* Animated Order Placed Success Screen */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-12 border border-stone-200/80 dark:border-stone-800 shadow-2xl relative overflow-hidden"
        >
          {/* Confetti decoration circles */}
          <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-harvest animate-bounce" />
          <div className="absolute top-8 right-10 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="absolute bottom-6 left-12 w-4 h-4 rounded-full bg-rose-400 opacity-60" />

          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 size={48} />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400 mb-2 inline-block">
            Order Confirmed & Sent to Farmers
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-heading text-charcoal dark:text-stone-50 mb-3">
            Thank you, {formData.fullName.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mb-6 leading-relaxed">
            Your fresh harvest order has been assigned to the farmers. They will harvest tomorrow morning at sunrise and dispatch straight to your door.
          </p>

          <div className="p-4 rounded-2xl bg-cream dark:bg-stone-800 border border-stone-200 dark:border-stone-700 max-w-sm mx-auto mb-8 text-xs">
            <div className="flex justify-between py-1 text-stone-500 dark:text-stone-400">
              <span>Order Reference ID</span>
              <strong className="text-charcoal dark:text-stone-100">{orderId}</strong>
            </div>
            <div className="flex justify-between py-1 text-stone-500 dark:text-stone-400">
              <span>Delivery Address</span>
              <strong className="text-charcoal dark:text-stone-100">{formData.city}, {formData.pincode}</strong>
            </div>
            <div className="flex justify-between py-1 text-stone-500 dark:text-stone-400">
              <span>Payment Mode</span>
              <strong className="uppercase text-charcoal dark:text-stone-100">{formData.paymentMethod}</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/products"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary hover:bg-primary-light text-white font-bold text-xs sm:text-sm transition shadow-md"
            >
              Order More Produce
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 text-charcoal dark:text-stone-200 font-semibold text-xs sm:text-sm hover:bg-stone-50 dark:hover:bg-stone-800 transition"
            >
              Return to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-4xl font-black font-heading text-charcoal dark:text-stone-50">
          Checkout
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Complete your farm-direct order in 3 easy steps
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between max-w-2xl mb-10 relative">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-stone-200 dark:bg-stone-800 -z-10" />
        {stepsList.map((s) => {
          const Icon = s.icon;
          const isDone = step > s.number;
          const isCurrent = step === s.number;

          return (
            <div key={s.number} className="flex flex-col items-center bg-cream dark:bg-stone-950 px-2">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shadow-sm transition-all ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-primary text-white ring-4 ring-emerald-100 dark:ring-emerald-950'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                }`}
              >
                {isDone ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span className={`text-[11px] font-semibold mt-2 ${
                isCurrent ? 'text-primary font-bold' : 'text-stone-400'
              }`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step Forms */}
        <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-soft">
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100 mb-4">
                1. Delivery Location & Recipient
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-500 block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-500 block mb-1">Mobile Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-500 block mb-1">Street Address / Society</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-500 block mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-500 block mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-500 block mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow transition active:scale-95"
                >
                  Continue to Payment <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-5">
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100 mb-2">
                2. Select Dummy Payment Method
              </h3>
              <p className="text-xs text-stone-400 mb-4">
                Prototype mode: No real payment required. Select any option to test order flow.
              </p>

              <div className="space-y-3">
                {[
                  { id: 'upi', title: 'UPI (GPay / PhonePe / Paytm / BHIM)', desc: 'Instant 0% transaction fee' },
                  { id: 'card', title: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay accepted' },
                  { id: 'cod', title: 'Cash on Morning Delivery (COD)', desc: 'Inspect fresh crops at your door before paying' },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition ${
                      formData.paymentMethod === m.id
                        ? 'border-primary bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-primary'
                        : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={formData.paymentMethod === m.id}
                      onChange={handleChange}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <div className="font-heading font-bold text-sm text-charcoal dark:text-stone-100">
                        {m.title}
                      </div>
                      <div className="text-xs text-stone-400 mt-0.5">
                        {m.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {formData.paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800">
                  <label className="text-xs font-semibold text-stone-500 block mb-1">Enter Dummy UPI ID</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
                  />
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow transition active:scale-95"
                >
                  Review Order <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: REVIEW & CONFIRM */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100">
                3. Final Review & Farm Order Confirmation
              </h3>

              <div className="p-4 rounded-2xl bg-cream dark:bg-stone-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Delivering To</span>
                  <span className="font-bold text-charcoal dark:text-stone-100">
                    {formData.fullName} ({formData.phone})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Address</span>
                  <span className="text-charcoal dark:text-stone-200">
                    {formData.street}, {formData.city} - {formData.pincode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Payment Option</span>
                  <span className="font-bold uppercase text-primary">
                    {formData.paymentMethod}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Crops Being Harvested for You:
                </span>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-stone-100 dark:border-stone-800">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-bold text-charcoal dark:text-stone-100">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                >
                  Back to Payment
                </button>
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold text-sm shadow-xl transition active:scale-95 flex items-center gap-2"
                >
                  <Sparkles size={16} /> Place Farm Order (₹{cartSubtotal + deliveryFee})
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar Mini Summary */}
        <div className="lg:col-span-4 bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-soft h-fit space-y-4">
          <h4 className="font-heading font-bold text-sm text-charcoal dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800">
            Total Breakdown
          </h4>
          <div className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-charcoal dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-700">
              <span>Amount Due</span>
              <span className="text-primary-dark dark:text-emerald-400">₹{cartSubtotal + deliveryFee}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
