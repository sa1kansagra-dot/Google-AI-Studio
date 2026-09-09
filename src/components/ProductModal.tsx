import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, appliedCoupon?: number) => void;
}

const RAM_UPGRADES = [
  { id: 'ram-base', label: 'Standard Factory RAM', addPrice: 0, tag: 'Included' },
  { id: 'ram-32gb', label: '32GB DDR5 5600MHz Dual-Channel', addPrice: 70, tag: '+ ₹5,950' },
  { id: 'ram-64gb', label: '64GB DDR5 5600MHz Extreme', addPrice: 170, tag: '+ ₹14,450' },
];

const SSD_UPGRADES = [
  { id: 'ssd-base', label: 'Standard Factory NVMe SSD', addPrice: 0, tag: 'Included' },
  { id: 'ssd-2tb', label: '2TB PCIe 4.0 NVMe (7,450 MB/s)', addPrice: 90, tag: '+ ₹7,650' },
  { id: 'ssd-4tb', label: '4TB PCIe 4.0 Ultra NVMe RAID', addPrice: 220, tag: '+ ₹18,700' },
];

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [couponChecked, setCouponChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const [selectedRam, setSelectedRam] = useState(RAM_UPGRADES[0]);
  const [selectedSsd, setSelectedSsd] = useState(SSD_UPGRADES[0]);

  if (!product) return null;

  const isLaptop = product.category === 'laptop';
  const upgradeCost = isLaptop ? (selectedRam.addPrice + selectedSsd.addPrice) : 0;
  const effectiveUnitPrice = product.price + upgradeCost;

  const handleAdd = () => {
    const finalProduct: Product = (isLaptop && (selectedRam.addPrice > 0 || selectedSsd.addPrice > 0)) ? {
      ...product,
      id: `${product.id}-upgraded-${Date.now()}`,
      title: `${product.title} (Upgraded: ${selectedRam.addPrice > 0 ? selectedRam.label : 'Base RAM'} + ${selectedSsd.addPrice > 0 ? selectedSsd.label : 'Base SSD'})`,
      price: effectiveUnitPrice,
      specChips: [
        ...(product.specChips || []),
        ...(selectedRam.addPrice > 0 ? [selectedRam.label.split(' ')[0] + ' ' + selectedRam.label.split(' ')[1]] : []),
        ...(selectedSsd.addPrice > 0 ? [selectedSsd.label.split(' ')[0] + ' SSD'] : []),
      ],
      specs: [
        ...product.specs,
        ...(selectedRam.addPrice > 0 ? [{ label: 'RAM Upgrade', value: selectedRam.label }] : []),
        ...(selectedSsd.addPrice > 0 ? [{ label: 'SSD Upgrade', value: selectedSsd.label }] : []),
      ],
    } : product;

    for (let i = 0; i < quantity; i++) {
      onAddToCart(finalProduct, couponChecked && product.coupon ? product.coupon : undefined);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 border border-slate-300">
        {/* Header Bar */}
        <div className="sticky top-0 bg-[#131921] text-white px-5 py-3 flex items-center justify-between z-20 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-400">memory</span>
            <h3 className="font-heading font-bold text-sm truncate max-w-md">
              PCWARE Verified Hardware Details {isLaptop && '& Booking Configurator'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-800"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Product Image & Badges */}
            <div>
              <div className="relative bg-white rounded-2xl p-4 flex items-center justify-center aspect-square border border-slate-200 shadow-sm">
                <img
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                  src={product.image}
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-badge-deal text-white text-xs font-bold px-2 py-0.5 rounded shadow">
                    {product.badge}
                  </span>
                )}
                {product.subBadge && (
                  <span className="absolute top-3 right-3 bg-slate-800 text-amber-400 font-mono text-xs font-bold px-2 py-0.5 rounded shadow border border-slate-700">
                    {product.subBadge}
                  </span>
                )}
              </div>

              {/* Silicon Telemetry Box */}
              <div className="mt-4 bg-slate-50 border border-slate-200 rounded p-3 text-xs space-y-2">
                <div className="font-bold text-gray-800 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Austin Lab Testing Telemetry
                  </span>
                  <span className="font-mono text-[11px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    PASS 100%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 font-mono">
                  <div className="bg-white p-1.5 rounded border border-gray-200">
                    Thermal Margin: <strong>+18°C Headroom</strong>
                  </div>
                  <div className="bg-white p-1.5 rounded border border-gray-200">
                    Binning Tier: <strong>Top 5% Silicon</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info & Purchase Controls */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="font-heading font-bold text-base md:text-lg text-text-dark leading-snug">
                  {product.title}
                </h2>

                {product.subtitle && (
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {product.subtitle}
                  </p>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[16px]"
                        style={{
                          fontVariationSettings:
                            i < Math.floor(product.rating)
                              ? "'FILL' 1"
                              : i === Math.floor(product.rating) && product.rating % 1 !== 0
                              ? "'FILL' 1"
                              : "'FILL' 0",
                        }}
                      >
                        {i < Math.floor(product.rating)
                          ? 'star'
                          : i === Math.floor(product.rating) && product.rating % 1 !== 0
                          ? 'star_half'
                          : 'star'}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-tertiary font-bold">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviewsCount} verified reviews)</span>
                </div>

                <div className="border-t border-gray-200 my-3" />

                {/* Price Display */}
                <div className="flex items-baseline gap-1">
                  <span className="text-xs align-super font-bold">₹</span>
                  <span className="text-3xl font-bold font-heading text-text-dark">
                    {Math.round(effectiveUnitPrice * 85).toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-text-muted line-through ml-3">
                      List: ₹{Math.round((product.originalPrice + upgradeCost) * 85).toLocaleString('en-IN')}
                    </span>
                  )}
                  {upgradeCost > 0 && (
                    <span className="text-[11px] font-bold text-primary bg-amber-100 border border-amber-300 px-2 py-0.5 rounded ml-2 font-mono">
                      (Includes ₹{Math.round(upgradeCost * 85).toLocaleString('en-IN')} Upgrades)
                    </span>
                  )}
                </div>

                {/* Coupon option */}
                {product.coupon && (
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mt-1.5">
                    <input
                      id="modal-coupon-checkbox"
                      type="checkbox"
                      checked={couponChecked}
                      onChange={(e) => setCouponChecked(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-0 cursor-pointer h-4 w-4"
                    />
                    <label htmlFor="modal-coupon-checkbox" className="cursor-pointer">
                      Save extra <strong>₹{Math.round(product.coupon * 85).toLocaleString('en-IN')}</strong> with instant checkout coupon
                    </label>
                  </div>
                )}

                {/* Shipping */}
                <div className="text-xs text-gray-600 mt-2 flex items-center gap-1.5">
                  <span className="text-tertiary font-bold">{product.shipping}</span>
                  <span>• {product.shippingSpeed}</span>
                </div>

                {/* Laptop RAM & SSD Upgrade Booking Options */}
                {isLaptop && (
                  <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-extrabold text-xs text-text-dark flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-primary">tune</span>
                        Laptop RAM & SSD Upgrade Booking Options
                      </span>
                      <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full font-mono">
                        Lab Custom
                      </span>
                    </div>

                    {/* RAM Selection */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">memory</span>
                        System Memory (RAM) Upgrade:
                      </label>
                      <div className="grid grid-cols-1 gap-1.5">
                        {RAM_UPGRADES.map((r) => (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setSelectedRam(r)}
                            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs flex items-center justify-between transition-all ${
                              selectedRam.id === r.id
                                ? 'bg-primary text-white border-primary font-bold shadow-sm'
                                : 'bg-white text-gray-800 border-gray-200 hover:border-orange-300'
                            }`}
                          >
                            <span>{r.label}</span>
                            <span className={`font-mono text-[11px] ${selectedRam.id === r.id ? 'text-amber-300 font-bold' : 'text-gray-500'}`}>
                              {r.tag}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SSD Selection */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">hard_drive</span>
                        NVMe SSD Storage Upgrade:
                      </label>
                      <div className="grid grid-cols-1 gap-1.5">
                        {SSD_UPGRADES.map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setSelectedSsd(s)}
                            className={`px-2.5 py-1.5 rounded-lg border text-left text-xs flex items-center justify-between transition-all ${
                              selectedSsd.id === s.id
                                ? 'bg-primary text-white border-primary font-bold shadow-sm'
                                : 'bg-white text-gray-800 border-gray-200 hover:border-orange-300'
                            }`}
                          >
                            <span>{s.label}</span>
                            <span className={`font-mono text-[11px] ${selectedSsd.id === s.id ? 'text-amber-300 font-bold' : 'text-gray-500'}`}>
                              {s.tag}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Technical Specifications Table */}
                <div className="mt-4 border border-gray-200 rounded overflow-hidden text-xs">
                  <div className="bg-gray-100 px-3 py-1.5 font-bold text-gray-700 font-mono text-[11px]">
                    BENCHMARK & TECHNICAL SPECS
                  </div>
                  <div className="divide-y divide-gray-100">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex px-3 py-1.5 text-xs">
                        <span className="w-1/3 text-gray-500 font-medium">{spec.label}</span>
                        <span className="w-2/3 font-semibold text-gray-800 font-mono text-[11px]">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase Controls */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold font-mono">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  className={`flex-1 py-2.5 ${
                    added ? 'bg-emerald-600 text-white' : 'bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark border-[#fcd200]'
                  } font-bold text-xs rounded-full border shadow transition-all uppercase tracking-wide flex items-center justify-center gap-1.5`}
                >
                  {added ? (
                    <>
                      <span className="material-symbols-outlined text-[16px]">check</span>
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                      Add to Cart (₹{Math.round(((effectiveUnitPrice - (couponChecked && product.coupon ? product.coupon : 0)) * quantity) * 85).toLocaleString('en-IN')})
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
