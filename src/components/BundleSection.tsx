import React, { useState } from 'react';
import { WORKSPACE_BUNDLE, LAPTOP_PRODUCTS, CPU_PRODUCTS, ASSET_IMAGES } from '../data/products';
import { Product } from '../types';

interface BundleSectionProps {
  onAddBundleToCart: (items: Product[]) => void;
  onSelectProduct: (product: Product) => void;
}

export const BundleSection: React.FC<BundleSectionProps> = ({
  onAddBundleToCart,
  onSelectProduct,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const bundleProducts: Product[] = [
    LAPTOP_PRODUCTS[3], // ASUS Zephyrus G16 OLED ($1,999.99)
    CPU_PRODUCTS[0],    // AMD Ryzen 7 7800X3D ($449.99)
    {
      id: "ssd-samsung-990-pro",
      category: "storage",
      title: "Samsung 990 PRO 2TB NVMe M.2 Internal SSD PCIe Gen 4.0",
      subtitle: "Sequential read speeds up to 7,450 MB/s with nickel-coated heat spreader",
      image: ASSET_IMAGES.storageBase,
      price: 179.99,
      originalPrice: 219.99,
      badge: "Fast Storage",
      badgeColor: "dark",
      rating: 4.9,
      reviewsCount: 8940,
      boughtPastMonth: "10K+ bought in past month",
      shipping: "PCWARE FastPass",
      shippingSpeed: "FREE Delivery Tomorrow",
      inStock: true,
      specChips: ["7,450 MB/s", "2TB V-NAND", "PCIe 4.0 x4"],
      specs: [
        { label: "Form Factor", value: "M.2 2280 NVMe" },
        { label: "Sequential Read", value: "Up to 7,450 MB/s" },
        { label: "Sequential Write", value: "Up to 6,900 MB/s" },
        { label: "TBW Endurance", value: "1,200 TBW" },
        { label: "Controller", value: "Samsung In-House Pascal Controller" }
      ],
      description: "Reach top gaming performance with PCIe 4.0 speeds. Samsung 990 PRO delivers lightning fast load times and exceptional thermal control for creator workloads."
    }
  ];

  const handleAddAll = () => {
    onAddBundleToCart(bundleProducts);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section className="max-w-[1480px] mx-auto px-4 mt-6">
      <div className="bg-white p-4 md:p-5 rounded shadow-sm border border-border-subtle">
        <h2 className="font-heading font-bold text-xl text-text-dark mb-1">
          {WORKSPACE_BUNDLE.title}
        </h2>
        <p className="text-xs text-text-muted mb-4">
          {WORKSPACE_BUNDLE.subtitle}
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          {/* Products Bundle Trio */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {/* Item 1: Laptop */}
            <div
              onClick={() => onSelectProduct(bundleProducts[0])}
              className="flex flex-col items-center text-center max-w-[170px] cursor-pointer group"
            >
              <div className="w-32 h-24 bg-slate-900 rounded p-1 flex items-center justify-center mb-2 shadow-sm border border-slate-200 group-hover:border-primary transition-colors">
                <img
                  alt="Creator Laptop"
                  className="max-h-full object-contain group-hover:scale-105 transition-transform"
                  src={WORKSPACE_BUNDLE.items[0].image}
                />
              </div>
              <span className="text-xs font-semibold text-text-dark line-clamp-1 group-hover:text-primary transition-colors">
                {WORKSPACE_BUNDLE.items[0].name}
              </span>
              <span className="text-xs font-bold text-primary font-heading">
                ₹{Math.round(WORKSPACE_BUNDLE.items[0].price * 85).toLocaleString('en-IN')}
              </span>
            </div>

            <span className="material-symbols-outlined text-gray-400 text-[24px] font-bold select-none">
              add
            </span>

            {/* Item 2: AMD Ryzen 7 7800X3D CPU */}
            <div
              onClick={() => onSelectProduct(bundleProducts[1])}
              className="flex flex-col items-center text-center max-w-[170px] cursor-pointer group"
            >
              <div className="w-32 h-24 bg-slate-950 rounded p-1 flex items-center justify-center mb-2 shadow-sm border border-slate-200 group-hover:border-primary transition-colors">
                <img
                  alt="AMD Ryzen 7 7800X3D"
                  className="max-h-full object-contain group-hover:scale-105 transition-transform"
                  src={WORKSPACE_BUNDLE.items[1].image}
                />
              </div>
              <span className="text-xs font-semibold text-text-dark line-clamp-1 group-hover:text-primary transition-colors">
                {WORKSPACE_BUNDLE.items[1].name}
              </span>
              <span className="text-xs font-bold text-primary font-heading">
                ₹{Math.round(WORKSPACE_BUNDLE.items[1].price * 85).toLocaleString('en-IN')}
              </span>
            </div>

            <span className="material-symbols-outlined text-gray-400 text-[24px] font-bold select-none">
              add
            </span>

            {/* Item 3: Samsung 990 Pro 2TB SSD */}
            <div
              onClick={() => onSelectProduct(bundleProducts[2])}
              className="flex flex-col items-center text-center max-w-[170px] cursor-pointer group"
            >
              <div className="w-32 h-24 bg-slate-950 rounded p-1 flex items-center justify-center mb-2 shadow-sm border border-slate-200 group-hover:border-primary transition-colors">
                <img
                  alt="Samsung 990 Pro SSD"
                  className="max-h-full object-contain group-hover:scale-105 transition-transform"
                  src={WORKSPACE_BUNDLE.items[2].image}
                />
              </div>
              <span className="text-xs font-semibold text-text-dark line-clamp-1 group-hover:text-primary transition-colors">
                {WORKSPACE_BUNDLE.items[2].name}
              </span>
              <span className="text-xs font-bold text-primary font-heading">
                ₹{Math.round(WORKSPACE_BUNDLE.items[2].price * 85).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Total Price & Add All to Cart Button */}
          <div className="flex flex-col items-center lg:items-end justify-center shrink-0 border-t lg:border-t-0 lg:border-l border-slate-300 pt-3 lg:pt-0 lg:pl-6 w-full lg:w-auto">
            <div className="text-xs text-text-muted">Total Price for all 3 items:</div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="text-xs align-super font-bold">₹</span>
              <span className="text-3xl font-bold font-heading text-text-dark">2,16,747</span>
              <span className="text-xs text-badge-deal font-bold ml-2">(Bundle Savings: ₹6,800)</span>
            </div>

            <button
              id="bundle-add-all-btn"
              onClick={handleAddAll}
              className={`w-full sm:w-auto px-6 py-2.5 ${
                isAdded ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark border-[#fcd200]'
              } font-bold text-xs rounded-full border shadow active:scale-95 transition-all uppercase tracking-wide flex items-center justify-center gap-1 cursor-pointer`}
            >
              {isAdded ? (
                <>
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  All 3 Added to Cart!
                </>
              ) : (
                'Add all three to Cart'
              )}
            </button>

            <span className="text-[11px] text-text-muted mt-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">
                check_circle
              </span>
              One-click 3-Year Unified Warranty Included
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
