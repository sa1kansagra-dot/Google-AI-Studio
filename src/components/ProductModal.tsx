import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, appliedCoupon?: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [couponChecked, setCouponChecked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product, couponChecked && product.coupon ? product.coupon : undefined);
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
              PCWARE Verified Hardware Details
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
                    {Math.round(product.price * 85).toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-text-muted line-through ml-3">
                      List: ₹{Math.round(product.originalPrice * 85).toLocaleString('en-IN')}
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
                      Add to Cart (₹{Math.round(((product.price - (couponChecked && product.coupon ? product.coupon : 0)) * quantity) * 85).toLocaleString('en-IN')})
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
