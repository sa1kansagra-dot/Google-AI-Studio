import React from 'react';
import { ASSET_IMAGES } from '../data/products';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-2xl max-w-2xl w-full p-6 z-10 border border-slate-300 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">local_shipping</span>
            <h3 className="font-heading font-bold text-base text-text-dark">
              Your Hardware Orders & Serial Tracking
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-4">
          {/* Active Order Card */}
          <div className="border border-slate-300 rounded-lg overflow-hidden bg-slate-50/50">
            <div className="bg-slate-100 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-gray-700 border-b border-slate-200">
              <div className="flex gap-4">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-mono">Order Placed</span>
                  <span className="font-semibold">Today, 8:42 AM</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-mono">Total</span>
                  <span className="font-semibold">₹3,18,748</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-mono">Ship To</span>
                  <span className="font-semibold">Austin, TX 78701</span>
                </div>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-mono">Order #</span>
                <span className="font-mono font-bold text-gray-900">PCW-8492019-748</span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Out for Delivery • Expected by 2:00 PM Today</span>
              </div>

              {/* Progress Tracker */}
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono py-2 border-y border-gray-200">
                <div className="text-emerald-700 font-bold">
                  <div className="h-1.5 bg-emerald-600 rounded-full mb-1"></div>
                  1. Binning Pass
                </div>
                <div className="text-emerald-700 font-bold">
                  <div className="h-1.5 bg-emerald-600 rounded-full mb-1"></div>
                  2. Austin Cleanroom
                </div>
                <div className="text-emerald-700 font-bold">
                  <div className="h-1.5 bg-emerald-600 rounded-full mb-1"></div>
                  3. In Transit
                </div>
                <div className="text-primary font-bold">
                  <div className="h-1.5 bg-primary rounded-full mb-1 animate-pulse"></div>
                  4. FastPass Courier
                </div>
              </div>

              {/* Order Items */}
              <div className="flex gap-3 items-center pt-2">
                <div className="w-16 h-16 bg-slate-900 rounded p-1 flex items-center justify-center border border-slate-200 shrink-0">
                  <img
                    alt="ROG Strix Scar 18"
                    className="max-h-full object-contain"
                    src={ASSET_IMAGES.laptopBase}
                  />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <h5 className="font-semibold text-gray-900 truncate">
                    ASUS ROG Strix Scar 18 (2025) 18" 2.5K 240Hz Nebula HDR
                  </h5>
                  <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                    Serial: SN-ASUS-99482918 | 3-Year Unified Warranty
                  </div>
                  <div className="flex gap-2 mt-1">
                    <button className="text-[10px] text-primary hover:underline font-bold">
                      View Silicon Certificate
                    </button>
                    <span className="text-gray-300">•</span>
                    <button className="text-[10px] text-tertiary hover:underline font-bold">
                      Track Live GPS Courier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
