import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Info,
  X,
  Sparkles,
} from 'lucide-react';

export interface ToastNotificationProps {
  message: string | null;
  title?: string;
  details?: string | string[];
  type?: 'default' | 'success' | 'error' | 'info';
  onClose?: () => void;
  dismissText?: string;
}

interface ParsedDetails {
  title: string;
  badge: string;
  type: 'default' | 'success' | 'error' | 'info';
  highlightText: string;
  tags?: { label: string; value: string }[];
  instructions: string[];
}

/**
 * Intelligent helper that derives rich, structured details from notification messages
 * matching tournament, wallet, and gameplay events.
 */
function deriveNotificationDetails(
  rawMessage: string,
  customTitle?: string,
  customDetails?: string | string[],
  customType?: 'default' | 'success' | 'error' | 'info' | string
): ParsedDetails {
  const msg = rawMessage.trim();
  const safeType: 'default' | 'success' | 'error' | 'info' =
    customType === 'success' || customType === 'error' || customType === 'info'
      ? customType
      : 'default';

  // 1. Contest / Tournament Joined
  const joinedMatch = msg.match(/Joined Contest #?(\w+) as "([^"]+)"/i);
  if (joinedMatch) {
    const contestId = joinedMatch[1];
    const ign = joinedMatch[2];
    return {
      title: customTitle || 'Registration Confirmed!',
      badge: 'SLOT RESERVED',
      type: customType ? safeType : 'success',
      highlightText: `Successfully registered for Match #${contestId}`,
      tags: [
        { label: 'Match ID', value: `#${contestId}` },
        { label: 'In-Game Name', value: ign },
        { label: 'Status', value: 'Confirmed' },
      ],
      instructions: [
        'Your position has been secured in the participant list.',
        'Room ID & Password will be updated 15 minutes before the match start time.',
        'Be ready in the game lobby on time with your registered IGN to avoid disqualification.',
      ],
    };
  }

  // 2. Insufficient Balance
  if (/insufficient/i.test(msg)) {
    return {
      title: customTitle || 'Insufficient Balance',
      badge: 'ACTION REQUIRED',
      type: 'error',
      highlightText: msg,
      instructions: [
        'You do not have enough wallet balance to cover the entry fee for this contest.',
        'Please visit the Wallet section and recharge to join tournaments and win cash rewards.',
      ],
    };
  }

  // 3. Recharge Request
  if (/recharge request/i.test(msg)) {
    return {
      title: customTitle || 'Recharge Request Submitted',
      badge: 'PENDING VERIFICATION',
      type: 'success',
      highlightText: msg,
      instructions: [
        'Your deposit transaction has been submitted for admin verification.',
        'Coins will be credited automatically once the reference ID is verified (typically 2-10 minutes).',
      ],
    };
  }

  // 4. Withdrawal / Redemption
  if (/withdraw|redeem|redemption/i.test(msg)) {
    return {
      title: customTitle || 'Payout Request Queued',
      badge: 'PROCESSING',
      type: 'success',
      highlightText: msg,
      instructions: [
        'Your payout request has been registered successfully.',
        'Winning funds are processed to your registered UPI / account within 2 to 24 hours.',
      ],
    };
  }

  // 5. Copied to Clipboard
  if (/copied/i.test(msg)) {
    return {
      title: customTitle || 'Copied to Clipboard',
      badge: 'CLIPBOARD',
      type: 'info',
      highlightText: msg,
      instructions: [
        'The details have been copied to your device clipboard.',
        'You can now paste them directly into your game or share with your squad.',
      ],
    };
  }

  // 6. Profile Saved
  if (/profile/i.test(msg)) {
    return {
      title: customTitle || 'Profile Updated',
      badge: 'SAVED',
      type: 'success',
      highlightText: msg,
      instructions: [
        'Your profile changes and gaming preferences have been saved.',
        'Future tournament registrations will use these updated credentials.',
      ],
    };
  }

  // 7. Generic Fallback
  const extraList = customDetails
    ? Array.isArray(customDetails)
      ? customDetails
      : [customDetails]
    : [
        'The requested action was completed successfully.',
        'You can check your match status or wallet logs for more information.',
      ];

  return {
    title: customTitle || 'Notification',
    badge: 'UPDATE',
    type: safeType,
    highlightText: msg,
    instructions: extraList,
  };
}

/**
 * Centered Rich Popup Box matching the white background theme
 * with signature red border accent and a prominent Dismiss button.
 */
export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  title,
  details,
  type = 'default',
  onClose,
  dismissText = 'DISMISS',
}) => {
  if (!message) return null;

  const parsed = deriveNotificationDetails(message, title, details, type);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-title"
      className="fixed inset-0 z-80 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fadeIn"
    >
      {/* Backdrop click to dismiss */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Notification Box */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl border-2 border-[#ef4444] shadow-2xl shadow-slate-900/30 overflow-hidden z-10 animate-scaleUp">
        {/* Top Accent Strip */}
        <div className="h-1.5 bg-[#ef4444] w-full" />

        {/* Header Row */}
        <div className="px-5 pt-4 pb-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {parsed.type === 'success' && (
              <span className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            )}
            {parsed.type === 'error' && (
              <span className="w-7 h-7 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                <AlertCircle className="w-4 h-4" />
              </span>
            )}
            {parsed.type === 'info' && (
              <span className="w-7 h-7 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
                <Info className="w-4 h-4" />
              </span>
            )}
            {parsed.type === 'default' && (
              <span className="w-7 h-7 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
            )}

            <span className="bg-red-50 text-[#ef4444] border border-red-200/80 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
              {parsed.badge}
            </span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Title */}
        <div className="px-5 pt-2 pb-2">
          <h3
            id="notification-title"
            className="text-base sm:text-lg font-black text-slate-900 font-['Outfit',_sans-serif] tracking-tight leading-snug"
          >
            {parsed.title}
          </h3>
        </div>

        {/* Primary Message / Highlight Box */}
        <div className="px-5 pb-3">
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
            <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
              {parsed.highlightText}
            </p>

            {/* Structured Tags (e.g. Match ID, IGN) */}
            {parsed.tags && parsed.tags.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/60">
                {parsed.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="bg-white px-2 py-1 rounded-md border border-slate-200/70"
                  >
                    <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                      {tag.label}
                    </span>
                    <span className="block text-xs font-black text-slate-900 truncate">
                      {tag.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* More Details & Match Guidelines */}
        {parsed.instructions && parsed.instructions.length > 0 && (
          <div className="px-5 pb-4 space-y-1.5">
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-black">
              Important Details
            </span>
            <ul className="space-y-1.5">
              {parsed.instructions.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button: Dismiss */}
        <div className="px-5 pb-5 pt-1">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-[#ef4444] hover:bg-red-600 active:scale-[0.98] text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-red-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{dismissText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
