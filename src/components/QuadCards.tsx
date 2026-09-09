import React, { useState, useEffect } from 'react';
import { ASSET_IMAGES, FLASH_DEAL_LAPTOP } from '../data/products';
import { Product } from '../types';

interface QuadCardsProps {
  onSelectLaptopCategory: (categoryTitle: string) => void;
  onSelectCpuCategory: (categoryTitle: string) => void;
  onSelectProduct: (product: Product) => void;
  onOpenSignIn: () => void;
  onSeeAllDeals: () => void;
}

export const QuadCards: React.FC<QuadCardsProps> = ({
  onSelectLaptopCategory,
  onSelectCpuCategory,
  onSelectProduct,
  onOpenSignIn,
  onSeeAllDeals
}) => {
  // Real ticking countdown timer starting from 05:22:18
  const [secondsLeft, setSecondsLeft] = useState(5 * 3600 + 22 * 60 + 18);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-[1480px] mx-auto px-4 -mt-16 md:-mt-28 relative z-20" id="deals">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Top Rated Laptops (4-grid mini tiles) */}
        <div className="bg-white p-4 rounded shadow-sm border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <h2 className="font-heading font-bold text-lg md:text-xl text-text-dark mb-3">
              Top Rated Laptops
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Tile 1 */}
              <button
                onClick={() => onSelectLaptopCategory('Gaming Laptops (RTX 4080)')}
                className="group block text-left w-full"
              >
                <div className="bg-slate-100 rounded overflow-hidden aspect-[4/3] flex items-center justify-center p-2 mb-1 border border-slate-200">
                  <img
                    alt="Gaming Laptops"
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform"
                    src={ASSET_IMAGES.laptopBase}
                  />
                </div>
                <span className="text-xs text-text-dark group-hover:text-primary font-medium block leading-tight">
                  Gaming Laptops (RTX 4080)
                </span>
              </button>

              {/* Tile 2 */}
              <button
                onClick={() => onSelectLaptopCategory('Thin & Light Ultrabooks')}
                className="group block text-left w-full"
              >
                <div className="bg-slate-100 rounded overflow-hidden aspect-[4/3] flex items-center justify-center p-2 mb-1 border border-slate-200">
                  <img
                    alt="Thin & Light"
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform filter brightness-95"
                    src={ASSET_IMAGES.laptopBase}
                  />
                </div>
                <span className="text-xs text-text-dark group-hover:text-primary font-medium block leading-tight">
                  Thin & Light Ultrabooks
                </span>
              </button>

              {/* Tile 3 */}
              <button
                onClick={() => onSelectLaptopCategory('2-in-1 Touch & OLED')}
                className="group block text-left w-full"
              >
                <div className="bg-slate-100 rounded overflow-hidden aspect-[4/3] flex items-center justify-center p-2 mb-1 border border-slate-200">
                  <img
                    alt="2-in-1 Touch"
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform filter contrast-125"
                    src={ASSET_IMAGES.laptopBase}
                  />
                </div>
                <span className="text-xs text-text-dark group-hover:text-primary font-medium block leading-tight">
                  2-in-1 Touch & OLED
                </span>
              </button>

              {/* Tile 4 */}
              <button
                onClick={() => onSelectLaptopCategory('Creator Studio Mobile')}
                className="group block text-left w-full"
              >
                <div className="bg-slate-100 rounded overflow-hidden aspect-[4/3] flex items-center justify-center p-2 mb-1 border border-slate-200">
                  <img
                    alt="Creator Studio"
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform"
                    src={ASSET_IMAGES.laptopBase}
                  />
                </div>
                <span className="text-xs text-text-dark group-hover:text-primary font-medium block leading-tight">
                  Creator Studio Mobile
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectLaptopCategory('All Laptops')}
            className="text-xs font-semibold text-tertiary hover:text-orange-600 hover:underline inline-flex items-center gap-1 text-left pt-1"
          >
            See all laptops & mobile rigs{' '}
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Card 2: Branded CPUs & Silicon (4-grid mini tiles) */}
        <div className="bg-white p-4 rounded shadow-sm border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <h2 className="font-heading font-bold text-lg md:text-xl text-text-dark mb-3">
              Branded CPUs & Silicon
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Tile 1 */}
              <button
                onClick={() => onSelectCpuCategory('Intel Core i9 / i7 LGA1700')}
                className="group block text-left w-full"
              >
                <div className="bg-slate-100 rounded overflow-hidden aspect-[4/3] flex items-center justify-center p-2 mb-1 border border-slate-200">
                  <img
                    alt="Intel Core i9"
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform"
                    src={ASSET_IMAGES.cpuBase}
                  />
                </div>
                <span className="text-xs text-text-dark group-hover:text-primary font-medium block leading-tight">
                  Intel Core i9 / i7 LGA1700
                </span>
              </button>

              {/* Tile 2 */}
              <button
                onClick={() => onSelectCpuCategory('AMD Ryzen 9 / 7 (AM5 3D)')}
                className="group block text-left w-full"
              >
                <div className="bg-slate-100 rounded overflow-hidden aspect-[4/3] flex items-center justify-center p-2 mb-1 border border-slate-200">
                  <img
                    alt="AMD Ryzen"
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform filter hue-rotate-15"
                    src={ASSET_IMAGES.cpuBase}
                  />
                </div>
                <span className="text-xs text-text-dark group-hover:text-primary font-medium block leading-tight">
                  AMD Ryzen 9 / 7 (AM5 3D)
                </span>
              </button>

              {/* Tile 3 */}
              <button
                onClick={() => onSelectCpuCategory('Ryzen Threadripper PRO')}
                className="group block text-left w-full"
              >
                <div className="bg-slate-100 rounded overflow-hidden aspect-[4/3] flex items-center justify-center p-2 mb-1 border border-slate-200">
                  <img
                    alt="Threadripper"
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform filter grayscale"
                    src={ASSET_IMAGES.cpuBase}
                  />
                </div>
                <span className="text-xs text-text-dark group-hover:text-primary font-medium block leading-tight">
                  Ryzen Threadripper PRO
                </span>
              </button>

              {/* Tile 4 */}
              <button
                onClick={() => onSelectCpuCategory('Server EPYC & Xeon Scalable')}
                className="group block text-left w-full"
              >
                <div className="bg-slate-100 rounded overflow-hidden aspect-[4/3] flex items-center justify-center p-2 mb-1 border border-slate-200">
                  <img
                    alt="Server EPYC"
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform"
                    src={ASSET_IMAGES.storageBase}
                  />
                </div>
                <span className="text-xs text-text-dark group-hover:text-primary font-medium block leading-tight">
                  Server EPYC & Xeon Scalable
                </span>
              </button>
            </div>
          </div>

          <button
            onClick={() => onSelectCpuCategory('All CPUs')}
            className="text-xs font-semibold text-tertiary hover:text-orange-600 hover:underline inline-flex items-center gap-1 text-left pt-1"
          >
            Explore CPU architecture & sockets{' '}
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Card 3: Deals of the Day: Flash Discounts */}
        <div className="bg-white p-4 rounded shadow-sm border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-heading font-bold text-lg md:text-xl text-text-dark">
                Deals of the Day
              </h2>
              <span className="text-[11px] font-mono font-bold text-badge-deal bg-red-50 border border-red-200 px-2 py-0.5 rounded animate-pulse">
                FLASH
              </span>
            </div>

            {/* Countdown Timer */}
            <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3 font-mono">
              <span className="material-symbols-outlined text-[16px] text-badge-deal">timer</span>
              <span>
                Ends in <strong className="text-text-dark font-bold">{formatTimer(secondsLeft)}</strong>
              </span>
            </div>

            {/* Spotlight Deal Item */}
            <div
              onClick={() => onSelectProduct(FLASH_DEAL_LAPTOP)}
              className="bg-slate-50 p-2.5 rounded border border-slate-200 mb-3 cursor-pointer group hover:border-orange-300 transition-colors"
            >
              <div className="relative w-full h-36 bg-slate-900 rounded overflow-hidden mb-2">
                <img
                  alt="Flash Deal Laptop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  src={ASSET_IMAGES.laptopBase}
                />
                <span className="absolute top-1.5 left-1.5 bg-badge-deal text-white font-bold text-[10px] px-2 py-0.5 rounded">
                  22% OFF
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="bg-badge-deal text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  Limited time deal
                </span>
                <span className="text-xs text-badge-deal font-bold font-mono">₹51,000 OFF</span>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-xs align-super font-bold">₹</span>
                <span className="text-2xl font-bold text-text-dark font-heading">1,95,499</span>
                <span className="text-xs text-text-muted line-through ml-2">List: ₹2,46,415</span>
              </div>

              <p className="text-xs text-text-dark font-medium line-clamp-2 mt-1 group-hover:text-primary transition-colors">
                ROG Strix 18" 240Hz Nebula | i9-14900HX | RTX 4080 | 32GB RAM
              </p>
            </div>
          </div>

          <button
            onClick={onSeeAllDeals}
            className="text-xs font-semibold text-tertiary hover:text-orange-600 hover:underline inline-flex items-center gap-1 text-left pt-1"
          >
            See all 148 flash tech deals{' '}
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        {/* Card 4: Sign in / FastPass Member Deals */}
        <div className="bg-white p-4 rounded shadow-sm border border-border-subtle flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <h2 className="font-heading font-bold text-lg md:text-xl text-text-dark mb-2">
              Sign in for the best experience
            </h2>
            <p className="text-xs text-text-muted mb-3">
              Track orders, get custom hardware alerts, and unlock member-only silicon pricing.
            </p>

            <button
              id="quadcard-signin-btn"
              onClick={onOpenSignIn}
              className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded shadow transition-all mb-4 cursor-pointer active:scale-98"
            >
              Sign in securely
            </button>

            {/* FastPass Prime-Style Box */}
            <div className="border-t border-border-subtle pt-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-xs text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  PCWARE FastPass
                </span>
                <span className="text-[10px] bg-orange-100 text-primary font-bold px-1.5 py-0.5 rounded">
                  FREE 30-DAY TRIAL
                </span>
              </div>

              <ul className="text-[11px] text-gray-600 space-y-1">
                <li className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-emerald-600">check</span>{' '}
                  Free same-day delivery on CPUs & rigs
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-emerald-600">check</span>{' '}
                  Priority silicon binning & lottery selection
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-emerald-600">check</span>{' '}
                  Zero-deductible accidental laptop drop care
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={onOpenSignIn}
            className="text-xs font-semibold text-tertiary hover:text-orange-600 hover:underline inline-flex items-center gap-1 pt-3 text-left"
          >
            Learn more about FastPass membership{' '}
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
