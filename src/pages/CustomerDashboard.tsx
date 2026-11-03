import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Heart,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/common/ProductCard';
import { Link } from 'react-router-dom';

export const CustomerDashboard: React.FC = () => {
  const { orders, wishlist, addresses, customerProfile, setCustomerProfile, showToast } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'tracking' | 'wishlist' | 'addresses' | 'profile'>('orders');
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Top Banner Profile Summary */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={customerProfile.avatar}
            alt={customerProfile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/80 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-heading">
                {customerProfile.name}
              </h1>
              <span className="bg-emerald-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={11} /> Conscious Buyer
              </span>
            </div>
            <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
              {customerProfile.email} • {customerProfile.phone}
            </p>
            <div className="text-xs text-harvest font-semibold mt-1">
              Member since {customerProfile.memberSince} • Supporting Indian organic farmers
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20">
            <div className="text-2xl font-black font-heading text-white">{orders.length}</div>
            <div className="text-[11px] text-emerald-200 uppercase tracking-wider">Orders Placed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20">
            <div className="text-2xl font-black font-heading text-white">{wishlist.length}</div>
            <div className="text-[11px] text-emerald-200 uppercase tracking-wider">Wishlisted</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-stone-200 dark:border-stone-800 pb-2">
        {[
          { id: 'orders', label: 'Order History', count: orders.length, icon: Package },
          { id: 'tracking', label: 'Live Order Tracking', icon: Truck },
          { id: 'wishlist', label: 'My Saved Produce', count: wishlist.length, icon: Heart },
          { id: 'addresses', label: 'Saved Addresses', count: addresses.length, icon: MapPin },
          { id: 'profile', label: 'Profile Settings', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-800'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: ORDER HISTORY ================= */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200/80 dark:border-stone-800">
              <ShoppingBag size={40} className="mx-auto text-stone-300 mb-3" />
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100 mb-1">
                No orders placed yet
              </h3>
              <p className="text-xs text-stone-400 mb-6">
                Your fresh morning harvest orders will appear here with live tracking.
              </p>
              <Link
                to="/products"
                className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow transition"
              >
                Browse Marketplace
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-soft space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                      Order ID: {order.id}
                    </span>
                    <div className="text-xs text-stone-400">Placed on {order.createdAt}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60">
                      {order.status}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setActiveTab('tracking');
                      }}
                      className="px-4 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-100 text-charcoal dark:text-stone-200 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Truck size={13} /> Track
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-xs">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <div className="font-bold text-charcoal dark:text-stone-100">{item.name}</div>
                          <div className="text-stone-400">
                            {item.quantity} × ₹{item.price} ({item.unit})
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-cream/70 dark:bg-stone-800/40 text-xs space-y-1.5">
                    <div className="flex justify-between text-stone-500">
                      <span>Delivery Address:</span>
                      <strong className="text-charcoal dark:text-stone-100 text-right">{order.address}, {order.city}</strong>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Payment Method:</span>
                      <strong className="text-charcoal dark:text-stone-100">{order.paymentMethod}</strong>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200 dark:border-stone-700 font-bold text-sm text-charcoal dark:text-stone-100">
                      <span>Total Paid:</span>
                      <span className="text-primary dark:text-emerald-400">₹{order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ================= TAB 2: LIVE ORDER TRACKING ================= */}
      {activeTab === 'tracking' && selectedOrder && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-soft space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div>
              <span className="text-xs font-bold text-primary dark:text-emerald-400 uppercase tracking-wider">
                Live Farm Dispatch Tracking
              </span>
              <h2 className="text-xl font-bold font-heading text-charcoal dark:text-stone-100">
                Tracking Order #{selectedOrder.id}
              </h2>
            </div>
            <span className="text-xs text-stone-400">
              Estimated: <strong>{selectedOrder.estimatedDelivery}</strong>
            </span>
          </div>

          {/* 4-Step Animated Tracking Bar */}
          <div className="relative max-w-3xl mx-auto py-6">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1.5 bg-stone-100 dark:bg-stone-800 -z-0" />
            <div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-1.5 bg-primary transition-all duration-500 -z-0"
              style={{ width: `${((selectedOrder.trackingStep - 1) / 3) * 100}%` }}
            />

            <div className="flex items-center justify-between relative z-10">
              {[
                { step: 1, title: 'Order Placed', desc: 'Received by farmer' },
                { step: 2, title: 'Confirmed', desc: 'Harvest scheduled' },
                { step: 3, title: 'Packed & Cold Chilled', desc: 'Transit to city hub' },
                { step: 4, title: 'Delivered', desc: 'At your doorstep' },
              ].map((s) => {
                const isPassed = selectedOrder.trackingStep >= s.step;
                return (
                  <div key={s.step} className="flex flex-col items-center text-center bg-white dark:bg-stone-900 px-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition ${
                        isPassed
                          ? 'bg-primary text-white shadow-md shadow-primary/20'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 size={16} /> : s.step}
                    </div>
                    <span className="text-xs font-bold text-charcoal dark:text-stone-200 mt-2">
                      {s.title}
                    </span>
                    <span className="text-[10px] text-stone-400 hidden sm:block">
                      {s.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
            <Truck size={20} className="text-primary flex-shrink-0" />
            <span>
              <strong>Produce Dispatch Status:</strong> Harvested freshly at 5:00 AM from Nashik & Ratnagiri fields. Eco-temperature vehicle is en route to <strong>{selectedOrder.city}</strong>.
            </span>
          </div>
        </div>
      )}

      {/* ================= TAB 3: WISHLIST ================= */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlist.length === 0 ? (
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200/80 dark:border-stone-800">
              <Heart size={40} className="mx-auto text-stone-300 mb-3" />
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100 mb-1">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-stone-400 mb-6">
                Click the heart icon on any crop to save seasonal items for later.
              </p>
              <Link
                to="/products"
                className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow transition"
              >
                Browse Seasonal Produce
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {wishlist.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: SAVED ADDRESSES ================= */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-heading font-bold text-sm text-charcoal dark:text-stone-100">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold text-primary bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                      Default Delivery
                    </span>
                  )}
                </div>
                <div className="text-xs text-charcoal dark:text-stone-200 font-semibold">{addr.fullName}</div>
                <div className="text-xs text-stone-400 mt-1 leading-relaxed">
                  {addr.street}, {addr.city} - {addr.pincode}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800 mt-4 text-xs font-semibold text-primary">
                <button onClick={() => showToast('Address set as default!')}>Set as Primary</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= TAB 5: PROFILE SETTINGS ================= */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-soft max-w-xl">
          <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100 mb-4">
            Customer Profile Information
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Profile information saved successfully!');
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">Full Name</label>
              <input
                type="text"
                value={customerProfile.name}
                onChange={(e) => setCustomerProfile({ ...customerProfile, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">Email Address</label>
              <input
                type="email"
                value={customerProfile.email}
                onChange={(e) => setCustomerProfile({ ...customerProfile, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">Mobile Phone</label>
              <input
                type="text"
                value={customerProfile.phone}
                onChange={(e) => setCustomerProfile({ ...customerProfile, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs shadow transition"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
