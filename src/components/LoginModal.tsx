import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { username: string; role: 'admin' | 'staff'; name: string }) => void;
  initialRole?: 'admin' | 'staff';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'staff',
}) => {
  const [activeTab, setActiveTab] = useState<'admin' | 'staff'>(initialRole);
  const [username, setUsername] = useState(initialRole === 'staff' ? 'staff' : 'admin');
  const [password, setPassword] = useState(initialRole === 'staff' ? 'staff123' : 'admin123');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleTabChange = (role: 'admin' | 'staff') => {
    setActiveTab(role);
    setError('');
    if (role === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('staff');
      setPassword('staff123');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = username.trim().toLowerCase();
    if ((input === 'admin' || input === 'admin@pcware.com') && password === 'admin123') {
      onLoginSuccess({ username: 'admin', role: 'admin', name: 'System Administrator' });
      onClose();
    } else if ((input === 'staff' || input === 'staff@pcware.com') && password === 'staff123') {
      onLoginSuccess({ username: 'staff', role: 'staff', name: 'Operations Staff' });
      onClose();
    } else {
      setError('Invalid email/username or password. Try default credentials shown below.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 z-10 animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 mb-5">
          <div className={`w-12 h-12 rounded-2xl ${activeTab === 'staff' ? 'bg-orange-100 text-primary' : 'bg-slate-800 text-amber-400'} flex items-center justify-center mx-auto text-xl font-bold transition-colors`}>
            <span className="material-symbols-outlined text-[26px]">
              {activeTab === 'staff' ? 'badge' : 'shield_person'}
            </span>
          </div>
          <h3 className="font-heading font-extrabold text-xl text-text-dark">
            {activeTab === 'staff' ? 'Staff Portal Login' : 'Admin Control Panel Login'}
          </h3>
          <p className="text-xs text-text-muted">
            {activeTab === 'staff' ? 'Inventory Stock Management & Order Processing' : 'Full Storefront & System Administration'}
          </p>
        </div>

        {/* Login Role Tabs */}
        <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => handleTabChange('staff')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'staff'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">badge</span>
            Staff Login
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('admin')}
            className={`flex-1 py-2 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-[#232f3e] text-amber-400 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">shield</span>
            Admin Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              {activeTab === 'staff' ? 'Staff Email / Username' : 'Admin Email / Username'}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder={activeTab === 'staff' ? 'staff@pcware.com' : 'admin@pcware.com'}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          {error && (
            <div className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark border border-[#fcd200] font-bold text-xs rounded-full shadow-md uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            Log In to {activeTab === 'staff' ? 'Staff Portal' : 'Admin Panel'}
          </button>
        </form>

        {/* Default Credential Notice */}
        <div className="mt-5 text-center bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] text-gray-600">
          🔑 Email Login: <strong className="font-mono text-slate-900">{activeTab === 'staff' ? 'staff@pcware.com / staff123' : 'admin@pcware.com / admin123'}</strong>
        </div>
      </div>
    </div>
  );
};
