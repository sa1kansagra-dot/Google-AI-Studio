export interface Product {
  id: string;
  category: 'laptop' | 'cpu' | 'bundle' | 'storage' | 'gpu' | 'desktop';
  title: string;
  subtitle?: string;
  image: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  badgeColor?: 'deal' | 'choice' | 'primary' | 'dark' | 'emerald';
  subBadge?: string;
  rating: number;
  reviewsCount: number;
  boughtPastMonth: string;
  shipping: string;
  shippingSpeed: string;
  inStock: boolean;
  coupon?: number;
  specs: {
    label: string;
    value: string;
  }[];
  specChips?: string[];
  description?: string;
  socketOrFormFactor?: string;
  tdpWattage?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  appliedCoupon?: number;
  selectedWarranty?: boolean;
  selectedRamUpgrade?: { name: string; price: number };
  selectedSsdUpgrade?: { name: string; price: number };
}

export interface DeliveryAddress {
  city: string;
  state: string;
  zip: string;
}
