import React from 'react';
import { ASSET_IMAGES } from '../data/products';
import { Product } from '../types';

interface HeroBannerProps {
  onShopLaptops: () => void;
  onShopCPUs: () => void;
  onSelectProduct: (product: Product) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onShopLaptops,
  onShopCPUs,
  onSelectProduct
}) => {
  const titanProduct: Product = {
    id: "apex-titan-rtx-4090",
    category: "desktop",
    title: "APEX TITAN RTX 4090 Liquid-Cooled Flagship Workstation Rig",
    subtitle: "Handcrafted in Austin, TX with direct custom liquid loop and factory binned i9-14900KS",
    image: ASSET_IMAGES.titanRig,
    price: 4899.00,
    originalPrice: 5299.00,
    badge: "Flagship Titan",
    badgeColor: "primary",
    rating: 5.0,
    reviewsCount: 142,
    boughtPastMonth: "80+ bought in past month",
    shipping: "PCWARE White-Glove Hand Delivery",
    shippingSpeed: "FREE Scheduled Delivery",
    inStock: true,
    tdpWattage: 850,
    specChips: ["RTX 4090 24GB", "i9-14900KS 6.2GHz", "64GB DDR5-6400", "Custom Hardline Loop"],
    specs: [
      { label: "GPU", value: "NVIDIA GeForce RTX 4090 24GB (Full Hardline Liquid Loop)" },
      { label: "CPU", value: "Intel Core i9-14900KS Special Edition 6.2 GHz Unlocked" },
      { label: "Cooling", value: "EKWB Quantum Custom Distro Plate with 420mm Radiator" },
      { label: "Motherboard", value: "ASUS ROG Maximus Z790 Dark Hero WiFi 7" },
      { label: "RAM", value: "64GB (2x32GB) G.Skill Trident Z5 RGB DDR5-6400 CL32" },
      { label: "Storage", value: "4TB Crucial T700 PCIe 5.0 NVMe (12,400 MB/s)" },
      { label: "Power Supply", value: "Seasonic PRIME TX-1300W Titanium ATX 3.0" }
    ],
    description: "Hand-assembled in our Austin, Texas cleanroom facility. Each Apex Titan is stress-tested under 72-hour thermal loads and factory-overclocked with verified silicon lottery binning."
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-slate-900 via-[#1a2332] to-[#0f172a] text-white min-h-[340px] md:min-h-[440px] overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-20 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 pt-6 md:pt-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary/20 border border-primary/40 text-primary font-mono text-xs font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[15px]">bolt</span>
            Seasonal Architecture Event
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight leading-tight">
            Big Laptop & CPU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
              Savings Event
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed font-body">
            Save up to 35% on flagship 14th Gen Intel Core Ultra, AMD Ryzen 9 7000/8000 series rigs, and high-TGP GeForce RTX 40-Series laptops. Direct bench-certified silicon with 3-year warranty.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              id="hero-shop-laptops-btn"
              onClick={onShopLaptops}
              className="bg-primary hover:bg-primary-hover px-5 py-2.5 rounded text-white font-bold text-xs uppercase tracking-wider shadow flex items-center gap-1.5 transition-all cursor-pointer"
            >
              Shop Laptop Event <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>

            <button
              id="hero-shop-cpus-btn"
              onClick={onShopCPUs}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-5 py-2.5 rounded text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Shop Desktop CPUs
            </button>
          </div>
        </div>

        {/* Hero Graphic Showcase (Flagship Titan Rig) */}
        <div className="hidden md:flex items-center justify-center relative max-w-md lg:max-w-lg">
          <div
            id="hero-titan-showcase"
            onClick={() => onSelectProduct(titanProduct)}
            className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700/80 bg-slate-950/60 p-2 cursor-pointer group hover:border-orange-500/80 transition-all"
            title="Click to view Apex Titan RTX 4090 specs"
          >
            <img
              alt="PCWARE High Performance Flagship Rig"
              className="h-64 lg:h-72 w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
              src={ASSET_IMAGES.titanRig}
            />
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded border border-slate-700 flex items-center justify-between text-xs">
              <span className="text-orange-400 font-bold font-mono">APEX TITAN RTX 4090</span>
              <span className="text-emerald-400 font-bold">$4,899 (Save $400)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Soft fade gradient at bottom for card overlap */}
      <div className="h-28 w-full bg-gradient-to-b from-transparent to-[#eaeded] absolute bottom-0 left-0 pointer-events-none" />
    </div>
  );
};
