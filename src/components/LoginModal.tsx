import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { username: string; role: 'admin' | 'staff'; name: string }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const fillDemo = (role: 'admin' | 'staff') => {
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
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      onLoginSuccess({ username: 'admin', role: 'admin', name: 'System Administrator' });
      onClose();
    } else if (username.toLowerCase() === 'staff' && password === 'staff123') {
      onLoginSuccess({ username: 'staff', role: 'staff', name: 'Operations Staff' });
      onClose();
    } else {
      setError('Invalid credentials. Try demo credentials below.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 z-10 animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-primary flex items-center justify-center mx-auto text-xl font-bold">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <h3 className="font-heading font-bold text-xl text-text-dark">Control Panel Login</h3>
          <p className="text-xs text-text-muted">Sign in with your Admin or Staff credentials</p>
        </div>

        {/* Quick Demo Credentials */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-5 space-y-2 text-xs">
          <span className="block font-bold text-gray-700 text-[10px] uppercase font-mono tracking-wider">
            Quick Demo Logins:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fillDemo('admin')}
              className="flex-1 py-1.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px] transition shadow-sm flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">shield</span> Admin Login
            </button>
            <button
              type="button"
              onClick={() => fillDemo('staff')}
              className="flex-1 py-1.5 px-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-bold text-[11px] transition shadow-sm flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">manage_accounts</span> Staff Login
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin / staff"
              className="w-full px-3.5 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:outline-none"
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
              className="w-full px-3.5 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>

          {error && (
            <div className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded border border-red-200 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-text-dark font-bold text-xs rounded-full border border-[#fcd200] shadow uppercase tracking-wide cursor-pointer"
          >
            Log In to Control Panel
          </button>
        </form>
      </div>
    </div>
  );
};
