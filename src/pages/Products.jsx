import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  RotateCcw,
  Star,
  ChevronDown,
  ShoppingBag
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/dummyData';
import { ProductCard } from '../components/common/ProductCard';
import { SectionHeader } from '../components/common/SectionHeader';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL query params
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialFarmer = searchParams.get('farmer') || '';

  // Filter state
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(700);
  const [minRating, setMinRating] = useState(0);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category if URL param changes
  React.useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialSearch) setSearchQuery(initialSearch);
  }, [initialSearch]);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Farmer name filter (if filtered from farmer card)
      if (initialFarmer && !item.farmer.name.toLowerCase().includes(initialFarmer.toLowerCase())) {
        return false;
      }
      // Search keyword filter
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.farmer.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Price filter
      if (item.price > maxPrice) {
        return false;
      }
      // Rating filter
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }
      // Organic filter
      if (organicOnly && !item.isOrganic) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.stock - a.stock;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, maxPrice, minRating, organicOnly, sortBy, initialFarmer]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(700);
    setMinRating(0);
    setOrganicOnly(false);
    setSortBy('popular');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header and Controls */}
      <SectionHeader
        badge="Direct Marketplace"
        title="Explore Farm-Fresh Produce"
        subtitle={
          initialFarmer
            ? `Viewing all harvest grown by ${initialFarmer}`
            : 'Purity guaranteed from certified organic family farms across India.'
        }
      />

      {/* Mobile Filter Toggle & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search by crop, farmer, or region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-primary/30 text-charcoal dark:text-stone-100"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold text-charcoal dark:text-stone-200 shadow-sm"
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold text-charcoal dark:text-stone-200 focus:outline-none appearance-none pr-8 cursor-pointer shadow-sm"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          {/* Grid / List View Toggle */}
          <div className="hidden sm:flex items-center p-1 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              aria-label="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
              aria-label="List View"
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ===================== DESKTOP & MOBILE FILTER SIDEBAR ===================== */}
        <aside
          className={`lg:block ${
            mobileFilterOpen ? 'block' : 'hidden'
          } lg:col-span-1 space-y-6 bg-white dark:bg-stone-900 p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-soft h-fit`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-primary" />
              <h3 className="font-heading font-bold text-base text-charcoal dark:text-stone-100">
                Filters
              </h3>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* Categories Filter */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-stone-400 mb-3">
              Crop Category
            </h4>
            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-primary dark:text-emerald-300 font-bold'
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-stone-400">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-stone-400">
                Max Price
              </h4>
              <span className="text-xs font-bold text-primary dark:text-emerald-400">
                ₹{maxPrice}
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="700"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>₹30</span>
              <span>₹700</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-stone-400 mb-2">
              Minimum Rating
            </h4>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 4.5, 4.8, 4.9].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition ${
                    minRating === rate
                      ? 'bg-primary text-white border-primary'
                      : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {rate === 0 ? 'All' : `${rate}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Organic Only Switch */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold text-charcoal dark:text-stone-200 flex items-center gap-1.5">
                <Sparkles size={14} className="text-emerald-500" />
                100% Organic Only
              </span>
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={(e) => setOrganicOnly(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
              />
            </label>
          </div>
        </aside>

        {/* ===================== PRODUCTS LIST / GRID ===================== */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>
              Showing <strong className="text-charcoal dark:text-stone-100">{filteredProducts.length}</strong> fresh harvest items
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center border border-stone-200/80 dark:border-stone-800 shadow-soft">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-primary flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={28} />
              </div>
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100 mb-1">
                No matching produce found
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto mb-6">
                Try loosening your price slider, unchecking the organic filter, or searching for broader terms like "vegetables" or "mango".
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold shadow-md transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode="list" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
