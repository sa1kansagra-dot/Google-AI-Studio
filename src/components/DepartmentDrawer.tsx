import React from 'react';

interface DepartmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: 'all' | 'laptop' | 'cpu' | 'deals') => void;
  onOpenConfigurator: () => void;
  onOpenTechDesk: () => void;
}

export const DepartmentDrawer: React.FC<DepartmentDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenConfigurator,
  onOpenTechDesk,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col">
          {/* Top User Greeting */}
          <div className="bg-[#131921] text-white px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-400">account_circle</span>
              <span className="font-heading font-bold text-sm">Hello, Sign In</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs text-gray-800">
            {/* Trending Hardware Section */}
            <div>
              <h4 className="font-heading font-bold text-sm text-gray-900 uppercase tracking-wider mb-2 text-primary">
                Trending Hardware & Deals
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('deals');
                      onClose();
                    }}
                    className="w-full text-left py-1 text-gray-700 hover:text-primary font-medium flex items-center justify-between"
                  >
                    <span>Today's Hardware Deals (Flash Discounts)</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('laptop');
                      onClose();
                    }}
                    className="w-full text-left py-1 text-gray-700 hover:text-primary font-medium flex items-center justify-between"
                  >
                    <span>High-Performance Laptops (RTX 40-Series)</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('cpu');
                      onClose();
                    }}
                    className="w-full text-left py-1 text-gray-700 hover:text-primary font-medium flex items-center justify-between"
                  >
                    <span>Desktop CPUs (Intel 14th Gen & Ryzen 3D)</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Shop By Silicon Category */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-heading font-bold text-sm text-gray-900 uppercase tracking-wider mb-2">
                Shop By Department
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('laptop');
                      onClose();
                    }}
                    className="w-full text-left py-1 text-gray-700 hover:text-primary flex items-center justify-between"
                  >
                    <span>Gaming Laptops & OLED Ultrabooks</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('cpu');
                      onClose();
                    }}
                    className="w-full text-left py-1 text-gray-700 hover:text-primary flex items-center justify-between"
                  >
                    <span>CPUs, APUs & Sockets (AM5 / LGA1700)</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onOpenConfigurator();
                      onClose();
                    }}
                    className="w-full text-left py-1 text-gray-700 hover:text-primary flex items-center justify-between"
                  >
                    <span>Prebuilt Titan Workstations & Custom Rigs</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onSelectCategory('all');
                      onClose();
                    }}
                    className="w-full text-left py-1 text-gray-700 hover:text-primary flex items-center justify-between"
                  >
                    <span>High-Speed Gen 4 & Gen 5 NVMe SSDs</span>
                    <span className="material-symbols-outlined text-[16px] text-gray-400">chevron_right</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Hardware Services & Tools */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-heading font-bold text-sm text-gray-900 uppercase tracking-wider mb-2">
                Lab Tools & Diagnostics
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      onOpenConfigurator();
                      onClose();
                    }}
                    className="w-full text-left py-1 text-gray-700 hover:text-primary font-semibold flex items-center justify-between"
                  >
                    <span>Custom PC Configurator & Wattage Meter</span>
                    <span className="material-symbols-outlined text-[16px] text-primary">tune</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onOpenTechDesk();
                      onClose();
                    }}
                    className="w-full text-left py-1 text-gray-700 hover:text-primary font-semibold flex items-center justify-between"
                  >
                    <span>24/7 Expert Silicon Diagnostic Chat</span>
                    <span className="material-symbols-outlined text-[16px] text-primary">headset_mic</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
