import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

/**
 * Mobile-First Sticky Bottom Navigation Bar
 * Optimized for natural thumb navigation on smartphone screens (44px+ tap targets)
 */
export const BottomNav = () => {
  const { cartItemCount, setIsCartOpen } = useShop();

  const navItems = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Produce', to: '/products', icon: Grid },
    { label: 'Cart', to: '#cart', icon: ShoppingBag, isCart: true, badge: cartItemCount },
    { label: 'Profile', to: '/login', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-t border-stone-200/80 dark:border-stone-800 px-4 py-2 safe-bottom shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isCart) {
            return (
              <button
                key={item.label}
                onClick={() => setIsCartOpen(true)}
                className="relative flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-stone-500 dark:text-stone-400 active:scale-95 transition"
              >
                <div className="relative">
                  <Icon size={20} />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-harvest text-charcoal font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-xs transition ${
                  isActive
                    ? 'text-primary dark:text-emerald-400 font-bold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
