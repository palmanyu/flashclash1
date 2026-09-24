import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  Mail,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Edit3,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

interface OtpVerificationViewProps {
  email: string;
  onBack: () => void;
  onChangeEmail?: () => void;
  onVerifySuccess: () => void;
  onShowToast?: (msg: string) => void;
}

export const OtpVerificationView: React.FC<OtpVerificationViewProps> = ({
  email,
  onBack,
  onChangeEmail,
  onVerifySuccess,
  onShowToast,
}) => {
  const OTP_LENGTH = 6;
  const DEFAULT_DEMO_OTP = '123456';

  const [otpValues, setOtpValues] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [activeDemoOtp, setActiveDemoOtp] = useState<string>(DEFAULT_DEMO_OTP);
  const [timer, setTimer] = useState<number>(30);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [copiedDemo, setCopiedDemo] = useState<boolean>(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    setErrorMessage(null);
    // Allow only numeric digits
    const cleaned = value.replace(/\D/g, '');

    if (!cleaned) {
      const updated = [...otpValues];
      updated[index] = '';
      setOtpValues(updated);
      return;
    }

    // If pasted or typed multiple digits
    if (cleaned.length > 1) {
      handlePasteDigits(cleaned, index);
      return;
    }

    const updated = [...otpValues];
    updated[index] = cleaned[0];
    setOtpValues(updated);

    // Auto focus next input
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePasteDigits = (digits: string, startIndex: number = 0) => {
    const chars = digits.slice(0, OTP_LENGTH).split('');
    const updated = [...otpValues];

    chars.forEach((char, i) => {
      const targetIndex = startIndex + i;
      if (targetIndex < OTP_LENGTH) {
        updated[targetIndex] = char;
      }
    });

    setOtpValues(updated);

    const nextFocusIndex = Math.min(startIndex + chars.length, OTP_LENGTH - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        // Move back and clear previous
        const updated = [...otpValues];
        updated[index - 1] = '';
        setOtpValues(updated);
        inputRefs.current[index - 1]?.focus();
      } else {
        const updated = [...otpValues];
        updated[index] = '';
        setOtpValues(updated);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
    if (pastedData) {
      handlePasteDigits(pastedData, 0);
    }
  };

  const handleFillDemoCode = () => {
    const chars = activeDemoOtp.split('');
    setOtpValues(chars);
    setErrorMessage(null);
    inputRefs.current[OTP_LENGTH - 1]?.focus();
    if (onShowToast) {
      onShowToast(`Demo OTP (${activeDemoOtp}) auto-filled!`);
    }
  };

  const handleCopyDemoCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeDemoOtp);
      setCopiedDemo(true);
      setTimeout(() => setCopiedDemo(false), 2000);
      if (onShowToast) {
        onShowToast(`Copied ${activeDemoOtp} to clipboard!`);
      }
    }
  };

  const handleResendOtp = () => {
    if (timer > 0) return;
    // Generate new 6-digit random code for realistic demo
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveDemoOtp(newCode);
    setTimer(30);
    setOtpValues(Array(OTP_LENGTH).fill(''));
    setErrorMessage(null);
    inputRefs.current[0]?.focus();

    if (onShowToast) {
      onShowToast(`A new 6-digit verification code was sent to ${email}`);
    }
  };

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const enteredOtp = otpValues.join('');
    if (enteredOtp.length < OTP_LENGTH) {
      setErrorMessage(`Please enter all ${OTP_LENGTH} digits of your verification code.`);
      return;
    }

    // Check if code matches active demo code or the universal test code
    if (enteredOtp !== activeDemoOtp && enteredOtp !== '123456' && enteredOtp !== '000000') {
      setErrorMessage(`Invalid OTP code. Please enter the valid code sent to your email (${activeDemoOtp}).`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onVerifySuccess();
      }, 600);
    }, 800);
  };

  const isOtpComplete = otpValues.every((val) => val.trim().length > 0);

  return (
    <div
      id="otp-verification-screen"
      className="relative w-full h-full min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Outfit',_sans-serif] select-none overflow-y-auto"
    >
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0 shadow-2xs">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back to Sign Up"
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 active:scale-95 transition-transform cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold tracking-wider uppercase text-slate-900">
          Email Verification
        </h1>
        <div className="w-8 flex justify-end">
          <ShieldCheck className="w-5 h-5 text-[#2575fc]" />
        </div>
      </header>

      {/* Main Content Card Container */}
      <div className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full p-5 sm:p-6">
        <div className="space-y-6">
          {/* Hero Icon & Title */}
          <div className="text-center pt-2">
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/25 mb-4">
              <Mail className="w-8 h-8 stroke-[2.2]" />
              <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-white" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-[26px] font-black tracking-tight text-slate-900">
              Verify Your Email
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium leading-relaxed">
              We have dispatched a 6-digit one-time password (OTP) to your registered email address.
            </p>

            {/* Email Badge with Quick Edit */}
            <div className="mt-3 inline-flex items-center gap-2 bg-white border border-slate-200/90 rounded-full py-1.5 px-3.5 shadow-2xs max-w-full">
              <span className="text-xs font-bold text-slate-800 truncate max-w-[220px] sm:max-w-[260px]">
                {email || 'your.email@example.com'}
              </span>
              {onChangeEmail && (
                <button
                  type="button"
                  onClick={onChangeEmail}
                  className="text-xs font-bold text-[#2575fc] hover:text-blue-700 flex items-center gap-1 cursor-pointer active:scale-95 transition-transform shrink-0"
                  title="Edit Email Address"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>

          {/* OTP Input Boxes */}
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center items-center gap-2 sm:gap-2.5">
              {otpValues.map((digit, index) => {
                const isCurrent = digit.length > 0;
                return (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={`w-11 h-13 sm:w-12 sm:h-14 rounded-xl border text-center text-xl sm:text-2xl font-black transition-all outline-hidden ${
                      isCurrent
                        ? 'border-[#2575fc] bg-blue-50/40 text-[#1a56db] ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-[#2575fc] focus:ring-2 focus:ring-blue-500/20 focus:bg-blue-50/20'
                    }`}
                  />
                );
              })}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-3 py-2.5 rounded-xl animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Demo Helper Banner for Seamless Testing */}
            <div className="bg-gradient-to-r from-blue-50/90 to-indigo-50/80 border border-blue-200/80 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <span className="font-semibold text-slate-500">Demo Code:</span>
                <span className="font-black text-sm tracking-widest text-[#2575fc] bg-white px-2 py-0.5 rounded-md border border-blue-200 shadow-2xs font-mono">
                  {activeDemoOtp}
                </span>
              </div>
              <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleCopyDemoCode}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 text-slate-700 font-bold text-[11px] shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedDemo ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-500" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleFillDemoCode}
                  className="px-3 py-1 rounded-lg bg-[#2575fc] hover:bg-blue-600 active:scale-95 text-white font-bold text-[11px] shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Auto-fill Code</span>
                </button>
              </div>
            </div>

            {/* Resend OTP Section */}
            <div className="text-center pt-1">
              <span className="text-xs text-slate-500 font-medium">
                Didn&apos;t receive the code?{' '}
              </span>
              {timer > 0 ? (
                <span className="text-xs font-bold text-slate-700 inline-flex items-center gap-1 ml-1">
                  <RefreshCw className="w-3 h-3 animate-spin text-blue-500" />
                  <span>Resend in {timer}s</span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-xs font-bold text-[#2575fc] hover:text-blue-700 hover:underline cursor-pointer inline-flex items-center gap-1 active:scale-95 transition-transform"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={!isOtpComplete || isSubmitting || isSuccess}
                className={`w-full py-3.5 px-6 rounded-xl font-bold text-base sm:text-lg tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                    : isOtpComplete && !isSubmitting
                    ? 'bg-gradient-to-r from-[#2575fc] to-[#1a56db] hover:from-[#1e66e6] hover:to-[#1648bc] text-white shadow-blue-500/20 active:scale-[0.98]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-white stroke-[2.5]" />
                    <span>Verified!</span>
                  </>
                ) : (
                  <>
                    <span>VERIFY &amp; PROCEED</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onBack}
                className="w-full py-2.5 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Cancel &amp; Return to Sign Up
              </button>
            </div>
          </form>
        </div>

        {/* Spam Folder Advisory */}
        <footer className="pt-6 pb-2 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            🔒 Protected by 256-bit encryption. Check your spam folder if you do not receive the email within 1 minute.
          </p>
        </footer>
      </div>
    </div>
  );
};
