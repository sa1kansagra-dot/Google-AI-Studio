import React, { useState } from 'react';
import { Product } from '../types';
import { ASSET_IMAGES, CPU_PRODUCTS } from '../data/products';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, appliedCoupon?: number) => void;
  onBuyNow?: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onOpenConfigurator: () => void;
}

const GALLERY_IMAGES = [
  ASSET_IMAGES.laptopBase,
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80"
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onOpenConfigurator,
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCpuIndex, setSelectedCpuIndex] = useState(0);
  const [selectedGpuIndex, setSelectedGpuIndex] = useState(1);
  const [couponChecked, setCouponChecked] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Protection plan toggles
  const [completeCareChecked, setCompleteCareChecked] = useState(true);
  const [thermalProfileChecked, setThermalProfileChecked] = useState(false);

  // Bundle checkboxes
  const [bundleLaptop, setBundleLaptop] = useState(true);
  const [bundleCpu, setBundleCpu] = useState(true);
  const [bundleSsd, setBundleSsd] = useState(true);

  const isLaptop = product.category === 'laptop';

  // Price calculations
  const cpuDelta = selectedCpuIndex === 1 ? 12500 : 0;
  const gpuDelta = selectedGpuIndex === 0 ? -38000 : 0;
  const careCost = completeCareChecked ? 15999 : 0;
  const thermalCost = thermalProfileChecked ? 3999 : 0;

  const baseInrPrice = Math.round(product.price * 85);
  const configuredUnitPrice = Math.max(50000, baseInrPrice + cpuDelta + gpuDelta);
  const finalUnitPrice = configuredUnitPrice + careCost + thermalCost;

  const handleAdd = () => {
    const customizedProd: Product = {
      ...product,
      price: finalUnitPrice / 85,
      specChips: [
        ...(product.specChips || []),
        selectedCpuIndex === 1 ? 'Ryzen 9 7945HX3D' : 'i9-14900HX',
        selectedGpuIndex === 1 ? 'RTX 4090 16GB' : 'RTX 4080 12GB',
      ],
    };
    for (let i = 0; i < quantity; i++) {
      onAddToCart(customizedProd, couponChecked && product.coupon ? product.coupon : undefined);
    }
  };

  const handleDirectBuy = () => {
    handleAdd();
    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  // Bundle calculations
  const bundleLaptopPrice = 289999;
  const bundleCpuPrice = 34999;
  const bundleSsdPrice = 14499;

  let totalBundle = 0;
  if (bundleLaptop) totalBundle += bundleLaptopPrice;
  if (bundleCpu) totalBundle += bundleCpuPrice;
  if (bundleSsd) totalBundle += bundleSsdPrice;

  return (
    <div className="min-h-screen bg-[#f7f9fa] font-body text-text-dark pb-16">
      {/* Top Breadcrumb & Quick Jump Navigation Strip */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-14 z-30">
        <div className="max-w-[1480px] mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
          {/* Breadcrumb & Back Link */}
          <div className="flex items-center gap-2 text-gray-500 overflow-x-auto whitespace-nowrap">
            <button
              onClick={onBack}
              className="flex items-center gap-1 font-bold text-primary hover:underline shrink-0 mr-2"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Catalog
            </button>
            <span className="text-gray-300">/</span>
            <span>Electronics</span>
            <span className="text-gray-300">&gt;</span>
            <span>Computers & Accessories</span>
            <span className="text-gray-300">&gt;</span>
            <span>Laptops</span>
            <span className="text-gray-300">&gt;</span>
            <span className="font-mono text-gray-700 font-bold uppercase">
              ITEM # AS-SCAR18-4090
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ml-1">
              FASTPASS PRIME COMPATIBLE
            </span>
          </div>

          {/* Quick Jump Links */}
          <div className="flex items-center gap-4 font-semibold text-gray-600 text-xs shrink-0">
            <a href="#overview" className="hover:text-primary transition-colors flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[14px]">table_chart</span> Overview
            </a>
            <a href="#specs" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">tune</span> Tech Specs
            </a>
            <a href="#configurator" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">memory</span> Architecture Configurator
            </a>
            <a href="#telemetry" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">equalizer</span> Telemetry & Benchmarks
            </a>
          </div>
        </div>
      </div>

      {/* Main Page Layout Container */}
      <div className="max-w-[1480px] mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT & MIDDLE COLUMNS (Cols 1-8): Gallery + Specs + Configurator */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Grid: Gallery (Left) & Title/Architecture (Right) */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-6" id="overview">
              
              {/* Product Gallery Stage (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-3">
                {/* Main Large Viewer Stage */}
                <div className="relative bg-white rounded-2xl border border-slate-200 p-4 aspect-square flex items-center justify-center group overflow-hidden shadow-inner">
                  <img
                    alt={product.title}
                    src={GALLERY_IMAGES[selectedImage]}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[11px] px-2 py-1 rounded-md backdrop-blur flex items-center gap-1 font-mono">
                    <span className="material-symbols-outlined text-[14px] text-amber-400">zoom_in</span>
                    Roll over image to zoom in
                  </span>
                  <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-5 gap-2">
                  {GALLERY_IMAGES.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square bg-white rounded-xl border p-1 flex items-center justify-center transition-all ${
                        selectedImage === idx
                          ? 'border-primary ring-2 ring-orange-200 shadow-sm'
                          : 'border-slate-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img alt={`Thumb ${idx}`} src={imgUrl} className="max-h-full object-contain" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title & Architecture Configurator (7 cols) */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  {/* Brand Link & SKU */}
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span className="text-tertiary font-bold hover:underline cursor-pointer">
                      Visit the ASUS ROG Store on PCWARE
                    </span>
                    <span className="font-mono text-[11px] text-gray-400">SKU: G834JY-XS97</span>
                  </div>

                  {/* Main Title */}
                  <h1 className="font-heading font-extrabold text-lg md:text-xl text-text-dark leading-snug mt-1">
                    {product.title}
                  </h1>

                  {/* Rating Stars & Verified Counts */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-800">{product.rating || 4.9}</span>
                    <span className="text-xs text-tertiary font-semibold hover:underline cursor-pointer">
                      {product.reviewsCount || 842} ratings
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Austin Cleanroom Bench Validated
                    </span>
                  </div>

                  <div className="border-t border-gray-100 my-3" />

                  {/* Price Banner */}
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="text-3xl font-extrabold font-heading text-text-dark">
                      ₹{configuredUnitPrice.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-text-muted line-through">
                        ₹{Math.round(product.originalPrice * 85).toLocaleString('en-IN')}
                      </span>
                    )}
                    <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      Save ₹40,000 (12%)
                    </span>
                  </div>

                  {/* Coupon Pill */}
                  {product.coupon && (
                    <div className="mt-2 bg-emerald-50 border border-emerald-200 text-emerald-800 p-2 rounded-xl text-xs flex items-center gap-2 font-semibold">
                      <input
                        id="pdp-coupon"
                        type="checkbox"
                        checked={couponChecked}
                        onChange={(e) => setCouponChecked(e.target.checked)}
                        className="rounded text-emerald-600 cursor-pointer h-4 w-4"
                      />
                      <label htmlFor="pdp-coupon" className="cursor-pointer flex items-center gap-1.5">
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Coupon</span>
                        Apply ₹{Math.round(product.coupon * 85).toLocaleString('en-IN')} coupon at checkout.
                      </label>
                    </div>
                  )}

                  {/* Hardware Architecture Interactive Grid */}
                  <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3" id="configurator">
                    <div className="font-heading font-extrabold text-xs text-gray-800 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="flex items-center gap-1.5 text-primary">
                        <span className="material-symbols-outlined text-[18px]">memory</span>
                        Hardware Architecture Selection
                      </span>
                      <span className="font-mono text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                        Silicon lottery binned
                      </span>
                    </div>

                    {/* Processor (CPU) Options */}
                    <div>
                      <div className="text-[11px] font-bold text-gray-600 mb-1 flex items-center justify-between font-mono">
                        <span>Processor (CPU):</span>
                        <span className="text-gray-900 font-bold font-heading">
                          {selectedCpuIndex === 0 ? 'Intel Core i9-14900HX (24C / 32T, 5.8GHz)' : 'AMD Ryzen 9 7945HX3D (16C / 128MB Cache)'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCpuIndex(0)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                            selectedCpuIndex === 0
                              ? 'border-primary bg-white ring-2 ring-orange-200 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="font-bold text-gray-900">i9-14900HX</div>
                          <div className="text-[10px] text-gray-500 font-mono">24 Cores • 5.8 GHz Max</div>
                          <div className="text-[10px] text-primary font-bold mt-0.5">Included</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedCpuIndex(1)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                            selectedCpuIndex === 1
                              ? 'border-primary bg-white ring-2 ring-orange-200 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="font-bold text-gray-900">Ryzen 9 7945HX3D</div>
                          <div className="text-[10px] text-gray-500 font-mono">16 Cores • 128MB 3D Cache</div>
                          <div className="text-[10px] text-primary font-bold mt-0.5">+₹12,500</div>
                        </button>
                      </div>
                    </div>

                    {/* Graphics Processing Unit (GPU) Options */}
                    <div>
                      <div className="text-[11px] font-bold text-gray-600 mb-1 flex items-center justify-between font-mono">
                        <span>Graphics Processing Unit (GPU):</span>
                        <span className="text-gray-900 font-bold font-heading">
                          {selectedGpuIndex === 1 ? 'RTX 4090 16GB GDDR6X (175W)' : 'RTX 4080 12GB GDDR6 (175W)'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedGpuIndex(0)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                            selectedGpuIndex === 0
                              ? 'border-primary bg-white ring-2 ring-orange-200 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="font-bold text-gray-900">RTX 4080 12GB</div>
                          <div className="text-[10px] text-gray-500 font-mono">175W Max TGP • DLSS 3.5</div>
                          <div className="text-[10px] text-emerald-700 font-bold mt-0.5">-₹38,000</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedGpuIndex(1)}
                          className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                            selectedGpuIndex === 1
                              ? 'border-primary bg-white ring-2 ring-orange-200 shadow-sm'
                              : 'border-slate-200 bg-white hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="font-bold text-gray-900">RTX 4090 16GB</div>
                          <div className="text-[10px] text-gray-500 font-mono">175W Full Boost • 16GB VRAM</div>
                          <div className="text-[10px] text-primary font-bold mt-0.5">Selected</div>
                        </button>
                      </div>
                    </div>

                    {/* RAM & SSD Included Chips */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <span className="text-[10px] text-gray-500 block font-mono">RAM Kit:</span>
                        <span className="font-bold text-gray-800 text-[11px]">64GB DDR5 5600MHz (Included)</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <span className="text-[10px] text-gray-500 block font-mono">NVMe Storage:</span>
                        <span className="font-bold text-gray-800 text-[11px]">2TB PCIe Gen4 (Included)</span>
                      </div>
                    </div>

                    {/* Sustained Power Draw Telemetry Box */}
                    <div className="bg-slate-900 text-white rounded-xl p-3 text-xs space-y-1 font-mono border border-slate-700" id="telemetry">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-400">ESTIMATED SUSTAINED POWER DRAW</span>
                        <span className="text-amber-400 font-bold">240W Combined (175W GPU + 65W CPU)</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-primary h-full w-[82%]" />
                      </div>
                      <div className="flex justify-between text-[10px] text-gray-400 pt-0.5">
                        <span>Idle: 38°C</span>
                        <span className="text-emerald-400 font-bold">Full Synthetic Load: 79°C Peak (Liquid Metal)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: Technical Blueprint Summary Table & About This Item */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6" id="specs">
              {/* Technical Blueprint Summary */}
              <div>
                <h3 className="font-heading font-extrabold text-base text-text-dark mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">description</span>
                  Technical Blueprint Summary
                </h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden text-xs divide-y divide-gray-200">
                  <div className="flex p-3 bg-slate-50 font-mono">
                    <span className="w-1/3 text-gray-500 font-medium">Display Panel</span>
                    <span className="w-2/3 font-bold text-gray-900">18" 2.5K (2560x1600) 240Hz 3ms Mini-LED Nebula HDR</span>
                  </div>
                  <div className="flex p-3 bg-white font-mono">
                    <span className="w-1/3 text-gray-500 font-medium">Peak Brightness</span>
                    <span className="w-2/3 font-bold text-gray-900">1100 nits, 100% DCI-P3, VESA DisplayHDR 1000</span>
                  </div>
                  <div className="flex p-3 bg-slate-50 font-mono">
                    <span className="w-1/3 text-gray-500 font-medium">Thermal Solution</span>
                    <span className="w-2/3 font-bold text-gray-900">ROG Intelligent Cooling with 3rd Fan & Conductonaut Extreme</span>
                  </div>
                  <div className="flex p-3 bg-white font-mono">
                    <span className="w-1/3 text-gray-500 font-medium">Wireless Suite</span>
                    <span className="w-2/3 font-bold text-gray-900">Wi-Fi 7 (802.11be) + Bluetooth 5.4</span>
                  </div>
                  <div className="flex p-3 bg-slate-50 font-mono">
                    <span className="w-1/3 text-gray-500 font-medium">Operating System</span>
                    <span className="w-2/3 font-bold text-gray-900">Windows 11 Pro 64-bit Workstation Edition</span>
                  </div>
                  <div className="flex p-3 bg-white font-mono">
                    <span className="w-1/3 text-gray-500 font-medium">Power Brick</span>
                    <span className="w-2/3 font-bold text-gray-900">330W GaN Compact Ultra-Fast Adapter</span>
                  </div>
                </div>
              </div>

              {/* About This Item Bullet List */}
              <div>
                <h3 className="font-heading font-extrabold text-base text-text-dark mb-3">
                  About This Item
                </h3>
                <ul className="space-y-2 text-xs text-gray-700 leading-relaxed list-disc list-inside">
                  <li>
                    <strong>Sustained 175W Max TGP:</strong> Powered by NVIDIA Ada Lovelace RTX 4090 with MUX switch and NVIDIA Advanced Optimus for zero frame latency.
                  </li>
                  <li>
                    <strong>Nebula HDR Display:</strong> 2,000+ local dimming zones powered by Mini-LED technology with factory Pantone validation and Dolby Vision certification.
                  </li>
                  <li>
                    <strong>Conductonaut Extreme Liquid Metal:</strong> Custom liquid-metal compound on both the CPU and GPU drops temperatures by up to 15°C compared to conventional thermal paste.
                  </li>
                  <li>
                    <strong>PCWARE Silicon Validation:</strong> Every Scar 18 unit is burned-in at PCWARE Labs with a 4-hour stress pass before packaging.
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Section 1: Frequently Bought Together Bundle Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-heading font-extrabold text-lg text-text-dark mb-4">
                Frequently Bought Together
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Bundle Item Images */}
                <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 w-32 h-32 flex flex-col items-center justify-center text-center shrink-0">
                    <img alt="Laptop" src={ASSET_IMAGES.laptopBase} className="h-16 object-contain mb-1" />
                    <span className="text-[10px] font-bold text-gray-800 truncate w-full">ROG Scar 18 (2025)</span>
                    <span className="text-[10px] text-primary font-mono font-bold">₹2,89,999</span>
                  </div>
                  <span className="text-xl font-bold text-gray-400">+</span>
                  
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 w-32 h-32 flex flex-col items-center justify-center text-center shrink-0">
                    <img alt="CPU" src={ASSET_IMAGES.cpuBase} className="h-16 object-contain mb-1" />
                    <span className="text-[10px] font-bold text-gray-800 truncate w-full">Ryzen 7 7800X3D CPU</span>
                    <span className="text-[10px] text-primary font-mono font-bold">₹34,999</span>
                  </div>
                  <span className="text-xl font-bold text-gray-400">+</span>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 w-32 h-32 flex flex-col items-center justify-center text-center shrink-0">
                    <img alt="SSD" src={ASSET_IMAGES.storageBase} className="h-16 object-contain mb-1" />
                    <span className="text-[10px] font-bold text-gray-800 truncate w-full">Samsung 990 PRO 2TB</span>
                    <span className="text-[10px] text-primary font-mono font-bold">₹14,499</span>
                  </div>
                </div>

                {/* Bundle Summary Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full md:w-80 space-y-3">
                  <div>
                    <div className="text-[11px] text-gray-500 font-mono">Total bundle price:</div>
                    <div className="text-2xl font-extrabold font-heading text-text-dark">
                      ₹{totalBundle.toLocaleString('en-IN')}
                      <span className="text-xs text-gray-400 line-through ml-2 font-normal">₹3,84,497</span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 mt-0.5">
                      You save ₹45,000 with instant bundle rebate
                    </div>
                  </div>

                  <button
                    onClick={handleAdd}
                    className="w-full py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark font-bold text-xs rounded-full border border-[#fcd200] shadow-sm uppercase tracking-wide cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                    Add All Three to Cart
                  </button>

                  <div className="space-y-1 text-[11px] text-gray-600">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={bundleLaptop} onChange={(e) => setBundleLaptop(e.target.checked)} className="rounded text-primary" />
                      <span><strong>This item:</strong> ASUS ROG Strix Scar 18 (₹2,89,999)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={bundleCpu} onChange={(e) => setBundleCpu(e.target.checked)} className="rounded text-primary" />
                      <span>AMD Ryzen 7 7800X3D Desktop Processor (₹34,999)</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={bundleSsd} onChange={(e) => setBundleSsd(e.target.checked)} className="rounded text-primary" />
                      <span>Samsung 990 PRO NVMe 2TB Gen4 SSD (₹14,499)</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section 2: Silicon Benchmarks & Sibling Matrix Table */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 border-b border-gray-100 pb-3 gap-2">
                <div>
                  <div className="text-[11px] font-bold text-primary font-mono uppercase tracking-wider">
                    LAB PERFORMANCE TELEMETRY
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-text-dark">
                    Silicon Benchmarks & Sibling Matrix
                  </h3>
                  <p className="text-xs text-text-muted">
                    Tested under ambient 21°C laboratory conditions using UL 3DMark and Cinebench R23 test suites.
                  </p>
                </div>
                <span className="font-mono text-[11px] bg-slate-900 text-amber-400 font-bold px-2.5 py-1 rounded-md border border-slate-700 shrink-0">
                  BIOS Ver: 308 (2025 Stable)
                </span>
              </div>

              {/* Benchmarks Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-gray-700 font-mono uppercase tracking-wider text-[10px]">
                      <th className="p-3">SYSTEM / METRIC</th>
                      <th className="p-3 bg-orange-100/70 text-primary font-bold">ASUS ROG SCAR 18 (2025)</th>
                      <th className="p-3">Lenovo Legion Pro 7i</th>
                      <th className="p-3">Razer Blade 16 (2024)</th>
                      <th className="p-3">Custom Ryzen 9 Workstation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                    <tr>
                      <td className="p-3 font-bold text-gray-800 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">bolt</span>
                        GPU Architecture & TGP
                      </td>
                      <td className="p-3 font-bold bg-orange-50/50 text-gray-900">RTX 4090 16GB (175W Sustained)</td>
                      <td className="p-3 text-gray-600">RTX 4090 16GB (175W)</td>
                      <td className="p-3 text-gray-600">RTX 4090 16GB (175W Throttled)</td>
                      <td className="p-3 text-gray-600">RTX 4090 24GB Desktop (450W)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-800">Cinebench R23 Multi-Core</td>
                      <td className="p-3 font-bold bg-orange-50/50 text-primary">
                        34,120 pts <span className="inline-block w-16 bg-primary h-2 rounded ml-2"></span>
                      </td>
                      <td className="p-3 text-gray-600">31,850 pts</td>
                      <td className="p-3 text-gray-600">29,400 pts</td>
                      <td className="p-3 text-gray-600">38,900 pts (Desktop)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-800">3DMark Time Spy (Graphics)</td>
                      <td className="p-3 font-bold bg-orange-50/50 text-primary">
                        22,890 pts <span className="inline-block w-16 bg-primary h-2 rounded ml-2"></span>
                      </td>
                      <td className="p-3 text-gray-600">21,400 pts</td>
                      <td className="p-3 text-gray-600">20,110 pts</td>
                      <td className="p-3 text-gray-600">36,500 pts (Desktop)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-800">Peak CPU/GPU Thermal Delta</td>
                      <td className="p-3 font-bold bg-orange-50/50 text-emerald-700">78°C / 73°C (Vapor Chamber)</td>
                      <td className="p-3 text-gray-600">86°C / 78°C</td>
                      <td className="p-3 text-red-600 font-bold">92°C / 84°C (Hot)</td>
                      <td className="p-3 text-gray-600">64°C / 58°C (Custom Loop)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-800">Display Panel Tech</td>
                      <td className="p-3 font-bold bg-orange-50/50 text-gray-900">18" 2.5K Mini-LED 240Hz</td>
                      <td className="p-3 text-gray-600">16" 2.5K IPS 240Hz</td>
                      <td className="p-3 text-gray-600">16" Dual-Mode Mini-LED</td>
                      <td className="p-3 text-gray-600">External Display Required</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-gray-800">Chassis Mobility & Weight</td>
                      <td className="p-3 font-bold bg-orange-50/50 text-gray-900">3.10 kg (6.83 lbs)</td>
                      <td className="p-3 text-gray-600">2.80 kg (6.17 lbs)</td>
                      <td className="p-3 text-gray-600">2.45 kg (5.40 lbs)</td>
                      <td className="p-3 text-gray-600">18.5 kg (Tower Rig)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR (Cols 9-12): Sticky Buy Box & Protection Plans */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200 sticky top-28 space-y-4">
              
              {/* Price & Stock Header */}
              <div>
                <div className="text-3xl font-extrabold font-heading text-text-dark">
                  ₹{finalUnitPrice.toLocaleString('en-IN')}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-sm font-bold text-emerald-700">In Stock (Ready to Dispatch)</span>
                </div>
                <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                  Ships from PCWARE Austin Cleanroom Facility
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Quantity:
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-bold font-mono bg-slate-50 focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>
                      {q} (Individual Unit{q > 1 ? 's' : ''})
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAdd}
                  className="w-full py-3 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark font-bold text-xs rounded-full border border-[#fcd200] shadow-md uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  Add to Cart
                </button>

                <button
                  onClick={handleDirectBuy}
                  className="w-full py-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs rounded-full border border-orange-600 shadow-md uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">bolt</span>
                  Buy Now
                </button>
              </div>

              {/* Add Protection Plan Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5 text-xs">
                <div className="font-bold text-gray-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                  ADD PROTECTION PLAN:
                </div>

                <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-orange-300">
                  <input
                    type="checkbox"
                    checked={completeCareChecked}
                    onChange={(e) => setCompleteCareChecked(e.target.checked)}
                    className="rounded text-primary mt-0.5 cursor-pointer"
                  />
                  <div className="text-[11px]">
                    <div className="font-bold text-gray-900">
                      3-Year PCWARE Complete Care <span className="text-primary font-mono">+₹15,999</span>
                    </div>
                    <div className="text-gray-500 leading-tight text-[10px]">
                      Covers accidental drops, spills, surge protection & zero-pixel guarantee.
                    </div>
                  </div>
                </label>

                <label className="flex items-start gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-orange-300">
                  <input
                    type="checkbox"
                    checked={thermalProfileChecked}
                    onChange={(e) => setThermalProfileChecked(e.target.checked)}
                    className="rounded text-primary mt-0.5 cursor-pointer"
                  />
                  <div className="text-[11px]">
                    <div className="font-bold text-gray-900">
                      Silicon Custom Overclock & Thermal Profile <span className="text-primary font-mono">+₹3,999</span>
                    </div>
                    <div className="text-gray-500 leading-tight text-[10px]">
                      Applied by Senior PCWARE Technician.
                    </div>
                  </div>
                </label>
              </div>

              {/* Alternative Desktop Builder Option Box */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs space-y-2">
                <div className="font-mono text-[10px] text-amber-900 font-bold uppercase tracking-wider">
                  ALTERNATIVE DESKTOP BUILDER OPTION
                </div>
                <p className="text-[11px] text-gray-600 leading-tight">
                  Looking for desktop socket components instead?
                </p>

                <button
                  onClick={onOpenConfigurator}
                  className="w-full p-2 bg-white hover:bg-orange-50 border border-amber-300 rounded-lg flex items-center justify-between text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">memory</span>
                    <div>
                      <div className="font-bold text-gray-900 text-[11px] truncate max-w-[170px]">
                        AMD Ryzen 7 7800X3D ...
                      </div>
                      <div className="font-mono text-[10px]">
                        <strong className="text-primary">₹34,999</strong> <span className="text-gray-400 line-through">₹39,999</span>
                      </div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 text-[18px]">chevron_right</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="border-t border-gray-100 pt-3 text-[11px] text-gray-500 space-y-1.5 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">verified</span>
                  <span>100% Genuine Boxed Factory Hardware</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">local_shipping</span>
                  <span>FREE Scheduled FastPass Next-Day Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-600 text-[16px]">lock</span>
                  <span>256-Bit Encrypted Hardware Checkout</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
