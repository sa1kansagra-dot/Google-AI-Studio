import React, { useState } from 'react';
import { Product } from '../types';
import { ASSET_IMAGES, LAPTOP_PRODUCTS } from '../data/products';

interface ConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomBuildToCart: (customRig: Product) => void;
}

const CPU_OPTIONS = [
  { id: '7800x3d', name: 'AMD Ryzen 7 7800X3D (8C/16T, 3D V-Cache)', socket: 'AM5', price: 449.99, watts: 120 },
  { id: '14900k', name: 'Intel Core i9-14900K (24C/32T, 6.0 GHz Boost)', socket: 'LGA1700', price: 539.00, watts: 253 },
  { id: '7950x3d', name: 'AMD Ryzen 9 7950X3D (16C/32T, 144MB Cache)', socket: 'AM5', price: 619.99, watts: 120 },
  { id: '14700k', name: 'Intel Core i7-14700K (20C/28T, 5.6 GHz)', socket: 'LGA1700', price: 389.99, watts: 220 },
];

const GPU_OPTIONS = [
  { id: 'rtx4090', name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X', price: 1899.99, watts: 450 },
  { id: 'rtx4080s', name: 'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X', price: 1049.99, watts: 320 },
  { id: 'rtx4070ti', name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB', price: 799.99, watts: 285 },
];

const DESKTOP_RAM_OPTIONS = [
  { id: 'ram32', name: '32GB (2x16GB) G.Skill Flare X5 DDR5-6000 CL30', price: 119.99, watts: 15 },
  { id: 'ram64', name: '64GB (2x32GB) Corsair Vengeance DDR5-6400 CL32', price: 219.99, watts: 25 },
];

const DESKTOP_STORAGE_OPTIONS = [
  { id: 'ssd2tb', name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe (7,450 MB/s)', price: 179.99, watts: 10 },
  { id: 'ssd4tb', name: 'Crucial T700 4TB PCIe 5.0 NVMe (12,400 MB/s)', price: 429.99, watts: 15 },
];

const LAPTOP_RAM_UPGRADES = [
  { id: 'l-ram-base', name: 'Standard Factory RAM', price: 0, label: 'Factory Included' },
  { id: 'l-ram-32gb', name: '32GB DDR5 5600MHz Dual-Channel', price: 70, label: '+ ₹5,950 ($70)' },
  { id: 'l-ram-64gb', name: '64GB DDR5 5600MHz Pro Extreme', price: 170, label: '+ ₹14,450 ($170)' },
];

const LAPTOP_SSD_UPGRADES = [
  { id: 'l-ssd-base', name: 'Standard Factory NVMe SSD', price: 0, label: 'Factory Included' },
  { id: 'l-ssd-2tb', name: '2TB PCIe 4.0 NVMe (7,450 MB/s Speed)', price: 90, label: '+ ₹7,650 ($90)' },
  { id: 'l-ssd-4tb', name: '4TB PCIe 4.0 Ultra NVMe RAID Expansion', price: 220, label: '+ ₹18,700 ($220)' },
];

export const ConfiguratorModal: React.FC<ConfiguratorModalProps> = ({
  isOpen,
  onClose,
  onAddCustomBuildToCart,
}) => {
  const [configType, setConfigType] = useState<'laptop' | 'desktop'>('laptop');

  // Desktop Rig State
  const [selectedCpu, setSelectedCpu] = useState(CPU_OPTIONS[0]);
  const [selectedGpu, setSelectedGpu] = useState(GPU_OPTIONS[0]);
  const [selectedDesktopRam, setSelectedDesktopRam] = useState(DESKTOP_RAM_OPTIONS[0]);
  const [selectedDesktopStorage, setSelectedDesktopStorage] = useState(DESKTOP_STORAGE_OPTIONS[0]);

  // Laptop Config State
  const [selectedLaptop, setSelectedLaptop] = useState<Product>(LAPTOP_PRODUCTS[0]);
  const [selectedLaptopRam, setSelectedLaptopRam] = useState(LAPTOP_RAM_UPGRADES[0]);
  const [selectedLaptopSsd, setSelectedLaptopSsd] = useState(LAPTOP_SSD_UPGRADES[0]);

  if (!isOpen) return null;

  // Desktop calculations
  const totalWatts = selectedCpu.watts + selectedGpu.watts + selectedDesktopRam.watts + selectedDesktopStorage.watts + 80;
  const recommendedPsu = totalWatts > 650 ? 1000 : 850;
  const desktopTotalPrice = selectedCpu.price + selectedGpu.price + selectedDesktopRam.price + selectedDesktopStorage.price + 280;

  // Laptop calculations
  const laptopTotalPrice = selectedLaptop.price + selectedLaptopRam.price + selectedLaptopSsd.price;

  const handleAddDesktopRig = () => {
    const customRig: Product = {
      id: `custom-rig-${Date.now()}`,
      category: 'desktop',
      title: `PCWARE Custom Lab Rig (${selectedCpu.name.split(' ')[2]} + ${selectedGpu.name.split(' ')[2]} ${selectedGpu.name.split(' ')[3]})`,
      subtitle: `Assembled & bench-tested in Austin, TX with ${selectedCpu.socket} socket verification`,
      image: ASSET_IMAGES.titanRig,
      price: desktopTotalPrice,
      originalPrice: desktopTotalPrice + 200,
      badge: 'Custom Rig',
      badgeColor: 'primary',
      rating: 5.0,
      reviewsCount: 1,
      boughtPastMonth: 'Custom bench assembled',
      shipping: 'PCWARE White-Glove Hand Delivery',
      shippingSpeed: 'FREE Scheduled Delivery',
      inStock: true,
      tdpWattage: totalWatts,
      specChips: [`${totalWatts}W Est. Power`, selectedCpu.socket, '3-Year Warranty'],
      specs: [
        { label: 'CPU', value: selectedCpu.name },
        { label: 'GPU', value: selectedGpu.name },
        { label: 'Memory', value: selectedDesktopRam.name },
        { label: 'Storage', value: selectedDesktopStorage.name },
        { label: 'Power Supply', value: `${recommendedPsu}W ATX 3.0 Gold Certified` },
      ],
    };
    onAddCustomBuildToCart(customRig);
    onClose();
  };

  const handleAddUpgradedLaptop = () => {
    const upgradedLaptop: Product = {
      ...selectedLaptop,
      id: `${selectedLaptop.id}-customized-${Date.now()}`,
      title: `${selectedLaptop.title} (Upgraded: ${selectedLaptopRam.price > 0 ? selectedLaptopRam.name : 'Base RAM'} + ${selectedLaptopSsd.price > 0 ? selectedLaptopSsd.name : 'Base SSD'})`,
      price: laptopTotalPrice,
      badge: 'Custom Laptop',
      badgeColor: 'emerald',
      specChips: [
        ...(selectedLaptop.specChips || []),
        ...(selectedLaptopRam.price > 0 ? [selectedLaptopRam.name.split(' ')[0]] : []),
        ...(selectedLaptopSsd.price > 0 ? [selectedLaptopSsd.name.split(' ')[0] + ' SSD'] : []),
      ],
      specs: [
        ...selectedLaptop.specs,
        { label: 'RAM Upgrade Option', value: selectedLaptopRam.name },
        { label: 'SSD Upgrade Option', value: selectedLaptopSsd.name },
        { label: 'Booking Status', value: 'Lab Custom Assembled & Bench Tested' }
      ],
    };
    onAddCustomBuildToCart(upgradedLaptop);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto z-10 border border-slate-300">
        {/* Header */}
        <div className="sticky top-0 bg-[#131921] text-white px-5 py-3 flex items-center justify-between z-20 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-400">tune</span>
            <h3 className="font-heading font-bold text-sm">
              PCWARE Hardware Configurator & Upgrade Booking Portal
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-800">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Top Switcher Tabs */}
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-2 font-bold text-xs">
            <button
              type="button"
              onClick={() => setConfigType('laptop')}
              className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
                configType === 'laptop'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">laptop_mac</span>
              Laptop RAM & SSD Upgrade Booking
            </button>
            <button
              type="button"
              onClick={() => setConfigType('desktop')}
              className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center gap-2 ${
                configType === 'desktop'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-slate-200'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
              Desktop Custom PC Rig Builder
            </button>
          </div>

          {/* LAPTOP CONFIGURATOR MODE */}
          {configType === 'laptop' && (
            <div className="space-y-5">
              {/* Laptop Telemetry Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-indigo-500/40">
                <div>
                  <div className="text-[11px] text-indigo-300 font-mono font-bold uppercase tracking-wider">
                    Selected Base Laptop
                  </div>
                  <div className="text-base font-bold font-heading text-white line-clamp-1">
                    {selectedLaptop.title}
                  </div>
                  <div className="text-xs text-gray-300 font-mono mt-0.5">
                    Base Specs: {selectedLaptop.specs.find(s => s.label === 'Memory')?.value || '32GB RAM'} • {selectedLaptop.specs.find(s => s.label === 'Storage')?.value || '1TB NVMe'}
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-indigo-900/80 border border-indigo-400/50 px-3 py-2 rounded-lg text-amber-300 text-xs font-bold font-mono shrink-0">
                  <span className="material-symbols-outlined text-[18px] text-emerald-400">verified</span>
                  <span>Austin Lab Factory Upgrade Telemetry Passed</span>
                </div>
              </div>

              {/* Laptop Upgrade Selection Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Step 1: Select Laptop Model */}
                <div className="border border-slate-200 rounded-xl p-3.5 space-y-2.5 bg-white shadow-sm">
                  <span className="font-bold text-gray-800 flex items-center gap-1.5 text-xs">
                    <span className="material-symbols-outlined text-[18px] text-indigo-600">laptop</span>
                    1. Select Laptop Model
                  </span>
                  <div className="space-y-1.5">
                    {LAPTOP_PRODUCTS.map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setSelectedLaptop(l)}
                        className={`w-full p-2.5 rounded-lg text-left border transition-all ${
                          selectedLaptop.id === l.id
                            ? 'border-indigo-600 bg-indigo-50/70 font-bold text-indigo-950 shadow-sm'
                            : 'border-gray-200 hover:border-indigo-300 text-gray-700'
                        }`}
                      >
                        <div className="font-semibold line-clamp-1 text-[11px]">{l.title}</div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-[10px] text-gray-500 font-mono">{l.specs[1]?.value.split(' ')[0]}</span>
                          <span className="font-mono text-xs font-bold text-indigo-700">₹{Math.round(l.price * 85).toLocaleString('en-IN')}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: System Memory (RAM) Upgrade */}
                <div className="border border-slate-200 rounded-xl p-3.5 space-y-2.5 bg-white shadow-sm">
                  <span className="font-bold text-gray-800 flex items-center gap-1.5 text-xs">
                    <span className="material-symbols-outlined text-[18px] text-indigo-600">memory</span>
                    2. RAM Upgrade Option
                  </span>
                  <div className="space-y-2">
                    {LAPTOP_RAM_UPGRADES.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedLaptopRam(r)}
                        className={`w-full p-3 rounded-lg text-left border transition-all ${
                          selectedLaptopRam.id === r.id
                            ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-md'
                            : 'border-gray-200 hover:border-indigo-300 text-gray-800 bg-white'
                        }`}
                      >
                        <div className="font-bold text-xs">{r.name}</div>
                        <div className={`text-[11px] font-mono mt-1 ${selectedLaptopRam.id === r.id ? 'text-amber-300' : 'text-indigo-600 font-semibold'}`}>
                          {r.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: NVMe SSD Storage Upgrade */}
                <div className="border border-slate-200 rounded-xl p-3.5 space-y-2.5 bg-white shadow-sm">
                  <span className="font-bold text-gray-800 flex items-center gap-1.5 text-xs">
                    <span className="material-symbols-outlined text-[18px] text-indigo-600">hard_drive</span>
                    3. SSD Storage Upgrade
                  </span>
                  <div className="space-y-2">
                    {LAPTOP_SSD_UPGRADES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedLaptopSsd(s)}
                        className={`w-full p-3 rounded-lg text-left border transition-all ${
                          selectedLaptopSsd.id === s.id
                            ? 'border-indigo-600 bg-indigo-600 text-white font-bold shadow-md'
                            : 'border-gray-200 hover:border-indigo-300 text-gray-800 bg-white'
                        }`}
                      >
                        <div className="font-bold text-xs">{s.name}</div>
                        <div className={`text-[11px] font-mono mt-1 ${selectedLaptopSsd.id === s.id ? 'text-amber-300' : 'text-indigo-600 font-semibold'}`}>
                          {s.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Laptop Config Summary & Checkout */}
              <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-gray-500 font-mono">
                    Total Booking Price (Base Laptop + RAM & SSD Upgrades):
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold">₹</span>
                    <span className="text-3xl font-bold font-heading text-text-dark">
                      {Math.round(laptopTotalPrice * 85).toLocaleString('en-IN')}
                    </span>
                    {(selectedLaptopRam.price > 0 || selectedLaptopSsd.price > 0) && (
                      <span className="text-xs text-indigo-700 font-bold ml-2 font-mono">
                        (Includes ₹{Math.round((selectedLaptopRam.price + selectedLaptopSsd.price) * 85).toLocaleString('en-IN')} Upgrade Modules)
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddUpgradedLaptop}
                  className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full shadow-lg active:scale-95 transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Book Upgraded Laptop & Add to Cart
                </button>
              </div>
            </div>
          )}

          {/* DESKTOP CONFIGURATOR MODE */}
          {configType === 'desktop' && (
            <div className="space-y-5">
              {/* Wattage & Compatibility Live Banner */}
              <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-700">
                <div>
                  <div className="text-xs text-gray-400 font-mono">ESTIMATED SYSTEM WATTAGE</div>
                  <div className="text-2xl font-bold font-mono text-orange-400">
                    {totalWatts}W <span className="text-xs font-normal text-gray-400">/ {recommendedPsu}W PSU Recommended</span>
                  </div>
                  <div className="w-48 bg-slate-800 rounded-full h-2 mt-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all"
                      style={{ width: `${Math.min(100, (totalWatts / recommendedPsu) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/50 px-3 py-2 rounded-lg text-emerald-400 text-xs font-bold font-mono">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>100% IPC Compatibility Verified (Socket {selectedCpu.socket})</span>
                </div>
              </div>

              {/* Component Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* CPU Select */}
                <div className="border border-slate-200 rounded-xl p-3 space-y-2 bg-white shadow-sm">
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">memory</span>
                    1. Processor (CPU)
                  </span>
                  <div className="space-y-1.5">
                    {CPU_OPTIONS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCpu(c)}
                        className={`w-full p-2 rounded text-left border transition-all ${
                          selectedCpu.id === c.id
                            ? 'border-primary bg-orange-50/60 font-bold text-primary'
                            : 'border-gray-200 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span>{c.name}</span>
                          <span className="font-mono text-gray-900">₹{Math.round(c.price * 85).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono">
                          Socket {c.socket} • {c.watts}W TDP
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* GPU Select */}
                <div className="border border-slate-200 rounded-xl p-3 space-y-2 bg-white shadow-sm">
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">speed</span>
                    2. Graphics Card (GPU)
                  </span>
                  <div className="space-y-1.5">
                    {GPU_OPTIONS.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => setSelectedGpu(g)}
                        className={`w-full p-2 rounded text-left border transition-all ${
                          selectedGpu.id === g.id
                            ? 'border-primary bg-orange-50/60 font-bold text-primary'
                            : 'border-gray-200 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span>{g.name}</span>
                          <span className="font-mono text-gray-900">₹{Math.round(g.price * 85).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono">{g.watts}W TGP</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* RAM Select */}
                <div className="border border-slate-200 rounded-xl p-3 space-y-2 bg-white shadow-sm">
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">layers</span>
                    3. System Memory (RAM)
                  </span>
                  <div className="space-y-1.5">
                    {DESKTOP_RAM_OPTIONS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedDesktopRam(r)}
                        className={`w-full p-2 rounded text-left border transition-all ${
                          selectedDesktopRam.id === r.id
                            ? 'border-primary bg-orange-50/60 font-bold text-primary'
                            : 'border-gray-200 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span>{r.name}</span>
                          <span className="font-mono text-gray-900">₹{Math.round(r.price * 85).toLocaleString('en-IN')}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Select */}
                <div className="border border-slate-200 rounded-xl p-3 space-y-2 bg-white shadow-sm">
                  <span className="font-bold text-gray-800 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">hard_drive</span>
                    4. Primary NVMe Storage
                  </span>
                  <div className="space-y-1.5">
                    {DESKTOP_STORAGE_OPTIONS.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedDesktopStorage(s)}
                        className={`w-full p-2 rounded text-left border transition-all ${
                          selectedDesktopStorage.id === s.id
                            ? 'border-primary bg-orange-50/60 font-bold text-primary'
                            : 'border-gray-200 hover:border-gray-400 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between">
                          <span>{s.name}</span>
                          <span className="font-mono text-gray-900">₹{Math.round(s.price * 85).toLocaleString('en-IN')}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Total & Add to Cart */}
              <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-gray-500">
                    Includes Chassis, 360mm AIO Cooler, {recommendedPsu}W Gold PSU, Assembly & 72-hr Stress Testing:
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold">₹</span>
                    <span className="text-3xl font-bold font-heading text-text-dark">
                      {Math.round(desktopTotalPrice * 85).toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-badge-deal font-bold ml-2">
                      (Includes 3-Year Unified Warranty)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddDesktopRig}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark font-bold text-xs rounded-full border border-[#fcd200] shadow active:scale-95 transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Add Configured Rig to Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
