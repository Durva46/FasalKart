import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Heart,
  MapPin,
  Menu,
  X,
  Moon,
  Sun,
  Globe,
  Sprout,
  User,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS } from '../../data/dummyData';

export const Navbar = () => {
  const {
    cartItemCount,
    wishlist,
    setIsCartOpen,
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    userLocation,
    setUserLocation,
    userRole
  } = useShop();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  const navigate = useNavigate();

  // Scroll detection for glassy effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = PRODUCTS.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q) ||
             p.farmer.name.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const LOCATIONS = [
    'Mumbai, Maharashtra',
    'Pune, Maharashtra',
    'Nashik, Maharashtra',
    'Bengaluru, Karnataka',
    'Hyderabad, Telangana',
    'New Delhi, NCR',
    'Chandigarh, Punjab',
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-stone-900/90 backdrop-blur-md shadow-sm border-b border-stone-200/60 dark:border-stone-800'
            : 'bg-cream dark:bg-stone-950 border-b border-stone-200/40 dark:border-stone-800'
        }`}
      >
        {/* Top Mini Bar for Delivery & Language */}
        <div className="bg-primary-dark text-white/90 text-[11px] py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Sprout size={13} className="text-harvest" />
                <strong>100% Direct Farm Connect:</strong> No middleman commission, pure fair pay.
              </span>
              <span className="text-white/40">•</span>
              <span className="text-emerald-200">Express Delivery in 24 hrs</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Location Selector */}
              <button
                onClick={() => setShowLocationModal(true)}
                className="flex items-center gap-1 hover:text-harvest transition"
              >
                <MapPin size={12} className="text-harvest" />
                <span>Deliver to: <strong>{userLocation}</strong></span>
                <ChevronDown size={11} />
              </button>

              <span className="text-white/40">|</span>

              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1 font-semibold hover:text-harvest transition"
              >
                <Globe size={12} />
                <span>{language === 'en' ? 'हिन्दी (HI)' : 'English (EN)'}</span>
              </button>

              <span className="text-white/40">|</span>

              {/* Farmer Mode quick switch */}
              <Link
                to="/dashboard"
                className="hover:text-harvest transition font-medium text-emerald-200"
              >
                Farmer Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
                <Sprout size={22} className="text-harvest" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl md:text-2xl tracking-tight text-primary-dark dark:text-emerald-400">
                  Fasal<span className="text-harvest">Kart</span>
                </span>
                <span className="text-[9px] uppercase tracking-wider font-bold text-stone-400 -mt-1 hidden sm:block">
                  Farm To Fork Direct
                </span>
              </div>
            </Link>

            {/* Desktop Search Bar with Live Suggestions */}
            <div className="relative flex-1 max-w-lg hidden lg:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search fresh onions, devgad mango, wheat, turmeric..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 1 && setShowSearchResults(true)}
                  className="w-full pl-11 pr-10 py-2.5 text-xs sm:text-sm rounded-full bg-white dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary text-charcoal dark:text-stone-100 placeholder-stone-400 shadow-inner"
                />
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </form>

              {/* Live search dropdown results */}
              <AnimatePresence>
                {showSearchResults && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-stone-900 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden z-50 p-2"
                  >
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 py-1.5">
                      Produce Matches
                    </div>
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-emerald-50 dark:hover:bg-stone-800 rounded-xl transition"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-bold text-charcoal dark:text-stone-100">
                            {item.name}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            {item.location} • ₹{item.price}/{item.unit}
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-stone-400" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-semibold text-charcoal hover:text-primary dark:text-stone-200 dark:hover:text-emerald-400 transition"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-semibold text-charcoal hover:text-primary dark:text-stone-200 dark:hover:text-emerald-400 transition"
              >
                All Produce
              </Link>
              <Link
                to="/dashboard"
                className="text-sm font-semibold text-charcoal hover:text-primary dark:text-stone-200 dark:hover:text-emerald-400 transition"
              >
                Farmer Dashboard
              </Link>
            </nav>

            {/* Action Buttons: Dark mode, Wishlist, Cart, Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition"
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
              </button>

              {/* Wishlist Link */}
              <Link
                to="/products"
                className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition relative hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Animated Cart Button */}
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-primary hover:bg-primary-light text-white shadow-md shadow-primary/20 transition active:scale-95"
                aria-label="View Cart"
              >
                <ShoppingBag size={18} />
                <span className="text-xs font-bold hidden sm:inline">Cart</span>
                {cartItemCount > 0 && (
                  <motion.span
                    key={cartItemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-harvest text-charcoal font-black text-[11px] px-1.5 py-0.2 rounded-full min-w-5 text-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>

              {/* User Account / Login */}
              <Link
                to="/login"
                className="p-2.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition hidden sm:flex items-center justify-center"
                aria-label="User account"
              >
                <User size={18} />
              </Link>

              {/* Mobile hamburger menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl md:hidden text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition"
                aria-label="Open Mobile Menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Input */}
          <div className="pb-3 lg:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search fresh crops, mangoes, rice..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-primary/30 text-charcoal dark:text-stone-100"
              />
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            </form>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-5 py-4 space-y-3"
            >
              <div className="flex items-center justify-between py-2 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs text-stone-400">Deliver to</span>
                <button
                  onClick={() => {
                    setShowLocationModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-primary flex items-center gap-1"
                >
                  <MapPin size={12} /> {userLocation}
                </button>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-stone-100 dark:border-stone-800">
                <span className="text-xs text-stone-400">Language</span>
                <button
                  onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                  className="text-xs font-bold text-primary"
                >
                  {language === 'en' ? 'हिन्दी (Hindi)' : 'English'}
                </button>
              </div>

              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-semibold text-charcoal dark:text-stone-200"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-semibold text-charcoal dark:text-stone-200"
                >
                  Browse Produce
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-semibold text-charcoal dark:text-stone-200"
                >
                  My Cart ({cartItemCount})
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-semibold text-primary dark:text-emerald-400"
                >
                  Farmer Portal & Dashboard
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm font-semibold text-charcoal dark:text-stone-200"
                >
                  Sign In / Register
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Location Selector Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLocationModal(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white dark:bg-stone-900 rounded-3xl p-6 max-w-sm w-full z-10 shadow-2xl border border-stone-200 dark:border-stone-800"
            >
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100 mb-2">
                Choose Delivery Location
              </h3>
              <p className="text-xs text-stone-400 mb-4">
                We ensure 24-hr morning dispatch from nearby verified farmers.
              </p>

              <div className="space-y-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setUserLocation(loc);
                      setShowLocationModal(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                      userLocation === loc
                        ? 'bg-primary text-white'
                        : 'bg-stone-50 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-stone-700 text-charcoal dark:text-stone-200'
                    }`}
                  >
                    <span>{loc}</span>
                    {userLocation === loc && <span>✓</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
