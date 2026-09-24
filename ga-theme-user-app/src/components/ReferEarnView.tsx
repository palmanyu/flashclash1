import React, { useState } from 'react';
import { ChevronLeft, Copy, Check, Send } from 'lucide-react';

interface ReferEarnViewProps {
  onBack: () => void;
}

/**
 * Pixel-accurate Refer & Earn component matching Image 2
 */
export const ReferEarnView: React.FC<ReferEarnViewProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);
  const referralCode = 'digicroz';

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: 'telegram' | 'facebook' | 'whatsapp') => {
    const text = encodeURIComponent(
      `Join me on Gamex! Use my referral code ${referralCode} to get 0 Coins register bonus!`
    );
    let url = '';
    if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${text}`;
    } else if (platform === 'telegram') {
      url = `https://t.me/share/url?url=https://gamex.app&text=${text}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=https://gamex.app&quote=${text}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full bg-white select-none text-slate-900 overflow-hidden">
      {/* Top Header Bar */}
      <div className="shrink-0 h-14 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-3 relative z-20">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-full active:scale-95 transition-all cursor-pointer z-10"
          aria-label="Back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
        <h1 className="absolute inset-x-0 text-center font-bold text-slate-900 text-base tracking-wide pointer-events-none font-['Outfit',_sans-serif]">
          Refer &amp; Earn
        </h1>
        <div className="w-9" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-white">
        <div className="pt-6 pb-7 px-4 flex flex-col items-center text-center">
          {/* Card Container */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm max-w-sm w-full mx-auto flex flex-col items-center text-center">
            {/* Headline */}
            <h2 className="text-slate-900 font-black text-2xl leading-tight tracking-tight max-w-xs font-['Outfit',_sans-serif]">
              Refer your friend
              <br />
              and <span className="text-red-600">Earn</span>
            </h2>

            {/* Gift Box SVG */}
            <div className="my-4 w-28 h-24 relative flex items-center justify-center">
              <svg
                viewBox="0 0 120 110"
                className="w-full h-full drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Bow Left Loop */}
                <path
                  d="M60 28 C45 10 32 16 40 28 C48 36 56 30 60 30 Z"
                  fill="#ef4444"
                />
                {/* Bow Right Loop */}
                <path
                  d="M60 28 C75 10 88 16 80 28 C72 36 64 30 60 30 Z"
                  fill="#ef4444"
                />
                {/* Bow Center Knot */}
                <circle cx="60" cy="29" r="5" fill="#dc2626" />

                {/* Gift Box Lid */}
                <rect x="18" y="30" width="84" height="16" rx="4" fill="#fbbf24" />
                {/* Lid Ribbon Band */}
                <rect x="54" y="30" width="12" height="16" fill="#dc2626" />

                {/* Box Body */}
                <rect x="23" y="44" width="74" height="52" rx="3" fill="#f59e0b" />
                {/* Vertical Ribbon Band */}
                <rect x="54" y="44" width="12" height="52" fill="#dc2626" />
              </svg>
            </div>

            {/* Description Text */}
            <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed max-w-[310px] font-normal">
              Invite your friends on App using your Referral Code to Earn 0 Coins in depositWallet When they join First Paid match, with minimum entry fee of 0. Your friends also get 0 Coins in depositWallet as Register Bonus!
            </p>

            {/* Dashed Referral Code Box */}
            <div className="w-full max-w-[310px] mt-4 border-2 border-dashed border-red-300 bg-red-50/50 rounded-xl p-3">
              <span className="block text-slate-700 text-[11px] font-medium mb-1">
                Your referral code
              </span>
              <div className="bg-white border border-slate-200 rounded-lg py-2 px-3 flex items-center justify-between shadow-xs">
                <span className="font-mono font-bold text-red-600 text-sm tracking-widest pl-1">
                  {referralCode}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors cursor-pointer active:scale-90"
                  title="Copy Code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  ) : (
                    <Copy className="w-4 h-4 stroke-[2.2]" />
                  )}
                </button>
              </div>
            </div>

            {/* Share Via Label */}
            <span className="text-slate-900 font-bold text-xs sm:text-sm mt-5 mb-2.5 block">
              Share your referral code via
            </span>

            {/* 3 Pill Action Buttons */}
            <div className="flex items-center justify-center gap-2">
              {/* Telegram */}
              <button
                onClick={() => handleShare('telegram')}
                className="bg-[#0088cc] hover:bg-[#0077b5] active:scale-95 text-white px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 -rotate-12 fill-white" />
                <span>Telegram</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="bg-[#1877f2] hover:bg-[#156cdb] active:scale-95 text-white px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span className="font-black text-sm leading-none">f</span>
                <span>Facebook</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="bg-[#25d366] hover:bg-[#20bd5a] active:scale-95 text-white px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.814 2.796.814 3.182 0 5.768-2.587 5.768-5.766 0-3.18-2.586-5.768-5.768-5.768zm3.376 8.211c-.141.396-.704.723-1.026.768-.323.045-.737.114-2.381-.531-1.996-.782-3.266-2.825-3.366-2.957-.099-.133-.807-1.073-.807-2.046 0-.973.51-1.452.691-1.648.181-.197.396-.247.528-.247.132 0 .264.002.378.008.121.006.284-.046.444.339.165.396.561 1.368.61 1.468.05.099.083.215.017.347-.066.132-.099.215-.198.33-.099.116-.208.258-.297.347-.099.099-.202.207-.087.404.116.198.514.848 1.103 1.373.759.676 1.399.886 1.597.985.198.099.314.083.43-.05.116-.132.496-.578.628-.776.132-.198.264-.165.446-.099.182.066 1.156.545 1.354.644.198.099.33.149.379.231.05.083.05.479-.091.875z" />
                </svg>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Space below container */}
        <div className="h-24" />
      </div>
    </div>
  );
};
