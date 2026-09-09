import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, appliedCoupon?: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onSelectProduct,
}) => {
  const [couponChecked, setCouponChecked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const formatPrice = (price: number) => {
    const inr = Math.round(price * 85);
    return {
      whole: inr.toLocaleString('en-IN'),
      cents: '00',
    };
  };

  const { whole, cents } = formatPrice(product.price);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, couponChecked && product.coupon ? product.coupon : undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const getBadgeStyle = (badgeColor?: string) => {
    switch (badgeColor) {
      case 'deal':
        return 'bg-badge-deal text-white';
      case 'primary':
        return 'bg-primary text-white';
      case 'dark':
        return 'bg-slate-800 text-white';
      case 'emerald':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-badge-deal text-white';
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="border border-slate-200 hover:border-gray-400 p-3 sm:p-3.5 rounded flex flex-col justify-between bg-white hover:shadow-md transition-all group cursor-pointer"
    >
      <div>
        {/* Product Image Stage */}
        <div
          className={`relative w-full ${
            product.category === 'cpu' ? 'h-44 bg-slate-950 p-2' : 'h-40 bg-slate-900'
          } rounded overflow-hidden flex items-center justify-center mb-2.5`}
        >
          <img
            alt={product.title}
            className={`w-full h-full ${
              product.category === 'cpu' ? 'object-contain' : 'object-cover'
            } group-hover:scale-105 transition-transform duration-300`}
            src={product.image}
          />

          {/* Top Left Badge */}
          {product.badge && (
            <span
              className={`absolute top-1.5 left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm ${getBadgeStyle(
                product.badgeColor
              )}`}
            >
              {product.badge}
            </span>
          )}

          {/* Top Right Sub-badge */}
          {product.subBadge && (
            <span className="absolute top-1.5 right-1.5 bg-slate-800 text-amber-400 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-slate-700">
              {product.subBadge}
            </span>
          )}
        </div>

        {/* Subtitle / Socket Info if applicable */}
        {product.socketOrFormFactor && (
          <div className="text-[11px] text-text-muted font-mono uppercase tracking-wider mb-0.5 truncate">
            {product.socketOrFormFactor}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xs text-text-dark font-semibold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Spec Chips (if any) */}
        {product.specChips && product.specChips.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {product.specChips.slice(0, 3).map((chip, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] text-gray-700 font-mono"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Star Rating & Count */}
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[15px]"
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
          <span className="text-xs text-tertiary font-medium">{product.reviewsCount}</span>
        </div>

        {/* Bought past month count */}
        <div className="text-[11px] text-text-muted mt-0.5">{product.boughtPastMonth}</div>

        {/* Amazon-style Price formatting */}
        <div className="mt-2 flex items-baseline gap-0.5">
          <span className="text-xs align-super font-bold text-text-dark">₹</span>
          <span className="text-2xl font-bold font-heading text-text-dark">{whole}</span>
          {product.originalPrice && (
            <span className="text-xs text-text-muted line-through ml-2">
              ₹{Math.round(product.originalPrice * 85).toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Coupon Checkbox */}
        {product.coupon && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold mt-1"
          >
            <input
              id={`coupon-${product.id}`}
              type="checkbox"
              checked={couponChecked}
              onChange={(e) => setCouponChecked(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-0 cursor-pointer h-3.5 w-3.5 border-gray-300 accent-emerald-600"
            />
            <label htmlFor={`coupon-${product.id}`} className="cursor-pointer">
              Apply <strong>₹{Math.round(product.coupon * 85).toLocaleString('en-IN')} coupon</strong> at checkout
            </label>
          </div>
        )}

        {/* Shipping badge */}
        <div className="flex items-center gap-1 text-[11px] text-gray-600 mt-1">
          <span className="text-tertiary font-bold">{product.shipping}</span>
          <span>{product.shippingSpeed}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        id={`add-to-cart-btn-${product.id}`}
        onClick={handleAdd}
        className={`mt-3 w-full py-1.5 ${
          isAdded ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark border-[#fcd200]'
        } font-medium text-xs rounded-full border shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1`}
      >
        {isAdded ? (
          <>
            <span className="material-symbols-outlined text-[16px]">check</span>
            Added to Cart!
          </>
        ) : (
          'Add to Cart'
        )}
      </button>
    </div>
  );
};
