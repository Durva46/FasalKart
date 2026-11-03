import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart,
  ShoppingBag,
  MapPin,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Star,
  ChevronRight,
  UserCheck,
  Award,
  Calendar,
  Layers
} from 'lucide-react';
import { PRODUCTS, FARMERS } from '../data/dummyData';
import { useShop } from '../context/ShopContext';
import { RatingStars } from '../components/common/RatingStars';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted, userLocation } = useShop();

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const farmer = FARMERS.find((f) => f.id === product.farmer.id) || product.farmer;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAdded, setIsAdded] = useState(false);

  // Gallery images (main + dummy angles)
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80',
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  // Recommended related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-400">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <ChevronRight size={13} />
        <Link to="/products" className="hover:text-primary transition">Produce</Link>
        <ChevronRight size={13} />
        <Link to={`/products?category=${product.category}`} className="hover:text-primary transition capitalize">
          {product.category}
        </Link>
        <ChevronRight size={13} />
        <span className="text-charcoal dark:text-stone-200 font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery with Thumbnails */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-soft border border-stone-200/80 dark:border-stone-800">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isOrganic && (
              <span className="absolute top-4 left-4 bg-emerald-600/95 text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5 backdrop-blur-sm">
                <Sparkles size={14} /> 100% Certified Organic
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/90 dark:bg-stone-900/90 shadow-md text-stone-600 hover:text-rose-500 transition"
              aria-label="Wishlist"
            >
              <Heart
                size={18}
                className={isWishlisted(product.id) ? 'fill-rose-500 text-rose-500' : ''}
              />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-16 rounded-2xl overflow-hidden border-2 transition ${
                  selectedImage === img
                    ? 'border-primary ring-2 ring-primary/20 scale-102'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details, Farmer Badge & Purchase Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
            {/* Location & Reviews */}
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-2">
              <span className="flex items-center gap-1 font-medium">
                <MapPin size={13} className="text-primary" />
                {product.location}
              </span>
              <RatingStars rating={product.rating} reviewsCount={product.reviewsCount} />
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-4xl font-black font-heading text-charcoal dark:text-stone-50 mb-3">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl sm:text-4xl font-black font-heading text-primary-dark dark:text-emerald-400">
                ₹{product.price}
              </span>
              <span className="text-sm font-semibold text-stone-400">
                per {product.unit}
              </span>
              {product.originalPrice && (
                <span className="text-base line-through text-stone-400">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-xs sm:text-sm text-charcoal-light dark:text-stone-300 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Farmer Profile Card mini */}
            <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-soft flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3.5">
                <img
                  src={farmer.avatar}
                  alt={farmer.name}
                  className="w-12 h-12 rounded-2xl object-cover shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-charcoal dark:text-stone-100">
                    <span>{farmer.name}</span>
                    <span className="text-emerald-500">✓</span>
                  </div>
                  <div className="text-[11px] text-stone-400">
                    {farmer.farmName || 'Patil Agro Orchards'} • {farmer.experience || '15+ yrs'}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-harvest block">
                  ★ {farmer.rating || 4.9}
                </span>
                <span className="text-[10px] text-stone-400">
                  {product.harvestDate}
                </span>
              </div>
            </div>

            {/* Delivery badge */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-xs text-primary-dark dark:text-emerald-300 flex items-center gap-2 mb-6">
              <Truck size={16} className="text-primary flex-shrink-0" />
              <span>
                Delivering to <strong>{userLocation}</strong> by tomorrow morning in cold-chain packs.
              </span>
            </div>
          </div>

          {/* Action buttons: Quantity + Add to Cart + Buy Now */}
          <div className="space-y-3 pt-4 border-t border-stone-200/70 dark:border-stone-800">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-2xl p-1 bg-white dark:bg-stone-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-charcoal dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 text-sm font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary-light text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition active:scale-95"
              >
                {isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
                <span>{isAdded ? 'Added to Cart!' : `Add to Cart (₹${product.price * quantity})`}</span>
              </button>

              {/* Buy Now button */}
              <button
                onClick={handleBuyNow}
                className="px-6 py-3.5 rounded-2xl bg-harvest hover:bg-harvest-dark text-charcoal font-black text-xs sm:text-sm shadow-md transition active:scale-95"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Farm Heritage, Customer Reviews */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-soft">
        <div className="flex items-center gap-6 border-b border-stone-200 dark:border-stone-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`font-heading font-bold text-sm sm:text-base pb-2 relative transition ${
              activeTab === 'description'
                ? 'text-primary dark:text-emerald-400'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Produce Details & Heritage
            {activeTab === 'description' && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`font-heading font-bold text-sm sm:text-base pb-2 relative transition ${
              activeTab === 'reviews'
                ? 'text-primary dark:text-emerald-400'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            Verified Reviews ({product.reviewsCount})
            {activeTab === 'reviews' && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />
            )}
          </button>
        </div>

        {activeTab === 'description' ? (
          <div className="space-y-4 text-xs sm:text-sm text-charcoal-light dark:text-stone-300 leading-relaxed">
            <p>{product.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-cream dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-700">
                <span className="font-bold text-charcoal dark:text-stone-100 block mb-1">Harvest Timeline</span>
                <span className="text-stone-400 text-xs">{product.harvestDate} • Dispatched at 4:30 AM</span>
              </div>
              <div className="p-4 rounded-2xl bg-cream dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-700">
                <span className="font-bold text-charcoal dark:text-stone-100 block mb-1">Farming Practice</span>
                <span className="text-stone-400 text-xs">Jeevamrutha organic manure, zero glyphosate sprays</span>
              </div>
              <div className="p-4 rounded-2xl bg-cream dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-700">
                <span className="font-bold text-charcoal dark:text-stone-100 block mb-1">Packaging Standard</span>
                <span className="text-stone-400 text-xs">Breathe-easy jute sacs & food-grade corrugation</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40">
              <div className="text-center pr-4 border-r border-stone-200 dark:border-stone-700">
                <div className="text-3xl font-black font-heading text-charcoal dark:text-stone-100">
                  {product.rating}
                </div>
                <RatingStars rating={product.rating} showValue={false} />
                <span className="text-[10px] text-stone-400 block mt-1">Based on {product.reviewsCount} reviews</span>
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                98% of buyers reported higher taste and crisper freshness compared to supermarket chain orders.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* "You May Also Like" Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-charcoal dark:text-stone-100">
            More Fresh Harvest in {product.category.toUpperCase()}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
