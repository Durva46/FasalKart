export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  experience?: string;
  rating: number;
  avatar: string;
  coverImage?: string;
  speciality?: string;
  bio?: string;
  landSize?: string;
  salesCount?: string;
}

export interface Product {
  id: string;
  name: string;
  nameHi?: string;
  category: 'vegetables' | 'fruits' | 'grains' | 'spices' | 'dairy';
  price: number;
  originalPrice?: number;
  unit: string;
  farmer: Farmer;
  location: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  harvestDate?: string;
  stock: number;
  isOrganic: boolean;
  isFreshToday?: boolean;
  isBestSeller?: boolean;
  isAvailable?: boolean;
  tags?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Order Placed' | 'Confirmed' | 'Packed' | 'Out for Delivery' | 'Delivered';
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: string;
  estimatedDelivery: string;
  trackingStep: number; // 1 to 4
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  avatar: string;
}
