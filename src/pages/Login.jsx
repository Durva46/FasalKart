import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Login = () => {
  const { userRole, setUserRole, showToast } = useShop();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState(userRole || 'buyer'); // 'buyer' or 'farmer'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserRole(role);
    showToast(`Welcome to FasalKart as a ${role === 'farmer' ? 'Farmer Producer' : 'Direct Buyer'}!`);
    if (role === 'farmer') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-800 shadow-2xl grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Split-screen High Quality Image & Testimonial */}
        <div className="relative hidden md:block bg-stone-900 text-white p-10 overflow-hidden">
          <img
            src={
              role === 'farmer'
                ? 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80'
                : 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80'
            }
            alt="FasalKart Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />

          <div className="relative z-10 h-full flex flex-col justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white">
                <Sprout size={22} className="text-harvest" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Fasal<span className="text-harvest">Kart</span>
              </span>
            </Link>

            <div className="space-y-3">
              <span className="px-3 py-1 rounded-full bg-harvest/20 text-harvest border border-harvest/30 text-xs font-bold inline-block">
                {role === 'farmer' ? 'Empowering 10,000+ Farmers' : 'Farm Purity Guaranteed'}
              </span>
              <h2 className="text-2xl font-bold font-heading text-white leading-tight">
                {role === 'farmer'
                  ? 'Sell directly to consumers without losing 40% margin to mandi brokers.'
                  : 'Taste produce harvested the same morning with 100% natural organic vitality.'}
              </h2>
              <p className="text-xs text-stone-300">
                {role === 'farmer'
                  ? 'Get transparent next-day bank transfers and direct family appreciation.'
                  : 'Zero chemical sprays, zero cold-storage holding, 100% verified farmer roots.'}
              </p>
            </div>

            <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>Certified Agri-Tech Network • India</span>
            </div>
          </div>
        </div>

        {/* Right Side: Role Toggle & Auth Form */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl font-black font-heading text-charcoal dark:text-stone-50 mb-1">
              {isSignUp ? 'Create an Account' : 'Welcome to FasalKart'}
            </h1>
            <p className="text-xs text-stone-400">
              Select your persona below to customize your experience.
            </p>
          </div>

          {/* Buyer / Farmer Role Toggle Switch */}
          <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                role === 'buyer'
                  ? 'bg-white dark:bg-stone-900 text-primary dark:text-emerald-400 shadow-sm'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              I am a Buyer / Family
            </button>
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                role === 'farmer'
                  ? 'bg-white dark:bg-stone-900 text-primary dark:text-emerald-400 shadow-sm'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              I am a Farmer / Producer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-xs font-semibold text-stone-500 block mb-1">
                  Full Name / Farm Cooperative
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={role === 'farmer' ? 'Patil Agro Orchards' : 'Anjali Sharma'}
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">
                Email Address or Mobile Number
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh.patil@farmmail.in"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition active:scale-95"
            >
              <span>{isSignUp ? 'Create Account' : `Sign In as ${role === 'farmer' ? 'Farmer' : 'Buyer'}`}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-semibold text-primary hover:underline"
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "New to FasalKart? Create an account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
