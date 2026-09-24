import React from 'react';

// LN Monogram Logo as seen in Image 1 (Login Screen)
export const LNLogo: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Left blue stroke with rounded corners */}
    <path
      d="M8 8C8 6.89543 8.89543 6 10 6H16C17.1046 6 18 6.89543 18 8V28.5L26 13C26.55 11.95 27.65 11.25 28.85 11.25H33C34.1046 11.25 35 12.1454 35 13.25V36C35 37.1046 34.1046 38 33 38H27C25.8954 38 25 37.1046 25 36V15.5L17 31C16.45 32.05 15.35 32.75 14.15 32.75H10C8.89543 32.75 8 31.8546 8 30.75V8Z"
      fill="#1d6bf3"
    />
  </svg>
);

// Card 1: Total Users - 3 People solid silhouette (Image 2)
export const TotalUsersGroupIcon: React.FC<{ className?: string }> = ({
  className = 'w-11 h-11 text-[#0f2d59]',
}) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    {/* Center person head */}
    <circle cx="24" cy="13.5" r="5.5" />
    {/* Center person body */}
    <path d="M14.5 35.5C14.5 29.5 18.8 25 24 25C29.2 25 33.5 29.5 33.5 35.5V36.5H14.5V35.5Z" />
    {/* Left person head */}
    <circle cx="12" cy="17.5" r="4.5" />
    {/* Left person body */}
    <path d="M4.5 35.5C4.5 31 8 27.5 12.5 27.5C13.8 27.5 15 27.9 16 28.5C15 30.4 14.5 32.8 14.5 35.5H4.5Z" />
    {/* Right person head */}
    <circle cx="36" cy="17.5" r="4.5" />
    {/* Right person body */}
    <path d="M43.5 35.5C43.5 31 40 27.5 35.5 27.5C34.2 27.5 33 27.9 32 28.5C33 30.4 33.5 32.8 33.5 35.5H43.5Z" />
  </svg>
);

// Card 2: Antenna / Broadcast Beacon for "Active Users" (Image 2)
export const BeaconIcon: React.FC<{ className?: string }> = ({
  className = 'w-11 h-11 text-[#0f2d59]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Center node */}
    <circle cx="24" cy="22" r="4" fill="currentColor" stroke="none" />
    {/* Center post */}
    <line x1="24" y1="26" x2="24" y2="38" strokeWidth="3" />
    <line x1="18" y1="38" x2="30" y2="38" strokeWidth="3.2" />
    {/* Radiating inner arcs */}
    <path d="M17.5 16.5C15.5 18 14.5 20 14.5 22C14.5 24 15.5 26 17.5 27.5" />
    <path d="M30.5 16.5C32.5 18 33.5 20 33.5 22C33.5 24 32.5 26 30.5 27.5" />
    {/* Radiating outer arcs */}
    <path d="M12 11.5C8.8 14.5 7.2 18.2 7.2 22C7.2 25.8 8.8 29.5 12 32.5" />
    <path d="M36 11.5C39.2 14.5 40.8 18.2 40.8 22C40.8 25.8 39.2 29.5 36 32.5" />
  </svg>
);

// Card 3: Total Staff - 2 People solid silhouette (Image 2)
export const TotalStaffTwoUsersIcon: React.FC<{ className?: string }> = ({
  className = 'w-11 h-11 text-[#0f2d59]',
}) => (
  <svg viewBox="0 0 48 48" fill="currentColor" className={className}>
    {/* Front person head */}
    <circle cx="19" cy="15" r="5.5" />
    {/* Front person body */}
    <path d="M9.5 36C9.5 30 13.8 25.5 19 25.5C24.2 25.5 28.5 30 28.5 36V37H9.5V36Z" />
    {/* Back person head */}
    <circle cx="31.5" cy="17" r="5" />
    {/* Back person body */}
    <path d="M28.5 29C29.6 28.4 30.8 28 32 28C36.4 28 40 31.6 40 36V37H28.5V36C28.5 33.5 28 31.1 27 29.2L28.5 29Z" />
  </svg>
);

// Card 4: Classical Bank / Greek Temple for "Pending Deposits" (Image 2)
export const TempleIcon: React.FC<{ className?: string }> = ({
  className = 'w-11 h-11 text-[#0f2d59]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Pediment roof triangle */}
    <path d="M6 16L24 7L42 16H6Z" fill="currentColor" fillOpacity="0.12" strokeWidth="2.8" />
    <line x1="4" y1="16" x2="44" y2="16" strokeWidth="3" />
    {/* 4 Columns */}
    <line x1="10" y1="20" x2="10" y2="34" strokeWidth="3.2" />
    <line x1="19" y1="20" x2="19" y2="34" strokeWidth="3.2" />
    <line x1="29" y1="20" x2="29" y2="34" strokeWidth="3.2" />
    <line x1="38" y1="20" x2="38" y2="34" strokeWidth="3.2" />
    {/* Base platforms */}
    <line x1="6" y1="35" x2="42" y2="35" strokeWidth="2.8" />
    <line x1="4" y1="40" x2="44" y2="40" strokeWidth="3.5" />
  </svg>
);

// Card 5: Hanging Voucher / Bill with Dollar Sign for "Pending Withdrawals" (Image 2)
export const PendingWithdrawalIcon: React.FC<{ className?: string }> = ({
  className = 'w-11 h-11 text-[#0f2d59]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Top hanging bar */}
    <path d="M8 9H40" strokeWidth="3.5" />
    {/* Hanging card banner */}
    <rect x="12" y="12" width="24" height="26" rx="2" strokeWidth="2.8" fill="currentColor" fillOpacity="0.08" />
    {/* Dollar sign */}
    <path d="M24 18V32" strokeWidth="2.4" />
    <path
      d="M27.5 21.5C27.5 19.8 26 19 24 19C22 19 20.5 19.8 20.5 21.5C20.5 24.5 27.5 23.5 27.5 26.5C27.5 28.2 26 29 24 29C22 29 20.5 28.2 20.5 26.5"
      strokeWidth="2.4"
    />
  </svg>
);

// Card 6: MicroSD Memory Card for "Storage Used" (Image 2)
export const MicroSDIcon: React.FC<{ className?: string }> = ({
  className = 'w-11 h-11 text-[#0f2d59]',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* MicroSD outline with notch */}
    <path
      d="M14 11C14 9.34315 15.3431 8 17 8H31C32.6569 8 34 9.34315 34 11V37C34 38.6569 32.6569 40 31 40H17C15.3431 40 14 38.6569 14 37V22L11 19V14C11 12.3431 12.3431 11 14 11Z"
      strokeWidth="3"
      fill="currentColor"
      fillOpacity="0.08"
    />
    {/* Contact pins at top */}
    <line x1="18" y1="12" x2="18" y2="17" strokeWidth="2.4" />
    <line x1="22" y1="12" x2="22" y2="17" strokeWidth="2.4" />
    <line x1="26" y1="12" x2="26" y2="17" strokeWidth="2.4" />
    <line x1="30" y1="12" x2="30" y2="17" strokeWidth="2.4" />
  </svg>
);

// Sidebar Icons (Blue Solid Silhouette matching Images 2 & 3)
export const SidebarUserIcon: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4 text-blue-600 shrink-0',
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="7" r="4" />
    <path d="M4 20C4 15.6 7.6 12 12 12C16.4 12 20 15.6 20 20V21H4V20Z" />
  </svg>
);

export const SidebarUsersIcon: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4 text-blue-600 shrink-0',
}) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="9" cy="7" r="3.5" />
    <path d="M2 19C2 15.7 4.7 13 8 13C11.3 13 14 15.7 14 19V20H2V19Z" />
    <circle cx="16" cy="8" r="3" />
    <path d="M14.5 14.5C15.6 14 16.8 13.7 18 13.7C20.8 13.7 23 15.8 23 18.5V20H15.8C15.5 18.8 14.9 17.6 14.1 16.6L14.5 14.5Z" />
  </svg>
);

// Calendar Icon for DateBar (Images 4 & 5)
export const CalendarDateIcon: React.FC<{ className?: string }> = ({
  className = 'w-5 h-5 text-blue-600',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2.4" />
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2.4" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

// Empty State Center Icon for Games Leaderboard (Image 4)
export const GamesLeaderboardEmptyIcon: React.FC<{ className?: string }> = ({
  className = 'w-16 h-16 text-slate-300',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Center person */}
    <circle cx="24" cy="18" r="5.5" />
    <path d="M15 34C15 29 19 25 24 25C29 25 33 29 33 34" />
    {/* Left signals */}
    <path d="M11 20C9.5 21.5 8.5 23.5 8.5 26C8.5 28.5 9.5 30.5 11 32" strokeWidth="2" />
    <path d="M7 16C4.8 18.8 3.5 22.2 3.5 26C3.5 29.8 4.8 33.2 7 36" strokeWidth="2" />
    {/* Right signals */}
    <path d="M37 20C38.5 21.5 39.5 23.5 39.5 26C39.5 28.5 38.5 30.5 37 32" strokeWidth="2" />
    <path d="M41 16C43.2 18.8 44.5 22.2 44.5 26C44.5 29.8 43.2 33.2 41 36" strokeWidth="2" />
  </svg>
);

// High-fidelity 3D Avatar matching "Gamex" screenshot (Images 2, 4, 5, 6)
export const GamexAvatar: React.FC<{ className?: string }> = ({
  className = 'w-9 h-9',
}) => (
  <div className={`relative rounded-full overflow-hidden shrink-0 border border-slate-200 bg-[#c7d2fe] ${className}`}>
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background smooth circle */}
      <circle cx="32" cy="32" r="32" fill="#E0E7FF" />

      {/* Torso / Green shirt with blue collar */}
      <path d="M10 64C10 49 19 43 32 43C45 43 54 49 54 64H10Z" fill="#10B981" />
      <path d="M26 43L32 51L38 43H26Z" fill="#2563EB" />

      {/* Neck */}
      <rect x="27" y="35" width="10" height="10" rx="4" fill="#FBBF24" />

      {/* Head / Face */}
      <ellipse cx="32" cy="26" rx="14" ry="14.5" fill="#FCD34D" />

      {/* Cheeks blush */}
      <circle cx="23" cy="28.5" r="2.5" fill="#F87171" fillOpacity="0.45" />
      <circle cx="41" cy="28.5" r="2.5" fill="#F87171" fillOpacity="0.45" />

      {/* Eyes */}
      <circle cx="26" cy="25" r="2.4" fill="#1E293B" />
      <circle cx="38" cy="25" r="2.4" fill="#1E293B" />
      <circle cx="27" cy="24.2" r="0.8" fill="#FFFFFF" />
      <circle cx="39" cy="24.2" r="0.8" fill="#FFFFFF" />

      {/* Smile */}
      <path d="M28 30.5C29.5 32.5 34.5 32.5 36 30.5" stroke="#92400E" strokeWidth="1.8" strokeLinecap="round" />

      {/* Hair (brown parted haircut) */}
      <path
        d="M18 23C17 17 20 11 28 10C35 9 42 10 46 15C47 20 46 24 46 24C44 20 42 18 38 17C33 16 28 18 24 16C21 18 19 21 18 23Z"
        fill="#78350F"
      />
    </svg>
  </div>
);
