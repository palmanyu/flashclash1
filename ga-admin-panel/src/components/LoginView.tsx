import React, { useState } from 'react';
import { LNLogo } from './Icons';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen w-full bg-[#f3f6fb] flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-8">
        <LNLogo className="w-9 h-9" />
        <span className="text-2xl font-bold tracking-tight text-[#0e274b]">
          GA Admin Panel
        </span>
      </div>

      {/* Login Card (Pixel-to-Pixel Replica of Image 1) */}
      <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.03)] border border-slate-100/90 p-8 sm:p-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field */}
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Your email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email here"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center pt-1">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="ml-2.5 block text-sm text-slate-600 cursor-pointer select-none"
            >
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            id="btn-sign-in"
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-[#0969da] hover:bg-[#085ec4] active:bg-[#0753ad] text-white font-medium text-sm rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};
