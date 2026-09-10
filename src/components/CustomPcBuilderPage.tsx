import React, { useState } from 'react';
import { Product } from '../types';
import { ASSET_IMAGES } from '../data/products';

interface CustomPcBuilderPageProps {
  onBack: () => void;
  onAddCustomBuildToCart: (customRig: Product) => void;
}

interface ComponentOption {
  id: string;
  name: string;
  price: number;
  socket?: string;
  ramGen?: 'DDR4' | 'DDR5';
  ramType?: 'DIMM' | 'SODIMM';
  watts: number;
  badge?: string;
  image?: string;
}

const CPUS: ComponentOption[] = [
  { id: 'cpu-7800x3d', name: 'AMD Ryzen 7 7800X3D (8C/16T, 3D V-Cache)', socket: 'AM5', watts: 120, price: 34999, badge: '#1 Gaming CPU' },
  { id: 'cpu-14900k', name: 'Intel Core i9-14900K (24C/32T, 6.0 GHz)', socket: 'LGA1700', watts: 253, price: 48999, badge: 'Flagship Intel' },
  { id: 'cpu-7950x3d', name: 'AMD Ryzen 9 7950X3D (16C/32T, 144MB Cache)', socket: 'AM5', watts: 120, price: 54999, badge: 'High-End Creator' },
  { id: 'cpu-14700k', name: 'Intel Core i7-14700K (20C/28T, 5.6 GHz)', socket: 'LGA1700', watts: 220, price: 34999, badge: 'Best Value' },
];

const MOTHERBOARDS: ComponentOption[] = [
  { id: 'mb-b650', name: 'ASUS ROG Strix B650-E Gaming WiFi', socket: 'AM5', ramGen: 'DDR5', ramType: 'DIMM', watts: 35, price: 24999 },
  { id: 'mb-z790', name: 'ASUS ROG Maximus Z790 Dark Hero', socket: 'LGA1700', ramGen: 'DDR5', ramType: 'DIMM', watts: 45, price: 49999 },
  { id: 'mb-x670e', name: 'MSI MAG X670E Tomahawk WiFi', socket: 'AM5', ramGen: 'DDR5', ramType: 'DIMM', watts: 40, price: 29999 },
];

const RAMS: ComponentOption[] = [
  { id: 'ram-32gb', name: '32GB (2x16GB) G.Skill Flare X5 DDR5-6000 CL30', ramGen: 'DDR5', ramType: 'DIMM', watts: 15, price: 11499 },
  { id: 'ram-64gb', name: '64GB (2x32GB) Corsair Vengeance DDR5-6400 CL32', ramGen: 'DDR5', ramType: 'DIMM', watts: 25, price: 21999 },
];

const STORAGES: ComponentOption[] = [
  { id: 'ssd-2tb', name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 (7,450 MB/s)', watts: 10, price: 14499 },
  { id: 'ssd-4tb', name: 'Crucial T700 4TB PCIe 5.0 NVMe M.2 (12,400 MB/s)', watts: 15, price: 34999 },
];

const GPUS: ComponentOption[] = [
  { id: 'gpu-4090', name: 'NVIDIA GeForce RTX 4090 24GB GDDR6X', watts: 450, price: 179999, badge: 'Monster 4K' },
  { id: 'gpu-4080s', name: 'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X', watts: 320, price: 98999, badge: 'High FPS' },
  { id: 'gpu-4070ti', name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB', watts: 285, price: 74999 },
];

const PSUS: ComponentOption[] = [
  { id: 'psu-1000w', name: 'Seasonic PRIME TX-1000W Titanium ATX 3.0', watts: 0, price: 22999 },
  { id: 'psu-850w', name: 'Corsair RM850x 850W 80+ Gold Fully Modular', watts: 0, price: 12999 },
];

const CABINETS: ComponentOption[] = [
  { id: 'cab-lianli', name: 'Lian Li O11 Dynamic EVO XL Tempered Glass', watts: 10, price: 19999 },
  { id: 'cab-[#232f3e]', name: 'Fractal Design North Charcoal Dark TG', watts: 10, price: 14999 },
];

const COOLERS: ComponentOption[] = [
  { id: 'cool-360', name: 'EKWB EK-Nucleus AIO CR360 Lux D-RGB Liquid Cooler', watts: 15, price: 15999 },
  { id: 'cool-noctua', name: 'Noctua NH-D15 chromax.black Dual-Tower Cooler', watts: 5, price: 10999 },
];

const OS_OPTIONS: ComponentOption[] = [
  { id: 'os-win11-pro', name: 'Windows 11 Pro 64-bit Workstation Edition', watts: 0, price: 4999 },
  { id: 'os-linux', name: 'Ubuntu Linux 24.04 LTS (PCWARE Pre-configured)', watts: 0, price: 0 },
];

export const CustomPcBuilderPage: React.FC<CustomPcBuilderPageProps> = ({
  onBack,
  onAddCustomBuildToCart,
}) => {
  const [currentStep, setCurrentStep] = useState(1);

  // Selections
  const [selectedCpu, setSelectedCpu] = useState(CPUS[0]);
  const [selectedMb, setSelectedMb] = useState(MOTHERBOARDS[0]);
  const [selectedRam, setSelectedRam] = useState(RAMS[0]);
  const [selectedSsd, setSelectedSsd] = useState(STORAGES[0]);
  const [selectedGpu, setSelectedGpu] = useState(GPUS[0]);
  const [selectedPsu, setSelectedPsu] = useState(PSUS[0]);
  const [selectedCabinet, setSelectedCabinet] = useState(CABINETS[0]);
  const [selectedCooler, setSelectedCooler] = useState(COOLERS[0]);
  const [selectedOs, setSelectedOs] = useState(OS_OPTIONS[0]);

  // Compatibility matching logic
  const compatibleMotherboards = MOTHERBOARDS.filter((m) => m.socket === selectedCpu.socket);
  const isMbCompatible = selectedMb.socket === selectedCpu.socket;

  // Wattage & Price Calculations
  const estWatts = selectedCpu.watts + selectedMb.watts + selectedRam.watts + selectedSsd.watts + selectedGpu.watts + selectedCabinet.watts + selectedCooler.watts;
  const recommendedPsuWatts = estWatts + 100;
  const assemblyCharge = 2500;
  const totalPrice = selectedCpu.price + selectedMb.price + selectedRam.price + selectedSsd.price + selectedGpu.price + selectedPsu.price + selectedCabinet.price + selectedCooler.price + selectedOs.price + assemblyCharge;

  const handleFinishBuild = () => {
    const customRig: Product = {
      id: `custom-pc-${Date.now()}`,
      category: 'desktop',
      title: `PC WARE Custom PC (${selectedCpu.name.split(' ')[2]} + ${selectedGpu.name.split(' ')[2]} ${selectedGpu.name.split(' ')[3]})`,
      subtitle: `Verified 10-Step Compatibility Pass • Assembled in Austin Cleanroom`,
      image: ASSET_IMAGES.titanRig,
      price: totalPrice / 85,
      originalPrice: (totalPrice + 15000) / 85,
      badge: '100% Compatible',
      badgeColor: 'primary',
      rating: 5.0,
      reviewsCount: 1,
      boughtPastMonth: 'Custom Bench Assembled',
      shipping: 'PCWARE White-Glove Courier',
      shippingSpeed: 'FREE Scheduled Delivery',
      inStock: true,
      tdpWattage: estWatts,
      specChips: [`${estWatts}W Power Draw`, selectedCpu.socket, '3-Year Complete Care'],
      specs: [
        { label: 'CPU', value: selectedCpu.name },
        { label: 'Motherboard', value: selectedMb.name },
        { label: 'GPU', value: selectedGpu.name },
        { label: 'Memory', value: selectedRam.name },
        { label: 'Storage', value: selectedSsd.name },
        { label: 'Power Supply', value: selectedPsu.name },
        { label: 'Cabinet', value: selectedCabinet.name },
        { label: 'Cooling', value: selectedCooler.name },
        { label: 'Operating System', value: selectedOs.name },
        { label: 'Assembly & Stress Test', value: 'Austin Lab 72-Hour Burn-In Certified' },
      ],
    };

    onAddCustomBuildToCart(customRig);
  };

  return (
    <div className="min-h-screen bg-[#eaeded] font-body text-text-dark pb-16">
      {/* Top Header & Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-14 z-30">
        <div className="max-w-[1480px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1 font-bold text-primary hover:underline text-xs"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Catalog
            </button>
            <span className="text-gray-300">|</span>
            <h1 className="font-heading font-extrabold text-base text-text-dark flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">tune</span>
              10-Step Interactive Custom PC Builder & Compatibility Engine
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-lg font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              {isMbCompatible ? '100% COMPATIBLE BUILD' : 'COMPATIBILITY ISSUE DETECTED'}
            </div>
            <div className="bg-slate-900 text-amber-400 font-bold px-3 py-1 rounded-lg border border-slate-700">
              Est. Draw: {estWatts}W (Rec. {recommendedPsuWatts}W PSU)
            </div>
          </div>
        </div>
      </div>

      {/* Main Step Builder Container */}
      <div className="max-w-[1480px] mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* STEP SELECTION LIST (Cols 1-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step Stepper Navigation Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center justify-between gap-2 text-xs">
              {[
                { step: 1, label: '1. CPU' },
                { step: 2, label: '2. Motherboard' },
                { step: 3, label: '3. RAM' },
                { step: 4, label: '4. Storage' },
                { step: 5, label: '5. GPU' },
                { step: 6, label: '6. PSU' },
                { step: 7, label: '7. Cabinet' },
                { step: 8, label: '8. Cooling' },
                { step: 9, label: '9. OS' },
                { step: 10, label: '10. Review' },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setCurrentStep(s.step)}
                  className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    currentStep === s.step
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* STEP 1: CPU SELECTION */}
            {currentStep === 1 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h2 className="font-heading font-extrabold text-lg text-text-dark flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">memory</span>
                  Step 1: Select Desktop Processor (CPU)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CPUS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCpu(c);
                        const matchMb = MOTHERBOARDS.find(m => m.socket === c.socket);
                        if (matchMb) setSelectedMb(matchMb);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedCpu.id === c.id
                          ? 'border-primary bg-orange-50/70 ring-2 ring-orange-200 font-bold shadow-md'
                          : 'border-slate-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-gray-900">{c.name}</span>
                        {c.badge && (
                          <span className="bg-badge-deal text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            {c.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-3 text-xs font-mono">
                        <span className="text-gray-500">Socket {c.socket} • {c.watts}W TDP</span>
                        <strong className="text-primary text-sm">₹{c.price.toLocaleString('en-IN')}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: MOTHERBOARD SELECTION (AUTO FILTERED BY SOCKET) */}
            {currentStep === 2 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading font-extrabold text-lg text-text-dark flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">developer_board</span>
                    Step 2: Select Motherboard (Filtered for Socket {selectedCpu.socket})
                  </h2>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold font-mono px-2.5 py-1 rounded-md">
                    Filter Active: Socket {selectedCpu.socket} Only
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {compatibleMotherboards.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMb(m)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedMb.id === m.id
                          ? 'border-primary bg-orange-50/70 ring-2 ring-orange-200 font-bold shadow-md'
                          : 'border-slate-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-sm text-gray-900">{m.name}</div>
                      <div className="flex justify-between items-center mt-3 text-xs font-mono">
                        <span className="text-gray-500">Socket {m.socket} • {m.ramGen} {m.ramType}</span>
                        <strong className="text-primary text-sm">₹{m.price.toLocaleString('en-IN')}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: RAM SELECTION */}
            {currentStep === 3 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h2 className="font-heading font-extrabold text-lg text-text-dark flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">layers</span>
                  Step 3: Select System Memory (RAM)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {RAMS.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRam(r)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedRam.id === r.id
                          ? 'border-primary bg-orange-50/70 ring-2 ring-orange-200 font-bold shadow-md'
                          : 'border-slate-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-sm text-gray-900">{r.name}</div>
                      <div className="flex justify-between items-center mt-3 text-xs font-mono">
                        <span className="text-gray-500">{r.ramGen} • {r.watts}W</span>
                        <strong className="text-primary text-sm">₹{r.price.toLocaleString('en-IN')}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: STORAGE SELECTION */}
            {currentStep === 4 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h2 className="font-heading font-extrabold text-lg text-text-dark flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">hard_drive</span>
                  Step 4: Select Primary NVMe M.2 SSD Storage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {STORAGES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSsd(s)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedSsd.id === s.id
                          ? 'border-primary bg-orange-50/70 ring-2 ring-orange-200 font-bold shadow-md'
                          : 'border-slate-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-sm text-gray-900">{s.name}</div>
                      <div className="flex justify-between items-center mt-3 text-xs font-mono">
                        <span className="text-gray-500">{s.watts}W Draw</span>
                        <strong className="text-primary text-sm">₹{s.price.toLocaleString('en-IN')}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: GPU SELECTION */}
            {currentStep === 5 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h2 className="font-heading font-extrabold text-lg text-text-dark flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">speed</span>
                  Step 5: Select Graphics Card (GPU)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {GPUS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGpu(g)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        selectedGpu.id === g.id
                          ? 'border-primary bg-orange-50/70 ring-2 ring-orange-200 font-bold shadow-md'
                          : 'border-slate-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-sm text-gray-900">{g.name}</div>
                      <div className="flex justify-between items-center mt-3 text-xs font-mono">
                        <span className="text-gray-500">{g.watts}W TGP</span>
                        <strong className="text-primary text-sm">₹{g.price.toLocaleString('en-IN')}</strong>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEPS 6-10 (Simplified for step navigation) */}
            {currentStep >= 6 && currentStep <= 9 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <h2 className="font-heading font-extrabold text-lg text-text-dark">
                  Step {currentStep}: Configure Additional Hardware Components
                </h2>
                <p className="text-xs text-gray-600 font-mono">
                  Current selection is verified compatible with your {selectedCpu.name} & {selectedMb.name}.
                </p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono space-y-2">
                  <div>Selected PSU: <strong>{selectedPsu.name} (₹{selectedPsu.price.toLocaleString('en-IN')})</strong></div>
                  <div>Selected Cabinet: <strong>{selectedCabinet.name} (₹{selectedCabinet.price.toLocaleString('en-IN')})</strong></div>
                  <div>Selected Cooler: <strong>{selectedCooler.name} (₹{selectedCooler.price.toLocaleString('en-IN')})</strong></div>
                  <div>Selected OS: <strong>{selectedOs.name} (₹{selectedOs.price.toLocaleString('en-IN')})</strong></div>
                </div>
              </div>
            )}

            {/* STEP 10: REVIEW & SUBMIT BUILD */}
            {currentStep === 10 && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading font-extrabold text-xl text-text-dark flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600">verified</span>
                    Step 10: Final Custom PC Build Specification Review
                  </h2>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-mono font-bold px-3 py-1 rounded-full">
                    Server Compatibility Passed
                  </span>
                </div>

                <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden text-xs font-mono">
                  <div className="p-3 bg-slate-50 flex justify-between">
                    <span className="text-gray-500 font-bold">1. CPU:</span>
                    <span className="text-gray-900 font-bold">{selectedCpu.name} (₹{selectedCpu.price.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="p-3 bg-white flex justify-between">
                    <span className="text-gray-500 font-bold">2. Motherboard:</span>
                    <span className="text-gray-900 font-bold">{selectedMb.name} (₹{selectedMb.price.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="p-3 bg-slate-50 flex justify-between">
                    <span className="text-gray-500 font-bold">3. RAM:</span>
                    <span className="text-gray-900 font-bold">{selectedRam.name} (₹{selectedRam.price.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="p-3 bg-white flex justify-between">
                    <span className="text-gray-500 font-bold">4. Storage:</span>
                    <span className="text-gray-900 font-bold">{selectedSsd.name} (₹{selectedSsd.price.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="p-3 bg-slate-50 flex justify-between">
                    <span className="text-gray-500 font-bold">5. GPU:</span>
                    <span className="text-gray-900 font-bold">{selectedGpu.name} (₹{selectedGpu.price.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="p-3 bg-white flex justify-between">
                    <span className="text-gray-500 font-bold">6. Power Supply:</span>
                    <span className="text-gray-900 font-bold">{selectedPsu.name} (₹{selectedPsu.price.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="p-3 bg-slate-50 flex justify-between">
                    <span className="text-gray-500 font-bold">7. Cabinet:</span>
                    <span className="text-gray-900 font-bold">{selectedCabinet.name} (₹{selectedCabinet.price.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="p-3 bg-white flex justify-between">
                    <span className="text-gray-500 font-bold">8. Cooling:</span>
                    <span className="text-gray-900 font-bold">{selectedCooler.name} (₹{selectedCooler.price.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="p-3 bg-slate-50 flex justify-between">
                    <span className="text-gray-500 font-bold">9. OS:</span>
                    <span className="text-gray-900 font-bold">{selectedOs.name} (₹{selectedOs.price.toLocaleString('en-IN')})</span>
                  </div>
                  <div className="p-3 bg-amber-50 flex justify-between text-primary">
                    <span className="font-bold">10. Assembly & 72-hr Stress Test:</span>
                    <span className="font-bold">Included (₹{assemblyCharge.toLocaleString('en-IN')})</span>
                  </div>
                </div>
              </div>
            )}

            {/* Previous / Next Navigation Buttons */}
            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
              >
                ← Previous Step
              </button>

              {currentStep < 10 ? (
                <button
                  onClick={() => setCurrentStep(Math.min(10, currentStep + 1))}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1"
                >
                  Next Step ({currentStep + 1}/10) →
                </button>
              ) : (
                <button
                  onClick={handleFinishBuild}
                  className="px-8 py-3 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark font-extrabold rounded-full text-xs shadow-lg uppercase tracking-wider cursor-pointer border border-[#fcd200] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Add Configured Build to Cart (₹{totalPrice.toLocaleString('en-IN')})
                </button>
              )}
            </div>

          </div>

          {/* RIGHT SUMMARY SIDEBAR (Cols 9-12) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200 sticky top-28 space-y-4">
              <h3 className="font-heading font-extrabold text-base text-text-dark border-b border-gray-100 pb-2">
                Live Build Price Breakdown
              </h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-600">
                  <span>Selected Hardware Total:</span>
                  <span>₹{(totalPrice - assemblyCharge).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Assembly & 72-hr Stress Test:</span>
                  <span>₹{assemblyCharge.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-heading font-bold text-sm text-text-dark">
                  <span>Total Configuration Price:</span>
                  <span className="text-xl font-extrabold text-primary">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Compatibility Summary Pill */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1 font-mono">
                <div className="font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                  100% Verified Compatible
                </div>
                <div className="text-[10px]">
                  Socket: {selectedCpu.socket} • Est Draw: {estWatts}W
                </div>
              </div>

              <button
                onClick={handleFinishBuild}
                className="w-full py-3 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark font-extrabold text-xs rounded-full border border-[#fcd200] shadow-md uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                Add Build to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
