import React from 'react';
import { ASSET_IMAGES } from '../data/products';

interface FooterProps {
  onOpenSignIn?: () => void;
  onOpenOrders?: () => void;
  onOpenTechDesk?: () => void;
  onOpenConfigurator?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSignIn,
  onOpenOrders,
  onOpenTechDesk,
  onOpenConfigurator
}) => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#232f3e] text-white mt-10">
      {/* Back to Top Bar */}
      <a
        id="footer-back-to-top"
        onClick={scrollToTop}
        href="#top"
        className="block w-full py-3.5 bg-[#37475a] hover:bg-[#485769] text-center text-xs text-white font-semibold transition-colors cursor-pointer"
      >
        Back to top
      </a>

      {/* Multi-column links directory */}
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1 */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 font-heading">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a className="hover:underline cursor-pointer" onClick={scrollToTop}>
                  About PCWARE Lab Store
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenTechDesk}>
                  Careers & Engineering Roles
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenTechDesk}>
                  Silicon Testing Protocols
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={scrollToTop}>
                  PCWARE Lab Facilities (Austin & Frankfurt)
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={scrollToTop}>
                  Investor Relations
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenConfigurator}>
                  PCWARE Science & Benchmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 font-heading">Make Money with PCWARE</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenTechDesk}>
                  Sell Hardware on PCWARE
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenTechDesk}>
                  CPU & GPU Trade-In Program
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={scrollToTop}>
                  Become an Affiliate Partner
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={scrollToTop}>
                  Advertise Your Tech Gear
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenConfigurator}>
                  Custom System Builder Alliance
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 font-heading">PCWARE Payment Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenSignIn}>
                  PCWARE Store Card (5% Back)
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenSignIn}>
                  Shop with Tech Rewards Points
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenSignIn}>
                  Reload Your Hardware Balance
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={scrollToTop}>
                  PCWARE Enterprise Net-30 Terms
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={scrollToTop}>
                  0% APR Financing over 24 Months
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-sm text-white mb-3 font-heading">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenSignIn}>
                  Your PCWARE Account
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenOrders}>
                  Your Hardware Orders & Serial Tracking
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={scrollToTop}>
                  Shipping Rates & Policies
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenOrders}>
                  Returns & 3-Year Warranty Replacements
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenConfigurator}>
                  Silicon Compatibility Assistant
                </a>
              </li>
              <li>
                <a className="hover:underline cursor-pointer" onClick={onOpenTechDesk}>
                  PCWARE Customer Service Desk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Brand & Region Strip */}
      <div className="border-t border-[#3a4553] py-6 bg-[#131a22]">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              alt="PCWARE"
              className="h-6 w-auto object-contain brightness-110"
              src={ASSET_IMAGES.bottomLogo}
            />
            <div className="flex items-center gap-2 border border-gray-600 rounded px-2 py-1 text-xs text-gray-300">
              <span>🇺🇸 United States</span>
            </div>
            <div className="flex items-center gap-2 border border-gray-600 rounded px-2 py-1 text-xs text-gray-300">
              <span>USD - U.S. Dollar</span>
            </div>
          </div>

          <div className="text-[11px] text-gray-400 flex flex-wrap justify-center gap-4">
            <span className="hover:underline cursor-pointer">Conditions of Use</span>
            <span className="hover:underline cursor-pointer">Privacy Notice</span>
            <span className="hover:underline cursor-pointer">Consumer Health Data Privacy</span>
            <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
          </div>
        </div>

        <div className="text-center text-[11px] text-gray-400 mt-3">
          © 2025, PCWARE Systems Inc. or its silicon hardware affiliates. All specs and performance telemetry verified.
        </div>
      </div>
    </footer>
  );
};
