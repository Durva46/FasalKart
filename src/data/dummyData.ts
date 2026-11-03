export const CATEGORIES = [
  { id: 'all', name: 'All Produce', nameHi: 'सभी फसलें', icon: 'Sparkles', count: 24 },
  { id: 'vegetables', name: 'Fresh Vegetables', nameHi: 'ताज़ी सब्ज़ियाँ', icon: 'Carrot', count: 8 },
  { id: 'fruits', name: 'Organic Fruits', nameHi: 'ताज़े फल', icon: 'Apple', count: 6 },
  { id: 'grains', name: 'Grains & Pulses', nameHi: 'अनाज और दालें', icon: 'Wheat', count: 6 },
  { id: 'spices', name: 'Pure Spices', nameHi: 'शुद्ध मसाले', icon: 'Flame', count: 4 },
  { id: 'dairy', name: 'Farm Fresh Dairy', nameHi: 'देसी डेयरी', icon: 'Milk', count: 4 },
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Nashik Red Onions (कांदा)',
    nameHi: 'नासिक लाल प्याज',
    category: 'vegetables',
    price: 38,
    originalPrice: 50,
    unit: '1 kg',
    farmer: {
      id: 'f-1',
      name: 'Ramesh Patil',
      location: 'Nashik, Maharashtra',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      experience: '18 years farming',
      farmName: 'Patil Agro Orchards'
    },
    location: 'Nashik, Maharashtra',
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80',
    description: 'Directly harvested from the nutrient-rich black soil of Lasalgaon, Nashik. Known for crisp layers, pungent punch, and long shelf life. Sun-cured naturally without chemicals.',
    harvestDate: 'Harvested 2 days ago',
    stock: 450,
    isOrganic: true,
    isFreshToday: true,
    isBestSeller: true,
    isAvailable: true,
    tags: ['Daily Essential', 'Sun Cured', 'Pesticide Free']
  },
  {
    id: 'prod-2',
    name: 'Devgad Alphonso Mangoes (Hapus)',
    nameHi: 'देवगढ़ हापुस आम',
    category: 'fruits',
    price: 680,
    originalPrice: 850,
    unit: '1 dozen (12 pcs)',
    farmer: {
      id: 'f-2',
      name: 'Balasaheb Kadam',
      location: 'Ratnagiri, Maharashtra',
      rating: 4.95,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      experience: '24 years',
      farmName: 'Konkan Golden Groves'
    },
    location: 'Devgad, Ratnagiri',
    rating: 4.95,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80',
    description: 'GI-tagged authentic Devgad Alphonso. Naturally tree-ripened with hay packing, offering saffron-hued pulp with no fiber and an unforgettable aroma.',
    harvestDate: 'Fresh harvest yesterday',
    stock: 80,
    isOrganic: true,
    isFreshToday: true,
    isBestSeller: true,
    isAvailable: true,
    tags: ['GI Tagged', 'Tree Ripened', 'Premium Export Quality']
  },
  {
    id: 'prod-3',
    name: 'Organic Desi Tomatoes (देशी टमाटर)',
    nameHi: 'देसी टमाटर',
    category: 'vegetables',
    price: 32,
    originalPrice: 45,
    unit: '1 kg',
    farmer: {
      id: 'f-3',
      name: 'Suresh Rao',
      location: 'Kolar, Karnataka',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      experience: '12 years',
      farmName: 'Cauvery Green Fields'
    },
    location: 'Kolar, Karnataka',
    rating: 4.7,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&auto=format&fit=crop&q=80',
    description: 'Juicy, tangy heirloom tomatoes grown using traditional Jeevamrutha manure. Ideal for curries, rasam, and fresh salads with real rustic taste.',
    harvestDate: 'Harvested this morning',
    stock: 220,
    isOrganic: true,
    isFreshToday: true,
    isBestSeller: false,
    isAvailable: true,
    tags: ['Heirloom', 'Tangy & Juicy', 'Zero Chemicals']
  },
  {
    id: 'prod-4',
    name: 'Sharbati Golden Wheat (गेहूं)',
    nameHi: 'शरबती गेहूं',
    category: 'grains',
    price: 260,
    originalPrice: 320,
    unit: '5 kg bag',
    farmer: {
      id: 'f-4',
      name: 'Gurpreet Singh',
      location: 'Sehore, Madhya Pradesh',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      experience: '20 years',
      farmName: 'Narmada Valley Grains'
    },
    location: 'Sehore, MP',
    rating: 4.9,
    reviewsCount: 215,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
    description: 'Famous Sehore Sharbati wheat grains, golden lustrous kernels irrigated by rain and deep black soil. Yields the softest, naturally sweet rotis that stay fluffy for hours.',
    harvestDate: 'Current season crop',
    stock: 500,
    isOrganic: true,
    isFreshToday: false,
    isBestSeller: true,
    isAvailable: true,
    tags: ['High Protein', 'Fluffy Rotis', 'Traditional Seed']
  },
  {
    id: 'prod-5',
    name: 'Dehraduni Basmati Rice (1121 Extra Long)',
    nameHi: 'देहरादून बासमती चावल',
    category: 'grains',
    price: 490,
    originalPrice: 590,
    unit: '5 kg',
    farmer: {
      id: 'f-4',
      name: 'Gurpreet Singh',
      location: 'Karnal, Haryana',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      experience: '20 years',
      farmName: 'Narmada Valley Grains'
    },
    location: 'Karnal, Haryana',
    rating: 4.88,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop&q=80',
    description: 'Aged for 2 years in climate-controlled granaries. Grains elongate up to 2.5 times upon cooking, delivering regal aroma and non-sticky fluffy rice for royal biryanis.',
    harvestDate: 'Aged 2 Years',
    stock: 350,
    isOrganic: false,
    isFreshToday: false,
    isBestSeller: true,
    isAvailable: true,
    tags: ['Aged 2 Years', 'Extra Long Grain', 'Royal Biryani Aroma']
  },
  {
    id: 'prod-6',
    name: 'Pahadi Pahari Potatoes (पहाड़ी आलू)',
    nameHi: 'पहाड़ी आलू',
    category: 'vegetables',
    price: 42,
    originalPrice: 55,
    unit: '1 kg',
    farmer: {
      id: 'f-5',
      name: 'Lata Devi',
      location: 'Shimla, Himachal Pradesh',
      rating: 4.85,
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&auto=format&fit=crop&q=80',
      experience: '15 years',
      farmName: 'Himalayan Ridge Farms'
    },
    location: 'Shimla, HP',
    rating: 4.65,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop&q=80',
    description: 'Grown on terraced Himalayan slopes at 6,500 ft elevation. Firm texture with low moisture, perfect for crispy chips, parathas, and rich slow-cooked stews.',
    harvestDate: 'Harvested 3 days ago',
    stock: 190,
    isOrganic: true,
    isFreshToday: true,
    isBestSeller: false,
    isAvailable: true,
    tags: ['High Altitude', 'Low Moisture', 'Rich Starch']
  },
  {
    id: 'prod-7',
    name: 'Lakadong High-Curcumin Turmeric (हल्दी)',
    nameHi: 'लकाडोंग हल्दी पाउडर',
    category: 'spices',
    price: 185,
    originalPrice: 240,
    unit: '250 gm',
    farmer: {
      id: 'f-6',
      name: 'Kongka Sangma',
      location: 'Jaintia Hills, Meghalaya',
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      experience: '10 years',
      farmName: 'Meghalaya Bio Highlands'
    },
    location: 'Jaintia Hills, Meghalaya',
    rating: 4.98,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
    description: 'The world purest turmeric with lab-tested 7.5% curcumin content (standard grocery store turmeric has only 2-3%). Deep amber hue with unmatched anti-inflammatory potency.',
    harvestDate: 'Stone-milled last week',
    stock: 120,
    isOrganic: true,
    isFreshToday: false,
    isBestSeller: true,
    isAvailable: true,
    tags: ['7.5% Curcumin', 'Single Origin', 'Stone Milled']
  },
  {
    id: 'prod-8',
    name: 'Unpolished Desi Toor Dal (अरहर दाल)',
    nameHi: 'देसी तूर दाल (बिना पॉलिश)',
    category: 'grains',
    price: 165,
    originalPrice: 210,
    unit: '1 kg',
    farmer: {
      id: 'f-1',
      name: 'Ramesh Patil',
      location: 'Latur, Maharashtra',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      experience: '18 years farming',
      farmName: 'Patil Agro Orchards'
    },
    location: 'Latur, Maharashtra',
    rating: 4.75,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1585994192701-f1a505c817ea?w=800&auto=format&fit=crop&q=80',
    description: '100% unpolished Arhar/Toor dal from Marathwada. Retains all natural nutrients, dietary fiber, and authentic earthy aroma without any water or oil polishing.',
    harvestDate: 'Recent harvest',
    stock: 310,
    isOrganic: true,
    isFreshToday: false,
    isBestSeller: true,
    isAvailable: true,
    tags: ['Unpolished', 'High Protein', 'Rich Aroma']
  },
  {
    id: 'prod-9',
    name: 'Pure Desi Gir Cow A2 Ghee (बिलोना घी)',
    nameHi: 'देसी गिर गाय A2 घी',
    category: 'dairy',
    price: 950,
    originalPrice: 1200,
    unit: '500 ml glass jar',
    farmer: {
      id: 'f-1',
      name: 'Ramesh Patil',
      location: 'Nashik, Maharashtra',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      experience: '18 years farming',
      farmName: 'Patil Agro Orchards'
    },
    location: 'Nashik, Maharashtra',
    rating: 4.96,
    reviewsCount: 284,
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=800&auto=format&fit=crop&q=80',
    description: 'Made from free-grazing grass-fed Gir cows using the traditional Vedic Bilona two-way churning method. Rich golden aroma with medicinal granulated texture.',
    harvestDate: 'Churned 3 days ago',
    stock: 65,
    isOrganic: true,
    isFreshToday: true,
    isBestSeller: true,
    isAvailable: true,
    tags: ['Vedic Bilona', 'A2 Gir Cow', 'Cruelty Free']
  },
  {
    id: 'prod-10',
    name: 'Fresh Malai Paneer (ताजा पनीर)',
    nameHi: 'ताजा मलाई पनीर',
    category: 'dairy',
    price: 120,
    originalPrice: 150,
    unit: '250 gm pack',
    farmer: {
      id: 'f-4',
      name: 'Gurpreet Singh',
      location: 'Ludhiana, Punjab',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      experience: '20 years',
      farmName: 'Narmada Valley Grains'
    },
    location: 'Ludhiana, Punjab',
    rating: 4.85,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
    description: 'Melt-in-mouth soft artisanal paneer made directly from fresh whole farm milk curdled with natural lemon juice. No starch, zero preservatives.',
    harvestDate: 'Morning batch',
    stock: 45,
    isOrganic: true,
    isFreshToday: true,
    isBestSeller: false,
    isAvailable: true,
    tags: ['Artisanal', 'Melt in Mouth', 'High Protein']
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'FSK-892415',
    createdAt: '2026-11-02 08:30 AM',
    items: [
      { id: 'prod-1', name: 'Nashik Red Onions (कांदा)', price: 38, quantity: 3, unit: '1 kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80' },
      { id: 'prod-2', name: 'Devgad Alphonso Mangoes (Hapus)', price: 680, quantity: 1, unit: '1 dozen', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 794,
    deliveryFee: 0,
    total: 794,
    status: 'Out for Delivery',
    customerName: 'Rahul Sharma',
    phone: '9876543210',
    address: 'Flat 402, Green Meadows, MG Road',
    city: 'Pune',
    pincode: '411001',
    paymentMethod: 'UPI (GPay)',
    estimatedDelivery: 'Tomorrow morning by 7:30 AM',
    trackingStep: 3
  },
  {
    id: 'FSK-741209',
    createdAt: '2026-10-28 04:15 PM',
    items: [
      { id: 'prod-4', name: 'Sharbati Golden Wheat (गेहूं)', price: 260, quantity: 1, unit: '5 kg bag', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80' },
      { id: 'prod-7', name: 'Lakadong High-Curcumin Turmeric', price: 185, quantity: 2, unit: '250 gm', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80' }
    ],
    subtotal: 630,
    deliveryFee: 0,
    total: 630,
    status: 'Delivered',
    customerName: 'Rahul Sharma',
    phone: '9876543210',
    address: 'Flat 402, Green Meadows, MG Road',
    city: 'Pune',
    pincode: '411001',
    paymentMethod: 'Cash on Delivery',
    estimatedDelivery: 'Delivered on Oct 29',
    trackingStep: 4
  }
];

export const INITIAL_ADDRESSES = [
  {
    id: 'addr-1',
    label: 'Home',
    fullName: 'Rahul Sharma',
    street: 'Flat 402, Green Meadows, MG Road',
    city: 'Pune',
    pincode: '411001',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Parents House',
    fullName: 'Devendra Sharma',
    street: 'Plot 12, Gulmohar Colony, Kothrud',
    city: 'Pune',
    pincode: '411038',
    isDefault: false
  }
];

export const FARMERS = [
  {
    id: 'f-1',
    name: 'Ramesh Patil',
    farmName: 'Patil Agro Orchards',
    location: 'Nashik, Maharashtra',
    experience: '18 Years in Organic Farming',
    landSize: '15 Acres',
    rating: 4.9,
    productsCount: 14,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
    speciality: 'Red Onions, Pomegranates & Pulses',
    bio: 'Pioneering zero-budget natural farming in Lasalgaon. Eliminating middlemen has helped me offer better rates directly to Indian families.',
    salesCount: '12,400+ kg delivered'
  },
  {
    id: 'f-2',
    name: 'Balasaheb Kadam',
    farmName: 'Konkan Golden Groves',
    location: 'Devgad, Ratnagiri, Maharashtra',
    experience: '24 Years',
    landSize: '22 Acres',
    rating: 4.95,
    productsCount: 6,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80',
    speciality: 'GI-Certified Alphonso Mango & Cashews',
    bio: 'Generational mango grower near coastal Konkan. Every fruit is hand-inspected for weight, brix sweetness, and hay-ripened without carbide.',
    salesCount: '9,800+ crates delivered'
  },
  {
    id: 'f-3',
    name: 'Suresh Rao',
    farmName: 'Cauvery Green Fields',
    location: 'Kolar & Wayanad',
    experience: '12 Years',
    landSize: '18 Acres',
    rating: 4.7,
    productsCount: 9,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=800&auto=format&fit=crop&q=80',
    speciality: 'Spices, Cardamom, Papaya, Heirloom Veggies',
    bio: 'Dedicated to soil microbiology and multi-layer agroforestry. Direct selling gives our tribal workers fair living wages.',
    salesCount: '6,200+ orders'
  },
  {
    id: 'f-4',
    name: 'Sardar Gurpreet Singh',
    farmName: 'Narmada Valley & Punjab Grains',
    location: 'Sehore, MP & Ludhiana, Punjab',
    experience: '20 Years',
    landSize: '35 Acres',
    rating: 4.9,
    productsCount: 11,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80',
    speciality: 'Sharbati Wheat, Basmati Rice & Desi Moong',
    bio: 'Committed to organic crop rotation without stubble burning. We preserve authentic desi seeds handed down through four generations.',
    salesCount: '28,000+ kg grains'
  },
  {
    id: 'f-5',
    name: 'Lata Devi',
    farmName: 'Himalayan Ridge Farms',
    location: 'Shimla & Kullu, Himachal Pradesh',
    experience: '15 Years',
    landSize: '8 Acres',
    rating: 4.85,
    productsCount: 8,
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80',
    speciality: 'Apples, Pahadi Potatoes & Forest Wild Honey',
    bio: 'Leading an all-women agricultural self-help cooperative in the high Himalayas. Our produce drinks pure glacial stream water.',
    salesCount: '4,500+ orders'
  },
  {
    id: 'f-6',
    name: 'Kongka Sangma',
    farmName: 'Meghalaya Bio Highlands',
    location: 'Jaintia Hills, Meghalaya',
    experience: '10 Years',
    landSize: '12 Acres',
    rating: 5.0,
    productsCount: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=800&auto=format&fit=crop&q=80',
    speciality: 'Lakadong Curcumin Turmeric & Ginger',
    bio: 'Preserving endemic medicinal turmeric varieties in pristine Meghalaya soil. Tested for ultra-high curcumin levels and purity.',
    salesCount: '3,800+ units'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Ananya Sharma',
    city: 'Bengaluru, Karnataka',
    role: 'Home Chef & Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'The Nashik onions and Devgad mangoes are unimaginably superior to regular supermarket quality. You can literally smell the earth and fresh sunshine. FasalKart connects me to real farmers directly!',
    date: '3 days ago',
    verifiedBuyer: true
  },
  {
    id: 't-2',
    name: 'Vikram Malhotra',
    city: 'Mumbai, Maharashtra',
    role: 'Fitness Coach',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'The Lakadong Turmeric and Sharbati Wheat are game-changers. Soft rotis and pure curcumin milk every night. Zero chemical residue. Absolutely love the fast 24-hr farm-to-table delivery.',
    date: '1 week ago',
    verifiedBuyer: true
  },
  {
    id: 't-3',
    name: 'Dr. Priya Nambiar',
    city: 'Kochi, Kerala',
    role: 'Nutritionist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Knowing which farmer grew my food and seeing their profile card gives me and my patients total peace of mind. FasalKart is revolutionizing ethical grocery shopping across India.',
    date: '2 weeks ago',
    verifiedBuyer: true
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Farmer Lists Harvest',
    titleHi: 'किसान फसल सूचीबद्ध करते हैं',
    desc: 'Verified farmers list fresh crops directly from their fields at fair, honest prices without middleman markups.',
    icon: 'Sprout',
    color: 'bg-emerald-50 text-emerald-700'
  },
  {
    step: '02',
    title: 'You Choose & Order',
    titleHi: 'आप चुनते हैं और ऑर्डर करते हैं',
    desc: 'Browse organic produce, inspect farmer profiles, select your quantities, and order with 1-click convenience.',
    icon: 'ShoppingCart',
    color: 'bg-amber-50 text-amber-700'
  },
  {
    step: '03',
    title: 'Harvested Fresh Upon Order',
    titleHi: 'ऑर्डर पर ताज़ा कटाई',
    desc: 'Produce is harvested fresh the morning after you place your order to ensure peak nutrients and crisp taste.',
    icon: 'Sun',
    color: 'bg-orange-50 text-orange-700'
  },
  {
    step: '04',
    title: 'Eco-Express Delivery',
    titleHi: '24 घंटे में आपके घर',
    desc: 'Delivered straight to your doorstep within 24 hours in biodegradable, temperature-controlled packaging.',
    icon: 'Truck',
    color: 'bg-green-50 text-green-700'
  }
];

export const TRUST_BADGES = [
  {
    title: 'Direct From Farm',
    desc: 'Zero middlemen, 100% fair price paid to farmers',
    icon: 'ShieldCheck'
  },
  {
    title: '24-Hour Fresh Harvest',
    desc: 'Harvested morning of delivery for maximum vitality',
    icon: 'Clock'
  },
  {
    title: 'Lab-Tested Organic',
    desc: 'Zero chemical pesticides or artificial ripening',
    icon: 'CheckCircle2'
  },
  {
    title: 'Eco-Friendly Packing',
    desc: '100% compostable paper & jute packaging',
    icon: 'Leaf'
  }
];
