import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'processing' | 'success'>('cart');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.product.price;
    const discount = item.appliedCoupon || 0;
    return acc + (itemPrice - discount) * item.quantity;
  }, 0);

  const totalSavings = cartItems.reduce((acc, item) => {
    const original = item.product.originalPrice || item.product.price;
    const discount = item.appliedCoupon || 0;
    const diff = (original - item.product.price + discount) * item.quantity;
    return acc + Math.max(0, diff);
  }, 0);

  const handleCheckout = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setOrderNumber(`PCW-${Math.floor(1000000 + Math.random() * 9000000)}`);
      setCheckoutStep('success');
      onClearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-[#131921] text-white px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-400">shopping_cart</span>
              <h2 className="font-heading font-bold text-base">
                Shopping Cart ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items)
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-800"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {checkoutStep === 'processing' && (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div className="font-heading font-bold text-lg text-text-dark">
                  Verifying Silicon Binning & Allocation...
                </div>
                <p className="text-xs text-text-muted max-w-xs">
                  Reserving boxed silicon serials and scheduling FastPass priority courier dispatch.
                </p>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-text-dark">
                  Order Successfully Placed!
                </h3>
                <div className="font-mono text-xs bg-slate-100 px-3 py-1.5 rounded text-gray-700 border border-slate-200">
                  Tracking #: <strong>{orderNumber}</strong>
                </div>
                <p className="text-xs text-text-muted max-w-xs leading-relaxed">
                  Your order has been routed to our Austin, TX cleanroom. Free FastPass delivery scheduled for tomorrow.
                </p>
                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="mt-4 px-6 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-full shadow"
                >
                  Continue Browsing Gear
                </button>
              </div>
            )}

            {checkoutStep === 'cart' && cartItems.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                  <span className="material-symbols-outlined text-[36px]">production_quantity_limits</span>
                </div>
                <h3 className="font-heading font-bold text-base text-gray-800">Your Cart is Empty</h3>
                <p className="text-xs text-text-muted max-w-xs">
                  Explore our high-performance laptops, 14th Gen Intel Core Ultra, and AMD 3D V-Cache processors.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark text-xs font-bold rounded-full border border-[#fcd200]"
                >
                  Shop Featured Hardware
                </button>
              </div>
            )}

            {checkoutStep === 'cart' && cartItems.length > 0 && (
              <>
                {/* FastPass Banner */}
                <div className="bg-orange-50 border border-orange-200 rounded p-2.5 flex items-center gap-2 text-xs text-primary font-semibold">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>Eligible for FREE FastPass Next-Day Delivery</span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="py-3 flex gap-3">
                      <div className="w-20 h-20 bg-slate-900 rounded p-1 shrink-0 flex items-center justify-center border border-slate-200">
                        <img
                          alt={item.product.title}
                          className="max-h-full object-contain"
                          src={item.product.image}
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-semibold text-text-dark line-clamp-2 leading-snug">
                            {item.product.title}
                          </h4>
                          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                            In Stock • 3-Year Warranty
                          </div>
                          {item.appliedCoupon && (
                            <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                              ${item.appliedCoupon} Coupon Applied
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-300 rounded bg-gray-50">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-bold font-mono">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <span className="text-xs font-bold font-heading text-text-dark">
                              ${((item.product.price - (item.appliedCoupon || 0)) * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="block text-[10px] text-tertiary hover:underline mt-0.5 ml-auto"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer / Summary */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>Shipping (FastPass)</span>
                  <span className="font-bold">FREE</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-badge-deal font-semibold">
                    <span>Total Savings</span>
                    <span>-${totalSavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 flex justify-between font-heading font-bold text-sm text-text-dark">
                  <span>Estimated Total</span>
                  <span className="text-base text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                id="cart-checkout-btn"
                onClick={handleCheckout}
                className="w-full py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark font-bold text-xs rounded-full border border-[#fcd200] shadow active:scale-98 transition-all uppercase tracking-wide cursor-pointer"
              >
                Proceed to Checkout ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items)
              </button>

              <div className="text-center text-[10px] text-gray-500">
                🔒 Safe & Encrypted 256-Bit Silicon Hardware Checkout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
