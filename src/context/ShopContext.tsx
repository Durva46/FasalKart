import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Address, CustomerProfile } from '../types';
import { PRODUCTS, INITIAL_ORDERS, INITIAL_ADDRESSES } from '../data/dummyData';

interface ToastData {
  id: number;
  text: string;
  type: 'success' | 'error' | 'info';
}

interface ShopContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  addresses: Address[];
  customerProfile: CustomerProfile;
  setCustomerProfile: React.Dispatch<React.SetStateAction<CustomerProfile>>;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  toastMessage: ToastData | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  userRole: string;
  setUserRole: (role: string) => void;
  userLocation: string;
  setUserLocation: (loc: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addFarmerCrop: (crop: Partial<Product>) => void;
  toggleProductAvailability: (productId: string) => void;
  deleteFarmerCrop: (productId: string) => void;
  cartSubtotal: number;
  cartItemCount: number;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  progressToFreeDelivery: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Live dynamic product inventory
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('fasalkart_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fasalkart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('fasalkart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('fasalkart_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Customer Profile & Addresses
  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem('fasalkart_addresses');
      return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    memberSince: 'March 2024',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<ToastData | null>(null);
  const [language, setLanguage] = useState(() => localStorage.getItem('fasalkart_lang') || 'en');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('fasalkart_dark') === 'true');
  const [userRole, setUserRole] = useState(() => localStorage.getItem('fasalkart_role') || 'buyer');
  const [userLocation, setUserLocation] = useState('Pune, Maharashtra');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('fasalkart_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('fasalkart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fasalkart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fasalkart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fasalkart_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('fasalkart_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('fasalkart_role', userRole);
  }, [userRole]);

  useEffect(() => {
    localStorage.setItem('fasalkart_dark', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ id: Date.now(), text: message, type });
  };

  const clearToast = () => setToastMessage(null);

  // Cart logic
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`Added ${quantity} ${product.unit} of ${product.name} to cart!`);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  // Wishlist logic
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed ${product.name} from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved ${product.name} to wishlist! ❤️`);
    }
  };

  const isWishlisted = (productId: string) => wishlist.some((item) => item.id === productId);

  // Order logic
  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const stepMap = {
      'Order Placed': 1,
      'Confirmed': 2,
      'Packed': 3,
      'Out for Delivery': 3,
      'Delivered': 4,
    };
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status, trackingStep: stepMap[status] || 2 } : o
      )
    );
    showToast(`Order #${orderId} marked as ${status}`);
  };

  // Farmer inventory controls
  const addFarmerCrop = (cropData: Partial<Product>) => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: cropData.name || 'Organic Farm Produce',
      category: (cropData.category as any) || 'vegetables',
      price: cropData.price || 40,
      originalPrice: cropData.originalPrice || Math.round((cropData.price || 40) * 1.25),
      unit: cropData.unit || '1 kg',
      farmer: {
        id: 'f-1',
        name: 'Ramesh Patil',
        farmName: 'Patil Agro Orchards',
        location: 'Nashik, Maharashtra',
        rating: 4.9,
        avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      },
      location: 'Nashik, Maharashtra',
      rating: 4.9,
      reviewsCount: 1,
      image: cropData.image || 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80',
      description: cropData.description || 'Freshly harvested authentic organic produce directly from farm.',
      harvestDate: 'Morning Harvest Today',
      stock: cropData.stock || 100,
      isOrganic: cropData.isOrganic ?? true,
      isAvailable: true,
      tags: ['Freshly Listed', 'Farm Direct']
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Successfully listed ${newProduct.name} on marketplace!`);
  };

  const toggleProductAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p))
    );
    showToast('Product availability toggled');
  };

  const deleteFarmerCrop = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from store');
  };

  // Computed cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const freeDeliveryThreshold = 500;
  const deliveryFee = cartSubtotal >= freeDeliveryThreshold || cartSubtotal === 0 ? 0 : 49;
  const progressToFreeDelivery = Math.min(100, Math.round((cartSubtotal / freeDeliveryThreshold) * 100));

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        cart,
        wishlist,
        orders,
        addresses,
        customerProfile,
        setCustomerProfile,
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
        addOrder,
        updateOrderStatus,
        addFarmerCrop,
        toggleProductAvailability,
        deleteFarmerCrop,
        cartSubtotal,
        cartItemCount,
        deliveryFee,
        freeDeliveryThreshold,
        progressToFreeDelivery,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
