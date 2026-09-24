import React from 'react';

export interface BannerSlideData {
  id: string;
  title: string;
  imageUrl?: string;
  targetUrl: string;
  theme?: 'addcoins' | 'instagram' | 'tournament' | 'clash' | 'refer' | 'lonewolf' | 'survival';
}

export const BANNER_SLIDES_LIST: BannerSlideData[] = [
  {
    id: 'slide-carousel-1',
    title: 'GameX Esports Tournament Championship',
    imageUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/carousel-thumbnail.3771f627.jpg',
    targetUrl: 'https://www.instagram.com/gamex_esports',
  },
  {
    id: 'slide-carousel-2',
    title: 'Clash Squad & Battle Royale Contests',
    imageUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/carousel-thumbnail.35a9eeca.jpg',
    targetUrl: 'https://www.youtube.com/@gamex_esports',
  },
  {
    id: 'slide-carousel-3',
    title: 'Mega Prize Pool Esports Tournaments',
    imageUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/carousel-thumbnail.ac092c8b.jpeg',
    targetUrl: 'https://discord.gg/gamex',
  },
  {
    id: 'slide-carousel-4',
    title: 'Daily Solo, Duo & Squad Free Fire Matches',
    imageUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/carousel-thumbnail.4abb90d8.jpg',
    targetUrl: 'https://www.instagram.com/gamex_esports',
  },
  {
    id: 'slide-carousel-5',
    title: 'Zero Entry Survival & Free Matches',
    imageUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/carousel-thumbnail.ef1acadf.jpg',
    targetUrl: 'https://gamex.digicroz.com',
  },
  {
    id: 'slide-carousel-6',
    title: 'GameX Pro League Community Tournaments',
    imageUrl: 'https://fs.digicroz.com/gamex-bucket/gaming-app/media/carousel-thumbnail.8b4bebf9.jpg',
    targetUrl: 'https://www.instagram.com/gamex_esports',
  },
];

interface BannerSlideViewProps {
  slide: BannerSlideData;
}

export const BannerSlideView: React.FC<BannerSlideViewProps> = ({ slide }) => {
  if (slide.imageUrl) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Subtle bottom vignette to ensure buttons and dots stay legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      </div>
    );
  }

  switch (slide.theme) {
    case 'addcoins':
      return (
        <div className="relative w-full h-full bg-gradient-to-r from-[#180202] via-[#2c0505] to-[#140101] overflow-hidden">
          {/* Fiery glowing ambient background with embers */}
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-red-600/35 rounded-full blur-2xl" />
          <div className="absolute right-10 top-0 w-48 h-48 bg-amber-600/25 rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.25),transparent_70%)]" />

          {/* Floating red and gold ember sparks */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 420 170">
            <circle cx="90" cy="40" r="1.5" fill="#facc15" />
            <circle cx="160" cy="80" r="1.2" fill="#ef4444" />
            <circle cx="210" cy="30" r="2" fill="#facc15" />
            <circle cx="240" cy="110" r="1.5" fill="#f97316" />
            <circle cx="340" cy="50" r="1.5" fill="#facc15" />
            <circle cx="380" cy="120" r="2" fill="#ef4444" />
            <circle cx="120" cy="130" r="1" fill="#facc15" />
            {/* Speed / Flame streaks */}
            <line x1="160" y1="140" x2="190" y2="100" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
            <line x1="310" y1="130" x2="330" y2="100" stroke="#facc15" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />
          </svg>

          {/* LEFT: Spiky White-Hair Masked Free Fire Warrior with Cyber Glove & Floating Question Mark */}
          <div className="absolute left-2 bottom-0 w-[42%] h-[98%] z-10 pointer-events-none flex items-end">
            <div className="relative w-full h-full flex items-end">
              {/* Glowing 3D Question Mark '?' */}
              <div className="absolute left-1 top-4 z-20 animate-bounce">
                <span className="font-['Chakra_Petch',_sans-serif] font-black text-white text-[28px] sm:text-[34px] drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] italic">
                  ?
                </span>
              </div>

              {/* Character Illustration */}
              <svg viewBox="0 0 130 150" className="w-full h-full drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
                {/* Spiky White / Silver Hair */}
                <path
                  d="M 32 45 L 20 25 L 38 30 L 40 10 L 56 22 L 68 8 L 74 25 L 86 14 L 88 34 L 100 24 L 94 48 Q 104 38 98 56 Q 85 70 70 65 Z"
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="0.8"
                />
                <path d="M 36 28 L 44 20 L 52 26" stroke="#94a3b8" strokeWidth="1" fill="none" />
                <path d="M 64 16 L 70 24 L 78 18" stroke="#94a3b8" strokeWidth="1" fill="none" />

                {/* Face & Glowing Red Eyes */}
                <path d="M 38 48 Q 65 42 88 48 L 88 78 Q 65 96 38 78 Z" fill="#fed7aa" />
                {/* Red Glowing Warrior Eyes */}
                <polygon points="46,55 56,54 53,58 48,58" fill="#ef4444" />
                <polygon points="70,54 80,55 78,58 73,58" fill="#ef4444" />
                <circle cx="51" cy="56" r="1" fill="#ffffff" />
                <circle cx="75" cy="56" r="1" fill="#ffffff" />

                {/* Mask with Red & Black Cross Pattern */}
                <path d="M 36 62 L 90 62 L 82 92 L 65 98 L 44 92 Z" fill="#09090b" />
                {/* Red cross & stripes on mask */}
                <line x1="63" y1="64" x2="63" y2="94" stroke="#dc2626" strokeWidth="3" />
                <line x1="50" y1="74" x2="76" y2="74" stroke="#dc2626" strokeWidth="3" />
                <line x1="42" y1="84" x2="84" y2="84" stroke="#dc2626" strokeWidth="1.5" />

                {/* High Collar Cyber Jacket */}
                <path d="M 22 110 L 44 92 L 65 98 L 86 92 L 108 110 L 122 150 L 8 150 Z" fill="#18181b" />
                <path d="M 44 92 L 52 112 L 65 116 L 78 112 L 86 92" stroke="#dc2626" strokeWidth="2" fill="none" />
                <line x1="65" y1="116" x2="65" y2="150" stroke="#dc2626" strokeWidth="2.5" />

                {/* Robotic Cyber Glove (Arm held up with metallic joints) */}
                <path d="M 72 108 Q 88 88 84 76 Q 80 68 88 64 Q 94 62 96 74 Q 98 84 94 102 Z" fill="#334155" stroke="#94a3b8" strokeWidth="1.2" />
                <circle cx="86" cy="74" r="2.5" fill="#facc15" />
                <circle cx="92" cy="78" r="2" fill="#ef4444" />
              </svg>
            </div>
          </div>

          {/* RIGHT: Typography "HOW TO ADD COINS IN GAMEX?" + Treasure Chest + Coins + Money Bag */}
          <div className="absolute right-2.5 inset-y-0 left-[36%] z-20 flex flex-col justify-between py-2 pointer-events-none">
            {/* Top Typography: HOW TO ADD COINS IN GAMEX? */}
            <div className="flex flex-col items-end text-right">
              <span className="font-['Teko',_'Chakra_Petch',_sans-serif] font-black italic text-[#fbbf24] text-[20px] sm:text-[23px] leading-[0.95] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] uppercase">
                HOW TO ADD
              </span>
              <span className="font-['Teko',_'Chakra_Petch',_sans-serif] font-black italic text-white text-[21px] sm:text-[25px] leading-[0.9] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] uppercase">
                COINS IN GAMEX?
              </span>
            </div>

            {/* Middle: GameX Logo watermark + Treasure Chest, Golden Coin Stacks & Money Bag */}
            <div className="flex items-end justify-end gap-2.5 relative">
              {/* GameX Watermark Logo */}
              <div className="absolute -top-3 right-14 opacity-85">
                <span className="font-['Orbitron',_'Outfit',_sans-serif] font-black italic text-white text-[10px] tracking-tight">
                  GAME<span className="text-red-500">X</span>
                </span>
              </div>

              {/* Treasure Chest Overflowing with Gold */}
              <svg viewBox="0 0 100 70" className="w-20 h-14 sm:w-24 sm:h-16 drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] shrink-0">
                {/* Open Lid */}
                <path d="M 12 28 C 12 14 30 10 50 10 C 70 10 88 14 88 28 L 84 32 L 16 32 Z" fill="#78350f" stroke="#ca8a04" strokeWidth="2" />
                {/* Gold bands on lid */}
                <path d="M 28 12 L 28 32 M 72 12 L 72 32" stroke="#facc15" strokeWidth="3" />
                <circle cx="50" cy="22" r="3" fill="#facc15" />

                {/* Chest Base */}
                <path d="M 14 30 L 86 30 L 80 62 L 20 62 Z" fill="#451a03" stroke="#ca8a04" strokeWidth="2" />
                {/* Gold bands on base */}
                <line x1="26" y1="30" x2="28" y2="62" stroke="#facc15" strokeWidth="3" />
                <line x1="74" y1="30" x2="72" y2="62" stroke="#facc15" strokeWidth="3" />

                {/* Glowing Gold Coins Overflowing */}
                <ellipse cx="50" cy="30" rx="32" ry="9" fill="#facc15" />
                <ellipse cx="36" cy="27" rx="6" ry="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
                <ellipse cx="50" cy="26" rx="7" ry="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
                <ellipse cx="64" cy="27" rx="6" ry="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
                <ellipse cx="44" cy="31" rx="6" ry="3" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
                <ellipse cx="58" cy="31" rx="6" ry="3" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />

                {/* Golden Lock Clasp */}
                <rect x="46" y="28" width="8" height="10" rx="2" fill="#facc15" stroke="#854d0e" strokeWidth="1" />
                <circle cx="50" cy="33" r="1.5" fill="#78350f" />
              </svg>

              {/* Coin Stacks in Foreground */}
              <div className="flex flex-col items-center -ml-2 z-10">
                <svg viewBox="0 0 40 30" className="w-9 h-7 drop-shadow-md">
                  {/* Stack 1 */}
                  <ellipse cx="12" cy="24" rx="8" ry="3" fill="#eab308" stroke="#78350f" strokeWidth="0.8" />
                  <ellipse cx="12" cy="20" rx="8" ry="3" fill="#facc15" stroke="#78350f" strokeWidth="0.8" />
                  <ellipse cx="12" cy="16" rx="8" ry="3" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
                  {/* Stack 2 */}
                  <ellipse cx="26" cy="26" rx="7" ry="2.5" fill="#eab308" stroke="#78350f" strokeWidth="0.8" />
                  <ellipse cx="26" cy="22" rx="7" ry="2.5" fill="#facc15" stroke="#78350f" strokeWidth="0.8" />
                  <ellipse cx="26" cy="18" rx="7" ry="2.5" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Burlap Money Bag with $ Symbol */}
              <svg viewBox="0 0 50 60" className="w-10 h-12 sm:w-12 sm:h-14 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] shrink-0">
                {/* Tied top neck */}
                <path d="M 20 12 Q 25 6 30 12 L 28 18 L 22 18 Z" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                {/* String */}
                <line x1="18" y1="18" x2="32" y2="18" stroke="#1c1917" strokeWidth="2.5" />
                {/* Round body */}
                <path d="M 18 19 Q 6 34 14 50 Q 25 58 36 50 Q 44 34 32 19 Z" fill="#a16207" stroke="#713f12" strokeWidth="1.5" />
                {/* Shading */}
                <path d="M 14 50 Q 25 57 36 50" stroke="#713f12" strokeWidth="2" fill="none" />
                {/* Dollar $ Sign */}
                <text x="25" y="38" textAnchor="middle" fontSize="16" fontWeight="900" fontFamily="sans-serif" fill="#1c1917">
                  $
                </text>
              </svg>
            </div>
          </div>
        </div>
      );

    case 'instagram':
      return (
        <div className="relative w-full h-full bg-gradient-to-r from-[#14062a] via-[#2a0845] to-[#55086b] overflow-hidden">
          {/* Cyber glowing orbs */}
          <div className="absolute right-0 top-0 w-44 h-44 bg-fuchsia-600/30 rounded-full blur-2xl" />
          <div className="absolute left-8 bottom-0 w-36 h-36 bg-cyan-500/25 rounded-full blur-xl" />

          {/* Cyber diagonal lines */}
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" viewBox="0 0 420 170">
            <line x1="200" y1="0" x2="350" y2="170" stroke="white" strokeWidth="1.5" />
            <line x1="240" y1="0" x2="390" y2="170" stroke="white" strokeWidth="1.5" />
            <line x1="280" y1="0" x2="430" y2="170" stroke="white" strokeWidth="1.5" />
          </svg>

          {/* Character illustration (Left side) */}
          <div className="absolute left-2 bottom-0 w-[38%] h-[95%] z-10 pointer-events-none">
            <svg viewBox="0 0 140 160" className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
              {/* Spiky Cyan Hair */}
              <path d="M 40 45 L 30 25 L 48 32 L 52 14 L 68 28 L 80 12 L 86 30 L 98 22 L 92 48 Q 104 38 100 56 Q 85 70 70 65 Z" fill="#06b6d4" />
              {/* Face & Eyes */}
              <path d="M 48 48 Q 70 42 90 48 L 92 82 Q 70 100 48 82 Z" fill="#fcd34d" />
              <polygon points="56,58 64,57 62,60 58,60" fill="#38bdf8" />
              <polygon points="78,57 86,58 84,60 80,60" fill="#38bdf8" />
              {/* Mask */}
              <path d="M 46 66 L 94 66 L 86 96 L 70 102 L 54 96 Z" fill="#0f172a" />
              <path d="M 52 74 L 88 74" stroke="#06b6d4" strokeWidth="2" />
              {/* Yellow Sports Jacket */}
              <path d="M 28 114 L 50 96 L 70 104 L 90 96 L 112 114 L 126 160 L 14 160 Z" fill="#eab308" />
              <path d="M 64 102 L 64 160 L 76 160 L 76 102 Z" fill="#0f172a" />
              <line x1="70" y1="104" x2="70" y2="160" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,2" />
            </svg>
          </div>

          {/* Banner Typography & Elements (Right side) */}
          <div className="absolute right-3.5 inset-y-0 left-[35%] z-20 flex flex-col justify-center pl-2 pointer-events-none">
            {/* FOLLOW OUR */}
            <span className="font-['Chakra_Petch',_sans-serif] font-extrabold italic text-amber-300 text-[11px] sm:text-[13px] tracking-widest drop-shadow-md uppercase">
              FOLLOW OUR
            </span>

            {/* INSTAGRAM PAGE */}
            <span className="font-['Teko',_'Chakra_Petch',_sans-serif] font-black italic text-white text-[23px] sm:text-[29px] leading-[0.95] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
              INSTAGRAM PAGE
            </span>

            {/* FOR GIVEAWAYS Ribbon */}
            <div className="inline-block mt-0.5 self-start">
              <div className="bg-rose-600 text-white font-['Chakra_Petch',_sans-serif] font-black italic text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-xs tracking-wider shadow-md transform -skew-x-10">
                FOR GIVEAWAYS!
              </div>
            </div>

            {/* GameX Logo, Arrow & Instagram Icon */}
            <div className="flex items-center gap-2 mt-1 sm:mt-1.5">
              <div className="flex items-center">
                <span className="font-['Orbitron',_'Outfit',_sans-serif] font-black text-white text-[13px] sm:text-[15px] tracking-tight drop-shadow-md">
                  Game<span className="text-cyan-400">X</span>
                </span>
                <span className="font-['Chakra_Petch',_sans-serif] text-[7px] text-slate-400 font-bold ml-1 tracking-widest hidden sm:inline">
                  ESPORTS
                </span>
              </div>

              {/* Curved Arrow */}
              <svg viewBox="0 0 40 18" className="w-6 h-3 text-white stroke-white fill-none stroke-[2] shrink-0">
                <path d="M 2 12 Q 18 2 34 10" strokeLinecap="round" />
                <path d="M 28 5 L 35 10 L 29 15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* Instagram Official Gradient Icon */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] flex items-center justify-center shadow-md p-1 shrink-0">
                <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-white stroke-[2.2]">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeLinecap="round" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );

    case 'tournament':
      return (
        <div className="relative w-full h-full bg-gradient-to-r from-[#1f0e04] via-[#3a1b08] to-[#5c280b] overflow-hidden">
          <div className="absolute right-0 top-0 w-44 h-44 bg-amber-500/30 rounded-full blur-2xl" />
          <div className="absolute left-6 bottom-0 w-36 h-36 bg-orange-600/30 rounded-full blur-xl" />

          {/* Trophy Illustration (Left) */}
          <div className="absolute left-3 bottom-1 w-[35%] h-[90%] z-10 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
              <path d="M 25 20 L 75 20 L 68 52 Q 50 70 32 52 Z" fill="#eab308" />
              <path d="M 32 25 L 68 25 L 62 48 Q 50 62 38 48 Z" fill="#fef08a" />
              <path d="M 25 24 Q 10 28 15 42 Q 20 54 32 50" fill="none" stroke="#eab308" strokeWidth="5" />
              <path d="M 75 24 Q 90 28 85 42 Q 80 54 68 50" fill="none" stroke="#eab308" strokeWidth="5" />
              <rect x="44" y="64" width="12" height="18" fill="#ca8a04" />
              <rect x="30" y="80" width="40" height="12" rx="3" fill="#854d0e" />
            </svg>
          </div>

          <div className="absolute right-3.5 inset-y-0 left-[35%] z-20 flex flex-col justify-center pl-2 pointer-events-none">
            <span className="font-['Chakra_Petch',_sans-serif] font-extrabold italic text-amber-300 text-[11px] sm:text-[13px] tracking-widest drop-shadow-md uppercase">
              SEASON CHAMPIONSHIP
            </span>
            <span className="font-['Teko',_'Chakra_Petch',_sans-serif] font-black italic text-white text-[24px] sm:text-[30px] leading-[0.95] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
              ₹10,000 PRIZE POOL
            </span>
            <div className="inline-block mt-0.5 self-start">
              <div className="bg-amber-500 text-slate-950 font-['Chakra_Petch',_sans-serif] font-black italic text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-xs tracking-wider shadow-md transform -skew-x-10">
                DAILY REGISTRATIONS OPEN
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-['Orbitron',_'Outfit',_sans-serif] font-black text-white text-[13px] sm:text-[15px] tracking-tight">
                Game<span className="text-amber-400">X</span>
              </span>
            </div>
          </div>
        </div>
      );

    case 'clash':
      return (
        <div className="relative w-full h-full bg-gradient-to-r from-[#031627] via-[#082942] to-[#0c3e66] overflow-hidden">
          <div className="absolute right-0 top-0 w-44 h-44 bg-cyan-500/30 rounded-full blur-2xl" />

          <div className="absolute left-3 bottom-1 w-[35%] h-[90%] z-10 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
              {/* Crossed Swords */}
              <line x1="20" y1="20" x2="80" y2="80" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" />
              <line x1="80" y1="20" x2="20" y2="80" stroke="#facc15" strokeWidth="6" strokeLinecap="round" />
              <circle cx="50" cy="50" r="10" fill="#0f172a" stroke="#ffffff" strokeWidth="3" />
            </svg>
          </div>

          <div className="absolute right-3.5 inset-y-0 left-[35%] z-20 flex flex-col justify-center pl-2 pointer-events-none">
            <span className="font-['Chakra_Petch',_sans-serif] font-extrabold italic text-cyan-300 text-[11px] sm:text-[13px] tracking-widest drop-shadow-md uppercase">
              FAST PACED COMBAT
            </span>
            <span className="font-['Teko',_'Chakra_Petch',_sans-serif] font-black italic text-white text-[24px] sm:text-[30px] leading-[0.95] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
              CLASH SQUAD 1V1 & 4V4
            </span>
            <div className="inline-block mt-0.5 self-start">
              <div className="bg-cyan-500 text-slate-950 font-['Chakra_Petch',_sans-serif] font-black italic text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-xs tracking-wider shadow-md transform -skew-x-10">
                INSTANT ROOM CREDS
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-['Orbitron',_'Outfit',_sans-serif] font-black text-white text-[13px] sm:text-[15px] tracking-tight">
                Game<span className="text-cyan-400">X</span>
              </span>
            </div>
          </div>
        </div>
      );

    case 'refer':
      return (
        <div className="relative w-full h-full bg-gradient-to-r from-[#042416] via-[#073c24] to-[#0d5936] overflow-hidden">
          <div className="absolute right-0 top-0 w-44 h-44 bg-emerald-500/30 rounded-full blur-2xl" />

          <div className="absolute left-3 bottom-1 w-[35%] h-[90%] z-10 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
              <rect x="25" y="30" width="50" height="45" rx="8" fill="#10b981" />
              <line x1="50" y1="30" x2="50" y2="75" stroke="#facc15" strokeWidth="6" />
              <line x1="25" y1="52" x2="75" y2="52" stroke="#facc15" strokeWidth="6" />
              <circle cx="40" cy="24" r="8" fill="#facc15" />
              <circle cx="60" cy="24" r="8" fill="#facc15" />
            </svg>
          </div>

          <div className="absolute right-3.5 inset-y-0 left-[35%] z-20 flex flex-col justify-center pl-2 pointer-events-none">
            <span className="font-['Chakra_Petch',_sans-serif] font-extrabold italic text-emerald-300 text-[11px] sm:text-[13px] tracking-widest drop-shadow-md uppercase">
              INVITE YOUR SQUAD
            </span>
            <span className="font-['Teko',_'Chakra_Petch',_sans-serif] font-black italic text-white text-[24px] sm:text-[30px] leading-[0.95] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
              EARN ₹50 PER FRIEND
            </span>
            <div className="inline-block mt-0.5 self-start">
              <div className="bg-emerald-400 text-slate-950 font-['Chakra_Petch',_sans-serif] font-black italic text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-xs tracking-wider shadow-md transform -skew-x-10">
                UNLIMITED WITHDRAWALS
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-['Orbitron',_'Outfit',_sans-serif] font-black text-white text-[13px] sm:text-[15px] tracking-tight">
                Game<span className="text-emerald-400">X</span>
              </span>
            </div>
          </div>
        </div>
      );

    case 'lonewolf':
      return (
        <div className="relative w-full h-full bg-gradient-to-r from-[#1a0529] via-[#2f0c47] to-[#4c156f] overflow-hidden">
          <div className="absolute right-0 top-0 w-44 h-44 bg-purple-500/30 rounded-full blur-2xl" />

          <div className="absolute left-3 bottom-1 w-[35%] h-[90%] z-10 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
              <polygon points="50,15 75,45 65,80 35,80 25,45" fill="#a855f7" />
              <circle cx="42" cy="48" r="5" fill="#facc15" />
              <circle cx="58" cy="48" r="5" fill="#facc15" />
            </svg>
          </div>

          <div className="absolute right-3.5 inset-y-0 left-[35%] z-20 flex flex-col justify-center pl-2 pointer-events-none">
            <span className="font-['Chakra_Petch',_sans-serif] font-extrabold italic text-purple-300 text-[11px] sm:text-[13px] tracking-widest drop-shadow-md uppercase">
              LONE WOLF ARENA
            </span>
            <span className="font-['Teko',_'Chakra_Petch',_sans-serif] font-black italic text-white text-[24px] sm:text-[30px] leading-[0.95] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
              2X KILL MULTIPLIER
            </span>
            <div className="inline-block mt-0.5 self-start">
              <div className="bg-purple-500 text-white font-['Chakra_Petch',_sans-serif] font-black italic text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-xs tracking-wider shadow-md transform -skew-x-10">
                SOLO HEAD-TO-HEAD
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-['Orbitron',_'Outfit',_sans-serif] font-black text-white text-[13px] sm:text-[15px] tracking-tight">
                Game<span className="text-purple-400">X</span>
              </span>
            </div>
          </div>
        </div>
      );

    case 'survival':
    default:
      return (
        <div className="relative w-full h-full bg-gradient-to-r from-[#220c02] via-[#3f1906] to-[#60270a] overflow-hidden">
          <div className="absolute right-0 top-0 w-44 h-44 bg-orange-500/30 rounded-full blur-2xl" />

          <div className="absolute left-3 bottom-1 w-[35%] h-[90%] z-10 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]">
              <path d="M 50 15 Q 65 40 58 55 Q 75 35 75 60 Q 75 90 50 90 Q 25 90 25 60 Q 25 40 50 15 Z" fill="#ea580c" />
              <path d="M 50 40 Q 60 55 55 65 Q 65 50 65 70 Q 65 85 50 85 Q 35 85 35 70 Q 35 55 50 40 Z" fill="#facc15" />
            </svg>
          </div>

          <div className="absolute right-3.5 inset-y-0 left-[35%] z-20 flex flex-col justify-center pl-2 pointer-events-none">
            <span className="font-['Chakra_Petch',_sans-serif] font-extrabold italic text-orange-300 text-[11px] sm:text-[13px] tracking-widest drop-shadow-md uppercase">
              WEEKEND SPECIAL
            </span>
            <span className="font-['Teko',_'Chakra_Petch',_sans-serif] font-black italic text-white text-[24px] sm:text-[30px] leading-[0.95] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] uppercase">
              ZERO ENTRY SURVIVAL
            </span>
            <div className="inline-block mt-0.5 self-start">
              <div className="bg-orange-500 text-slate-950 font-['Chakra_Petch',_sans-serif] font-black italic text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-xs tracking-wider shadow-md transform -skew-x-10">
                LIMITED SLOTS
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-['Orbitron',_'Outfit',_sans-serif] font-black text-white text-[13px] sm:text-[15px] tracking-tight">
                Game<span className="text-orange-400">X</span>
              </span>
            </div>
          </div>
        </div>
      );
  }
};
