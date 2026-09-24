import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, User, Lock, AlertCircle } from 'lucide-react';
import { LoginFormData } from '../types';

interface LoginViewProps {
  onBack: () => void;
  onNavigateToSignUp: () => void;
  onLoginSuccess: (data: LoginFormData) => void;
  defaultIdentifier?: string;
  onShowToast?: (msg: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onBack,
  onNavigateToSignUp,
  onLoginSuccess,
  defaultIdentifier = '',
  onShowToast,
}) => {
  const [identifier, setIdentifier] = useState(defaultIdentifier || 'digicroz');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!identifier.trim()) {
      setErrorMsg('Please enter your Email, Mobile No, or Username.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess({
        identifier: identifier.trim(),
        password,
      });
    }, 400);
  };

  const handleGoogleLogin = () => {
    setGoogleNotice(true);
    if (onShowToast) {
      onShowToast('Google login method is coming soon!');
    }
    setTimeout(() => {
      setGoogleNotice(false);
    }, 4500);
  };

  return (
    <div
      id="login-screen"
      className="relative w-full h-full min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Outfit',_sans-serif] select-none overflow-y-auto"
    >
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 shadow-2xs">
        <button
          onClick={onBack}
          className="p-1.5 -ml-1.5 rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold font-['Outfit',_sans-serif] tracking-wider uppercase text-slate-900">
          Sign In
        </h1>
        <div className="w-8" />
      </header>

      {/* Main Form Content */}
      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Header */}
          <div className="pt-2 pb-2 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2575fc]">
              Welcome Back
            </span>
            <h2 className="text-2xl font-bold font-['Outfit',_sans-serif] tracking-tight text-slate-900 mt-0.5">
              Login to Gamex
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your credentials to access wallet and joined matches.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Email / Mobile No / Username */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Email, Mobile No or Username *
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter username, email or mobile"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-4 py-3 rounded-xl outline-none focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/10 transition-all pl-10"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-600">
                Password *
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs font-semibold text-[#2575fc] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-4 py-3 rounded-xl outline-none focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/10 transition-all pl-10 pr-10"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Login Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#2575fc] to-[#1a56db] hover:from-[#1e66e6] hover:to-[#1648bc] active:scale-[0.98] text-white font-bold font-['Outfit',_sans-serif] py-3.5 px-6 rounded-xl text-lg tracking-wider uppercase transition-all duration-150 cursor-pointer shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>LOGIN</span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-slate-50 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider absolute">
              Or continue with
            </span>
          </div>

          {/* Google Sign-in Button */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-slate-700 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-between gap-2.5 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="font-medium text-slate-700">Continue with Google</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/80 shrink-0">
                Coming Soon!
              </span>
            </button>

            {googleNotice && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Google login method is coming soon! Please use your Email or Username.</span>
              </div>
            )}
          </div>
        </form>

        {/* Footer Link to Sign Up */}
        <div className="pt-6 pb-2 text-center">
          <p className="text-xs text-slate-600 font-medium">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToSignUp}
              className="text-[#2575fc] font-bold hover:underline cursor-pointer font-['Outfit',_sans-serif] text-sm tracking-wide"
            >
              CREATE FREE ACCOUNT
            </button>
          </p>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold font-['Outfit',_sans-serif] text-slate-900">
              Reset Password
            </h3>
            <p className="text-xs text-slate-600">
              Enter your registered mobile number or email to receive a password reset link.
            </p>

            {forgotSent ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs p-3 rounded-xl">
                Reset link sent! Please check your SMS or email inbox.
              </div>
            ) : (
              <input
                type="text"
                value={forgotInput}
                onChange={(e) => setForgotInput(e.target.value)}
                placeholder="Mobile number or Email"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm px-3.5 py-2.5 rounded-xl outline-none focus:border-[#2575fc]"
              />
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsForgotModalOpen(false);
                  setForgotSent(false);
                  setForgotInput('');
                }}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => {
                    if (forgotInput.trim()) {
                      setForgotSent(true);
                    }
                  }}
                  className="flex-1 py-2 bg-[#2575fc] text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Send Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
