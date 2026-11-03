import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Heart, Send, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 md:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Signup Banner */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-harvest font-bold text-xs uppercase tracking-wider block mb-2">
              Fresh Harvest Alerts
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white mb-3 leading-tight">
              Get notified the moment fresh crops are harvested near you.
            </h3>
            <p className="text-white/80 text-sm mb-6 max-w-lg">
              Join 40,000+ conscious households receiving weekly seasonal harvest lists directly from local farmer cooperatives.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-5 py-3.5 rounded-2xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-harvest backdrop-blur-sm text-sm flex-1"
              />
              <button
                type="submit"
                className="px-7 py-3.5 rounded-2xl bg-harvest hover:bg-harvest-dark text-charcoal font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 size={16} /> Subscribed!
                  </>
                ) : (
                  <>
                    <Send size={16} /> Subscribe
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Decorative background glow */}
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Multi-column Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white">
                <Sprout size={22} className="text-harvest" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Fasal<span className="text-harvest">Kart</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm mb-6">
              India's first direct farm-to-door fresh produce ecosystem. Empowering local farmers with fair pricing and giving city families pure, unadulterated harvests within 24 hours.
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-400">
              <MapPin size={14} className="text-harvest" />
              <span>Registered Agro Hub, Maharashtra & Karnataka, India</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4 uppercase tracking-wider">
              Crops & Produce
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/products?category=vegetables" className="hover:text-emerald-400 transition">
                  Nashik Onions & Farm Veggies
                </Link>
              </li>
              <li>
                <Link to="/products?category=fruits" className="hover:text-emerald-400 transition">
                  Devgad Alphonso Mangoes
                </Link>
              </li>
              <li>
                <Link to="/products?category=grains" className="hover:text-emerald-400 transition">
                  Sehore Sharbati Wheat
                </Link>
              </li>
              <li>
                <Link to="/products?category=spices" className="hover:text-emerald-400 transition">
                  Pure Lakadong Turmeric
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-emerald-400 transition">
                  100% Certified Organic
                </Link>
              </li>
            </ul>
          </div>

          {/* For Farmers */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4 uppercase tracking-wider">
              Farmer Community
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/dashboard" className="hover:text-emerald-400 transition">
                  Farmer Portal & Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition">
                  List Your Harvest
                </Link>
              </li>
              <li>
                <span className="text-stone-500">Zero Middleman Policy</span>
              </li>
              <li>
                <span className="text-stone-500">Fair Price Guarantee</span>
              </li>
              <li>
                <span className="text-stone-500">Soil Quality Testing</span>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4 uppercase tracking-wider">
              Trust & Support
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">About FasalKart</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">Cold Chain Logistics</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">Refund & Freshness Guarantee</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">Privacy & Security</span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition cursor-pointer">Contact Support (Toll Free)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div>
            © {new Date().getFullYear()} FasalKart Agro Direct Ltd. Built with pride for Indian Farmers.
          </div>
          <div className="flex items-center gap-1">
            Made with <Heart size={13} className="text-rose-500 fill-rose-500" /> for Organic India
          </div>
        </div>
      </div>
    </footer>
  );
};
