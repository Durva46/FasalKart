import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Leaf,
  Users,
  ShoppingBag,
  Award,
  ChevronRight,
  Truck
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  FARMERS,
  TESTIMONIALS,
  HOW_IT_WORKS_STEPS,
  TRUST_BADGES
} from '../data/dummyData';
import { ProductCard } from '../components/common/ProductCard';
import { CategoryCard } from '../components/common/CategoryCard';
import { FarmerCard } from '../components/common/FarmerCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { RatingStars } from '../components/common/RatingStars';
import { useShop } from '../context/ShopContext';

export const Home = () => {
  const { userLocation, setUserLocation, language, products } = useShop();
  const [heroSearch, setHeroSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(heroSearch)}`);
    } else {
      navigate('/products');
    }
  };

  const freshTodayProducts = products.filter((p) => p.isFreshToday);
  const bestSellerProducts = products.filter((p) => p.isBestSeller);

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-6 md:pt-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Fresh Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-primary-dark dark:bg-emerald-950/80 dark:text-emerald-300 text-xs font-semibold shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />
                <span>Morning Harvest • Direct From Indian Farms</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-charcoal dark:text-stone-50 leading-[1.12] tracking-tight">
                Fresh produce <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">harvested for you,</span> directly from farmers.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-charcoal-light dark:text-stone-300 max-w-xl leading-relaxed">
                Skip middlemen and supermarket markups. Experience authentic Nashik onions, Devgad Alphonso mangoes, and Himalayan honey delivered to your doorstep in 24 hours.
              </p>

              {/* Search Bar with Location Selector */}
              <div className="bg-white dark:bg-stone-900 p-2 sm:p-2.5 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-xl max-w-xl">
                <form onSubmit={handleHeroSearch} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 dark:bg-stone-800/80 rounded-2xl flex-shrink-0 text-xs font-semibold text-charcoal dark:text-stone-200">
                    <MapPin size={15} className="text-primary" />
                    <span className="truncate max-w-[140px]">{userLocation}</span>
                  </div>

                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search Devgad Alphonso, Sharbati wheat..."
                      value={heroSearch}
                      onChange={(e) => setHeroSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-transparent focus:outline-none text-charcoal dark:text-stone-100 placeholder-stone-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-light text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-primary/20 transition active:scale-95"
                  >
                    <span>Search</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/25 transition active:scale-95"
                >
                  <ShoppingBag size={17} />
                  <span>Shop Fresh Today</span>
                </Link>

                <Link
                  to="/dashboard"
                  className="px-6 py-3.5 rounded-2xl bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-charcoal dark:text-stone-100 font-bold text-sm border border-stone-200 dark:border-stone-700 shadow-sm transition active:scale-95 flex items-center gap-2"
                >
                  <span>Farmer Portal</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Animated Counters / Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/60 dark:border-stone-800/80 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-black font-heading text-primary-dark dark:text-emerald-400">
                    10,000+
                  </div>
                  <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                    Verified Farmers
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-heading text-primary-dark dark:text-emerald-400">
                    50,000+
                  </div>
                  <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                    Orders Fulfilled
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black font-heading text-primary-dark dark:text-emerald-400">
                    ₹0
                  </div>
                  <div className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                    Middleman Cut
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Image with Floating Glass Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/5] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800">
                <img
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80"
                  alt="Farmer harvesting organic crops"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Glass Card 1: 100% Fresh Harvest */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -top-4 -left-4 sm:left-2 p-3.5 rounded-2xl glass-panel shadow-glass flex items-center gap-3 border border-white/60 dark:border-stone-700/60"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <Sparkles size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal dark:text-stone-100">
                    100% Pure Organic
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-300">
                    Zero pesticide residues
                  </div>
                </div>
              </motion.div>

              {/* Floating Glass Card 2: 24h Farm to Fork */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-5 -right-2 sm:right-2 p-3.5 rounded-2xl glass-panel shadow-glass flex items-center gap-3 border border-white/60 dark:border-stone-700/60"
              >
                <div className="w-10 h-10 rounded-xl bg-harvest text-charcoal flex items-center justify-center shadow-md">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal dark:text-stone-100">
                    Farm to Table in 24 hrs
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-300">
                    Morning harvested & dispatched
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================== CATEGORIES SECTION ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Browse by Crop"
          title="Explore Fresh Farm Categories"
          subtitle="Hand-picked seasonal grains, organic vegetables, pure spices, and orchard fruits."
          action={
            <Link
              to="/products"
              className="text-xs sm:text-sm font-bold text-primary hover:text-primary-light flex items-center gap-1"
            >
              View All Produce <ChevronRight size={16} />
            </Link>
          }
        />

        {/* Categories horizontal scroll on mobile */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                navigate(cat.id === 'all' ? '/products' : `/products?category=${cat.id}`);
              }}
            />
          ))}
        </div>
      </section>

      {/* ===================== FRESH TODAY CAROUSEL ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Morning Harvest"
          title="Fresh Today • Harvested Under 12 Hours"
          subtitle="Direct from fields in Nashik, Kolar, and Himachal. Crisp, full of life, zero cold-storage holding."
          action={
            <Link
              to="/products?filter=fresh"
              className="text-xs sm:text-sm font-bold text-primary hover:text-primary-light flex items-center gap-1"
            >
              See All Fresh <ChevronRight size={16} />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {freshTodayProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===================== PROMOTIONAL GRADIENT BANNER ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary via-emerald-800 to-primary-dark rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-xl relative z-10">
            <span className="bg-harvest text-charcoal font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              Seasonal Special
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-4xl leading-tight mb-3">
              GI-Tagged Authentic Devgad Alphonso Mangoes Now Live!
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm mb-6 leading-relaxed">
              Harvested straight from Balasaheb Kadam's coastal orchards. Naturally hay-ripened with zero calcium carbide. Experience real saffron pulp with zero fiber.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/product/prod-2"
                className="px-6 py-3 rounded-2xl bg-harvest hover:bg-harvest-dark text-charcoal font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition active:scale-95"
              >
                <span>Order Devgad Hapus</span>
                <ArrowRight size={15} />
              </Link>
              <span className="text-xs text-white/80">Only 80 dozens left from this morning's batch</span>
            </div>
          </div>

          {/* Decorative Background */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80"
              alt="Alphonso Mangoes"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ===================== BEST SELLERS CAROUSEL ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Customer Favorites"
          title="Best Sellers Across India"
          subtitle="Pantry staples trusted by over 50,000 families for their unpolished purity and taste."
          action={
            <Link
              to="/products?filter=bestsellers"
              className="text-xs sm:text-sm font-bold text-primary hover:text-primary-light flex items-center gap-1"
            >
              Browse All Best Sellers <ChevronRight size={16} />
            </Link>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellerProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===================== HOW IT WORKS SECTION ===================== */}
      <section className="bg-cream-subtle dark:bg-stone-900/60 py-16 border-y border-stone-200/60 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            badge="Simple 4-Step Process"
            title="How FasalKart Connects You to the Soil"
            subtitle="Transparent farm logistics engineered to preserve maximum crop nutrients while guaranteeing fair farmer earnings."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/70 dark:border-stone-800 shadow-soft relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-heading font-black text-2xl text-primary/30 dark:text-emerald-400/30">
                    {step.step}
                  </span>
                  <div className={`p-3 rounded-2xl ${step.color}`}>
                    <Sprout size={20} />
                  </div>
                </div>

                <h3 className="font-heading font-bold text-base text-charcoal dark:text-stone-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-charcoal-light dark:text-stone-400 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== MEET OUR FARMERS SECTION ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Verified Growers"
          title="Meet the Heroes Behind Your Food"
          subtitle="Every crop on FasalKart has a real face, a real farm, and a generational heritage."
          action={
            <Link
              to="/products"
              className="text-xs sm:text-sm font-bold text-primary hover:text-primary-light flex items-center gap-1"
            >
              Meet All 6 Verified Farmers <ChevronRight size={16} />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FARMERS.slice(0, 3).map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      </section>

      {/* ===================== TESTIMONIALS SLIDER ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          align="center"
          badge="Buyer Experiences"
          title="Loved by 40,000+ Conscious Indian Kitchens"
          subtitle="Real reviews from chefs, nutritionists, mothers, and organic food lovers."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200/80 dark:border-stone-800 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <RatingStars rating={item.rating} showValue={false} />
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Verified Buyer
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-light dark:text-stone-300 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-heading font-bold text-xs text-charcoal dark:text-stone-100">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    {item.role} • {item.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== TRUST BADGES ===================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-soft">
          {TRUST_BADGES.map((badge, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-emerald-50 text-primary dark:bg-emerald-950/60 dark:text-emerald-300 flex-shrink-0">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-charcoal dark:text-stone-100">
                  {badge.title}
                </h4>
                <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
