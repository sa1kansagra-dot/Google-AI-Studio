import React from 'react';

interface TrustStripProps {
  onOpenTechDesk?: () => void;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ onOpenTechDesk }) => {
  return (
    <section className="max-w-[1480px] mx-auto px-4 mt-6">
      <div className="bg-white rounded p-6 shadow-sm border border-border-subtle">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Trust 1 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">local_shipping</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-text-dark">Fast & Free Delivery</h3>
              <p className="text-xs text-text-muted">
                On all orders $35+ and same-day dispatch on stock CPUs & laptops.
              </p>
            </div>
          </div>

          {/* Trust 2 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">assignment_return</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-text-dark">30-Day Easy Returns</h3>
              <p className="text-xs text-text-muted">
                Zero restocking fees on boxed processors and creator laptops.
              </p>
            </div>
          </div>

          {/* Trust 3 */}
          <div
            onClick={onOpenTechDesk}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-primary shrink-0 group-hover:bg-orange-100 transition-colors">
              <span className="material-symbols-outlined text-[26px]">support_agent</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-text-dark group-hover:text-primary transition-colors flex items-center gap-1">
                24/7 Tech Expert Support
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </h3>
              <p className="text-xs text-text-muted">
                Direct phone and chat with IPC-certified computer technicians.
              </p>
            </div>
          </div>

          {/* Trust 4 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">verified_user</span>
            </div>
            <div>
              <h3 className="font-bold text-sm text-text-dark">IPC / OEM Certified</h3>
              <p className="text-xs text-text-muted">
                Factory authorized retailer for Intel, AMD, ASUS, NVIDIA, and Razer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
