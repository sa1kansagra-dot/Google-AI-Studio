/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { QuadCards } from './components/QuadCards';
import { ProductCard } from './components/ProductCard';
import { BundleSection } from './components/BundleSection';
import { TrustStrip } from './components/TrustStrip';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { DeliveryModal } from './components/DeliveryModal';
import { SignInModal } from './components/SignInModal';
import { OrdersModal } from './components/OrdersModal';
import { ConfiguratorModal } from './components/ConfiguratorModal';
import { TechDeskDrawer } from './components/TechDeskDrawer';
import { LoginModal } from './components/LoginModal';
import { ErpDashboard } from './components/ErpDashboard';
import { CustomPcBuilderPage } from './components/CustomPcBuilderPage';
import {
  LAPTOP_PRODUCTS,
  CPU_PRODUCTS,
  FLASH_DEAL_LAPTOP,
  ASSET_IMAGES,
} from './data/products';
import { Product, CartItem, DeliveryAddress } from './types';

export default function App() {
  // Prepopulate with 3 items to match the mockup's initial cart count of 3
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: LAPTOP_PRODUCTS[3], // ASUS ROG Zephyrus G16 OLED
      quantity: 1,
    },
    {
      product: CPU_PRODUCTS[0], // AMD Ryzen 7 7800X3D
      quantity: 1,
      appliedCoupon: 20,
    },
    {
      product: {
        id: 'ssd-samsung-990-pro',
        category: 'storage',
        title: 'Samsung 990 PRO 2TB NVMe M.2 Internal SSD PCIe Gen 4.0',
        image: ASSET_IMAGES.storageBase,
        price: 179.99,
        originalPrice: 219.99,
        badge: 'Fast Storage',
        badgeColor: 'dark',
        rating: 4.9,
        reviewsCount: 8940,
        boughtPastMonth: '10K+ bought in past month',
        shipping: 'PCWARE FastPass',
        shippingSpeed: 'FREE Delivery Tomorrow',
        inStock: true,
        specs: [
          { label: 'Form Factor', value: 'M.2 2280 NVMe' },
          { label: 'Read Speed', value: 'Up to 7,450 MB/s' },
        ],
      },
      quantity: 1,
    },
  ]);

  // Delivery Location matching the mockup "Deliver to Austin Texas 78701"
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    city: 'Austin',
    state: 'Texas',
    zip: '78701',
  });

  // Filter & Search states
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'laptop' | 'cpu' | 'deals'>('all');

  // View Mode state: 'storefront' | 'pc-builder' | 'erp'
  const [currentView, setCurrentView] = useState<'storefront' | 'pc-builder' | 'erp'>('storefront');
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ username: string; role: 'admin' | 'staff'; name: string } | null>(null);

  // Modal / Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isTechDeskOpen, setIsTechDeskOpen] = useState(false);
  const [isDepartmentDrawerOpen, setIsDepartmentDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, appliedCoupon?: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                appliedCoupon: appliedCoupon ?? item.appliedCoupon,
              }
            : item
        );
      }
      return [...prev, { product, quantity: 1, appliedCoupon }];
    });
    showToast(`Added "${product.title.slice(0, 32)}..." to your cart!`);
  };

  const handleAddBundleToCart = (items: Product[]) => {
    items.forEach((item) => handleAddToCart(item));
    showToast('All 3 Workspace Bundle items added with ₹6,800 bundle savings!');
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Filtered lists
  const filteredLaptops = useMemo(() => {
    let list = LAPTOP_PRODUCTS;
    if (selectedDepartment === 'CPUs & Processors') return [];
    if (categoryFilter === 'cpu') return [];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.specChips?.some((c) => c.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedDepartment, categoryFilter, searchQuery]);

  const filteredCPUs = useMemo(() => {
    let list = CPU_PRODUCTS;
    if (selectedDepartment === 'Laptops') return [];
    if (categoryFilter === 'laptop') return [];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle?.toLowerCase().includes(q) ||
          p.specChips?.some((c) => c.toLowerCase().includes(q)) ||
          p.socketOrFormFactor?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedDepartment, categoryFilter, searchQuery]);

  const hasActiveFilter = searchQuery !== '' || selectedDepartment !== 'All Departments' || categoryFilter !== 'all';

  return (
    <div className="min-h-screen flex flex-col bg-[#eaeded] font-body text-text-dark selection:bg-orange-500 selection:text-white" id="top">
      {/* 1. Header with Amazon-like navigation */}
      {/* 1. Header with Amazon-like navigation */}
      <Header
        cartCount={totalCartCount}
        deliveryAddress={deliveryAddress}
        selectedDepartment={selectedDepartment}
        searchQuery={searchQuery}
        onDepartmentChange={(dept) => {
          setSelectedDepartment(dept);
          if (dept === 'Laptops') setCategoryFilter('laptop');
          else if (dept === 'CPUs & Processors') setCategoryFilter('cpu');
          else setCategoryFilter('all');
          if (currentView !== 'storefront') setCurrentView('storefront');
        }}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDeliveryModal={() => setIsDeliveryModalOpen(true)}
        onOpenSignInModal={() => setIsSignInModalOpen(true)}
        onOpenOrdersModal={() => setIsOrdersModalOpen(true)}
        onOpenConfiguratorModal={() => setIsConfiguratorOpen(true)}
        onOpenTechDesk={() => setIsTechDeskOpen(true)}
        onOpenDepartmentMenu={() => setIsDepartmentDrawerOpen(true)}
        onSelectCategoryFilter={(cat) => setCategoryFilter(cat)}
        onOpenStaffLogin={() => setIsStaffLoginOpen(true)}
        onOpenPcBuilder={() => {
          setSelectedProduct(null);
          setCurrentView('pc-builder');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenErpPortal={() => {
          if (!currentUser) {
            setIsStaffLoginOpen(true);
          } else {
            setSelectedProduct(null);
            setCurrentView('erp');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        currentUser={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setCurrentView('storefront');
          showToast('Logged out of staff portal');
        }}
      />

      {/* Navigation Breadcrumb Bar for specialized views */}
      {currentView !== 'storefront' && (
        <div className="bg-[#232f3e] border-b border-gray-700 text-white px-4 py-2 text-xs flex items-center justify-between max-w-[1480px] mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Navigation:</span>
            <span className="font-bold text-amber-400">
              {currentView === 'erp' ? '🏢 Enterprise ERP Portal' : '⚙️ 10-Step Interactive Custom PC Builder'}
            </span>
          </div>
          <button
            onClick={() => setCurrentView('storefront')}
            className="px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded font-bold transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">storefront</span>
            Back to E-Commerce Storefront
          </button>
        </div>
      )}

      {/* Filter Status Notification Bar if filtered */}
      {hasActiveFilter && currentView === 'storefront' && (
        <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-xs flex items-center justify-between max-w-[1480px] mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-900">Filtered view:</span>
            {searchQuery && (
              <span className="bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-mono">
                Keyword: "{searchQuery}"
              </span>
            )}
            {selectedDepartment !== 'All Departments' && (
              <span className="bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-mono">
                Dept: {selectedDepartment}
              </span>
            )}
            {categoryFilter !== 'all' && (
              <span className="bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded font-mono">
                Category: {categoryFilter.toUpperCase()}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDepartment('All Departments');
              setCategoryFilter('all');
            }}
            className="text-primary hover:underline font-bold"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="w-full pb-10 flex-1">
        {currentView === 'erp' ? (
          <ErpDashboard
            onBackToStorefront={() => setCurrentView('storefront')}
            currentUser={currentUser || { username: 'staff', role: 'staff', name: 'Operations Staff' }}
          />
        ) : currentView === 'pc-builder' ? (
          <CustomPcBuilderPage
            onBack={() => setCurrentView('storefront')}
            onAddCustomBuildToCart={(rig) => {
              handleAddToCart(rig);
              setIsCartOpen(true);
            }}
          />
        ) : selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => {
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onBuyNow={(prod) => {
              handleAddToCart(prod);
              setIsCartOpen(true);
            }}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onOpenConfigurator={() => setIsConfiguratorOpen(true)}
          />
        ) : (
          <>
            {/* 2. Hero & Signature Quad-Cards */}
            <HeroBanner
              onShopLaptops={() => {
                const el = document.getElementById('laptops');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onShopCPUs={() => {
                const el = document.getElementById('cpus');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectProduct={(product) => setSelectedProduct(product)}
            />

            <QuadCards
              onSelectLaptopCategory={(cat) => {
                setCategoryFilter('laptop');
                const el = document.getElementById('laptops');
                el?.scrollIntoView({ behavior: 'smooth' });
                showToast(`Filtering view for: ${cat}`);
              }}
              onSelectCpuCategory={(cat) => {
                setCategoryFilter('cpu');
                const el = document.getElementById('cpus');
                el?.scrollIntoView({ behavior: 'smooth' });
                showToast(`Filtering view for: ${cat}`);
              }}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onOpenSignIn={() => setIsSignInModalOpen(true)}
              onSeeAllDeals={() => {
                setCategoryFilter('deals');
                const el = document.getElementById('deals');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 3. Horizontal Product Strip 1: High-Performance Laptops */}
            {filteredLaptops.length > 0 && (
              <section className="max-w-[1480px] mx-auto px-4 mt-6" id="laptops">
                <div className="bg-white p-4 md:p-5 rounded shadow-sm border border-border-subtle">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 border-b border-gray-100 pb-3 gap-2">
                    <div className="flex items-baseline gap-3">
                      <h2 className="font-heading font-bold text-xl md:text-2xl text-text-dark">
                        Best Sellers in High-Performance Laptops
                      </h2>
                      <span
                        onClick={() => {
                          setCategoryFilter('laptop');
                          setSearchQuery('');
                        }}
                        className="text-xs text-tertiary hover:underline cursor-pointer hidden md:inline"
                      >
                        See all 84 laptops
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-text-muted">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-mono text-[11px] font-bold">
                        READY TO SHIP TODAY
                      </span>
                    </div>
                  </div>

                  {/* Laptops Carousel / Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredLaptops.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onSelectProduct={(p) => {
                          setSelectedProduct(p);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 4. Horizontal Product Strip 2: Desktop Processors & Boxed CPUs */}
            {filteredCPUs.length > 0 && (
              <section className="max-w-[1480px] mx-auto px-4 mt-6" id="cpus">
                <div className="bg-white p-4 md:p-5 rounded shadow-sm border border-border-subtle">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 border-b border-gray-100 pb-3 gap-2">
                    <div className="flex items-baseline gap-3">
                      <h2 className="font-heading font-bold text-xl md:text-2xl text-text-dark">
                        Top Selling Desktop Processors & CPUs (Intel & AMD Boxed)
                      </h2>
                      <span
                        onClick={() => {
                          setCategoryFilter('cpu');
                          setSearchQuery('');
                        }}
                        className="text-xs text-tertiary hover:underline cursor-pointer hidden md:inline"
                      >
                        See all 52 CPUs
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <span className="flex items-center gap-1 text-primary font-bold">
                        <span className="material-symbols-outlined text-[16px]">verified</span> 100% Genuine Boxed with Factory Warranty
                      </span>
                    </div>
                  </div>

                  {/* CPUs Carousel / Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCPUs.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onSelectProduct={(p) => {
                          setSelectedProduct(p);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Empty state if search filter matches nothing */}
            {filteredLaptops.length === 0 && filteredCPUs.length === 0 && (
              <div className="max-w-[1480px] mx-auto px-4 mt-8">
                <div className="bg-white p-12 text-center rounded border border-border-subtle space-y-3">
                  <span className="material-symbols-outlined text-[48px] text-gray-400">search_off</span>
                  <h3 className="font-heading font-bold text-lg text-gray-800">
                    No matching hardware found for "{searchQuery}"
                  </h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Check your spelling or try searching for keywords like "Ryzen", "Core i9", "RTX 4090", "OLED", or "DDR5".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDepartment('All Departments');
                      setCategoryFilter('all');
                    }}
                    className="px-5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded shadow"
                  >
                    Reset Search
                  </button>
                </div>
              </div>
            )}

            {/* 5. Frequently Bought Together CPU + Laptop Workspace Bundles */}
            <BundleSection
              onAddBundleToCart={handleAddBundleToCart}
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 6. Trust & Certified Services Strip */}
            <TrustStrip onOpenTechDesk={() => setIsTechDeskOpen(true)} />
          </>
        )}
      </main>

      {/* 7. Footer (4-Tier Amazon Style) */}
      <Footer
        onOpenSignIn={() => setIsSignInModalOpen(true)}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
        onOpenTechDesk={() => setIsTechDeskOpen(true)}
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
      />

      {/* Interactive Modals and Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        currentAddress={deliveryAddress}
        onClose={() => setIsDeliveryModalOpen(false)}
        onUpdateAddress={(newAddr) => {
          setDeliveryAddress(newAddr);
          showToast(`Delivery location updated to ${newAddr.city}, ${newAddr.state} ${newAddr.zip}`);
        }}
      />

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />

      <LoginModal
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsStaffLoginOpen(false);
          setCurrentView('erp');
          showToast(`Welcome ${user.name}! ERP & Inventory Management Granted.`);
        }}
      />

      <OrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />

      <ConfiguratorModal
        isOpen={isConfiguratorOpen}
        onClose={() => setIsConfiguratorOpen(false)}
        onAddCustomBuildToCart={(rig) => {
          handleAddToCart(rig);
          setIsCartOpen(true);
        }}
      />

      <TechDeskDrawer
        isOpen={isTechDeskOpen}
        onClose={() => setIsTechDeskOpen(false)}
      />

      <DepartmentDrawer
        isOpen={isDepartmentDrawerOpen}
        onClose={() => setIsDepartmentDrawerOpen(false)}
        onSelectCategory={(cat) => {
          setCategoryFilter(cat);
          if (cat === 'laptop') {
            const el = document.getElementById('laptops');
            el?.scrollIntoView({ behavior: 'smooth' });
          } else if (cat === 'cpu') {
            const el = document.getElementById('cpus');
            el?.scrollIntoView({ behavior: 'smooth' });
          } else if (cat === 'deals') {
            const el = document.getElementById('deals');
            el?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenConfigurator={() => setIsConfiguratorOpen(true)}
        onOpenTechDesk={() => setIsTechDeskOpen(true)}
      />

      {/* Floating Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#131921] text-white px-4 py-3 rounded-lg shadow-2xl border border-gray-700 flex items-center gap-3 animate-slide-up text-xs">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="ml-2 px-2.5 py-1 bg-[#ffd814] text-text-dark font-bold rounded text-[11px] hover:bg-[#f7ca00]"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
