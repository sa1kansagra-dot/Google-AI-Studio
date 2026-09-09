import React, { useState } from 'react';
import { Product } from '../types';
import { ASSET_IMAGES } from '../data/products';

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

const RAM_OPTIONS = [
  { id: 'ram32', name: '32GB (2x16GB) G.Skill Flare X5 DDR5-6000 CL30', price: 119.99, watts: 15 },
  { id: 'ram64', name: '64GB (2x32GB) Corsair Vengeance DDR5-6400 CL32', price: 219.99, watts: 25 },
];

const STORAGE_OPTIONS = [
  { id: 'ssd2tb', name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe (7,450 MB/s)', price: 179.99, watts: 10 },
  { id: 'ssd4tb', name: 'Crucial T700 4TB PCIe 5.0 NVMe (12,400 MB/s)', price: 429.99, watts: 15 },
];

export const ConfiguratorModal: React.FC<ConfiguratorModalProps> = ({
  isOpen,
  onClose,
  onAddCustomBuildToCart,
}) => {
  const [selectedCpu, setSelectedCpu] = useState(CPU_OPTIONS[0]);
  const [selectedGpu, setSelectedGpu] = useState(GPU_OPTIONS[0]);
  const [selectedRam, setSelectedRam] = useState(RAM_OPTIONS[0]);
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_OPTIONS[0]);

  if (!isOpen) return null;

  const totalWatts = selectedCpu.watts + selectedGpu.watts + selectedRam.watts + selectedStorage.watts + 80; // fans + mb
  const recommendedPsu = totalWatts > 650 ? 1000 : 850;
  const totalPrice = selectedCpu.price + selectedGpu.price + selectedRam.price + selectedStorage.price + 280; // chassis + psu + cooler

  const handleAddToCart = () => {
    const customRig: Product = {
      id: `custom-rig-${Date.now()}`,
      category: 'desktop',
      title: `PCWARE Custom Lab Rig (${selectedCpu.name.split(' ')[2]} + ${selectedGpu.name.split(' ')[2]} ${selectedGpu.name.split(' ')[3]})`,
      subtitle: `Assembled & bench-tested in Austin, TX with ${selectedCpu.socket} socket verification`,
      image: ASSET_IMAGES.titanRig,
      price: totalPrice,
      originalPrice: totalPrice + 200,
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
        { label: 'Memory', value: selectedRam.name },
        { label: 'Storage', value: selectedStorage.name },
        { label: 'Power Supply', value: `${recommendedPsu}W ATX 3.0 Gold Certified` },
      ],
    };

    onAddCustomBuildToCart(customRig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto z-10 border border-slate-300">
        {/* Header */}
        <div className="sticky top-0 bg-[#131921] text-white px-5 py-3 flex items-center justify-between z-20 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-400">tune</span>
            <h3 className="font-heading font-bold text-sm">
              PCWARE Custom PC Configurator & Compatibility Telemetry
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-800">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Wattage & Compatibility Live Banner */}
          <div className="bg-slate-900 text-white rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-700">
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

            <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/50 px-3 py-2 rounded text-emerald-400 text-xs font-bold font-mono">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>100% IPC Compatibility Verified (Socket {selectedCpu.socket})</span>
            </div>
          </div>

          {/* Component Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* CPU Select */}
            <div className="border border-slate-200 rounded-lg p-3 space-y-2">
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
            <div className="border border-slate-200 rounded-lg p-3 space-y-2">
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
            <div className="border border-slate-200 rounded-lg p-3 space-y-2">
              <span className="font-bold text-gray-800 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">layers</span>
                3. System Memory (RAM)
              </span>
              <div className="space-y-1.5">
                {RAM_OPTIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRam(r)}
                    className={`w-full p-2 rounded text-left border transition-all ${
                      selectedRam.id === r.id
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
            <div className="border border-slate-200 rounded-lg p-3 space-y-2">
              <span className="font-bold text-gray-800 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">hard_drive</span>
                4. Primary NVMe Storage
              </span>
              <div className="space-y-1.5">
                {STORAGE_OPTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStorage(s)}
                    className={`w-full p-2 rounded text-left border transition-all ${
                      selectedStorage.id === s.id
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
                  {Math.round(totalPrice * 85).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-badge-deal font-bold ml-2">
                  (Includes 3-Year Unified Warranty)
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark font-bold text-xs rounded-full border border-[#fcd200] shadow active:scale-95 transition-all uppercase tracking-wide cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              Add Configured Rig to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
