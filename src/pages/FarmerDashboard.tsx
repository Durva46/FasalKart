import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Plus,
  Trash2,
  Calendar,
  CheckCircle,
  ToggleLeft,
  ToggleRight,
  Eye,
  Clock
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { StatCard } from '../components/common/StatCard';
import { Modal } from '../components/common/Modal';
import { useShop } from '../context/ShopContext';
import { Product, Order } from '../types';

export const FarmerDashboard: React.FC = () => {
  const {
    products,
    orders,
    addFarmerCrop,
    toggleProductAvailability,
    deleteFarmerCrop,
    updateOrderStatus,
    showToast
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'orders' | 'profile'>('overview');

  // Filter crops that belong to this farmer
  const farmerCrops = products.filter((p) => p.farmer.id === 'f-1');

  // Sales data for graphical Recharts
  const salesData = [
    { month: 'May', earnings: 42000, kgSold: 1200 },
    { month: 'Jun', earnings: 56000, kgSold: 1650 },
    { month: 'Jul', earnings: 48000, kgSold: 1400 },
    { month: 'Aug', earnings: 68000, kgSold: 2100 },
    { month: 'Sep', earnings: 82000, kgSold: 2600 },
    { month: 'Oct', earnings: 94000, kgSold: 3100 },
    { month: 'Nov', earnings: 112000, kgSold: 3800 },
  ];

  // Modal State for Add / Edit Crop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    category: 'vegetables',
    price: '',
    unit: '1 kg',
    stock: '',
    description: '',
    harvestDate: 'Morning Harvest Today',
    isOrganic: true,
  });

  const handleAddCropSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCrop.name || !newCrop.price || !newCrop.stock) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    addFarmerCrop({
      name: newCrop.name,
      category: newCrop.category as any,
      price: Number(newCrop.price),
      unit: newCrop.unit,
      stock: Number(newCrop.stock),
      description: newCrop.description || 'Farm-fresh harvest grown with Jeevamrutha manure.',
      harvestDate: newCrop.harvestDate,
      isOrganic: newCrop.isOrganic,
    });

    setIsModalOpen(false);
    setNewCrop({
      name: '',
      category: 'vegetables',
      price: '',
      unit: '1 kg',
      stock: '',
      description: '',
      harvestDate: 'Morning Harvest Today',
      isOrganic: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Header Profile Banner */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80"
            alt="Farmer Ramesh Patil"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/80 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-heading">
                Ramesh Patil Agro
              </h1>
              <span className="bg-emerald-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle size={10} /> Verified Producer
              </span>
            </div>
            <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
              Nashik, Maharashtra • Patil Agro Orchards (15 Acres)
            </p>
            <div className="flex items-center gap-3 text-xs text-harvest font-semibold mt-1">
              <span>★ 4.9 Rating (380+ reviews)</span>
              <span>•</span>
              <span className="text-white/80">Direct Mandi-Bypass Member</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-harvest hover:bg-harvest-dark text-charcoal font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
        >
          <Plus size={18} />
          <span>Add New Harvest Crop</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-3 border-b border-stone-200 dark:border-stone-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
          { id: 'inventory', label: `Inventory Management (${farmerCrops.length})`, icon: Package },
          { id: 'orders', label: `Incoming Orders (${orders.length})`, icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-800'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* 4 Key Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              icon={TrendingUp}
              value="₹1,12,000"
              label="This Month Earnings"
              subtitle="+24% vs last harvest season"
              color="emerald"
            />
            <StatCard
              icon={Package}
              value="3,800 kg"
              label="Produce Dispatched"
              subtitle="Direct harvest delivered"
              color="amber"
            />
            <StatCard
              icon={Users}
              value="840"
              label="Direct Family Buyers"
              subtitle="92% recurring repeat orders"
              color="green"
            />
            <StatCard
              icon={DollarSign}
              value="₹0"
              label="Middlemen Brokerage"
              subtitle="100% direct bank payout"
              color="blue"
            />
          </div>

          {/* Interactive Recharts Graphical Revenue Chart */}
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-soft">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100">
                  Harvest Sales & Monthly Direct Revenue (₹)
                </h3>
                <p className="text-xs text-stone-400">
                  Zero commission deducted. 100% funds transferred directly to farmer bank account.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-primary dark:text-emerald-300">
                Season 2026
              </span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEarningsFarmer" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1B5E20" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#1B5E20" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      borderRadius: '16px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`₹${val.toLocaleString()}`, 'Earnings']}
                  />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="#1B5E20"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorEarningsFarmer)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: INVENTORY ================= */}
      {activeTab === 'inventory' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100">
                Farmer Crop Inventory Table
              </h3>
              <p className="text-xs text-stone-400">
                Manage live availability, pricing, and stock levels
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Plus size={14} /> Add Crop
            </button>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 dark:border-stone-800 text-stone-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Crop Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Direct Price</th>
                  <th className="py-3 px-3">Stock Left</th>
                  <th className="py-3 px-3">Harvest Batch</th>
                  <th className="py-3 px-3">Availability</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {farmerCrops.map((crop) => (
                  <tr key={crop.id} className="hover:bg-cream/40 dark:hover:bg-stone-800/40 transition">
                    <td className="py-3.5 px-3 font-bold text-charcoal dark:text-stone-100 flex items-center gap-2">
                      <img src={crop.image} alt={crop.name} className="w-9 h-9 rounded-lg object-cover" />
                      <div>
                        <div>{crop.name}</div>
                        {crop.isOrganic && (
                          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-primary px-1.5 py-0.2 rounded-md">
                            Organic
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-stone-500 capitalize">{crop.category}</td>
                    <td className="py-3.5 px-3 font-bold text-primary dark:text-emerald-400">
                      ₹{crop.price} / {crop.unit}
                    </td>
                    <td className="py-3.5 px-3 text-stone-600 dark:text-stone-300 font-semibold">
                      {crop.stock} left
                    </td>
                    <td className="py-3.5 px-3 text-stone-500">{crop.harvestDate}</td>
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => toggleProductAvailability(crop.id)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold transition ${
                          crop.isAvailable !== false
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200'
                            : 'bg-stone-100 text-stone-400 dark:bg-stone-800'
                        }`}
                      >
                        {crop.isAvailable !== false ? 'In Stock (Active)' : 'Paused (Out of Stock)'}
                      </button>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => deleteFarmerCrop(crop.id)}
                        className="p-1.5 rounded-lg text-stone-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="Remove crop"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: INCOMING ORDERS ================= */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
            <div>
              <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100">
                Incoming Orders & Harvest Dispatch Control
              </h3>
              <p className="text-xs text-stone-400">
                Mark orders as Confirmed, Packed, or Out for Delivery in real-time
              </p>
            </div>
            <span className="text-xs font-bold text-primary">{orders.length} Orders Pending</span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-heading text-sm text-charcoal dark:text-stone-100">
                      Order #{order.id}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 mt-1">
                    Customer: <strong>{order.customerName}</strong> ({order.phone}) • {order.address}, {order.city}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    Ordered Crops: {order.items.map((i) => `${i.name} (×${i.quantity})`).join(', ')}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-primary mr-2">₹{order.total}</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs font-semibold cursor-pointer"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Packed">Packed</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Crop Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="List a New Farm Harvest"
      >
        <form onSubmit={handleAddCropSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-500 block mb-1">
              Crop Name (e.g. Nashik Red Onions, Kolar Tomatoes)
            </label>
            <input
              type="text"
              required
              value={newCrop.name}
              onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
              placeholder="e.g. Heirloom Organic Carrots"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">Category</label>
              <select
                value={newCrop.category}
                onChange={(e) => setNewCrop({ ...newCrop, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
              >
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="grains">Grains & Pulses</option>
                <option value="spices">Spices</option>
                <option value="dairy">Dairy</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">Price per unit (₹)</label>
              <input
                type="number"
                required
                value={newCrop.price}
                onChange={(e) => setNewCrop({ ...newCrop, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
                placeholder="45"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">Available Quantity</label>
              <input
                type="number"
                required
                value={newCrop.stock}
                onChange={(e) => setNewCrop({ ...newCrop, stock: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
                placeholder="250"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">Unit</label>
              <input
                type="text"
                value={newCrop.unit}
                onChange={(e) => setNewCrop({ ...newCrop, unit: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
                placeholder="1 kg"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-500 block mb-1">Description & Heritage</label>
            <textarea
              value={newCrop.description}
              onChange={(e) => setNewCrop({ ...newCrop, description: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none h-20"
              placeholder="Describe soil, harvesting method, and cooking flavor..."
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isOrganicFarmer"
              checked={newCrop.isOrganic}
              onChange={(e) => setNewCrop({ ...newCrop, isOrganic: e.target.checked })}
              className="accent-primary w-4 h-4"
            />
            <label htmlFor="isOrganicFarmer" className="text-xs font-semibold text-charcoal dark:text-stone-200">
              100% Certified Organic / Zero Chemical Sprays
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs shadow-md transition"
            >
              Publish Crop Live
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
