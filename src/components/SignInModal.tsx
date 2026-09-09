import React, { useState } from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'fastpass'>('signin');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedIn(true);
    setTimeout(() => {
      onClose();
      setSignedIn(false);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6 z-10 border border-slate-300">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">verified_user</span>
            <h3 className="font-heading font-bold text-base text-text-dark">
              {activeTab === 'signin' ? 'Sign in to PCWARE Lab' : 'Activate FastPass 30-Day Trial'}
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-gray-200 my-4 text-xs">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2 font-bold text-center border-b-2 transition-colors ${
              activeTab === 'signin'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Account Sign In
          </button>
          <button
            onClick={() => setActiveTab('fastpass')}
            className={`flex-1 py-2 font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'fastpass'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <span>PCWARE FastPass</span>
            <span className="text-[10px] bg-orange-100 text-primary px-1 rounded">FREE</span>
          </button>
        </div>

        {signedIn ? (
          <div className="py-8 text-center space-y-2">
            <span className="material-symbols-outlined text-emerald-600 text-[40px]">check_circle</span>
            <h4 className="font-heading font-bold text-base text-gray-900">
              Welcome to PCWARE Hardware Network
            </h4>
            <p className="text-xs text-gray-500">FastPass privileges and hardware telemetry unlocked.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {activeTab === 'fastpass' && (
              <div className="bg-orange-50 border border-orange-200 rounded p-3 text-xs space-y-1 text-gray-700">
                <div className="font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                  Member Silicon Perks Included:
                </div>
                <div className="text-[11px] text-gray-600 space-y-1 pt-1">
                  <div>✓ Free same-day delivery on all boxed CPUs & rigs</div>
                  <div>✓ Top 5% ASIC lottery silicon binning</div>
                  <div>✓ Zero-deductible accidental laptop drop care</div>
                </div>
              </div>
            )}

            <div>
              <label className="font-bold text-gray-700 block mb-1">Email or Workstation ID</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@austin-lab.com"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Password</label>
              <input
                type="password"
                required
                defaultValue="password123"
                className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:border-primary outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white font-bold text-xs rounded shadow transition-all"
            >
              {activeTab === 'signin' ? 'Sign In' : 'Start 30-Day Free FastPass Trial'}
            </button>

            <div className="text-[11px] text-gray-500 text-center">
              By continuing, you agree to PCWARE Conditions of Use and Silicon Testing Protocols.
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
