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

export interface SerializedUnit {
  id: number;
  serial_number: string;
  receiving_id: number;
  product_title: string;
  product_type: string;
  current_status: 'received' | 'qc_pending' | 'qc_testing' | 'qc_failed' | 'repair_required' | 'qc_passed' | 'inwarded' | 'available' | 'reserved' | 'sold' | 'scrap' | 'returned_to_supplier';
  warehouse_location: string;
  bin_location: string;
  cost_price: number;
  selling_price: number;
  created_at: string;
}

export interface ReceivingRecord {
  id: number;
  receiving_number: string;
  supplier_name?: string;
  purchase_ref: string;
  product_type: string;
  brand: string;
  model: string;
  quantity: number;
  unit_cost: number;
  physical_condition: string;
  accessories_received?: string;
  status: string;
  created_at: string;
}

export interface QCInspection {
  id: number;
  serial_unit_id: number;
  serial_number?: string;
  product_title?: string;
  technician_name?: string;
  overall_result: 'qc_passed' | 'qc_failed';
  failure_reason?: string;
  checklist_results: Record<string, string>;
  thermal_cpu_peak?: number;
  thermal_gpu_peak?: number;
  battery_health_percentage?: number;
  notes?: string;
  completed_at: string;
}

export interface AssemblyOrder {
  id: number;
  assembly_number: string;
  customer_name: string;
  components_json: string;
  total_watts: number;
  assembly_charge: number;
  total_price: number;
  compatibility_status: string;
  status: 'draft' | 'configuration_created' | 'components_reserved' | 'assembly_pending' | 'assembly_in_progress' | 'assembly_completed' | 'qc_pending' | 'qc_passed' | 'qc_failed' | 'ready_for_dispatch' | 'delivered';
  notes?: string;
  created_at: string;
}

export interface ReferralLedgerEntry {
  id: number;
  referrer_id: number;
  referrer_name?: string;
  points_change: number;
  transaction_type: string;
  notes?: string;
  created_at: string;
}

export interface ErpDashboardMetrics {
  total_units_received: number;
  qc_pending_count: number;
  qc_passed_count: number;
  qc_failed_count: number;
  available_sellable_units: number;
  active_assembly_orders: number;
  total_stock_value: number;
  total_referral_points_issued: number;
}
