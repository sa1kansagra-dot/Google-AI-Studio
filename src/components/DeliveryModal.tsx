import React, { useState } from 'react';
import { DeliveryAddress } from '../types';

interface DeliveryModalProps {
  isOpen: boolean;
  currentAddress: DeliveryAddress;
  onClose: () => void;
  onUpdateAddress: (address: DeliveryAddress) => void;
}

const PRESET_CITIES = [
  { city: 'Austin', state: 'Texas', zip: '78701' },
  { city: 'Dallas', state: 'Texas', zip: '75201' },
  { city: 'San Francisco', state: 'California', zip: '94107' },
  { city: 'Seattle', state: 'Washington', zip: '98101' },
  { city: 'New York', state: 'New York', zip: '10001' },
  { city: 'Chicago', state: 'Illinois', zip: '60601' },
];

export const DeliveryModal: React.FC<DeliveryModalProps> = ({
  isOpen,
  currentAddress,
  onClose,
  onUpdateAddress,
}) => {
  const [zip, setZip] = useState(currentAddress.zip);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleApplyZip = (e: React.FormEvent) => {
    e.preventDefault();
    const found = PRESET_CITIES.find((c) => c.zip === zip);
    if (found) {
      onUpdateAddress(found);
      onClose();
    } else if (zip.length === 5) {
      onUpdateAddress({ city: 'Austin Metro', state: 'TX', zip });
      onClose();
    } else {
      setError('Please enter a valid 5-digit US ZIP code');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-5 z-10 border border-slate-300">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <h3 className="font-heading font-bold text-base text-text-dark flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary">location_on</span>
            Choose Your Delivery Location
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs">
          <p className="text-text-muted leading-relaxed">
            Delivery options and FastPass morning cutoff times vary by geographical facility hub.
          </p>

          {/* Quick Preset Selector */}
          <div>
            <label className="font-bold text-gray-700 block mb-1.5">Select a PCWARE Logistics Hub:</label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_CITIES.map((item) => (
                <button
                  key={item.zip}
                  onClick={() => {
                    onUpdateAddress(item);
                    onClose();
                  }}
                  className={`p-2 rounded border text-left transition-all ${
                    currentAddress.zip === item.zip
                      ? 'border-primary bg-orange-50/50 text-primary font-bold'
                      : 'border-gray-200 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="font-bold">{item.city}, {item.state.substring(0, 2)}</div>
                  <div className="text-[11px] text-gray-500 font-mono">{item.zip}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom ZIP input */}
          <form onSubmit={handleApplyZip} className="pt-2 border-t border-gray-100">
            <label className="font-bold text-gray-700 block mb-1">Or enter a US ZIP code:</label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={5}
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="e.g. 78701"
                className="flex-1 px-3 py-2 border border-gray-300 rounded font-mono text-sm focus:border-primary outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded shadow"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-badge-deal text-[11px] mt-1">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
