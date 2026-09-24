import React from 'react';

/**
 * 3D Style Boy Avatar with Blue Cap/Hoodie on Green Background
 */
export const BoyAvatar: React.FC<{ size?: number; className?: string }> = ({ size = 38, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`rounded-full shrink-0 ${className}`}
  >
    <defs>
      <radialGradient id="greenBg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="70%" stopColor="#16a34a" />
        <stop offset="100%" stopColor="#15803d" />
      </radialGradient>
      <linearGradient id="capBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fed7aa" />
        <stop offset="100%" stopColor="#fdba74" />
      </linearGradient>
      <filter id="avatarShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#052e16" floodOpacity="0.4" />
      </filter>
    </defs>

    {/* Background Circle */}
    <circle cx="50" cy="50" r="48" fill="url(#greenBg)" stroke="#4ade80" strokeWidth="2.5" />

    {/* Shoulders / Shirt */}
    <path
      d="M20 96 C22 75 32 68 50 68 C68 68 78 75 80 96 Z"
      fill="url(#capBlue)"
    />
    {/* Inner collar */}
    <path d="M42 68 Q50 78 58 68" stroke="#ffffff" strokeWidth="2.5" fill="none" />

    {/* Neck */}
    <path d="M44 60 H56 V70 H44 Z" fill="url(#skinTone)" />

    {/* Head */}
    <ellipse cx="50" cy="46" rx="20" ry="22" fill="url(#skinTone)" />

    {/* Ears */}
    <circle cx="29" cy="46" r="5" fill="#fdba74" />
    <circle cx="71" cy="46" r="5" fill="#fdba74" />

    {/* Cap / Hair */}
    <path
      d="M28 38 C28 22 36 15 50 15 C64 15 72 22 72 38 C70 34 62 30 50 30 C38 30 30 34 28 38 Z"
      fill="url(#capBlue)"
    />
    {/* Cap Visor */}
    <path
      d="M26 36 C34 31 66 31 74 36 C77 39 65 42 50 42 C35 42 23 39 26 36 Z"
      fill="#0284c7"
    />

    {/* Hair strands peeking */}
    <path d="M32 38 Q36 43 38 41" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
    <path d="M68 38 Q64 43 62 41" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />

    {/* Eyes */}
    <ellipse cx="42" cy="46" rx="2.5" ry="3.5" fill="#1e293b" />
    <ellipse cx="58" cy="46" rx="2.5" ry="3.5" fill="#1e293b" />
    {/* Eye sparkle */}
    <circle cx="43" cy="45" r="1" fill="#ffffff" />
    <circle cx="59" cy="45" r="1" fill="#ffffff" />

    {/* Eyebrows */}
    <path d="M39 40 Q43 39 46 41" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M54 41 Q57 39 61 40" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />

    {/* Cheeks */}
    <ellipse cx="37" cy="50" rx="3" ry="1.5" fill="#fb7185" opacity="0.6" />
    <ellipse cx="63" cy="50" rx="3" ry="1.5" fill="#fb7185" opacity="0.6" />

    {/* Smile */}
    <path d="M44 53 Q50 59 56 53" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
);

/**
 * Indian Rupee Golden Coin
 */
export const RupeeGoldCoin: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <circle cx="12" cy="12" r="11" fill="url(#coinGrad)" stroke="#fef08a" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="9" stroke="#b45309" strokeWidth="1" strokeDasharray="1.5 1" opacity="0.8" />
    {/* Rupee Symbol */}
    <text
      x="12"
      y="15.8"
      textAnchor="middle"
      fontSize="12.5"
      fontWeight="900"
      fontFamily="sans-serif"
      fill="#78350f"
    >
      ₹
    </text>
    <defs>
      <linearGradient id="coinGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="35%" stopColor="#facc15" />
        <stop offset="70%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Free Fire Max Badge
 */
export const FreeFireMaxBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded border border-white/20 text-[9px] font-black uppercase tracking-wider text-white ${className}`}>
    <span className="text-amber-400 font-extrabold">FREE FIRE</span>
    <span className="bg-red-600 text-white text-[7px] px-1 py-[1px] rounded-xs font-black">MAX</span>
  </div>
);

/**
 * Stylized GameX Logo
 */
export const GameXLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex items-center font-black italic tracking-tighter ${className}`}>
    <span className="text-white text-xs">GAME</span>
    <span className="text-[#facc15] text-sm font-black -ml-0.5 relative">
      X
      <span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#eab308]"></span>
    </span>
  </div>
);

/**
 * Official Instagram Gradient Icon
 */
export const InstagramIcon: React.FC<{ size?: number }> = ({ size = 52 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 drop-shadow-md"
  >
    <defs>
      <radialGradient id="igRadial" cx="30%" cy="105%" r="110%">
        <stop offset="0%" stopColor="#ffdb73" />
        <stop offset="25%" stopColor="#f77737" />
        <stop offset="50%" stopColor="#e1306c" />
        <stop offset="75%" stopColor="#c13584" />
        <stop offset="100%" stopColor="#5851db" />
      </radialGradient>
      <linearGradient id="igLinear" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#405de6" />
        <stop offset="30%" stopColor="#5851db" />
        <stop offset="60%" stopColor="#833ab4" />
        <stop offset="100%" stopColor="#e1306c" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#igRadial)" />
    <rect
      x="14"
      y="14"
      width="36"
      height="36"
      rx="10"
      stroke="#ffffff"
      strokeWidth="4.5"
      fill="none"
    />
    <circle cx="32" cy="32" r="9" stroke="#ffffff" strokeWidth="4.5" fill="none" />
    <circle cx="43" cy="21" r="2.8" fill="#ffffff" />
  </svg>
);

/**
 * Hand-drawn style curved arrow
 */
export const CurvedArrow: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 100 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 60 C 25 50, 45 48, 65 30 C 72 23, 78 15, 82 8"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
      strokeDasharray="1 0"
    />
    {/* Arrowhead */}
    <path
      d="M68 6 L84 6 L84 22"
      stroke="#ffffff"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Character Artwork for BR Full Map (Bandana / Red Scarf Warrior)
 */
export const BandanaCharArt: React.FC = () => (
  <svg viewBox="0 0 200 130" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgFire" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7f1d1d" />
        <stop offset="50%" stopColor="#c2410c" />
        <stop offset="100%" stopColor="#431407" />
      </linearGradient>
      <radialGradient id="emberRadial" cx="30%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#ea580c" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Fire Background */}
    <rect width="200" height="130" fill="url(#bgFire)" />
    <circle cx="60" cy="50" r="80" fill="url(#emberRadial)" />

    {/* Fire Sparks */}
    <circle cx="30" cy="20" r="2" fill="#fed7aa" opacity="0.8" />
    <circle cx="45" cy="35" r="1.5" fill="#fbbf24" opacity="0.9" />
    <circle cx="20" cy="80" r="2.5" fill="#f97316" opacity="0.7" />
    <circle cx="85" cy="25" r="1.8" fill="#fef08a" opacity="0.85" />
    <circle cx="70" cy="15" r="2.2" fill="#fbbf24" opacity="0.9" />

    {/* Character Body / Armor */}
    <g transform="translate(10, 10)">
      {/* Torso & Tactical Armor */}
      <path d="M20 120 L25 80 L48 70 L72 80 L76 120 Z" fill="#18181b" />
      {/* Inner combat vest */}
      <path d="M30 84 L48 76 L66 84 L64 120 L32 120 Z" fill="#27272a" stroke="#ef4444" strokeWidth="1" />
      {/* Arms */}
      <path d="M20 86 L5 110 L18 120 L30 92 Z" fill="#3f3f46" />
      <path d="M76 86 L92 110 L79 120 L66 92 Z" fill="#3f3f46" />
      {/* Red Wristband / Wrap */}
      <rect x="7" y="105" width="12" height="10" fill="#dc2626" rx="2" />
      <rect x="78" y="105" width="12" height="10" fill="#dc2626" rx="2" />

      {/* Head */}
      <ellipse cx="48" cy="46" rx="16" ry="18" fill="#fdba74" />

      {/* Spiky Dark Hair */}
      <path d="M30 42 C28 26 40 18 48 18 C58 18 68 26 66 42 C62 30 54 26 48 26 C42 26 34 30 30 42 Z" fill="#18181b" />
      <path d="M38 20 L44 8 L50 20 Z" fill="#18181b" />
      <path d="M48 20 L54 6 L60 20 Z" fill="#18181b" />
      <path d="M28 28 L32 16 L38 28 Z" fill="#18181b" />

      {/* Sunglasses */}
      <path d="M35 38 H61 L58 45 H38 Z" fill="#09090b" stroke="#38bdf8" strokeWidth="1.2" />

      {/* Red Bandana Face Mask with Skull/Pattern */}
      <path d="M32 46 L48 76 L64 46 Q48 50 32 46 Z" fill="#b91c1c" />
      <path d="M36 50 L48 70 L60 50" stroke="#fef2f2" strokeWidth="1.5" strokeDasharray="2 1.5" fill="none" opacity="0.9" />
      <circle cx="48" cy="58" r="3" fill="#fef2f2" opacity="0.8" />
    </g>
  </svg>
);

/**
 * Character Artwork for Clash Squad (Cowboy / Blue Cyber Agent)
 */
export const CowboyCharArt: React.FC = () => (
  <svg viewBox="0 0 200 130" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgCyberBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#082f49" />
        <stop offset="50%" stopColor="#0369a1" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <radialGradient id="cyanGlow" cx="40%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
        <stop offset="60%" stopColor="#0284c7" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#082f49" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="130" fill="url(#bgCyberBlue)" />
    <circle cx="65" cy="55" r="75" fill="url(#cyanGlow)" />

    {/* Digital grid lines */}
    <line x1="0" y1="30" x2="200" y2="30" stroke="#38bdf8" strokeWidth="0.5" opacity="0.3" />
    <line x1="0" y1="70" x2="200" y2="70" stroke="#38bdf8" strokeWidth="0.5" opacity="0.3" />
    <line x1="0" y1="100" x2="200" y2="100" stroke="#38bdf8" strokeWidth="0.5" opacity="0.3" />

    {/* Character */}
    <g transform="translate(15, 8)">
      {/* High-tech coat / suit */}
      <path d="M22 120 L28 78 L52 70 L76 78 L82 120 Z" fill="#0f172a" />
      {/* Glowing cyan details on collar */}
      <path d="M34 82 L52 74 L70 82 L64 120 L40 120 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <line x1="52" y1="74" x2="52" y2="120" stroke="#00f0ff" strokeWidth="2" />

      {/* Head */}
      <ellipse cx="52" cy="48" rx="15" ry="17" fill="#fed7aa" />

      {/* Cyber Visor / Aviators */}
      <path d="M39 44 H65 L62 50 H42 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2" />

      {/* Cowboy / Ranger Hat */}
      {/* Brim */}
      <ellipse cx="52" cy="34" rx="34" ry="9" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
      {/* Crown */}
      <path d="M32 34 L36 12 L68 12 L72 34 Z" fill="#1e293b" />
      <rect x="34" y="27" width="36" height="5" fill="#0284c7" />
      {/* Hat crease */}
      <path d="M44 12 Q52 18 60 12" stroke="#0f172a" strokeWidth="2" fill="none" />

      {/* Mask / Beard */}
      <path d="M42 54 Q52 64 62 54" fill="#0f172a" />
    </g>
  </svg>
);

/**
 * Character Artwork for Solo Survival (White Spiky Hair, Visor, "Shh" Pose)
 */
export const CyborgCharArt: React.FC = () => (
  <svg viewBox="0 0 200 130" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgLava" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7c2d12" />
        <stop offset="40%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#9a3412" />
      </linearGradient>
      <radialGradient id="orangeAura" cx="35%" cy="45%" r="60%">
        <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.9" />
        <stop offset="30%" stopColor="#f97316" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="130" fill="url(#bgLava)" />
    <circle cx="55" cy="50" r="70" fill="url(#orangeAura)" />

    {/* Embers */}
    <circle cx="25" cy="20" r="2.5" fill="#fed7aa" opacity="0.9" />
    <circle cx="85" cy="15" r="2" fill="#ffedd5" opacity="0.8" />
    <circle cx="15" cy="65" r="1.8" fill="#f97316" opacity="0.75" />

    {/* Character */}
    <g transform="translate(12, 10)">
      {/* Cyber Armor with Glowing Arc Core */}
      <path d="M22 120 L28 78 L52 70 L76 78 L82 120 Z" fill="#09090b" />
      {/* Glowing Cyan Core on Chest */}
      <circle cx="52" cy="92" r="6" fill="#38bdf8" />
      <circle cx="52" cy="92" r="9" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.8" />
      {/* Armor Plates */}
      <path d="M30 84 L44 88 L40 115 L26 110 Z" fill="#18181b" stroke="#52525b" strokeWidth="1" />
      <path d="M74 84 L60 88 L64 115 L78 110 Z" fill="#18181b" stroke="#52525b" strokeWidth="1" />

      {/* Head */}
      <ellipse cx="52" cy="46" rx="15" ry="17" fill="#fed7aa" />

      {/* Cyber Visor */}
      <path d="M38 42 H66 L62 47 H42 Z" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />

      {/* Spiky White Anime Hair */}
      <path d="M28 38 L22 20 L34 26 L36 10 L48 20 L52 4 L58 18 L68 8 L70 24 L82 18 L76 38 Z" fill="#f8fafc" />
      <path d="M34 26 L42 16 L46 26" fill="#e2e8f0" />
      <path d="M56 22 L64 14 L66 26" fill="#e2e8f0" />

      {/* Arm with Finger on Lips ("Shh" pose) */}
      <path d="M52 56 L52 48" stroke="#fed7aa" strokeWidth="4" strokeLinecap="round" />
      <path d="M52 56 L58 75 L74 90" stroke="#18181b" strokeWidth="7" strokeLinecap="round" fill="none" />
      <circle cx="52" cy="47" r="2.5" fill="#fbcfe8" />
    </g>
  </svg>
);

/**
 * Character Artwork for Lone Wolf (Stealth Operative / Yellow Slit Mask / Purple Aura)
 */
export const NinjaCharArt: React.FC = () => (
  <svg viewBox="0 0 200 130" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgPurple" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3b0764" />
        <stop offset="50%" stopColor="#6b21a8" />
        <stop offset="100%" stopColor="#581c87" />
      </linearGradient>
      <radialGradient id="neonPurpleGlow" cx="40%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
        <stop offset="40%" stopColor="#9333ea" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="200" height="130" fill="url(#bgPurple)" />
    <circle cx="65" cy="55" r="75" fill="url(#neonPurpleGlow)" />

    {/* Cyber Particles */}
    <circle cx="20" cy="30" r="1.8" fill="#e9d5ff" opacity="0.8" />
    <circle cx="80" cy="20" r="2.2" fill="#f0abfc" opacity="0.9" />
    <circle cx="35" cy="85" r="2" fill="#c084fc" opacity="0.7" />

    {/* Character */}
    <g transform="translate(15, 10)">
      {/* Stealth Armor with Gold Accents */}
      <path d="M20 120 L26 78 L52 68 L78 78 L84 120 Z" fill="#0f172a" />
      {/* Gold Pauldrons */}
      <path d="M18 78 L32 74 L30 92 L14 88 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
      <path d="M86 78 L72 74 L74 92 L90 88 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />

      {/* Cyber Visor / Face Mask with Glowing Yellow Slit Eyes */}
      <path d="M36 34 C34 56 42 70 52 70 C62 70 70 56 68 34 Z" fill="#18181b" />

      {/* Glowing Yellow Slit Eyes / Visor */}
      <path d="M42 45 L50 48 L46 51 Z" fill="#facc15" />
      <path d="M62 45 L54 48 L58 51 Z" fill="#facc15" />
      {/* Visor glow strip */}
      <line x1="41" y1="45" x2="63" y2="45" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />

      {/* Tactical Hood */}
      <path
        d="M30 40 C30 18 40 12 52 12 C64 12 74 18 74 40 C70 30 62 26 52 26 C42 26 34 30 30 40 Z"
        fill="#1e1b4b"
        stroke="#475569"
        strokeWidth="1"
      />
    </g>
  </svg>
);

/**
 * Character Artwork for Solo Survival 2 / Rebel Dreadlocks
 */
export const RebelCharArt: React.FC = () => (
  <svg viewBox="0 0 200 130" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgRainbow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="40%" stopColor="#4338ca" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
    </defs>
    <rect width="200" height="130" fill="url(#bgRainbow)" />
    {/* Rainbow accent in top corner */}
    <path d="M-10 10 Q30 5 60 -10" stroke="#f43f5e" strokeWidth="3" fill="none" opacity="0.8" />
    <path d="M-10 15 Q30 10 65 -5" stroke="#fbbf24" strokeWidth="3" fill="none" opacity="0.8" />
    <path d="M-10 20 Q30 15 70 0" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.8" />

    {/* Character with dreadlocks */}
    <g transform="translate(15, 10)">
      <path d="M22 120 L28 78 L52 70 L76 78 L82 120 Z" fill="#18181b" />
      <ellipse cx="52" cy="48" rx="16" ry="18" fill="#a16207" />
      {/* Dreadlocks */}
      <path d="M34 26 L22 45 M38 20 L28 48 M46 16 L42 46 M54 16 L58 46 M62 20 L72 48 M66 26 L78 45" stroke="#1c1917" strokeWidth="4.5" strokeLinecap="round" />
      {/* Bandana */}
      <rect x="36" y="32" width="32" height="7" fill="#ef4444" rx="2" />
      {/* Sunglasses */}
      <path d="M40 44 H64 L61 49 H43 Z" fill="#09090b" stroke="#ffffff" strokeWidth="1" />
    </g>
  </svg>
);

/**
 * Character Artwork for CS 4V4 / Skull Mask
 */
export const SkullCharArt: React.FC = () => (
  <svg viewBox="0 0 200 130" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bgSkull" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#831843" />
        <stop offset="50%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#450a0a" />
      </linearGradient>
    </defs>
    <rect width="200" height="130" fill="url(#bgSkull)" />
    <g transform="translate(15, 10)">
      <path d="M22 120 L28 78 L52 70 L76 78 L82 120 Z" fill="#18181b" />
      {/* Red Cap */}
      <path d="M32 30 C32 16 42 12 52 12 C62 12 72 16 72 30 Z" fill="#dc2626" />
      <path d="M30 30 H74 L70 34 H34 Z" fill="#b91c1c" />
      {/* Skull face mask */}
      <ellipse cx="52" cy="48" rx="15" ry="17" fill="#f8fafc" />
      <circle cx="45" cy="45" r="3.5" fill="#09090b" />
      <circle cx="59" cy="45" r="3.5" fill="#09090b" />
      <path d="M46 56 H58 M48 53 V59 M52 53 V59 M56 53 V59" stroke="#09090b" strokeWidth="1.5" />
    </g>
  </svg>
);

/**
 * GameX Official Esports Shield Crest Logo with Crown
 * Matching top-left brand badge in user screenshot
 */
export const GamexShieldLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 drop-shadow-[0_2px_8px_rgba(234,179,8,0.4)] ${className}`}
  >
    <defs>
      {/* Gold metallic gradient */}
      <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="30%" stopColor="#facc15" />
        <stop offset="70%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>

      {/* Deep Red to Black Shield Texture */}
      <linearGradient id="shieldBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2a0505" />
        <stop offset="45%" stopColor="#140202" />
        <stop offset="100%" stopColor="#050101" />
      </linearGradient>

      <linearGradient id="shieldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
      </linearGradient>
    </defs>

    {/* Top Crown */}
    <path
      d="M28 24 L34 11 L50 20 L66 11 L72 24 Z"
      fill="url(#shieldGold)"
      stroke="#78350f"
      strokeWidth="1"
    />
    <circle cx="34" cy="11" r="2" fill="#fef08a" />
    <circle cx="50" cy="19" r="2.5" fill="#fef08a" />
    <circle cx="66" cy="11" r="2" fill="#fef08a" />

    {/* Outer Shield Outline */}
    <path
      d="M16 26 L84 26 C84 55 68 78 50 94 C32 78 16 55 16 26 Z"
      fill="url(#shieldGold)"
    />

    {/* Inner Shield Body */}
    <path
      d="M20 30 L80 30 C80 54 66 74 50 88 C34 74 20 54 20 30 Z"
      fill="url(#shieldBg)"
    />

    {/* Internal subtle sports line texture */}
    <path
      d="M26 34 L74 34 C74 51 63 67 50 78 C37 67 26 51 26 34 Z"
      stroke="url(#shieldGlow)"
      strokeWidth="1.2"
      fill="none"
      opacity="0.6"
    />

    {/* Red Chevron accent lines in bottom tip */}
    <path d="M40 70 L50 78 L60 70" stroke="#dc2626" strokeWidth="2" fill="none" opacity="0.8" />
    <path d="M44 64 L50 69 L56 64" stroke="#dc2626" strokeWidth="1.5" fill="none" opacity="0.6" />

    {/* GAMEX Text */}
    <text
      x="50"
      y="54"
      textAnchor="middle"
      fontSize="15.5"
      fontWeight="900"
      fontFamily="'Teko', 'Chakra Petch', sans-serif"
      letterSpacing="1"
      fill="url(#shieldGold)"
      stroke="#451a03"
      strokeWidth="0.6"
    >
      GAMEX
    </text>
  </svg>
);

