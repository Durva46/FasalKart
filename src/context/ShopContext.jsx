import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('fasalkart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('fasalkart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('fasalkart_lang') || 'en';
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('fasalkart_dark') === 'true';
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('fasalkart_role') || 'buyer';
  });
  const [userLocation, setUserLocation] = useState('Mumbai, Maharashtra');

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fasalkart_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fasalkart_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync language
  useEffect(() => {
    localStorage.setItem('fasalkart_lang', language);
  }, [language]);

  // Sync dark mode class
  useEffect(() => {
    localStorage.setItem('fasalkart_dark', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toast trigger helper
  const showToast = (message, type = 'success') => {
    setToastMessage({ id: Date.now(), text: message, type });
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    showToast(`Added ${quantity} ${product.unit} of ${product.name} to cart!`);
  };

  const updateQuantity = (productId, delta) => {
    setCart(prevCart => {
      return prevCart
        .map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`Removed ${product.name} from wishlist`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`Saved ${product.name} to wishlist! ❤️`);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Computed calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const freeDeliveryThreshold = 500;
  const deliveryFee = cartSubtotal >= freeDeliveryThreshold || cartSubtotal === 0 ? 0 : 49;
  const progressToFreeDelivery = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));

  const value = {
    cart,
    wishlist,
    isCartOpen,
    setIsCartOpen,
    quickViewProduct,
    setQuickViewProduct,
    toastMessage,
    showToast,
    clearToast,
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    userRole,
    setUserRole,
    userLocation,
    setUserLocation,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isWishlisted,
    cartSubtotal,
    cartItemCount,
    deliveryFee,
    freeDeliveryThreshold,
    progressToFreeDelivery,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
