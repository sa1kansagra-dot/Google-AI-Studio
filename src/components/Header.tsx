import React, { useState } from 'react';
import { ASSET_IMAGES } from '../data/products';
import { DeliveryAddress } from '../types';

interface HeaderProps {
  cartCount: number;
  deliveryAddress: DeliveryAddress;
  selectedDepartment: string;
  searchQuery: string;
  onDepartmentChange: (dept: string) => void;
  onSearchChange: (query: string) => void;
  onOpenCart: () => void;
  onOpenDeliveryModal: () => void;
  onOpenSignInModal: () => void;
  onOpenOrdersModal: () => void;
  onOpenConfiguratorModal: () => void;
  onOpenTechDesk: () => void;
  onOpenDepartmentMenu: () => void;
  onSelectCategoryFilter: (category: 'all' | 'laptop' | 'cpu' | 'deals') => void;
  onOpenStaffLogin?: () => void;
  onOpenPcBuilder?: () => void;
  onOpenErpPortal?: () => void;
  currentUser?: { username: string; role: 'admin' | 'staff'; name: string } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  deliveryAddress,
  selectedDepartment,
  searchQuery,
  onDepartmentChange,
  onSearchChange,
  onOpenCart,
  onOpenDeliveryModal,
  onOpenSignInModal,
  onOpenOrdersModal,
  onOpenConfiguratorModal,
  onOpenTechDesk,
  onOpenDepartmentMenu,
  onSelectCategoryFilter,
  onOpenStaffLogin,
  onOpenPcBuilder,
  onOpenErpPortal,
  currentUser,
  onLogout,
}) => {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">
      {/* 1. Main Top Bar */}
      <div className="bg-[#131921] text-white px-3 md:px-4 py-1.5 flex items-center justify-between gap-3 text-sm">
        {/* Brand Logo */}
        <button
          id="header-logo-btn"
          onClick={() => {
            onDepartmentChange('All Departments');
            onSearchChange('');
            onSelectCategoryFilter('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center px-2 py-1.5 border border-transparent hover:border-white rounded shrink-0 transition-colors"
          title="PCWARE Lab Store Home"
        >
          <img
            alt="PCWARE Lab Store"
            className="h-8 md:h-9 w-auto object-contain brightness-110"
            src={ASSET_IMAGES.logo}
          />
        </button>

        {/* Delivery Address Widget */}
        <button
          id="header-delivery-widget"
          onClick={onOpenDeliveryModal}
          className="hidden md:flex items-center gap-1 px-2 py-1.5 border border-transparent hover:border-white rounded cursor-pointer leading-tight shrink-0 transition-colors text-left"
        >
          <span className="material-symbols-outlined text-[20px] text-white self-center">
            location_on
          </span>
          <div className="flex flex-col text-left">
            <span className="text-[11px] text-gray-300">Deliver to {deliveryAddress.city}</span>
            <span className="text-[13px] font-bold text-white tracking-tight">
              {deliveryAddress.state} {deliveryAddress.zip}
            </span>
          </div>
        </button>

        {/* Centered Search Bar */}
        <div className="flex-1 max-w-3xl flex items-center h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-primary">
          <div className="bg-gray-100 hover:bg-gray-200 border-r border-gray-300 h-full flex items-center px-3 cursor-pointer text-xs text-gray-700 font-medium shrink-0">
            <select
              id="department-select"
              value={selectedDepartment}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="bg-transparent border-0 text-xs text-gray-700 focus:ring-0 cursor-pointer pr-4 py-0 pl-0 outline-none"
            >
              <option value="All Departments">All Departments</option>
              <option value="Laptops">Laptops</option>
              <option value="CPUs & Processors">CPUs & Processors</option>
              <option value="Prebuilt Gaming PCs">Prebuilt Gaming PCs</option>
              <option value="GPUs & Components">GPUs & Components</option>
              <option value="Workstation Rigs">Workstation Rigs</option>
              <option value="Server & Enterprise">Server & Enterprise</option>
            </select>
          </div>

          <div className="flex-1 flex items-center relative h-full">
            <input
              id="search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full border-0 h-full px-3 text-sm text-gray-900 focus:ring-0 outline-none placeholder-gray-500"
              placeholder="Search Core i9-14900K, Ryzen 7 7800X3D, RTX 4090 laptops, OLED Creator notebooks..."
              type="text"
            />
            {searchQuery && (
              <button
                id="search-clear-btn"
                onClick={() => onSearchChange('')}
                className="text-gray-400 hover:text-gray-600 px-2"
                title="Clear search"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          <button
            id="search-submit-btn"
            aria-label="Search"
            className="bg-[#ea580c] hover:bg-[#c2410c] transition-colors h-full px-4 flex items-center justify-center text-white shrink-0"
          >
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
        </div>

        {/* Right Utility Items */}
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          {/* Language / Region */}
          <div className="relative hidden lg:block">
            <button
              id="header-region-btn"
              onClick={() => setRegionMenuOpen(!regionMenuOpen)}
              className="flex items-center gap-1 px-2 py-2 border border-transparent hover:border-white rounded cursor-pointer font-bold text-xs"
            >
              <span className="text-xs">🇺🇸 EN</span>
              <span className="material-symbols-outlined text-[14px] text-gray-400">arrow_drop_down</span>
            </button>
            {regionMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white text-gray-800 rounded shadow-xl py-2 z-50 text-xs border border-gray-200">
                <div className="px-3 py-1 font-bold text-gray-500 border-b border-gray-100">
                  Change Language
                </div>
                <div className="px-3 py-1.5 hover:bg-orange-50 cursor-pointer font-semibold text-primary flex items-center justify-between">
                  <span>English - EN</span>
                  <span className="material-symbols-outlined text-[14px]">check</span>
                </div>
                <div className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-gray-700">Español - ES</div>
                <div className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-gray-700">Deutsch - DE</div>
                <div className="px-3 py-1 font-bold text-gray-500 border-t border-gray-100 mt-1">Currency</div>
                <div className="px-3 py-1.5 hover:bg-orange-50 cursor-pointer font-semibold text-primary">
                  $ - USD (US Dollar)
                </div>
              </div>
            )}
          </div>

          {/* Account & Lists */}
          <div className="relative">
            <button
              id="header-account-btn"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              className="flex flex-col px-2 py-1.5 border border-transparent hover:border-white rounded cursor-pointer text-left leading-tight"
            >
              <span className="text-[11px] text-gray-300">Hello, Sign in</span>
              <span className="text-[13px] font-bold text-white flex items-center">
                Account & Lists <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
              </span>
            </button>
            {accountMenuOpen && (
              <div className="absolute right-0 mt-1 w-64 bg-white text-gray-800 rounded shadow-xl p-4 z-50 text-xs border border-gray-200">
                <button
                  id="menu-sign-in-btn"
                  onClick={() => {
                    setAccountMenuOpen(false);
                    onOpenSignInModal();
                  }}
                  className="w-full py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded shadow transition-all mb-3 text-center"
                >
                  Sign in securely
                </button>
                <div className="text-[11px] text-gray-500 text-center pb-2 border-b border-gray-200">
                  New customer? <span className="text-tertiary cursor-pointer hover:underline">Start here.</span>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <div>
                    <span className="font-bold text-gray-900 block mb-1.5">Your Lists</span>
                    <ul className="space-y-1.5 text-gray-600">
                      <li className="hover:text-primary cursor-pointer">Create a PC Wishlist</li>
                      <li className="hover:text-primary cursor-pointer">Silicon Saved Items</li>
                      <li className="hover:text-primary cursor-pointer">Build Registry</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block mb-1.5">Your Account</span>
                    <ul className="space-y-1.5 text-gray-600">
                      <li
                        onClick={() => {
                          setAccountMenuOpen(false);
                          onOpenOrdersModal();
                        }}
                        className="hover:text-primary cursor-pointer"
                      >
                        Orders & Serials
                      </li>
                      <li
                        onClick={() => {
                          setAccountMenuOpen(false);
                          onOpenSignInModal();
                        }}
                        className="hover:text-primary cursor-pointer"
                      >
                        FastPass Benefits
                      </li>
                      <li
                        onClick={() => {
                          setAccountMenuOpen(false);
                          onOpenTechDesk();
                        }}
                        className="hover:text-primary cursor-pointer"
                      >
                        Tech Support Desk
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Staff Login / ERP Portal Button */}
          {currentUser ? (
            <div className="hidden md:flex items-center gap-2">
              <button
                id="header-erp-portal-btn"
                onClick={onOpenErpPortal}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs shadow-sm transition-all cursor-pointer border border-emerald-500/40"
                title="Open PC Ware ERP Management System"
              >
                <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                <span>ERP Portal ({currentUser.role.toUpperCase()})</span>
              </button>
              <button
                id="header-logout-btn"
                onClick={onLogout}
                className="text-gray-300 hover:text-white text-xs font-semibold underline"
                title="Sign out of staff account"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              id="header-staff-login-btn"
              onClick={onOpenStaffLogin || onOpenSignInModal}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-xs shadow-sm transition-all cursor-pointer border border-orange-500/40"
              title="Open Staff Portal Login"
            >
              <span className="material-symbols-outlined text-[16px] text-white">badge</span>
              <span>Staff Login</span>
            </button>
          )}

          {/* Returns & Orders */}
          <button
            id="header-orders-btn"
            onClick={onOpenOrdersModal}
            className="hidden sm:flex flex-col px-2 py-1.5 border border-transparent hover:border-white rounded cursor-pointer text-left leading-tight"
          >
            <span className="text-[11px] text-gray-300">Returns</span>
            <span className="text-[13px] font-bold text-white">& Orders</span>
          </button>

          {/* Cart */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="flex items-center gap-1 px-2.5 py-1.5 border border-transparent hover:border-white rounded relative cursor-pointer group"
          >
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[32px] text-white group-hover:scale-105 transition-transform">
                shopping_cart
              </span>
              <span className="absolute -top-1 left-3.5 bg-primary text-white font-bold text-xs rounded-full px-1.5 py-0.2 shadow min-w-[19px] text-center">
                {cartCount}
              </span>
            </div>
            <span className="hidden md:inline text-[13px] font-bold self-end mb-1 text-white">Cart</span>
          </button>
        </div>
      </div>

      {/* 2. Sub-navigation horizontal strip */}
      <div className="bg-[#232f3e] text-white px-3 md:px-4 py-1.5 flex items-center gap-3 md:gap-5 text-xs overflow-x-auto whitespace-nowrap scrollbar-none">
        <button
          id="subnav-all-hardware-btn"
          onClick={onOpenDepartmentMenu}
          className="flex items-center gap-1 font-bold hover:text-orange-400 py-0.5 transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">menu</span>
          All Hardware
        </button>

        <button
          id="subnav-deals-btn"
          onClick={() => {
            onSelectCategoryFilter('deals');
            const el = document.getElementById('deals');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-orange-400 py-0.5 font-medium flex items-center gap-1 transition-colors shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Today's Hardware Deals
        </button>

        <button
          id="subnav-laptops-btn"
          onClick={() => {
            onSelectCategoryFilter('laptop');
            const el = document.getElementById('laptops');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-orange-400 py-0.5 font-semibold text-white transition-colors shrink-0"
        >
          Top Laptop Deals
        </button>

        <button
          id="subnav-cpus-btn"
          onClick={() => {
            onSelectCategoryFilter('cpu');
            const el = document.getElementById('cpus');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-orange-400 py-0.5 font-semibold text-white transition-colors shrink-0"
        >
          Intel & AMD Processors
        </button>

        <button
          id="subnav-rigs-btn"
          onClick={() => {
            onDepartmentChange('Prebuilt Gaming PCs');
            window.scrollTo({ top: 350, behavior: 'smooth' });
          }}
          className="hover:text-orange-400 py-0.5 text-gray-200 transition-colors shrink-0"
        >
          Gaming Rigs & Workstations
        </button>

        <button
          id="subnav-business-btn"
          onClick={() => {
            onDepartmentChange('Laptops');
            const el = document.getElementById('laptops');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:text-orange-400 py-0.5 text-gray-200 transition-colors shrink-0"
        >
          Business Laptops
        </button>

        <button
          id="subnav-configurator-btn"
          onClick={onOpenPcBuilder || onOpenConfiguratorModal}
          className="hover:text-orange-400 py-0.5 text-orange-300 font-semibold flex items-center gap-1 transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[15px]">tune</span>
          10-Step Custom PC Builder
        </button>

        <button
          id="subnav-buildlists-btn"
          onClick={onOpenConfiguratorModal}
          className="hover:text-orange-400 py-0.5 text-gray-200 transition-colors shrink-0"
        >
          PC Build Lists / Registry
        </button>

        <button
          id="subnav-tradein-btn"
          onClick={() => {
            onOpenTechDesk();
          }}
          className="hover:text-orange-400 py-0.5 text-gray-200 transition-colors shrink-0"
        >
          Trade-In GPU & CPU
        </button>

        <button
          id="subnav-techdesk-btn"
          onClick={onOpenTechDesk}
          className="hover:text-orange-400 py-0.5 text-gray-200 ml-auto hidden xl:flex items-center gap-1 transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[15px] text-primary">headset_mic</span>
          24/7 Expert Tech Desk
        </button>
      </div>
    </header>
  );
};
