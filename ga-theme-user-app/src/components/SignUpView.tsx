import React, { useState } from 'react';
import { ChevronLeft, X, Check, Eye, EyeOff, User, Mail, Phone, Lock, Tag, AlertCircle } from 'lucide-react';
import { SignUpFormData } from '../types';

interface SignUpViewProps {
  onBack: () => void;
  onNavigateToLogin: () => void;
  onProceedToOtp: (data: SignUpFormData) => void;
  initialData?: Partial<SignUpFormData> | null;
  initialReferCode?: string;
  onShowToast?: (msg: string) => void;
}

export const SignUpView: React.FC<SignUpViewProps> = ({
  onBack,
  onNavigateToLogin,
  onProceedToOtp,
  initialData,
  initialReferCode = '',
  onShowToast,
}) => {
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [lastName, setLastName] = useState(initialData?.lastName || '');
  const [username, setUsername] = useState(initialData?.username || '');
  const [countryCode, setCountryCode] = useState(() => {
    if (initialData?.phoneNumber?.startsWith('+')) {
      const parts = initialData.phoneNumber.split(' ');
      return parts[0] || '+91';
    }
    return '+91';
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    if (initialData?.phoneNumber?.startsWith('+')) {
      const parts = initialData.phoneNumber.split(' ');
      return parts.slice(1).join(' ') || '';
    }
    return initialData?.phoneNumber || '';
  });
  const [email, setEmail] = useState(initialData?.email || '');
  const [promoCode, setPromoCode] = useState(initialData?.referCode || initialReferCode);
  const [promoApplied, setPromoApplied] = useState(Boolean(initialData?.referCode || initialReferCode));
  const [password, setPassword] = useState(initialData?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showCodeDropdown, setShowCodeDropdown] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googleNotice, setGoogleNotice] = useState(false);

  const handleGoogleSignUp = () => {
    setGoogleNotice(true);
    if (onShowToast) {
      onShowToast('Google sign up is coming soon!');
    }
    setTimeout(() => {
      setGoogleNotice(false);
    }, 4500);
  };

  const availableCodes = [
    { code: '+91', country: 'India 🇮🇳' },
    { code: '+1', country: 'USA 🇺🇸' },
    { code: '+44', country: 'UK 🇬🇧' },
    { code: '+971', country: 'UAE 🇦🇪' },
  ];

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setPromoApplied(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!firstName.trim()) {
      setErrorMsg('Please enter your first name.');
      return;
    }
    if (!lastName.trim()) {
      setErrorMsg('Please enter your last name.');
      return;
    }
    if (!username.trim()) {
      setErrorMsg('Please enter a username.');
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMsg('Please enter your mobile phone number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onProceedToOtp({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim().toLowerCase().replace(/^@/, ''),
        email: email.trim().toLowerCase(),
        phoneNumber: `${countryCode} ${phoneNumber.trim()}`,
        referCode: promoCode.trim() || undefined,
        password,
      });
    }, 450);
  };

  return (
    <div
      id="signup-screen"
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
          Create Account
        </h1>
        <div className="w-8" />
      </header>

      {/* Main Form Content */}
      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Title Header */}
          <div className="pb-1 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2575fc]">
              Join Gamex Esports
            </span>
            <h2 className="text-2xl font-bold font-['Outfit',_sans-serif] tracking-tight text-slate-900 mt-0.5">
              Sign Up for Tournaments
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in your gamer credentials to start competing.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* First Name & Last Name (Row) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                First Name *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-3.5 py-2.5 rounded-xl outline-none focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-3.5 py-2.5 rounded-xl outline-none focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Username *
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Gamer username (e.g. shadow_sniper)"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-3.5 py-2.5 rounded-xl outline-none focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Email with Clear Button */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-3.5 py-2.5 rounded-xl outline-none focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/10 transition-all pl-9 pr-9"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {email && (
                <button
                  type="button"
                  onClick={() => setEmail('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Phone Number with Country Code */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Mobile Number *
            </label>
            <div className="flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCodeDropdown((prev) => !prev)}
                  className="h-full bg-white border border-slate-200 hover:border-slate-300 text-slate-900 text-sm font-semibold px-3 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{countryCode}</span>
                </button>

                {showCodeDropdown && (
                  <div className="absolute top-full mt-1 left-0 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1 min-w-[130px]">
                    {availableCodes.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setCountryCode(item.code);
                          setShowCodeDropdown(false);
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-800 hover:bg-slate-100 flex items-center justify-between"
                      >
                        <span>{item.country}</span>
                        <span className="font-bold text-slate-500">{item.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative flex-1">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-3.5 py-2.5 rounded-xl outline-none focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/10 transition-all pl-9"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Refer Code (Optional) with Apply Action */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Refer Code (Optional)
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value.toUpperCase());
                  setPromoApplied(false);
                }}
                placeholder="Enter referral code"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-3.5 py-2.5 rounded-xl outline-none focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/10 transition-all pl-9 pr-20 uppercase font-mono"
              />
              <Tag className="w-4 h-4 text-slate-400 absolute left-3" />

              {promoCode && (
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  className={`absolute right-2 px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    promoApplied
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-blue-50 hover:bg-blue-100 text-[#2575fc] border border-blue-200'
                  }`}
                >
                  {promoApplied ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Applied
                    </span>
                  ) : (
                    'APPLY'
                  )}
                </button>
              )}
            </div>
            {promoApplied && (
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                ✓ ₹10 Welcome Bonus applied on sign up!
              </p>
            )}
          </div>

          {/* Password with Eye Toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create secure password (min 6 chars)"
                className="w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-3.5 py-2.5 rounded-xl outline-none focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/10 transition-all pl-9 pr-10"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
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

          {/* Terms Agreement Disclaimer */}
          <div className="pt-1">
            <p className="text-[11px] text-slate-500 leading-tight">
              By creating an account, you agree to Gamex{' '}
              <span className="text-[#2575fc] font-semibold">Terms &amp; Conditions</span> and{' '}
              <span className="text-[#2575fc] font-semibold">Privacy Policy</span>.
            </p>
          </div>

          {/* Sign Up Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#2575fc] to-[#1a56db] hover:from-[#1e66e6] hover:to-[#1648bc] active:scale-[0.98] text-white font-bold font-['Outfit',_sans-serif] py-3.5 px-6 rounded-xl text-lg tracking-wider uppercase transition-all duration-150 cursor-pointer shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>CREATE ACCOUNT</span>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative py-2 flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-slate-50 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider absolute">
              Or sign up with
            </span>
          </div>

          {/* Google Sign-up Button (Coming Soon) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGoogleSignUp}
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
                <span className="font-medium text-slate-700">Sign up with Google</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/80 shrink-0">
                Coming Soon!
              </span>
            </button>

            {googleNotice && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Google sign up method is coming soon! Please fill out the registration form above.</span>
              </div>
            )}
          </div>
        </form>

        {/* Footer Link to Login */}
        <div className="pt-6 pb-2 text-center">
          <p className="text-xs text-slate-600 font-medium">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="text-[#2575fc] font-bold hover:underline cursor-pointer font-['Outfit',_sans-serif] text-sm tracking-wide"
            >
              SIGN IN
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};
