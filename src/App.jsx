import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BottomNav } from './components/layout/BottomNav';
import { CartDrawer } from './components/common/CartDrawer';
import { Toast } from './components/common/Toast';
import { QuickViewModal } from './components/common/QuickViewModal';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { Login } from './pages/Login';

function App() {
  const location = useLocation();

  // Scroll to top on every route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-stone-950 text-charcoal dark:text-stone-100 selection:bg-emerald-200 selection:text-primary-dark">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Page Body */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<FarmerDashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* Interactive Global Drawers and Modals */}
      <CartDrawer />
      <QuickViewModal />
      <Toast />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <BottomNav />

      {/* Rich Multi-column Footer */}
      <Footer />
    </div>
  );
}

export default App;
