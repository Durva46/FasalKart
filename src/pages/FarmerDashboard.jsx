import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  CheckCircle,
  Sprout
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { StatCard } from '../components/common/StatCard';
import { Modal } from '../components/common/Modal';
import { useShop } from '../context/ShopContext';

export const FarmerDashboard = () => {
  const { showToast } = useShop();

  // Dummy farmer sales data for charts
  const salesData = [
    { month: 'May', earnings: 42000, kgSold: 1200 },
    { month: 'Jun', earnings: 56000, kgSold: 1650 },
    { month: 'Jul', earnings: 48000, kgSold: 1400 },
    { month: 'Aug', earnings: 68000, kgSold: 2100 },
    { month: 'Sep', earnings: 82000, kgSold: 2600 },
    { month: 'Oct', earnings: 94000, kgSold: 3100 },
    { month: 'Nov', earnings: 112000, kgSold: 3800 },
  ];

  // Dummy crops currently listed by this farmer
  const [crops, setCrops] = useState([
    {
      id: 'c-1',
      name: 'Nashik Red Onions (कांदा)',
      category: 'Vegetables',
      price: 38,
      stockKg: 450,
      harvestStatus: 'Harvested Yesterday',
      activeOrders: 18,
      isOrganic: true,
    },
    {
      id: 'c-2',
      name: 'Unpolished Desi Toor Dal',
      category: 'Grains & Pulses',
      price: 165,
      stockKg: 310,
      harvestStatus: 'Ready in Granary',
      activeOrders: 12,
      isOrganic: true,
    },
    {
      id: 'c-3',
      name: 'Desi Chana Brown Chickpeas',
      category: 'Grains & Pulses',
      price: 95,
      stockKg: 240,
      harvestStatus: 'Sun-drying',
      activeOrders: 9,
      isOrganic: true,
    },
    {
      id: 'c-4',
      name: 'Organic Purple Brinjals',
      category: 'Vegetables',
      price: 36,
      stockKg: 110,
      harvestStatus: 'Morning Harvest',
      activeOrders: 14,
      isOrganic: true,
    },
  ]);

  // Modal State for Add Crop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: '',
    category: 'Vegetables',
    price: '',
    stockKg: '',
    harvestDate: 'Morning Harvest',
    isOrganic: true,
  });

  const handleAddCropSubmit = (e) => {
    e.preventDefault();
    if (!newCrop.name || !newCrop.price || !newCrop.stockKg) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    const added = {
      id: `c-${Date.now()}`,
      name: newCrop.name,
      category: newCrop.category,
      price: Number(newCrop.price),
      stockKg: Number(newCrop.stockKg),
      harvestStatus: newCrop.harvestDate,
      activeOrders: 0,
      isOrganic: newCrop.isOrganic,
    };

    setCrops([added, ...crops]);
    setIsModalOpen(false);
    showToast(`Successfully listed ${newCrop.name} for direct sale!`);
    setNewCrop({
      name: '',
      category: 'Vegetables',
      price: '',
      stockKg: '',
      harvestDate: 'Morning Harvest',
      isOrganic: true,
    });
  };

  const handleDeleteCrop = (id) => {
    setCrops(crops.filter((c) => c.id !== id));
    showToast('Crop listing removed', 'info');
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
              <span className="text-white/80">Joined FasalKart in 2024</span>
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

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          icon={TrendingUp}
          value="₹1,12,000"
          label="This Month Earnings"
          subtitle="+24% vs last harvest"
          color="emerald"
        />
        <StatCard
          icon={Package}
          value="3,800 kg"
          label="Produce Dispatched"
          subtitle="45 pending morning deliveries"
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
          subtitle="100% retained payout"
          color="blue"
        />
      </div>

      {/* Recharts Graphical Sales Chart */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-soft">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100">
              Harvest Sales & Monthly Direct Revenue (₹)
            </h3>
            <p className="text-xs text-stone-400">
              Direct account credits without APMC or trader deductions
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-primary dark:text-emerald-300">
            Current Season 2026
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
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
                formatter={(val) => [`₹${val.toLocaleString()}`, 'Earnings']}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#1B5E20"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Crops Table with Actions */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-soft">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-heading font-bold text-lg text-charcoal dark:text-stone-100">
              Active Crops Listed on Marketplace
            </h3>
            <p className="text-xs text-stone-400">
              Update pricing or harvest availability anytime
            </p>
          </div>

          <span className="text-xs font-bold text-primary">
            {crops.length} Listed Items
          </span>
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
                <th className="py-3 px-3">Active Orders</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {crops.map((crop) => (
                <tr key={crop.id} className="hover:bg-cream/40 dark:hover:bg-stone-800/40 transition">
                  <td className="py-3.5 px-3 font-bold text-charcoal dark:text-stone-100">
                    {crop.name}
                    {crop.isOrganic && (
                      <span className="ml-2 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-primary px-1.5 py-0.2 rounded-md">
                        Organic
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-stone-500 dark:text-stone-400">
                    {crop.category}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-primary dark:text-emerald-400">
                    ₹{crop.price} / kg
                  </td>
                  <td className="py-3.5 px-3 text-stone-600 dark:text-stone-300">
                    {crop.stockKg} kg
                  </td>
                  <td className="py-3.5 px-3 text-stone-500 dark:text-stone-400">
                    {crop.harvestStatus}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[11px]">
                      {crop.activeOrders} orders
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => handleDeleteCrop(crop.id)}
                      className="p-1.5 rounded-lg text-stone-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                      title="Delete listing"
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
              <label className="text-xs font-semibold text-stone-500 block mb-1">
                Category
              </label>
              <select
                value={newCrop.category}
                onChange={(e) => setNewCrop({ ...newCrop, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains & Pulses">Grains & Pulses</option>
                <option value="Spices">Spices</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">
                Direct Price (₹ per kg)
              </label>
              <input
                type="number"
                required
                value={newCrop.price}
                onChange={(e) => setNewCrop({ ...newCrop, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
                placeholder="₹45"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">
                Available Stock Quantity (kg)
              </label>
              <input
                type="number"
                required
                value={newCrop.stockKg}
                onChange={(e) => setNewCrop({ ...newCrop, stockKg: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
                placeholder="250"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-500 block mb-1">
                Harvest Timeline
              </label>
              <input
                type="text"
                value={newCrop.harvestDate}
                onChange={(e) => setNewCrop({ ...newCrop, harvestDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs sm:text-sm focus:outline-none"
                placeholder="e.g. Dawn Harvest Tomorrow"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isOrganic"
              checked={newCrop.isOrganic}
              onChange={(e) => setNewCrop({ ...newCrop, isOrganic: e.target.checked })}
              className="accent-primary w-4 h-4"
            />
            <label htmlFor="isOrganic" className="text-xs font-semibold text-charcoal dark:text-stone-200">
              Certified Organic / Zero Chemical Residue
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
